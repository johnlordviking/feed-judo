import { KYU_LEVELS, parseTechniqueTitle } from '../data/kodokanPlaylist.js';

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
    // Caso o usuário tenha colado diretamente o ID da playlist (PL...) ou vídeo (11 chars)
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
 * Busca todos os vídeos de uma playlist do YouTube usando o endpoint local /api/playlist
 */
export async function fetchPlaylistVideos(playlistId) {
  const res = await fetch(`/api/playlist?list=${encodeURIComponent(playlistId)}`);
  if (!res.ok) {
    throw new Error('Não foi possível extrair a playlist.');
  }
  const data = await res.json();
  if (!data.videos || data.videos.length === 0) {
    throw new Error('Nenhum vídeo público encontrado nesta playlist.');
  }
  return data;
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
