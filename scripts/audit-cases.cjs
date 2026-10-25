const fs = require('fs');
const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

function getVal(dict, keyStr) {
  if (!dict || !keyStr) return null;
  return keyStr.split('.').reduce((o, i) => (o ? o[i] : null), dict);
}

const cases = [
  { name: 'GRANA', blogSlug: 'case-grana-aplicativo-gestao-financeira-google-play', portSlug: 'grana' },
  { name: 'Atthos Comex', blogSlug: 'case-atthos-comex-site-institucional-comercio-exterior', portSlug: 'atthos-comex' },
  { name: 'Di Piallato', blogSlug: 'case-di-piallato-presenca-digital-gelateria-artesanal', portSlug: 'di-piallato' },
  { name: 'SOS Aberturas', blogSlug: 'case-sos-aberturas-conversao-emergencial-chaveiro-24h', portSlug: 'sos-aberturas' },
  { name: 'Welcome Book Digital', blogSlug: 'case-welcome-book-apartamento-41-guia-digital-anfitrioes', portSlug: 'welcome-book-apartamento-41' },
  { name: 'Fast Guincho', blogSlug: 'case-fast-guincho-conversao-emergencial-seo-local-curitiba', portSlug: 'fast-guincho' },
  { name: 'Nikki Studio', blogSlug: 'case-nikki-studio-website-portfolio-fotografia-arquitetura', portSlug: 'nikki-studio' },
  { name: 'Lumora Cleaning Services', blogSlug: 'case-lumora-cleaning-services-plataforma-orcamentos-limpeza-uk', portSlug: 'lumora-cleaning-services' },
  { name: 'Sóquindins', blogSlug: 'case-soquindins-presenca-digital-confeitaria-tradicional-curitiba', portSlug: 'soquindins' },
  { name: 'Michelly Correa', blogSlug: 'case-michelly-correa-website-autoridade-comunicacao-jornalismo', portSlug: 'michelly-correa' },
  { name: 'Little Pet', blogSlug: 'case-little-pet-presenca-digital-pet-shop-estetica-animal', portSlug: null },
  { name: 'CuritiPão 2026', blogSlug: 'curitipao-2026-festival-panificacao-curitiba', portSlug: 'curitipao' },
  { name: 'Crafix', blogSlug: null, portSlug: 'crafix' },
  { name: 'Conexxus UK', blogSlug: null, portSlug: 'conexxus-uk' }
];

console.log('=== DEEP AUDIT OF CONTENT KEYS FOR ALL CASES ===\n');

cases.forEach(c => {
  console.log(`\n========================================\nCASE: ${c.name}\n========================================`);
  
  if (c.blogSlug) {
    const blogPath = `blog/${c.blogSlug}/index.html`;
    if (fs.existsSync(blogPath)) {
      const html = fs.readFileSync(blogPath, 'utf8');
      const matches = html.match(/data-i18n(?:-html)?="([^"]+)"/g) || [];
      const keys = matches.map(m => m.split('="')[1].replace('"', ''))
        .filter(k => !k.startsWith('nav.') && !k.startsWith('footer.') && !k.startsWith('common.') && !k.startsWith('whatsapp.'));
      
      console.log(`\n[BLOG] ${blogPath} (${keys.length} content keys):`);
      keys.forEach(k => {
        const ptV = getVal(pt, k);
        const enV = getVal(en, k);
        const esV = getVal(es, k);
        const isMissingEn = !enV;
        const isEnSameAsPt = enV && enV === ptV && ptV.length > 5;
        const status = isMissingEn ? 'MISSING_EN' : (isEnSameAsPt ? 'EN_IS_PORTUGUESE' : 'OK');
        console.log(`  ${k} -> status: ${status}`);
        if (status !== 'OK') {
          console.log(`     PT: ${ptV ? ptV.slice(0, 60) : 'null'}`);
          console.log(`     EN: ${enV ? enV.slice(0, 60) : 'null'}`);
        }
      });
    }
  }

  if (c.portSlug) {
    const portPath = `portfolio/${c.portSlug}/index.html`;
    if (fs.existsSync(portPath)) {
      const html = fs.readFileSync(portPath, 'utf8');
      const matches = html.match(/data-i18n(?:-html)?="([^"]+)"/g) || [];
      const keys = matches.map(m => m.split('="')[1].replace('"', ''))
        .filter(k => !k.startsWith('nav.') && !k.startsWith('footer.') && !k.startsWith('common.') && !k.startsWith('whatsapp.'));
      
      console.log(`\n[PORTFOLIO] ${portPath} (${keys.length} content keys):`);
      keys.forEach(k => {
        const ptV = getVal(pt, k);
        const enV = getVal(en, k);
        const isMissingEn = !enV;
        const isEnSameAsPt = enV && enV === ptV && ptV.length > 5;
        const status = isMissingEn ? 'MISSING_EN' : (isEnSameAsPt ? 'EN_IS_PORTUGUESE' : 'OK');
        console.log(`  ${k} -> status: ${status}`);
        if (status !== 'OK') {
          console.log(`     PT: ${ptV ? ptV.slice(0, 60) : 'null'}`);
          console.log(`     EN: ${enV ? enV.slice(0, 60) : 'null'}`);
        }
      });
    }
  }
});
