import { KYU_LEVELS, parseTechniqueTitle } from './kodokanPlaylist.js';

/**
 * Analisa qualquer URL do YouTube (vídeo único, shorts, youtu.be ou playlist)
 */
export function parseYouTubeInput(rawInput) {
  const input = (rawInput || '').trim();
  if (!input) return { type: 'invalid' };

  try {
    const url = new URL(input.startsWith('http') ? input : `https://${input}`);
    const listId = url.searchParams.get('list');
    let videoId = url.searchParams.get('v');

    if (!videoId && url.hostname.includes('youtu.be')) {
      videoId = url.pathname.replace('/', '').split('/')[0];
    }
    if (!videoId && url.pathname.includes('/shorts/')) {
      videoId = url.pathname.split('/shorts/')[1]?.split('/')[0];
    }
    if (!videoId && url.pathname.includes('/embed/')) {
      videoId = url.pathname.split('/embed/')[1]?.split('/')[0];
    }

    if (listId && url.pathname.includes('/playlist')) {
      return { type: 'playlist', playlistId: listId, videoId: videoId || null };
    }
    if (listId && videoId) {
      return { type: 'both', playlistId: listId, videoId };
    }
    if (listId) {
      return { type: 'playlist', playlistId: listId, videoId: null };
    }
    if (videoId) {
      return { type: 'video', videoId };
    }
  } catch {
    if (input.startsWith('PL') && input.length > 12) {
      return { type: 'playlist', playlistId: input, videoId: null };
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return { type: 'video', videoId: input };
    }
  }

  return { type: 'invalid' };
}

/**
 * Busca metadados de um vídeo único via Noembed (sem necessidade de API Key)
 */
export async function fetchSingleVideoMeta(videoId) {
  try {
    const res = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
    );
    if (!res.ok) throw new Error('Falha noembed');
    const data = await res.json();
    return {
      videoId,
      title: data.title || `Técnica de Judô (${videoId})`,
      author: data.author_name || 'YouTube',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    };
  } catch {
    return {
      videoId,
      title: `Técnica de Judô (${videoId})`,
      author: 'YouTube',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    };
  }
}

/**
 * Extrai vídeos do JSON interno ytInitialData do YouTube no próprio navegador (fallback para hospedagem estática)
 */
function parseYtHtmlClientSide(html, playlistId) {
  const idx = html.indexOf('var ytInitialData = ');
  if (idx === -1) return null;
  const start = idx + 'var ytInitialData = '.length;
  const end = html.indexOf(';</script>', start);
  const data = JSON.parse(html.slice(start, end));

  const videos = [];
  const seen = new Set();

  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.lockupViewModel) {
      const l = obj.lockupViewModel;
      const videoId = l.contentId;
      const title = l.metadata?.lockupMetadataViewModel?.title?.content || '';
      const duration =
        l.contentImage?.thumbnailViewModel?.overlays?.[0]?.thumbnailBottomOverlayViewModel
          ?.badges?.[0]?.thumbnailBadgeViewModel?.text || '';
      if (videoId && title && !seen.has(videoId)) {
        seen.add(videoId);
        videos.push({
          videoId,
          title,
          duration,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        });
      }
      return;
    }
    if (obj.playlistVideoRenderer) {
      const v = obj.playlistVideoRenderer;
      const videoId = v.videoId;
      const title = v.title?.runs?.[0]?.text || v.title?.simpleText || '';
      const duration = v.lengthText?.simpleText || '';
      if (videoId && title && !seen.has(videoId)) {
        seen.add(videoId);
        videos.push({
          videoId,
          title,
          duration,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        });
      }
      return;
    }
    for (const k of Object.keys(obj)) {
      walk(obj[k]);
    }
  }

  walk(data);
  if (videos.length === 0) return null;

  const playlistTitle =
    data?.metadata?.playlistMetadataRenderer?.title ||
    data?.header?.pageHeaderRenderer?.pageTitle ||
    'Playlist do YouTube';

  return { playlistId, playlistTitle, count: videos.length, videos };
}

/**
 * Busca todos os vídeos de uma playlist do YouTube (tenta /api/playlist da Vercel/Node e faz fallback automático via proxy CORS público)
 */
export async function fetchPlaylistVideos(playlistId) {
  // 1) Tenta a API Serverless (/api/playlist)
  try {
    const res = await fetch(`/api/playlist?list=${encodeURIComponent(playlistId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.videos && data.videos.length > 0) {
        return data;
      }
    }
  } catch {
    // Passa para o fallback client-side
  }

  // 2) Fallback Client-Side via AllOrigins CORS Proxy (funciona mesmo sem backend na Vercel/GitHub Pages)
  const targetUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}&hl=en`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
  const res = await fetch(proxyUrl);
  if (!res.ok) {
    throw new Error('Não foi possível acessar a playlist no momento.');
  }
  const html = await res.text();
  const parsed = parseYtHtmlClientSide(html, playlistId);
  if (!parsed || parsed.videos.length === 0) {
    throw new Error('Nenhum vídeo público encontrado nesta playlist.');
  }
  return parsed;
}

/**
 * Formata um vídeo importado pelo usuário para o padrão do FeedJudo
 */
export function buildUserVideoItem({
  videoId,
  title,
  duration = '',
  kyu = '5kyu',
  wazaCategory = 'Te-waza',
  ptDesc = 'Técnica adicionada ao catálogo',
  playlistId = 'custom'
}) {
  const { kanji, romaji } = parseTechniqueTitle(title);
  const kyuMeta = KYU_LEVELS.find((k) => k.id === kyu) || KYU_LEVELS[0];

  return {
    id: `custom-${videoId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    playlistIndex: 999,
    videoId,
    title,
    kanji,
    romaji,
    duration: duration || 'Vídeo',
    kyu: kyuMeta.id,
    kyuLabel: kyuMeta.label,
    kyuOrder: kyuMeta.order,
    gokyo: kyuMeta.subtitle,
    ptDesc,
    wazaCategory,
    wazaLabelPt: wazaCategory,
    playlistId,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    isCustom: true
  };
}
