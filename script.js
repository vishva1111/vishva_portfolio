/* ============================================================
   VISHVA SONAGARA PORTFOLIO — script.js
   ============================================================ */

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 60);
  backTop.classList.toggle('visible', scrollY > 500);
  highlightNav();
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

// ===== BACK TO TOP =====
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== TYPEWRITER =====
const roles = ['React.js Apps', 'Responsive UIs', 'Clean Interfaces', 'Scalable Frontends'];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  const current = roles[rIdx];
  roleEl.textContent = deleting
    ? current.substring(0, cIdx - 1)
    : current.substring(0, cIdx + 1);
  deleting ? cIdx-- : cIdx++;

  let delay = deleting ? 55 : 95;
  if (!deleting && cIdx === current.length) { delay = 2200; deleting = true; }
  else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }
  setTimeout(typeRole, delay);
}
typeRole();

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ===== SKILL BARS =====
const skillsGrid = document.querySelector('.skills__grid');
if (skillsGrid) {
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill__fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.getAttribute('data-w') + '%'; }, 200);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  skillObs.observe(skillsGrid);
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const note = document.getElementById('formNote');
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
      note.textContent = '✅ Message sent! I\'ll get back to you soon.';
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      this.reset();
      setTimeout(() => { note.textContent = ''; }, 5000);
    }, 1500);
  });
}

// ===== CURSOR GLOW =====
const glow = document.createElement('div');
glow.style.cssText = `
  position:fixed; width:400px; height:400px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%);
  pointer-events:none; z-index:0; transform:translate(-50%,-50%);
  transition:left 0.2s ease, top 0.2s ease; will-change:left,top;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});