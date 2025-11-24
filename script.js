/* js/script.js
   - Homepage animations
   - Hero rotator
   - Navigation toggle
   - Scroll reveal
   - Contact form handler
   - Portfolio lightbox
   - Flip cards
   - Collage fade-in
*/

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------
      YEAR IN FOOTER
  --------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* --------------------------
      MOBILE NAV TOGGLE
  --------------------------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      if (isOpen) {
        nav.style.display = '';
        nav.dataset.open = 'false';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '20px';
        nav.style.top = '74px';
        nav.style.background = 'var(--bg)';
        nav.style.padding = '12px';
        nav.style.borderRadius = '10px';
        nav.style.boxShadow = '0 10px 30px rgba(40,50,47,0.06)';
        nav.dataset.open = 'true';
      }
    });
  }


  /* --------------------------
      HERO HEADLINE ROTATOR
  --------------------------- */
  (function rotateHeroLines() {
    const lines = Array.from(document.querySelectorAll('.hero-title .hero-line'));
    if (!lines.length) return;
    let idx = 0;

    lines.forEach((el, i) => el.classList.toggle('active', i === 0));

    setInterval(() => {
      lines[idx].classList.remove('active');
      idx = (idx + 1) % lines.length;
      lines[idx].classList.add('active');
    }, 2600);
  })();


  /* --------------------------
      SCROLL REVEAL ANIMATIONS
  --------------------------- */
  (function revealOnScroll() {
    const elements = document.querySelectorAll(
      '.reveal, .work-card, .service-card, .about-img img, .hero-image img'
    );
    const cfg = { threshold: 0.06, rootMargin: '0px 0px -10% 0px' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, cfg);

    elements.forEach(el => observer.observe(el));
  })();


  /* --------------------------
      CONTACT FORM HANDLER
  --------------------------- */
  (function contactForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('contactNote');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Validation
      if (!name || !email || !message) {
        note.textContent = 'Please fill all required fields.';
        note.style.color = 'crimson';
        return;
      }

      // Fake sending simulation
      note.textContent = 'Sending...';
      note.style.color = 'rgba(40,50,47,0.7)';

      setTimeout(() => {
        form.reset();
        note.textContent = 'Thanks! Your message has been received. We will reply within 48 hours.';
        note.style.color = 'green';
      }, 900);
    });
  })();


  /* --------------------------
      PORTFOLIO LIGHTBOX
  --------------------------- */
  (function portfolioLightbox() {
    const items = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbDesc = document.getElementById('lightbox-desc');
    const lbClose = document.getElementById('lightbox-close');

    if (!items || !lightbox) return;

    items.forEach(item => {
      item.addEventListener('click', (ev) => {
        ev.preventDefault();
        const src = item.dataset.src || item.querySelector('img')?.src || '';
        const title = item.dataset.title || '';
        const desc = item.dataset.desc || '';

        lbImg.src = src;
        lbImg.alt = title || 'Preview';
        lbTitle.textContent = title;
        lbDesc.textContent = desc;

        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const close = () => {
      lightbox.style.display = 'none';
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.src = '';
    };

    lbClose?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();


  /* --------------------------
      FLIP CARDS
  --------------------------- */
  (function flipCards() {
    document.querySelectorAll(".service-card").forEach(card => {
      const btns = card.querySelectorAll(".flip-btn");

      btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          card.classList.toggle("flipped");
        });
      });
    });
  })();

});


/* --------------------------
    COLLAGE FADE IN
--------------------------- */
window.addEventListener("load", () => {
  const collage = document.querySelector(".hero-collage");
  if (collage) {
    setTimeout(() => collage.classList.add("fade-in-left"), 400);
  }
});


  // Highlight active nav link
  const navLinks = document.querySelectorAll('.nav a');
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

