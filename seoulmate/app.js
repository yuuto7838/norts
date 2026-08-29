document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initStickyCTA();
  initTicketGenerator();
});

/* =========================================================================
   1. NAVIGATION BAR ACTIONS
   ========================================================================= */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#ffffff';
        navMenu.style.padding = '20px';
        navMenu.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
      }
    });
  }
}

/* =========================================================================
   2. STICKY CTA BAR OBSERVER
   ========================================================================= */
function initStickyCTA() {
  const stickyBar = document.getElementById('sticky-cta-bar');
  const heroSection = document.getElementById('hero');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    if (heroBottom <= 0) {
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
  const animElements = document.querySelectorAll('.scroll-anim');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  animElements.forEach((el) => observer.observe(el));
}

/* =========================================================================
   4. TICKET GENERATOR FORM (RSVP)
   ========================================================================= */
function initTicketGenerator() {
  const form = document.getElementById('ticket-form');
  const passContainer = document.getElementById('issued-pass-container');
  const passName = document.getElementById('pass-name');
  const passId = document.getElementById('pass-id');
  const passQty = document.getElementById('pass-qty');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('user-name').value;
    const qtyVal = document.getElementById('ticket-count').value;

    const randomId = 'SM-' + Math.floor(100000 + Math.random() * 900000);

    passName.textContent = nameVal;
    passId.textContent = randomId;
    passQty.textContent = `${qtyVal} 枚`;

    passContainer.classList.remove('hidden');
    passContainer.scrollIntoView({ behavior: 'smooth' });

    form.reset();
  });
}
