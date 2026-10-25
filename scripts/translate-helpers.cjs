// Complete map of all 100 post titles and descriptions to natural English and Spanish
const exactTitleMap = {
  'Agência de marketing digital em São José dos Pinhais: como escolher uma parceira para crescer': {
    en: 'Digital marketing agency in São José dos Pinhais: how to choose a partner for growth',
    es: 'Agencia de marketing digital en São José dos Pinhais: cómo elegir un socio para crecer'
  },
  'Como empresas de São José dos Pinhais podem conquistar mais clientes pelo Google': {
    en: 'How companies in São José dos Pinhais can win more customers through Google',
    es: 'Cómo las empresas de São José dos Pinhais pueden captar más clientes a través de Google'
  },
  'Marketing digital para pequenas empresas em São José dos Pinhais: guia prático': {
    en: 'Digital marketing for small businesses in São José dos Pinhais: practical guide',
    es: 'Marketing digital para pequeñas empresas en São José dos Pinhais: guía práctica'
  },
  'Como aumentar a presença digital de uma empresa em São José dos Pinhais': {
    en: 'How to increase a company\'s digital presence in São José dos Pinhais',
    es: 'Cómo aumentar la presencia digital de una empresa en São José dos Pinhais'
  },
  'Estratégia digital para indústrias de São José dos Pinhais': {
    en: 'Digital strategy for manufacturing industries in São José dos Pinhais',
    es: 'Estrategia digital para industrias de São José dos Pinhais'
  },
  'Marketing digital para prestadores de serviços em São José dos Pinhais': {
    en: 'Digital marketing for service providers in São José dos Pinhais',
    es: 'Marketing digital para prestadores de servicios en São José dos Pinhais'
  },
  'Como empresas do Centro de São José dos Pinhais podem ganhar visibilidade online': {
    en: 'How companies in downtown São José dos Pinhais can gain online visibility',
    es: 'Cómo las empresas del centro de São José dos Pinhais pueden ganar visibilidad online'
  },
  'Como atrair clientes locais em São José dos Pinhais sem depender somente de anúncios': {
    en: 'How to attract local customers in São José dos Pinhais without relying only on ads',
    es: 'Cómo atraer clientes locales en São José dos Pinhais sin depender solo de anuncios'
  },
  'Presença digital para empresas próximas ao Aeroporto Afonso Pena': {
    en: 'Digital presence for companies near Afonso Pena Airport',
    es: 'Presencia digital para empresas cerca del Aeropuerto Afonso Pena'
  },
  'Guia de marketing digital para empresas da Região Metropolitana com sede em São José dos Pinhais': {
    en: 'Digital marketing guide for metropolitan region businesses based in São José dos Pinhais',
    es: 'Guía de marketing digital para empresas del área metropolitana con sede en São José dos Pinhais'
  },
  'Agência de marketing digital em Curitiba: quais serviços realmente ajudam uma empresa a crescer': {
    en: 'Digital marketing agency in Curitiba: which services truly help a company grow',
    es: 'Agencia de marketing digital en Curitiba: qué servicios realmente ayudan a una empresa a crecer'
  },
  'Como melhorar a presença de uma empresa no Google em Curitiba': {
    en: 'How to improve a company\'s presence on Google in Curitiba',
    es: 'Cómo mejorar la presencia de una empresa en Google en Curitiba'
  },
  'Marketing digital para pequenas empresas em Curitiba': {
    en: 'Digital marketing for small businesses in Curitiba',
    es: 'Marketing digital para pequeñas empresas en Curitiba'
  },
  'Como conquistar clientes em Curitiba usando site, Google e conteúdo': {
    en: 'How to win clients in Curitiba using a website, Google, and content',
    es: 'Cómo captar clientes en Curitiba utilizando sitio web, Google y contenido'
  },
  'Estratégias digitais para empresas de Curitiba e Região Metropolitana': {
    en: 'Digital strategies for businesses in Curitiba and Metropolitan Region',
    es: 'Estrategias digitales para empresas de Curitiba y Área Metropolitana'
  },
  'Marketing digital para empresas de Fazenda Rio Grande': {
    en: 'Digital marketing for businesses in Fazenda Rio Grande',
    es: 'Marketing digital para empresas de Fazenda Rio Grande'
  },
  'Marketing digital para empresas de Pinhais': {
    en: 'Digital marketing for businesses in Pinhais',
    es: 'Marketing digital para empresas de Pinhais'
  },
  'Marketing digital para empresas de Araucária': {
    en: 'Digital marketing for businesses in Araucária',
    es: 'Marketing digital para empresas de Araucária'
  },
  'Marketing digital para empresas de Colombo': {
    en: 'Digital marketing for businesses in Colombo',
    es: 'Marketing digital para empresas de Colombo'
  },
  'Marketing digital para empresas de Campo Largo': {
    en: 'Digital marketing for businesses in Campo Largo',
    es: 'Marketing digital para empresas de Campo Largo'
  },
  'Marketing digital para empresas de comércio exterior': {
    en: 'Digital marketing for foreign trade and customs companies',
    es: 'Marketing digital para empresas de comercio exterior'
  },
  'Marketing digital para empresas de serviços residenciais': {
    en: 'Digital marketing for residential service companies',
    es: 'Marketing digital para empresas de servicios residenciales'
  },
  'Como o Google Meu Negócio ajuda empresas de São José dos Pinhais a serem encontradas': {
    en: 'How Google Business Profile helps São José dos Pinhais companies get found',
    es: 'Cómo Google Perfil de Empresa ayuda a empresas de São José dos Pinhais a ser encontradas'
  },
  'Como aumentar a visibilidade da empresa nas pesquisas locais do Google': {
    en: 'How to increase company visibility in Google local search',
    es: 'Cómo aumentar la visibilidad de la empresa en las búsquedas locales de Google'
  },
  'Fotos no Google Business Profile: como melhorar a presença da empresa': {
    en: 'Photos on Google Business Profile: how to enhance company presence',
    es: 'Fotos en Google Business Profile: cómo mejorar la presencia de la empresa'
  },
  'Como escolher as categorias corretas no Perfil da Empresa no Google': {
    en: 'How to choose the right categories on Google Business Profile',
    es: 'Cómo elegir las categorías correctas en el Perfil de Empresa en Google'
  },
  'Como responder avaliações no Google com foco em reputação e confiança': {
    en: 'How to respond to Google reviews focusing on reputation and trust',
    es: 'Cómo responder reseñas en Google con foco en reputación y confianza'
  },
  'Como colocar sua empresa no mapa do Google em São José dos Pinhais': {
    en: 'How to put your business on Google Maps in São José dos Pinhais',
    es: 'Cómo poner su empresa en el mapa de Google en São José dos Pinhais'
  },
  'Por que sua empresa precisa de um site profissional': {
    en: 'Why your company needs a professional website',
    es: 'Por qué su empresa necesita un sitio web profesional'
  },
  'Quanto custa criar um site profissional para uma pequena empresa': {
    en: 'How much does it cost to create a professional website for a small business',
    es: 'Cuánto cuesta crear un sitio web profesional para una pequeña empresa'
  },
  'Site barato ou site profissional: onde realmente está a diferença': {
    en: 'Cheap website vs professional website: where the difference really lies',
    es: 'Sitio web económico o profesional: dónde está realmente la diferencia'
  },
  'O que colocar na página inicial do site para passar credibilidade imediata': {
    en: 'What to include on your homepage to convey immediate credibility',
    es: 'Qué incluir en la página de inicio para transmitir credibilidad inmediata'
  },
  'Site institucional para empresas de serviços: o que não pode faltar': {
    en: 'Corporate website for service companies: essential elements',
    es: 'Sitio web institucional para empresas de servicios: elementos imprescindibles'
  },
  'Como calcular o retorno sobre o investimento de um site profissional': {
    en: 'How to calculate the return on investment of a professional website',
    es: 'Cómo calcular el retorno de inversión de un sitio web profesional'
  },
  'Como transformar visitas em contatos no WhatsApp para negócios locais': {
    en: 'How to turn website visits into WhatsApp inquiries for local businesses',
    es: 'Cómo transformar visitas en contactos de WhatsApp para negocios locales'
  },
  'Como estruturar uma página de serviços para gerar pedidos de orçamento': {
    en: 'How to structure a service page to generate quote requests',
    es: 'Cómo estructurar una página de servicios para generar solicitudes de presupuesto'
  },
  'Como criar autoridade digital no seu setor antes de investir em tráfego': {
    en: 'How to build digital authority in your industry before investing in traffic',
    es: 'Cómo crear autoridad digital en su sector antes de invertir en tráfico'
  },
  'Como auditar a presença digital da sua empresa em 10 passos práticos': {
    en: 'How to audit your company\'s digital presence in 10 practical steps',
    es: 'Cómo auditar la presencia digital de su empresa en 10 pasos prácticos'
  },
  'O que é SEO Local e por que ele é indispensável para negócios da Região Metropolitana': {
    en: 'What is Local SEO and why it is indispensable for metropolitan businesses',
    es: 'Qué es el SEO Local y por qué es indispensable para negocios del área metropolitana'
  },
  'Como preparar sua empresa para a busca generativa do Google': {
    en: 'How to prepare your company for Google generative search',
    es: 'Cómo preparar su empresa para la búsqueda generativa de Google'
  },
  'O que é busca generativa e como ela muda a forma como clientes encontram serviços': {
    en: 'What generative search is and how it changes how customers find services',
    es: 'Qué es la búsqueda generativa y cómo cambia la forma en que los clientes encuentran servicios'
  },
  'Como criar conteúdo que responde às dúvidas reais dos seus clientes': {
    en: 'How to create content that answers your customers\' real questions',
    es: 'Cómo crear contenido que responde a las dudas reales de sus clientes'
  },
  'A importância de ter um domínio próprio e e-mail profissional desde o primeiro dia': {
    en: 'The importance of having a custom domain and professional email from day one',
    es: 'La importancia de tener un dominio propio y correo profesional desde el primer día'
  },
  'Como construir confiança com um site profissional mesmo sendo uma empresa nova': {
    en: 'How to build trust with a professional website even as a new business',
    es: 'Cómo construir confianza con un sitio web profesional incluso siendo una empresa nueva'
  },
  'Por que depender apenas de redes sociais é um risco para a sua empresa': {
    en: 'Why relying solely on social media is a risk for your business',
    es: 'Por qué depender solo de las redes sociales es un riesgo para su empresa'
  },
  'O papel do site institucional no fechamento de contratos B2B': {
    en: 'The role of a corporate website in closing B2B contracts',
    es: 'El papel del sitio web institucional en el cierre de contratos B2B'
  },
  'Como o design responsivo impacta diretamente a decisão de compra pelo celular': {
    en: 'How responsive design directly impacts purchase decisions on mobile',
    es: 'Cómo el diseño responsivo influye directamente en la decisión de compra desde el móvil'
  },
  'Como alinhar site, Google Meu Negócio e Instagram em uma estratégia única': {
    en: 'How to align website, Google Business Profile, and Instagram in a single strategy',
    es: 'Cómo alinear sitio web, Google Perfil de Empresa e Instagram en una sola estrategia'
  },
  'O que os mecanismos de busca com IA esperam encontrar nas páginas da sua empresa': {
    en: 'What AI search engines expect to find on your business pages',
    es: 'Qué esperan encontrar los motores de búsqueda con IA en las páginas de su empresa'
  },
  'Como transformar o site da sua empresa em um canal ativo de geração de oportunidades': {
    en: 'How to turn your company website into an active lead generation channel',
    es: 'Cómo transformar el sitio web de su empresa en un canal activo de captación de oportunidades'
  },
  'Criação de sites em São José dos Pinhais: guia para empresas': {
    en: 'Website creation in São José dos Pinhais: guide for businesses',
    es: 'Creación de sitios web en São José dos Pinhais: guía para empresas'
  },
  'Criação de sites em Curitiba: o que avaliar antes de contratar': {
    en: 'Website creation in Curitiba: what to evaluate before hiring',
    es: 'Creación de sitios web en Curitiba: qué evaluar antes de contratar'
  },
  'O que um site empresarial precisa ter para gerar contatos': {
    en: 'What a business website needs to generate leads',
    es: 'Qué necesita tener un sitio web empresarial para generar contactos'
  },
  'Site institucional: estrutura ideal para empresas locais': {
    en: 'Corporate website: ideal structure for local businesses',
    es: 'Sitio web institucional: estructura ideal para empresas locales'
  },
  'Como transformar visitantes do site em contatos pelo WhatsApp': {
    en: 'How to turn website visitors into WhatsApp inquiries',
    es: 'Cómo transformar visitantes del sitio web en contactos por WhatsApp'
  },
  'Quanto tempo leva para criar um site profissional': {
    en: 'How long does it take to build a professional website',
    es: 'Cuánto tiempo se tarda en crear un sitio web profesional'
  },
  'Como saber se o site da sua empresa precisa ser reconstruído': {
    en: 'How to know if your company website needs a redesign',
    es: 'Cómo saber si el sitio web de su empresa necesita ser reconstruido'
  },
  '15 erros que fazem um site empresarial perder clientes': {
    en: '15 mistakes that cause a business website to lose customers',
    es: '15 errores que hacen que un sitio web empresarial pierda clientes'
  },
  'Como aparecer quando alguém procura seu serviço perto de mim': {
    en: 'How to rank when someone searches for your service near me',
    es: 'Cómo aparecer cuando alguien busca su servicio cerca de mí'
  },
  'Como escrever serviços e produtos no Perfil da Empresa no Google': {
    en: 'How to list services and products on Google Business Profile',
    es: 'Cómo detallar servicios y productos en el Perfil de Empresa en Google'
  },
  'Como responder avaliações no Google profissionalmente': {
    en: 'How to respond to Google reviews professionally',
    es: 'Cómo responder reseñas en Google profesionalmente'
  },
  'O que fazer quando sua empresa não aparece nas pesquisas locais': {
    en: 'What to do when your business does not appear in local search',
    es: 'Qué hacer cuando su empresa no aparece en las búsquedas locales'
  },
  'Como site e Perfil da Empresa no Google trabalham juntos': {
    en: 'How website and Google Business Profile work together',
    es: 'Cómo el sitio web y Google Perfil de Empresa trabajan juntos'
  },
  'Como criar páginas locais sem fazer spam de localização': {
    en: 'How to create local landing pages without location keyword stuffing',
    es: 'Cómo crear páginas locales sin caer en spam de localización'
  },
  'Como medir se sua estratégia de SEO Local está funcionando': {
    en: 'How to measure if your Local SEO strategy is working',
    es: 'Cómo medir si su estrategia de SEO Local está funcionando'
  },
  'Como escolher palavras-chave para uma empresa local': {
    en: 'How to choose keywords for a local business',
    es: 'Cómo elegir palabras clave para una empresa local'
  },
  'Palavra-chave comercial ou informativa: qual gera mais oportunidades?': {
    en: 'Commercial vs informational keywords: which generates more opportunities?',
    es: 'Palabra clave comercial o informativa: ¿cuál genera más oportunidades?'
  },
  'Como criar conteúdo que realmente apareça no Google': {
    en: 'How to create content that truly ranks on Google',
    es: 'Cómo crear contenido que realmente se posicione en Google'
  },
  'O que é intenção de busca e por que ela muda uma estratégia de SEO': {
    en: 'What is search intent and why it reshapes an SEO strategy',
    es: 'Qué es la intención de búsqueda y por qué transforma una estrategia de SEO'
  },
  'Topic clusters: como construir autoridade no Google': {
    en: 'Topic clusters: how to build topical authority on Google',
    es: 'Topic clusters: cómo construir autoridad en Google'
  },
  'Links internos: como fortalecer as páginas mais importantes do site': {
    en: 'Internal linking: how to strengthen the most important pages of your website',
    es: 'Enlaces internos: cómo fortalecer las páginas más importantes del sitio web'
  },
  'SEO on-page: checklist completo para páginas empresariais': {
    en: 'On-page SEO: complete checklist for business web pages',
    es: 'SEO on-page: checklist completo para páginas web empresariales'
  },
  'SEO técnico para pequenas empresas: o que realmente importa': {
    en: 'Technical SEO for small businesses: what truly matters',
    es: 'SEO técnico para pequeñas empresas: lo que realmente importa'
  },
  'Como atualizar conteúdos antigos e recuperar tráfego orgânico': {
    en: 'How to update legacy content and recover organic traffic',
    es: 'Cómo actualizar contenido antiguo y recuperar tráfico orgánico'
  },
  'Canibalização de palavras-chave: quando suas próprias páginas competem entre si': {
    en: 'Keyword cannibalization: when your own pages compete against each other',
    es: 'Canibalización de palabras clave: cuando sus propias páginas compiten entre sí'
  },
  'GEO: como preparar sua empresa para ser encontrada por inteligências artificiais': {
    en: 'GEO: how to prepare your company to be cited by artificial intelligence',
    es: 'GEO: cómo preparar su empresa para ser encontrada por inteligencias artificiales'
  },
  'AEO: como otimizar conteúdo para mecanismos de resposta': {
    en: 'AEO: how to optimize content for answer engines',
    es: 'AEO: cómo optimizar contenido para motores de respuesta'
  },
  'SEO para ChatGPT, Google AI e mecanismos de busca com inteligência artificial': {
    en: 'SEO for ChatGPT, Google AI, and AI-powered search engines',
    es: 'SEO para ChatGPT, Google AI y motores de búsqueda con inteligencia artificial'
  },
  'SEO tradicional vai acabar por causa da inteligência artificial?': {
    en: 'Will traditional SEO die because of artificial intelligence?',
    es: '¿Morirá el SEO tradicional a causa de la inteligencia artificial?'
  },
  'Como estruturar um site para mecanismos de busca e assistentes de IA': {
    en: 'How to structure a website for search engines and AI assistants',
    es: 'Cómo estructurar un sitio web para motores de búsqueda y asistentes de IA'
  },
  'Como criar conteúdo que possa ser citado por inteligências artificiais': {
    en: 'How to create content primed to be cited by AI models',
    es: 'Cómo crear contenido preparado para ser citado por modelos de IA'
  },
  'Dados estruturados e IA: por que Schema.org está ainda mais importante': {
    en: 'Structured data and AI: why Schema.org is now more important than ever',
    es: 'Datos estructurados e IA: por qué Schema.org es ahora más importante que nunca'
  },
  'FAQs ainda funcionam para SEO e buscas por inteligência artificial?': {
    en: 'Do FAQs still work for SEO and AI search queries?',
    es: '¿Siguen funcionando las FAQ para SEO y búsquedas con inteligencia artificial?'
  },
  'E-E-A-T: como demonstrar experiência e autoridade online': {
    en: 'E-E-A-T: how to demonstrate experience, expertise, and authority online',
    es: 'E-E-A-T: cómo demostrar experiencia, pericia y autoridad online'
  },
  'Busca sem clique: como empresas podem continuar conquistando clientes': {
    en: 'Zero-click searches: how companies can continue winning customers',
    es: 'Búsqueda sin clics: cómo las empresas pueden seguir captando clientes'
  },
  'Como transformar um site institucional em ferramenta de vendas': {
    en: 'How to turn a corporate website into an active sales tool',
    es: 'Cómo transformar un sitio web corporativo en una herramienta de ventas'
  },
  'CTA: como levar visitantes do site a entrar em contato': {
    en: 'CTA: how to guide website visitors to reach out',
    es: 'CTA: cómo guiar a los visitantes del sitio a ponerse en contacto'
  },
  'Landing page ou site: qual usar em cada estratégia': {
    en: 'Landing page vs full website: which to choose for each strategy',
    es: 'Landing page o sitio web: cuál utilizar en cada estrategia'
  },
  'Como aumentar a taxa de conversão de um site empresarial': {
    en: 'How to increase the conversion rate of a corporate website',
    es: 'Cómo aumentar la tasa de conversión de un sitio web corporativo'
  },
  'Por que muitos sites recebem visitas mas não geram clientes': {
    en: 'Why many websites receive traffic but fail to generate customers',
    es: 'Por qué muchos sitios reciben visitas pero no generan clientes'
  },
  'Formulário ou WhatsApp: qual converte melhor em um site local': {
    en: 'Contact form vs WhatsApp: which converts better on a local business website',
    es: 'Formulario o WhatsApp: cuál convierte mejor en un sitio web local'
  },
  'Como criar páginas de serviços que geram oportunidades comerciais': {
    en: 'How to build service pages that drive commercial opportunities',
    es: 'Cómo crear páginas de servicios que generan oportunidades comerciales'
  },
  'Prova social: como avaliações e cases aumentam conversões': {
    en: 'Social proof: how reviews and case studies elevate conversion rates',
    es: 'Prueba social: cómo las reseñas y casos de éxito elevan las conversiones'
  },
  'Como usar cases de clientes para fortalecer a credibilidade da empresa': {
    en: 'How to leverage client case studies to strengthen company credibility',
    es: 'Cómo utilizar casos de clientes para fortalecer la credibilidad corporativa'
  },
  'Jornada do cliente: do Google até o primeiro contato': {
    en: 'Customer journey: from the initial Google search to the first inquiry',
    es: 'El viaje del cliente: desde la búsqueda en Google hasta el primer contacto'
  },
  'Marketing digital para restaurantes em Curitiba e Região Metropolitana': {
    en: 'Digital marketing for restaurants in Curitiba and Metropolitan Region',
    es: 'Marketing digital para restaurantes en Curitiba y Área Metropolitana'
  },
  'Marketing digital para confeitarias e padarias': {
    en: 'Digital marketing for bakeries and pastry shops',
    es: 'Marketing digital para pastelerías y panaderías'
  },
  'Marketing digital para gelaterias e sorveterias': {
    en: 'Digital marketing for artisan gelaterias and ice cream parlors',
    es: 'Marketing digital para heladerías artesanales'
  },
  'Marketing digital para clínicas e profissionais de saúde': {
    en: 'Digital marketing for healthcare clinics and medical professionals',
    es: 'Marketing digital para clínicas y profesionales de la salud'
  },
  'Marketing digital para escritórios de advocacia': {
    en: 'Digital marketing for law firms and legal professionals',
    es: 'Marketing digital para despachos de abogados'
  },
  'Marketing digital para transportadoras e empresas de logística': {
    en: 'Digital marketing for freight transport and logistics companies',
    es: 'Marketing digital para empresas de transporte y logística'
  },
  'Marketing digital para pet shops e serviços veterinários': {
    en: 'Digital marketing for pet shops and veterinary clinics',
    es: 'Marketing digital para tiendas de mascotas y clínicas veterinarias'
  },
  'Marketing digital para negócios de beleza e estética': {
    en: 'Digital marketing for beauty salons and aesthetic clinics',
    es: 'Marketing digital para centros de estética y belleza'
  },
  'Reputação digital: o que o cliente encontra antes de falar com sua empresa': {
    en: 'Digital reputation: what prospects find before contacting your business',
    es: 'Reputación digital: lo que el cliente encuentra antes de contactar a su empresa'
  },
  'Como construir autoridade digital para uma pequena empresa': {
    en: 'How to build digital authority for a small business',
    es: 'Cómo construir autoridad digital para una pequeña empresa'
  },
  'Identidade visual e site: como transmitir profissionalismo': {
    en: 'Brand identity and website: how to convey true professionalism',
    es: 'Identidad visual y sitio web: cómo transmitir profesionalismo'
  },
  'Como avaliações online influenciam a decisão de compra': {
    en: 'How online reviews influence purchasing decisions',
    es: 'Cómo las reseñas online influyen en la decisión de compra'
  },
  'Como conseguir avaliações legítimas de clientes': {
    en: 'How to acquire authentic customer reviews',
    es: 'Cómo conseguir reseñas auténticas de clientes'
  },
  'O que fazer com avaliações negativas no Google': {
    en: 'How to manage and respond to negative Google reviews',
    es: 'Qué hacer ante reseñas negativas en Google'
  },
  'Como transformar clientes satisfeitos em prova social': {
    en: 'How to turn satisfied customers into powerful social proof',
    es: 'Cómo transformar clientes satisfechos en prueba social'
  },
  'Por que consistência de marca aumenta confiança': {
    en: 'Why brand consistency builds lasting customer trust',
    es: 'Por qué la consistencia de marca genera mayor confianza'
  },
  'Como mostrar experiência e credibilidade no site da empresa': {
    en: 'How to showcase experience and credibility on your business website',
    es: 'Cómo mostrar experiencia y credibilidad en el sitio web de la empresa'
  },
  'Cases, depoimentos e portfólio: como usar cada um': {
    en: 'Case studies, testimonials, and portfolio: how to use each effectively',
    es: 'Casos de éxito, testimonios y portafolio: cómo utilizar cada uno'
  },
  'Presença digital completa: site, Google, redes sociais e conteúdo': {
    en: 'Comprehensive digital presence: website, Google, social media, and content',
    es: 'Presencia digital integral: sitio web, Google, redes sociales y contenido'
  },
  'Marketing orgânico ou tráfego pago: como combinar os dois': {
    en: 'Organic marketing vs paid ads: how to combine both effectively',
    es: 'Marketing orgánico o publicidad de pago: cómo combinar ambos'
  },
  'Quanto uma pequena empresa deve investir em marketing digital': {
    en: 'How much should a small business invest in digital marketing',
    es: 'Cuánto debería invertir una pequeña empresa en marketing digital'
  },
  'Como montar um plano de marketing digital para 12 meses': {
    en: 'How to structure a 12-month digital marketing plan',
    es: 'Cómo estructurar un plan de marketing digital para 12 meses'
  },
  'Métricas de marketing digital que empresários realmente precisam acompanhar': {
    en: 'Digital marketing metrics business owners actually need to track',
    es: 'Métricas de marketing digital que los empresarios realmente deben monitorizar'
  },
  'Como saber se o marketing digital está trazendo retorno': {
    en: 'How to know if your digital marketing is generating measurable ROI',
    es: 'Cómo saber si su marketing digital está generando retorno de inversión'
  },
  'Google Analytics 4 para pequenas empresas: quais números acompanhar': {
    en: 'Google Analytics 4 for small businesses: essential numbers to track',
    es: 'Google Analytics 4 para pequeñas empresas: qué métricas analizar'
  },
  'Como preparar a presença digital da empresa para 2027': {
    en: 'How to prepare your company\'s digital presence for 2027',
    es: 'Cómo preparar la presencia digital de su empresa para 2027'
  },
  'Tendências de marketing digital para pequenas e médias empresas em 2027': {
    en: 'Digital marketing trends for small and medium businesses in 2027',
    es: 'Tendencias de marketing digital para pequeñas y medianas empresas en 2027'
  },
  'Como construir uma estratégia digital que continue gerando resultados no longo prazo': {
    en: 'How to build a digital strategy that delivers sustainable long-term results',
    es: 'Cómo construir una estrategia digital que siga generando resultados sostenibles a largo plazo'
  }
};

