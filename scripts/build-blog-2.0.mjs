import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cluster1Articles } from './data-cluster-1.mjs';
import { cluster2Articles } from './data-cluster-2.mjs';
import { cluster3Articles } from './data-cluster-3.mjs';
import { cluster4Articles } from './data-cluster-4.mjs';
import { cluster5Articles } from './data-cluster-5.mjs';
import { cluster6Articles } from './data-cluster-6.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const all60Articles = [
  ...cluster1Articles,
  ...cluster2Articles,
  ...cluster3Articles,
  ...cluster4Articles,
  ...cluster5Articles,
  ...cluster6Articles
];

console.log(`Total new articles to generate: ${all60Articles.length}`);

function sanitizeGroupKey(slug) {
  return 'blog_' + slug.replace(/-/g, '_');
}

// 1. GENERATE HTML FILES FOR ALL 60 POSTS
for (const article of all60Articles) {
  const postDir = path.join(rootDir, 'blog', article.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  const groupKey = sanitizeGroupKey(article.slug);
  const ptData = article.pt;

  // Build Sections HTML
  let sectionsHtml = '';
  let kCounter = 5;

  for (const sec of ptData.sections) {
    sectionsHtml += `\n          <h2 style="font-size: 1.6rem; margin: 2.5rem 0 1rem; color: var(--color-text-main);" data-i18n="autoContent.${groupKey}.k${kCounter++}">${sec.h2}</h2>\n`;

    for (const p of sec.paragraphs) {
      sectionsHtml += `          <p style="margin-bottom: 1.5rem;" data-i18n="autoContent.${groupKey}.k${kCounter++}">${p}</p>\n`;
    }

    if (sec.listTitle && sec.listItems && sec.listItems.length > 0) {
      sectionsHtml += `          <p style="font-weight: 600; margin-bottom: 0.75rem; color: var(--color-text-white);" data-i18n="autoContent.${groupKey}.k${kCounter++}">${sec.listTitle}</p>\n`;
      sectionsHtml += `          <ul style="margin-bottom: 1.75rem; padding-left: 1.5rem; color: var(--color-text-muted);">\n`;
      for (const li of sec.listItems) {
        sectionsHtml += `            <li style="margin-bottom: 0.6rem;" data-i18n-html="autoContent.${groupKey}.k${kCounter++}">${li}</li>\n`;
      }
      sectionsHtml += `          </ul>\n`;
    }

    if (sec.table) {
      sectionsHtml += `          <div style="overflow-x: auto; margin: 2rem 0; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md);">\n`;
      sectionsHtml += `            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">\n`;
      sectionsHtml += `              <thead><tr style="background: var(--color-surface-navy); border-bottom: 1px solid var(--color-border-subtle);">\n`;
      for (const th of sec.table.headers) {
        sectionsHtml += `                <th style="padding: 1rem; color: var(--color-cyan); font-weight: 600;" data-i18n="autoContent.${groupKey}.k${kCounter++}">${th}</th>\n`;
      }
      sectionsHtml += `              </tr></thead>\n              <tbody>\n`;
      for (const row of sec.table.rows) {
        sectionsHtml += `                <tr style="border-bottom: 1px solid var(--color-border-subtle);">\n`;
        for (const cell of row) {
          sectionsHtml += `                  <td style="padding: 0.9rem 1rem; color: var(--color-text-muted);" data-i18n="autoContent.${groupKey}.k${kCounter++}">${cell}</td>\n`;
        }
        sectionsHtml += `                </tr>\n`;
      }
      sectionsHtml += `              </tbody>\n            </table>\n          </div>\n`;
    }
  }

  // Build FAQ HTML if present
  let faqHtml = '';
  if (ptData.faq && ptData.faq.length > 0) {
    faqHtml += `\n          <h2 style="font-size: 1.6rem; margin: 2.5rem 0 1rem; color: var(--color-text-main);" data-i18n="autoContent.${groupKey}.k${kCounter++}">Perguntas Frequentes</h2>\n`;
    faqHtml += `          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">\n`;
    for (const item of ptData.faq) {
      faqHtml += `            <div style="background: var(--color-surface-navy); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">\n`;
      faqHtml += `              <h3 style="font-size: 1.15rem; color: var(--color-text-white); margin-bottom: 0.5rem;" data-i18n="autoContent.${groupKey}.k${kCounter++}">${item.q}</h3>\n`;
      faqHtml += `              <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6;" data-i18n="autoContent.${groupKey}.k${kCounter++}">${item.a}</p>\n`;
      faqHtml += `            </div>\n`;
    }
    faqHtml += `          </div>\n`;
  }

  // Final CTA box
  const ctaTitle = ptData.cta ? ptData.cta.title : 'Pronto para fortalecer sua presença digital?';
  const ctaDesc = ptData.cta ? ptData.cta.desc : 'Fale com os especialistas da CONEXUS e receba uma consultoria personalizada.';
  const ctaBtnText = ptData.cta ? ptData.cta.btnText : 'Falar com a CONEXUS';

  const ctaHtml = `
          <!-- FINAL CTA BOX -->
          <div style="background: linear-gradient(135deg, rgba(7, 24, 45, 0.95), rgba(0, 58, 112, 0.6)); border: 1px solid #21B8F6; border-radius: var(--radius-lg); padding: 2.5rem 2rem; text-align: center; margin-top: 3rem;">
            <h3 style="font-size: 1.6rem; color: var(--color-text-white); margin-bottom: 1rem;" data-i18n="autoContent.${groupKey}.k${kCounter++}">${ctaTitle}</h3>
            <p style="color: var(--color-text-muted); max-width: 620px; margin: 0 auto 1.75rem; font-size: 1.05rem;" data-i18n="autoContent.${groupKey}.k${kCounter++}">${ctaDesc}</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="article_${article.slug}">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFFFFF" viewBox="0 0 448 512" style="margin-right: 6px;">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span data-i18n="autoContent.${groupKey}.k${kCounter++}">${ctaBtnText}</span>
              </a>
              <a href="/contato/" class="btn btn-secondary" data-i18n="autoContent.${groupKey}.k${kCounter++}">Acessar Página de Contato</a>
            </div>
          </div>`;

  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ptData.seoTitle}</title>
  <meta name="description" content="${ptData.metaDesc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.conexus.press/blog/${article.slug}/">
  <!-- Multilingual SEO hreflang -->
  <link rel="alternate" hreflang="pt-BR" href="https://www.conexus.press/blog/${article.slug}/">
  <link rel="alternate" hreflang="en" href="https://www.conexus.press/blog/${article.slug}/?lang=en">
  <link rel="alternate" hreflang="es" href="https://www.conexus.press/blog/${article.slug}/?lang=es">
  <link rel="alternate" hreflang="x-default" href="https://www.conexus.press/blog/${article.slug}/">
  <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico">
  <link rel="stylesheet" href="/src/styles/components.css">

  <!-- ANTI-FOUC THEME DETECTION SCRIPT -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('conexus_theme');
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>

  <!-- OPEN GRAPH / SOCIAL -->
  <meta property="og:title" content="${ptData.seoTitle}">
  <meta property="og:description" content="${ptData.metaDesc}">
  <meta property="og:image" content="https://conexus.press${article.image}">
  <meta property="og:url" content="https://conexus.press/blog/${article.slug}/">
  <meta property="og:type" content="article">

  <!-- DADOS ESTRUTURADOS (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${ptData.title.replace(/"/g, '\\"')}",
    "image": "https://conexus.press${article.image}",
    "datePublished": "${article.datePublished}",
    "dateModified": "${article.dateModified}",
    "author": {
      "@type": "Organization",
      "name": "CONEXUS",
      "url": "https://conexus.press/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CONEXUS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://conexus.press/assets/logos/conexus-logo-transparent.png"
      }
    },
    "description": "${ptData.metaDesc.replace(/"/g, '\\"')}"
  }
  </script>
