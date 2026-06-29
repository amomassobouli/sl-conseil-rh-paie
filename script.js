/* =========================================================
   S&L Conseil RH/Paie — Script partagé
   ========================================================= */

/* ── Hamburger menu ── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open.toString());
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Bouton de langue ── */
function updateLangBtn(lang) {
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'en' ? 'FR' : 'EN';
}

function toggleLang() {
  const body = document.body;
  body.classList.toggle('en');
  body.classList.toggle('fr');
  const lang = body.classList.contains('en') ? 'en' : 'fr';
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  updateLangBtn(lang);
}

/* ── Formulaire de contact (Formspree AJAX) ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const successMsg = document.getElementById('successMsg');
    const errorMsg   = document.getElementById('errorMsg');

    btn.disabled = true;
    btn.style.opacity = '0.7';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    } catch {
      if (errorMsg) errorMsg.style.display = 'block';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  });
}

/* ── Initialisation ── */
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'fr';
  document.body.className = lang;
  document.documentElement.lang = lang;
  updateLangBtn(lang);
  initHamburger();
  initContactForm();
});
