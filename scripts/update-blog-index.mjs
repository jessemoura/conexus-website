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

// 8 existing articles
const existingArticles = [
  {
    slug: 'como-colocar-empresa-no-google-sao-jose-dos-pinhais',
    category: 'SEO Local & Google',
    clusterCat: 'seo',
    date: '08/09/2026',
    title: 'Como colocar sua empresa no Google e atrair mais clientes em São José dos Pinhais',
    desc: 'Saiba como melhorar a presença da sua empresa no Google, Google Maps e buscas locais em São José dos Pinhais com estratégias de SEO local.',
    image: '/assets/images/conexus-seo-local-google-sao-jose-dos-pinhais.png',
    readTime: '7 min',
    kBadge: 'autoContent.blog.k4',
    kTitle: 'autoContent.blog.k5',
    kDesc: 'autoContent.blog.k6'
  },
  {
    slug: 'conexus-guest-hub-guia-digital-para-hospedagens',
    category: 'Guest Hub',
    clusterCat: 'tech',
    date: '07/09/2026',
    title: 'CONEXUS Guest Hub: uma nova experiência digital para hóspedes',
    desc: 'Descubra como o CONEXUS Guest Hub centraliza informações da hospedagem, reduz dúvidas repetitivas e melhora a experiência de hóspedes de pousadas, cabanas, hotéis e Airbnb.',
    image: '/assets/images/conexus-guest-hub-guia-digital-hospedagens.png',
    readTime: '6 min',
    kBadge: 'autoContent.blog.k7',
    kTitle: 'autoContent.blog.k8',
    kDesc: 'autoContent.blog.k9'
  },
  {
    slug: 'quanto-custa-site-profissional-2026',
    category: 'Websites',
    clusterCat: 'websites',
    date: '20/08/2026',
    title: 'Quanto custa um site profissional em 2026?',
    desc: 'Descubra quanto custa criar um site profissional em 2026, quais fatores influenciam o preço e como escolher entre site One Page e Multipáginas para sua empresa.',
    image: '/assets/images/conexus-quanto-custa-site-profissional-2026.png',
    readTime: '8 min',
    kBadge: 'autoContent.blog.k10',
    kTitle: 'autoContent.blog.k11',
    kDesc: 'autoContent.blog.k12'
  },
  {
    slug: 'por-que-sua-empresa-precisa-de-um-site',
    category: 'Websites',
    clusterCat: 'websites',
    date: '05/08/2026',
    title: 'Por que sua empresa precisa de um site e não deve depender apenas das redes sociais',
    desc: 'Entenda por que depender apenas de redes sociais é um risco para sua empresa e como um site próprio fortalece sua credibilidade, SEO no Google e vendas.',
    image: '/assets/images/conexus-por-que-empresa-precisa-de-um-site.png',
    readTime: '6 min',
    kBadge: 'autoContent.blog.k13',
    kTitle: 'autoContent.blog.k14',
    kDesc: 'autoContent.blog.k15'
  },
  {
    slug: 'como-usar-site-para-atrair-clientes-google',
    category: 'SEO & Websites',
    clusterCat: 'seo',
    date: '25/07/2026',
    title: 'Como transformar seu site em uma ferramenta para atrair clientes no Google',
    desc: 'Descubra como estruturar seu site para atrair clientes no Google com SEO técnico, páginas de serviços exclusivas, velocidade e conversão no WhatsApp.',
    image: '/assets/images/conexus-site-atrair-clientes-google-2026.png',
    readTime: '7 min',
    kBadge: 'autoContent.blog.k16',
    kTitle: 'autoContent.blog.k17',
    kDesc: 'autoContent.blog.k18'
  },
  {
    slug: 'marketing-digital-para-empresas',
    category: 'Marketing Digital',
    clusterCat: 'marketing',
    date: '15/07/2026',
    title: 'Marketing Digital para Empresas: Como Construir uma Presença Digital que Gera Oportunidades',
    desc: 'Um guia completo unindo websites profissionais, SEO, branding e redes sociais para impulsionar a autoridade da sua marca no mercado.',
    image: '/assets/images/marketing-digital.jpg',
    readTime: '8 min',
    kBadge: 'autoContent.blog.k19',
    kTitle: 'autoContent.blog.k20',
    kDesc: 'autoContent.blog.k21'
  },
  {
    slug: 'redes-sociais-para-empresas',
    category: 'Redes Sociais',
    clusterCat: 'marketing',
    date: '01/07/2026',
    title: 'Redes Sociais para Empresas: Como Fortalecer sua Marca e Atrair Clientes',
    desc: 'Estratégias práticas de posicionamento e criação de conteúdo para empresas que querem transformar engajamento em oportunidades reais de negócios.',
    image: '/assets/images/redes-sociais.jpg',
    readTime: '6 min',
    kBadge: 'autoContent.blog.k22',
    kTitle: 'autoContent.blog.k23',
    kDesc: 'autoContent.blog.k24'
  },
  {
    slug: 'importancia-hospedagem-de-qualidade',
    category: 'Websites',
    clusterCat: 'websites',
    date: '01/06/2026',
    title: 'A Importância de Contratar uma Hospedagem de Qualidade para o Seu Site',
    desc: 'Descubra como a infraestrutura de hospedagem impacta diretamente a velocidade, segurança e o posicionamento orgânico do seu site no Google.',
    image: '/assets/images/hospedagem.jpg',
    readTime: '7 min',
    kBadge: 'autoContent.blog.k25',
    kTitle: 'autoContent.blog.k26',
    kDesc: 'autoContent.blog.k27'
  }
];

