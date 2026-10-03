import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== PRODUCTION LIVE AUDIT (conexus.press) ===\n');

  const urls = [
    'https://www.conexus.press/',
    'https://www.conexus.press/blog/',
    'https://www.conexus.press/sitemap.xml',
    // New posts (sample)
    'https://www.conexus.press/blog/15-erros-que-fazem-um-site-empresarial-perder-clientes/',
    'https://www.conexus.press/blog/como-empresas-de-sao-jose-dos-pinhais-podem-conquistar-mais-clientes-pelo-google/',
    'https://www.conexus.press/blog/geo-como-preparar-sua-empresa-para-ser-encontrada-por-inteligencias-artificiais/',
    'https://www.conexus.press/blog/como-criar-conteudo-que-possa-ser-citado-por-inteligencias-artificiais/',
    // Old posts (sample)
    'https://www.conexus.press/blog/seo-para-pequenas-empresas-guia-completo/',
    'https://www.conexus.press/blog/por-que-sua-empresa-precisa-de-um-site/',
    'https://www.conexus.press/blog/curitipao-2026-festival-panificacao-curitiba/'
  ];

  for (const url of urls) {
    try {
      const res = await fetchUrl(url);
      console.log(`[STATUS ${res.status}] ${url} (${(res.body.length / 1024).toFixed(1)} KB)`);
      
      if (url === 'https://www.conexus.press/blog/') {
        // Count cards
        const articleMatches = (res.body.match(/blog-post-card/g) || []).length;
        console.log(`  -> Total Article Cards in /blog/: ${articleMatches}`);
      }

      if (url === 'https://www.conexus.press/sitemap.xml') {
        const urlMatches = (res.body.match(/<loc>/g) || []).length;
        console.log(`  -> Total URLs in sitemap.xml: ${urlMatches}`);
      }

      if (url.includes('/blog/') && !url.endsWith('/blog/')) {
        const hasHreflangPt = res.body.includes('hreflang="pt-BR"');
        const hasHreflangEn = res.body.includes('hreflang="en"');
        const hasHreflangEs = res.body.includes('hreflang="es"');
        const hasCanonical = res.body.includes('rel="canonical"');
        const hasI18nScript = res.body.includes('i18n.js');
        console.log(`  -> Canonical present: ${hasCanonical} | Hreflangs: pt=${hasHreflangPt}, en=${hasHreflangEn}, es=${hasHreflangEs} | i18n: ${hasI18nScript}`);
      }
    } catch (err) {
      console.error(`[ERROR] ${url}: ${err.message}`);
    }
  }
}

run();
