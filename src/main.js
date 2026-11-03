import { INITIAL_KODOKAN_VIDEOS, KYU_LEVELS, WAZA_CATEGORIES } from './data/kodokanPlaylist.js';
import {
  parseYouTubeInput,
  fetchSingleVideoMeta,
  fetchPlaylistVideos,
  buildUserVideoItem
} from './services/youtube.js';

const STORAGE_KEYS = {
  CUSTOM_VIDEOS: 'feedjudo_custom_videos_v1',
  FAVORITES: 'feedjudo_favorites_v1',
  STUDIED: 'feedjudo_studied_v1',
  KYU_OVERRIDES: 'feedjudo_kyu_overrides_v1'
};

const state = {
  customVideos: loadJson(STORAGE_KEYS.CUSTOM_VIDEOS, []),
  favorites: new Set(loadJson(STORAGE_KEYS.FAVORITES, [])),
  studied: new Set(loadJson(STORAGE_KEYS.STUDIED, [])),
  kyuOverrides: loadJson(STORAGE_KEYS.KYU_OVERRIDES, {}),
  selectedKyu: 'all', // 'all', '5kyu', '4kyu', '3kyu', '2kyu', '1kyu', 'extra', 'fav', 'studied'
  selectedWaza: 'all',
  searchQuery: '',
  snapMode: false,
  activePlayingId: null,
  modalOpen: false,
  importLoading: false,
  importPreview: null,
  importError: ''
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignora erro de quota
  }
}

function getAllVideos() {
  const combined = [...INITIAL_KODOKAN_VIDEOS, ...state.customVideos];
  return combined
    .map((v) => {
      const overrideKyu = state.kyuOverrides[v.id];
      if (overrideKyu) {
        const kyuMeta = KYU_LEVELS.find((k) => k.id === overrideKyu);
        if (kyuMeta) {
          return {
            ...v,
            kyu: kyuMeta.id,
            kyuLabel: kyuMeta.label,
            kyuOrder: kyuMeta.order
          };
        }
      }
      return v;
    })
    .sort((a, b) => {
      if (a.kyuOrder !== b.kyuOrder) return a.kyuOrder - b.kyuOrder;
      return (a.playlistIndex || 999) - (b.playlistIndex || 999);
    });
}

function getFilteredVideos(allVideos) {
  const q = state.searchQuery.trim().toLowerCase();

  return allVideos.filter((v) => {
    if (state.selectedKyu === 'fav' && !state.favorites.has(v.id)) return false;
    if (state.selectedKyu === 'studied' && !state.studied.has(v.id)) return false;
    if (
      state.selectedKyu !== 'all' &&
      state.selectedKyu !== 'fav' &&
      state.selectedKyu !== 'studied' &&
      v.kyu !== state.selectedKyu
    ) {
      return false;
    }

    if (state.selectedWaza !== 'all' && v.wazaCategory !== state.selectedWaza) {
      return false;
    }

    if (q) {
      const hay = `${v.romaji} ${v.kanji} ${v.ptDesc} ${v.gokyo} ${v.wazaCategory} ${v.kyuLabel}`.toLowerCase();
      const normalizedHay = hay.replace(/-/g, ' ');
      const normalizedQ = q.replace(/-/g, ' ');
      if (!hay.includes(q) && !normalizedHay.includes(normalizedQ)) {
        return false;
      }
    }

    return true;
  });
}