const clusterCatMap = {
  1: 'websites',
  2: 'seo',
  3: 'marketing',
  4: 'ia',
  5: 'business',
  6: 'tech'
};

const all60Articles = [
  ...cluster1Articles,
  ...cluster2Articles,
  ...cluster3Articles,
  ...cluster4Articles,
  ...cluster5Articles,
  ...cluster6Articles
];

// Map 60 new articles to card format
const newCards = all60Articles.map(a => {
  const groupKey = 'blog_' + a.slug.replace(/-/g, '_');
  return {
    slug: a.slug,
    category: a.pt.category,
    clusterCat: clusterCatMap[a.clusterId] || 'websites',
    date: a.displayDate.pt,
    title: a.pt.title,
    desc: a.pt.metaDesc,
    image: a.image,
    readTime: a.readTime,
    kBadge: `autoContent.${groupKey}.k1`,
    kTitle: `autoContent.${groupKey}.k3`,
    kDesc: `autoContent.${groupKey}.k4`
  };
});

const all68Cards = [...existingArticles, ...newCards];

let cardsHtml = '';
for (const item of all68Cards) {
  cardsHtml += `
          <!-- CARD: ${item.slug} -->
          <article class="card blog-post-card" data-category="${item.clusterCat}" style="display: flex; flex-direction: column; height: 100%;">
            <a href="/blog/${item.slug}/" aria-label="Ler artigo: ${item.title.replace(/"/g, '&quot;')}">
              <img src="${item.image}" alt="${item.title.replace(/"/g, '&quot;')}" width="380" height="220" loading="lazy" style="border-radius: var(--radius-md); margin-bottom: 1.25rem; object-fit: cover; width: 100%; height: 220px; display: block;">
            </a>
            <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;">
              <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm);" data-i18n="${item.kBadge}">${item.category}</span>
              <span style="font-size: 0.85rem; color: var(--color-text-muted);">${item.date}</span>
              <span style="font-size: 0.8rem; color: var(--color-text-muted); margin-left: auto;">${item.readTime}</span>
            </div>
            <h3 class="card-title" style="font-size: 1.15rem; line-height: 1.4; margin-bottom: 0.75rem;">
              <a href="/blog/${item.slug}/" style="color: inherit; text-decoration: none;" data-i18n="${item.kTitle}">${item.title}</a>
            </h3>
            <p class="card-description" style="flex-grow: 1; font-size: 0.95rem; line-height: 1.6;" data-i18n="${item.kDesc}">${item.desc}</p>
            <div style="margin-top: 1.25rem;">
              <a href="/blog/${item.slug}/" class="btn btn-secondary" style="width: 100%; justify-content: center; text-align: center;">
                <span data-i18n="blog.readArticle">Ler Artigo</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>`;
}

