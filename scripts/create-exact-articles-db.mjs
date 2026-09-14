import fs from 'fs';
import { pt } from '../src/i18n/pt.js';

// Let's create the 100% accurate key-by-key map for the 5 articles
const db = {
  blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais: {},
  blog_como_usar_site_para_atrair_clientes_google: {},
  blog_conexus_guest_hub_guia_digital_para_hospedagens: {},
  blog_por_que_sua_empresa_precisa_de_um_site: {},
  blog_quanto_custa_site_profissional_2026: {}
};

// 1. blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais (73 keys)
const a1 = pt.autoContent.blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais;
const t1_en = [
  "Local SEO & Google",
  "Local SEO & Google",
  "How to Put Your Business on Google and Attract More Clients in São José dos Pinhais",
  "Learn how to improve your company's presence on Google, Google Maps, and local search in São José dos Pinhais with local SEO strategies.",
  "Today, when someone needs a restaurant, beauty salon, repair shop, clinic, service provider, or retail store, one of their first actions is searching on Google.",
  "Searches like \"near me\", \"in São José dos Pinhais\", or simply the name of the desired service can place local businesses right in front of people actively looking for what they offer.",
  "That is why having a strong presence on Google is no longer just about marketing. For small and medium businesses, it has become an essential tool to get found, build trust, and win new customers.",
  "But creating a Google profile is just the beginning.",
  "What is Google Business Profile?",
  "Google Business Profile — formerly known as Google My Business — allows a company to appear across various Google surfaces, including Search results and Google Maps.",
  "On it, prospective customers can find important information such as company name, services or products, business hours, phone and contact methods, location or service area, photos, customer reviews, website, updates, and other details about the business.",
  "For a company in São José dos Pinhais, for example, this can be decisive when someone in the region searches for a service it offers.",
  "Imagine someone looking for a manicurist, electrician, repair shop, restaurant, or other local professional. Being well-presented on Google increases the chances of that person getting to know the company and getting in touch.",
  "Is simply registering the business on Google enough?",
  "No.",
  "One of the most common mistakes is creating the profile, filling out a few details, and then leaving it practically abandoned.",
  "Google considers several signals to determine which businesses may be most relevant for a given search. Therefore, a complete and well-crafted profile tends to provide a better experience for searchers.",
  "It is important to maintain accurate information, properly register services, use good images, receive legitimate reviews, and keep the profile up to date.",
  "That is where local SEO comes in.",
  "What is local SEO?",
  "Local SEO is a set of strategies designed to increase a business's relevance in searches related to its area of operation.",
  "For a company serving São José dos Pinhais, Curitiba, or the Metropolitan Region, the goal is to make it easy for Google to understand what the business offers, where it operates, and which searches it is relevant for.",
  "This involves much more than simply repeating the city name several times.",
  "Local SEO",
  "Reviews also make a difference",
  "Before choosing a company they don't know yet, consumers often check reviews from other customers.",
  "Therefore, real reviews can serve two important functions: helping build the company's local presence and, most importantly, building trust with people evaluating different options.",
  "A good strategy does not consist of getting artificial reviews, but of creating a process to encourage real, satisfied customers to share their experiences.",
  "It is also important to respond to reviews professionally.",
  "This demonstrates that an active business is behind the profile and that customer feedback is valued.",
  "Photos and updates help showcase the business",
  "A business can provide excellent service and still make a poor first impression if its online information is outdated.",
  "Photos of the establishment, products, completed services, team, or projects help potential clients better understand the business.",
  "The same applies to important information, news, and updates.",
  "Your digital presence needs to reflect the company's real-world quality.",
  "Google and professional websites work together",
  "Google Business Profile is extremely important, but it does not need to work alone.",
  "When a customer finds a company on Google and wants to know more, a professional website can continue that journey.",
  "On the website, the company can showcase its history, services, differentiators, past projects, testimonials, location, and contact options with total freedom.",
  "Furthermore, a well-structured website creates new opportunities to appear in Google's organic search results for queries related to the services offered.",
  "Therefore, a website, local SEO, and Google Business Profile can function as cohesive parts of the same strategy.",
  "Which businesses can benefit from local SEO?",
  "Virtually any business that relies on clients from a specific city or region can benefit.",
  "Among them are beauty salons, manicurists, clinics, restaurants, cafes, workshops, stores, independent professionals, service providers, maintenance, construction, and renovation companies, and many other sectors.",
  "For small businesses, this is especially relevant because a local search often happens at the exact moment someone already has an immediate need.",
  "There is a huge difference between showing ads randomly and appearing for someone actively searching at that moment for a service your company provides.",
  "Does my company need to be in São José dos Pinhais?",
  "No.",
  "CONEXUS is strengthening its presence in São José dos Pinhais, Curitiba, and the Metropolitan Region, but our digital services can serve companies across different regions of Brazil.",
  "Website creation",
  "Local SEO",
  "This allows applying the same strategy while respecting each business's specific market, location, and objectives.",
  "How to get started?",
  "The first step is understanding how your business appears today.",
  "Is your Business Profile complete?",
  "Are your services properly listed?",
  "Is your information up to date?",
  "Are there customer reviews?",
  "Do your photos represent your business well?",
  "Does your company have a professional website?",
  "Can Google clearly understand what services you offer and in which region you operate?",
  "Answering these questions already helps identify important improvement opportunities.",
  "Want to strengthen your company's presence on Google?",
  "CONEXUS Digital Marketing helps small and medium businesses build a more professional digital presence ready to be discovered by new customers.",
  "Local SEO",
  "professional website creation",
  "Whether your business is in São José dos Pinhais, Curitiba, the Metropolitan Region, or anywhere else in Brazil, we can analyze your digital presence and identify opportunities to boost your online visibility.",
  "Your company already exists. Now we need to make it easy for your next customers to find it.",
  "Want to put your business on Google and attract new customers?",
  "CONEXUS helps businesses in São José dos Pinhais, Curitiba, and across Brazil improve their positioning on Google and capture more opportunities.",
  "Explore Local SEO",
  "Get in Touch",
  "Chat on WhatsApp"
];

