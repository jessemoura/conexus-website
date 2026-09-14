import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);

// Whitelist of brand names, proper names, symbols, and exempted items
const whitelistWords = [
  'CONEXUS',
  'CONEXUS Guest Hub',
  'Welcome Book',
  'Michelly Corrêa',
  'Nikki Studio',
  'Crafix',
  'Di Piallato',
  'Lumora Cleaning Services',
  'Lumora',
  'SOS Aberturas',
  'CONEXXUS Digital Marketing UK',
  'CONEXXUS UK',
  'Oxford Barber',
  'Vila Serena',
  'comercial@conexus.press',
  'jesse.ribeiro@conexus.press',
  'CNPJ: 50.429.176/0001-90',
  'PT',
  'EN',
  'ES',
  '✓',
  'WhatsApp',
  'Google',
  'Google Maps',
  'Airbnb',
  'Booking',
  'Instagram',
  'LinkedIn',
  'SEO',
  'SSL',
  'HTTPS',
  'Waze',
  'Mychelli Correa',
  'Littlepet - Pet Shop',
  'nikki.studio',
  'Tour Curitidoce',
  'Jessiel Moura',
  'Karine Gonzaga'
];

let totalUntagged = 0;
const report = {};

for (const file of htmlFiles) {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  // Strip script, style, svg, comments
  let cleanHtml = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '');

  // Look for leaf tags that have text content
  const tagRegex = /<([a-z1-6]+)([^>]*)>([^<]+)<\/\1>/gi;
  let match;
  while ((match = tagRegex.exec(cleanHtml)) !== null) {
    const [fullMatch, tag, attrs, text] = match;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) continue;
    if (['script', 'style', 'svg', 'path', 'code', 'pre', 'title'].includes(tag.toLowerCase())) continue;

    // Language selector options
    if (attrs.includes('lang-text') || (['Português', 'English', 'Español'].includes(trimmed) && (attrs.includes('lang-option') || attrs.includes('lang-btn')))) continue;

    // Check if element has i18n attribute
    const hasI18n = attrs.includes('data-i18n') || attrs.includes('data-i18n-html');
    if (hasI18n) continue;

    // Check if only numbers, punctuation, icons
    if (/^[\d\s.,\-_+–—/%$€£✓()·•→←|]+$/.test(trimmed)) continue;

    // Check if wholly whitelisted
    const isWhitelisted = whitelistWords.some(w => trimmed === w || (trimmed.includes(w) && trimmed.length <= w.length + 3));
    if (isWhitelisted) continue;

    totalUntagged++;
    if (!report[relPath]) report[relPath] = [];
    report[relPath].push({ tag, text: trimmed, sample: fullMatch.slice(0, 100) });
  }

  // Also check input/textarea placeholders
  const inputRegex = /<(input|textarea)([^>]*)>/gi;
  let inputMatch;
  while ((inputMatch = inputRegex.exec(cleanHtml)) !== null) {
    const [fullInput, inputTag, inputAttrs] = inputMatch;
    if (inputAttrs.includes('placeholder=')) {
      const placeholderMatch = inputAttrs.match(/placeholder=["']([^"']+)["']/i);
      if (placeholderMatch) {
        const phText = placeholderMatch[1].trim();
        const hasAttrI18n = inputAttrs.includes('data-i18n-attr') && inputAttrs.includes('placeholder:');
        if (!hasAttrI18n && phText.length > 1) {
          totalUntagged++;
          if (!report[relPath]) report[relPath] = [];
          report[relPath].push({ tag: inputTag, text: '[placeholder] ' + phText, sample: fullInput });
        }
      }
    }
  }
}

console.log('====================================================');
console.log('   AUDITORIA GERAL DE TEXTOS NÃO MAPEADOS (30 PÁGINAS) ');
console.log('====================================================');
console.log(`Total de arquivos HTML analisados: ${htmlFiles.length}`);
console.log(`Total de elementos visíveis não mapeados encontrados: ${totalUntagged}`);

for (const p in report) {
  console.log(`\n=== ${p} (${report[p].length} pendências) ===`);
  report[p].forEach(item => {
    console.log(`  <${item.tag}>: "${item.text}"`);
  });
}
console.log('\n====================================================');

