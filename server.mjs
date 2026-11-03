import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function parseYtObject(data, seen, videos, tokens) {
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

    if (obj.continuationCommand?.token) {
      tokens.push(decodeURIComponent(obj.continuationCommand.token));
    }

    for (const key of Object.keys(obj)) {
      walk(obj[key]);
    }
  }

  walk(data);
}

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);

  // Endpoint de extração de playlists do YouTube
  if (urlObj.pathname === '/api/playlist') {
    try {
      const listId = urlObj.searchParams.get('list');
      if (!listId) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Parâmetro list é obrigatório' }));
        return;
      }

      const ytUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(listId)}`;
      const response = await fetch(ytUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          Cookie: 'SOCS=CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg'
        }
      });

      const html = await response.text();
      const idx = html.indexOf('var ytInitialData = ');
      const videos = [];
      const seen = new Set();
      const tokens = [];
      let playlistTitle = 'Playlist do YouTube';

      if (idx !== -1) {
        const start = idx + 'var ytInitialData = '.length;
        const end = html.indexOf(';</script>', start);
        const data = JSON.parse(html.slice(start, end));
        playlistTitle =
          data?.metadata?.playlistMetadataRenderer?.title ||
          data?.header?.pageHeaderRenderer?.pageTitle ||
          'Playlist do YouTube';
        parseYtObject(data, seen, videos, tokens);

        for (const token of tokens) {
          try {
            const contRes = await fetch(
              'https://www.youtube.com/youtubei/v1/browse?prettyPrint=false',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                },
                body: JSON.stringify({
                  context: {
                    client: {
                      clientName: 'WEB',
                      clientVersion: '2.20261029.01.00'
                    }
                  },
                  continuation: token
                })
              }
            );
            const contData = await contRes.json();
            parseYtObject(contData, seen, videos, []);
          } catch {
            // Ignora falha em página complementar
          }
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(
        JSON.stringify({
          playlistId: listId,
          playlistTitle,
          count: videos.length,
          videos
        })
      );
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: err.message || 'Erro ao buscar playlist' }));
    }
    return;
  }

  // Arquivos estáticos
  let reqPath = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
  if (reqPath === '/manifest.json') {
    reqPath = '/public/manifest.json';
  }

  const filePath = path.join(__dirname, reqPath);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🥋 FeedJudo rodando em: http://localhost:${PORT}`);
});
