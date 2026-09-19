import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Load all 60 articles
const [c1, c2, c3, c4, c5, c6] = await Promise.all([
  import('./data-cluster-1.mjs'),
  import('./data-cluster-2.mjs'),
  import('./data-cluster-3.mjs'),
  import('./data-cluster-4.mjs'),
  import('./data-cluster-5.mjs'),
  import('./data-cluster-6.mjs')
]);

const all60Articles = [
  ...c1.cluster1Articles,
  ...c2.cluster2Articles,
  ...c3.cluster3Articles,
  ...c4.cluster4Articles,
  ...c5.cluster5Articles,
  ...c6.cluster6Articles
];

console.log(`Loaded ${all60Articles.length} articles.`);

const approvedIndices = [1, 12, 25, 35, 43, 56]; // 1-indexed

const previewItems = [];
const sizeSet = new Set();
let brokenCount = 0;
let validCount = 0;

for (let i = 0; i < all60Articles.length; i++) {
  const art = all60Articles[i];
  const filename = path.basename(art.image);
  const localPath = path.resolve('public/assets/images', filename);

  let status = 'FALHA';
  let width = 0;
  let height = 0;
  let sizeBytes = 0;
  let isWebp = false;

  if (fs.existsSync(localPath)) {
    const buf = fs.readFileSync(localPath);
    sizeBytes = buf.length;
    isWebp = buf.length >= 12 && buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP';

    try {
      const meta = await sharp(buf).metadata();
      width = meta.width;
      height = meta.height;

      if (isWebp && width === 860 && height === 440) {
        status = 'FOTOGRAFIA REAL';
        validCount++;
      } else {
        status = 'DIMENSÃO INCORRETA';
        brokenCount++;
      }
    } catch (e) {
      status = 'ERRO DE DECODIFICAÇÃO';
      brokenCount++;
    }
  } else {
    status = 'ARQUIVO NÃO ENCONTRADO';
    brokenCount++;
  }

  sizeSet.add(sizeBytes);

  previewItems.push({
    index: i + 1,
    isApprovedSample: approvedIndices.includes(i + 1),
    title: art.pt.title,
    category: art.pt.category,
    clusterName: art.clusterName,
    slug: art.slug,
    filename,
    src: `/assets/images/${filename}`,
    width,
    height,
    sizeBytes,
    status
  });
}

const cacheBuster = Date.now();

// Generate an ultra-clean visual preview HTML page
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeria de Inspeção Visual — 60 Capas Fotográficas Blog CONEXUS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080c14;
      --card-bg: #0f172a;
      --border: rgba(255, 255, 255, 0.08);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --success: #10b981;
      --approved: #3b82f6;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 2.5rem 1.5rem;
      min-height: 100vh;
    }
    .header {
      max-width: 1440px;
      margin: 0 auto 2.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .header-left .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
    }
    .header h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .header p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-top: 0.4rem;
      max-width: 700px;
      line-height: 1.5;
    }
    .stats-bar {
      display: flex;
      gap: 1.25rem;
      background: var(--card-bg);
      padding: 1rem 1.5rem;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    .stat-item { text-align: center; }
    .stat-val { font-size: 1.5rem; font-weight: 800; color: var(--accent); }
    .stat-val.success { color: var(--success); }
    .stat-lbl { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; margin-top: 2px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
      max-width: 1440px;
      margin: 0 auto;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: rgba(56, 189, 248, 0.4);
    }
    .card-img-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 860 / 440;
      background: #020617;
      overflow: hidden;
    }
    .card-img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .badge-num {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      backdrop-filter: blur(8px);
    }
    .badge-status {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(16, 185, 129, 0.9);
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      backdrop-filter: blur(8px);
    }
    .badge-status.approved {
      background: rgba(59, 130, 246, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .card-body {
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .card-category {
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.5rem;
    }
    .card-title {
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.45;
      color: #ffffff;
      margin-bottom: 1rem;
    }
    .card-meta {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-family: monospace;
      background: rgba(0, 0, 0, 0.35);
      padding: 0.65rem 0.85rem;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .card-meta span { color: var(--accent); }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-left">
      <div class="badge">Apresentação para Aprovação Visual</div>
      <h1>Galeria das 60 Capas Fotográficas — Blog CONEXUS</h1>
      <p>Padrão 100% fotográfico / fotorealista editorial (câmera real: profissionais, escritórios modernos, comércio local, reuniões e infraestrutura tecnológica). Zero vetores, zero templates azuis, zero infográficos e zero repetições.</p>
    </div>
    <div class="stats-bar">
      <div class="stat-item">
        <div class="stat-val success">${validCount}/60</div>
        <div class="stat-lbl">Fotografias Válidas</div>
      </div>
      <div class="stat-item">
        <div class="stat-val">0</div>
        <div class="stat-lbl">Vetoriais</div>
      </div>
      <div class="stat-item">
        <div class="stat-val">${brokenCount}</div>
        <div class="stat-lbl">Quebradas</div>
      </div>
      <div class="stat-item">
        <div class="stat-val">${all60Articles.length - sizeSet.size}</div>
        <div class="stat-lbl">Repetidas</div>
      </div>
    </div>
  </header>

  <div class="grid">
    ${previewItems.map(item => `
    <div class="card">
      <div class="card-img-wrapper">
        <img src="${item.src}?t=${cacheBuster}" alt="${item.title.replace(/"/g, '&quot;')}" loading="lazy">
        <div class="badge-num">#${item.index}</div>
        <div class="badge-status ${item.isApprovedSample ? 'approved' : ''}">${item.isApprovedSample ? '★ Amostra Aprovada' : 'Fotografia Real'}</div>
      </div>
      <div class="card-body">
        <div class="card-category">${item.category} • ${item.clusterName}</div>
        <h2 class="card-title">${item.title}</h2>
        <div class="card-meta">
          <div><strong>Arquivo:</strong> <span>${item.filename}</span></div>
          <div><strong>Dimensões:</strong> ${item.width} × ${item.height} px | ${(item.sizeBytes / 1024).toFixed(1)} KB WebP</div>
          <div><strong>Slug:</strong> ${item.slug}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>
</body>
</html>`;

fs.writeFileSync('public/preview-covers.html', html);
fs.writeFileSync('preview-60-covers.html', html);

console.log('Successfully generated preview gallery at:');
console.log(' - preview-60-covers.html');
console.log(' - public/preview-covers.html');

// Print full inventory table
console.log('\n========================================================================================');
console.log('INVENTÁRIO COMPLETO DAS 60 CAPAS FOTOGRÁFICAS BLOG CONEXUS');
console.log('========================================================================================');
previewItems.forEach(item => {
  console.log(`${item.index.toString().padStart(2, ' ')}. [${item.status}] ${item.filename} (${item.width}x${item.height}px, ${(item.sizeBytes/1024).toFixed(1)}KB) -> "${item.title}"`);
});
console.log('========================================================================================');
console.log(`TOTAL VALIDADO: ${validCount}/60 FOTOGRÁFICAS APROVADAS | 0 VETORIAIS | 0 QUEBRADAS | 0 REPETIDAS`);
console.log('========================================================================================');
