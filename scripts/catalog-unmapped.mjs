import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);
console.log(`Analyzing ${htmlFiles.length} HTML files...`);

const report = {};

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  // Simple extraction of tags without data-i18n inside body
  const bodyMatch = html.match(/<body[\s\S]*?<\/body>/i);
  if (!bodyMatch) return;
  const body = bodyMatch[0];

  // Match text-bearing elements: h1, h2, h3, h4, h5, h6, p, span, a, button, label, li, dt, dd, figcaption, blockquote
  // We want to see how many have data-i18n vs not
  const elementRegex = /<([a-z1-6]+)([^>]*)>([^<]+)<\/\1>/gi;
  let match;
  let unmapped = [];
  let mapped = [];

  while ((match = elementRegex.exec(body)) !== null) {
    const [full, tag, attrs, text] = match;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) continue;
    // Skip scripts, styles
    if (['script', 'style', 'svg', 'path'].includes(tag.toLowerCase())) continue;
    
    // Check if element or parent has data-i18n
    const hasI18n = attrs.includes('data-i18n') || attrs.includes('data-i18n-html');
    if (hasI18n) {
      mapped.push({ tag, text: trimmed });
    } else {
      // Check if it's just a number, icon, or single symbol
      if (/^[\d\s.,\-_+–—/%$€£✓()]+$/.test(trimmed)) continue;
      unmapped.push({ tag, text: trimmed });
    }
  }

  report[relPath] = {
    mappedCount: mapped.length,
    unmappedCount: unmapped.length,
    unmappedSamples: unmapped.slice(0, 10).map(u => `<${u.tag}>: ${u.text}`)
  };
});

console.log(JSON.stringify(report, null, 2));
