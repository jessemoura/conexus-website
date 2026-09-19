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
let unmappedCount = 0;
const unmappedList = [];

// Whitelist of brand names, proper names, symbols, and exempted items
const whitelist = [
  'CONEXUS',
  'CONEXUS Guest Hub',
  'Welcome Book',
  'Michelly Correa',
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

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) return;
  const main = mainMatch[0];

  const regex = /<([a-z1-6]+)([^>]*)>([^<]+)<\/\1>/gi;
  let match;
  while ((match = regex.exec(main)) !== null) {
    const [_, tag, attrs, text] = match;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) continue;
    if (['script', 'style', 'svg', 'path', 'code'].includes(tag.toLowerCase())) continue;
    if (attrs.includes('data-i18n') || attrs.includes('data-i18n-html')) continue;

    // Check if numbers, punctuation
    if (/^[\d\s.,\-_+–—/%$€£✓()]+$/.test(trimmed)) continue;
    // Check if in whitelist
    if (whitelist.some(w => trimmed === w || trimmed.includes(w) && trimmed.length <= w.length + 4)) continue;

    unmappedCount++;
    unmappedList.push({ file: relPath, tag, text: trimmed });
  }
});

console.log('====================================================');
console.log('   AUDITORIA DETALHADA DE TEXTOS NÃO MAPEADOS       ');
console.log('====================================================');
console.log(`Total de páginas analisadas: ${htmlFiles.length}`);
console.log(`Textos pendentes: ${unmappedCount}`);

const byFile = {};
unmappedList.forEach(u => {
  byFile[u.file] = (byFile[u.file] || 0) + 1;
});

Object.keys(byFile).forEach(f => {
  console.log(`  - ${f}: ${byFile[f]} textos pendentes`);
});
console.log('====================================================');
