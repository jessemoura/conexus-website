import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const posts = JSON.parse(fs.readFileSync(path.join(rootDir, 'scratch/posts_with_images_100.json'), 'utf8'));

console.log(`Loaded ${posts.length} posts for generation.`);

// Internal linking rules (Strategic keyword -> target URL with limits per article)
const serviceLinkRules = [
  { match: /\b(criação de sites|desenvolvimento de sites|criação de site|site profissional|sites profissionais)\b/i, url: '/servicos/criacao-de-sites/', text: 'criação de sites profissionais' },
  { match: /\b(site one page|sites one page|página única|pagina unica)\b/i, url: '/servicos/site-one-page/', text: 'site One Page' },
  { match: /\b(seo local|posicionamento local|perfil da empresa no google|google meu negócio|google meu negocio)\b/i, url: '/servicos/seo-local-google-meu-negocio/', text: 'SEO Local e Google Meu Negócio' },
  { match: /\b(otimização para o google|otimizacao para o google|seo técnico|estratégia de seo|ranqueamento orgânico)\b/i, url: '/servicos/seo/', text: 'otimização de SEO' },
  { match: /\b(desenvolvimento de aplicativos|aplicativos corporativos|aplicativo web)\b/i, url: '/servicos/desenvolvimento-de-aplicativos/', text: 'desenvolvimento de aplicativos' },
  { match: /\b(guest hub|conexus guest hub|hotelaria digital|meios de hospedagem)\b/i, url: '/servicos/conexus-guest-hub/', text: 'CONEXUS Guest Hub' },
  { match: /\b(identidade visual|branding|logotipo profissional)\b/i, url: '/servicos/branding-identidade-visual/', text: 'branding e identidade visual' },
  { match: /\b(gestão de redes sociais|redes sociais para empresas|marketing de conteúdo)\b/i, url: '/servicos/gestao-redes-sociais/', text: 'gestão de redes sociais' },
  { match: /\b(diagnóstico gratuito|diagnostico gratuito|avaliar sua presença digital)\b/i, url: '/diagnostico-gratuito/', text: 'diagnóstico gratuito' }
];

const portfolioLinkRules = [
  { match: /\b(confeitaria|doceria|quindim|marcolini)\b/i, url: '/portfolio/soquindins/', text: 'case Sóquindins Confeitaria' },
  { match: /\b(festival de panificação|padaria artesanal|curitipão|curitipao)\b/i, url: '/portfolio/curitipao/', text: 'case CuritiPão 2026' },
  { match: /\b(guincho 24h|auto socorro|fast guincho)\b/i, url: '/portfolio/fast-guincho/', text: 'case Fast Guincho' },
  { match: /\b(comércio exterior|comex|despacho aduaneiro|atthos)\b/i, url: '/portfolio/atthos-comex/', text: 'case Atthos Comex' },
  { match: /\b(gelateria|sorveteria artesanal|di piallato)\b/i, url: '/portfolio/di-piallato/', text: 'case Di Piallato Gelateria' }
];

