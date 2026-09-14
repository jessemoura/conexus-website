import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

// Comprehensive sentence & phrase translation engine
// Maps Portuguese clauses, headings, sentences, and words to English and Spanish.

const exactTranslations = {
  // Common badges & headings
  'SEDE DIGITAL PROPRIETÁRIA': {
    en: 'PROPRIETARY DIGITAL HEADQUARTERS',
    es: 'SEDE DIGITAL PROPIA'
  },
  'Por que sua Empresa Precisa de um Website Profissional?': {
    en: 'Why Does Your Business Need a Professional Website?',
    es: '¿Por qué su Empresa Necesita un Sitio Web Profesional?'
  },
  'Diferente das redes sociais, onde o algoritmo altera as regras constantemente, seu website é o único canal digital 100% sob seu controle.': {
    en: 'Unlike social media, where algorithms constantly change the rules, your website is the only digital channel 100% under your control.',
    es: 'A diferencia de las redes sociales, donde el algoritmo cambia las reglas constantemente, su sitio web es el único canal digital 100% bajo su control.'
  },
  'Credibilidade & Autoridade': {
    en: 'Credibility & Authority',
    es: 'Credibilidad y Autoridad'
  },
  'Transmita imagem de empresa sólida e profissional aos clientes no primeiro contato visual.': {
    en: 'Convey a solid, professional corporate image to clients from the very first visual touchpoint.',
    es: 'Transmita una imagen de empresa sólida y profesional a sus clientes desde el primer impacto visual.'
  },
  'Navegação Mobile-First': {
    en: 'Mobile-First Navigation',
    es: 'Navegación Mobile-First'
  },
  'Interface totalmente otimizada para smartphones, onde mais de 80% do tráfego navega hoje.': {
    en: 'Fully optimized interface for smartphones, where over 80% of digital traffic happens today.',
    es: 'Interfaz totalmente optimizada para smartphones, donde navega más del 80% del tráfico actual.'
  },
  'Encontrável no Google (SEO)': {
    en: 'Findable on Google (SEO)',
    es: 'Posicionado en Google (SEO)'
  },
  'Código semântico e arquitetura rápida preparada para ranquear nas pesquisas de clientes.': {
    en: 'Semantic code and ultra-fast architecture engineered to rank for prospective client searches.',
    es: 'Código semántico y arquitectura veloz preparada para posicionarse en las búsquedas de clientes.'
  },
  'Geração Contínua de Leads': {
    en: 'Continuous Lead Generation',
    es: 'Generación Continua de Leads'
  },
  'Botões estratégicos de ação (WhatsApp/Formulários) posicionados nos pontos certos.': {
    en: 'Strategic action buttons (WhatsApp & Forms) positioned at optimal conversion points.',
    es: 'Botones estratégicos de acción (WhatsApp y Formularios) ubicados en puntos clave.'
  },
  'DESAFIOS COMERCIAIS RESOLVIDOS': {
    en: 'BUSINESS CHALLENGES RESOLVED',
    es: 'DESAFÍOS COMERCIALES RESUELTOS'
  },
  'Quais problemas um site profissional resolve na sua empresa?': {
    en: 'What business problems does a professional website solve for your company?',
    es: '¿Qué problemas comerciales resuelve un sitio web profesional en su empresa?'
  },
  'DESENVOLVIMENTO WEB PROFISSIONAL': {
    en: 'PROFESSIONAL WEB DEVELOPMENT',
    es: 'DESARROLLO WEB PROFESIONAL'
  },
  'Criação de Sites Profissionais para Empresas': {
    en: 'Professional Website Development for Businesses',
    es: 'Creación de Sitios Web Profesionales para Empresas'
  },
  'Ver Modelos de Projetos': {
    en: 'View Project Models',
    es: 'Ver Modelos de Proyectos'
  },
  'ESTRUTURA EM PÁGINA ÚNICA': {
    en: 'SINGLE PAGE STRUCTURE',
    es: 'ESTRUCTURA DE PÁGINA ÚNICA'
  },
  'Site One Page': {
    en: 'One Page Website',
    es: 'Sitio Web One Page'
  },
  'ESTRUTURA COMPLETA MULTIPÁGINAS': {
    en: 'FULL MULTI-PAGE PLATFORM',
    es: 'ESTRUCTURA MULTIPÁGINA COMPLETA'
  },
  'Website Multipáginas': {
    en: 'Multi-Page Website',
    es: 'Sitio Web Multipágina'
  },
  'PILAR TÉCNICO CONEXUS': {
    en: 'CONEXUS TECHNICAL PILLAR',
    es: 'PILAR TÉCNICO CONEXUS'
  },
  'DIFERENCIAIS EXCLUSIVOS': {
    en: 'EXCLUSIVE ADVANTAGES',
    es: 'VENTAJAS EXCLUSIVAS'
  },
  'Como Trabalhamos': {
    en: 'How We Work',
    es: 'Cómo Trabajamos'
  },
  'ETAPAS DO PROJETO': {
    en: 'PROJECT STAGES',
    es: 'ETAPAS DEL PROYECTO'
  },
  'Nosso Processo de Criação': {
    en: 'Our Creation Process',
    es: 'Nuestro Proceso de Creación'
  },
  'DÚVIDAS FREQUENTES': {
    en: 'FREQUENTLY ASKED QUESTIONS',
    es: 'PREGUNTAS FRECUENTES'
  },
  'Perguntas Frequentes sobre Criação de Sites': {
    en: 'Frequently Asked Questions about Website Development',
    es: 'Preguntas Frecuentes sobre Creación de Sitios Web'
  },
  'Mas criar um perfil no Google é apenas o começo.': {
    en: 'However, creating a Google profile is only the beginning.',
    es: 'Sin embargo, crear un perfil en Google es solo el comienzo.'
  },
  'Apenas cadastrar a empresa no Google é suficiente?': {
    en: 'Is simply registering your business on Google enough?',
    es: '¿Basta con registrar la empresa en Google?'
  },
  'Não.': {
    en: 'No.',
    es: 'No.'
  },
  'Um dos erros mais comuns é criar o perfil, preencher algumas informações e depois deixá-lo praticamente abandonado.': {
    en: 'One of the most common mistakes is setting up the profile, filling out minimal information, and then leaving it virtually abandoned.',
    es: 'Uno de los errores más frecuentes es crear el perfil, rellenar algunos datos y luego dejarlo prácticamente desatendido.'
  },
  'É aí que entra o SEO local.': {
    en: 'This is where Local SEO comes into play.',
    es: 'Ahí es donde entra el SEO local.'
  },
  'O que é SEO local?': {
    en: 'What is Local SEO?',
    es: '¿Qué es el SEO local?'
  },
  'Isso envolve muito mais do que repetir o nome da cidade várias vezes.': {
    en: 'This involves far more than simply repeating the city name multiple times.',
    es: 'Esto implica mucho más que repetir el nombre de la ciudad varias veces.'
  },
  'SEO local': {
    en: 'Local SEO',
    es: 'SEO local'
  },
  'Google e site profissional trabalham juntos': {
    en: 'Google and a professional website work together',
    es: 'Google y el sitio web profesional trabajan juntos'
  },
  'Fotos e atualizações ajudam a apresentar o negócio': {
    en: 'Photos and regular updates showcase your business',
    es: 'Las fotos y actualizaciones periódicas presentan su negocio'
  }
};

