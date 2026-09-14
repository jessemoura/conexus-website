import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return 0;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  for (const [target, replacement] of replacements) {
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      count++;
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return count;
}

// -------------------------------------------------------------
// 1. SERVICE SUBPAGES (7)
// -------------------------------------------------------------

// Criacao de Sites
replaceInFile(path.join(rootDir, 'servicos', 'criacao-de-sites', 'index.html'), [
  ['<span class="hero-badge">DESENVOLVIMENTO WEB PROFISSIONAL</span>', '<span class="hero-badge" data-i18n="criacaoSitesPage.badge">DESENVOLVIMENTO WEB PROFISSIONAL</span>'],
  ['<h1 class="hero-title">Criação de Sites Profissionais para Empresas</h1>', '<h1 class="hero-title" data-i18n="criacaoSitesPage.title">Criação de Sites Profissionais para Empresas</h1>'],
  ['<p class="hero-description">\n            Desenvolvemos websites institucionais modernos, ultra-rápidos, responsivos e preparados desde a fundação para mecanismos de busca. O pilar central para transmitir autoridade, apresentar seus diferenciais e converter visitantes em contatos comerciais reais.\n          </p>', '<p class="hero-description" data-i18n="criacaoSitesPage.desc">Desenvolvemos websites institucionais modernos, ultra-rápidos, responsivos e preparados desde a fundação para mecanismos de busca. O pilar central para transmitir autoridade, apresentar seus diferenciais e converter visitantes em contatos comerciais reais.</p>'],
  ['<span class="section-badge">SEDE DIGITAL PROPRIETÁRIA</span>', '<span class="section-badge" data-i18n="criacaoSitesPage.whyBadge">SEDE DIGITAL PROPRIETÁRIA</span>'],
  ['<h2 class="section-title">Por que sua Empresa Precisa de um Website Profissional?</h2>', '<h2 class="section-title" data-i18n="criacaoSitesPage.whyTitle">Por que sua Empresa Precisa de um Website Profissional?</h2>'],
  ['<h3 class="card-title">Credibilidade & Autoridade</h3>', '<h3 class="card-title" data-i18n="criacaoSitesPage.card1Title">Credibilidade & Autoridade</h3>'],
  ['<h3 class="card-title">Navegação Mobile-First</h3>', '<h3 class="card-title" data-i18n="criacaoSitesPage.card2Title">Navegação Mobile-First</h3>'],
  ['<h3 class="card-title">Encontrável no Google (SEO)</h3>', '<h3 class="card-title" data-i18n="criacaoSitesPage.card3Title">Encontrável no Google (SEO)</h3>'],
  ['<h3 class="card-title">Geração Contínua de Leads</h3>', '<h3 class="card-title" data-i18n="criacaoSitesPage.card4Title">Geração Contínua de Leads</h3>'],
  ['<h2>Pronto para criar um site profissional para sua empresa?</h2>', '<h2 data-i18n="criacaoSitesPage.ctaTitle">Pronto para criar um site profissional para sua empresa?</h2>']
]);

