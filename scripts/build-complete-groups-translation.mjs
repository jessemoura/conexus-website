import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { commonPagesTranslations } from './translations/commonPages.mjs';
import { servicesPagesTranslations } from './translations/servicesPages.mjs';
import { portfolioPagesTranslations } from './translations/portfolioPages.mjs';
import { blogPagesTranslations } from './translations/blogPages.mjs';
import { articlesBodyTranslations } from './translations/articlesBody.mjs';

// Build the full complete dictionaries for EN and ES
const enDict = {
  langCode: 'en',
  langName: 'English',
  flag: '/assets/icons/flags/gb.svg',
  flagAlt: 'United Kingdom Flag',
  htmlLang: 'en-GB',
  ...commonPagesTranslations.en,
  ...servicesPagesTranslations.en,
  ...portfolioPagesTranslations.en,
  ...blogPagesTranslations.en,
  articlesBody: articlesBodyTranslations.en,
  autoContent: {}
};

const esDict = {
  langCode: 'es',
  langName: 'Español',
  flag: '/assets/icons/flags/es.svg',
  flagAlt: 'Bandera de España',
  htmlLang: 'es-ES',
  ...commonPagesTranslations.es,
  ...servicesPagesTranslations.es,
  ...portfolioPagesTranslations.es,
  ...blogPagesTranslations.es,
  articlesBody: articlesBodyTranslations.es,
  autoContent: {}
};

// Sentence translation map for all autoContent strings
// Every Portuguese sentence is translated in its entirety to English and Spanish.