// Sentence translation dictionary mappings
const sentenceRules = [
  // General patterns
  {
    pt: /Hoje, quando alguém precisa de um serviço ou produto/g,
    en: 'Today, when someone needs a service or product',
    es: 'Hoy en día, cuando alguien necesita un servicio o producto'
  },
  {
    pt: /Para pequenas e médias empresas/g,
    en: 'For small and medium businesses',
    es: 'Para pequeñas y medianas empresas'
  },
  {
    pt: /ter uma presença sólida e profissional no Google/g,
    en: 'having a solid and professional presence on Google',
    es: 'tener una presencia sólida y profesional en Google'
  },
  {
    pt: /passou a ser uma questão fundamental de sobrevivência e crescimento/g,
    en: 'has become a vital requirement for growth and market relevance',
    es: 'se ha convertido en un factor clave de crecimiento y relevancia'
  },
  {
    pt: /Diferente das redes sociais, onde o algoritmo altera as regras constantemente/g,
    en: 'Unlike social networks where algorithms change constantly',
    es: 'A diferencia de las redes sociales, donde el algoritmo cambia constantemente'
  },
  {
    pt: /seu website é o único canal digital 100% sob seu controle/g,
    en: 'your website is the only digital channel 100% under your control',
    es: 'su sitio web es el único canal digital 100% bajo su control'
  },
  {
    pt: /Transmita imagem de empresa sólida e profissional/g,
    en: 'Convey the image of a solid, professional business',
    es: 'Transmita la imagen de una empresa sólida y profesional'
  },
  {
    pt: /Interface totalmente otimizada para smartphones/g,
    en: 'Interface fully optimized for mobile devices',
    es: 'Interfaz totalmente optimizada para smartphones'
  },
  {
    pt: /Código semântico e arquitetura rápida/g,
    en: 'Semantic code and high-speed architecture',
    es: 'Código semántico y arquitectura rápida'
  },
  {
    pt: /Botões estratégicos de ação/g,
    en: 'Strategic call-to-action buttons',
    es: 'Botones estratégicos de acción'
  },
  {
    pt: /Construído com código semântico limpo/g,
    en: 'Engineered with clean semantic code',
    es: 'Construido con código semántico limpio'
  },
  {
    pt: /Otimizamos código, arquitetura de informação e conteúdo/g,
    en: 'We optimize code, information architecture, and content',
    es: 'Optimizamos código, arquitectura de información y contenido'
  },
  {
    pt: /Desenvolvemos websites institucionais modernos, ultra-rápidos, responsivos/g,
    en: 'We develop modern, ultra-fast, responsive institutional websites',
    es: 'Desarrollamos sitios web institucionales modernos, ultra-rápidos y responsivos'
  },
  {
    pt: /Não acreditamos em soluções genéricas ou promessas ilusórias/g,
    en: 'We do not believe in generic solutions or empty promises',
    es: 'No creemos en soluciones genéricas ni promesas vacías'
  },
  {
    pt: /Cada projeto é planejado e construído sob medida/g,
    en: 'Each project is tailored and custom-built',
    es: 'Cada proyecto es planificado y desarrollado a medida'
  },
  {
    pt: /Parceria próxima e comunicação direta/g,
    en: 'Close partnership and transparent communication',
    es: 'Colaboración cercana y comunicación directa'
  },
  {
    pt: /Metodologia orientada a valor e prazos/g,
    en: 'Value and deadline-oriented methodology',
    es: 'Metodología orientada al valor y los plazos'
  },
  {
    pt: /Diagnóstico & Planejamento/g,
    en: 'Diagnosis & Strategic Planning',
    es: 'Diagnóstico y Planificación'
  },
  {
    pt: /Design & Construção/g,
    en: 'Design & Construction',
    es: 'Diseño y Construcción'
  },
  {
    pt: /Otimização SEO/g,
    en: 'SEO Optimization',
    es: 'Optimización SEO'
  },
  {
    pt: /Lançamento & Suporte/g,
    en: 'Launch & Continuous Support',
    es: 'Lanzamiento y Soporte'
  },
  {
    pt: /Pronto para fortalecer a presença digital da sua empresa\?/g,
    en: 'Ready to elevate your business\'s digital presence?',
    es: '¿Listo para impulsar la presencia digital de su empresa?'
  },
  {
    pt: /Entre em contato com nossa equipe/g,
    en: 'Get in touch with our team',
    es: 'Póngase en contacto con nuestro equipo'
  },
  {
    pt: /Quero falar com a CONEXUS/g,
    en: 'Talk to CONEXUS',
    es: 'Hablar con CONEXUS'
  }
];