</head>
<body>
  <!-- HEADER -->
  <header class="header">
    <div class="container header-container">
      <a href="/" class="brand-logo" aria-label="CONEXUS - Página Inicial">
        <img src="/assets/logos/conexus-logo-transparent.png" alt="CONEXUS Logo" width="180" height="44" loading="eager">
      </a>

      <nav class="nav-desktop" aria-label="Navegação Principal">
        <a href="/" class="nav-link" data-i18n="nav.home">Início</a>
        <a href="/servicos/" class="nav-link" data-i18n="nav.services">Serviços</a>
        <a href="/sobre/" class="nav-link" data-i18n="nav.about">Sobre</a>
        <a href="/portfolio/" class="nav-link" data-i18n="nav.portfolio">Portfólio</a>
        <a href="/blog/" class="nav-link active" data-i18n="nav.blog">Blog</a>
        <a href="/faq/" class="nav-link" data-i18n="nav.faq">FAQ</a>
        <a href="/contato/" class="nav-link" data-i18n="nav.contact">Contato</a>

        <div class="header-social-links">
          <a href="https://www.linkedin.com/in/jesse-ribeiro-a49666409/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link" data-track="social_click" data-cta-position="header_linkedin">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/></svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-link" data-track="social_click" data-cta-position="header_instagram">
            <svg width="25" height="25" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="igHeaderGrad_${article.slug.replace(/[^a-zA-Z0-9]/g, '_')}" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f09433"/>
                  <stop offset="25%" stop-color="#e6683c"/>
                  <stop offset="50%" stop-color="#dc2743"/>
                  <stop offset="75%" stop-color="#cc2366"/>
                  <stop offset="100%" stop-color="#bc1888"/>
                </linearGradient>
              </defs>
              <path fill="url(#igHeaderGrad_${article.slug.replace(/[^a-zA-Z0-9]/g, '_')})" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </nav>

      <div class="header-actions">
        <a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFFFFF" viewBox="0 0 448 512" style="margin-right: 4px;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          <span data-i18n="common.talkToConexus">Falar com a CONEXUS</span>
        </a>
        <!-- LANGUAGE SELECTOR -->
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
        </div>
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Alternar Tema Claro/Escuro" title="Alternar Tema">
          <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
        <button id="mobile-toggle" class="mobile-toggle" aria-label="Abrir Menu de Navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE MENU DRAWER -->
  <div id="mobile-menu" class="mobile-menu" aria-label="Menu Mobile">
    <a href="/" class="nav-link" data-i18n="nav.home">Início</a>
    <a href="/servicos/" class="nav-link" data-i18n="nav.services">Serviços</a>
    <a href="/sobre/" class="nav-link" data-i18n="nav.about">Sobre</a>
    <a href="/portfolio/" class="nav-link" data-i18n="nav.portfolio">Portfólio</a>
    <a href="/blog/" class="nav-link active" data-i18n="nav.blog">Blog</a>
    <a href="/faq/" class="nav-link" data-i18n="nav.faq">FAQ</a>
    <a href="/contato/" class="nav-link" data-i18n="nav.contact">Contato</a>
    <div style="display: flex; gap: 1rem; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--color-border-subtle);">
      <a href="https://www.linkedin.com/in/jesse-ribeiro-a49666409/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link" data-track="social_click" data-cta-position="mobile_linkedin">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/></svg>
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-link" data-track="social_click" data-cta-position="mobile_instagram">
        <svg width="22" height="22" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="igMobileGrad_${article.slug.replace(/[^a-zA-Z0-9]/g, '_')}" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f09433"/>
              <stop offset="25%" stop-color="#e6683c"/>
              <stop offset="50%" stop-color="#dc2743"/>
              <stop offset="75%" stop-color="#cc2366"/>
              <stop offset="100%" stop-color="#bc1888"/>
            </linearGradient>
          </defs>
          <path fill="url(#igMobileGrad_${article.slug.replace(/[^a-zA-Z0-9]/g, '_')})" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
    <div style="margin-top: 1rem;">
      <a href="#" class="btn btn-primary" style="width: 100%;" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="mobile_menu" data-i18n="common.talkToConexus">Falar com a CONEXUS</a>
    </div>
  </div>

  <main>
    <!-- BREADCRUMB -->
    <section class="section" style="padding-top: 2rem; padding-bottom: 1rem;">
      <div class="container">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--color-text-muted); flex-wrap: wrap;">
          <a href="/blog/" style="color: var(--color-cyan); font-weight: 500; display: inline-flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span data-i18n="blog.backToBlog">Voltar para o Blog</span>
          </a>
          <span>/</span>
          <span data-i18n="autoContent.${groupKey}.k1">${ptData.category}</span>
        </div>
      </div>
    </section>

    <!-- ARTICLE HEADER -->
    <section class="section" style="padding-top: 1rem; padding-bottom: 3rem;">
      <div class="container" style="max-width: 860px;">
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem;">
          <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.8rem; padding: 0.3rem 0.75rem; border-radius: var(--radius-sm);" data-i18n="autoContent.${groupKey}.k2">${ptData.category}</span>
          <span style="font-size: 0.9rem; color: var(--color-text-muted);">${article.displayDate.pt}</span>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">• ${article.readTime}</span>
        </div>
        <h1 class="hero-title" style="font-size: clamp(2rem, 4.5vw, 3rem); line-height: 1.2; margin-bottom: 1.25rem;" data-i18n="autoContent.${groupKey}.k3">${ptData.h1}</h1>
        <p style="font-size: 1.15rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 2rem;" data-i18n="autoContent.${groupKey}.k4">${ptData.subtitle}</p>
        <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--color-border-subtle); margin-bottom: 3rem;">
          <img src="${article.image}" alt="${ptData.alt}" width="860" height="440" loading="eager" style="width: 100%; max-height: 440px; display: block; object-fit: cover;">
        </div>

        <!-- ARTICLE CONTENT -->
        <article style="line-height: 1.8; color: var(--color-text-main); font-size: 1.05rem;">
          ${sectionsHtml}
          ${faqHtml}
          ${ctaHtml}
        </article>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-col">
        <a href="/" class="brand-logo" aria-label="CONEXUS - Página Inicial">
          <img src="/assets/logos/conexus-logo-transparent.png" alt="CONEXUS Logo" width="180" height="44" loading="lazy">
        </a>
        <p class="footer-text" data-i18n="footer.articleTagline">
          Agência de marketing digital especializada em websites profissionais, SEO, Google Meu Negócio, branding e gestão de redes sociais.
        </p>
        <div class="footer-social-links">
          <a href="https://www.linkedin.com/in/jesse-ribeiro-a49666409/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link" data-track="social_click" data-cta-position="footer_linkedin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/></svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-link" data-track="social_click" data-cta-position="footer_instagram">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="igFooterGrad_${article.slug.replace(/[^a-zA-Z0-9]/g, '_')}" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f09433"/>
                  <stop offset="25%" stop-color="#e6683c"/>
                  <stop offset="50%" stop-color="#dc2743"/>
                  <stop offset="75%" stop-color="#cc2366"/>
                  <stop offset="100%" stop-color="#bc1888"/>
                </linearGradient>
              </defs>
              <path fill="url(#igFooterGrad_${article.slug.replace(/[^a-zA-Z0-9]/g, '_')})" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading" data-i18n="footer.colServicesTitle">Serviços</h4>
        <ul class="footer-links">
          <li><a href="/servicos/criacao-de-sites/" data-i18n="footer.serviceWebsites">Criação de Sites</a></li>
          <li><a href="/servicos/site-one-page/" data-i18n="footer.serviceOnePage">Site One Page</a></li>
          <li><a href="/servicos/conexus-guest-hub/" data-i18n="footer.serviceGuestHub">Conexus Guest Hub</a></li>
          <li><a href="/servicos/seo/" data-i18n="footer.serviceSEOShort">SEO</a></li>
          <li><a href="/servicos/seo-local-google-meu-negocio/" data-i18n="footer.serviceSEOLocal">SEO Local & Google</a></li>
          <li><a href="/servicos/branding-identidade-visual/" data-i18n="footer.serviceBranding">Branding & Identidade</a></li>
          <li><a href="/servicos/gestao-redes-sociais/" data-i18n="footer.serviceSocialMediaShort">Redes Sociais</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading" data-i18n="footer.colInstTitle">Institucional</h4>
        <ul class="footer-links">
          <li><a href="/sobre/" data-i18n="footer.aboutConexus">Sobre a CONEXUS</a></li>
          <li><a href="/portfolio/" data-i18n="nav.portfolio">Portfólio</a></li>
          <li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>
          <li><a href="/faq/" data-i18n="footer.faq">Perguntas Frequentes</a></li>
          <li><a href="/contato/" data-i18n="footer.contactUs">Fale Conosco</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading" data-i18n="footer.colContactOnlyTitle">Contato</h4>
        <p class="footer-text" data-i18n-html="footer.locationAndCoverage">São José dos Pinhais - PR<br>Atendimento Nacional e Internacional</p>
        <p class="footer-text" style="margin-top: 0.5rem;"><a href="mailto:comercial@conexus.press" style="color: var(--color-text-muted);">comercial@conexus.press</a></p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-container">
        <p class="copyright"><span data-i18n="footer.rights">&copy; 2026 CONEXUS. Todos os direitos reservados.</span></p>
        <div class="footer-legal">
          <span>CNPJ: 50.429.176/0001-90</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- FLOATING WHATSAPP BUTTON -->
  <a href="#" class="whatsapp-float" aria-label="Conversar pelo WhatsApp" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="floating_button">
    <span class="whatsapp-tooltip" data-i18n="common.chatWhatsapp">Conversar pelo WhatsApp</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#FFFFFF" viewBox="0 0 448 512">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  </a>

  <!-- SCRIPT BUNDLE -->
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(postDir, 'index.html'), htmlContent, 'utf-8');
}

