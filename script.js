/* ===================================================
   PRODIGY_WD_01 — script.js
   Interactive Navigation + Scroll Animations
   =================================================== */

'use strict';

// ─── DOM REFERENCES ────────────────────────────────────
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');
const scrollTop = document.getElementById('scroll-top');
const sections  = document.querySelectorAll('section[id]');
const skillBars = document.querySelectorAll('.skill-bar');
const revealEls = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contact-form');

// ─── 1. NAVBAR — SCROLL TRANSFORM ──────────────────────
/**
 * Adds/removes `.scrolled` class on navbar when the user
 * scrolls past a threshold, triggering background blur,
 * shadow and height change via CSS transitions.
 */
function handleNavbarScroll() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('scrolled', scrolled);
  scrollTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load


// ─── 2. NAVBAR — ACTIVE LINK ON SCROLL ─────────────────
/**
 * Highlights the nav link whose section is currently in view.
 * Uses IntersectionObserver for performance.
 */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));


// ─── 3. NAVBAR — HOVER RIPPLE EFFECT ──────────────────
/**
 * Creates a small ripple element on each nav link hover
 * for a premium micro-interaction feel.
 */
navLinks.forEach((link) => {
  link.addEventListener('mouseenter', (e) => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; inset:0;
      border-radius:8px;
      background: radial-gradient(circle at center, rgba(124,58,237,0.15), transparent 70%);
      pointer-events:none;
      animation: ripple-fade 0.4s ease forwards;
    `;
    link.style.position = 'relative';
    link.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  });
});

// inject ripple keyframes once
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-fade {
    from { opacity: 1; transform: scale(0.8); }
    to   { opacity: 0; transform: scale(1.2); }
  }
`;
document.head.appendChild(rippleStyle);


// ─── 4. HAMBURGER MENU (MOBILE) ────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  }
});


// ─── 5. SMOOTH SCROLL FOR ALL ANCHOR LINKS ─────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ─── 6. SCROLL-TO-TOP BUTTON ───────────────────────────
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ─── 7. SKILL BAR ANIMATION ────────────────────────────
/**
 * Animates skill bars to their target width when they
 * enter the viewport. Uses IntersectionObserver.
 */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar  = entry.target;
        const fill = bar.querySelector('.skill-fill');
        const pct  = bar.getAttribute('data-width');
        // small delay for staggered feel
        const index = [...skillBars].indexOf(bar);
        setTimeout(() => {
          fill.style.width = `${pct}%`;
        }, index * 80);
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));


// ─── 8. SCROLL REVEAL ANIMATION ────────────────────────
/**
 * Elements with class `.reveal` fade in from below as they
 * enter the viewport.
 */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Auto-add reveal to major content blocks
document.querySelectorAll(
  '.about-grid, .skills-grid .skill-card, .work-grid .work-card, .contact-wrapper'
).forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


// ─── 9. CONTACT FORM ───────────────────────────────────
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('btn-send');
  const originalText = btn.textContent;

  // loading state
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // simulate async send
  setTimeout(() => {
    btn.textContent = '✅ Message Sent!';
    btn.style.opacity = '1';
    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  }, 1500);
});


// ─── 10. NAVBAR COLOR SHIFT ON SECTION ─────────────────
/**
 * Subtly shifts the navbar accent color depending on which
 * section is active — a premium touch that reinforces
 * contextual awareness.
 */
const sectionColors = {
  home:    '#7c3aed',
  about:   '#7c3aed',
  skills:  '#06b6d4',
  work:    '#a78bfa',
  contact: '#34d399',
};

const accentObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const color = sectionColors[id];
        if (color) {
          document.documentElement.style.setProperty('--accent', color);
        }
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach((s) => accentObserver.observe(s));


// ─── 11. PARALLAX ORB MOVEMENT ─────────────────────────
/**
 * Subtle parallax on hero orbs following mouse movement.
 */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;  // -1 to 1
  const dy = (e.clientY - cy) / cy;

  if (orb1) orb1.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
  if (orb2) orb2.style.transform = `translate(${-dx * 20}px, ${-dy * 15}px)`;
}, { passive: true });


// ─── 12. WORK CARD TILT EFFECT ─────────────────────────
document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});


// ─── INIT LOG ───────────────────────────────────────────
console.log('%c PRODIGY_WD_01 ✅', 'color:#a78bfa;font-size:18px;font-weight:bold;');
console.log('%c Responsive Landing Page with Interactive Navigation', 'color:#67e8f9;');
console.log('%c Scroll ↓ to see the nav transform!', 'color:#34d399;');