function applyInternalLinks(paragraph, linkedUrlsThisArticle) {
  let modified = paragraph;
  
  // Try service rules (max 2 service links per paragraph, max 1 per URL per article)
  for (const rule of [...serviceLinkRules, ...portfolioLinkRules]) {
    if (linkedUrlsThisArticle.has(rule.url)) continue;
    
    const m = modified.match(rule.match);
    if (m && m.index !== undefined) {
      const matchText = m[0];
      // Avoid linking inside existing <a> tags or headings
      const before = modified.substring(0, m.index);
      if ((before.match(/<a\b/g) || []).length > (before.match(/<\/a>/g) || []).length) {
        continue;
      }
      
      const linkHtml = `<a href="${rule.url}" class="internal-article-link" title="${rule.text}">${matchText}</a>`;
      modified = modified.substring(0, m.index) + linkHtml + modified.substring(m.index + matchText.length);
      linkedUrlsThisArticle.add(rule.url);
      break;
    }
  }
  
  return modified;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateArticleHtml(post, allPosts) {
  const linkedUrls = new Set();
  
  // Calculate publication date (distributed across recent dates for natural calendar)
  const baseDay = 1 + (post.post_number % 28);
  const baseMonth = post.post_number <= 40 ? '08' : post.post_number <= 80 ? '09' : '10';
  const pubDateIso = `2026-${baseMonth}-${String(baseDay).padStart(2, '0')}`;
  const pubDateFormatted = `${String(baseDay).padStart(2, '0')}/${baseMonth}/2026`;
  
  // Select 3 related posts from same or neighboring cluster
  const relatedPosts = allPosts
    .filter(p => p.post_number !== post.post_number)
    .sort((a, b) => Math.abs(a.post_number - post.post_number) - Math.abs(b.post_number - post.post_number))
    .slice(0, 3);
    
  // FAQ Schema JSON-LD
  let faqSchemaJson = '';
  if (post.faqs && post.faqs.length > 0) {
    const faqEntities = post.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": Array.isArray(f.answer) ? f.answer.join(' ') : f.answer
      }
    }));
    faqSchemaJson = `,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(faqEntities, null, 2)}
    }`;
  }

  // Generate Sections HTML
  let sectionsHtml = '';
  for (const sec of post.sections) {
    let secContent = '';
    
    if (sec.h2 && sec.h2 !== 'Introdução') {
      secContent += `\n        <h2 class="article-h2">${escapeHtml(sec.h2)}</h2>\n`;
    }
    
    for (const para of sec.paragraphs) {
      const linkedPara = applyInternalLinks(para, linkedUrls);
      secContent += `        <p class="article-p">${linkedPara}</p>\n`;
    }
    
    if (sec.list_items && sec.list_items.length > 0) {
      secContent += `        <ul class="article-list">\n`;
      for (const item of sec.list_items) {
        const linkedItem = applyInternalLinks(item, linkedUrls);
        secContent += `          <li>${linkedItem}</li>\n`;
      }
      secContent += `        </ul>\n`;
    }
    
    if (sec.h3_list && sec.h3_list.length > 0) {
      for (const h3Obj of sec.h3_list) {
        secContent += `        <h3 class="article-h3">${escapeHtml(h3Obj.h3)}</h3>\n`;
        for (const h3p of h3Obj.paragraphs) {
          const linkedH3p = applyInternalLinks(h3p, linkedUrls);
          secContent += `        <p class="article-p">${linkedH3p}</p>\n`;
        }
      }
    }
    
    sectionsHtml += secContent;
  }

  // Generate FAQ Section HTML
  let faqsHtml = '';
  if (post.faqs && post.faqs.length > 0) {
    faqsHtml = `
      <!-- FAQ SECTION -->
      <section class="article-faq-section" style="margin-top: 3.5rem;">
        <div class="faq-header" style="margin-bottom: 2rem;">
          <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.8rem; padding: 0.3rem 0.75rem; border-radius: var(--radius-sm);">Dúvidas Frequentes</span>
          <h2 class="article-h2" style="margin-top: 0.75rem;">Perguntas Frequentes sobre ${escapeHtml(post.primary_keyword || 'o Tema')}</h2>
        </div>
        <div class="faq-accordion-container">
`;
    post.faqs.forEach((faq, idx) => {
      const ansText = Array.isArray(faq.answer) ? faq.answer.join('<br><br>') : faq.answer;
      faqsHtml += `
          <div class="faq-item-card">
            <h3 class="faq-question-title">${escapeHtml(faq.question)}</h3>
            <p class="faq-answer-text">${ansText}</p>
          </div>
`;
    });
    faqsHtml += `
        </div>
      </section>
`;
  }

  // Generate Related Articles HTML
  let relatedHtml = `
      <!-- RELATED POSTS -->
      <section class="related-posts-section" style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--color-border-subtle);">
        <div style="margin-bottom: 2rem;">
          <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.8rem; padding: 0.3rem 0.75rem; border-radius: var(--radius-sm);">Continue Aprendendo</span>
          <h2 class="article-h2" style="margin-top: 0.75rem;">Artigos Relacionados & Estratégia Digital</h2>
        </div>
        <div class="related-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
`;
  relatedPosts.forEach(rel => {
    relatedHtml += `
          <article class="card blog-post-card" style="display: flex; flex-direction: column; height: 100%; padding: 1.25rem; background: var(--color-surface-navy); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md);">
            <a href="/blog/${rel.slug}/" style="text-decoration: none; color: inherit;">
              <img src="${rel.image_path}" alt="${escapeHtml(rel.image_alt)}" width="380" height="200" loading="lazy" style="border-radius: var(--radius-sm); width: 100%; height: 180px; object-fit: cover; margin-bottom: 1rem;">
              <span class="badge" style="background: rgba(0, 168, 232, 0.1); color: var(--color-cyan); font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">${escapeHtml(rel.category)}</span>
              <h3 style="font-size: 1.05rem; line-height: 1.4; margin: 0.75rem 0 0.5rem; font-weight: 700; color: var(--color-text-white);">${escapeHtml(rel.h1)}</h3>
              <p style="font-size: 0.88rem; line-height: 1.5; color: var(--color-text-muted); margin-bottom: 1rem; flex-grow: 1;">${escapeHtml(rel.meta_description.slice(0, 120))}...</p>
              <span class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 0.5rem 1rem;">Ler Artigo Completo ↗</span>
            </a>
          </article>
`;
  });
  relatedHtml += `
        </div>
      </section>
`;

  // Full HTML Page Template
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.meta_title || post.h1 + ' | CONEXUS')}</title>
  <meta name="description" content="${escapeHtml(post.meta_description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.conexus.press/blog/${post.slug}/">
  <!-- Multilingual SEO hreflang -->
  <link rel="alternate" hreflang="pt-BR" href="https://www.conexus.press/blog/${post.slug}/">
  <link rel="alternate" hreflang="x-default" href="https://www.conexus.press/blog/${post.slug}/">
  <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico">
  <link rel="stylesheet" href="/src/styles/components.css?v=20261003.04">

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

  <!-- DADOS ESTRUTURADOS (JSON-LD) -->
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(post.h1)},
      "image": "https://conexus.press${post.image_path}",
      "datePublished": "${pubDateIso}",
      "dateModified": "${pubDateIso}",
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
      "description": ${JSON.stringify(post.meta_description)}
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://conexus.press/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://conexus.press/blog/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": ${JSON.stringify(post.h1)},
          "item": "https://conexus.press/blog/${post.slug}/"
        }
      ]
    }${faqSchemaJson}
  ]
  </script>

  <style>
    .article-container {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 1.25rem;
      box-sizing: border-box;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    .article-header {
      margin-bottom: 2.5rem;
    }
    .article-h1 {
      font-size: clamp(1.85rem, 3.8vw, 2.75rem);
      line-height: 1.25;
      font-weight: 800;
      color: var(--color-text-white);
      margin: 1.25rem 0 1rem;
    }
    .article-meta-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 1.75rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .article-cover-wrapper {
      width: 100%;
      border-radius: var(--radius-md);
      overflow: hidden;
      margin-bottom: 2.5rem;
      background: var(--color-surface-navy);
      aspect-ratio: 860/440;
    }
    .article-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .article-content {
      font-size: 1.1rem;
      line-height: 1.85;
      color: var(--color-text-main);
    }
    .article-h2 {
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      line-height: 1.35;
      font-weight: 700;
      color: var(--color-text-white);
      margin: 2.75rem 0 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .article-h3 {
      font-size: 1.25rem;
      line-height: 1.4;
      font-weight: 600;
      color: var(--color-text-white);
      margin: 1.75rem 0 0.85rem;
    }
    .article-p {
      margin-bottom: 1.35rem;
    }
    .article-list {
      margin: 1.25rem 0 1.75rem 1.5rem;
      padding-left: 0.5rem;
    }
    .article-list li {
      margin-bottom: 0.75rem;
      line-height: 1.7;
    }
    .internal-article-link {
      color: var(--color-cyan);
      text-decoration: underline;
      text-underline-offset: 3px;
      font-weight: 500;
      transition: color var(--transition-fast);
    }
    .internal-article-link:hover {
      color: #38bdf8;
    }
    .article-cta-box {
      background: linear-gradient(135deg, rgba(0, 168, 232, 0.12), rgba(0, 102, 179, 0.06));
      border: 1px solid rgba(0, 168, 232, 0.3);
      border-radius: var(--radius-md);
      padding: 2.25rem 2rem;
      margin: 3.5rem 0 2.5rem;
      text-align: center;
      box-sizing: border-box;
    }
    .article-cta-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-white);
      margin-bottom: 0.85rem;
    }
    .article-cta-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--color-text-muted);
      max-width: 680px;
      margin: 0 auto 1.5rem;
    }
    .article-cta-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    .faq-item-card {
      background: var(--color-surface-navy);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin-bottom: 1rem;
      box-sizing: border-box;
    }
    .faq-question-title {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--color-text-white);
      margin-bottom: 0.65rem;
    }
    .faq-answer-text {
      font-size: 0.98rem;
      line-height: 1.65;
      color: var(--color-text-muted);
      margin: 0;
    }

    [data-theme="light"] .article-h1,
    [data-theme="light"] .article-h2,
    [data-theme="light"] .article-h3,
    [data-theme="light"] .article-cta-title,
    [data-theme="light"] .faq-question-title {
      color: #0F172A;
    }
    [data-theme="light"] .article-content,
    [data-theme="light"] .article-p,
    [data-theme="light"] .article-list li {
      color: #334155;
    }
    [data-theme="light"] .article-meta-bar,
    [data-theme="light"] .article-cta-desc,
    [data-theme="light"] .faq-answer-text {
      color: #64748B;
    }
    [data-theme="light"] .faq-item-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .article-cta-box {
      background: #F0F9FF;
      border-color: #BAE6FD;
    }

    @media (max-width: 640px) {
      .article-cta-actions {
        flex-direction: column;
      }
      .article-cta-actions .btn {
        width: 100%;
        justify-content: center;
      }
    }
  </style>
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
                <linearGradient id="igHeaderGradPost" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f09433"/>
                  <stop offset="25%" stop-color="#e6683c"/>
                  <stop offset="50%" stop-color="#dc2743"/>
                  <stop offset="75%" stop-color="#cc2366"/>
                  <stop offset="100%" stop-color="#bc1888"/>
                </linearGradient>
              </defs>
              <path fill="url(#igHeaderGradPost)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
  </div>

  <!-- ARTICLE MAIN WRAPPER -->
  <main class="section" style="padding-top: 2rem;">
    <article class="article-container">
      
      <!-- BREADCRUMBS -->
      <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        <a href="/" style="color: inherit; text-decoration: none;">Início</a> &gt; 
        <a href="/blog/" style="color: inherit; text-decoration: none;">Blog</a> &gt; 
        <span style="color: var(--color-cyan);">${escapeHtml(post.category)}</span>
      </nav>

      <!-- HEADER -->
      <header class="article-header">
        <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-sm);">${escapeHtml(post.category)}</span>
        <h1 class="article-h1">${escapeHtml(post.h1)}</h1>
        <div class="article-meta-bar">
          <span>Publicado em: <strong>${pubDateFormatted}</strong></span>
          <span>•</span>
          <span>Por: <strong>CONEXUS Editorial</strong></span>
          <span>•</span>
          <span>Tempo de leitura: <strong>${Math.ceil(post.word_count / 220)} min</strong></span>
        </div>
      </header>

      <!-- COVER IMAGE -->
      <div class="article-cover-wrapper">
        <img src="${post.image_path}" alt="${escapeHtml(post.image_alt)}" class="article-cover-img" width="860" height="440" loading="eager">
      </div>

      <!-- BODY CONTENT -->
      <div class="article-content">
