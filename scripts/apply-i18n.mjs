import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const langSelectorHtml = `        <!-- LANGUAGE SELECTOR -->
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

function getHreflangTags(canonicalUrl) {
  const urlObj = new URL(canonicalUrl);
  const pathname = urlObj.pathname;
  const baseUrl = `https://conexus.press${pathname}`;
  const enUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}lang=en`;
  const esUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}lang=es`;

  return `  <!-- Multilingual SEO hreflang -->
  <link rel="alternate" hreflang="pt-BR" href="${baseUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="es" href="${esUrl}">
  <link rel="alternate" hreflang="x-default" href="${baseUrl}">`;
}

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add hreflang tags if not present
  if (!content.includes('hreflang="pt-BR"')) {
    const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)">/);
    if (canonicalMatch) {
      const canonicalTag = canonicalMatch[0];
      const canonicalUrl = canonicalMatch[1];
      const hreflangBlock = getHreflangTags(canonicalUrl);
      content = content.replace(canonicalTag, `${canonicalTag}\n${hreflangBlock}`);
    }
  }

  // 2. Add language selector to header if not present
  if (!content.includes('id="lang-selector"') && content.includes('id="theme-toggle"')) {
    content = content.replace('<button id="theme-toggle"', `${langSelectorHtml}\n        <button id="theme-toggle"`);
  }

  // 3. Add data-i18n to common navigation links
  content = content.replace(/<a href="\/" class="nav-link([^"]*)">Início<\/a>/g, '<a href="/" class="nav-link$1" data-i18n="nav.home">Início</a>');
  content = content.replace(/<a href="\/servicos\/" class="nav-link([^"]*)">Serviços<\/a>/g, '<a href="/servicos/" class="nav-link$1" data-i18n="nav.services">Serviços</a>');
  content = content.replace(/<a href="\/sobre\/" class="nav-link([^"]*)">Sobre<\/a>/g, '<a href="/sobre/" class="nav-link$1" data-i18n="nav.about">Sobre</a>');
  content = content.replace(/<a href="\/portfolio\/" class="nav-link([^"]*)">Portfólio<\/a>/g, '<a href="/portfolio/" class="nav-link$1" data-i18n="nav.portfolio">Portfólio</a>');
  content = content.replace(/<a href="\/blog\/" class="nav-link([^"]*)">Blog<\/a>/g, '<a href="/blog/" class="nav-link$1" data-i18n="nav.blog">Blog</a>');
  content = content.replace(/<a href="\/faq\/" class="nav-link([^"]*)">FAQ<\/a>/g, '<a href="/faq/" class="nav-link$1" data-i18n="nav.faq">FAQ</a>');
  content = content.replace(/<a href="\/contato\/" class="nav-link([^"]*)">Contato<\/a>/g, '<a href="/contato/" class="nav-link$1" data-i18n="nav.contact">Contato</a>');

  // Common footer elements
  content = content.replace(/<h4>Navegação<\/h4>/g, '<h4 data-i18n="footer.colNavTitle">Navegação</h4>');
  content = content.replace(/<h4>Serviços<\/h4>/g, '<h4 data-i18n="footer.colServicesTitle">Serviços</h4>');
  content = content.replace(/<h4>Contato & Redes<\/h4>/g, '<h4 data-i18n="footer.colContactTitle">Contato & Redes</h4>');

  fs.writeFileSync(filePath, content, 'utf8');
}

function scanAndApply(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanAndApply(fullPath);
    } else if (entry.name.endsWith('.html')) {
      processHtmlFile(fullPath);
    }
  }
}

scanAndApply(rootDir);
console.log('Processed all HTML files successfully with i18n & hreflang!');
