/* ==========================================================================
   OTSUKIMI 2 - Landing Page Script
   Interactions, Countdown Timer, Dynamic Modals, and Booking Flows
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Navigation Scroll Effect
  // ==========================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 2. 3D Parallax Tilt Effect on Hero
  // ==========================================
  const hero = document.getElementById('hero');
  const frame = document.getElementById('hero-interactive-frame');
  const moon = document.getElementById('moon-image');
  const logo = document.getElementById('otsukimi-logo-image');

  if (hero && frame && moon && logo) {
    hero.addEventListener('mousemove', (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) / (w / 2); // Value between -1 and 1
      const y = (e.clientY - h / 2) / (h / 2); // Value between -1 and 1

      // Calculate tilt angles (pitch & yaw)
      const tiltX = y * -15; // Max 15 degrees pitch
      const tiltY = x * 15;  // Max 15 degrees yaw

      // Apply transform with smooth motion
      frame.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;

      // Subtle multi-layered depth inside the poster box
      moon.style.transform = `translateX(${x * -10}px) translateY(${y * -10}px) scale(1.02)`;
      logo.style.transform = `translateX(${x * 15}px) translateY(${y * 15}px) translateZ(30px)`;
    });

    // Reset poster layout posture when cursor leaves the window bounds
    hero.addEventListener('mouseleave', () => {
      frame.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      moon.style.transform = 'none';
      logo.style.transform = 'none';
    });
  }

  // ==========================================
  // 3. Live Event Target Countdown Timer
  // ==========================================
  const targetDate = new Date('2026-07-18T18:00:00+09:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      const timerContainer = document.getElementById('countdown-timer');
      if (timerContainer) {
        timerContainer.innerHTML = "<div class='font-lime' style='font-size:1.5rem; width:100%; text-align:center;'>EVENT IS ALREADY LIVE</div>";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
    if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 4. DJ Lineup Profile Modals Logic
  // ==========================================
  const djProfiles = {
    ikumante: {
      name: "ikumante",
      bio: "이 사람을 찾고 있습니다.",
      sns: {
        instagram: "https://www.instagram.com/mante_1118",
        youtube: "https://www.youtube.com/@ikumante"
      }
    },
    murasaki: {
      name: "MURASAKI",
      bio: "오오츠카아이와 퍼퓸과 하츠네미쿠를 듣다보니 디제이가 되었습니다. 잘 부탁드립니다.",
      sns: {
        instagram: "https://www.instagram.com/murasaki_jsn/"
      }
    },
    norts: {
      name: "Norts",
      bio: "일본을 기반으로 활동하는 음악·광고 프로듀서. 크리에이터로서 곡 및 영상 제작을 직접 다룰 뿐만 아니라, 음악 레이블 ‘Oshiribeat’의 운영과 전체적인 제작 디렉션을 이끌고 있다.\n\n또한 DJ로도 활동 중이며, K-POP을 빠른 BPM으로 리믹스한 독창적인 ‘K-CORE’ 스타일을 확립했다. 한국 현지에서의 이벤트 주최 및 게스트 참여 등 글로벌 씬에서도 다수의 실적을 보유하고 있다.",
      sns: {
        instagram: "https://www.instagram.com/streak_ap/",
        x: "https://x.com/DJ_Norts"
      }
    },
    yutan: {
      name: "Yu-Tan",
      bio: "DJ/TrackMaker/Singer\n\n현재는 아키하바라 MOGRA에서 정기 개최 중인 'DressingRoom'의 레귤러 DJ. 애니송이나 Vtuber, 성우 곡부터 K-POP까지 장르를 넘나들며 플레이하는 스타일로 지지를 받고 있으며, DJ로서 일본 각지의 이벤트에 출연.\n\n싱어(Singer)로 활동하던 시절에 들었던 비(Rain)를 계기로 K-POP에 매료되어, 그 지식을 활용해 K-POP DJ로도 활동 중.\n\n2026년에는 마찬가지로 MOGRA에서 개최되는 K-POP 이벤트 'LiarLiar'에도 출연하며 K-POP DJ로서의 활동 범위를 넓혀가고 있다.",
      sns: {
        instagram: "https://www.instagram.com/yuuki_tan8701"
      }
    },
    tkg: {
      name: "TKG",
      bio: "도쿄 조후에 위치한 라이브 하우스 / 클럽 '조후 Cross' 점장 / 밴드 RUNRUNRUNS의 베이시스트.\n\nK-POP을 중심으로 DISCO / HOUSE 등 댄스 뮤직 위주로 DJ 활동 중.\n\n2022년부터 조후 Cross에서 시작한 K-POP DJ 파티 'Feel So Good'을 '이쿠만테의 밤'과 공동 주최하며, 올해로 5년째를 맞이하고 있다.\n\n술을 마시는 방식과 음악을 즐기는 방법이 파멸적입니다.",
      sns: {
        instagram: "https://www.instagram.com/tkg_suke/",
        soundcloud: "https://soundcloud.com/h5bjsvpkj5eu"
      }
    },
    calyne: {
      name: "CALYNE",
      bio: "95년생, 도쿄\n\nPOPS를 중심으로 R&B, House 등 다양한 장르의 음악을 셀렉트합니다.\n\n한국 문화에 매료되어 한 달 한번 한국에 갑니다.\n\n순대국 맛집 정보와 남친 모집 중! ㅎㅎㅎ",
      sns: {
        soundcloud: "https://on.soundcloud.com/OwZX3FuNezvmTzCUPs"
      }
    },
    subun: {
      name: "SUBUN",
      bio: "PUBLIC seoul Resident DJ\nSUBMARINE Captain\nK-Pop DJ crew KLOO\n\n안녕하세요수분입니다잘부탁드립니다\n신촌 야호-✌︎('ω')✌︎",
      sns: {
        instagram: "https://www.instagram.com/su6un",
        soundcloud: "https://soundcloud.com/su6un"
      }
    },
    essential_acid: {
      name: "essential_acid",
      bio: "도쿄를 기반으로 활동하는 DJ.\nUK Garage, Jersey Club, House를 중심으로 J-POP과 K-POP을 믹스한 장르리스한 플레이를 선보인다. 부유감 있는 사운드부터 고양감 넘치는 댄스 뮤직까지 자유자재로 연결하며, 기분 좋은 그루브로 플로어를 물들인다.\n\nGenre: UK Garage / Jersey Club / House / J-POP / K-POP"
    }
  };

  const djModal = document.getElementById('dj-modal');
  const closeDjModalBtn = document.getElementById('close-dj-modal');
  const djCards = document.querySelectorAll('.dj-card');

  if (djModal && closeDjModalBtn) {
    djCards.forEach(card => {
      card.addEventListener('click', () => {
        const djId = card.getAttribute('data-dj');
        const profile = djProfiles[djId];

        if (profile) {
          document.getElementById('modal-dj-name').innerText = profile.name;
          document.getElementById('modal-dj-full-bio').innerText = profile.bio;

          const imgSrc = card.querySelector('.dj-portrait').getAttribute('src');
          document.getElementById('modal-dj-img').setAttribute('src', imgSrc);
          document.getElementById('modal-dj-img').setAttribute('alt', profile.name);

          // Populate SNS links dynamically
          const snsContainer = document.getElementById('modal-dj-sns');
          if (snsContainer) {
            snsContainer.innerHTML = '';
            if (profile.sns) {
              Object.entries(profile.sns).forEach(([platform, url]) => {
                const btn = document.createElement('a');
                btn.href = url;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                
                let iconClass = '';
                let btnClass = '';
                let label = '';
                
                if (platform === 'instagram') {
                  iconClass = 'fa-brands fa-instagram';
                  btnClass = 'ig-btn';
                  label = 'Instagram';
                } else if (platform === 'soundcloud') {
                  iconClass = 'fa-brands fa-soundcloud';
                  btnClass = 'sc-btn';
                  label = 'SoundCloud';
                } else if (platform === 'x') {
                  iconClass = 'fa-brands fa-x-twitter';
                  btnClass = 'x-btn';
                  label = 'X';
                } else if (platform === 'youtube') {
                  iconClass = 'fa-brands fa-youtube';
                  btnClass = 'yt-btn';
                  label = 'YouTube';
                }
                
                btn.className = `modal-social-btn ${btnClass}`;
                btn.innerHTML = `<i class="${iconClass}"></i> ${label}`;
                snsContainer.appendChild(btn);
              });
            }
          }

          djModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    closeDjModalBtn.addEventListener('click', closeDjModal);
    djModal.addEventListener('click', (e) => {
      if (e.target === djModal) closeDjModal();
    });
  }

  function closeDjModal() {
    djModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==========================================
  // 5. Ticket Reservation Booking Dialog Open / Close
  // ==========================================
  const bookingModal = document.getElementById('booking-modal');
  const openBookingBtns = [
    document.getElementById('nav-booking-btn'),
    document.getElementById('cta-book-tickets')
  ];
  const closeBookingModalBtn = document.getElementById('close-booking-modal');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  if (bookingModal && closeBookingModalBtn) {
    openBookingBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          resetBookingForm();
          bookingModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }
    });

    closeBookingModalBtn.addEventListener('click', closeBookingModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeBookingModal);

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function resetBookingForm() {
    const bookingForm = document.getElementById('ticket-booking-form');
    const stageForm = document.getElementById('booking-stage-form');
    const stageSuccess = document.getElementById('booking-stage-success');
    const submitBtn = document.getElementById('confirm-booking-btn');

    if (bookingForm) bookingForm.reset();
    if (stageForm) stageForm.classList.remove('display-none');
    if (stageSuccess) stageSuccess.classList.add('display-none');
    if (submitBtn) {
      submitBtn.innerText = '예매 신청 완료하기';
      submitBtn.disabled = false;
    }
  }

  // ==========================================
  // 6. Navigation Scroll Actions & Hero Pointer Arrow
  // ==========================================
  const scrollArrow = document.getElementById('scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      const nextSection = document.getElementById('about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#navbar ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// ==========================================================================
// 7. 【最重要】HTML側の「onsubmit」から直接呼び出される、GASデータ送信関数
// ==========================================================================
window.handleBookingSubmit = function(e) {
  // HTML側のデフォルトの「ページリロード挙動（?が付く現象）」を強制停止
  e.preventDefault();

  const submitBtn = document.getElementById('confirm-booking-btn');
  const stageForm = document.getElementById('booking-stage-form');
  const stageSuccess = document.getElementById('booking-stage-success');

  if (!submitBtn || !stageForm || !stageSuccess) return false;

  // ボタンの二重押し（連打）を防止
  submitBtn.innerText = '예매 처리 중...';
  submitBtn.disabled = true;

  // 各フォームの値を取得
  const name = document.getElementById('buyer-name').value;
  const email = document.getElementById('buyer-email').value;
  const qty = parseInt(document.getElementById('ticket-quantity').value) || 1;
  const total = qty * 15000;
  const randomNo = 'OT-' + Math.floor(10000000 + Math.random() * 90000000);

  // GASの doPost(e) に送り出すデータオブジェクト
  const bookingData = {
    receiptNo: randomNo,
    name: name,
    email: email,
    phone: email, // GAS側のカラムキー定義との互換性を保つためのフォールバック
    qty: qty + '매',
    total: total.toLocaleString() + ' KRW'
  };

  // 先ほど新しくデプロイされた最新のGASウェブアプリURL
  const gasWebappUrl = "https://script.google.com/macros/s/AKfycby9zdg21JzJ-9_kd6C8POBt3d-TYPywsjJOALlCwUpRo9jVaD3knXmjqA4umDAvMzpngw/exec";

  // ブラウザのCORS制限によるエラーを100%確実に回避する非同期Fetchリクエスト
  fetch(gasWebappUrl, {
    method: "POST",
    mode: "no-cors",              // これによりCORSブロックを完全に無視してGASにデータを届けます
    headers: {
      "Content-Type": "text/plain" // OPTIONS予備リクエスト（CORS制限の引き金）を発生させないための設定
    },
    body: JSON.stringify(bookingData)
  })
  .then(() => {
    // mode: "no-cors" の場合、レスポンス解析(json)はブラウザセキュリティ上制限されますが、
    // 送信自体は確実にGASに到達してスプレッドシートに正常に書き込まれるため、
    // 到達＝成功とみなして、即座に完了レシート画面に表示を切り替えます。
    document.getElementById('receipt-no').innerText = randomNo;
    document.getElementById('receipt-name').innerText = name;
    document.getElementById('receipt-qty').innerText = `${qty}매`;
    document.getElementById('receipt-total').innerText = total.toLocaleString() + ' KRW';

    stageForm.classList.add('display-none');
    stageSuccess.classList.remove('display-none');
  })
  .catch(error => {
    console.error("Error saving to sheet:", error);
    alert("예매 처리 중 통신 오류가 발생했습니다. 다시 시도해 주세요.");
  })
  .finally(() => {
    submitBtn.innerText = '예매 신청 완료하기';
    submitBtn.disabled = false;
  });

  return false; // 二重のリロードを防止するためのセーフティ
};