console.log('All 60 HTML post templates created successfully.');

// 2. GENERATE KEYS FOR I18N (PT, EN, ES)
const i18nDicts = {
  pt: {},
  en: {},
  es: {}
};

for (const article of all60Articles) {
  const groupKey = sanitizeGroupKey(article.slug);

  for (const lang of ['pt', 'en', 'es']) {
    const data = article[lang];
    const dict = {};
    let k = 1;

    dict[`k${k++}`] = data.category;
    dict[`k${k++}`] = data.category;
    dict[`k${k++}`] = data.h1;
    dict[`k${k++}`] = data.subtitle;

    for (const sec of data.sections) {
      dict[`k${k++}`] = sec.h2;
      for (const p of sec.paragraphs) {
        dict[`k${k++}`] = p;
      }
      if (sec.listTitle && sec.listItems && sec.listItems.length > 0) {
        dict[`k${k++}`] = sec.listTitle;
        for (const li of sec.listItems) {
          dict[`k${k++}`] = li;
        }
      }
      if (sec.table) {
        for (const th of sec.table.headers) {
          dict[`k${k++}`] = th;
        }
        for (const row of sec.table.rows) {
          for (const cell of row) {
            dict[`k${k++}`] = cell;
          }
        }
      }
    }

    if (data.faq && data.faq.length > 0) {
      dict[`k${k++}`] = lang === 'pt' ? 'Perguntas Frequentes' : (lang === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes');
      for (const item of data.faq) {
        dict[`k${k++}`] = item.q;
        dict[`k${k++}`] = item.a;
      }
    }

    const ctaTitle = data.cta ? data.cta.title : (lang === 'pt' ? 'Pronto para fortalecer sua presença digital?' : (lang === 'en' ? 'Ready to elevate your digital presence?' : '¿Desea fortalecer su presencia digital?'));
    const ctaDesc = data.cta ? data.cta.desc : (lang === 'pt' ? 'Fale com os especialistas da CONEXUS e receba uma consultoria personalizada.' : (lang === 'en' ? 'Consult with CONEXUS specialists for a tailored digital proposal.' : 'Hable con los especialistas de CONEXUS para una propuesta a medida.'));
    const ctaBtnText = data.cta ? data.cta.btnText : (lang === 'pt' ? 'Falar com a CONEXUS' : (lang === 'en' ? 'Talk to CONEXUS' : 'Hablar con CONEXUS'));

    dict[`k${k++}`] = ctaTitle;
    dict[`k${k++}`] = ctaDesc;
    dict[`k${k++}`] = ctaBtnText;
    dict[`k${k++}`] = lang === 'pt' ? 'Acessar Página de Contato' : (lang === 'en' ? 'Visit Contact Page' : 'Ir a Página de Contacto');

    i18nDicts[lang][groupKey] = dict;
  }
}

// 3. MERGE INTO src/i18n/pt.js, en.js, es.js
function updateI18nFile(filePath, langCode, newEntries) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse existing JS export
  // Find "autoContent": {
  const autoContentIndex = content.indexOf('"autoContent": {');
  if (autoContentIndex === -1) {
    console.error(`autoContent not found in ${filePath}`);
    return;
  }

  // Insert our new keys right inside autoContent
  let jsonString = '';
  for (const [groupKey, keysObj] of Object.entries(newEntries)) {
    jsonString += `    ${JSON.stringify(groupKey)}: ${JSON.stringify(keysObj, null, 6).replace(/\n/g, '\n    ')},\n`;
  }

  // Insert after '"autoContent": {\n'
  const insertPos = content.indexOf('\n', autoContentIndex) + 1;
  const updatedContent = content.slice(0, insertPos) + jsonString + content.slice(insertPos);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log(`Updated ${filePath} with ${Object.keys(newEntries).length} new article dictionaries.`);
}