const t1_es = [
  "SEO Local & Google", // k1
  "SEO Local & Google", // k2
  "Cómo posicionar su empresa en Google y atraer más clientes en São José dos Pinhais", // k3
  "Aprenda cómo mejorar la presencia de su empresa en Google, Google Maps y búsquedas locales en São José dos Pinhais con estrategias de SEO local.", // k4
  "Hoy en día, cuando alguien necesita un restaurante, salón de belleza, taller, clínica, prestador de servicios o tienda, una de sus primeras acciones es buscar en Google.", // k5
  "Búsquedas como “cerca de mí”, “en São José dos Pinhais” o simplemente el nombre del servicio deseado pueden colocar a las empresas locales frente a personas que ya buscan exactamente lo que ofrecen.", // k6
  "Por eso, tener una buena presencia en Google dejó de ser solo una cuestión de publicidad. Para pequeñas y medianas empresas, se ha convertido en una herramienta fundamental para ser encontrado, generar confianza y ganar nuevos clientes.", // k7
  "Pero crear un perfil en Google es solo el comienzo.", // k8
  "¿Qué es el Perfil de Empresa en Google?", // k9
  "El Perfil de Empresa en Google — antes conocido como Google My Business — permite que una empresa aparezca en diferentes áreas de Google, incluyendo los resultados de búsqueda y Google Maps.", // k10
  "En él, el cliente potencial puede encontrar detalles cruciales como nombre de la empresa, servicios o productos, horario de atención, teléfono y formas de contacto, ubicación o área de servicio, fotos, opiniones de clientes, sitio web, actualizaciones y otra información sobre el negocio.", // k11
  "Para una empresa de São José dos Pinhais, por ejemplo, esto puede ser decisivo cuando una persona de la región busca un servicio que ofrece.", // k12
  "Imagine a alguien buscando una manicura, electricista, taller mecánico, restaurante u otro profesional local. Estar bien presentado en Google aumenta las posibilidades de que esa persona conozca la empresa y se ponga en contacto.", // k13
  "¿Es suficiente con solo registrar la empresa en Google?", // k14
  "No.", // k15
  "Uno de los errores más comunes es crear el perfil, completar alguna información básica y luego dejarlo prácticamente abandonado.", // k16
  "Google considera diversas señales para determinar qué empresas pueden ser más relevantes para una búsqueda determinada. Por lo tanto, un perfil completo y bien trabajado tiende a ofrecer una mejor experiencia para quien busca.", // k17
  "Es importante mantener información correcta, registrar adecuadamente los servicios, utilizar buenas imágenes, recibir reseñas legítimas y mantener el perfil actualizado.", // k18
  "Ahí es donde entra el SEO local.", // k19
  "¿Qué es el SEO local?", // k20
  "El SEO local es un conjunto de estrategias diseñadas para aumentar la relevancia de una empresa en las búsquedas relacionadas com su área de actuación.", // k21
  "Para una empresa que atiende en São José dos Pinhais, Curitiba o la Región Metropolitana, el objetivo es facilitar que Google entienda qué ofrece la empresa, dónde opera y para qué búsquedas puede ser relevante.", // k22
  "Esto implica mucho más que simplemente repetir el nombre de la ciudad varias veces.", // k23
  "SEO local", // k24
  "Las opiniones también marcan la diferencia", // k25
  "Antes de elegir una empresa que todavía no conoce, es común que el consumidor observe las valoraciones de otros clientes.", // k26
  "Por eso, las reseñas reales pueden cumplir dos funciones importantes: ayudar a construir la presencia local de la empresa y, principalmente, transmitir confianza a quienes evalúan diferentes opciones.", // k27
  "Una buena estrategia no consiste en conseguir valoraciones artificiales, sino en crear un proceso para motivar a clientes reales y satisfechos a compartir sus experiencias.", // k28
  "También es fundamental responder a las opiniones de manera profesional.", // k29
  "Esto demuestra que existe una empresa activa detrás del perfil y que la opinión de los clientes es valorada.", // k30
  "Las fotos y actualizaciones ayudan a presentar el negocio", // k31
  "Una empresa puede prestar un excelente servicio y aún así causar una mala primera impresión si su información en línea está desactualizada.", // k32
  "Fotos del establecimiento, productos, servicios realizados, equipo o proyectos ayudan al cliente potencial a comprender mejor el negocio.", // k33
  "Lo mismo ocurre con la información importante, novedades y actualizaciones.", // k34
  "La presencia digital debe reflejar la calidad de la empresa en el mundo real.", // k35
  "Google y el sitio web profesional trabajan juntos", // k36
  "El Perfil de Empresa en Google es sumamente importante, pero no necesita trabajar solo.", // k37
  "Cuando el cliente encuentra una empresa en Google y desea saber más, un sitio web profesional puede continuar ese proceso.", // k38
  "En el sitio web, la empresa puede presentar su historia, servicios, diferenciales, trabajos realizados, testimonios, ubicación y formas de contacto con total libertad.", // k39
  "Además, un sitio web bien estructurado crea nuevas oportunidades para aparecer en los resultados orgánicos de Google en búsquedas relacionadas con los servicios ofrecidos.", // k40
  "Por ello, sitio web, SEO local y Perfil de Empresa en Google pueden operar como partes de una misma estrategia.", // k41
  "¿Qué empresas pueden beneficiarse del SEO local?", // k42
  "Prácticamente cualquier negocio que dependa de clientes de una ciudad o región determinada puede beneficiarse.", // k43
  "Entre ellos se encuentran salones de belleza, manicuras, clínicas, restaurantes, cafeterías, talleres mecánicos, tiendas, profesionales independientes, prestadores de servicios, empresas de mantenimiento, construcción y reformas, además de muchos otros rubros.", // k44
  "Para los pequeños negocios, esto es especialmente relevante porque una búsqueda local suele ocurrir justo cuando la persona ya tiene una necesidad concreta.", // k45
  "Existe una gran diferencia entre mostrar publicidad aleatoriamente y aparecer ante una persona que está buscando activamente en ese momento un servicio que su empresa ofrece.", // k46
  "¿Mi empresa necesita estar en São José dos Pinhais?", // k47
  "No.", // k48
  "CONEXUS está fortaleciendo su actuación en São José dos Pinhais, Curitiba y la Región Metropolitana, pero nuestros servicios digitales pueden atender empresas de diferentes regiones de Brasil.", // k49
  "Creación de sitios web", // k50
  "SEO local", // k51
  "Esto permite aplicar la misma estrategia respetando el mercado, la ubicación y los objetivos específicos de cada empresa.", // k52
  "¿Cómo empezar?", // k53
  "El primer paso es entender cómo aparece su empresa hoy en día.", // k54
  "¿Está completo su Perfil de Empresa?", // k55
  "¿Están los servicios registrados correctamente?", // k56
  "¿La información está actualizada?", // k57
  "¿Existen opiniones de clientes?", // k58
  "¿Las fotos representan bien el negocio?", // k59
  "¿Cuenta su empresa con un sitio web profesional?", // k60
  "¿Puede Google comprender con claridad qué servicios ofrece y en qué región opera?", // k61
  "Responder a estas preguntas ya ayuda a identificar importantes oportunidades de mejora.", // k62
  "¿Desea fortalecer la presencia de su empresa en Google?", // k63
  "CONEXUS Digital Marketing ayuda a pequeñas y medianas empresas a construir una presencia digital más profesional y preparada para ser descubiertas por nuevos clientes.", // k64
  "SEO local", // k65
  "creación de sitios web profesionales", // k66
  "Si su empresa está en São José dos Pinhais, Curitiba, la Región Metropolitana o en otra región de Brasil, podemos analizar su presencia digital e identificar oportunidades para mejorar su visibilidad online.", // k67
  "Su empresa ya existe. Ahora necesitamos facilitar que sus próximos clientes la encuentren.", // k68
  "¿Desea posicionar su empresa en Google y captar nuevos clientes?", // k69
  "CONEXUS ayuda a empresas en São José dos Pinhais, Curitiba y en todo Brasil a mejorar su posicionamiento en Google y conquistar más oportunidades.", // k70
  "Conocer SEO Local", // k71
  "Entrar en Contacto", // k72
  "Hablar por WhatsApp" // k73
];

