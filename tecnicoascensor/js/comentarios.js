// ── COMENTARIOS.JS ──
// Sistema de comentarios local (localStorage)
// Cuando integres un backend real, sustituye loadComments() y saveComment()

const STORAGE_KEY = 'ta_comentarios';

function getPageId() {
  return window.location.pathname.replace(/\//g, '_').replace('.html', '') || 'index';
}

function loadComments() {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return all[getPageId()] || [];
  } catch { return []; }
}

function saveComment(comment) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const pageId = getPageId();
    if (!all[pageId]) all[pageId] = [];
    all[pageId].unshift(comment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch(e) { console.error('Error guardando comentario:', e); }
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function avatarColor(name) {
  const colors = ['#e8a020','#4caf80','#a070e8','#e05050','#64b5f6','#f06292'];
  let hash = 0;
  for (let c of name) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[hash];
}

function createCommentHTML(c) {
  const initials = c.nombre.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
  const color = avatarColor(c.nombre);
  const likeKey = `ta_like_${c.id}`;
  const liked = localStorage.getItem(likeKey) === '1';
  return `
    <div class="comment-item" data-id="${c.id}">
      <div class="comment-avatar" style="background:${color}">${initials}</div>
      <div class="comment-content">
        <div class="comment-meta">
          <span class="comment-name">${escapeHtml(c.nombre)}</span>
          ${c.suscriptor ? '<span class="comment-badge">Suscriptor</span>' : ''}
          <span class="comment-date">${formatDate(c.fecha)}</span>
        </div>
        <p class="comment-text">${escapeHtml(c.mensaje)}</p>
        <button class="comment-like ${liked ? 'liked' : ''}" data-id="${c.id}">
          <span class="like-icon">${liked ? '❤️' : '🤍'}</span>
          <span class="like-count">${c.likes || 0}</span>
        </button>
      </div>
    </div>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderComments(container, comments) {
  if (!comments.length) {
    container.innerHTML = `<p class="no-comments">Sé el primero en comentar.</p>`;
    return;
  }
  container.innerHTML = comments.map(createCommentHTML).join('');

  // Like handlers
  container.querySelectorAll('.comment-like').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const likeKey = `ta_like_${id}`;
      const liked = localStorage.getItem(likeKey) === '1';
      const countEl = btn.querySelector('.like-count');
      const iconEl = btn.querySelector('.like-icon');
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const pageId = getPageId();
      const comments = all[pageId] || [];
      const idx = comments.findIndex(c => c.id === id);
      if (idx === -1) return;
      if (!liked) {
        comments[idx].likes = (comments[idx].likes || 0) + 1;
        localStorage.setItem(likeKey, '1');
        btn.classList.add('liked');
        iconEl.textContent = '❤️';
      } else {
        comments[idx].likes = Math.max(0, (comments[idx].likes || 1) - 1);
        localStorage.removeItem(likeKey);
        btn.classList.remove('liked');
        iconEl.textContent = '🤍';
      }
      countEl.textContent = comments[idx].likes;
      all[pageId] = comments;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    });
  });
}

function initComments() {
  const section = document.querySelector('.comments-section');
  if (!section) return;

  const list = section.querySelector('.comments-list');
  const form = section.querySelector('.comment-form');
  const countEl = section.querySelector('.comments-count');

  // Comprobar si el usuario está "suscrito" (guardado en localStorage)
  const esSuscriptor = localStorage.getItem('ta_suscriptor') === '1';
  const nombreGuardado = localStorage.getItem('ta_nombre') || '';

  if (nombreGuardado) {
    form.querySelector('[name="nombre"]').value = nombreGuardado;
  }

  function refresh() {
    const comments = loadComments();
    countEl.textContent = comments.length;
    renderComments(list, comments);
  }

  refresh();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.querySelector('[name="nombre"]').value.trim();
    const mensaje = form.querySelector('[name="mensaje"]').value.trim();
    if (!nombre || !mensaje) return;

    // Guardar nombre para próxima vez
    localStorage.setItem('ta_nombre', nombre);

    const comment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
      nombre,
      mensaje,
      fecha: new Date().toISOString(),
      likes: 0,
      suscriptor: esSuscriptor,
    };

    saveComment(comment);
    form.querySelector('[name="mensaje"]').value = '';

    // Feedback visual
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '¡Publicado! ✓';
    btn.style.background = '#4caf80';
    setTimeout(() => {
      btn.textContent = 'Publicar comentario';
      btn.style.background = '';
    }, 2000);

    refresh();
  });
}

document.addEventListener('DOMContentLoaded', initComments);

// Marcar como suscriptor cuando se suscribe al newsletter
document.addEventListener('DOMContentLoaded', () => {
  const nlBtn = document.querySelector('.nl-form button');
  if (nlBtn) {
    nlBtn.addEventListener('click', () => {
      const email = document.querySelector('.nl-form input[type="email"]')?.value;
      if (email && email.includes('@')) {
        localStorage.setItem('ta_suscriptor', '1');
      }
    });
  }
});