function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  const allVideos = getAllVideos();
  const filtered = getFilteredVideos(allVideos);

  const countsByKyu = {
    all: allVideos.length,
    fav: state.favorites.size,
    studied: state.studied.size
  };
  for (const k of KYU_LEVELS) {
    countsByKyu[k.id] = allVideos.filter((v) => v.kyu === k.id).length;
  }

  const currentKyuMeta = KYU_LEVELS.find((k) => k.id === state.selectedKyu);
  const studiedInView = filtered.filter((v) => state.studied.has(v.id)).length;

  root.innerHTML = `
    <div class="app-shell">
      <header class="top-header">
        <div class="brand-bar">
          <div class="brand-logo">
            <div class="kodokan-mark" title="Kodokan Judo"></div>
            <div class="brand-titles">
              <div class="brand-name">FEED<span>JUDO</span></div>
              <div class="brand-subtitle">Kodokan • Organizado por Kyu</div>
            </div>
          </div>
          <div class="header-actions">
            <button class="icon-btn ${state.snapMode ? 'active' : ''}" id="btn-toggle-snap" title="Alternar modo Reels (1 por tela) ou Feed em Lista">
              ${state.snapMode ? '▤ Modo Lista' : '⇅ Modo Reels'}
            </button>
            <button class="icon-btn btn-add-top" id="btn-open-modal-top">
              + Link / Playlist
            </button>
          </div>
        </div>

        <div class="search-row">
          <div class="search-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="20" y1="20" x2="16.5" y2="16.5"></line>
            </svg>
            <input
              type="search"
              id="search-input"
              class="search-input"
              placeholder="Buscar golpe (ex: Seoi-nage, Uchi-mata, Juji-gatame)..."
              value="${escapeHtml(state.searchQuery)}"
            />
            ${
              state.searchQuery
                ? `<button class="clear-search-btn" id="btn-clear-search" title="Limpar busca">✕</button>`
                : ''
            }
          </div>
        </div>

        <nav class="kyu-rail" aria-label="Filtro por Grau de Kyu">
          <button class="kyu-pill ${state.selectedKyu === 'all' ? 'active' : ''}" data-kyu="all">
            Todos os Kyu <span class="count-badge">${countsByKyu.all}</span>
          </button>
          ${KYU_LEVELS.map(
            (k) => `
            <button class="kyu-pill ${state.selectedKyu === k.id ? 'active' : ''}" data-kyu="${k.id}">
              ${k.shortLabel} <span class="count-badge">${countsByKyu[k.id] || 0}</span>
            </button>
          `
          ).join('')}
          <button class="kyu-pill ${state.selectedKyu === 'fav' ? 'active' : ''}" data-kyu="fav">
            ♥ Favoritos <span class="count-badge">${countsByKyu.fav}</span>
          </button>
          <button class="kyu-pill ${state.selectedKyu === 'studied' ? 'active' : ''}" data-kyu="studied">
            ✓ Dominadas <span class="count-badge">${countsByKyu.studied}</span>
          </button>
        </nav>

        <nav class="waza-rail" aria-label="Filtro por Divisão de Técnica">
          ${WAZA_CATEGORIES.map(
            (w) => `
            <button class="waza-chip ${state.selectedWaza === w.id ? 'active' : ''}" data-waza="${w.id}">
              ${w.label}
            </button>
          `
          ).join('')}
        </nav>
      </header>

      <main class="feed-container ${state.snapMode ? 'snap-mode' : ''}" id="feed-container">
        ${renderSummaryBanner(currentKyuMeta, filtered.length, studiedInView)}
        ${renderFeedItems(filtered)}
      </main>

      <button class="fab-add" id="btn-open-modal-fab" title="Adicionar vídeo ou playlist do YouTube">
        <span>＋</span> Adicionar Vídeo / Playlist
      </button>

      ${state.modalOpen ? renderImportModal() : ''}
    </div>
  `;

  attachEvents();
}

function renderSummaryBanner(currentKyuMeta, totalCount, studiedCount) {
  if ( currentKyuMeta ) {
    return `
      <section class="kyu-summary-banner">
        <div class="kyu-summary-info">
          <h2>${currentKyuMeta.label} • <span style="color: var(--accent-red)">${currentKyuMeta.beltHint}</span></h2>
          <p>${currentKyuMeta.subtitle}</p>
        </div>
        <div class="kyu-progress-box">
          <div class="kyu-progress-num">${studiedCount} / ${totalCount}</div>
          <div class="kyu-progress-label">Dominadas</div>
        </div>
      </section>
    `;
  }

  return `
    <section class="kyu-summary-banner">
      <div class="kyu-summary-info">
        <h2>Playlist Oficial Kodokan • 100 Técnicas</h2>
        <p>Role o feed por Grau de Kyu (5º Kyu ao 1º Kyu + Técnicas Extras) ou toque em um vídeo para assistir.</p>
      </div>
      <div class="kyu-progress-box">
        <div class="kyu-progress-num">${studiedCount} / ${totalCount}</div>
        <div class="kyu-progress-label">Dominadas</div>
      </div>
    </section>
  `;
}