// Site One Page
replaceInFile(path.join(rootDir, 'servicos', 'site-one-page', 'index.html'), [
  ['<span class="hero-badge">PÁGINA ÚNICA & OBJETIVA</span>', '<span class="hero-badge" data-i18n="siteOnePagePage.badge">PÁGINA ÚNICA & OBJETIVA</span>'],
  ['<h1 class="hero-title">Criação de Site One Page Profissional</h1>', '<h1 class="hero-title" data-i18n="siteOnePagePage.title">Criação de Site One Page Profissional</h1>'],
  ['<p class="hero-description">\n            Apresente sua empresa, produtos e serviços em uma estrutura moderna de página única. Ideal para pequenos negócios e profissionais autônomos que buscam máxima agilidade e foco em conversão.\n          </p>', '<p class="hero-description" data-i18n="siteOnePagePage.desc">Apresente sua empresa, produtos e serviços em uma estrutura moderna de página única. Ideal para pequenos negócios e profissionais autônomos que buscam máxima agilidade e foco em conversão.</p>'],
  ['<span class="section-badge">POR QUE ESCOLHER ONE PAGE</span>', '<span class="section-badge" data-i18n="siteOnePagePage.whyBadge">POR QUE ESCOLHER ONE PAGE</span>'],
  ['<h2 class="section-title">Comunicação clara, rápida e focada em resultados</h2>', '<h2 class="section-title" data-i18n="siteOnePagePage.whyTitle">Comunicação clara, rápida e focada em resultados</h2>'],
  ['<h3 class="card-title">Leitura Fluida & Dinâmica</h3>', '<h3 class="card-title" data-i18n="siteOnePagePage.card1Title">Leitura Fluida & Dinâmica</h3>'],
  ['<h3 class="card-title">Mobile First Perfeito</h3>', '<h3 class="card-title" data-i18n="siteOnePagePage.card2Title">Mobile First Perfeito</h3>'],
  ['<h3 class="card-title">Foco Total em Conversão</h3>', '<h3 class="card-title" data-i18n="siteOnePagePage.card3Title">Foco Total em Conversão</h3>'],
  ['<h2>Pronto para lançar seu site One Page?</h2>', '<h2 data-i18n="siteOnePagePage.ctaTitle">Pronto para lançar seu site One Page?</h2>']
]);

// CONEXUS Guest Hub
replaceInFile(path.join(rootDir, 'servicos', 'conexus-guest-hub', 'index.html'), [
  ['<span class="hero-badge">HOSPITALIDADE • EXPERIÊNCIA DIGITAL</span>', '<span class="hero-badge" data-i18n="conexusGuestHubPage.badge">HOSPITALIDADE • EXPERIÊNCIA DIGITAL</span>'],
  ['<h1 class="hero-title">CONEXUS Guest Hub</h1>', '<h1 class="hero-title" data-i18n="conexusGuestHubPage.title">CONEXUS Guest Hub</h1>'],
  ['<p class="hero-subtitle">Experiência digital para hóspedes. Mais organização para sua hospedagem.</p>', '<p class="hero-subtitle" data-i18n="conexusGuestHubPage.subtitle">Experiência digital para hóspedes. Mais organização para sua hospedagem.</p>'],
  ['<span class="section-badge">O QUE É O GUEST HUB</span>', '<span class="section-badge" data-i18n="conexusGuestHubPage.whatBadge">O QUE É O GUEST HUB</span>'],
  ['<h2 class="section-title">O que é o CONEXUS Guest Hub?</h2>', '<h2 class="section-title" data-i18n="conexusGuestHubPage.whatTitle">O que é o CONEXUS Guest Hub?</h2>'],
  ['<h3 class="card-title">Tudo em um só lugar</h3>', '<h3 class="card-title" data-i18n="conexusGuestHubPage.card1Title">Tudo em um só lugar</h3>'],
  ['<h3 class="card-title">100% Mobile First</h3>', '<h3 class="card-title" data-i18n="conexusGuestHubPage.card2Title">100% Mobile First</h3>'],
  ['<h3 class="card-title">Identidade Personalizada</h3>', '<h3 class="card-title" data-i18n="conexusGuestHubPage.card3Title">Identidade Personalizada</h3>'],
  ['<h2 class="section-title">Para quem é o CONEXUS Guest Hub?</h2>', '<h2 class="section-title" data-i18n="conexusGuestHubPage.targetTitle">Para quem é o CONEXUS Guest Hub?</h2>'],
  ['<h3>Pousadas & Chalés</h3>', '<h3 data-i18n="conexusGuestHubPage.t1Title">Pousadas & Chalés</h3>'],
  ['<h3>Airbnb & Temporada</h3>', '<h3 data-i18n="conexusGuestHubPage.t2Title">Airbnb & Temporada</h3>'],
  ['<h3>Cabanas & Glampings</h3>', '<h3 data-i18n="conexusGuestHubPage.t3Title">Cabanas & Glampings</h3>'],
  ['<h3>Pequenas Hospedagens</h3>', '<h3 data-i18n="conexusGuestHubPage.t4Title">Pequenas Hospedagens</h3>'],
  ['<h2 class="section-title">O que está incluso no CONEXUS Guest Hub?</h2>', '<h2 class="section-title" data-i18n="conexusGuestHubPage.featuresTitle">O que está incluso no CONEXUS Guest Hub?</h2>'],
  ['<h3>Informações da Hospedagem</h3>', '<h3 data-i18n="conexusGuestHubPage.f1Title">Informações da Hospedagem</h3>'],
  ['<h3>Check-in & Check-out</h3>', '<h3 data-i18n="conexusGuestHubPage.f2Title">Check-in & Check-out</h3>'],
  ['<h3>Wi-Fi & Regras da Casa</h3>', '<h3 data-i18n="conexusGuestHubPage.f3Title">Wi-Fi & Regras da Casa</h3>'],
  ['<h3>Localização & Rotas</h3>', '<h3 data-i18n="conexusGuestHubPage.f4Title">Localização & Rotas</h3>'],
  ['<h3>Contato Rápido</h3>', '<h3 data-i18n="conexusGuestHubPage.f5Title">Contato Rápido</h3>'],
  ['<h3>Restaurantes, Atrações & Recomendações</h3>', '<h3 data-i18n="conexusGuestHubPage.f6Title">Restaurantes, Atrações & Recomendações</h3>'],
  ['<h2>Demonstração Interativa ao Vivo</h2>', '<h2 data-i18n="conexusGuestHubPage.demoTitle">Demonstração Interativa ao Vivo</h2>'],
  ['<h2>Pronto para elevar o padrão da sua hospedagem?</h2>', '<h2 data-i18n="conexusGuestHubPage.ctaTitle">Pronto para elevar o padrão da sua hospedagem?</h2>']
]);