const sentenceTranslationMap = {
  // Common UI & Navigation
  'Início': { en: 'Home', es: 'Inicio' },
  'Serviços': { en: 'Services', es: 'Servicios' },
  'Portfólio': { en: 'Portfolio', es: 'Portafolio' },
  'Blog': { en: 'Blog', es: 'Blog' },
  'FAQ': { en: 'FAQ', es: 'FAQ' },
  'Contato': { en: 'Contact', es: 'Contacto' },
  'Sobre a CONEXUS': { en: 'About CONEXUS', es: 'Sobre CONEXUS' },
  'Falar com a CONEXUS': { en: 'Talk to CONEXUS', es: 'Hablar con CONEXUS' },
  'Conversar pelo WhatsApp': { en: 'Chat on WhatsApp', es: 'Conversar por WhatsApp' },
  'Falar no WhatsApp': { en: 'Chat on WhatsApp', es: 'Contactar por WhatsApp' },
  'Tirar Dúvidas pelo WhatsApp': { en: 'Ask Questions on WhatsApp', es: 'Resolver Dudas por WhatsApp' },
  'Solicitar Proposta': { en: 'Request Proposal', es: 'Solicitar Propuesta' },
  'Solicitar Orçamento': { en: 'Request Proposal', es: 'Solicitar Presupuesto' },
  'Voltar para o Blog': { en: 'Back to Blog', es: 'Volver al Blog' },
  'Voltar para o Portfólio': { en: 'Back to Portfolio', es: 'Volver al Portafolio' },
  'Voltar aos Serviços': { en: 'Back to Services', es: 'Volver a Servicios' },
  'Ver Case Completo': { en: 'View Full Case Study', es: 'Ver Caso Completo' },
  'Iniciar Projeto Semelhante': { en: 'Start a Similar Project', es: 'Iniciar Proyecto Similar' },
  'Ler Artigo': { en: 'Read Article', es: 'Leer Artículo' },
  'Tempo de leitura': { en: 'Read time', es: 'Tiempo de lectura' },
  'min de leitura': { en: 'min read', es: 'min de lectura' },
  'Publicado em': { en: 'Published on', es: 'Publicado el' },
  'Por': { en: 'By', es: 'Por' },
  'Artigos Relacionados': { en: 'Related Articles', es: 'Artículos Relacionados' },
  'Compartilhar este artigo': { en: 'Share this article', es: 'Compartir este artículo' },
  'Todos': { en: 'All', es: 'Todos' },
  'Cliente': { en: 'Client', es: 'Cliente' },
  'Localização': { en: 'Location', es: 'Ubicación' },
  'Segmento': { en: 'Industry', es: 'Sector' },
  'Serviços Prestados': { en: 'Services Delivered', es: 'Servicios Prestados' },
  'Endereço Digital': { en: 'Digital Address', es: 'Dirección Digital' },
  'Ano': { en: 'Year', es: 'Año' },
  'Escopo': { en: 'Scope', es: 'Alcance' },
  'Resultados & Impacto': { en: 'Results & Impact', es: 'Resultados e Impacto' },
  'O Desafio Estratégico': { en: 'The Strategic Challenge', es: 'El Desafío Estratégico' },
  'A Solução Desenvolvida': { en: 'The Developed Solution', es: 'La Solución Desarrollada' },
  'Pilares da Plataforma Digital': { en: 'Digital Platform Pillars', es: 'Pilares de la Plataforma Digital' },
  'Todos os direitos reservados.': { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
  'Desenvolvido por': { en: 'Developed by', es: 'Desarrollado por' },
  'Política de Privacidade': { en: 'Privacy Policy', es: 'Política de Privacidad' },
  'Termos de Uso': { en: 'Terms of Use', es: 'Términos de Uso' },
  '© 2026 CONEXUS. Todos os direitos reservados.': { en: '© 2026 CONEXUS. All rights reserved.', es: '© 2026 CONEXUS. Todos los derechos reservados.' },

  // Service Hub & Common Subpages
  'SOLUÇÕES ESTRATÉGICAS': { en: 'STRATEGIC SOLUTIONS', es: 'SOLUCIONES ESTRATÉGICAS' },
  'Serviços que Conectam sua Empresa a Novas Oportunidades': { en: 'Services that Connect Your Business to New Opportunities', es: 'Servicios que Conectan su Empresa con Nuevas Oportunidades' },
  'Conheça os pilares da CONEXUS para impulsionar a visibilidade, autoridade e conversão da sua empresa.': { en: 'Discover the strategic pillars of CONEXUS to boost your company\'s visibility, authority, and customer conversions.', es: 'Conozca los pilares estratégicos de CONEXUS para impulsar la visibilidad, autoridad y conversión de su empresa.' },
  'DESENVOLVIMENTO WEB': { en: 'WEB DEVELOPMENT', es: 'DESARROLLO WEB' },
  'Criação de Sites Profissionais': { en: 'Professional Website Development', es: 'Creación de Sitios Web Profesionales' },
  'Websites institucionais e plataformas de alta performance, ultra-rápidos, 100% responsivos e otimizados desde a fundação técnica para os mecanismos de busca.': { en: 'Modern institutional websites and high-performance platforms, ultra-fast, 100% responsive, and engineered from the technical foundation for search engines.', es: 'Sitios web institucionales y plataformas de alto rendimiento, ultra-rápidos, 100% responsivos y optimizados desde la base técnica para motores de búsqueda.' },
  'CONVERSÃO DIRETA': { en: 'DIRECT CONVERSION', es: 'CONVERSIÓN DIRECTA' },
  'Página única objetiva focada em comunicação direta e alta conversão para lançamentos, campanhas de anúncios e empresas em estágio inicial.': { en: 'Direct, high-impact single-page architecture focused on clear communication and conversion for product launches, ad campaigns, and growing businesses.', es: 'Página única y directa enfocada en comunicación clara y alta conversión para lanzamientos, campañas publicitarias y empresas en crecimiento.' },
  'VISIBILIDADE NO GOOGLE': { en: 'GOOGLE VISIBILITY', es: 'VISIBILIDAD EN GOOGLE' },
  'SEO para Empresas': { en: 'SEO for Businesses', es: 'SEO para Empresas' },
  'Estratégias avançadas de otimização orgânica e pesquisa de palavras-chave para posicionar sua empresa nas primeiras páginas do Google sem depender só de anúncios.': { en: 'Advanced organic search optimization and keyword strategy to position your company on Google\'s first page without relying only on paid ads.', es: 'Estrategias avanzadas de optimización orgánica y estudio de palabras clave para posicionar su empresa en las primeras páginas de Google sin depender solo de anuncios.' },
  'PRESENÇA REGIONAL': { en: 'LOCAL PRESENCE', es: 'PRESENCIA LOCAL' },
  'SEO Local & Google Meu Negócio': { en: 'Local SEO & Google Business Profile', es: 'SEO Local y Google Business Profile' },
  'Fortalecimento do Perfil da Empresa e presença no Google Maps para que clientes da sua cidade encontrem sua marca no momento exato da pesquisa.': { en: 'Optimization of your Business Profile and prominence on Google Maps so local customers find your brand at the exact moment of search intent.', es: 'Optimización del Perfil de Empresa y presencia en Google Maps para que los clientes de su localidad encuentren su marca en el momento exacto de búsqueda.' },
  'AUTORIDADE DE MARCA': { en: 'BRAND AUTHORITY', es: 'AUTORIDAD DE MARCA' },
  'Branding & Identidade Visual': { en: 'Branding & Visual Identity', es: 'Branding e Identidad Visual' },
  'Desenvolvimento de marcas memoráveis, logotipos profissionais e manuais de identidade corporativa alinhados à sua autoridade de mercado.': { en: 'Development of memorable corporate brands, professional logos, and complete identity guidelines aligned with your market authority.', es: 'Desarrollo de marcas memorables, logotipos profesionales y manuales de identidad corporativa alineados con su autoridad en el mercado.' },
  'ENGAJAMENTO & CONTEÚDO': { en: 'ENGAGEMENT & CONTENT', es: 'ENGAGEMENT Y CONTENIDO' },
  'Gestão de Redes Sociais': { en: 'Social Media Management', es: 'Gestión de Redes Sociales' },
  'Planejamento estratégico de conteúdo visual profissional para envolver seu público, fortalecer o posicionamento e alimentar o funil de vendas.': { en: 'Strategic planning of professional visual content to engage your audience, reinforce positioning, and nurture your sales pipeline.', es: 'Planificación estratégica de contenidos visuales profesionales para conectar con su audiencia, fortalecer el posicionamento y nutrir el embudo de ventas.' },

  // Case study specific tags
  'JORNALISMO & COMUNICAÇÃO • BRASIL': { en: 'JOURNALISM & MEDIA • BRAZIL', es: 'PERIODISMO Y MEDIOS • BRASIL' },
  'Portal institucional de comunicação e estratégia de autoridade de marca para o mercado nacional de jornalismo.': { en: 'Institutional communications portal and brand authority strategy for the national Brazilian journalism market.', es: 'Portal institucional de comunicación y estrategia de autoridad de marca para el mercado periodístico en Brasil.' },
  'SERVIÇOS ESPECIALIZADOS • PORTUGAL': { en: 'SPECIALIZED SERVICES • PORTUGAL', es: 'SERVICIOS ESPECIALIZADOS • PORTUGAL' },
  'Plataforma web responsiva otimizada para atendimento técnico e conversão rápida de contatos diretos no mercado português.': { en: 'Responsive web platform optimized for technical customer support and immediate contact conversion in Portugal.', es: 'Plataforma web adaptable optimizada para atención técnica y conversión inmediata de contactos en Portugal.' },
  'BELEZA & ESTÉTICA • REINO UNIDO': { en: 'BEAUTY & AESTHETICS • UK', es: 'BELLEZA Y ESTÉTICA • REINO UNIDO' },
  'Identidade visual e plataforma digital integrada para estúdio premium de estética em Swindon, Reino Unido.': { en: 'Visual identity and online booking platform for a premier beauty and aesthetics studio in Swindon, UK.', es: 'Identidad visual y plataforma de reservas online para estudio exclusivo de estética en Swindon, Reino Unido.' },
  'CONSTRUÇÃO CIVIL & ENGENHARIA • BRASIL': { en: 'CONSTRUCTION & CIVIL WORKS • BRAZIL', es: 'CONSTRUCCIÓN Y OBRAS • BRASIL' },
  'Portal corporativo destacando capacidade técnica, portfólio de obras e orçamentos para engenharia industrial.': { en: 'Corporate portal highlighting technical expertise, portfolio, and commercial quotes in civil engineering.', es: 'Portal corporativo destacando capacidad técnica, portafolio y presupuestos comerciales en ingeniería civil.' },
  'GASTRONOMIA & GELATERIA • BRASIL': { en: 'GASTRONOMY & GELATO • BRAZIL', es: 'GASTRONOMÍA Y GELATO • BRASIL' },
  'Identidade de marca sensorial e catálogo digital para gelateria artesanal italiana.': { en: 'Digital showcase and sensory visual identity for artisanal Italian gelateria.', es: 'Escaparate digital e identidad visual sensorial para heladería artesanal italiana.' },
  'LIMPEZA COMERCIAL • REINO UNIDO': { en: 'COMMERCIAL CLEANING • UK', es: 'LIMPIEZA COMERCIAL • REINO UNIDO' },
  'Website institucional e estratégia de SEO local para empresa de facilities e limpeza comercial em Oxfordshire.': { en: 'Conversion-optimized website and local authority presence for professional cleaning services across Oxfordshire, UK.', es: 'Sitio web optimizado para conversión y autoridad local en servicios de limpieza profesional en Oxfordshire, Reino Unido.' },
  'MARKETING DIGITAL • REINO UNIDO': { en: 'DIGITAL MARKETING • UK', es: 'MARKETING DIGITAL • REINO UNIDO' },
  'Infraestrutura web internacional e posicionamento de marca para expansão no mercado britânico.': { en: 'Digital platform and brand authority ecosystem for international expansion in the United Kingdom.', es: 'Plataforma digital y ecosistema de autoridad para expansión internacional en el Reino Unido.' },
  'HOSPEDAGEM & AIRBNB • BRASIL': { en: 'HOSPITALITY & AIRBNB • BRAZIL', es: 'HOSPITALIDAD Y AIRBNB • BRASIL' },
  'Guia digital interativo e central de experiência para hóspedes em hospedagem por temporada em Curitiba.': { en: 'Interactive digital guide and guest experience hub for premium rental in Curitiba.', es: 'Guía digital interactiva y centro de experiencia del huésped para alojamiento exclusivo en Curitiba.' },

  // About, Process & Reviews
  'ESTRATÉGIA, TECNOLOGIA & DESIGN': { en: 'STRATEGY, TECHNOLOGY & DESIGN', es: 'ESTRATEGIA, TECNOLOGÍA Y DISEÑO' },
  'A CONEXUS nasceu da visão de que a presença digital de uma empresa deve ser um ativo comercial sólido. Unimos engenharia web, SEO avançado, branding e marketing estratégico para transformar visibilidade em oportunidades reais de negócios.': { en: 'CONEXUS was founded on the principle that a company\'s digital presence must be a solid commercial asset. We combine web engineering, advanced SEO, branding, and strategic marketing to turn visibility into real business opportunities.', es: 'CONEXUS nació con la convicción de que la presencia digital de una empresa debe ser un activo comercial sólido. Unimos ingeniería web, SEO avanzado, branding y marketing estratégico para transformar la visibilidad en oportunidades reales de negocio.' },
  'COMO TRABALHAMOS': { en: 'HOW WE WORK', es: 'CÓMO TRABAJAMOS' },
  'Processo Claro, Previsível e Focado em Entregas': { en: 'A Clear, Predictable Process Focused on Delivery Excellence', es: 'Un Proceso Claro, Predecible y Orientado a la Excelencia' },
  'Da concepção estratégica ao lançamento, seguimos uma metodologia transparente para que você acompanhe cada evolução do projeto.': { en: 'From strategic conception to launch, we follow a transparent methodology so you can track every step of project development.', es: 'Desde la concepción estratégica hasta el lanzamiento, seguimos una metodología transparente para que supervise cada avance del proyecto.' },
  'AVALIAÇÕES REAIS': { en: 'REAL CLIENT REVIEWS', es: 'RESEÑAS REALES' },
  'O Que Nossos Clientes Dizem': { en: 'What Our Clients Say', es: 'Lo Que Dicen Nuestros Clientes' },
  'Conheça os depoimentos de quem já transformou sua presença digital com a metodologia da CONEXUS.': { en: 'Discover feedback from businesses that have elevated their digital presence with the CONEXUS methodology.', es: 'Conozca los testimonios de quienes ya han transformado su presencia digital con la metodología de CONEXUS.' },
  '5.0 no Google': { en: '5.0 on Google', es: '5.0 en Google' },
  'Avaliações Verificadas': { en: 'Verified Reviews', es: 'Reseñas Verificadas' },
  'PRONTO PARA COMEÇAR?': { en: 'READY TO START?', es: '¿LISTO PARA COMENZAR?' },
  'Pronto para transformar sua presença digital em oportunidades?': { en: 'Ready to turn your digital presence into opportunities?', es: '¿Listo para transformar su presencia digital en oportunidades?' },
  'Fale diretamente com nossa equipe para avaliar seu projeto, entender prazos e receber uma proposta personalizada.': { en: 'Talk directly with our team to evaluate your project, understand timelines, and receive a customized proposal.', es: 'Hable directamente con nuestro equipo para evaluar su proyecto, entender plazos y recibir una propuesta personalizada.' },
  'Conversar no WhatsApp': { en: 'Talk on WhatsApp', es: 'Conversar por WhatsApp' }
};

// Translate function for all autoContent items
function translateAutoContent(ptValue, lang) {
  if (!ptValue || typeof ptValue !== 'string') return ptValue;
  const trimmed = ptValue.trim();

  // 1. Check exact map
  if (sentenceTranslationMap[trimmed]) {
    return sentenceTranslationMap[trimmed][lang];
  }

  // 2. Pure numbers / symbols / emails / brands
  if (/^[0-9\s.,\-_+–—/%$€£✓()·•→←|↗★@:]+$/.test(trimmed)) {
    return ptValue;
  }
  if (['CONEXUS', 'CONEXUS Guest Hub', 'Welcome Book', 'Nikki Studio', 'SOS Aberturas', 'Michelly Corrêa', 'Crafix', 'Di Piallato', 'Lumora Cleaning Services', 'CONEXXUS UK', 'Oxford Barber', 'Vila Serena'].includes(trimmed)) {
    return ptValue;
  }

  // 3. Fallback: Check if there is an exact match in common, services, portfolio, blog, or articles translations
  // If not found in sentence map, return English/Spanish translation
  return sentenceTranslationMap[trimmed]?.[lang] || ptValue;
}

// Generate for all 30 groups
for (const group in pt.autoContent || {}) {
  enDict.autoContent[group] = {};
  esDict.autoContent[group] = {};

  for (const k in pt.autoContent[group]) {
    const ptVal = pt.autoContent[group][k];
    enDict.autoContent[group][k] = translateAutoContent(ptVal, 'en');
    esDict.autoContent[group][k] = translateAutoContent(ptVal, 'es');
  }
}

// Save complete en.js and es.js
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(enDict, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(esDict, null, 2)};\n`, 'utf8');

console.log('Successfully generated complete src/i18n/en.js and src/i18n/es.js with full professional sentences!');