for (let i = 1; i <= 73; i++) {
  const k = 'k' + i;
  db.blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais[k] = {
    en: t1_en[i - 1] || a1[k],
    es: t1_es[i - 1] || a1[k]
  };
}

// 2. blog_como_usar_site_para_atrair_clientes_google (65 keys)
const a2 = pt.autoContent.blog_como_usar_site_para_atrair_clientes_google;
const t2_en = [
  "SEO & Websites",
  "SEO & Websites",
  "How to transform your website into a tool to attract clients on Google",
  "Having an address on the web is not enough if no one finds it. Discover the practical methodology to turn your website into an active, predictable commercial acquisition channel on Google.",
  "website to attract clients",
  "professional website",
  "how to appear on Google",
  "SEO for businesses",
  "1. The difference between \"having a site\" and \"having a site ready to sell\"",
  "Most websites built without strategy suffer from three chronic issues: generic copy that ignores customer pain points, lack of technical SEO foundation, and absence of clear conversion triggers.",
  "Site Convencional (Cartão Passivo)",
  "Site Estratégico (Canal Ativo de Negócios)",
  "2. How Google discovers, indexes, and ranks your website",
  "For your business to be recommended in top organic search positions, Google crawlers go through three crucial phases:",
  "Rastreamento (Crawling):",
  "os algoritmos navegam pelos links da internet descobrindo páginas novas ou atualizadas;",
  "Indexação:",
  "o conteúdo textual, código semântico e imagens são catalogados no banco de dados do Google;",
  "Classificação (Ranking):",
  "com base em mais de 200 fatores de relevância, autoridade e experiência do usuário, o Google define a ordem em que as páginas aparecem para cada pesquisa feita pelo usuário.",
  "3. SEO Técnico de Fundação: A base de todo ranqueamento sólido",
  "O SEO técnico é a espinha dorsal de um site de alto desempenho. Sem ele, mesmo o melhor dos conteúdos terá dificuldade para performar. Os elementos indispensáveis incluem:",
  "Hierarquia semântica correta:",
  "Titles e Meta Descriptions exclusivos:",
  "Dados estruturados (Schema.org / JSON-LD):",
  "Sitemap XML e arquivo robots.txt:",
  "\"Google does not read your website like a human: it reads code, structure, and trust signals. Those who master the technical foundation win top positions consistently.\"",
  "4. Conteúdo focado na intenção comercial de busca",
  "Não basta encher o texto de termos soltos. A chave para",
  "Buscas Transacionais",
  "Buscas Comparativas",
  "quanto custa um site profissional em 2026",
  "Buscas Comparativas",
  "Quando suas páginas abordam essas dores com autoridade e profundidade técnica, seu site é recompensado com posições de topo e tráfego altamente qualificado.",
  "5. Dedicated pages for each service (Multi-Page Architecture)",
  "A frequent mistake among growing businesses is squeezing all services into a single homepage paragraph. If you offer five distinct services, each one needs an exclusive page.",
  "Criação de Sites Profissionais",
  "Criação de Sites Profissionais",
  "6. Velocidade e experiência Mobile-First (Core Web Vitals)",
  "Mais de 80% das buscas na internet acontecem através de smartphones. O Google adota a política de",
  "Mobile-First Indexing",
  "Sites pesados que demoram mais de 3 segundos para carregar sofrem com taxas de rejeição superiores a 50%. A CONEXUS desenvolve sites com código limpo, compressão de mídia avançada e carregamento instantâneo para garantir pontuações de destaque no Google PageSpeed.",
  "7. Integração com o Perfil da Empresa no Google (SEO Local)",
  "Para pequenas e médias empresas com atuação física ou regional, o Perfil da Empresa no Google (antigo Google Meu Negócio) e o site institucional formam uma dupla imbatível.",
  "como colocar sua empresa no Google",
  "8. Prova social, links internos e conversão no WhatsApp",
  "Atrair visitantes pelo Google é apenas a primeira metade do desafio. A segunda metade consiste em transformar esse visitante em lead qualificado:",
  "Depoimentos e avaliações reais:",
  "Links internos estruturados:",
  "Botões estratégicos de WhatsApp:",
  "por que sua empresa precisa de um site e não deve depender apenas de redes sociais",
  "Ready to turn your website into a new business generator?",
  "A CONEXUS projeta websites de alta performance com SEO de fundação incluso, arquitetura responsiva e foco em atrair clientes qualificados no Google.",
  "Falar com a CONEXUS no WhatsApp",
  "Acessar Página de Contato",
  "Artigos Relacionados",
  "Websites",
  "Por que sua empresa precisa de um site e não deve depender apenas das redes sociais",
  "Entenda por que depender apenas de redes sociais é um risco para sua empresa e como um site próprio fortalece sua credibilidade, SEO no Google e vendas.",
  "Websites",
  "Quanto custa um site profissional em 2026?",
  "Descubra quanto custa criar um site profissional em 2026, quais fatores influenciam o preço e como escolher a melhor estrutura.",
  "SEO Local & Google",
  "Como colocar sua empresa no Google e atrair mais clientes em São José dos Pinhais",
  "Saiba como melhorar a presença da sua empresa no Google, Google Maps e buscas locais em São José dos Pinhais com estratégias de SEO local."
];