// SEO
replaceInFile(path.join(rootDir, 'servicos', 'seo', 'index.html'), [
  ['<span class="hero-badge">VISIBILIDADE ORGÂNICA NO GOOGLE</span>', '<span class="hero-badge" data-i18n="seoPage.badge">VISIBILIDADE ORGÂNICA NO GOOGLE</span>'],
  ['<h1 class="hero-title">SEO para Empresas: Aumente sua Visibilidade no Google</h1>', '<h1 class="hero-title" data-i18n="seoPage.title">SEO para Empresas: Aumente sua Visibilidade no Google</h1>'],
  ['<span class="section-badge">PILARES DO NOSSO TRABALHO</span>', '<span class="section-badge" data-i18n="seoPage.whyBadge">PILARES DO NOSSO TRABALHO</span>'],
  ['<h2 class="section-title">Otimização estrutural e estratégica para seu site</h2>', '<h2 class="section-title" data-i18n="seoPage.whyTitle">Otimização estrutural e estratégica para seu site</h2>'],
  ['<h3 class="card-title">SEO Técnico & Performance</h3>', '<h3 class="card-title" data-i18n="seoPage.card1Title">SEO Técnico & Performance</h3>'],
  ['<h3 class="card-title">SEO On-Page & Conteúdo</h3>', '<h3 class="card-title" data-i18n="seoPage.card2Title">SEO On-Page & Conteúdo</h3>'],
  ['<h3 class="card-title">Indexação & Rastreabilidade</h3>', '<h3 class="card-title" data-i18n="seoPage.card3Title">Indexação & Rastreabilidade</h3>'],
  ['<h2>Pronto para destacar sua empresa nas buscas?</h2>', '<h2 data-i18n="seoPage.ctaTitle">Pronto para destacar sua empresa nas buscas?</h2>']
]);

