const fs = require('fs');
const path = require('path');

const ptKeys = {
  aboutInternational: {
    badge: "PRESENÇA INTERNACIONAL",
    title: "Conexão Brasil & Reino Unido",
    desc: "A CONEXUS Digital Solutions desenvolve soluções estratégicas no Brasil com uma visão global conectada às melhores práticas internacionais de tecnologia e marketing digital.",
    brTitle: "CONEXUS Digital Solutions",
    brRegion: "Brasil • Curitiba e Região Metropolitana",
    brDesc: "Operação brasileira focada em websites profissionais de alta conversão, engenharia SEO, otimização de busca local no Google, branding e desenvolvimento de aplicativos. Atendimento especializado a pequenas e médias empresas e indústrias nacionais.",
    ukTitle: "CONEXXUS",
    ukRegion: "Reino Unido & Europa • Swindon",
    ukDesc: "Marca dedicada ao mercado britânico e europeu, entregando websites corporativos, estratégias de SEO internacional e arquitetura digital com rigor de performance alinhado aos padrões europeus de usabilidade e privacidade.",
    viewCase: "Ver case no portfólio"
  },
  blog_card_presenca_internacional_tag: "PRESENÇA INTERNACIONAL",
  blog_card_presenca_internacional_title: "CONEXUS no Brasil e CONEXXUS no Reino Unido: Nossa Presença e Visão Internacional",
  blog_card_presenca_internacional_desc: "Conheça como a atuação combinada entre a CONEXUS Digital Solutions no Brasil e a marca CONEXXUS no Reino Unido fortalece projetos web com inovação, performance e padrões globais.",
  blog_card_presenca_internacional_readTime: "8 min de leitura",
  blog_presencaInternacional_category: "Institucional",
  blog_presencaInternacional_date: "25/10/2026",
  blog_presencaInternacional_readTime: "8 min",
  blog_presencaInternacional_title: "CONEXUS no Brasil e CONEXXUS no Reino Unido: Nossa Presença e Visão Internacional",
  blog_presencaInternacional_desc: "Conheça a atuação estratégica da CONEXUS Digital Solutions no Brasil e da CONEXXUS no Reino Unido, unindo engenharia web, SEO e inovação digital com visão global.",
  blog_presencaInternacional_sec1_h2: "1. Duas Operações Estratégicas, Uma Mesma Filosofia de Engenharia",
  blog_presencaInternacional_sec1_p1: "A expansão e atuação da CONEXUS é pautada por um princípio claro: construir infraestruturas digitais de altíssimo desempenho, design funcional e resultados comerciais reais para empresas. No mercado brasileiro, atuamos como CONEXUS Digital Solutions, desenvolvendo soluções integradas de websites multipáginas, SEO técnico, Google Perfil de Empresa, branding e aplicativos móveis com forte enraizamento local e atendimento consultivo.",
  blog_presencaInternacional_sec1_p2: "Paralelamente, para atender demandas corporativas no mercado britânico e europeu, consolidamos a marca CONEXXUS (com presença digital em conexxus.press). Essa frente internacional assegura que metodologias globais de usabilidade, privacidade de dados e rigor técnico sejam compartilhadas de forma contínua entre nossas iniciativas.",
  blog_presencaInternacional_sec2_h2: "2. CONEXUS Digital Solutions no Brasil: Soluções de Alta Conversão",
  blog_presencaInternacional_sec2_p1: "Com base em Curitiba e Região Metropolitana, a CONEXUS Digital Solutions atende pequenas, médias e grandes empresas em todo o território nacional. Diferente de agências tradicionais que entregam sites lentos baseados em construtores genéricos, nossa engenharia prioriza carregamento ultrarrápido (95+ no Google PageSpeed), conformidade total com a LGPD e otimização semântica para posicionamento orgânico nas primeiras posições de busca.",
  blog_presencaInternacional_sec2_p2: "Além do desenvolvimento web, criamos soluções proprietárias como o aplicativo de finanças pessoais GRANA e o sistema de guia interativo Welcome Book Digital para anfitriões e hotelaria boutique.",
  blog_presencaInternacional_sec3_h2: "3. CONEXXUS no Reino Unido: Padrões Europeus e Desempenho Técnico",
  blog_presencaInternacional_sec3_p1: "A marca CONEXXUS no Reino Unido nasceu para responder às exigências específicas do mercado europeu: conformidade com o GDPR, tipografia internacional contemporânea, infraestrutura distribuída com baixa latência e SEO multirregional para empresas de serviços, tecnologia e comércio.",
  blog_presencaInternacional_sec3_p2: "Cases como Nikki Studio (Swindon, UK), Lumora Cleaning Services e Crafix exemplificam nossa habilidade em posicionar marcas locais e regionais na Europa com autoridade visual e excelente retorno sobre investimento.",
  blog_presencaInternacional_sec4_h2: "4. Integração Contínua e Compromisso com a Qualidade",
  blog_presencaInternacional_sec4_p1: "Essa articulação internacional fortalece diretamente os clientes de ambas as pontas. Empresas no Brasil recebem projetos desenhados com os mais avançados conceitos de design e performance validados no ecossistema europeu, enquanto parceiros no Reino Unido contam com agilidade e capacidade de entrega contínua.",
  blog_presencaInternacional_sec4_p2: "A CONEXUS segue expandindo sua atuação com transparência, independência operacional e rigor técnico em cada linha de código entregue.",
  blog_presencaInternacional_faq1_q: "Qual é a relação entre a CONEXUS no Brasil e a CONEXXUS no Reino Unido?",
  blog_presencaInternacional_faq1_a: "CONEXUS Digital Solutions é a marca e operação brasileira, enquanto CONEXXUS é a marca utilizada para atender o mercado do Reino Unido e da Europa, compartilhando métodos de engenharia e altos padrões técnicos.",
  blog_presencaInternacional_faq2_q: "Onde posso conhecer o site oficial da operação britânica?",
  blog_presencaInternacional_faq2_a: "A plataforma britânica da CONEXXUS está disponível publicamente em https://conexxus.press e possui case detalhado em nosso portfólio."
};

