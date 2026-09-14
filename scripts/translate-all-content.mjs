import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { ptDict } from './dictionaries/pt.mjs';
import { enDict } from './dictionaries/en.mjs';
import { esDict } from './dictionaries/es.mjs';

// Let's create the rich HTML articles dictionaries
const articleData = {
  porQueSite: {
    pt: {
      title: 'Por que sua empresa precisa de um site e não deve depender apenas das redes sociais',
      lead: 'As redes sociais são vitais para gerar conexão e alcance, mas construir todo o seu negócio apenas nelas é como construir uma casa em terreno alugado. Saiba por que um site próprio é a base da autoridade digital da sua empresa.',
      date: '05/08/2026',
      badge: 'Websites'
    },
    en: {
      title: 'Why your company needs a website and shouldn\'t rely solely on social media',
      lead: 'Social media is vital for driving connection and reach, but building your entire business solely on it is like building on rented land. Discover why a proprietary website is the bedrock of corporate digital authority.',
      date: '08/05/2026',
      badge: 'Websites'
    },
    es: {
      title: 'Por qué su empresa necesita un sitio web y no debe depender solo de las redes sociales',
      lead: 'Las redes sociales son vitales para generar conexión y alcance, pero construir todo su negocio solo en ellas es como construir en terreno alquilado. Conozca por qué un sitio propio es la base de la autoridad digital.',
      date: '05/08/2026',
      badge: 'Sitios Web'
    }
  },
  quantoCusta: {
    pt: {
      title: 'Quanto custa um site profissional em 2026? Preços, Prazos e Fatores de Custo',
      lead: 'Entenda os principais fatores que influenciam o preço de um site institucional, as diferenças entre modelos One Page e Multipáginas e como escolher a melhor opção.',
      date: '05/08/2026',
      badge: 'Preços & Prazos'
    },
    en: {
      title: 'How much does a professional website cost in 2026? Pricing, Timelines, and Cost Factors',
      lead: 'Understand the key factors shaping corporate website costs, differences between One Page and Multi-page models, and how to select the best option.',
      date: '08/05/2026',
      badge: 'Pricing & Timelines'
    },
    es: {
      title: '¿Cuánto cuesta un sitio web profesional en 2026? Precios, Plazos y Factores de Costo',
      lead: 'Comprenda los factores clave que influyen en el precio de un sitio web corporativo, las diferencias entre One Page y Multipágina y cómo elegir la mejor opción.',
      date: '05/08/2026',
      badge: 'Precios y Plazos'
    }
  },
  comoUsarGoogle: {
    pt: {
      title: 'Como transformar seu site em uma ferramenta para atrair clientes no Google',
      lead: 'Um site não deve ser apenas um cartão de visitas digital. Descubra os 8 passos essenciais para transformar seu website institucional em um motor ativo de novos clientes.',
      date: '05/08/2026',
      badge: 'SEO & Tráfego'
    },
    en: {
      title: 'How to turn your website into a tool to attract clients on Google',
      lead: 'A website should not be just a digital business card. Discover the 8 essential steps to transform your institutional website into an active client acquisition engine.',
      date: '08/05/2026',
      badge: 'SEO & Traffic'
    },
    es: {
      title: 'Cómo transformar su sitio web en una herramienta para atraer clientes en Google',
      lead: 'Un sitio web no debe ser solo una tarjeta de presentación. Descubra los 8 pasos esenciales para convertir su sitio institucional en un motor activo de nuevos clientes.',
      date: '05/08/2026',
      badge: 'SEO y Tráfico'
    }
  },
  seoLocalSaoJose: {
    pt: {
      title: 'Como colocar sua empresa no Google e atrair mais clientes em São José dos Pinhais',
      lead: 'Saiba como melhorar a presença da sua empresa no Google, Google Maps e buscas locais em São José dos Pinhais com estratégias de SEO local.',
      date: '05/08/2026',
      badge: 'SEO Local'
    },
    en: {
      title: 'How to put your business on Google and attract more clients in São José dos Pinhais',
      lead: 'Learn how to improve your business\'s presence on Google, Google Maps, and local search in São José dos Pinhais with local SEO strategies.',
      date: '08/05/2026',
      badge: 'Local SEO'
    },
    es: {
      title: 'Cómo colocar su empresa en Google y atraer más clientes en São José dos Pinhais',
      lead: 'Descubra cómo mejorar la presencia de su empresa en Google, Google Maps y búsquedas locales en São José dos Pinhais con estrategias de SEO local.',
      date: '05/08/2026',
      badge: 'SEO Local'
    }
  },
  guestHubArtigo: {
    pt: {
      title: 'CONEXUS Guest Hub: uma nova experiência digital para hóspedes',
      lead: 'Veja como transformar a estadia dos seus hóspedes em uma experiência moderna, prática e conectada, com informações úteis e recomendações locais na palma da mão.',
      date: '05/08/2026',
      badge: 'Guest Hub'
    },
    en: {
      title: 'CONEXUS Guest Hub: a new digital guest experience',
      lead: 'Discover how to transform your guests\' stay into a modern, practical, and connected experience, with useful property guides and local dining tips.',
      date: '08/05/2026',
      badge: 'Guest Hub'
    },
    es: {
      title: 'CONEXUS Guest Hub: una nueva experiencia digital para huéspedes',
      lead: 'Descubra cómo transformar la estancia de sus huéspedes en una experiencia moderna, práctica y conectada con guías útiles y recomendaciones locales.',
      date: '05/08/2026',
      badge: 'Guest Hub'
    }
  },
  hospedagem: {
    pt: {
      title: 'A Importância de Contratar uma Hospedagem de Qualidade para o Seu Site',
      lead: 'Velocidade, segurança e estabilidade começam na infraestrutura do servidor. Entenda por que uma hospedagem de alta performance é indispensável para o sucesso do seu site.',
      date: '05/08/2026',
      badge: 'Infraestrutura'
    },
    en: {
      title: 'The Importance of Quality Hosting for Your Website',
      lead: 'Speed, security, and uptime stability begin at the server level. Learn why high-performance hosting is essential for your website\'s success.',
      date: '08/05/2026',
      badge: 'Infrastructure'
    },
    es: {
      title: 'La Importancia de Contratar un Hospedaje de Calidad para su Sitio Web',
      lead: 'Velocidad, seguridad y estabilidad comienzan en la infraestructura del servidor. Entienda por qué un hosting de alto rendimiento es clave.',
      date: '05/08/2026',
      badge: 'Infraestructura'
    }
  },
  marketingDigital: {
    pt: {
      title: 'Marketing Digital para Empresas: Como Construir uma Presença Digital que Gera Oportunidades',
      lead: 'Mais do que postar em redes sociais: saiba como estruturar um ecossistema digital integrado que posiciona sua empresa com autoridade e atrai clientes qualificados.',
      date: '05/08/2026',
      badge: 'Estratégia'
    },
    en: {
      title: 'Digital Marketing for Businesses: How to Build a Digital Presence that Drives Growth',
      lead: 'Beyond social media posting: learn how to structure an integrated digital ecosystem that positions your company with authority and captures qualified leads.',
      date: '08/05/2026',
      badge: 'Strategy'
    },
    es: {
      title: 'Marketing Digital para Empresas: Cómo Construir una Presencia Digital que Genera Oportunidades',
      lead: 'Más que publicar en redes sociales: aprenda a estructurar un ecosistema digital integrado que posicione su empresa con autoridad y capte clientes.',
      date: '05/08/2026',
      badge: 'Estrategia'
    }
  },
  redesSociais: {
    pt: {
      title: 'Redes Sociais para Empresas: Como Fortalecer sua Marca e Atrair Clientes',
      lead: 'Como usar Instagram, LinkedIn e outras plataformas de forma estratégica para gerar autoridade, engajar o público e direcionar oportunidades para seu negócio.',
      date: '05/08/2026',
      badge: 'Redes Sociais'
    },
    en: {
      title: 'Social Media for Businesses: How to Strengthen Your Brand and Attract Clients',
      lead: 'How to use Instagram, LinkedIn, and other channels strategically to build authority, engage your audience, and route leads into your sales funnel.',
      date: '08/05/2026',
      badge: 'Social Media'
    },
    es: {
      title: 'Redes Sociales para Empresas: Cómo Fortalecer su Marca y Atraer Clientes',
      lead: 'Cómo utilizar Instagram, LinkedIn y otras plataformas de forma estratégica para construir autoridad, interactuar y dirigir prospectos a su negocio.',
      date: '05/08/2026',
      badge: 'Redes Sociales'
    }
  }
};

// Add article metadata to dictionaries
ptDict.articlesMeta = {};
enDict.articlesMeta = {};
esDict.articlesMeta = {};

Object.keys(articleData).forEach(k => {
  ptDict.articlesMeta[k] = articleData[k].pt;
  enDict.articlesMeta[k] = articleData[k].en;
  esDict.articlesMeta[k] = articleData[k].es;
});

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(ptDict, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(enDict, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(esDict, null, 2)};\n`, 'utf8');

console.log('Updated pt.js, en.js, and es.js with full articles metadata!');
