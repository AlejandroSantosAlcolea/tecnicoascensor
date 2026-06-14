// ── AFFILIATE.JS ──
// ⚠️ Edita tu ID de afiliado aquí (una sola vez)
// Formato España: tunombre-21

const AFFILIATE_TAG = 'tecnicoascen-21'; // ← CAMBIA ESTO por tu ID real

const products = {
  fluke117: `https://amzn.to/4us66uj`,
  FLUKE325: `https://amzn.to/3Qb6xLi`,
  FNMENGE: `https://amzn.to/3PQge1R`,
  guantes: `https://amzn.to/4xi9j1Z`,
  calzado: `https://amzn.to/4e3F06o`,
  linterna: `https://amzn.to/4fTGV0f`,
  ledCabina: `https://amzn.to/4ofM70m`,
  grasa: `https://amzn.to/4uZnGXz`,
  wd40: `https://amzn.to/4ujbwHP`,
  fluke1507: `https://amzn.to/4eBlaAW`,
  unit: `https://amzn.to/4omP2V7`,
  uvex1: `https://amzn.to/4vPb85b`
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