${sectionsHtml}
      </div>

      <!-- STRATEGIC CTA -->
      <div class="article-cta-box">
        <h3 class="article-cta-title">${escapeHtml(post.cta.title || 'Quer Construir uma Presença Digital que Realmente Gera Clientes?')}</h3>
        <p class="article-cta-desc">${escapeHtml(post.cta.text || 'A CONEXUS desenvolve sites de alta performance, estratégias avançadas de SEO local no Google e soluções digitais sob medida para sua empresa crescer com autoridade e consistência.')}</p>
        <div class="article-cta-actions">
          <a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="article_bottom">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFFFFF" viewBox="0 0 448 512" style="margin-right: 6px;">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            <span>Falar com um Especialista</span>
          </a>
          <a href="/diagnostico-gratuito/" class="btn btn-secondary">Solicitar Diagnóstico Gratuito</a>
        </div>
      </div>

${faqsHtml}
${relatedHtml}

    </article>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="brand-logo" aria-label="CONEXUS - Página Inicial">
            <img src="/assets/logos/conexus-logo-transparent.png" alt="CONEXUS Logo" width="180" height="44" loading="lazy">
          </a>
          <p class="footer-desc" data-i18n="footer.description">Soluções digitais de alta performance: criação de sites profissionais, SEO estratégico, automação e inteligência digital para empresas.</p>
        </div>

        <div class="footer-links">
          <h4 class="footer-heading" data-i18n="footer.quickLinks">Navegação</h4>
          <ul class="footer-list">
            <li><a href="/" data-i18n="nav.home">Início</a></li>
            <li><a href="/servicos/" data-i18n="nav.services">Serviços</a></li>
            <li><a href="/sobre/" data-i18n="nav.about">Sobre</a></li>
            <li><a href="/portfolio/" data-i18n="nav.portfolio">Portfólio</a></li>
            <li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>
            <li><a href="/faq/" data-i18n="nav.faq">FAQ</a></li>
            <li><a href="/contato/" data-i18n="nav.contact">Contato</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4 class="footer-heading" data-i18n="footer.services">Serviços</h4>
          <ul class="footer-list">
            <li><a href="/servicos/criacao-de-sites/" data-i18n="services.items.criacaoSites.title">Criação de Sites</a></li>
            <li><a href="/servicos/site-one-page/" data-i18n="services.items.siteOnePage.title">Site One Page</a></li>
            <li><a href="/servicos/seo/" data-i18n="services.items.seo.title">SEO & Google</a></li>
            <li><a href="/servicos/seo-local-google-meu-negocio/" data-i18n="services.items.seoLocal.title">SEO Local</a></li>
            <li><a href="/servicos/desenvolvimento-de-aplicativos/" data-i18n="services.items.apps.title">Desenvolvimento de Apps</a></li>
            <li><a href="/servicos/conexus-guest-hub/" data-i18n="services.items.guestHub.title">CONEXUS Guest Hub</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4 class="footer-heading" data-i18n="footer.contact">Contato</h4>
          <ul class="footer-list">
            <li><span data-i18n="footer.contactDesc">Atendimento estratégico e suporte:</span></li>
            <li><a href="mailto:comercial@conexus.press">comercial@conexus.press</a></li>
            <li><span data-i18n="footer.location">Curitiba & São José dos Pinhais - PR</span></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          <span data-i18n="footer.rights">© 2026 CONEXUS. Todos os direitos reservados.</span>
        </div>
        <div class="footer-signature">
          <span data-i18n="footer.devBy">Desenvolvido por</span> <a href="/" class="signature-link">CONEXUS</a>
        </div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="#" style="color: var(--color-text-muted);" data-i18n="footer.privacy">Política de Privacidade</a>
          <a href="#" style="color: var(--color-text-muted);" data-i18n="footer.terms">Termos de Uso</a>
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

  <script type="module" src="/src/js/main.js?v=20261003.04"></script>
</body>
</html>
`;
}

// Generate all 100 HTML files
let count = 0;
for (const post of posts) {
  const postDir = path.join(rootDir, 'blog', post.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  
  const html = generateArticleHtml(post, posts);
  const outPath = path.join(postDir, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');
  count++;
}

console.log(`\n🎉 Successfully generated ${count} article HTML files under blog/*/index.html!`);
