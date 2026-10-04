const https = require('https');

const assets = [
  'https://conexus.press/assets/logos/conexus-logo-primary-transparent.png',
  'https://conexus.press/assets/images/marketing-digital-estrategia-conexus.webp',
  'https://conexus.press/assets/images/card-criacao-sites.webp',
  'https://conexus.press/assets/images/card-site-one-page.webp',
  'https://conexus.press/assets/images/card-seo-empresas.webp',
  'https://conexus.press/assets/images/card-seo-local.webp',
  'https://conexus.press/assets/images/card-branding-design.webp',
  'https://conexus.press/assets/images/card-redes-sociais.webp',
  'https://conexus.press/assets/images/card-guest-hub.webp',
  'https://conexus.press/assets/images/card-app-development.webp',
  'https://conexus.press/assets/images/criacao-sites-conexus.webp',
  'https://conexus.press/assets/images/site-one-page-conexus.webp',
  'https://conexus.press/assets/images/seo-conexus.webp',
  'https://conexus.press/assets/images/seo-local-empresa-google.webp',
  'https://conexus.press/assets/images/branding-identidade-visual-conexus.webp',
  'https://conexus.press/assets/images/social-media-conteudo-conexus.webp',
  'https://conexus.press/assets/images/hero-guest-hub-experience.webp',
  'https://conexus.press/assets/images/hero-app-dev-engineering.webp',
  'https://conexus.press/assets/images/hero-sobre-conexus.webp',
  'https://conexus.press/assets/images/hero-contato-atendimento.webp'
];

const pages = [
  'https://conexus.press/',
  'https://conexus.press/servicos/',
  'https://conexus.press/servicos/criacao-de-sites/',
  'https://conexus.press/servicos/site-one-page/',
  'https://conexus.press/servicos/seo/',
  'https://conexus.press/servicos/seo-local-google-meu-negocio/',
  'https://conexus.press/servicos/branding-identidade-visual/',
  'https://conexus.press/servicos/gestao-redes-sociais/',
  'https://conexus.press/servicos/conexus-guest-hub/',
  'https://conexus.press/servicos/desenvolvimento-de-aplicativos/',
  'https://conexus.press/sobre/',
  'https://conexus.press/contato/',
  'https://conexus.press/portfolio/',
  'https://conexus.press/blog/'
];

async function checkUrl(url) {
  return new Promise(resolve => {
    const req = https.get(url, res => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', e => resolve({ url, status: 'ERROR: ' + e.message }));
  });
}

async function run() {
  console.log('=== VERIFICANDO PÁGINAS EM PRODUÇÃO ===');
  let pagesOk = 0;
  for (const page of pages) {
    const res = await checkUrl(page);
    console.log((res.status === 200 ? '✅ 200' : '❌ ' + res.status) + ' ' + res.url);
    if (res.status === 200) pagesOk++;
  }

  console.log('\n=== VERIFICANDO ASSETS VISUAIS EM PRODUÇÃO ===');
  let assetsOk = 0;
  for (const asset of assets) {
    const res = await checkUrl(asset);
    console.log((res.status === 200 ? '✅ 200' : '❌ ' + res.status) + ' ' + res.url);
    if (res.status === 200) assetsOk++;
  }

  console.log('\n========================================');
  console.log('PÁGINAS: ' + pagesOk + '/' + pages.length + ' ONLINE');
  console.log('ASSETS: ' + assetsOk + '/' + assets.length + ' DISPONÍVEIS');
  console.log('========================================');
}

run();