const enKeys = {
  aboutInternational: {
    badge: "INTERNATIONAL PRESENCE",
    title: "Brazil & United Kingdom Connection",
    desc: "CONEXUS Digital Solutions develops strategic solutions in Brazil with a global vision connected to international best practices in technology and digital marketing.",
    brTitle: "CONEXUS Digital Solutions",
    brRegion: "Brazil • Curitiba & Metropolitan Area",
    brDesc: "Brazilian operation focused on high-conversion professional websites, SEO engineering, Google Local search optimization, branding, and mobile app development. Specialized support for small and medium businesses and national industries.",
    ukTitle: "CONEXXUS",
    ukRegion: "United Kingdom & Europe • Swindon",
    ukDesc: "Brand dedicated to the British and European market, delivering corporate websites, international SEO strategies, and digital architecture built with performance standards aligned to European usability and privacy requirements.",
    viewCase: "View case study in portfolio"
  },
  blog_card_presenca_internacional_tag: "INTERNATIONAL PRESENCE",
  blog_card_presenca_internacional_title: "CONEXUS in Brazil and CONEXXUS in the UK: Our International Presence and Vision",
  blog_card_presenca_internacional_desc: "Discover how the combined operations of CONEXUS Digital Solutions in Brazil and the CONEXXUS brand in the UK elevate web projects through innovation, performance, and global standards.",
  blog_card_presenca_internacional_readTime: "8 min read",
  blog_presencaInternacional_category: "Institutional",
  blog_presencaInternacional_date: "25/10/2026",
  blog_presencaInternacional_readTime: "8 min",
  blog_presencaInternacional_title: "CONEXUS in Brazil and CONEXXUS in the UK: Our International Presence and Vision",
  blog_presencaInternacional_desc: "Explore the strategic presence of CONEXUS Digital Solutions in Brazil and CONEXXUS in the UK, uniting web engineering, SEO, and digital innovation with a global vision.",
  blog_presencaInternacional_sec1_h2: "1. Two Strategic Operations, One Shared Engineering Philosophy",
  blog_presencaInternacional_sec1_p1: "CONEXUS operations are guided by a single core principle: engineering high-performance digital infrastructure, functional design, and tangible commercial growth. In Brazil, we operate as CONEXUS Digital Solutions, delivering end-to-end multi-page web architecture, technical SEO, Google Business Profile management, branding, and mobile apps tailored for Brazilian enterprises.",
  blog_presencaInternacional_sec1_p2: "In parallel, to serve corporate demands across the British and European markets, we established the CONEXXUS brand (accessible at conexxus.press). This international presence ensures continuous cross-pollination of European usability benchmarks, data privacy compliance, and strict engineering standards.",
  blog_presencaInternacional_sec2_h2: "2. CONEXUS Digital Solutions in Brazil: High-Conversion Digital Architecture",
  blog_presencaInternacional_sec2_p1: "Based in Curitiba and its metropolitan area, CONEXUS Digital Solutions serves small, medium, and expanding enterprises throughout Brazil. Unlike traditional agencies relying on heavy generic page builders, our engineering prioritizes lightning-fast loading (95+ on Google PageSpeed), LGPD privacy compliance, and deep semantic SEO for durable organic rankings.",
  blog_presencaInternacional_sec2_p2: "Beyond web development, we build proprietary digital products, including the GRANA personal finance app published on Google Play and the Welcome Book Digital interactive concierge system for hospitality hosts.",
  blog_presencaInternacional_sec3_h2: "3. CONEXXUS in the United Kingdom: European Standards and Technical Rigour",
  blog_presencaInternacional_sec3_p1: "The CONEXXUS brand in the UK is tailored to the demanding British and European environment: strict GDPR compliance, contemporary international typography, low-latency distributed cloud hosting, and multi-regional SEO for service, technology, and commercial firms.",
  blog_presencaInternacional_sec3_p2: "Completed projects such as Nikki Studio (Swindon, UK), Lumora Cleaning Services, and Crafix demonstrate our capability to establish regional European businesses with strong visual authority and sustainable client acquisition.",
  blog_presencaInternacional_sec4_h2: "4. Continuous Synergy and Uncompromising Quality",
  blog_presencaInternacional_sec4_p1: "This dual-market footprint directly benefits clients across both regions. Brazilian companies gain digital platforms engineered with cutting-edge European design and performance frameworks, while UK partners benefit from agile, robust, and continuous delivery capabilities.",
  blog_presencaInternacional_sec4_p2: "CONEXUS continues expanding its reach with transparency, operational clarity, and unwavering technical rigor in every line of code deployed.",
  blog_presencaInternacional_faq1_q: "What is the relationship between CONEXUS in Brazil and CONEXXUS in the UK?",
  blog_presencaInternacional_faq1_a: "CONEXUS Digital Solutions is the Brazilian operating brand, while CONEXXUS is the dedicated brand serving the UK and European market, sharing unified engineering methodologies and high technical standards.",
  blog_presencaInternacional_faq2_q: "Where can I view the official website of the UK operation?",
  blog_presencaInternacional_faq2_a: "The official British platform of CONEXXUS is publicly available at https://conexxus.press and features a dedicated case study in our portfolio."
};

