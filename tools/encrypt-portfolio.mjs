#!/usr/bin/env node
// Encrypts portfolio-src/content.html into portfolio/index.html.
//
//   node tools/encrypt-portfolio.mjs           asks for the password (typed twice, not shown)
//   node tools/encrypt-portfolio.mjs --clear   empties the payload ("準備中" state)
//
// Files under portfolio-src/media/ referenced as src="media/..." or poster="media/..."
// are embedded as data URIs, so they are encrypted too. portfolio-src/ is git-ignored:
// the repository is public, so only the encrypted page may ever be committed.
// PORTFOLIO_PASSWORD may be set instead of typing (for testing only).

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { webcrypto as crypto } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "portfolio-src", "content.html");
const MEDIA = join(root, "portfolio-src");
const OUT = join(root, "portfolio", "index.html");
const ITERATIONS = 600000;
const PAYLOAD_RE = /(<script type="application\/json" id="payload">)[\s\S]*?(<\/script>)/;

const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".avif": "image/avif",
  ".mp4": "video/mp4", ".webm": "video/webm", ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".pdf": "application/pdf",
};

const writePayload = async json => {
  const page = await readFile(OUT, "utf8");
  if (!PAYLOAD_RE.test(page)) throw new Error("payload block not found in portfolio/index.html");
  await writeFile(OUT, page.replace(PAYLOAD_RE, (_, a, b) => a + json + b));
};

const askHidden = prompt => new Promise((resolve, reject) => {
  const { stdin, stdout } = process;
  if (!stdin.isTTY) return reject(new Error("no terminal to type the password in; run this in a terminal"));
  stdout.write(prompt);
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  let value = "";
  const onData = ch => {
    for (const c of ch) {
      if (c === "\r" || c === "\n") {
        stdin.setRawMode(false); stdin.pause(); stdin.off("data", onData); stdout.write("\n");
        return resolve(value);
      }
      if (c === "\u0003") { stdout.write("\n"); process.exit(130); }
      if (c === "\u007f" || c === "\b") value = value.slice(0, -1);
      else value += c;
    }
  };
  stdin.on("data", onData);
});

const inlineMedia = async html => {
  // comments hold editing notes and commented-out examples; they are not published
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  const refs = [...new Set([...html.matchAll(/(?:src|poster)="(media\/[^"]+)"/g)].map(m => m[1]))];
  for (const ref of refs) {
    const file = join(MEDIA, ref);
    if (!existsSync(file)) throw new Error(`missing media file: portfolio-src/${ref}`);
    const mime = MIME[extname(file).toLowerCase()];
    if (!mime) throw new Error(`unsupported media type: ${ref}`);
    const data = (await readFile(file)).toString("base64");
    html = html.split(`"${ref}"`).join(`"data:${mime};base64,${data}"`);
  }
  return { html, count: refs.length };
};

const b64 = buf => Buffer.from(buf).toString("base64");

if (process.argv.includes("--clear")) {
  await writePayload("{}");
  console.log("portfolio/index.html: payload cleared");
  process.exit(0);
}

if (!existsSync(SRC)) {
  console.error("portfolio-src/content.html が見つかりません。");
  process.exit(1);
}

let password = process.env.PORTFOLIO_PASSWORD;
if (!password) {
  password = await askHidden("閲覧用パスワード: ");
  const again = await askHidden("もう一度入力: ");
  if (password !== again) { console.error("パスワードが一致しません。"); process.exit(1); }
}
if (!password) { console.error("パスワードが空です。"); process.exit(1); }
// short passwords are allowed (owner's call) but the page can be brute-forced offline
if (password.length < 10) console.warn("注意: 短いパスワードは総当たりで解読されやすくなります（10文字以上・英数字混在がおすすめ）。");

const { html, count } = await inlineMedia(await readFile(SRC, "utf8"));
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
  base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
);
const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(html));

const json = JSON.stringify({ v: 1, iter: ITERATIONS, salt: b64(salt), iv: b64(iv), ct: b64(ct) });
await writePayload(json);

const mb = (json.length / 1024 / 1024).toFixed(1);
console.log(`portfolio/index.html を更新しました（メディア ${count} 件埋め込み、${mb} MB）`);
if (json.length > 15 * 1024 * 1024) console.warn("注意: ページが大きすぎます。動画は YouTube の限定公開などにして埋め込むのがおすすめです。");