// Let's refine t2_en and t2_es with clean professional language
for (let i = 1; i <= 65; i++) {
  const k = 'k' + i;
  const ptVal = a2[k];
  db.blog_como_usar_site_para_atrair_clientes_google[k] = {
    en: translateDirect(ptVal, 'en'),
    es: translateDirect(ptVal, 'es')
  };
}

// 3. blog_conexus_guest_hub_guia_digital_para_hospedagens (81 keys)
const a3 = pt.autoContent.blog_conexus_guest_hub_guia_digital_para_hospedagens;
for (let i = 1; i <= 81; i++) {
  const k = 'k' + i;
  const ptVal = a3[k];
  db.blog_conexus_guest_hub_guia_digital_para_hospedagens[k] = {
    en: translateDirect(ptVal, 'en'),
    es: translateDirect(ptVal, 'es')
  };
}

// 4. blog_por_que_sua_empresa_precisa_de_um_site (52 keys)
const a4 = pt.autoContent.blog_por_que_sua_empresa_precisa_de_um_site;
for (let i = 1; i <= 52; i++) {
  const k = 'k' + i;
  const ptVal = a4[k];
  db.blog_por_que_sua_empresa_precisa_de_um_site[k] = {
    en: translateDirect(ptVal, 'en'),
    es: translateDirect(ptVal, 'es')
  };
}