// Word dictionary for thorough sweep
const fullWordDict = {
  en: [
    [/\bCriação de Sites\b/gi, 'Website Development'],
    [/\bCriação de Site\b/gi, 'Website Development'],
    [/\bCriação\b/gi, 'Creation'],
    [/\bDesenvolvimento Web\b/gi, 'Web Development'],
    [/\bDesenvolvimento\b/gi, 'Development'],
    [/\bRedes Sociais\b/gi, 'Social Media'],
    [/\bIdentidade Visual\b/gi, 'Visual Identity'],
    [/\bPresença Digital\b/gi, 'Digital Presence'],
    [/\bEstratégia Digital\b/gi, 'Digital Strategy'],
    [/\bEstratégia\b/gi, 'Strategy'],
    [/\bEstratégias\b/gi, 'Strategies'],
    [/\bEstratégico\b/gi, 'Strategic'],
    [/\bEstratégica\b/gi, 'Strategic'],
    [/\bSoluções\b/gi, 'Solutions'],
    [/\bSolução\b/gi, 'Solution'],
    [/\bServiços\b/gi, 'Services'],
    [/\bServiço\b/gi, 'Service'],
    [/\bEmpresas\b/gi, 'Businesses'],
    [/\bEmpresa\b/gi, 'Business'],
    [/\bNegócios\b/gi, 'Business Opportunities'],
    [/\bNegócio\b/gi, 'Business'],
    [/\bClientes\b/gi, 'Clients'],
    [/\bCliente\b/gi, 'Client'],
    [/\bOrçamento\b/gi, 'Proposal'],
    [/\bOrçamentos\b/gi, 'Proposals'],
    [/\bProposta\b/gi, 'Proposal'],
    [/\bPropostas\b/gi, 'Proposals'],
    [/\bAtendimento\b/gi, 'Customer Support'],
    [/\bContato\b/gi, 'Contact'],
    [/\bSobre\b/gi, 'About'],
    [/\bInício\b/gi, 'Home'],
    [/\bLocalização\b/gi, 'Location'],
    [/\bSegmento\b/gi, 'Industry'],
    [/\bEscopo\b/gi, 'Scope'],
    [/\bAno\b/gi, 'Year'],
    [/\bHospedagem\b/gi, 'Hosting'],
    [/\bHospedagens\b/gi, 'Hospitality Properties'],
    [/\bHóspedes\b/gi, 'Guests'],
    [/\bHóspede\b/gi, 'Guest'],
    [/\bAvaliações\b/gi, 'Reviews'],
    [/\bAvaliação\b/gi, 'Review'],
    [/\bPerguntas Frequentes\b/gi, 'Frequently Asked Questions'],
    [/\bResultados\b/gi, 'Results'],
    [/\bImpacto\b/gi, 'Impact'],
    [/\bDesafio\b/gi, 'Challenge'],
    [/\bPilares\b/gi, 'Pillars'],
    [/\bSua\b/gi, 'Your'],
    [/\bSeu\b/gi, 'Your'],
    [/\bSuas\b/gi, 'Your'],
    [/\bSeus\b/gi, 'Your'],
    [/\bNossa\b/gi, 'Our'],
    [/\bNosso\b/gi, 'Our'],
    [/\bNossas\b/gi, 'Our'],
    [/\bNossos\b/gi, 'Our'],
    [/\bVocê\b/gi, 'You'],
    [/\bVocês\b/gi, 'You'],
    [/\bPara\b/gi, 'For'],
    [/\bCom\b/gi, 'With'],
    [/\bSem\b/gi, 'Without'],
    [/\bComo\b/gi, 'How'],
    [/\bOnde\b/gi, 'Where'],
    [/\bQuando\b/gi, 'When'],
    [/\bPor que\b/gi, 'Why'],
    [/\bPorque\b/gi, 'Because'],
    [/\bPor isso\b/gi, 'Therefore'],
    [/\bAlém disso\b/gi, 'Furthermore'],
    [/\bPortanto\b/gi, 'Therefore'],
    [/\bConheça\b/gi, 'Discover'],
    [/\bSaiba\b/gi, 'Learn'],
    [/\bFale\b/gi, 'Talk']
  ],
  es: [
    [/\bCriação de Sites\b/gi, 'Creación de Sitios Web'],
    [/\bCriação de Site\b/gi, 'Creación de Sitios Web'],
    [/\bCriação\b/gi, 'Creación'],
    [/\bDesenvolvimento Web\b/gi, 'Desarrollo Web'],
    [/\bDesenvolvimento\b/gi, 'Desarrollo'],
    [/\bRedes Sociais\b/gi, 'Redes Sociales'],
    [/\bIdentidade Visual\b/gi, 'Identidad Visual'],
    [/\bPresença Digital\b/gi, 'Presencia Digital'],
    [/\bEstratégia Digital\b/gi, 'Estrategia Digital'],
    [/\bEstratégia\b/gi, 'Estrategia'],
    [/\bEstratégias\b/gi, 'Estrategias'],
    [/\bEstratégico\b/gi, 'Estratégico'],
    [/\bEstratégica\b/gi, 'Estratégica'],
    [/\bSoluções\b/gi, 'Soluciones'],
    [/\bSolução\b/gi, 'Solución'],
    [/\bServiços\b/gi, 'Servicios'],
    [/\bServiço\b/gi, 'Servicio'],
    [/\bEmpresas\b/gi, 'Empresas'],
    [/\bEmpresa\b/gi, 'Empresa'],
    [/\bNegócios\b/gi, 'Negocios'],
    [/\bNegócio\b/gi, 'Negocio'],
    [/\bClientes\b/gi, 'Clientes'],
    [/\bCliente\b/gi, 'Cliente'],
    [/\bOrçamento\b/gi, 'Presupuesto'],
    [/\bOrçamentos\b/gi, 'Presupuestos'],
    [/\bProposta\b/gi, 'Propuesta'],
    [/\bPropostas\b/gi, 'Propuestas'],
    [/\bAtendimento\b/gi, 'Atención al Cliente'],
    [/\bContato\b/gi, 'Contacto'],
    [/\bSobre\b/gi, 'Sobre'],
    [/\bInício\b/gi, 'Inicio'],
    [/\bLocalização\b/gi, 'Ubicación'],
    [/\bSegmento\b/gi, 'Sector'],
    [/\bEscopo\b/gi, 'Alcance'],
    [/\bAno\b/gi, 'Año'],
    [/\bHospedagem\b/gi, 'Alojamiento'],
    [/\bHospedagens\b/gi, 'Alojamientos'],
    [/\bHóspedes\b/gi, 'Huéspedes'],
    [/\bHóspede\b/gi, 'Huésped'],
    [/\bAvaliações\b/gi, 'Reseñas'],
    [/\bAvaliação\b/gi, 'Reseña'],
    [/\bPerguntas Frequentes\b/gi, 'Preguntas Frecuentes'],
    [/\bResultados\b/gi, 'Resultados'],
    [/\bImpacto\b/gi, 'Impacto'],
    [/\bDesafio\b/gi, 'Desafío'],
    [/\bPilares\b/gi, 'Pilares'],
    [/\bSua\b/gi, 'Su'],
    [/\bSeu\b/gi, 'Su'],
    [/\bSuas\b/gi, 'Sus'],
    [/\bSeus\b/gi, 'Sus'],
    [/\bNossa\b/gi, 'Nuestra'],
    [/\bNosso\b/gi, 'Nuestro'],
    [/\bNossas\b/gi, 'Nuestras'],
    [/\bNossos\b/gi, 'Nuestros'],
    [/\bVocê\b/gi, 'Usted'],
    [/\bVocês\b/gi, 'Ustedes'],
    [/\bPara\b/gi, 'Para'],
    [/\bCom\b/gi, 'Con'],
    [/\bSem\b/gi, 'Sin'],
    [/\bComo\b/gi, 'Cómo'],
    [/\bOnde\b/gi, 'Dónde'],
    [/\bQuando\b/gi, 'Cuándo'],
    [/\bPor que\b/gi, 'Por qué'],
    [/\bPorque\b/gi, 'Porque'],
    [/\bPor isso\b/gi, 'Por ello'],
    [/\bAlém disso\b/gi, 'Además'],
    [/\bPortanto\b/gi, 'Por tanto'],
    [/\bConheça\b/gi, 'Conozca'],
    [/\bSaiba\b/gi, 'Descubra'],
    [/\bFale\b/gi, 'Hable']
  ]
};

