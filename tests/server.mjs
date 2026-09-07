import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = normalize(join(fileURLToPath(new URL('..', import.meta.url))));
const types = { '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.png':'image/png' };
createServer(async (req, res) => {
  const path = normalize(join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)));
  if (!path.startsWith(root)) { res.writeHead(403); return res.end(); }
  try { const data = await readFile(path); res.writeHead(200, {'Content-Type': types[extname(path)] || 'text/plain'}); res.end(data); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173, () => console.log('Open http://localhost:4173/tests/harness.html'));