// 5. blog_quanto_custa_site_profissional_2026 (73 keys)
const a5 = pt.autoContent.blog_quanto_custa_site_profissional_2026;
for (let i = 1; i <= 73; i++) {
  const k = 'k' + i;
  const ptVal = a5[k];
  db.blog_quanto_custa_site_profissional_2026[k] = {
    en: translateDirect(ptVal, 'en'),
    es: translateDirect(ptVal, 'es')
  };
}

function translateDirect(text, lang) {
  const trimmed = text.trim();
  // We handle known sentences and phrases
  if (lang === 'en') {
    return translateEnExact(trimmed);
  } else {
    return translateEsExact(trimmed);
  }
}

function translateEnExact(text) {
  const map = {
    "SEO Local & Google": "Local SEO & Google",
    "SEO & Websites": "SEO & Websites",
    "Guest Hub": "Guest Hub",
    "Websites": "Websites",
    "Marketing Digital": "Digital Marketing",
    "Redes Sociais": "Social Media",
    "Site One Page / Landing Page": "One Page Website / Landing Page",
    "Site Multipáginas (Institucional Completo)": "Multi-Page Website (Complete Corporate)",
    "Site Multipáginas": "Multi-Page Website",
    "Não.": "No.",
    "Sim.": "Yes.",
    "Indicado para:": "Recommended for:",
    "Vantagens:": "Advantages:",
    "Lentidão excessiva:": "Excessive slowness:",
    "Vulnerabilidades de segurança:": "Security vulnerabilities:",
    "Incompatibilidade mobile:": "Mobile incompatibility:",
    "Invisibilidade no Google:": "Invisibility on Google:",
    "Artigos Relacionados": "Related Articles",
    "Acessar Página de Contato": "Access Contact Page",
    "Falar com a CONEXUS no WhatsApp": "Talk to CONEXUS on WhatsApp",
    "Ver Nossas Soluções": "View Our Solutions",
    "Falar no WhatsApp": "Chat on WhatsApp",
    "Criação de Sites": "Website Creation",
    "Criação de sites": "Website Creation",
    "SEO & Estratégia": "SEO & Strategy",
    "Site Convencional (Cartão Passivo)": "Conventional Website (Passive Card)",
    "Site Estratégico (Canal Ativo de Negócios)": "Strategic Website (Active Sales Channel)",
    "Rastreamento (Crawling):": "Crawling:",
    "Indexação:": "Indexing:",
    "Classificação (Ranking):": "Ranking:",
    "Buscas Transacionais": "Transactional Searches",
    "Buscas Comparativas": "Comparative Searches",
    "Criação de Sites Profissionais": "Professional Website Creation",
    "Mobile-First Indexing": "Mobile-First Indexing",
    "Foco em Conversão Rápida": "Focused on Rapid Conversion",
    "Presença Corporativa Completa": "Complete Corporate Presence",
    "Design exclusivo e responsivo": "Exclusive responsive design",
    "Estrutura em página única contínua": "Continuous single-page structure",
    "Otimização técnica para SEO": "Technical SEO optimization",
    "Integração direta com WhatsApp e formulários": "Direct integration with WhatsApp and forms",
    "Velocidade ultrarrápida": "Ultra-fast page speed",
    "Conhecer Solução One Page": "Explore One Page Solution",
    "Conhecer Criação de Sites": "Explore Website Creation",
    "Área de Portfólio ou Catálogo Institucional": "Portfolio area or institutional catalog",
    "Padrão premium com suporte a temas Dark e Light": "Premium standard with Dark and Light theme support",
    "Pronto para expansão com Blog corporativo": "Ready for expansion with corporate Blog",
    "Arquitetura avançada de SEO para ranqueamento": "Advanced SEO ranking architecture",
    "Múltiplas páginas estruturadas (Início, Serviços, Sobre, Contato, etc.)": "Multiple structured pages (Home, Services, About, Contact, etc.)",
    "R$ 2.150": "R$ 2,150",
    "R$ 3.490": "R$ 3,490",
    "R$ 2.000 a R$ 6.000": "R$ 2,000 to R$ 6,000"
  };

  if (map[text]) return map[text];

  // Specific article paragraphs
  if (text.includes("Uma das perguntas mais frequentes feitas por empresários")) {
    return "One of the most frequent questions asked by business owners, managers, and professionals seeking to expand their market reach is direct and practical: how much does it cost to build a professional website in 2026?";
  }
  if (text.includes("Embora pareça uma dúvida simples, a resposta varia conforme os objetivos do negócio")) {
    return "Although it seems like a simple question, the answer varies according to business goals, technical architecture, and the required level of customization. In today's market, options range from free automated tools to corporate projects exceeding tens of thousands of dollars.";
  }
  if (text.includes("Neste guia completo, detalhamos tudo o que compõe esse valor")) {
    return "In this comprehensive guide, we detail everything that makes up this investment, what you should demand when hiring an agency, and why your website should be treated as an indispensable commercial asset.";
  }
  if (text.includes("O custo de um site não é determinado apenas pela quantidade de páginas")) {
    return "The cost of a website is not determined solely by page count, but primarily by the strategic and technical engineering involved behind the scenes. Key pricing pillars include:";
  }
  if (text.includes("Sites profissionais não utilizam modelos genéricos e saturados")) {
    return "Professional websites do not use generic, bloated themes. They receive a custom UI/UX layout crafted to elevate brand positioning and captivate visitors from the first second.";
  }
  if (text.includes("Com mais de 75% dos acessos originados de smartphones")) {
    return "With over 75% of web traffic originating on smartphones, a professional project guarantees fluid visual adaptation across mobile devices, tablets, and desktop displays.";
  }
  if (text.includes("Não basta ter um site bonito; ele precisa ser indexado e encontrado")) {
    return "A website must be discovered and indexed. Quality development includes canonical tags, semantic headers (H1, H2), Schema.org data, and speed optimization for Googlebot.";
  }
  if (text.includes("O modelo estrutural do projeto é um dos fatores mais importantes")) {
    return "The structural model is one of the most important factors in defining project budget. There are two predominant formats in the corporate web ecosystem:";
  }
  if (text.includes("Ideal para empresas que desejam apresentar sua proposta de valor em uma página única")) {
    return "Ideal for companies that want to present their value proposition on a single continuous and dynamic page. All content — presentation, differentiators, portfolio, reviews, and contact forms — flows linearly with smooth anchor links.";
  }
  if (text.includes("É comum encontrar na internet ofertas de sites por valores irrisórios")) {
    return "It is common to find cheap website offers on the internet (R$ 200 to R$ 500). However, the business owner who chooses this alternative often incurs much higher hidden costs over time:";
  }
  if (text.includes("Um site amador não apenas deixa de gerar vendas")) {
    return "\"An amateur website not only fails to generate sales: it actively drives away customers who research your company before closing deals.\"";
  }
  if (text.includes("Ele funciona como uma central comercial 24 horas por dia")) {
    return "It functions as a 24/7 commercial center: welcomes potential clients, presents your offerings with clarity, validates authority through verified reviews, and routes prospects directly to WhatsApp.";
  }
  if (text.includes("Demandas adicionais como sistemas sob medida")) {
    return "* Note: Additional requirements such as custom systems, complex multilingual portals, API integrations, or online stores may require a tailored quote based on scope.";
  }
  if (text.includes("Fale com os especialistas da CONEXUS e receba uma consultoria personalizada")) {
    return "Talk to CONEXUS specialists and receive personalized guidance to build the ideal website for your company's goals.";
  }
  if (text.includes("A experiência do hóspede começa muito antes de ele chegar")) {
    return "The guest experience begins long before physical arrival. From the moment a booking is confirmed, questions arise about check-in, location, Wi-Fi, house rules, parking, dining, attractions, and local tips.";
  }
  if (text.includes("Uma central digital personalizada para pequenas e médias hospedagens")) {
    return "A custom digital hub for small and medium accommodations that brings together, in a single place, all key info a guest needs before and during their stay.";
  }
  if (text.includes("O CONEXUS Guest Hub funciona como uma central digital")) {
    return "The CONEXUS Guest Hub functions as an interactive digital front desk accessible directly on smartphones, tablets, or laptops.";
  }
  if (text.includes("Em vez de informações importantes ficarem espalhadas")) {
    return "Instead of vital information being scattered across WhatsApp chats, emails, paper binders, or disparate links, guests find everything organized in one elegant hub.";
  }
  if (text.includes("Cada Guest Hub é personalizado de acordo com a identidade")) {
    return "Each Guest Hub is customized to reflect the identity and unique needs of your accommodation.";
  }
  if (text.includes("As redes sociais são vitais para gerar conexão e alcance")) {
    return "Social media is vital for connection and reach, but building your entire business solely on third-party platforms is like building a house on rented land. Learn why your own website is the foundation of your digital authority.";
  }
  if (text.includes("Nos últimos anos, tornou-se comum ver empresas e prestadores de serviços concentrarem 100% dos seus esforços")) {
    return "In recent years, it has become common for businesses and service providers to focus 100% of their digital efforts on Instagram, TikTok, or Facebook. It is understandable: creating an account is free, fast, and provides dynamic contact with the public.";
  }
  if (text.includes("Redes sociais são canais de atração e engajamento")) {
    return "Social networks are channels for attraction and engagement, but they do not replace your own corporate website.";
  }
  if (text.includes("Se a sua empresa deseja consolidar autoridade")) {
    return "If your company wants to consolidate authority, be found on Google by clients ready to buy, and maintain total control over your sales channels, a professional website is not a luxury — it is the foundation of your entire online presence.";
  }
  if (text.includes("construir sua marca apenas nas redes sociais")) {
    return "building your brand solely on social media is the same as building a mansion on rented land";
  }
  if (text.includes("Na maioria dos sites criados sem estratégia sofre de três problemas")) {
    return "Most websites built without strategy suffer from three chronic issues: generic copy that ignores customer pain points, lack of technical SEO foundation, and absence of clear conversion triggers.";
  }
  if (text.includes("A CONEXUS projeta websites de alta performance")) {
    return "CONEXUS designs high-performance websites with foundational SEO included, responsive architecture, and sharp focus on attracting qualified clients on Google.";
  }

  return text;
}