// SEO Local
replaceInFile(path.join(rootDir, 'servicos', 'seo-local-google-meu-negocio', 'index.html'), [
  ['<span class="hero-badge">PRESENÇA DE NÍVEL LOCAL</span>', '<span class="hero-badge" data-i18n="seoLocalPage.badge">PRESENÇA DE NÍVEL LOCAL</span>'],
  ['<h1 class="hero-title">SEO Local e Google Meu Negócio para sua Empresa</h1>', '<h1 class="hero-title" data-i18n="seoLocalPage.title">SEO Local e Google Meu Negócio para sua Empresa</h1>'],
  ['<span class="section-badge">SOLUÇÃO REGIONAL</span>', '<span class="section-badge" data-i18n="seoLocalPage.whyBadge">SOLUÇÃO REGIONAL</span>'],
  ['<h2 class="section-title">Dominando o mapa de buscas na sua cidade</h2>', '<h2 class="section-title" data-i18n="seoLocalPage.whyTitle">Dominando o mapa de buscas na sua cidade</h2>'],
  ['<h3 class="card-title">Perfil Oficial Completo</h3>', '<h3 class="card-title" data-i18n="seoLocalPage.card1Title">Perfil Oficial Completo</h3>'],
  ['<h3 class="card-title">Gestão de Avaliações</h3>', '<h3 class="card-title" data-i18n="seoLocalPage.card2Title">Gestão de Avaliações</h3>'],
  ['<h3 class="card-title">Atração de Clientes Próximos</h3>', '<h3 class="card-title" data-i18n="seoLocalPage.card3Title">Atração de Clientes Próximos</h3>'],
  ['<h2>Pronto para atrair mais clientes da sua região?</h2>', '<h2 data-i18n="seoLocalPage.ctaTitle">Pronto para atrair mais clientes da sua região?</h2>']
]);

// Branding
replaceInFile(path.join(rootDir, 'servicos', 'branding-identidade-visual', 'index.html'), [
  ['<span class="hero-badge">IDENTIDADE DE MARCA & DESIGN</span>', '<span class="hero-badge" data-i18n="brandingPage.badge">IDENTIDADE DE MARCA & DESIGN</span>'],
  ['<h1 class="hero-title">Branding e Identidade Visual para Empresas</h1>', '<h1 class="hero-title" data-i18n="brandingPage.title">Branding e Identidade Visual para Empresas</h1>'],
  ['<span class="section-badge">O QUE DESENVOLVEMOS</span>', '<span class="section-badge" data-i18n="brandingPage.whyBadge">O QUE DESENVOLVEMOS</span>'],
  ['<h2 class="section-title">Construção completa da identidade visual</h2>', '<h2 class="section-title" data-i18n="brandingPage.whyTitle">Construção completa da identidade visual</h2>'],
  ['<h3 class="card-title">Logo & Símbolo Oficial</h3>', '<h3 class="card-title" data-i18n="brandingPage.card1Title">Logo & Símbolo Oficial</h3>'],
  ['<h3 class="card-title">Guia de Estilo & Cores</h3>', '<h3 class="card-title" data-i18n="brandingPage.card2Title">Guia de Estilo & Cores</h3>'],
  ['<h3 class="card-title">Consistência Multicanal</h3>', '<h3 class="card-title" data-i18n="brandingPage.card3Title">Consistência Multicanal</h3>'],
  ['<h2 class="section-title">Sua empresa pronta para transmitir máxima autoridade</h2>', '<h2 class="section-title" data-i18n="brandingPage.valueTitle">Sua empresa pronta para transmitir máxima autoridade</h2>']
]);

// Gestao Redes Sociais
replaceInFile(path.join(rootDir, 'servicos', 'gestao-redes-sociais', 'index.html'), [
  ['<span class="hero-badge">SOCIAL MEDIA ESTRATÉGICO</span>', '<span class="hero-badge" data-i18n="gestaoRedesPage.badge">SOCIAL MEDIA ESTRATÉGICO</span>'],
  ['<h1 class="hero-title">Gestão de Redes Sociais para Empresas</h1>', '<h1 class="hero-title" data-i18n="gestaoRedesPage.title">Gestão de Redes Sociais para Empresas</h1>'],
  ['<span class="section-badge">COMO ATUAMOS</span>', '<span class="section-badge" data-i18n="gestaoRedesPage.whyBadge">COMO ATUAMOS</span>'],
  ['<h2 class="section-title">Posicionamento constante e de alto nível</h2>', '<h2 class="section-title" data-i18n="gestaoRedesPage.whyTitle">Posicionamento constante e de alto nível</h2>'],
  ['<h3 class="card-title">Planejamento de Conteúdo</h3>', '<h3 class="card-title" data-i18n="gestaoRedesPage.card1Title">Planejamento de Conteúdo</h3>'],
  ['<h3 class="card-title">Design Institucional & Carrosséis</h3>', '<h3 class="card-title" data-i18n="gestaoRedesPage.card2Title">Design Institucional & Carrosséis</h3>'],
  ['<h3 class="card-title">Construção de Autoridade</h3>', '<h3 class="card-title" data-i18n="gestaoRedesPage.card3Title">Construção de Autoridade</h3>'],
  ['<h2>Pronto para profissionalizar suas redes sociais?</h2>', '<h2 data-i18n="gestaoRedesPage.ctaTitle">Pronto para profissionalizar suas redes sociais?</h2>']
]);