const esKeys = {
  aboutInternational: {
    badge: "PRESENCIA INTERNACIONAL",
    title: "Conexión Brasil y Reino Unido",
    desc: "CONEXUS Digital Solutions desarrolla soluciones estratégicas en Brasil con una visión global conectada a las mejores prácticas internacionales de tecnología y marketing digital.",
    brTitle: "CONEXUS Digital Solutions",
    brRegion: "Brasil • Curitiba y Región Metropolitana",
    brDesc: "Operación brasileña enfocada en sitios web profesionales de alta conversión, ingeniería SEO, optimización de búsqueda local en Google, branding y desarrollo de aplicaciones móviles. Atención especializada a pequeñas y medianas empresas e industrias nacionales.",
    ukTitle: "CONEXXUS",
    ukRegion: "Reino Unido y Europa • Swindon",
    ukDesc: "Marca dedicada al mercado británico y europeo, entregando sitios web corporativos, estrategias de SEO internacional y arquitectura digital con rigor de rendimiento alineado a los estándares europeos de usabilidad y privacidad.",
    viewCase: "Ver caso en el portafolio"
  },
  blog_card_presenca_internacional_tag: "PRESENCIA INTERNACIONAL",
  blog_card_presenca_internacional_title: "CONEXUS en Brasil y CONEXXUS en el Reino Unido: Nuestra Presencia y Visión Internacional",
  blog_card_presenca_internacional_desc: "Conozca cómo la actuación combinada entre CONEXUS Digital Solutions en Brasil y la marca CONEXXUS en el Reino Unido potencia proyectos web con innovación, rendimiento y estándares globales.",
  blog_card_presenca_internacional_readTime: "8 min de lectura",
  blog_presencaInternacional_category: "Institucional",
  blog_presencaInternacional_date: "25/10/2026",
  blog_presencaInternacional_readTime: "8 min",
  blog_presencaInternacional_title: "CONEXUS en Brasil y CONEXXUS en el Reino Unido: Nuestra Presencia y Visión Internacional",
  blog_presencaInternacional_desc: "Conozca la actuación estratégica de CONEXUS Digital Solutions en Brasil y CONEXXUS en el Reino Unido, uniendo ingeniería web, SEO e innovación digital con visión global.",
  blog_presencaInternacional_sec1_h2: "1. Dos Operaciones Estratégicas, Una Misma Filosofía de Ingeniería",
  blog_presencaInternacional_sec1_p1: "La expansión y actuación de CONEXUS se fundamenta en un principio claro: construir infraestructura digital de alto rendimiento, diseño funcional y resultados comerciales reales. En Brasil, operamos como CONEXUS Digital Solutions, desarrollando plataformas web multipágina, SEO técnico, Google Perfil de Empresa, branding y aplicaciones móviles adaptadas a empresas locales.",
  blog_presencaInternacional_sec1_p2: "Paralelamente, para atender las demandas del mercado británico y europeo, consolidamos la marca CONEXXUS (con presencia en conexxus.press). Este enfoque internacional garantiza la aplicación de estándares europeos de usabilidad, privacidad de datos y rigor técnico de manera continua.",
  blog_presencaInternacional_sec2_h2: "2. CONEXUS Digital Solutions en Brasil: Soluciones de Alta Conversión",
  blog_presencaInternacional_sec2_p1: "Con base en Curitiba y su región metropolitana, CONEXUS Digital Solutions atiende a pequeñas, medianas y grandes empresas en todo Brasil. A diferencia de las agencias tradicionales, priorizamos la máxima velocidad de carga (95+ en Google PageSpeed), cumplimiento de normativas de privacidad y optimización semántica para los primeros puestos en Google.",
  blog_presencaInternacional_sec2_p2: "Además del desarrollo web, desarrollamos productos tecnológicos propios como la app de finanzas personales GRANA y el sistema interactivo Welcome Book Digital para alojamientos turísticos.",
  blog_presencaInternacional_sec3_h2: "3. CONEXXUS en el Reino Unido: Estándares Europeos y Rendimiento Técnico",
  blog_presencaInternacional_sec3_p1: "La marca CONEXXUS en el Reino Unido responde a las exigencias del mercado europeo: cumplimiento riguroso del GDPR, tipografía contemporánea, infraestructura en la nube de baja latencia y SEO multirregional para empresas de servicios y tecnología.",
  blog_presencaInternacional_sec3_p2: "Proyectos como Nikki Studio (Swindon, UK), Lumora Cleaning Services y Crafix demuestran nuestra capacidad para posicionar negocios en Europa con autoridad visual y atracción efectiva de clientes.",
  blog_presencaInternacional_sec4_h2: "4. Sinergia Continua y Compromiso con la Calidad",
  blog_presencaInternacional_sec4_p1: "Esta articulación internacional beneficia directamente a los clientes de ambos lados. Las empresas en Brasil reciben plataformas diseñadas con los estándares más avanzados de rendimiento y diseño de Europa, mientras que los clientes en el Reino Unido cuentan con agilidad y solidez técnica continua.",
  blog_presencaInternacional_sec4_p2: "CONEXUS continúa expandiendo su alcance con transparencia, claridad operativa y rigor técnico en cada solución implementada.",
  blog_presencaInternacional_faq1_q: "¿Cuál es la relación entre CONEXUS en Brasil y CONEXXUS en el Reino Unido?",
  blog_presencaInternacional_faq1_a: "CONEXUS Digital Solutions es la marca y operación brasileña, mientras que CONEXXUS es la marca dedicada al mercado del Reino Unido y Europa, compartiendo metodologías de ingeniería y altos estándares de rendimiento.",
  blog_presencaInternacional_faq2_q: "¿Dónde puedo consultar el sitio web oficial de la operación británica?",
  blog_presencaInternacional_faq2_a: "La plataforma británica oficial de CONEXXUS se encuentra disponible públicamente en https://conexxus.press y cuenta con un caso detallado en nuestro portafolio."
};

function injectKeys(filePath, newKeysObj) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Find the closing brace and semicolon at the end of export const pt/en/es = { ... };
  const lastIndex = content.lastIndexOf('};');
  if (lastIndex === -1) {
    throw new Error(`Could not find closing '};' in ${filePath}`);
  }

  // Format new keys as JSON lines indented with 2 spaces
  let entries = [];
  for (const [k, v] of Object.entries(newKeysObj)) {
    if (typeof v === 'object') {
      entries.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v, null, 4).replace(/\n/g, '\n  ')}`);
    } else {
      entries.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
    }
  }

  const toInject = ',\n' + entries.join(',\n') + '\n';
  const updated = content.slice(0, lastIndex) + toInject + content.slice(lastIndex);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`Updated ${filePath}`);
}

injectKeys(path.join(__dirname, '../src/i18n/pt.js'), ptKeys);
injectKeys(path.join(__dirname, '../src/i18n/en.js'), enKeys);
injectKeys(path.join(__dirname, '../src/i18n/es.js'), esKeys);
console.log('Phase 3 i18n keys successfully injected!');