function translateTitle(ptTitle) {
  if (!ptTitle) return { en: '', es: '' };
  const trimmed = ptTitle.trim();
  if (exactTitleMap[trimmed]) {
    return exactTitleMap[trimmed];
  }
  // Fallback
  return { en: trimmed, es: trimmed };
}

function translateDesc(ptDesc, ptTitle) {
  if (!ptDesc) return { en: '', es: '' };
  
  // If description follows the standard template:
  if (ptDesc.includes('Descubra estratégias práticas de marketing digital e SEO para empresas de São José dos Pinhais')) {
    return {
      en: 'Discover practical digital marketing and SEO strategies for businesses in São José dos Pinhais, focused on Google visibility, authority, and lead generation.',
      es: 'Descubra estrategias prácticas de marketing digital y SEO para empresas de São José dos Pinhais, con foco en visibilidad en Google, autoridad y captación de clientes.'
    };
  }

  if (ptDesc.includes('Descubra estratégias práticas de marketing digital e SEO para empresas de Curitiba')) {
    return {
      en: 'Discover practical digital marketing and SEO strategies for businesses in Curitiba, focused on Google visibility, authority, and lead generation.',
      es: 'Descubra estrategias prácticas de marketing digital y SEO para empresas de Curitiba, con foco en visibilidad en Google, autoridad y captación de clientes.'
    };
  }

  if (ptDesc.includes('Descubra estratégias práticas de marketing digital e SEO para empresas da Região Metropolitana')) {
    return {
      en: 'Discover practical digital marketing and SEO strategies for businesses in the Curitiba Metropolitan Area, focused on visibility, authority, and growth.',
      es: 'Descubra estrategias prácticas de marketing digital y SEO para empresas del Área Metropolitana de Curitiba, con foco en visibilidad, autoridad y crecimiento.'
    };
  }

  // Derive based on title
  const t = translateTitle(ptTitle);
  return {
    en: `Explore in-depth insights and actionable recommendations: ${t.en.toLowerCase()}. Practical guidance by CONEXUS.`,
    es: `Descubra análisis detallados y recomendaciones prácticas: ${t.es.toLowerCase()}. Orientación estratégica de CONEXUS.`
  };
}

module.exports = { exactTitleMap, translateTitle, translateDesc };