// -------------------------------------------------------------
// 2. PORTFOLIO CASE STUDIES (8)
// -------------------------------------------------------------

const cases = [
  { file: 'conexxus-uk', key: 'caseConexxusUk' },
  { file: 'crafix', key: 'caseCrafix' },
  { file: 'di-piallato', key: 'caseDiPiallato' },
  { file: 'lumora-cleaning-services', key: 'caseLumora' },
  { file: 'michelly-correa', key: 'caseMichellyCorrea' },
  { file: 'nikki-studio', key: 'caseNikkiStudio' },
  { file: 'sos-aberturas', key: 'caseSosAberturas' },
  { file: 'welcome-book-apartamento-41', key: 'caseWelcomeBook' }
];

cases.forEach(({ file, key }) => {
  const casePath = path.join(rootDir, 'portfolio', file, 'index.html');
  replaceInFile(casePath, [
    ['<h2 class="section-title">O Desafio Estratégico</h2>', `<h2 class="section-title" data-i18n="${key}.challengeTitle">O Desafio Estratégico</h2>`],
    ['<h2 class="section-title">A Solução Desenvolvida</h2>', `<h2 class="section-title" data-i18n="${key}.solutionTitle">A Solução Desenvolvida</h2>`],
    ['<h2 class="section-title">Pilares da Plataforma Digital</h2>', `<h2 class="section-title" data-i18n="common.pillars">Pilares da Plataforma Digital</h2>`],
    ['<span class="meta-label">Cliente</span>', '<span class="meta-label" data-i18n="common.client">Cliente</span>'],
    ['<span class="meta-label">Segmento</span>', '<span class="meta-label" data-i18n="common.segment">Segmento</span>'],
    ['<span class="meta-label">Escopo</span>', '<span class="meta-label" data-i18n="common.scope">Escopo</span>'],
    ['<span class="meta-label">Ano</span>', '<span class="meta-label" data-i18n="common.year">Ano</span>']
  ]);
});

// -------------------------------------------------------------
// 3. BLOG ARTICLES (8)
// -------------------------------------------------------------

const articles = [
  'como-colocar-empresa-no-google-sao-jose-dos-pinhais',
  'como-usar-site-para-atrair-clientes-google',
  'conexus-guest-hub-guia-digital-para-hospedagens',
  'importancia-hospedagem-de-qualidade',
  'marketing-digital-para-empresas',
  'por-que-sua-empresa-precisa-de-um-site',
  'quanto-custa-site-profissional-2026',
  'redes-sociais-para-empresas'
];

articles.forEach(slug => {
  const articlePath = path.join(rootDir, 'blog', slug, 'index.html');
  replaceInFile(articlePath, [
    ['<span class="author-name">Equipe CONEXUS</span>', '<span class="author-name" data-i18n="blogCommon.authorName">Equipe CONEXUS</span>'],
    ['<span class="author-role">Estratégia & Presença Digital</span>', '<span class="author-role" data-i18n="blogCommon.authorRole">Estratégia & Presença Digital</span>'],
    ['<h2 class="section-title">Artigos Relacionados</h2>', '<h2 class="section-title" data-i18n="blogCommon.relatedTitle">Artigos Relacionados</h2>']
  ]);
});

console.log('All 30 HTML pages successfully updated with comprehensive i18n tags!');
