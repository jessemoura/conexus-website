import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles('.');

console.log('Scanning all 30 HTML files for elements without data-i18n...\n');

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const missing = [];
  
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // Check if line contains text tags
    if (/<(h1|h2|h3|h4|h5|h6|p|li|span|a|button|label|strong|em|figcaption|td|th)\b/i.test(trimmed)) {
      // Exclude script, svg, style, meta, inputs, lang-selectors, social icons, brand logos
      if (
        !trimmed.includes('data-i18n') &&
        !trimmed.includes('data-i18n-html') &&
        !trimmed.includes('class="lang-') &&
        !trimmed.includes('class="social-') &&
        !trimmed.includes('class="footer-social-') &&
        !trimmed.includes('class="brand-logo') &&
        !trimmed.includes('svg') &&
        !trimmed.includes('<script') &&
        !trimmed.includes('<link')
      ) {
        // Extract raw text
        const text = trimmed.replace(/<[^>]+>/g, '').trim();
        // Ignore empty, numbers, single symbols, email, tel, CONEXUS
        if (
          text.length > 2 &&
          !/^[\d\s\/\-\.\,\:\(\)\+]+$/.test(text) &&
          text !== 'CONEXUS' &&
          text !== 'CONEXUS.' &&
          text !== 'WhatsApp' &&
          text !== 'LinkedIn' &&
          text !== 'Instagram' &&
          text !== '✓' &&
          text !== '/' &&
          text !== '•' &&
          !text.includes('comercial@conexus.press') &&
          !text.includes('+55')
        ) {
          missing.push({ line: idx + 1, text, html: trimmed });
        }
      }
    }
  });
  
  if (missing.length > 0) {
    console.log(`\n📄 ${file} (${missing.length} elements without data-i18n):`);
    missing.forEach(m => console.log(`   L${m.line}: ${m.text.slice(0, 70)} | ${m.html.slice(0, 60)}`));
  }
}
