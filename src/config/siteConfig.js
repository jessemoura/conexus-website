/**
 * Configuração Central do Website CONEXUS
 * 
 * Marca pública: CONEXUS
 * E-mail: comercial@conexus.press
 * WhatsApp: Número configurável mantido oculto nos links de CTA.
 */

export const siteConfig = {
  brandName: 'CONEXUS',
  tagline: 'Marketing digital para transformar presença online em oportunidades',
  email: 'comercial@conexus.press',
  whatsappNumber: '', // Será configurado com o número definitivo antes do go-live
  
  // Redes Sociais oficiais
  social: {
    linkedin: 'https://www.linkedin.com/in/jesse-ribeiro-a49666409/',
    instagram: 'https://instagram.com/' // URL temporária/placeholder conforme briefing
  },

  // SEO Defaults
  seo: {
    canonicalBase: 'https://conexus.press',
    home: {
      title: 'Agência de Marketing Digital para Empresas | CONEXUS',
      description: 'Websites profissionais, SEO, presença no Google, branding e redes sociais para empresas que querem fortalecer sua presença digital e gerar oportunidades.',
      h1: 'Marketing digital para transformar presença online em oportunidades'
    }
  },

  // Mensagens pré-preenchidas de WhatsApp por contexto
  whatsappMessages: {
    homeHero: 'Olá! Conheci a CONEXUS pelo website e gostaria de conversar sobre a presença digital da minha empresa.',
    serviceGeneral: 'Olá! Gostaria de mais informações sobre as soluções de marketing digital da CONEXUS.',
    serviceWebsites: 'Olá! Tenho interesse em criar um site profissional para minha empresa com a CONEXUS.',
    serviceOnePage: 'Olá! Gostaria de saber mais sobre a criação de site One Page com a CONEXUS.',
    serviceSEO: 'Olá! Quero melhorar a presença e visibilidade da minha empresa no Google com a CONEXUS.',
    serviceSEOLocal: 'Olá! Tenho interesse no serviço de SEO Local e Perfil da Empresa no Google da CONEXUS.',
    serviceBranding: 'Olá! Gostaria de fortalecer a marca e identidade visual da minha empresa com a CONEXUS.',
    serviceSocialMedia: 'Olá! Gostaria de saber mais sobre a gestão de redes sociais da CONEXUS.',
    portfolio: 'Olá! Vi o portfólio da CONEXUS e gostaria de solicitar uma proposta para meu projeto.',
    contactFinal: 'Olá! Gostaria de conversar com a equipe da CONEXUS sobre o meu projeto digital.'
  },

  // Catálogo de Serviços para Cards da Home
  services: [
    {
      id: 'criacao-de-sites',
      title: 'Criação de Sites',
      description: 'Websites profissionais, rápidos, responsivos e otimizados desde a estrutura para transmitir autoridade e gerar oportunidades.',
      link: '/servicos/criacao-de-sites/',
      ctaMessageKey: 'serviceWebsites',
      featured: true
    },
    {
      id: 'site-one-page',
      title: 'Site One Page',
      description: 'Estrutura objetiva de página única, ideal para apresentar sua empresa e serviços com clareza e foco total em conversão.',
      link: '/servicos/site-one-page/',
      ctaMessageKey: 'serviceOnePage',
      featured: false
    },
    {
      id: 'seo',
      title: 'SEO para Empresas',
      description: 'Estratégias de otimização on-page e técnica para melhorar o posicionamento orgânico da sua empresa nas pesquisas do Google.',
      link: '/servicos/seo/',
      ctaMessageKey: 'serviceSEO',
      featured: true
    },
    {
      id: 'seo-local-google-meu-negocio',
      title: 'SEO Local & Google',
      description: 'Otimização do Perfil da Empresa no Google e presença local para ajudar clientes da sua região a encontrarem seu negócio.',
      link: '/servicos/seo-local-google-meu-negocio/',
      ctaMessageKey: 'serviceSEOLocal',
      featured: false
    },
    {
      id: 'branding-identidade-visual',
      title: 'Branding & Identidade',
      description: 'Construção de identidades visuais marcantes, consistentes e profissionais para destacar sua empresa em todos os canais.',
      link: '/servicos/branding-identidade-visual/',
      ctaMessageKey: 'serviceBranding',
      featured: false
    },
    {
      id: 'gestao-redes-sociais',
      title: 'Gestão de Redes Sociais',
      description: 'Planejamento estratégico de conteúdo e design profissional para construir autoridade e engajamento com seu público.',
      link: '/servicos/gestao-redes-sociais/',
      ctaMessageKey: 'serviceSocialMedia',
      featured: false
    }
  ],

  // Portfólio Inicial Aprovado (Apresentação Pública por Segmento e Mercado)
  portfolio: [
    {
      title: 'Di Piallato Gelateria',
      category: 'Website Profissional & SEO Local',
      tag: 'GELATERIA ARTESANAL • MATINHOS/PR',
      location: 'Matinhos, PR • Brasil',
      segment: 'Gelateria Artesanal',
      image: '/assets/images/di-piallato-gelateria-portfolio-conexus.png'
    },
    {
      title: 'Michelly Corrêa',
      category: 'Website Profissional',
      tag: 'JORNALISMO & COMUNICAÇÃO • BRASIL',
      location: 'Brasil',
      segment: 'Jornalista & Comunicadora',
      image: '/assets/images/conexus-portfolio-michelly-correa-cover.png.png'
    },
    {
      title: 'Welcome Book Digital',
      category: 'Website Digital • UX',
      tag: 'HOSPITALIDADE • CURITIBA/PR',
      location: 'Curitiba, PR • Brasil',
      segment: 'Hospitalidade & Hospedagem',
      image: '/assets/images/welcome-book-digital-curitiba-portfolio-conexus.png'
    },
    {
      title: 'SOS Aberturas',
      category: 'Website Institucional',
      tag: 'SERVIÇOS ESPECIALIZADOS • PORTUGAL',
      location: 'Portugal',
      segment: 'Serviços Especializados',
      image: '/assets/images/conexus-portfolio-projects-13.png.png'
    },
    {
      title: 'Nikki Studio',
      category: 'Website & Branding',
      tag: 'BELEZA & ESTÉTICA • REINO UNIDO',
      location: 'Reino Unido',
      segment: 'Nail Studio & Estética',
      image: '/assets/images/conexus-portfolio-projects-13.png.png'
    },
    {
      title: 'CONEXXUS Digital Marketing UK',
      category: 'Website Institucional',
      tag: 'MARKETING DIGITAL • REINO UNIDO',
      location: 'Reino Unido',
      segment: 'Marketing Digital Internacional',
      image: '/assets/images/conexus-portfolio-projects-13.png.png'
    },
    {
      title: 'Crafix',
      category: 'Manutenção & Reformas',
      tag: 'HOME IMPROVEMENTS • REINO UNIDO',
      location: 'Reino Unido',
      segment: 'Manutenção & Reformas',
      image: '/assets/images/conexus-portfolio-projects-13.png.png'
    },
    {
      title: 'Lumora Cleaning Services',
      category: 'Website & SEO Local',
      tag: 'CLEANING SERVICES • REINO UNIDO',
      location: 'Reino Unido',
      segment: 'Cleaning Services',
      image: '/assets/images/conexus-portfolio-projects-13.png.png'
    }
  ],

  // Artigos do Blog Iniciais Aprovados
  blogArticles: [
    {
      id: 'marketing-digital-para-empresas',
      date: '15/07/2026',
      category: 'Marketing Digital',
      title: 'Marketing Digital para Empresas: Como Construir uma Presença Digital que Gera Oportunidades',
      excerpt: 'Um guia completo unindo websites, SEO, branding e redes sociais para impulsionar a autoridade e o crescimento da sua empresa.',
      image: '/assets/images/marketing-digital.jpg',
      link: '/blog/marketing-digital-para-empresas/'
    },
    {
      id: 'redes-sociais-para-empresas',
      date: '01/07/2026',
      category: 'Redes Sociais',
      title: 'Redes Sociais para Empresas: Como Fortalecer sua Marca e Atrair Clientes',
      excerpt: 'Estratégias práticas de posicionamento e criação de conteúdo para empresas que querem transformar engajamento em negócios.',
      image: '/assets/images/redes-sociais.jpg',
      link: '/blog/redes-sociais-para-empresas/'
    },
    {
      id: 'importancia-hospedagem-de-qualidade',
      date: '01/06/2026',
      category: 'Websites',
      title: 'A Importância de Contratar uma Hospedagem de Qualidade para o Seu Site',
      excerpt: 'Descubra como a infraestrutura de hospedagem impacta a velocidade, segurança e o posicionamento orgânico do seu site no Google.',
      image: '/assets/images/hospedagem.jpg',
      link: '/blog/importancia-hospedagem-de-qualidade/'
    }
  ]
};