function renderFeedItems(videos) {
  if (videos.length === 0) {
    return `
      <div class="empty-state">
        <h3>Nenhuma técnica encontrada</h3>
        <p>Tente limpar os filtros de Kyu / Divisão ou buscar outro nome de técnica.</p>
      </div>
    `;
  }

  let html = '';
  let lastKyu = null;

  for (const video of videos) {
    if (video.kyu !== lastKyu && state.selectedKyu === 'all' && !state.snapMode) {
      lastKyu = video.kyu;
      const kyuMeta = KYU_LEVELS.find((k) => k.id === video.kyu) || KYU_LEVELS[5];
      const countInGroup = videos.filter((v) => v.kyu === video.kyu).length;
      html += `
        <div class="kyu-group-divider">
          <div class="kyu-group-title">
            <span class="kyu-group-badge">${kyuMeta.label}</span>
            <span class="kyu-group-name">${kyuMeta.subtitle}</span>
          </div>
          <span class="kyu-group-count">${countInGroup} vídeos</span>
        </div>
      `;
    }

    const isPlaying = state.activePlayingId === video.id;
    const isFav = state.favorites.has(video.id);
    const isStudied = state.studied.has(video.id);

    html += `
      <article class="feed-card ${isPlaying ? 'is-playing' : ''}" data-card-id="${video.id}">
        <div class="card-top-bar">
          <div class="card-badges">
            <span class="badge-kyu">${escapeHtml(video.kyuLabel)}</span>
            <span class="badge-gokyo">${escapeHtml(video.gokyo)}</span>
            <span class="badge-waza">${escapeHtml(video.wazaCategory)}</span>
          </div>
          <span class="card-index-num">#${video.playlistIndex || ''}</span>
        </div>

        <div class="video-stage">
          ${
            isPlaying
              ? `<iframe
                  src="https://www.youtube.com/embed/${encodeURIComponent(
                    video.videoId
                  )}?autoplay=1&playsinline=1&rel=0&modestbranding=1"
                  title="${escapeHtml(video.romaji)}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>`
              : `<div class="video-poster" data-play-id="${video.id}">
                  <img src="${escapeHtml(video.thumbnail)}" alt="${escapeHtml(video.romaji)}" loading="lazy" />
                  <div class="poster-gradient"></div>
                  <div class="play-trigger-btn" aria-label="Reproduzir técnica">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4"></polygon>
                    </svg>
                  </div>
                  <span class="kanji-watermark">${escapeHtml(video.kanji)}</span>
                  ${video.duration ? `<span class="duration-pill">${escapeHtml(video.duration)}</span>` : ''}
                </div>`
          }
        </div>

        <div class="card-body">
          <div class="technique-header">
            <div>
              <span class="technique-name-romaji">${escapeHtml(video.romaji)}</span>
              <span class="technique-name-kanji">${escapeHtml(video.kanji)}</span>
            </div>
          </div>
          <p class="technique-desc">${escapeHtml(video.ptDesc)}</p>
          <p class="technique-submeta">${escapeHtml(video.wazaLabelPt)}</p>

          <div class="card-actions">
            <div class="action-group">
              <button class="card-action-btn ${isFav ? 'fav-active' : ''}" data-fav-id="${video.id}">
                ${isFav ? '♥ Favorito' : '♡ Favoritar'}
              </button>
              <button class="card-action-btn ${isStudied ? 'studied-active' : ''}" data-studied-id="${video.id}">
                ${isStudied ? '✓ Dominada' : '○ Marcar Treinada'}
              </button>
            </div>

            <div class="action-group">
              <select class="kyu-select-inline" data-change-kyu-id="${video.id}" title="Alterar Grau de Kyu desta técnica">
                ${KYU_LEVELS.map(
                  (k) => `<option value="${k.id}" ${video.kyu === k.id ? 'selected' : ''}>${k.label}</option>`
                ).join('')}
              </select>
              <a
                class="card-action-btn"
                href="https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}&list=${encodeURIComponent(
                  video.playlistId || 'PLtz539PTepc16H2iu5F3Q3D7_He1EYlIQ'
                )}"
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir no YouTube"
              >
                YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  return html;
}

