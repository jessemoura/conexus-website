import https from 'https';

const assets = [
  'https://www.conexus.press/assets/logos/conexus-logo-primary-transparent.png',
  'https://www.conexus.press/assets/images/criacao-sites-conexus.webp',
  'https://www.conexus.press/assets/images/site-one-page-conexus.webp',
  'https://www.conexus.press/assets/images/seo-conexus.webp',
  'https://www.conexus.press/assets/images/seo-local-empresa-google.webp',
  'https://www.conexus.press/assets/images/branding-identidade-visual-conexus.webp',
  'https://www.conexus.press/assets/images/social-media-conteudo-conexus.webp',
  'https://www.conexus.press/assets/images/marketing-digital-estrategia-conexus.webp',
  'https://www.conexus.press/servicos/',
  'https://www.conexus.press/servicos/criacao-de-sites/'
];

async function check() {
  console.log('--- PRODUCTION ASSETS VERIFICATION ---');
  for (const url of assets) {
    await new Promise((resolve) => {
      https.get(url, { headers: { 'Cache-Control': 'no-cache, no-store' } }, (res) => {
        console.log(`[STATUS ${res.statusCode}] ${url} (${res.headers['content-length'] || ''} bytes)`);
        resolve();
      }).on('error', (err) => {
        console.error(`[ERROR] ${url}: ${err.message}`);
        resolve();
      });
    });
  }
}

check();
