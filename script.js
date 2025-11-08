// ---- MODO OSCURO / CLARO ----
const toggle = document.getElementById('themeToggle');
const userPref = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', userPref);
toggle.textContent = userPref === 'dark' ? '☀️' : '🌙';

toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ---- SISTEMA DE COMENTARIOS ----
const form = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

function loadComments() {
  const saved = JSON.parse(localStorage.getItem('comments') || '[]');
  commentList.innerHTML = '';
  saved.forEach(c => {
    const div = document.createElement('div');
    div.classList.add('comment');
    div.innerHTML = `<strong>${c.name}</strong> <small>${c.date}</small><p>${c.message}</p>`;
    commentList.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !message) return;

  const comment = {
    name,
    message,
    date: new Date().toLocaleString()
  };
  const saved = JSON.parse(localStorage.getItem('comments') || '[]');
  saved.unshift(comment);
  localStorage.setItem('comments', JSON.stringify(saved));
  form.reset();
  loadComments();
});

loadComments();