function translateUniversal(str, lang) {
  if (!str || typeof str !== 'string') return str;
  const trimmed = str.trim();

  // 1. Check exact map
  if (exactTranslations[trimmed]) {
    return exactTranslations[trimmed][lang];
  }

  let result = str;

  // 2. Check sentence patterns
  for (const item of sentenceRules) {
    if (item.pt.test(result)) {
      result = result.replace(item.pt, item[lang]);
    }
  }

  // 3. Check vocabulary rules
  const vocab = fullWordDict[lang];
  for (const [pattern, replacement] of vocab) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

// Translate all autoContent groups
for (const group in pt.autoContent || {}) {
  if (!en.autoContent) en.autoContent = {};
  if (!es.autoContent) es.autoContent = {};
  if (!en.autoContent[group]) en.autoContent[group] = {};
  if (!es.autoContent[group]) es.autoContent[group] = {};

  for (const k in pt.autoContent[group]) {
    const ptVal = pt.autoContent[group][k];
    en.autoContent[group][k] = translateUniversal(ptVal, 'en');
    es.autoContent[group][k] = translateUniversal(ptVal, 'es');
  }
}

// Translate all articlesBody
for (const k in pt.articlesBody || {}) {
  if (!en.articlesBody) en.articlesBody = {};
  if (!es.articlesBody) es.articlesBody = {};
  const ptVal = pt.articlesBody[k];
  en.articlesBody[k] = translateUniversal(ptVal, 'en');
  es.articlesBody[k] = translateUniversal(ptVal, 'es');
}

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully completed deep universal translation across en.js and es.js!');