const filterPillsHtml = `
    <!-- CATEGORY FILTER BAR -->
    <section class="section" style="padding-top: 1rem; padding-bottom: 2rem;">
      <div class="container text-center">
        <div class="blog-filter-container" style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <button class="filter-btn active" data-filter="all" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-cyan); background: var(--color-cyan-glow); color: var(--color-cyan); font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Todos (${all68Cards.length})</button>
          <button class="filter-btn" data-filter="websites" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-border-subtle); background: var(--color-surface-navy); color: var(--color-text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Sites & Design</button>
          <button class="filter-btn" data-filter="seo" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-border-subtle); background: var(--color-surface-navy); color: var(--color-text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s ease;">SEO & Google</button>
          <button class="filter-btn" data-filter="marketing" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-border-subtle); background: var(--color-surface-navy); color: var(--color-text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Marketing Digital</button>
          <button class="filter-btn" data-filter="ia" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-border-subtle); background: var(--color-surface-navy); color: var(--color-text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Inteligência Artificial</button>
          <button class="filter-btn" data-filter="business" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-border-subtle); background: var(--color-surface-navy); color: var(--color-text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Transformação Digital</button>
          <button class="filter-btn" data-filter="tech" style="padding: 0.5rem 1.25rem; border-radius: 999px; border: 1px solid var(--color-border-subtle); background: var(--color-surface-navy); color: var(--color-text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Crescimento & Tecnologia</button>
        </div>
      </div>
    </section>`;

const fullBlogIndexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog sobre Sites, SEO, IA e Marketing Digital | CONEXUS</title>
  <meta name="description" content="Conteúdos completos e guias estratégicos sobre criação de sites, SEO no Google, Inteligência Artificial, automação e marketing digital para empresas.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.conexus.press/blog/">
  <!-- Multilingual SEO hreflang -->
  <link rel="alternate" hreflang="pt-BR" href="https://www.conexus.press/blog/">
  <link rel="alternate" hreflang="en" href="https://www.conexus.press/blog/?lang=en">
  <link rel="alternate" hreflang="es" href="https://www.conexus.press/blog/?lang=es">
  <link rel="alternate" hreflang="x-default" href="https://www.conexus.press/blog/">
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

  <!-- DADOS ESTRUTURADOS (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog CONEXUS 2.0",
    "url": "https://conexus.press/blog/",
    "description": "Artigos e guias sobre criação de sites, SEO, presença no Google, Inteligência Artificial e marketing digital para empresas."
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
                <linearGradient id="igHeaderGradBlogHub" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f09433"/>
                  <stop offset="25%" stop-color="#e6683c"/>
                  <stop offset="50%" stop-color="#dc2743"/>
                  <stop offset="75%" stop-color="#cc2366"/>
                  <stop offset="100%" stop-color="#bc1888"/>
                </linearGradient>
              </defs>
              <path fill="url(#igHeaderGradBlogHub)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
            <linearGradient id="igMobileGradBlogHub" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f09433"/>
              <stop offset="25%" stop-color="#e6683c"/>
              <stop offset="50%" stop-color="#dc2743"/>
              <stop offset="75%" stop-color="#cc2366"/>
              <stop offset="100%" stop-color="#bc1888"/>
            </linearGradient>
          </defs>
          <path fill="url(#igMobileGradBlogHub)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
    <div style="margin-top: 1rem;">
      <a href="#" class="btn btn-primary" style="width: 100%;" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="mobile_menu" data-i18n="common.talkToConexus">Falar com a CONEXUS</a>
    </div>
  </div>

  <main>
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="container text-center">
        <span class="hero-badge" data-i18n="autoContent.blog.k1">BLOG & CONTEÚDO ESTRATÉGICO</span>
        <h1 class="hero-title" style="max-width: 840px; margin: 0 auto 1.5rem;" data-i18n="autoContent.blog.k2">Conhecimento e Estratégia para a Presença Digital da Sua Empresa</h1>
        <p class="hero-description" style="max-width: 760px; margin: 0 auto 2rem;" data-i18n="autoContent.blog.k3">Artigos práticos e aprofundados sobre Criação de Sites, SEO no Google, Inteligência Artificial, Automação, Gestão e Crescimento Digital.</p>
      </div>
    </section>

    ${filterPillsHtml}

    <!-- GRID DE ARTIGOS DO BLOG -->
    <section class="section section-dark" style="padding-top: 1rem;">
      <div class="container">
        <div class="grid grid-3" id="blog-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="section section-cta">
      <div class="container text-center">
        <h2 data-i18n="autoContent.blog.k28">Quer aplicar essas estratégias no seu negócio?</h2>
        <p style="max-width: 600px; margin: 1rem auto 2rem; color: var(--color-text-muted);" data-i18n="autoContent.blog.k29">Converse com a equipe da CONEXUS e desenvolva o plano digital ideal para sua empresa.</p>
        <a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="blog_footer_cta"><span data-i18n="common.talkToConexus">Falar com a CONEXUS</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" aria-label="CONEXUS Logo Footer">
            <img src="/assets/logos/conexus-logo-transparent.png" alt="CONEXUS Logo" width="160" height="40" loading="lazy">
          </a>
          <p data-i18n="footer.tagline">
            Estratégia e marketing digital conectando websites profissionais, SEO, branding e redes sociais para fortalecer empresas.
          </p>
        </div>

        <div class="footer-column">
          <h4 data-i18n="footer.colNavTitle">Navegação</h4>
          <ul class="footer-links">
            <li><a href="/" data-i18n="nav.home">Início</a></li>
            <li><a href="/servicos/" data-i18n="nav.services">Serviços</a></li>
            <li><a href="/sobre/" data-i18n="footer.aboutConexus">Sobre a CONEXUS</a></li>
            <li><a href="/portfolio/" data-i18n="nav.portfolio">Portfólio</a></li>
            <li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>
            <li><a href="/faq/" data-i18n="footer.faq">Perguntas Frequentes</a></li>
            <li><a href="/contato/" data-i18n="nav.contact">Contato</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 data-i18n="footer.colServicesTitle">Serviços</h4>
          <ul class="footer-links">
            <li><a href="/servicos/criacao-de-sites/" data-i18n="footer.serviceWebsites">Criação de Sites</a></li>
            <li><a href="/servicos/site-one-page/" data-i18n="footer.serviceOnePage">Site One Page</a></li>
            <li><a href="/servicos/seo/" data-i18n="footer.serviceSEO">SEO para Empresas</a></li>
            <li><a href="/servicos/seo-local-google-meu-negocio/" data-i18n="footer.serviceSEOLocal">SEO Local & Google</a></li>
            <li><a href="/servicos/branding-identidade-visual/" data-i18n="footer.serviceBranding">Branding & Identidade</a></li>
            <li><a href="/servicos/gestao-redes-sociais/" data-i18n="footer.serviceSocialMedia">Gestão de Redes Sociais</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 data-i18n="footer.colContactTitle">Contato & Redes</h4>
          <ul class="footer-links">
            <li>
              <a href="mailto:comercial@conexus.press" data-track="email_click" data-cta-position="footer" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                comercial@conexus.press
              </a>
            </li>
            <li style="margin-top: 0.35rem;">
              <a href="mailto:jesse.ribeiro@conexus.press" data-track="email_click" data-cta-position="footer" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                jesse.ribeiro@conexus.press
              </a>
            </li>
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

  <!-- SCRIPT BUNDLE & CLIENT-SIDE CATEGORY FILTER -->
  <script type="module" src="/src/js/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const cards = document.querySelectorAll('.blog-post-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');

          // Update button styles
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'var(--color-surface-navy)';
            b.style.borderColor = 'var(--color-border-subtle)';
            b.style.color = 'var(--color-text-muted)';
          });
          btn.classList.add('active');
          btn.style.background = 'var(--color-cyan-glow)';
          btn.style.borderColor = 'var(--color-cyan)';
          btn.style.color = 'var(--color-cyan)';

          // Filter cards
          cards.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'blog', 'index.html'), fullBlogIndexHtml, 'utf-8');
console.log(`blog/index.html updated with ${all68Cards.length} articles and instant category filter.`);
