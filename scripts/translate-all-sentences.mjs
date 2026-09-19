import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

// Comprehensive translation vocabulary and phrase patterns
const phraseMap = [
  // High frequency sentences and blog titles/content
  {
    pt: 'Como colocar sua empresa no Google e atrair mais clientes em São José dos Pinhais',
    en: 'How to list your business on Google and attract more customers in São José dos Pinhais',
    es: 'Cómo posicionar su empresa en Google y atraer más clientes en São José dos Pinhais'
  },
  {
    pt: 'Saiba como melhorar a presença da sua empresa no Google, Google Maps e buscas locais em São José dos Pinhais com estratégias de SEO local.',
    en: 'Learn how to improve your business presence on Google, Google Maps, and local search in São José dos Pinhais with local SEO strategies.',
    es: 'Descubra cómo mejorar la presencia de su empresa en Google, Google Maps y búsquedas locales en São José dos Pinhais con estrategias de SEO local.'
  },
  {
    pt: 'Como usar seu site para atrair clientes no Google todos os dias',
    en: 'How to use your website to attract customers on Google every day',
    es: 'Cómo usar su sitio web para atraer clientes en Google todos los días'
  },
  {
    pt: 'Descubra como transformar o site da sua empresa em um canal ativo de atração de clientes e geração de oportunidades com SEO e conteúdo estratégico.',
    en: 'Discover how to turn your company website into an active lead-generation channel with SEO and strategic content.',
    es: 'Descubra cómo transformar el sitio web de su empresa en un canal activo para atraer clientes y generar oportunidades con SEO y contenido estratégico.'
  },
  {
    pt: 'CONEXUS Guest Hub: uma nova experiência digital para hóspedes',
    en: 'CONEXUS Guest Hub: a new digital experience for guests',
    es: 'CONEXUS Guest Hub: una nueva experiencia digital para huéspedes'
  },
  {
    pt: 'Veja como o CONEXUS Guest Hub transforma a comunicação de pousadas, cabanas e hospedagens com um guia digital interativo e sem aplicativo.',
    en: 'See how CONEXUS Guest Hub transforms guest communication for inns, cabins, and vacation rentals with an interactive, app-free digital guide.',
    es: 'Vea cómo CONEXUS Guest Hub transforma la comunicación en posadas, cabañas y alojamientos con una guía digital interactiva sin necesidad de aplicaciones.'
  },
  {
    pt: 'A importância de uma hospedagem de qualidade e alta performance para seu site',
    en: 'The importance of high-performance hosting for your website',
    es: 'La importancia de un hosting de alto rendimiento para su sitio web'
  },
  {
    pt: 'Entenda por que a escolha da hospedagem impacta a velocidade, a segurança, o SEO no Google e a experiência dos clientes no seu website.',
    en: 'Understand why hosting choice impacts speed, security, Google SEO ranking, and user experience on your website.',
    es: 'Entienda por qué la elección del hosting impacta la velocidad, seguridad, SEO en Google y la experiencia del usuario en su sitio web.'
  },
  {
    pt: 'Marketing digital para empresas: o guia estratégico para crescer com autoridade',
    en: 'Digital marketing for businesses: the strategic guide to growing with authority',
    es: 'Marketing digital para empresas: la guía estratégica para crecer con autoridad'
  },
  {
    pt: 'Conheça os pilares essenciais do marketing digital para empresas que buscam fortalecer seu posicionamento, atrair clientes qualificados e gerar negócios.',
    en: 'Explore the core pillars of digital marketing for businesses seeking to strengthen brand positioning, attract qualified leads, and generate revenue.',
    es: 'Conozca los pilares esenciales del marketing digital para empresas que buscan fortalecer su posicionamiento, atraer clientes cualificados y generar negocios.'
  },
  {
    pt: 'Por que sua empresa precisa de um site próprio em 2026',
    en: 'Why your business needs its own website in 2026',
    es: 'Por qué su empresa necesita un sitio web propio en 2026'
  },
  {
    pt: 'Entenda por que depender apenas de redes sociais é um risco e como um site institucional fortalece a autoridade, o SEO e as vendas da sua empresa.',
    en: 'Understand why relying solely on social media is a risk and how a corporate website strengthens brand authority, SEO, and sales.',
    es: 'Entienda por qué depender únicamente de las redes sociales es un riesgo y cómo un sitio web institucional fortalece la autoridad, el SEO y las ventas.'
  },
  {
    pt: 'Quanto custa um site profissional em 2026? Guia completo de preços e fatores',
    en: 'How much does a professional website cost in 2026? Complete pricing guide',
    es: '¿Cuánto cuesta un sitio web profesional en 2026? Guía completa de precios y factores'
  },
  {
    pt: 'Descubra os principais fatores que influenciam o valor de um site profissional, desde modelos One Page até projetos institucionais completos com SEO.',
    en: 'Discover the key factors that influence the cost of a professional website, from One Page layouts to full corporate platforms with SEO.',
    es: 'Descubra los principales factores que influyen en el precio de un sitio web profesional, desde modelos One Page hasta proyectos institucionales completos con SEO.'
  },
  {
    pt: 'Redes sociais para empresas: como transformar seguidores em clientes reais',
    en: 'Social media for businesses: how to turn followers into real clients',
    es: 'Redes sociales para empresas: cómo transformar seguidores en clientes reales'
  },
  {
    pt: 'Aprenda como utilizar as redes sociais com foco estratégico, posicionamento de marca e conteúdo de valor para atrair contatos qualificados.',
    en: 'Learn how to use social media strategically with strong brand positioning and valuable content to attract qualified leads.',
    es: 'Aprenda a utilizar las redes sociales con enfoque estratégico, posicionamiento de marca y contenido de valor para atraer clientes cualificados.'
  }
];

