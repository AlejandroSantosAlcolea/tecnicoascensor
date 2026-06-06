// ── AFFILIATE.JS ──
// ⚠️ Edita tu ID de afiliado aquí (una sola vez)
// Formato España: tunombre-21

const AFFILIATE_TAG = 'tecnicoascen-21'; // ← CAMBIA ESTO por tu ID real

const products = {
  fluke117:    `https://www.amazon.es/dp/B000MWXMHC?tag=${AFFILIATE_TAG}`,
  hiokiCM4374: `https://www.amazon.es/dp/XXXXXXXXXX?tag=${AFFILIATE_TAG}`,
  fluke1507:   `https://www.amazon.es/dp/B000MWXABC?tag=${AFFILIATE_TAG}`,
  guantes:     `https://www.amazon.es/dp/XXXXXXXXXX?tag=${AFFILIATE_TAG}`,
  ledCabina:   `https://www.amazon.es/dp/XXXXXXXXXX?tag=${AFFILIATE_TAG}`,
  molykote:    `https://www.amazon.es/dp/XXXXXXXXXX?tag=${AFFILIATE_TAG}`,
};

// Aplica enlaces automáticamente a elementos con data-product="clave"
document.querySelectorAll('[data-product]').forEach(el => {
  const key = el.getAttribute('data-product');
  if (products[key]) {
    el.href = products[key];
    el.target = '_blank';
    el.rel = 'nofollow sponsored';
  }
});
