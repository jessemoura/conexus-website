const fs = require('fs');
const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

function getTranslation(key, dict) {
  if (!key || typeof key !== 'string') return null;
  return key.split('.').reduce((o, i) => (o ? o[i] : null), dict);
}

console.log('====================================================');
console.log('   CONEXUS BRASIL - DIAGNÓSTICO COMPLETO DE I18N    ');
console.log('====================================================');

// 1. HOME: GRANA SECTION VS SOS ABERTURAS
const homeHtml = fs.readFileSync('index.html', 'utf8');
const granaHomeIdx = homeHtml.indexOf('grana');
console.log('\n--- 1. HOME PAGE GRANA ANALYSIS ---');
if (granaHomeIdx !== -1) {
  // Find surrounding context
  const start = Math.max(0, granaHomeIdx - 300);
  const end = Math.min(homeHtml.length, granaHomeIdx + 600);
  console.log('Context of GRANA on Home:\n', homeHtml.slice(start, end));
} else {
  console.log('GRANA not found on index.html!');
}

// 2. PORTFOLIO INDEX CARDS
console.log('\n--- 2. PORTFOLIO/INDEX.HTML CARDS ---');
const portHtml = fs.readFileSync('portfolio/index.html', 'utf8');
const portCards = portHtml.match(/<article[\s\S]*?<\/article>/g) || portHtml.match(/class="[^"]*case-card[^"]*"[\s\S]*?<\/div>/g) || [];
console.log(`Portfolio cards found: ${portCards.length}`);

// Check all portfolio directories
const portDirs = fs.readdirSync('portfolio', { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('Portfolio directories:', portDirs);
portDirs.forEach(dir => {
  const pagePath = `portfolio/${dir}/index.html`;
  if (fs.existsSync(pagePath)) {
    const pageHtml = fs.readFileSync(pagePath, 'utf8');
    const tags = pageHtml.match(/data-i18n(?:-html)?="([^"]+)"/g) || [];
    console.log(`  ${dir}: ${tags.length} i18n tags`);
  }
});

// 3. BLOG INDEX CARDS
console.log('\n--- 3. BLOG/INDEX.HTML CARDS STATS ---');
const blogHtml = fs.readFileSync('blog/index.html', 'utf8');
const blogCards = blogHtml.match(/<article[\s\S]*?<\/article>/g) || [];

let withI18n = 0;
let withoutI18n = 0;
let enIsPortuguese = 0;
let enIsTranslated = 0;

blogCards.forEach((c, idx) => {
  const m = c.match(/data-i18n="([^"]+)"/);
  if (m) {
    withI18n++;
    const key = m[1];
    const ptV = getTranslation(key, pt);
    const enV = getTranslation(key, en);
    if (ptV && enV && ptV === enV && ptV.length > 10) {
      enIsPortuguese++;
    } else if (ptV && enV && ptV !== enV) {
      enIsTranslated++;
    }
  } else {
    withoutI18n++;
  }
});

console.log(`Total Blog Cards: ${blogCards.length}`);
console.log(`  Without data-i18n: ${withoutI18n}`);
console.log(`  With data-i18n: ${withI18n}`);
console.log(`    Of which EN is still Portuguese: ${enIsPortuguese}`);
console.log(`    Of which EN is truly translated: ${enIsTranslated}`);
