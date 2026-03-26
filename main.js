/* =============================================
   JOSSEPH PERALTA — Portfolio JS
   ============================================= */

/* ---- NAVBAR SCROLL EFFECT ---- */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- MOBILE BURGER MENU ---- */
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') && !nav.contains(e.target)) {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ---- TYPING ANIMATION ---- */
const words = [
  'modern web apps.',
  'full-stack solutions.',
  'scalable backends.',
  'production-ready code.',
  'clean user interfaces.',
];

const typingEl = document.getElementById('typingText');
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
let isPaused   = false;

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 50 : 95;

  if (!isDeleting && charIndex === current.length) {
    // Finished typing — pause then delete
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting — next word
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

// Start after a short delay so page feels ready
setTimeout(type, 1200);

/* ---- SCROLL REVEAL (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

revealEls.forEach(el => observer.observe(el));

/* ---- STAGGER CHILDREN in project cards / skills ---- */
document.querySelectorAll('.projects__grid, .skills__grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    if (!child.classList.contains('reveal-up')) {
      child.style.transitionDelay = `${i * 60}ms`;
    }
  });
});

/* ---- ACTIVE NAV LINK on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__link[href^="#"]');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => a.style.color = '');
        link.style.color = 'var(--text)';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ---- SKILL CARDS — subtle tilt on hover ---- */
document.querySelectorAll('.skill').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- PROJECT CARDS — tilt on hover ---- */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s var(--ease), border-color 0.3s, box-shadow 0.3s';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});
