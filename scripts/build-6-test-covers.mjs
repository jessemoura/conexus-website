import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const testItems = [
  {
    num: 1,
    id: 'photo-1497215728101-856f4ea42174',
    title: 'Site One Page ou Multipáginas: Qual o Melhor para Sua Empresa?',
    category: 'Criação de Sites',
    filename: 'conexus-site-one-page-ou-multipaginas-v2.webp',
    description: 'Fotografia real de escritório moderno, iluminação natural, mesas de madeira e profissionais trabalhando.'
  },
  {
    num: 2,
    id: 'photo-1556742502-ec7c0e9f34b1',
    title: 'SEO Local: Como Conquistar Clientes na Sua Região sem Pagar Anúncios',
    category: 'SEO & Google',
    filename: 'conexus-seo-local-como-conquistar-clientes-regiao-v2.webp',
    description: 'Fotografia real de empresário/comerciante local no balcão de atendimento com terminal e laptop.'
  },
  {
    num: 3,
    id: 'photo-1556155092-490a1ba16284',
    title: 'Botão de WhatsApp no Site: Boas Práticas de UX que Multiplicam Conversões',
    category: 'Marketing & Vendas',
    filename: 'conexus-whatsapp-no-site-conversoes-v2.webp',
    description: 'Fotografia real de executivo segurando smartphone moderno com desfoque de fundo corporativo.'
  },
  {
    num: 4,
    id: 'photo-1522071820081-009f0129c71c',
    title: 'Automação de Marketing: Como Economizar Tempo e Vender Mais no Piloto Automático',
    category: 'Inteligência Artificial & Automação',
    filename: 'conexus-automacao-de-marketing-v2.webp',
    description: 'Fotografia real de equipe corporativa colaborando ativamente ao redor de notebooks em escritório.'
  },
  {
    num: 5,
    id: 'photo-1573496359142-b8d87734a5a2',
    title: 'E-mail Profissional: Por Que Sua Empresa Deve Abandonar Endereços Gratuitos Imediatamente',
    category: 'Negócios & Gestão',
    filename: 'conexus-email-profissional-abandonar-genericos-v2.webp',
    description: 'Fotografia real de executiva trabalhando focada em notebook em ambiente corporativo moderno.'
  },
  {
    num: 6,
    id: 'photo-1558494949-ef010cbdcc31',
    title: 'Segurança de Websites: Como Proteger Sua Empresa e Seus Clientes Contra Ataques',
    category: 'Tecnologia & Segurança',
    filename: 'conexus-seguranca-de-sites-protecao-v2.webp',
    description: 'Fotografia real de corredor de racks de servidores físicos em datacenter profissional.'
  }
];

const targetDirs = [
  path.resolve('assets/images'),
  path.resolve('public/assets/images'),
  path.resolve('dist/assets/images'),
  path.resolve('HOSTINGER-FINAL/assets/images')
];

targetDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function run() {
  console.log('Downloading and converting 6 test photographic covers...');
  for (const item of testItems) {
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=1400&q=85`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url} (HTTP ${res.status})`);
    const buf = Buffer.from(await res.arrayBuffer());
    
    const webpBuf = await sharp(buf)
      .resize(860, 440, { fit: 'cover', position: 'center' })
      .webp({ quality: 90, effort: 6 })
      .toBuffer();

    for (const d of targetDirs) {
      fs.writeFileSync(path.join(d, item.filename), webpBuf);
    }
    console.log(`Saved: ${item.filename} (${webpBuf.length} bytes, 860x440 px)`);
  }

  // Generate HTML preview page for 6 test covers
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview — 6 Capas de Teste Fotorealistas | Blog CONEXUS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #080c14; color: #f1f5f9; padding: 48px 24px; min-height: 100vh; }
    .container { max-width: 1240px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 9999px; background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.3); color: #60a5fa; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 20px; }
    h1 { font-family: 'Space Grotesk', sans-serif; font-size: 34px; font-weight: 700; color: #ffffff; margin-bottom: 14px; letter-spacing: -0.02em; }
    p.sub { font-size: 16px; color: #94a3b8; max-width: 780px; margin: 0 auto; line-height: 1.6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px; }
    .card { background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s ease, border-color 0.2s ease; box-shadow: 0 16px 36px rgba(0,0,0,0.45); }
    .card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.4); }
    .img-box { position: relative; width: 100%; aspect-ratio: 860 / 440; background: #1e293b; overflow: hidden; }
    .img-box img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .num-pill { position: absolute; top: 14px; left: 14px; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); color: #ffffff; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,0.15); }
    .status-pill { position: absolute; top: 14px; right: 14px; background: rgba(16,185,129,0.9); backdrop-filter: blur(8px); color: #ffffff; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
    .category { color: #38bdf8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
    .title { font-size: 18px; font-weight: 700; color: #f8fafc; line-height: 1.4; margin-bottom: 14px; }
    .desc { font-size: 13.5px; color: #94a3b8; line-height: 1.55; margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); }
    .meta { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; font-size: 11.5px; color: #64748b; font-family: monospace; }
  </style>
</head>
<body>
<div class="container">
  <header class="header">
    <div class="badge">Amostra de Validação Fotográfica</div>
    <h1>6 Capas de Teste — Fotografia Realista Editorial</h1>
    <p class="sub">Cada imagem é uma fotografia real capturada por câmera (profissionais, escritórios reais, comércio local, reuniões corporativas e datacenters), sem nenhum vetor, ilustração, template azul ou arte gráfica.</p>
  </header>
  <div class="grid">
${testItems.map(item => `    <div class="card">
      <div class="img-box">
        <img src="/assets/images/${item.filename}?t=${Date.now()}" alt="${item.title}" loading="eager">
        <div class="num-pill">Amostra #${item.num}</div>
        <div class="status-pill">Fotografia Real</div>
      </div>
      <div class="body">
        <div class="category">${item.category}</div>
        <h2 class="title">${item.title}</h2>
        <div class="desc">${item.description}</div>
        <div class="meta">
          <span>${item.filename}</span>
          <span>860 × 440 WebP</span>
        </div>
      </div>
    </div>`).join('\n')}
  </div>
</div>
</body>
</html>`;

  fs.writeFileSync('preview-6-test-covers.html', html, 'utf-8');
  fs.writeFileSync('public/preview-6-test-covers.html', html, 'utf-8');
  console.log('✓ Generated preview-6-test-covers.html');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