function renderImportModal() {
  return `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal-sheet">
        <div class="modal-header">
          <h3>Adicionar Vídeo ou Playlist do YouTube</h3>
          <button class="close-modal-btn" id="btn-close-modal">✕</button>
        </div>

        <div class="form-group">
          <label class="form-label" for="yt-url-input">Link do Vídeo ou da Playlist do YouTube</label>
          <input
            type="url"
            id="yt-url-input"
            class="form-input"
            placeholder="Ex: https://www.youtube.com/watch?v=... ou link de playlist"
          />
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" for="import-kyu-select">Grau de Kyu</label>
            <select id="import-kyu-select" class="form-select">
              ${KYU_LEVELS.map((k) => `<option value="${k.id}">${k.label}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="import-waza-select">Divisão (Waza)</label>
            <select id="import-waza-select" class="form-select">
              ${WAZA_CATEGORIES.filter((w) => w.id !== 'all')
                .map((w) => `<option value="${w.id}">${w.label}</option>`)
                .join('')}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="import-desc-input">Observação / Tradução (Opcional)</label>
          <input
            type="text"
            id="import-desc-input"
            class="form-input"
            placeholder="Ex: Detalhe de pegada na manga (Kumi-kata)"
          />
        </div>

        ${
          state.importError
            ? `<p style="color: var(--accent-red); font-size: 0.8rem; font-weight: 700; margin-bottom: 10px;">${escapeHtml(
                state.importError
              )}</p>`
            : ''
        }

        <button class="btn-primary-red" id="btn-submit-import" ${state.importLoading ? 'disabled' : ''}>
          ${state.importLoading ? 'Extraindo vídeos do YouTube...' : 'Importar para o Feed'}
        </button>
      </div>
    </div>
  `;
}

function attachEvents() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      const pos = e.target.selectionStart;
      renderApp();
      const newSearch = document.getElementById('search-input');
      if (newSearch) {
        newSearch.focus();
        newSearch.setSelectionRange(pos, pos);
      }
    });
  }

  const clearBtn = document.getElementById('btn-clear-search');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.searchQuery = '';
      renderApp();
    });
  }

  const snapBtn = document.getElementById('btn-toggle-snap');
  if (snapBtn) {
    snapBtn.addEventListener('click', () => {
      state.snapMode = !state.snapMode;
      renderApp();
    });
  }

  document.querySelectorAll('[data-kyu]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedKyu = btn.getAttribute('data-kyu');
      state.activePlayingId = null;
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-waza]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedWaza = btn.getAttribute('data-waza');
      state.activePlayingId = null;
      renderApp();
    });
  });

  document.querySelectorAll('[data-play-id]').forEach((poster) => {
    poster.addEventListener('click', () => {
      state.activePlayingId = poster.getAttribute('data-play-id');
      renderApp();
    });
  });

  document.querySelectorAll('[data-fav-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-fav-id');
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      saveJson(STORAGE_KEYS.FAVORITES, [...state.favorites]);
      renderApp();
    });
  });

  document.querySelectorAll('[data-studied-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-studied-id');
      if (state.studied.has(id)) {
        state.studied.delete(id);
      } else {
        state.studied.add(id);
      }
      saveJson(STORAGE_KEYS.STUDIED, [...state.studied]);
      renderApp();
    });
  });

  document.querySelectorAll('[data-change-kyu-id]').forEach((select) => {
    select.addEventListener('change', (e) => {
      const id = select.getAttribute('data-change-kyu-id');
      state.kyuOverrides[id] = e.target.value;
      saveJson(STORAGE_KEYS.KYU_OVERRIDES, state.kyuOverrides);
      renderApp();
    });
  });

  const openTop = document.getElementById('btn-open-modal-top');
  const openFab = document.getElementById('btn-open-modal-fab');
  [openTop, openFab].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => {
        state.modalOpen = true;
        state.importError = '';
        renderApp();
      });
    }
  });

  const closeModal = document.getElementById('btn-close-modal');
  const backdrop = document.getElementById('modal-backdrop');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      state.modalOpen = false;
      renderApp();
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        state.modalOpen = false;
        renderApp();
      }
    });
  }

  const submitImport = document.getElementById('btn-submit-import');
  if (submitImport) {
    submitImport.addEventListener('click', handleImportSubmit);
  }
}

async function handleImportSubmit() {
  const urlInput = document.getElementById('yt-url-input');
  const kyuSelect = document.getElementById('import-kyu-select');
  const wazaSelect = document.getElementById('import-waza-select');
  const descInput = document.getElementById('import-desc-input');

  const rawUrl = urlInput ? urlInput.value.trim() : '';
  const targetKyu = kyuSelect ? kyuSelect.value : '5kyu';
  const targetWaza = wazaSelect ? wazaSelect.value : 'Te-waza';
  const customDesc = descInput ? descInput.value.trim() : '';

  const parsed = parseYouTubeInput(rawUrl);
  if (parsed.type === 'invalid') {
    state.importError = 'Informe um link válido de vídeo ou playlist do YouTube.';
    renderApp();
    return;
  }

  state.importLoading = true;
  state.importError = '';
  renderApp();

  try {
    if (parsed.type === 'playlist' || parsed.type === 'both') {
      try {
        const plData = await fetchPlaylistVideos(parsed.playlistId);
        const newItems = plData.videos.map((v) =>
          buildUserVideoItem({
            videoId: v.videoId,
            title: v.title,
            duration: v.duration,
            kyu: targetKyu,
            wazaCategory: targetWaza,
            ptDesc: customDesc || `Importado da playlist: ${plData.playlistTitle}`,
            playlistId: parsed.playlistId
          })
        );
        state.customVideos = [...newItems, ...state.customVideos];
        saveJson(STORAGE_KEYS.CUSTOM_VIDEOS, state.customVideos);
        state.selectedKyu = targetKyu;
        state.modalOpen = false;
      } catch (plErr) {
        // Fallback: caso tenha videoId no link, importa o vídeo único
        if (parsed.videoId) {
          const meta = await fetchSingleVideoMeta(parsed.videoId);
          const item = buildUserVideoItem({
            videoId: meta.videoId,
            title: meta.title,
            kyu: targetKyu,
            wazaCategory: targetWaza,
            ptDesc: customDesc || `Canal: ${meta.author}`
          });
          state.customVideos = [item, ...state.customVideos];
          saveJson(STORAGE_KEYS.CUSTOM_VIDEOS, state.customVideos);
          state.selectedKyu = targetKyu;
          state.modalOpen = false;
        } else {
          throw plErr;
        }
      }
    } else {
      const meta = await fetchSingleVideoMeta(parsed.videoId);
      const item = buildUserVideoItem({
        videoId: meta.videoId,
        title: meta.title,
        kyu: targetKyu,
        wazaCategory: targetWaza,
        ptDesc: customDesc || `Canal: ${meta.author}`
      });
      state.customVideos = [item, ...state.customVideos];
      saveJson(STORAGE_KEYS.CUSTOM_VIDEOS, state.customVideos);
      state.selectedKyu = targetKyu;
      state.modalOpen = false;
    }
  } catch (err) {
    state.importError = err.message || 'Erro ao importar link do YouTube.';
  } finally {
    state.importLoading = false;
    renderApp();
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

renderApp();
