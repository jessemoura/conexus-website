import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Helper to replace text in files
function patchFile(relPath, transforms) {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', relPath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const { search, replace } of transforms) {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${relPath}`);
  }
}

// 1. Patch header "Falar com a CONEXUS" buttons across all pages
function patchAllHeadersAndFooters() {
  function getAllHtml(dir, list = []) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) {
        if (f !== 'node_modules' && f !== '.git' && f !== 'dist') getAllHtml(p, list);
      } else if (f.endsWith('.html')) {
        list.push(p);
      }
    }
    return list;
  }

  const allFiles = getAllHtml(rootDir);
  for (const file of allFiles) {
    let html = fs.readFileSync(file, 'utf8');
    let mod = false;

    // Header CTA desktop
    if (html.includes('<a href="#contato" class="btn btn-primary" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>')) {
      html = html.replace(
        '<a href="#contato" class="btn btn-primary" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>',
        '<a href="#contato" class="btn btn-primary" data-whatsapp-key="homeHero" data-i18n="nav.talkToConexus">Falar com a CONEXUS</a>'
      );
      mod = true;
    }
    if (html.includes('<a href="/contato/" class="btn btn-outline">Falar com a CONEXUS</a>')) {
      html = html.replace(
        '<a href="/contato/" class="btn btn-outline">Falar com a CONEXUS</a>',
        '<a href="/contato/" class="btn btn-outline" data-i18n="nav.talkToConexus">Falar com a CONEXUS</a>'
      );
      mod = true;
    }
    if (html.includes('<a href="/contato/" class="btn btn-primary" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>')) {
      html = html.replace(
        '<a href="/contato/" class="btn btn-primary" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>',
        '<a href="/contato/" class="btn btn-primary" data-whatsapp-key="homeHero" data-i18n="nav.talkToConexus">Falar com a CONEXUS</a>'
      );
      mod = true;
    }

    // Mobile CTA
    if (html.includes('<a href="#contato" class="btn btn-primary w-full" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>')) {
      html = html.replace(
        '<a href="#contato" class="btn btn-primary w-full" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>',
        '<a href="#contato" class="btn btn-primary w-full" data-whatsapp-key="homeHero" data-i18n="nav.talkToConexus">Falar com a CONEXUS</a>'
      );
      mod = true;
    }
    if (html.includes('<a href="/contato/" class="btn btn-primary w-full" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>')) {
      html = html.replace(
        '<a href="/contato/" class="btn btn-primary w-full" data-whatsapp-key="homeHero">Falar com a CONEXUS</a>',
        '<a href="/contato/" class="btn btn-primary w-full" data-whatsapp-key="homeHero" data-i18n="nav.talkToConexus">Falar com a CONEXUS</a>'
      );
      mod = true;
    }

    // WhatsApp floating/footer spans
    if (html.includes('<span>Conversar pelo WhatsApp</span>')) {
      html = html.replaceAll(
        '<span>Conversar pelo WhatsApp</span>',
        '<span data-i18n="common.chatWhatsapp">Conversar pelo WhatsApp</span>'
      );
      mod = true;
    }

    // Subpage back to blog / portfolio
    if (html.includes('<a href="/blog/" class="back-link">') && !html.includes('data-i18n="blog.backToBlog"')) {
      html = html.replaceAll(
        '<a href="/blog/" class="back-link">Voltar para o Blog</a>',
        '<a href="/blog/" class="back-link" data-i18n="blog.backToBlog">Voltar para o Blog</a>'
      );
      html = html.replaceAll(
        '<a href="/blog/" class="btn btn-outline">Voltar para o Blog</a>',
        '<a href="/blog/" class="btn btn-outline" data-i18n="blog.backToBlog">Voltar para o Blog</a>'
      );
      mod = true;
    }
    if (html.includes('<a href="/portfolio/" class="back-link">') && !html.includes('data-i18n="portfolio.backToPortfolio"')) {
      html = html.replaceAll(
        '<a href="/portfolio/" class="back-link">Voltar para o Portfólio</a>',
        '<a href="/portfolio/" class="back-link" data-i18n="portfolio.backToPortfolio">Voltar para o Portfólio</a>'
      );
      html = html.replaceAll(
        '<a href="/portfolio/" class="btn btn-outline">Voltar para o Portfólio</a>',
        '<a href="/portfolio/" class="btn btn-outline" data-i18n="portfolio.backToPortfolio">Voltar para o Portfólio</a>'
      );
      mod = true;
    }

    // Portfolio & Blog CTA buttons
    if (html.includes('Iniciar Projeto Semelhante') && !html.includes('data-i18n="portfolio.startSimilarProject"')) {
      html = html.replaceAll(
        '>Iniciar Projeto Semelhante<',
        ' data-i18n="portfolio.startSimilarProject">Iniciar Projeto Semelhante<'
      );
      mod = true;
    }
    if (html.includes('Ver Case Completo') && !html.includes('data-i18n="portfolio.viewCase"')) {
      html = html.replaceAll(
        '>Ver Case Completo<',
        ' data-i18n="portfolio.viewCase">Ver Case Completo<'
      );
      mod = true;
    }
    if (html.includes('Ler Artigo') && !html.includes('data-i18n="blog.readArticle"')) {
      html = html.replaceAll(
        '>Ler Artigo<',
        ' data-i18n="blog.readArticle">Ler Artigo<'
      );
      mod = true;
    }

    if (mod) {
      fs.writeFileSync(file, html, 'utf8');
      console.log(`Updated common tags in: ${path.relative(rootDir, file)}`);
    }
  }
}

patchAllHeadersAndFooters();
