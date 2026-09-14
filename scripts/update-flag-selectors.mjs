import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

const targetSelectorHTML = `        <!-- LANGUAGE SELECTOR -->
        <div class="lang-selector-dropdown" id="lang-selector">
          <button class="lang-btn" id="lang-btn" aria-label="Selecionar Idioma" aria-expanded="false" aria-haspopup="true">
            <img src="/assets/icons/flags/br.svg" alt="Bandeira do Brasil" class="lang-flag-img lang-active-flag-img" width="20" height="14" loading="eager">
            <span class="lang-code lang-active-code">PT</span>
            <svg class="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="lang-menu" id="lang-menu" role="menu" aria-label="Idiomas disponíveis">
            <button class="lang-option active" data-lang="pt" role="menuitem" aria-selected="true">
              <img src="/assets/icons/flags/br.svg" alt="Bandeira do Brasil" class="lang-flag-img" width="20" height="14" loading="eager">
              <span class="lang-option-name">Português</span>
              <span class="lang-check">✓</span>
            </button>
            <button class="lang-option" data-lang="en" role="menuitem" aria-selected="false">
              <img src="/assets/icons/flags/gb.svg" alt="Flag of the United Kingdom" class="lang-flag-img" width="20" height="14" loading="eager">
              <span class="lang-option-name">English</span>
              <span class="lang-check">✓</span>
            </button>
            <button class="lang-option" data-lang="es" role="menuitem" aria-selected="false">
              <img src="/assets/icons/flags/es.svg" alt="Bandera de España" class="lang-flag-img" width="20" height="14" loading="eager">
              <span class="lang-option-name">Español</span>
              <span class="lang-check">✓</span>
            </button>
          </div>
        </div>`;

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files.`);

let updatedCount = 0;

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match existing lang-selector-dropdown div
  const regex = /<!-- LANGUAGE SELECTOR -->[\s\S]*?<div class="lang-selector-dropdown"[\s\S]*?<\/div>\s*<\/div>/;
  
  if (regex.test(content)) {
    content = content.replace(regex, targetSelectorHTML);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  } else {
    // Alternative match if comment is slightly different
    const regex2 = /<div class="lang-selector-dropdown" id="lang-selector">[\s\S]*?<\/div>\s*<\/div>/;
    if (regex2.test(content)) {
      content = content.replace(regex2, targetSelectorHTML.replace('        <!-- LANGUAGE SELECTOR -->\n', ''));
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
    } else {
      console.warn(`Could not match selector in: ${filePath}`);
    }
  }
}

console.log(`Successfully updated ${updatedCount} / ${htmlFiles.length} HTML files.`);
