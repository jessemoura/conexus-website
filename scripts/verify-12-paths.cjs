const fs = require('fs');

const casesSlugs = [
  { name: 'GRANA', slug: 'case-grana-aplicativo-gestao-financeira-google-play' },
  { name: 'Atthos Comex', slug: 'case-atthos-comex-site-institucional-comercio-exterior' },
  { name: 'Di Piallato', slug: 'case-di-piallato-presenca-digital-gelateria-artesanal' },
  { name: 'SOS Aberturas', slug: 'case-sos-aberturas-arquitetura-conversao-emergencial-portugal' },
  { name: 'Welcome Book Digital', slug: 'solucao-welcome-book-digital-experiencia-do-hospede-anfitrioes' },
  { name: 'Fast Guincho', slug: 'case-fast-guincho-conversao-emergencial-seo-local-curitiba' },
  { name: 'Nikki Studio', slug: 'case-nikki-studio-identidade-visual-plataforma-estetica-uk' },
  { name: 'Lumora Cleaning Services', slug: 'case-lumora-cleaning-services-plataforma-orcamentos-limpeza-uk' },
  { name: 'Sóquindins', slug: 'case-soquindins-presenca-digital-confeitaria-tradicional-curitiba' },
  { name: 'Michelly Correa', slug: 'case-michelly-correa-website-autoridade-comunicacao-jornalismo' },
  { name: 'Little Pet', slug: 'case-little-pet-presenca-digital-pet-shop-estetica-animal' },
  { name: 'CuritiPão 2026', slug: 'curitipao-2026-festival-panificacao-curitiba' }
];

console.log('Verifying 12 article paths:');
casesSlugs.forEach(c => {
  const p = `blog/${c.slug}/index.html`;
  console.log(`  ${c.name} (${p}): ${fs.existsSync(p) ? 'EXISTS' : 'NOT FOUND'}`);
});
