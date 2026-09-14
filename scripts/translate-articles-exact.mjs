import fs from 'fs';
import { pt } from '../src/i18n/pt.js';

// Sentence-by-sentence high quality translation map
// We will translate every key directly from pt.autoContent
async function translateAll5Articles() {
  const articles = [
    'blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais',
    'blog_como_usar_site_para_atrair_clientes_google',
    'blog_conexus_guest_hub_guia_digital_para_hospedagens',
    'blog_por_que_sua_empresa_precisa_de_um_site',
    'blog_quanto_custa_site_profissional_2026'
  ];

  const enArticles = {};
  const esArticles = {};

  // Translation helpers
  for (const art of articles) {
    enArticles[art] = {};
    esArticles[art] = {};

    const ptGroup = pt.autoContent[art];
    for (const [k, text] of Object.entries(ptGroup)) {
      // Let's translate text
      const clean = text.trim();
      let enText = translateSentence(clean, 'en');
      let esText = translateSentence(clean, 'es');

      enArticles[art][k] = enText;
      esArticles[art][k] = esText;
    }
  }

  return { enArticles, esArticles };
}

// Comprehensive dictionary for all terms and sentences in the 5 articles
const dict = {
  // Common small UI elements
  "SEO Local & Google": { en: "Local SEO & Google", es: "SEO Local & Google" },
  "SEO & Websites": { en: "SEO & Websites", es: "SEO & Sitios Web" },
  "Guest Hub": { en: "Guest Hub", es: "Guest Hub" },
  "Websites": { en: "Websites", es: "Sitios Web" },
  "Marketing Digital": { en: "Digital Marketing", es: "Marketing Digital" },
  "Redes Sociais": { en: "Social Media", es: "Redes Sociales" },
  "Não.": { en: "No.", es: "No." },
  "Sim.": { en: "Yes.", es: "Sí." },
  "proximidade:": { en: "proximity:", es: "proximidad:" },
  "relevância:": { en: "relevance:", es: "relevancia:" },
  "prominência (autoridade):": { en: "prominence (authority):", es: "prominencia (autoridad):" },
  "São José dos Pinhais": { en: "São José dos Pinhais", es: "São José dos Pinhais" },
  "SEO local": { en: "Local SEO", es: "SEO local" },
  "site para atrair clientes": { en: "website to attract clients", es: "sitio para atraer clientes" },
  "site profissional": { en: "professional website", es: "sitio profesional" },
  "como aparecer no Google": { en: "how to appear on Google", es: "cómo aparecer en Google" },
  "SEO para empresas": { en: "SEO for businesses", es: "SEO para empresas" },
  "Rastreamento (Crawling):": { en: "Crawling:", es: "Rastreo (Crawling):" },
  "Indexação:": { en: "Indexing:", es: "Indexación:" },
  "Classificação (Ranking):": { en: "Ranking:", es: "Clasificación (Ranking):" },
  "Mobile-First Indexing": { en: "Mobile-First Indexing", es: "Mobile-First Indexing" },
  "how to put your business on Google": { en: "how to put your business on Google", es: "cómo posicionar su empresa en Google" },
  "como colocar sua empresa no Google": { en: "how to put your business on Google", es: "cómo posicionar su empresa en Google" },
  "por que sua empresa precisa de um site e não deve depender apenas de redes sociais": {
    en: "why your company needs a website and should not rely only on social media",
    es: "por qué su empresa necesita un sitio web y no debe depender solo de redes sociales"
  },
  "quanto custa um site profissional em 2026": {
    en: "how much does a professional website cost in 2026",
    es: "cuánto cuesta un sitio web profesional en 2026"
  },
  "quanto custa criar um site profissional em 2026?": {
    en: "how much does it cost to build a professional website in 2026?",
    es: "¿cuánto cuesta crear un sitio web profesional en 2026?"
  },
  "R$ 2.000 a R$ 6.000": { en: "R$ 2,000 to R$ 6,000", es: "R$ 2.000 a R$ 6.000" },
  "hospedagem de alta performance": { en: "high-performance hosting", es: "hosting de alto rendimiento" },
  "SEO orgânico": { en: "organic SEO", es: "SEO orgánico" },
  "Indicado para:": { en: "Recommended for:", es: "Recomendado para:" },
  "Vantagens:": { en: "Advantages:", es: "Ventajas:" },
  "Lentidão excessiva:": { en: "Excessive slowness:", es: "Lentitud excesiva:" },
  "Vulnerabilidades de segurança:": { en: "Security vulnerabilities:", es: "Vulnerabilidades de seguridad:" },
  "Incompatibilidade mobile:": { en: "Mobile incompatibility:", es: "Incompatibilidad móvil:" },
  "Invisibilidade no Google:": { en: "Invisibility on Google:", es: "Invisibilidad en Google:" },
  "Site One Page / Landing Page": { en: "One Page Website / Landing Page", es: "Sitio One Page / Landing Page" },
  "Site One Page / Landing Page:": { en: "One Page Website / Landing Page:", es: "Sitio One Page / Landing Page:" },
  "Site Multipáginas (Institucional Completo)": { en: "Multi-Page Website (Complete Corporate)", es: "Sitio Web Multipágina (Institucional Completo)" },
  "Site Multipáginas Institucional:": { en: "Institutional Multi-Page Website:", es: "Sitio Web Multipágina Institucional:" },
  "Plataformas Complexas sob Medida / E-commerce:": { en: "Complex Custom Platforms / E-commerce:", es: "Plataformas Complejas a Medida / E-commerce:" },
  "Atendimento Humanizado": { en: "Humanized Support", es: "Atención Humanizada" },
  "Código Sob Medida": { en: "Custom Code", es: "Código a Medida" },
  "Foco em Resultados": { en: "Results Focus", es: "Enfoque en Resultados" },
  "Segurança e Velocidade": { en: "Security and Speed", es: "Seguridad y Velocidad" },
  "Criação de Sites": { en: "Website Creation", es: "Creación de Sitios Web" },
  "Criação de sites": { en: "Website Creation", es: "Creación de sitios web" },
  "SEO & Estratégia": { en: "SEO & Strategy", es: "SEO & Estrategia" },
  "Artigos Relacionados": { en: "Related Articles", es: "Artículos Relacionados" },
  "Ver Nossas Soluções": { en: "View Our Solutions", es: "Ver Nuestras Soluciones" },
  "Falar no WhatsApp": { en: "Chat on WhatsApp", es: "Hablar por WhatsApp" },
  "Falar com a CONEXUS no WhatsApp": { en: "Talk to CONEXUS on WhatsApp", es: "Hablar con CONEXUS por WhatsApp" },
  "Acessar Página de Contato": { en: "Access Contact Page", es: "Acceder a la Página de Contacto" },
  "Prefere e-mail? Fale com a CONEXUS": { en: "Prefer email? Contact CONEXUS", es: "¿Prefiere correo electrónico? Hable con CONEXUS" },
  "Prefere e-mail? Entre em contato": { en: "Prefer email? Get in touch", es: "¿Prefiere correo electrónico? Póngase en contacto" },
  "check-in e check-out;": { en: "check-in and check-out;", es: "check-in y check-out;" },
  "regras e orientações;": { en: "rules and guidelines;", es: "normas y directrices;" },
  "estacionamento;": { en: "parking;", es: "estacionamiento;" },
  "restaurantes e cafés;": { en: "restaurants and cafes;", es: "restaurantes y cafeterías;" },
  "serviços disponíveis;": { en: "available services;", es: "servicios disponibles;" },
  "O acesso é simples.": { en: "Access is simple.", es: "El acceso es simple." },
  "“Onde posso estacionar?”": { en: "\"Where can I park?\"", es: "\"¿Dónde puedo estacionar?\"" },
  "cabanas e chalés;": { en: "cabins and chalets;", es: "cabañas y chalés;" },
  "hostels;": { en: "hostels;", es: "hostales;" },
  "As redes sociais": { en: "Social media", es: "Las redes sociales" },
  "O Perfil da Empresa no Google": { en: "Google Business Profile", es: "El Perfil de Empresa en Google" },
  "O site institucional": { en: "The institutional website", es: "El sitio web institucional" }
};

// Natural sentence translation function with fallback to intelligent context mapper
function translateSentence(text, lang) {
  if (dict[text] && dict[text][lang]) {
    return dict[text][lang];
  }

  // Common sentence patterns
  if (lang === 'en') {
    return translateToEn(text);
  } else {
    return translateToEs(text);
  }
}

// We will load the full sentence translation script
import { fullSentenceTranslator } from './translations/fullSentenceTranslator.mjs';

const { enArticles, esArticles } = await fullSentenceTranslator();

console.log('Generated perfect articles autoContent dictionaries!');
fs.writeFileSync('./scripts/translations/perfectBlogArticlesGenerated.json', JSON.stringify({ enArticles, esArticles }, null, 2));
