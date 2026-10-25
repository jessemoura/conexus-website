const fs = require('fs');
const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

function getVal(dict, keyStr) {
  if (!dict || !keyStr) return null;
  return keyStr.split('.').reduce((o, i) => (o ? o[i] : null), dict);
}

const cases = [
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

cases.forEach(c => {
  const filePath = `blog/${c.slug}/index.html`;
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract article body
  const bodyMatch = html.match(/<article[\s\S]*?<\/article>/);
  const articleHtml = bodyMatch ? bodyMatch[0] : html;

  // Extract all text elements: h1, h2, h3, p, li, span, a, figcaption
  const i18nMatches = articleHtml.match(/data-i18n(?:-html)?="([^"]+)"/g) || [];
  const keys = i18nMatches.map(m => m.split('="')[1].replace('"', ''))
    .filter(k => !k.startsWith('nav.') && !k.startsWith('footer.') && !k.startsWith('common.') && !k.startsWith('whatsapp.'));

  // Check how many p, h2, h3 tags don't have data-i18n
  const paragraphs = articleHtml.match(/<p[\s\S]*?<\/p>/g) || [];
  const pWithoutI18n = paragraphs.filter(p => !p.includes('data-i18n'));

  const h2s = articleHtml.match(/<h2[\s\S]*?<\/h2>/g) || [];
  const h2WithoutI18n = h2s.filter(h => !h.includes('data-i18n'));

  // Check translation quality in EN
  let enSameAsPt = 0;
  let enMissing = 0;
  let enOk = 0;

  keys.forEach(k => {
    const ptV = getVal(pt, k);
    const enV = getVal(en, k);
    if (!enV) {
      enMissing++;
    } else if (ptV && enV && ptV === enV && ptV.length > 10) {
      enSameAsPt++;
    } else {
      enOk++;
    }
  });

  console.log(`\n[${c.name}] (${c.slug}):`);
  console.log(`  Content keys count: ${keys.length} (OK: ${enOk}, SameAsPt: ${enSameAsPt}, Missing: ${enMissing})`);
  console.log(`  Paragraphs without data-i18n: ${pWithoutI18n.length}/${paragraphs.length}`);
  console.log(`  H2s without data-i18n: ${h2WithoutI18n.length}/${h2s.length}`);
  if (enSameAsPt > 0) {
    const sample = keys.filter(k => getVal(pt, k) === getVal(en, k) && (getVal(pt, k) || '').length > 10).slice(0, 3);
    console.log(`  Sample untranslated keys:`, sample);
  }
});
