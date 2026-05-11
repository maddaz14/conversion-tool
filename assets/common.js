/* ──────────────────────────────────────────────────────────────
 * Shared utilities for Gondrong STIES Tools
 * ────────────────────────────────────────────────────────────── */

// ─── FILE HELPERS ───────────────────────────────────────────────
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function downloadText(text, filename, mime = 'text/plain') {
  downloadBlob(new Blob([text], { type: mime }), filename);
}

function baseName(file) {
  if (typeof file === 'string') return file.replace(/\.[^.]+$/, '');
  return (file.name || 'file').replace(/\.[^.]+$/, '');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ─── DROPZONE HELPER ────────────────────────────────────────────
/**
 * Wire up a dropzone element so it accepts drag/drop and click-to-browse.
 * onFiles(FileList) is called whenever new files are added.
 */
function setupDropzone(zoneId, inputId, onFiles, options = {}) {
  const zone = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  if (!zone || !input) return;

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
      onFiles(e.dataTransfer.files);
    }
  });
  input.addEventListener('change', () => {
    if (input.files.length) onFiles(input.files);
  });
}

// ─── STATUS / PROGRESS ─────────────────────────────────────────
function showStatus(elementId, type, msg) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.className = 'status-alert show ' + type;
  const icon = { success: '✅', error: '⚠️', info: 'ℹ️' }[type] || '';
  el.innerHTML = (icon ? icon + ' ' : '') + msg;
}

function hideStatus(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.className = 'status-alert';
}

function showProgress(wrapId, fillId, labelId, pct, label) {
  const wrap = document.getElementById(wrapId);
  const fill = document.getElementById(fillId);
  const lab = document.getElementById(labelId);
  if (wrap) wrap.style.display = 'block';
  if (fill) fill.style.width = pct + '%';
  if (lab) lab.textContent = label;
}

function hideProgress(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (wrap) wrap.style.display = 'none';
}

// ─── CLIPBOARD ────────────────────────────────────────────────
async function copyToClipboard(text, statusElementId = null) {
  try {
    await navigator.clipboard.writeText(text);
    if (statusElementId) showStatus(statusElementId, 'success', 'Disalin ke clipboard!');
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) { ok = false; }
    document.body.removeChild(textarea);
    if (statusElementId) {
      showStatus(statusElementId, ok ? 'success' : 'error', ok ? 'Disalin ke clipboard!' : 'Gagal menyalin.');
    }
    return ok;
  }
}

// ─── TAB / PANEL NAVIGATION ────────────────────────────────────
function setupToolTabs(navSelector, panelSelector, defaultId) {
  const navs = document.querySelectorAll(navSelector);
  const panels = document.querySelectorAll(panelSelector);

  function activate(id) {
    navs.forEach(n => {
      n.classList.toggle('active', n.dataset.tool === id);
    });
    panels.forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + id);
    });
    // Update URL hash without scroll jump
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  navs.forEach(n => {
    n.addEventListener('click', () => activate(n.dataset.tool));
  });

  // Honor URL hash
  const hash = location.hash.replace('#', '');
  const valid = hash && document.getElementById('panel-' + hash);
  activate(valid ? hash : defaultId);
}

// ─── HEADER TEMPLATE ──────────────────────────────────────────
function injectHeader(containerId, opts = {}) {
  const showBack = opts.back !== false;
  const badge = opts.badge || '🚀 All-in-One Tools';
  const html = `
    <header>
      <a href="../index.html" class="brand">
        <div class="brand-icon">G</div>
        <div class="brand-text">Gondrong <span>STIES</span></div>
      </a>
      <div class="header-actions">
        ${showBack ? '<a href="../index.html" class="back-link">← Kembali</a>' : ''}
        <div class="header-badge">${badge}</div>
      </div>
    </header>`;
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = html;
}

function injectFooter(containerId) {
  const html = `
    <footer>
      <p>Dikembangkan untuk kebutuhan produktivitas & akademik. Privasi sepenuhnya terjamin — semua proses berjalan di browser.</p>
      <div class="dev-credit">Developed by <span>Gondrong STIES</span> | MaddazXD</div>
    </footer>`;
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = html;
}
