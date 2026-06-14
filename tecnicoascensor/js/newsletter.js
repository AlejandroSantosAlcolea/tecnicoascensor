// ── NEWSLETTER.JS ──
const form = document.querySelector('.newsletter-form');
if (form) {
  const btn = form.querySelector('button');
  btn.addEventListener('click', () => {
    const email = form.querySelector('input[type="email"]').value;
    if (email && email.includes('@')) {
      btn.textContent = '¡Suscrito! ✓';
      btn.style.background = '#30d158';
      btn.style.color = 'white';
    } else {
      alert('Introduce un email válido');
    }
  });
}
