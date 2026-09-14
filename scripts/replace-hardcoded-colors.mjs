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

console.log('Replacing hardcoded text colors with adaptive CSS variables in all HTML files...\n');

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;
  
  // Replace hardcoded light text colors in style="..." attributes, except in button definitions or svg
  content = content.replace(/style="([^"]*)"/g, (match, styleContent) => {
    let updated = styleContent;
    // Only replace text color directives
    updated = updated.replace(/color:\s*#FFFFFF\s*!important;?/gi, 'color: var(--color-text-white);');
    updated = updated.replace(/color:\s*#FFFFFF;?/gi, 'color: var(--color-text-white);');
    updated = updated.replace(/color:\s*#F5F8FC\s*!important;?/gi, 'color: var(--color-text-white);');
    updated = updated.replace(/color:\s*#CBD5E1\s*!important;?/gi, 'color: var(--color-text-muted);');
    updated = updated.replace(/color:\s*#CBD5E1;?/gi, 'color: var(--color-text-muted);');
    updated = updated.replace(/color:\s*#B8C5D3\s*!important;?/gi, 'color: var(--color-text-muted);');
    return `style="${updated}"`;
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ Updated adaptive color variables in ${file}`);
  }
}
