/* =========================================================================
   S(E)OULMATE - Application Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStickyCta();
  initScrollAnimations();
  initRsvpForm();
});

/* =========================================================================
   1. NAVIGATION BAR ACTIONS
   ========================================================================= */
function initNavbar() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#f3f3f3';
        navMenu.style.padding = '20px';
        navMenu.style.borderRadius = '24px';
        navMenu.style.border = '1px solid #e0e0e0';
      }
    });
  }
}

/* =========================================================================
   2. STICKY CTA BAR (Scroll Trigger)
   ========================================================================= */
function initStickyCta() {
  const stickyBar = document.querySelector('.sticky-cta-bar');
  const heroSection = document.querySelector('.hero-band');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    if (heroBottom < 100) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });
}

/* =========================================================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================================================= */
function initScrollAnimations() {
  const animTargets = document.querySelectorAll('.scroll-anim');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animTargets.forEach(target => observer.observe(target));
}

/* =========================================================================
   4. RSVP & DIGITAL PASS MANAGEMENT
   ========================================================================= */
function initRsvpForm() {
  const rsvpForm = document.getElementById('ticket-form');
  const passContainer = document.getElementById('issued-pass-container');
  const passHolderName = document.getElementById('pass-name');
  const passIdDisplay = document.getElementById('pass-id');

  if (!rsvpForm) return;

  const savedPass = localStorage.getItem('seoulmate_pass');
  if (savedPass) {
    const passData = JSON.parse(savedPass);
    renderDigitalPass(passData.name, passData.id);
  }

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('user-name');
    if (!nameInput || !nameInput.value.trim()) return;

    const name = nameInput.value.trim();
    const passId = 'SM-' + Math.floor(100000 + Math.random() * 900000);

    const passData = { name, id: passId };
    localStorage.setItem('seoulmate_pass', JSON.stringify(passData));

    renderDigitalPass(name, passId);
  });

  function renderDigitalPass(name, id) {
    if (passHolderName) passHolderName.textContent = name;
    if (passIdDisplay) passIdDisplay.textContent = id;

    rsvpForm.classList.add('hidden');
    if (passContainer) passContainer.classList.remove('hidden');
  }
}
