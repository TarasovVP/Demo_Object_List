import { fetchItems } from './data.js';

const listEl = document.getElementById('list');
const statusEl = document.getElementById('status');

async function load() {
  showStatus('Загрузка…');

  try {
    const items = await fetchItems();
    renderList(items);
    hideStatus();
  } catch (e) {
    showStatus(`Ошибка: ${e.message ?? e}`, true);
  }
}

function renderList(items) {
  listEl.innerHTML = '';
  for (const text of items) {
    const li = document.createElement('li');
    li.className = 'list-item';

    const dot = document.createElement('span');
    dot.className = 'bullet';

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    li.append(dot, span);
    listEl.appendChild(li);
  }
  listEl.hidden = false;
}

function showStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.display = '';
  statusEl.style.color = isError ? '#fca5a5' : '';
}

function hideStatus() {
  statusEl.style.display = 'none';
}

load();