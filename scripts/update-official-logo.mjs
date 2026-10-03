import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'dist' && item.name !== 'scratch' && item.name !== 'HOSTINGER-FINAL') {
        results = results.concat(getHtmlFiles(path.join(dir, item.name)));
      }
    } else if (item.name.endsWith('.html')) {
      results.push(path.join(dir, item.name));
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles('.');
console.log(`Auditing and updating ${htmlFiles.length} HTML files...`);

let logoUpdates = 0;
let bgUpdates = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Standardize Brand Logo img tags
  // Header Logo
  content = content.replace(
    /<img\s+src="\/assets\/logos\/[^"]*"\s+alt="[^"]*"\s+width="[^"]*"\s+height="[^"]*"\s+loading="eager"/gi,
    '<img src="/assets/logos/conexus-logo-primary-transparent.png" alt="CONEXUS" width="144" height="48" loading="eager"'
  );

  // Footer / lazy logo
  content = content.replace(
    /<img\s+src="\/assets\/logos\/[^"]*"\s+alt="[^"]*"\s+width="[^"]*"\s+height="[^"]*"\s+loading="lazy"/gi,
    '<img src="/assets/logos/conexus-logo-primary-transparent.png" alt="CONEXUS" width="144" height="48" loading="lazy"'
  );

  // Catch any remaining logo img inside brand-logo
  content = content.replace(
    /(<a[^>]*class="brand-logo"[^>]*>[\s\r\n]*<img\s+src=")[^"]*("\s+alt=")[^"]*(")/gi,
    '$1/assets/logos/conexus-logo-primary-transparent.png$2CONEXUS$3'
  );

  // Catch any img with alt="CONEXUS Logo"
  content = content.replace(/alt="CONEXUS Logo"/gi, 'alt="CONEXUS"');
  content = content.replace(/alt="Logo CONEXUS"/gi, 'alt="CONEXUS"');

  // 2. Replace hardcoded #061426 card backgrounds with CSS variable
  if (content.includes('style="background: #061426;')) {
    content = content.replace(/style="background:\s*#061426;/g, 'style="background: var(--color-surface-navy);');
    bgUpdates++;
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    logoUpdates++;
  }
}

console.log(`Updated logos in ${logoUpdates} files.`);
console.log(`Replaced hardcoded card backgrounds in ${bgUpdates} files.`);