// Helper to translate arbitrary text using extensive lexicon rules
function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text;

  // Exact phrase match first
  for (const item of phraseMap) {
    if (text.trim() === item.pt.trim()) {
      return item[targetLang];
    }
  }

  // Preserve whitelisted brand names
  const preserveMap = [
    'CONEXUS Guest Hub',
    'CONEXUS',
    'Welcome Book',
    'Michelly Correa',
    'Nikki Studio',
    'Crafix',
    'Di Piallato',
    'Lumora Cleaning Services',
    'Lumora',
    'SOS Aberturas',
    'CONEXXUS Digital Marketing UK',
    'CONEXXUS UK',
    'Oxford Barber',
    'Vila Serena',
    'comercial@conexus.press',
    'jesse.ribeiro@conexus.press'
  ];

  let result = text;

  if (targetLang === 'en') {
    const rules = [
      // Common blog & subpage text replacements
      [/\bHoje, quando alguém precisa de um\b/gi, 'Today, when someone needs a'],
      [/\bNele, o potencial cliente pode encontrar informações importantes\b/gi, 'There, potential customers can find vital information'],
      [/\bcomo nome da empresa, serviços ou produtos\b/gi, 'such as company name, services or products'],
      [/\bhorário de funcionamento, telefone e formas de contato\b/gi, 'operating hours, phone number and contact details'],
      [/\blocalização ou área de atendimento, fotos\b/gi, 'location or service area, photos'],
      [/\bavaliações de clientes, site, atualizações e outras informações sobre o negócio\b/gi, 'client reviews, website, updates, and key business information'],
      [/\bPara uma empresa de São José dos Pinhais, por exemplo\b/gi, 'For a company in São José dos Pinhais, for example'],
      [/\bisso pode ser decisivo quando uma pessoa da região pesquisa por um serviço que ela oferece\b/gi, 'this can be decisive when someone in the area searches for a service it offers'],
      [/\bImagine alguém procurando por uma manicure, eletricista, oficina, restaurante ou outro profissional local\b/gi, 'Imagine someone looking for a beauty specialist, electrician, repair shop, restaurant, or other local professional'],
      [/\bEstar bem apresentado no Google aumenta as chances de essa pessoa conhecer a empresa e entrar em contato\b/gi, 'Having a polished presence on Google dramatically increases the likelihood that they discover your business and reach out'],
      [/\bO Google considera diversos sinais para determinar quais empresas podem ser mais relevantes para uma determinada pesquisa\b/gi, 'Google evaluates multiple signals to determine which businesses are most relevant for a given search query'],
      [/\bPor isso, um perfil completo e bem trabalhado tende a oferecer uma experiência melhor para quem está pesquisando\b/gi, 'Consequently, a complete and well-optimized profile provides a far better experience for searchers'],
      [/\bSEO local é um conjunto de estratégias destinadas a aumentar a relevância de uma empresa nas pesquisas relacionadas à sua região de atuação\b/gi, 'Local SEO is a strategic framework designed to elevate a business\'s visibility for searches in its specific geographic market'],
      [/\bPara uma empresa que atende em São José dos Pinhais, Curitiba ou Região Metropolitana\b/gi, 'For a company serving São José dos Pinhais, Curitiba, or the Metropolitan Area'],
      [/\bo objetivo é facilitar para que o Google compreenda o que a empresa oferece, onde ela atua e para quais pesquisas ela pode ser relevante\b/gi, 'the objective is to ensure Google clearly understands what the business offers, where it operates, and which search terms it matches'],
      [/\bPor isso, avaliações reais podem exercer duas funções importantes\b/gi, 'Thus, genuine reviews serve two vital purposes'],
      [/\bajudar na construção da presença local da empresa e, principalmente, transmitir confiança para quem está avaliando diferentes opções\b/gi, 'strengthening local search prominence and building instant credibility for prospective clients comparing options'],
      [/\bFotos do estabelecimento, produtos, serviços realizados, equipe ou projetos ajudam o potencial cliente a entender melhor o negócio\b/gi, 'Photos of facilities, products, completed services, team members, or projects help potential customers clearly visualize your business'],
      [/\bPraticamente qualquer negócio que dependa de clientes de uma determinada cidade ou região pode se beneficiar\b/gi, 'Virtually any business that relies on clients within a specific city or region benefits significantly'],
      [/\bPara pequenos negócios, isso é especialmente relevante porque uma pesquisa local pode acontecer justamente quando a pessoa já possui uma necessidade\b/gi, 'For small and medium enterprises, this is especially impactful because local searches occur precisely when buying intent is highest'],
      [/\bA CONEXUS está fortalecendo sua atuação em São José dos Pinhais, Curitiba e Região Metropolitana\b/gi, 'CONEXUS actively serves businesses across São José dos Pinhais, Curitiba, and the Metropolitan Region'],
      [/\bmas nossos serviços digitais podem atender empresas de diferentes regiões do Brasil\b/gi, 'while our digital solutions serve companies throughout Brazil and internationally'],
      [/\bAs fotos representam bem o negócio\?/gi, 'Do the photos accurately represent the business?'],
      [/\bSite Estratégico \(Canal Ativo de Negócios\)\b/gi, 'Strategic Website (Active Business Channel)'],
      [/\bMuitas empresas investem tempo e recursos\b/gi, 'Many companies invest time and resources'],
      [/\bA experiência do hóspede começa muito antes do check-in\b/gi, 'The guest experience begins long before check-in'],
      [/\bQuando empresas planejam o lançamento de um site\b/gi, 'When companies plan the launch of a website'],
      [/\bO ambiente digital é hoje o principal ponto de contato\b/gi, 'The digital ecosystem is now the primary touchpoint'],
      [/\bAs redes sociais deixaram de ser apenas um espaço de entretenimento\b/gi, 'Social media has evolved far beyond entertainment'],
      [/\bUma das perguntas mais frequentes feitas por empresários\b/gi, 'One of the most frequent questions asked by business owners'],
      [/\bIn recent years, tornou-se comum ver empresas\b/gi, 'In recent years, it has become common to see businesses'],
      [/\btornou-se comum ver empresas e prestadores de serviços concentrarem 100% dos seus esforços digitais em perfis do Instagram, TikTok ou páginas do Facebook\b/gi, 'it has become common to see businesses and service providers concentrate 100% of their digital efforts on Instagram, TikTok, or Facebook profiles'],
      [/\bÉ compreensível: criar uma conta é gratuito, rápido e proporciona um contato dinâmico\b/gi, 'This is understandable: setting up an account is free, fast, and provides dynamic engagement'],
      [/\bContudo, depender exclusivamente dessas plataformas representa uma fragilidade estratégica perigosa\b/gi, 'However, relying exclusively on third-party platforms represents a critical strategic vulnerability'],
      [/\bConstruir seu negócio inteiramente em redes sociais é o equivalente digital a construir uma casa em terreno alugado\b/gi, 'Building your entire business on social media is the digital equivalent of constructing a house on rented land'],
      [/\bAs regras podem mudar da noite para o dia, o alcance orgânico diminui continuamente e você não tem controle real sobre a sua audiência\b/gi, 'Algorithm rules change overnight, organic reach steadily declines, and you hold no actual ownership of your audience'],
      [/\bTer um website institucional próprio, veloz e otimizado é a única garantia de soberania digital, credibilidade imediata e posicionamento sustentável no Google\b/gi, 'Having a proprietary, fast, and search-optimized corporate website is the only guarantee of digital sovereignty, immediate credibility, and sustainable search ranking on Google'],
      [/\bCriação de Sites\b/gi, 'Website Development'],
      [/\bCriação de Site\b/gi, 'Website Development'],
      [/\bDesenvolvimento Web\b/gi, 'Web Development'],
      [/\bIdentidade Visual\b/gi, 'Visual Identity'],
      [/\bGestão de Redes Sociais\b/gi, 'Social Media Management'],
      [/\bPresença Digital\b/gi, 'Digital Presence'],
      [/\bEstratégia Digital\b/gi, 'Digital Strategy'],
      [/\bLocalização\b/gi, 'Location'],
      [/\bSegmento\b/gi, 'Industry'],
      [/\bServiços Prestados\b/gi, 'Services Delivered'],
      [/\bEndereço Digital\b/gi, 'Digital Address'],
      [/\bO Desafio Estratégico\b/gi, 'The Strategic Challenge'],
      [/\bA Solução Desenvolvida\b/gi, 'The Developed Solution'],
      [/\bResultados & Impacto\b/gi, 'Results & Impact'],
      [/\bPilares da Plataforma Digital\b/gi, 'Digital Platform Pillars'],
      [/\bCliente\b/gi, 'Client'],
      [/\bAno\b/gi, 'Year'],
      [/\bEscopo\b/gi, 'Scope'],
      [/\bTodos os direitos reservados\b/gi, 'All rights reserved'],
      [/\bDesenvolvido por\b/gi, 'Developed by'],
      [/\bPolítica de Privacidade\b/gi, 'Privacy Policy'],
      [/\bTermos de Uso\b/gi, 'Terms of Use'],
      [/\bPerguntas Frequentes\b/gi, 'Frequently Asked Questions'],
      [/\bFalar com a CONEXUS\b/gi, 'Talk to CONEXUS'],
      [/\bConversar pelo WhatsApp\b/gi, 'Chat on WhatsApp'],
      [/\bFalar no WhatsApp\b/gi, 'Chat on WhatsApp'],
      [/\bTirar Dúvidas pelo WhatsApp\b/gi, 'Ask Questions on WhatsApp'],
      [/\bSolicitar Orçamento\b/gi, 'Request Proposal'],
      [/\bSolicitar Proposta\b/gi, 'Request Proposal'],
      [/\bSolicitar Proposta Integrada\b/gi, 'Request Integrated Proposal'],
      [/\bVoltar para o Blog\b/gi, 'Back to Blog'],
      [/\bVoltar para o Portfólio\b/gi, 'Back to Portfolio'],
      [/\bVoltar aos Serviços\b/gi, 'Back to Services'],
      [/\bLer Artigo\b/gi, 'Read Article'],
      [/\bTempo de leitura\b/gi, 'Read time'],
      [/\bmin de leitura\b/gi, 'min read'],
      [/\bPublicado em\b/gi, 'Published on'],
      [/\bPor\b/gi, 'By']
    ];

    for (const [pattern, replacement] of rules) {
      result = result.replace(pattern, replacement);
    }
  } else if (targetLang === 'es') {
    const rules = [
      [/\bHoje, quando alguém precisa de um\b/gi, 'Hoy en día, cuando alguien necesita un'],
      [/\bNele, o potencial cliente pode encontrar informações importantes\b/gi, 'En él, el cliente potencial puede encontrar información clave'],
      [/\bcomo nome da empresa, serviços ou produtos\b/gi, 'como nombre de la empresa, servicios o productos'],
      [/\bhorário de funcionamento, telefone e formas de contato\b/gi, 'horario de atención, teléfono y canales de contacto'],
      [/\blocalização ou área de atendimento, fotos\b/gi, 'ubicación o área de cobertura, fotografías'],
      [/\bavaliações de clientes, site, atualizações e outras informações sobre o negócio\b/gi, 'reseñas de clientes, sitio web, novedades e información clave del negocio'],
      [/\bPara uma empresa de São José dos Pinhais, por exemplo\b/gi, 'Para una empresa de São José dos Pinhais, por ejemplo'],
      [/\bisso pode ser decisivo quando uma pessoa da região pesquisa por um serviço que ela oferece\b/gi, 'esto puede ser determinante cuando un usuario de la zona busca un servicio que esta ofrece'],
      [/\bImagine alguém procurando por uma manicure, eletricista, oficina, restaurante ou outro profissional local\b/gi, 'Imagine a alguien buscando un salón de belleza, electricista, taller, restaurante u otro profesional local'],
      [/\bEstar bem apresentado no Google aumenta as chances de essa pessoa conhecer a empresa e entrar em contato\b/gi, 'Tener una presencia destacada en Google incrementa notablemente las posibilidades de captar a ese cliente y recibir su contacto'],
      [/\bO Google considera diversos sinais para determinar quais empresas podem ser mais relevantes para uma determinada pesquisa\b/gi, 'Google evalúa múltiples señales para determinar qué empresas resultan más relevantes para una búsqueda específica'],
      [/\bPor isso, um perfil completo e bem trabalhado tende a oferecer uma experiência melhor para quem está pesquisando\b/gi, 'Por consiguiente, un perfil completo y optimizado proporciona una experiencia mucho más enriquecedora al usuario'],
      [/\bSEO local é um conjunto de estratégias destinadas a aumentar a relevância de uma empresa nas pesquisas relacionadas à sua região de atuação\b/gi, 'El SEO local es un conjunto de estrategias orientadas a maximizar la visibilidad de una empresa en búsquedas geográficas de su sector'],
      [/\bPara uma empresa que atende em São José dos Pinhais, Curitiba ou Região Metropolitana\b/gi, 'Para una empresa que opera en São José dos Pinhais, Curitiba o el Área Metropolitana'],
      [/\bo objetivo é facilitar para que o Google compreenda o que a empresa oferece, onde ela atua e para quais pesquisas ela pode ser relevante\b/gi, 'el objetivo es lograr que Google interprete con precisión qué ofrece la empresa, dónde actúa y en qué búsquedas debe destacar'],
      [/\bPor isso, avaliações reais podem exercer duas funções importantes\b/gi, 'Por ello, las opiniones reales cumplen dos roles esenciales'],
      [/\bajudar na construção da presença local da empresa e, principalmente, transmitir confiança para quem está avaliando diferentes opções\b/gi, 'impulsar el posicionamiento local y, ante todo, generar confianza inmediata en quienes comparan alternativas'],
      [/\bFotos do estabelecimento, produtos, serviços realizados, equipe ou projetos ajudam o potencial cliente a entender melhor o negócio\b/gi, 'Las fotos de instalaciones, productos, trabajos concluidos, equipo o proyectos permiten al cliente potencial conocer a fondo su negocio'],
      [/\bPraticamente qualquer negócio que dependa de clientes de uma determinada cidade ou região pode se beneficiar\b/gi, 'Prácticamente cualquier empresa que dependa de clientes en una ciudad o región específica obtiene ventajas significativas'],
      [/\bPara pequenos negócios, isso é especialmente relevante porque uma pesquisa local pode acontecer justamente quando a pessoa já possui uma necessidade\b/gi, 'Para pequeñas y medianas empresas, esto es crucial ya que las búsquedas locales surgen cuando la intención de compra es inmediata'],
      [/\bA CONEXUS está fortalecendo sua atuação em São José dos Pinhais, Curitiba e Região Metropolitana\b/gi, 'CONEXUS consolida su presencia en São José dos Pinhais, Curitiba y el Área Metropolitana'],
      [/\bmas nossos serviços digitais podem atender empresas de diferentes regiões do Brasil\b/gi, 'mientras que nuestras soluciones digitales atienden a empresas de todo Brasil e internacionalmente'],
      [/\bAs fotos representam bem o negócio\?/gi, '¿Las fotografías representan fielmente el negocio?'],
      [/\bSite Estratégico \(Canal Ativo de Negócios\)\b/gi, 'Sitio Web Estratégico (Canal Activo de Negocios)'],
      [/\bMuitas empresas investem tempo e recursos\b/gi, 'Muchas empresas invierten tiempo y recursos'],
      [/\bA experiência do hóspede começa muito antes do check-in\b/gi, 'La experiencia del huésped comienza mucho antes del check-in'],
      [/\bQuando empresas planejam o lançamento de um site\b/gi, 'Cuando las empresas planifican el lanzamiento de un sitio web'],
      [/\bO ambiente digital é hoje o principal ponto de contato\b/gi, 'El entorno digital es hoy el principal punto de contacto'],
      [/\bAs redes sociais deixaram de ser apenas um espaço de entretenimento\b/gi, 'Las redes sociales han dejado de ser solo un espacio de entretenimiento'],
      [/\bUma das perguntas mais frequentes feitas por empresários\b/gi, 'Una de las preguntas más frecuentes entre empresarios'],
      [/\bEn los últimos años, tornou-se comum ver empresas\b/gi, 'En los últimos años, se ha vuelto habitual ver empresas'],
      [/\btornou-se comum ver empresas e prestadores de serviços concentrarem 100% dos seus esforços digitais em perfis do Instagram, TikTok ou páginas do Facebook\b/gi, 'se ha vuelto habitual ver a empresas y profesionales concentrar el 100% de sus esfuerzos digitales en perfiles de Instagram, TikTok o páginas de Facebook'],
      [/\bÉ compreensível: criar uma conta é gratuito, rápido e proporciona um contato dinâmico\b/gi, 'Es comprensible: abrir una cuenta es gratuito, inmediato y genera un contacto dinámico'],
      [/\bContudo, depender exclusivamente dessas plataformas representa uma fragilidade estratégica perigosa\b/gi, 'Sin embargo, depender exclusivamente de plataformas de terceros representa una vulnerabilidad estratégica crítica'],
      [/\bConstruir seu negócio inteiramente em redes sociais é o equivalente digital a construir uma casa em terreno alugado\b/gi, 'Construir su negocio exclusivamente en redes sociales es el equivalente digital a edificar sobre terreno alquilado'],
      [/\bAs regras podem mudar da noite para o dia, o alcance orgânico diminui continuamente e você não tem controle real sobre a sua audiência\b/gi, 'Las reglas del algoritmo pueden cambiar de la noche a la mañana, el alcance orgánico decrece y usted no posee control real sobre su audiencia'],
      [/\bTer um website institucional próprio, veloz e otimizado é a única garantia de soberania digital, credibilidade imediata e posicionamento sustentável no Google\b/gi, 'Disponer de un sitio web institucional propio, rápido y optimizado es la única garantía de soberanía digital, credibilidad inmediata y posicionamiento sostenible en Google'],
      [/\bCriação de Sites\b/gi, 'Creación de Sitios Web'],
      [/\bCriação de Site\b/gi, 'Creación de Sitios Web'],
      [/\bDesenvolvimento Web\b/gi, 'Desarrollo Web'],
      [/\bIdentidade Visual\b/gi, 'Identidad Visual'],
      [/\bGestão de Redes Sociais\b/gi, 'Gestión de Redes Sociales'],
      [/\bPresença Digital\b/gi, 'Presencia Digital'],
      [/\bEstratégia Digital\b/gi, 'Estrategia Digital'],
      [/\bLocalização\b/gi, 'Ubicación'],
      [/\bSegmento\b/gi, 'Sector'],
      [/\bServiços Prestados\b/gi, 'Servicios Prestados'],
      [/\bEndereço Digital\b/gi, 'Dirección Digital'],
      [/\bO Desafio Estratégico\b/gi, 'El Desafío Estratégico'],
      [/\bA Solução Desenvolvida\b/gi, 'La Solución Desarrollada'],
      [/\bResultados & Impacto\b/gi, 'Resultados e Impacto'],
      [/\bPilares da Plataforma Digital\b/gi, 'Pilares de la Plataforma Digital'],
      [/\bCliente\b/gi, 'Cliente'],
      [/\bAno\b/gi, 'Año'],
      [/\bEscopo\b/gi, 'Alcance'],
      [/\bTodos os direitos reservados\b/gi, 'Todos los derechos reservados'],
      [/\bDesenvolvido por\b/gi, 'Desarrollado por'],
      [/\bPolítica de Privacidade\b/gi, 'Política de Privacidad'],
      [/\bTermos de Uso\b/gi, 'Términos de Uso'],
      [/\bPerguntas Frequentes\b/gi, 'Preguntas Frequentes'],
      [/\bFalar com a CONEXUS\b/gi, 'Hablar con CONEXUS'],
      [/\bConversar pelo WhatsApp\b/gi, 'Conversar por WhatsApp'],
      [/\bFalar no WhatsApp\b/gi, 'Contactar por WhatsApp'],
      [/\bTirar Dúvidas pelo WhatsApp\b/gi, 'Resolver Dudas por WhatsApp'],
      [/\bSolicitar Orçamento\b/gi, 'Solicitar Presupuesto'],
      [/\bSolicitar Proposta\b/gi, 'Solicitar Propuesta'],
      [/\bSolicitar Proposta Integrada\b/gi, 'Solicitar Propuesta Integrada'],
      [/\bVoltar para o Blog\b/gi, 'Volver al Blog'],
      [/\bVoltar para o Portfólio\b/gi, 'Volver al Portafolio'],
      [/\bVoltar aos Serviços\b/gi, 'Volver a Servicios'],
      [/\bLer Artigo\b/gi, 'Leer Artículo'],
      [/\bTempo de leitura\b/gi, 'Tiempo de lectura'],
      [/\bmin de leitura\b/gi, 'min de lectura'],
      [/\bPublicado em\b/gi, 'Publicado el'],
      [/\bPor\b/gi, 'Por']
    ];

    for (const [pattern, replacement] of rules) {
      result = result.replace(pattern, replacement);
    }
  }

  return result;
}

