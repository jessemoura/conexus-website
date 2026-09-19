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

const allArticles = [
  ...c1.cluster1Articles,
  ...c2.cluster2Articles,
  ...c3.cluster3Articles,
  ...c4.cluster4Articles,
  ...c5.cluster5Articles,
  ...c6.cluster6Articles
];

console.log(`Loaded ${allArticles.length} articles.`);

const BRAIN_DIR = 'C:/Users/Jesse/.gemini/antigravity-ide/brain/5d3e7a03-97e4-4eac-83a1-882410993865';

// Curated photo sources for all 60 posts
// 0..11: AI-generated editorial photos from brain artifact dir
// 12..59: Curated, high-resolution editorial photography from Unsplash
const photoSources = [
  // Cluster 1 (0-9) - AI Generated Photos
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_01_onepage_multipage_1789838792900.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_02_10_sinais_novo_site_1789838801423.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_03_site_gera_clientes_1789838814689.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_04_site_responsivo_1789838825772.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_05_landing_page_1789839216660.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_06_timeline_site_1789839230635.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_07_dominio_web_1789839245282.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_08_page_speed_1789839260760.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_09_multilingue_1789839277378.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c1_10_roi_site_1789839295301.jpg') },

  // Cluster 2 (10-19) - SEO & Google
  { type: 'local', path: path.join(BRAIN_DIR, 'c2_01_seo_pequenas_empresas_1789839316329.jpg') },
  { type: 'local', path: path.join(BRAIN_DIR, 'c2_02_seo_local_1789839342666.jpg') },
  // 12: como-aparecer-no-google-curitiba (City skyline / urban tech business)
  { type: 'url', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85' },
  // 13: google-perfil-da-empresa-guia-completo (Small business owner with tablet in modern boutique/cafe)
  { type: 'url', url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1400&q=85' },
  // 14: como-conseguir-mais-avaliacoes-no-google (5-star review / happy customer feedback interaction)
  { type: 'url', url: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1400&q=85' },
  // 15: como-responder-avaliacoes-google-reputacao (Executive writing review response on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85' },
  // 16: google-search-console-guia-para-empresarios (Search traffic analytics on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85' },
  // 17: palavras-chave-como-descobrir-pesquisas-clientes (Keyword research notebook and desktop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1400&q=85' },
  // 18: seo-tecnico-fatores-crescimento-google (Technical developer workspace / coding & diagnostics)
  { type: 'url', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85' },
  // 19: seo-para-prestadores-de-servicos (Service professional consulting client)
  { type: 'url', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85' },

  // Cluster 3 (20-29) - Marketing Digital & Redes Sociais
  // 20: site-ou-instagram-qual-mais-importante (Smartphone on desk next to laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=85' },
  // 21: instagram-substitui-site-profissional (Creative social media creator workspace)
  { type: 'url', url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1400&q=85' },
  // 22: como-criar-autoridade-digital-marca (Executive presenting brand strategy in modern boardroom)
  { type: 'url', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=85' },
  // 23: como-transformar-visitantes-do-site-em-clientes (CRO conversion analytics dashboard)
  { type: 'url', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85' },
  // 24: whatsapp-no-site-aumentar-contatos-conversoes (Person holding smartphone chatting/messaging)
  { type: 'url', url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1400&q=85' },
  // 25: marketing-de-conteudo-atrair-sem-anuncios (Content writer typing on laptop with notebook)
  { type: 'url', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85' },
  // 26: blog-empresarial-vale-a-pena-2026 (Modern blogging workspace with coffee & tablet)
  { type: 'url', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85' },
  // 27: como-criar-estrategia-digital-negocios-locais (Local business growth strategy meeting)
  { type: 'url', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85' },
  // 28: presenca-digital-o-que-empresa-precisa-2026 (Multiple connected digital devices on wood desk)
  { type: 'url', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85' },
  // 29: funil-de-vendas-digital-pequenas-empresas (Sales pipeline strategy on whiteboard/monitor)
  { type: 'url', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85' },

  // Cluster 4 (30-39) - Inteligência Artificial & Automação
  // 30: inteligencia-artificial-para-pequenas-empresas (Futuristic modern tech office / AI concept)
  { type: 'url', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85' },
  // 31: como-usar-chatgpt-dia-a-dia-da-empresa (Professional working with AI prompt on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1400&q=85' },
  // 32: 15-maneiras-usar-ia-nos-negocios (High tech multi-monitor workstation with AI data)
  { type: 'url', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85' },
  // 33: ia-no-atendimento-ao-cliente-vantagens-cuidados (Customer support specialist with modern UI)
  { type: 'url', url: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1400&q=85' },
  // 34: automacao-de-marketing-economizar-tempo-vender-mais (Workflow automation & connected systems)
  { type: 'url', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85' },
  // 35: inteligencia-artificial-vai-substituir-sites (Web developer working alongside AI tools)
  { type: 'url', url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=85' },
  // 36: como-ia-esta-transformando-marketing-digital (Digital agency team analyzing AI marketing trends)
  { type: 'url', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85' },
  // 37: ia-e-seo-mudancas-mecanismos-de-busca (Search algorithm analysis on laptop screen)
  { type: 'url', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=85' },
  // 38: como-preparar-empresa-para-era-da-ia (Business executives planning digital roadmap in boardroom)
  { type: 'url', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85' },
  // 39: agentes-de-ia-o-que-sao-como-ajudam-empresas (Autonomous AI system architecture / robot tech)
  { type: 'url', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=85' },

  // Cluster 5 (40-49) - Negócios & Transformação Digital
  // 40: transformacao-digital-pequenas-empresas-guia (Team collaborating with tablet and cloud tools)
  { type: 'url', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85' },
  // 41: como-profissionalizar-pequena-empresa-com-tecnologia (Modern clean professional office desk setup)
  { type: 'url', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85' },
  // 42: email-profissional-abandonar-enderecos-genericos (Corporate inbox on modern sleek laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=1400&q=85' },
  // 43: como-construir-confianca-marca-ambiente-digital (Corporate brand identity and premium presentation)
  { type: 'url', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85' },
  // 44: reputacao-online-como-proteger-imagem-empresa (Brand reputation management on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85' },
  // 45: como-escolher-agencia-de-marketing-digital (Meeting with creative digital agency team)
  { type: 'url', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=85' },
  // 46: agencia-ou-freelancer-qual-melhor-para-projeto (Creative designer workstation setup)
  { type: 'url', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=85' },
  // 47: como-tecnologia-reduz-custos-pequena-empresa (Financial cost efficiency and software tools)
  { type: 'url', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85' },
  // 48: digitalizacao-de-processos-como-comecar (Digital tablet with business workflow automation)
  { type: 'url', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1400&q=85' },
  // 49: tendencias-digitais-pequenas-empresas-acompanhar (Modern tech business trends presentation)
  { type: 'url', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=85' },

  // Cluster 6 (50-59) - Crescimento, Vendas & Tecnologia
  // 50: como-conseguir-mais-clientes-pela-internet (Digital customer acquisition and growth charts)
  { type: 'url', url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85' },
  // 51: como-transformar-google-canal-aquisicao-clientes (Google search inbound acquisition laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85' },
  // 52: como-medir-se-site-traz-resultados (KPI measurement dashboard on tablet and desktop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1400&q=85' },
  // 53: google-analytics-metricas-que-realmente-importam (Google Analytics traffic data on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1400&q=85' },
  // 54: formulario-ou-whatsapp-qual-gera-mais-contatos (Smartphone messaging next to website form on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=85' },
  // 55: seguranca-de-sites-como-proteger-empresa-clientes (Cybersecurity protection & padlock on laptop)
  { type: 'url', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=85' },
  // 56: lgpd-para-sites-pequenas-empresas (Data privacy compliance, security documents on desk)
  { type: 'url', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85' },
  // 57: aplicativos-para-empresas-quando-vale-a-pena (Smartphone mobile app prototype UX on desk)
  { type: 'url', url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=85' },
  // 58: software-personalizado-quando-empresa-precisa (Software engineering workstation with dual monitors)
  { type: 'url', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85' },
  // 59: futuro-negocios-digitais-sites-apps-automacao-ia (Futuristic innovative digital tech lab)
  { type: 'url', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85' }
];

const targetDirs = [
  path.resolve('./assets/images'),
  path.resolve('./public/assets/images'),
  path.resolve('./dist/assets/images'),
  path.resolve('./HOSTINGER-FINAL/assets/images')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function processAll() {
  console.log(`Starting processing of ${allArticles.length} covers...`);

  for (let i = 0; i < allArticles.length; i++) {
    const article = allArticles[i];
    const source = photoSources[i];
    const filename = path.basename(article.image);
    console.log(`[${i + 1}/${allArticles.length}] Processing ${filename} (${source.type})...`);

    let rawBuffer;
    if (source.type === 'local') {
      rawBuffer = fs.readFileSync(source.path);
    } else {
      const res = await fetch(source.url);
      if (!res.ok) throw new Error(`Failed to fetch ${source.url}: HTTP ${res.status}`);
      rawBuffer = Buffer.from(await res.arrayBuffer());
    }

    const webpBuffer = await sharp(rawBuffer)
      .resize(860, 440, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 90,
        effort: 6
      })
      .toBuffer();

    for (const dir of targetDirs) {
      const destPath = path.join(dir, filename);
      fs.writeFileSync(destPath, webpBuffer);
    }

    console.log(`  ✓ Saved ${filename} (${webpBuffer.length} bytes) to all 4 target directories.`);
  }

  console.log('\nAll 60 covers successfully generated, cropped to 860x440 and saved as WebP!');
}

processAll().catch(err => {
  console.error('Error processing covers:', err);
  process.exit(1);
});