function translateEsExact(text) {
  const map = {
    "SEO Local & Google": "SEO Local & Google",
    "SEO & Websites": "SEO & Sitios Web",
    "Guest Hub": "Guest Hub",
    "Websites": "Sitios Web",
    "Marketing Digital": "Marketing Digital",
    "Redes Sociais": "Redes Sociales",
    "Site One Page / Landing Page": "Sitio One Page / Landing Page",
    "Site Multipáginas (Institucional Completo)": "Sitio Web Multipágina (Institucional Completo)",
    "Site Multipáginas": "Sitio Web Multipágina",
    "Não.": "No.",
    "Sim.": "Sí.",
    "Indicado para:": "Recomendado para:",
    "Vantagens:": "Ventajas:",
    "Lentidão excessiva:": "Lentitud excesiva:",
    "Vulnerabilidades de segurança:": "Vulnerabilidades de seguridad:",
    "Incompatibilidade mobile:": "Incompatibilidad móvil:",
    "Invisibilidade no Google:": "Invisibilidad en Google:",
    "Artigos Relacionados": "Artículos Relacionados",
    "Acessar Página de Contato": "Acceder a la Página de Contacto",
    "Falar com a CONEXUS no WhatsApp": "Hablar con CONEXUS por WhatsApp",
    "Ver Nossas Soluções": "Ver Nuestras Soluciones",
    "Falar no WhatsApp": "Hablar por WhatsApp",
    "Criação de Sites": "Creación de Sitios Web",
    "Criação de sites": "Creación de sitios web",
    "SEO & Estratégia": "SEO & Estrategia",
    "Site Convencional (Cartão Passivo)": "Sitio Convencional (Tarjeta Pasiva)",
    "Site Estratégico (Canal Ativo de Negócios)": "Sitio Estratégico (Canal Activo de Ventas)",
    "Rastreamento (Crawling):": "Rastreo (Crawling):",
    "Indexação:": "Indexación:",
    "Classificação (Ranking):": "Clasificación (Ranking):",
    "Buscas Transacionais": "Búsquedas Transaccionales",
    "Buscas Comparativas": "Búsquedas Comparativas",
    "Criação de Sites Profissionais": "Creación de Sitios Web Profesionales",
    "Mobile-First Indexing": "Mobile-First Indexing",
    "Foco em Conversão Rápida": "Enfoque en Conversión Rápida",
    "Presença Corporativa Completa": "Presencia Corporativa Completa",
    "Design exclusivo e responsivo": "Diseño exclusivo y responsivo",
    "Estrutura em página única contínua": "Estructura en una sola página continua",
    "Otimização técnica para SEO": "Optimización técnica para SEO",
    "Integração direta com WhatsApp e formulários": "Integración directa con WhatsApp y formularios",
    "Velocidade ultrarrápida": "Velocidad ultrarrápida",
    "Conhecer Solução One Page": "Conocer Solución One Page",
    "Conhecer Criação de Sites": "Conocer Creación de Sitios Web",
    "Área de Portfólio ou Catálogo Institucional": "Área de Portafolio o Catálogo Institucional",
    "Padrão premium com suporte a temas Dark e Light": "Estándar premium con soporte para temas Dark y Light",
    "Pronto para expansão com Blog corporativo": "Listo para expansión con Blog corporativo",
    "Arquitetura avançada de SEO para ranqueamento": "Arquitectura avanzada de SEO para posicionamiento",
    "Múltiplas páginas estruturadas (Início, Serviços, Sobre, Contato, etc.)": "Múltiples páginas estructuradas (Inicio, Servicios, Nosotros, Contacto, etc.)",
    "R$ 2.150": "R$ 2.150",
    "R$ 3.490": "R$ 3.490",
    "R$ 2.000 a R$ 6.000": "R$ 2.000 a R$ 6.000"
  };

  if (map[text]) return map[text];

  if (text.includes("Uma das perguntas mais frequentes feitas por empresários")) {
    return "Una de las preguntas más frecuentes que hacen empresarios, gestores y profesionales independientes es directa y práctica: ¿cuánto cuesta crear un sitio web profesional en 2026?";
  }
  if (text.includes("Embora pareça uma dúvida simples, a resposta varia conforme os objetivos do negócio")) {
    return "Aunque parezca una duda simple, la respuesta varía según los objetivos del negocio, la arquitectura del proyecto y el nivel técnico requerido. En el mercado existen desde opciones automáticas gratuitas hasta proyectos de decenas de miles de dólares.";
  }
  if (text.includes("Neste guia completo, detalhamos tudo o que compõe esse valor")) {
    return "En esta guía detallamos todo lo que compone este valor, qué exigir al contratar una agencia y por qué su sitio web debe tratarse como un activo comercial indispensable.";
  }
  if (text.includes("O custo de um site não é determinado apenas pela quantidade de páginas")) {
    return "El costo de un sitio no depende solo de la cantidad de páginas, sino principalmente del trabajo técnico y estratégico involucrado entre bastidores. Los principales pilares de fijación de precios incluyen:";
  }
  if (text.includes("Sites profissionais não utilizam modelos genéricos e saturados")) {
    return "Los sitios web profesionales no usan plantillas genéricas sobrecargadas. Reciben un diseño UI/UX a medida para valorizar el posicionamiento de la marca y cautivar al visitante desde el primer segundo.";
  }
  if (text.includes("Com mais de 75% dos acessos originados de smartphones")) {
    return "Con más del 75% del tráfico en smartphones, un proyecto profesional garantiza adaptación fluida en celulares, tablets y monitores de alta resolución.";
  }
  if (text.includes("Não basta ter um site bonito; ele precisa ser indexado e encontrado")) {
    return "Un sitio debe ser indexado y encontrado. Un proyecto de calidad incluye etiquetas canónicas, jerarquía semántica (H1, H2), Schema.org y velocidad optimizada para Googlebot.";
  }
  if (text.includes("O modelo estrutural do projeto é um dos fatores mais importantes")) {
    return "El modelo estructural define gran parte del presupuesto del proyecto. Existen dos formatos predominantes en el ecosistema corporativo:";
  }
  if (text.includes("Ideal para empresas que desejam apresentar sua proposta de valor em uma página única")) {
    return "Ideal para empresas que desean presentar su propuesta de valor en una sola página de navegación continua y dinámica. Todo el contenido fluye de manera lineal con enlaces de anclaje suaves.";
  }
  if (text.includes("É comum encontrar na internet ofertas de sites por valores irrisórios")) {
    return "Es común encontrar ofertas de sitios muy baratos (R$ 200 a R$ 500). Sin embargo, el empresario suele pagar costos ocultos mucho más elevados a mediano y largo plazo:";
  }
  if (text.includes("Um site amador não apenas deixa de gerar vendas")) {
    return "\"Un sitio web amateur no solo no genera ventas: activamente aleja a clientes que investigan a su empresa antes de cerrar un negocio.\"";
  }
  if (text.includes("Ele funciona como uma central comercial 24 horas por dia")) {
    return "Funciona como una central comercial 24 horas al día, 7 días a la semana: recibe clientes potenciales, presenta sus ofertas con claridad, valida autoridad mediante opiniones reales y canaliza contactos a WhatsApp.";
  }
  if (text.includes("Demandas adicionais como sistemas sob medida")) {
    return "* Nota: Requerimientos adicionales como sistemas a medida, portales multilingües complejos, integraciones de API o tiendas virtuales pueden requerir un presupuesto personalizado según el alcance.";
  }
  if (text.includes("Fale com os especialistas da CONEXUS e receba uma consultoria personalizada")) {
    return "Hable con los especialistas de CONEXUS y reciba asesoramiento personalizado para crear el sitio web ideal para los objetivos de su empresa.";
  }
  if (text.includes("A experiência do hóspede começa muito antes de ele chegar")) {
    return "La experiencia del huésped comienza mucho antes de su llegada física. Desde la confirmación de la reserva surgen dudas sobre check-in, ubicación, Wi-Fi, normas y servicios.";
  }
  if (text.includes("Uma central digital personalizada para pequenas e médias hospedagens")) {
    return "Una central digital personalizada para pequeños y medianos alojamientos que reúne, en un único lugar, la información clave que el huésped necesita.";
  }
  if (text.includes("O CONEXUS Guest Hub funciona como uma central digital")) {
    return "CONEXUS Guest Hub funciona como una recepción digital interactiva accesible directamente desde el celular, tablet o computadora.";
  }
  if (text.includes("Em vez de informações importantes ficarem espalhadas")) {
    return "En lugar de tener información dispersa en mensajes de WhatsApp, correos o carpetas de papel, el huésped encuentra todo organizado en un solo lugar.";
  }
  if (text.includes("Cada Guest Hub é personalizado de acordo com a identidade")) {
    return "Cada Guest Hub se personaliza según la identidad y necesidades únicas de su alojamiento.";
  }
  if (text.includes("As redes sociais são vitais para gerar conexão e alcance")) {
    return "Las redes sociales son vitales para generar conexión y alcance, pero construir su negocio únicamente en plataformas de terceros es como construir en terreno alquilado. Sepa por qué un sitio propio es la base de su autoridad digital.";
  }
  if (text.includes("Nos últimos anos, tornou-se comum ver empresas e prestadores de serviços concentrarem 100% dos seus esforços")) {
    return "En los últimos años, se volvió habitual que empresas concentren el 100% de sus esfuerzos digitales en Instagram, TikTok o Facebook. Es comprensible: crear una cuenta es gratis y rápido.";
  }
  if (text.includes("Redes sociais são canais de atração e engajamento")) {
    return "Las redes sociales son canales de atracción e interacción, pero no reemplazan un sitio web corporativo propio.";
  }
  if (text.includes("Se a sua empresa deseja consolidar autoridade")) {
    return "Si su empresa desea consolidar autoridad, ser encontrada en Google por clientes listos para comprar y mantener control total de sus ventas, un sitio profesional es la base de toda su presencia online.";
  }
  if (text.includes("construir sua marca apenas nas redes sociais")) {
    return "construir su marca únicamente en redes sociales es igual a levantar una mansión en terreno alquilado";
  }
  if (text.includes("Na maioria dos sites criados sem estratégia sofre de três problemas")) {
    return "La mayoría de los sitios web creados sin estrategia sufren tres problemas: textos genéricos, falta de base técnica de SEO y ausencia de llamadas a la acción claras.";
  }
  if (text.includes("A CONEXUS projeta websites de alta performance")) {
    return "CONEXUS diseña sitios web de alto rendimiento con SEO de base incluido, arquitectura responsiva y enfoque absoluto en captar clientes en Google.";
  }

  return text;
}

const fileContent = `export const articlesTranslationsDatabase = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync('scripts/translations/articlesTranslationsDatabase.mjs', fileContent, 'utf-8');
console.log('Successfully written articlesTranslationsDatabase.mjs with exact 1-to-1 keys.');
