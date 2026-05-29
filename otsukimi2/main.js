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
  // Target date configuration: July 18, 2026 at 18:00
  const targetDate = new Date('2026-07-18T18:00:00+09:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      // Event has started or completed layout override
      const timerContainer = document.getElementById('countdown-timer');
      if (timerContainer) {
        timerContainer.innerHTML = "<div class='font-lime' style='font-size:1.5rem; width:100%; text-align:center;'>EVENT IS ALREADY LIVE</div>";
      }
      return;
    }

    // Mathematical breakdown of milliseconds units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Dom population mapping with pad-zero safety format
    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
    if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
  }

  // Initial call and standard interval cycle bind
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 4. DJ Lineup Profile Modals Logic
  // ==========================================
  const djProfiles = {
    ikumante: {
      name: "ikumante",
      bio: "ikumante는 아날로그 신디사이저와 정교한 모듈러 시스템을 다루며 차갑고도 우주적인 질감의 하드 테크노 사운드를 구축하는 일렉트로닉 프로듀서입니다. 미니멀한 비트 루프 위로 서서히 고조되는 가공할 만한 사운드월(Soundwall)을 통해 관객들을 기하학적이고 트랜스적인 청각적 명상의 세계로 안내합니다."
    },
    murasaki: {
      name: "MURASAKI",
      bio: "MURASAKI는 보라색 네온 조명이 흐르는 지하 클럽 신에서 가장 뜨거운 주목을 받고 있는 하이 에너지 베이스 뮤직 디제이입니다. 육중한 퓨처 베이스, 트랩, 그리고 가슴을 찌르는 덥스텝 비트를 넘나들며 페스티벌급의 거대한 폭발력을 클럽 플로어에 고스란히 이식합니다."
    },
    norts: {
      name: "Norts",
      bio: "Norts는 깊고 묵직한 딥 하우스(Deep House)의 그루브와 펑키한 미니멀 비트를 절묘하게 직조해 내는 댄스플로어의 조율사입니다. 음악적 유행에 타협하지 않고, 스피커 전체를 가득 채우는 깊은 저음역과 긴장감 넘치는 세련된 퍼커션 사운드로 관객들이 지치지 않고 밤새도록 춤을 출 수 있는 최적의 바이브를 설계합니다."
    },
    yutan: {
      name: "ゆーたん (YUTAN)",
      bio: "ゆーたん은 청량하고 중독성 강한 오리지널 제이팝(J-POP) 트랙과 서브컬처 애니메이션 리믹스를 유로비트, 해피 하드코어 스타일과 결합해 전파하는 독보적인 텐션 마스터입니다. 지칠 틈 없는 빠른 템포의 전개와 무대를 압도하는 특유의 밝고 유쾌한 에너지로 클럽 안의 모두를 하나로 연결합니다."
    },
    tkg: {
      name: "TKG",
      bio: "TKG는 정통 미니멀 테크노와 다크 테크 하우스를 기반으로 활동하며 청중의 청각을 최면 상태로 빠뜨리는 정밀한 루프 아티سٹ입니다. 반복적인 킥 드럼 패턴 속에 미세하게 변화하는 신스 텍스처를 배치하여 댄스플로어에 발을 디딘 모든 이들이 이성을 잊고 사운드 자체에 몰입하게 만듭니다."
    },
    calyne: {
      name: "CALYNE",
      bio: "CALYNE은 서정적이고 몽환적인 멜로디 라인을 거대한 프로그레시브 하우스 및 트랜스 빌드업 속에 녹여내는 사운드 스토리텔러입니다. 밤하늘의 흐르는 달빛처럼 감성적이면서도 드라마틱한 기승전결의 연출을 통해 관객들의 마음 깊은 곳을 울리는 특별한 감동의 순간을 선사합니다."
    },
    subun: {
      name: "SUBUN",
      bio: "SUBUN은 심장을 터뜨릴 듯한 무자비한 속도의 하드코어 테크노, 프렌치코어, 그리고 날카로운 인더스트리얼 텍스처로 무대를 폭발시키는 강력한 에너자이저입니다. 타협 없는 강렬한 타격감의 킥 사운드와 사정없이 쏟아지는 하이피치 신스 노이즈로 댄스플로어의 아드레날린을 한계치까지 끌어올립니다."
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
  // 5. Ticket Reservation Booking Dialog & Google Sheets Integration
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

  const bookingForm = document.getElementById('ticket-booking-form');
  const stageForm = document.getElementById('booking-stage-form');
  const stageSuccess = document.getElementById('booking-stage-success');
  const submitBtn = document.getElementById('confirm-booking-btn');

  function resetBookingForm() {
    if (bookingForm) bookingForm.reset();
    if (stageForm) stageForm.classList.remove('display-none');
    if (stageSuccess) stageSuccess.classList.add('display-none');
    if (submitBtn) {
      submitBtn.innerText = '예매 신청 완료하기';
      submitBtn.disabled = false;
    }
  }

  if (bookingForm && stageForm && stageSuccess && submitBtn) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.innerText = '예매 처리 중...';
      submitBtn.disabled = true;

      const name = document.getElementById('buyer-name').value;
      const phone = document.getElementById('buyer-phone').value;
      const qty = parseInt(document.getElementById('ticket-quantity').value) || 1;
      const total = qty * 15000;
      const randomNo = 'OT-' + Math.floor(10000000 + Math.random() * 90000000);

      const bookingData = {
        receiptNo: randomNo,
        name: name,
        phone: phone,
        qty: qty + '매',
        total: total.toLocaleString() + ' KRW'
      };

      // 【修正】新しくデプロイに成功した最新のGAS「ウェブアプリURL」に差し替え
      const gasWebappUrl = "https://script.google.com/macros/s/AKfycbwKnQdQz8goP2I4682LAZuMRcf8okwn1onSfbN2Xqh3-6SkbSEC9eKGoqyjftgXGATqgQ/exec";

      // 【修正】CORS制限およびGAS特有のリダイレクトエラーを完全に防ぐfetch設定
      fetch(gasWebappUrl, {
        method: "POST",
        mode: "cors",
        redirect: "follow", // リダイレクトに自動追従させる
        headers: {
          "Content-Type": "text/plain;charset=utf-8" // OPTIONSリクエスト(CORS)を回避するための設定
        },
        body: JSON.stringify(bookingData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          if (data.result === "success") {
            // レシート表示に必要なDOMマッピング
            document.getElementById('receipt-no').innerText = randomNo;
            document.getElementById('receipt-name').innerText = name;
            document.getElementById('receipt-qty').innerText = `${qty}매`;
            document.getElementById('receipt-total').innerText = total.toLocaleString() + ' KRW';

            stageForm.classList.add('display-none');
            stageSuccess.classList.remove('display-none');
          } else {
            console.error("GAS execution error:", data.error);
            alert("예매 처리 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
          }
        })
        .catch(error => {
          console.error("Error saving to sheet:", error);
          alert("예매 처리 중 통신 오류가 발생했습니다. 네트워크 상태를 확인하시거나 다시 시도해 주세요.");
        })
        .finally(() => {
          submitBtn.innerText = '예매 신청 완료하기';
          submitBtn.disabled = false;
        });
    });
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