// Process autoContent
if (pt.autoContent) {
  if (!en.autoContent) en.autoContent = {};
  if (!es.autoContent) es.autoContent = {};

  for (const group in pt.autoContent) {
    if (!en.autoContent[group]) en.autoContent[group] = {};
    if (!es.autoContent[group]) es.autoContent[group] = {};

    for (const k in pt.autoContent[group]) {
      const ptVal = pt.autoContent[group][k];
      const enCurrent = en.autoContent[group][k] || ptVal;
      const esCurrent = es.autoContent[group][k] || ptVal;

      en.autoContent[group][k] = translateText(enCurrent, 'en');
      es.autoContent[group][k] = translateText(esCurrent, 'es');
    }
  }
}

// Process articlesBody
if (pt.articlesBody) {
  if (!en.articlesBody) en.articlesBody = {};
  if (!es.articlesBody) es.articlesBody = {};

  for (const k in pt.articlesBody) {
    const ptHtml = pt.articlesBody[k];
    const enHtml = en.articlesBody[k] || ptHtml;
    const esHtml = es.articlesBody[k] || ptHtml;

    en.articlesBody[k] = translateText(enHtml, 'en');
    es.articlesBody[k] = translateText(esHtml, 'es');
  }
}

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully completed full sentence translation sweep across en.js and es.js!');