updateI18nFile(path.join(rootDir, 'src', 'i18n', 'pt.js'), 'pt', i18nDicts.pt);
updateI18nFile(path.join(rootDir, 'src', 'i18n', 'en.js'), 'en', i18nDicts.en);
updateI18nFile(path.join(rootDir, 'src', 'i18n', 'es.js'), 'es', i18nDicts.es);

// 4. UPDATE VITE.CONFIG.JS
const viteConfigPath = path.join(rootDir, 'vite.config.js');
let viteContent = fs.readFileSync(viteConfigPath, 'utf-8');

let viteEntries = '';
for (const article of all60Articles) {
  const camelKey = 'blog' + article.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  viteEntries += `        ${camelKey}: resolve(__dirname, 'blog/${article.slug}/index.html'),\n`;
}

// Insert before 'faq: resolve(__dirname, \'faq/index.html\')'
const faqPos = viteContent.indexOf('faq: resolve');
if (faqPos !== -1) {
  viteContent = viteContent.slice(0, faqPos) + viteEntries + viteContent.slice(faqPos);
  fs.writeFileSync(viteConfigPath, viteContent, 'utf-8');
  console.log('vite.config.js updated with 60 new inputs.');
}

// 5. UPDATE SITEMAP.XML
const sitemapPath = path.join(rootDir, 'sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

let sitemapEntries = '';
for (const article of all60Articles) {
  sitemapEntries += `  <url>\n    <loc>https://www.conexus.press/blog/${article.slug}/</loc>\n    <lastmod>${article.dateModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
}

const sitemapClosing = sitemapContent.lastIndexOf('</urlset>');
if (sitemapClosing !== -1) {
  sitemapContent = sitemapContent.slice(0, sitemapClosing) + sitemapEntries + sitemapContent.slice(sitemapClosing);
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log('sitemap.xml updated with 60 new URLs.');
}

console.log('BUILD BLOG 2.0 SCRIPT FINISHED SUCCESSFULLY.');
