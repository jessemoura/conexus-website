import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

const translationsToAdd = {
  pt: {
    blog: {
      backToBlog: 'Voltar para o Blog',
      readArticle: 'Ler Artigo',
      articles: {
        conexusGuestHub: {
          demoBtn: 'Conheça a demonstração Vila Serena',
          serviceBtn: 'Conheça o CONEXUS Guest Hub'
        }
      }
    },
    common: {
      chatWhatsapp: 'Conversar pelo WhatsApp',
      talkWhatsAppConexus: 'Falar com a CONEXUS no WhatsApp',
      talkToTeam: 'Conversar com a Equipe'
    },
    faq: {
      askOnWhatsapp: 'Tirar Dúvidas pelo WhatsApp'
    },
    portfolio: {
      backToPortfolio: 'Voltar para o Portfólio',
      startSimilarProject: 'Iniciar Projeto Semelhante',
      viewCase: 'Ver Case Completo'
    },
    services: {
      requestSiteQuote: 'Solicitar Orçamento de Site',
      requestIntegratedProposal: 'Solicitar Proposta Integrada',
      talkAboutProject: 'Conversar sobre meu projeto',
      branding: {
        cta: 'Quero fortalecer minha marca'
      },
      seo: {
        cta: 'Quero melhorar minha presença no Google'
      },
      seoLocal: {
        cta: 'Quero ser encontrado na minha região'
      },
      siteOnePage: {
        cta: 'Quero meu site One Page'
      },
      redesSociais: {
        cta: 'Quero fortalecer minhas redes sociais'
      },
      criacaoSites: {
        cta: 'Quero criar meu site profissional',
        b1: 'Apresentação direta da proposta',
        b2: 'Seções em âncoras personalizadas',
        b3: 'Alta taxa de conversão direta',
        b4: 'Arquitetura SEO expansível',
        b5: 'Páginas exclusivas para cada serviço',
        b6: 'Preparado para estratégias de conteúdo'
      },
      guestHub: {
        compGenericTitle: 'Páginas de links genéricas',
        f1: 'Central digital 100% Mobile-First',
        f2: 'Regras da casa, Wi-Fi e check-in/out',
        f3: 'Guia gastronômico e atrações locais',
        f4: 'Botão direto de WhatsApp com anfitrião',
        f5: 'QR Code para imprimir e dispor no local',
        f6: 'Tudo incluso no plano Guest Hub Digital',
        f7: 'Welcome Book em PDF diagramado em alta resolução',
        f8: 'Arquivo pronto para impressão em gráfica / encadernação',
        f9: 'Placa elegante com QR Code para balcão ou mesa',
        f10: 'Todas as funcionalidades do pacote completo',
        f11: 'Personalização avançada de seções e fotos',
        f12: 'Suporte prioritário na implementação',
        request: 'Solicitar CONEXUS Guest Hub',
        viewDemo: 'Ver Demo Vila Serena'
      },
      s1: {
        b1: 'Design exclusivo e Mobile-First',
        b2: 'Estrutura pronta para SEO no Google',
        b3: 'Integração direta com WhatsApp'
      },
      s2: {
        b1: 'Navegação fluida em página única',
        b2: 'Foco total em conversão e agilidade'
      },
      s3: {
        b1: 'Pesquisa avançada de palavras-chave',
        b2: 'Otimização On-Page e técnica',
        b3: 'Crescimento orgânico sustentável'
      },
      s4: {
        b1: 'Otimização do Perfil da Empresa',
        b2: 'Destaque no Google Maps regional',
        b3: 'Atração de clientes nas proximidades'
      },
      s5: {
        b1: 'Criação de logotipo profissional',
        b2: 'Manual de marca e guia de cores',
        b3: 'Posicionamento de imagem premium'
      },
      s6: {
        b1: 'Planejamento mensal de conteúdo',
        b2: 'Design visual alinhado à marca',
        b3: 'Fortalecimento de autoridade social'
      },
      s7: {
        b1: 'Centraliza informações da hospedagem',
        b2: 'Reduz dúvidas repetitivas',
        b3: 'Experiência otimizada para celular'
      }
    }
  },
  en: {
    blog: {
      backToBlog: 'Back to Blog',
      readArticle: 'Read Article',
      articles: {
        conexusGuestHub: {
          demoBtn: 'Explore the Vila Serena demo',
          serviceBtn: 'Discover CONEXUS Guest Hub'
        }
      }
    },
    common: {
      chatWhatsapp: 'Chat on WhatsApp',
      talkWhatsAppConexus: 'Talk to CONEXUS on WhatsApp',
      talkToTeam: 'Speak with the Team'
    },
    faq: {
      askOnWhatsapp: 'Ask Questions on WhatsApp'
    },
    portfolio: {
      backToPortfolio: 'Back to Portfolio',
      startSimilarProject: 'Start a Similar Project',
      viewCase: 'View Full Case Study'
    },
    services: {
      requestSiteQuote: 'Request Website Proposal',
      requestIntegratedProposal: 'Request Integrated Proposal',
      talkAboutProject: 'Talk about my project',
      branding: {
        cta: 'I want to strengthen my brand'
      },
      seo: {
        cta: 'I want to improve my Google presence'
      },
      seoLocal: {
        cta: 'I want to be found in my region'
      },
      siteOnePage: {
        cta: 'I want my One Page website'
      },
      redesSociais: {
        cta: 'I want to strengthen my social media'
      },
      criacaoSites: {
        cta: 'I want to create my professional website',
        b1: 'Direct presentation of the value proposition',
        b2: 'Custom anchor navigation sections',
        b3: 'High direct conversion rate',
        b4: 'Scalable SEO architecture',
        b5: 'Dedicated pages for each service',
        b6: 'Ready for content marketing strategies'
      },
      guestHub: {
        compGenericTitle: 'Generic link pages',
        f1: '100% Mobile-First digital hub',
        f2: 'House rules, Wi-Fi and check-in/out',
        f3: 'Dining guide and local attractions',
        f4: 'Direct WhatsApp button with host',
        f5: 'QR Code to print and place on site',
        f6: 'Everything included in the Digital Guest Hub plan',
        f7: 'High-resolution formatted PDF Welcome Book',
        f8: 'Print-ready file for print shop / binding',
        f9: 'Elegant display stand with QR Code for desk or counter',
        f10: 'All features of the complete package',
        f11: 'Advanced customization of sections and photos',
        f12: 'Priority implementation support',
        request: 'Request CONEXUS Guest Hub',
        viewDemo: 'View Vila Serena Demo'
      },
      s1: {
        b1: 'Exclusive Mobile-First design',
        b2: 'Built-in Google SEO structure',
        b3: 'Direct WhatsApp integration'
      },
      s2: {
        b1: 'Smooth single-page navigation',
        b2: 'Total focus on conversion and speed'
      },
      s3: {
        b1: 'Advanced keyword research',
        b2: 'On-Page and technical optimization',
        b3: 'Sustainable organic growth'
      },
      s4: {
        b1: 'Business Profile optimization',
        b2: 'Prominence on regional Google Maps',
        b3: 'Attracting nearby customers'
      },
      s5: {
        b1: 'Professional logo design',
        b2: 'Brand guidelines and color palette',
        b3: 'Premium brand positioning'
      },
      s6: {
        b1: 'Monthly content planning',
        b2: 'Visual design aligned with the brand',
        b3: 'Strengthening social authority'
      },
      s7: {
        b1: 'Centralizes property information',
        b2: 'Reduces repetitive questions',
        b3: 'Optimized mobile experience'
      }
    }
  },
  es: {
    blog: {
      backToBlog: 'Volver al Blog',
      readArticle: 'Leer Artículo',
      articles: {
        conexusGuestHub: {
          demoBtn: 'Conozca la demostración Vila Serena',
          serviceBtn: 'Descubra CONEXUS Guest Hub'
        }
      }
    },
    common: {
      chatWhatsapp: 'Conversar por WhatsApp',
      talkWhatsAppConexus: 'Hablar con CONEXUS en WhatsApp',
      talkToTeam: 'Hablar con el Equipo'
    },
    faq: {
      askOnWhatsapp: 'Resolver Dudas por WhatsApp'
    },
    portfolio: {
      backToPortfolio: 'Volver al Portafolio',
      startSimilarProject: 'Iniciar Proyecto Similar',
      viewCase: 'Ver Caso Completo'
    },
    services: {
      requestSiteQuote: 'Solicitar Presupuesto de Sitio Web',
      requestIntegratedProposal: 'Solicitar Propuesta Integrada',
      talkAboutProject: 'Conversar sobre mi proyecto',
      branding: {
        cta: 'Quiero fortalecer mi marca'
      },
      seo: {
        cta: 'Quiero mejorar mi presencia en Google'
      },
      seoLocal: {
        cta: 'Quiero ser encontrado en mi región'
      },
      siteOnePage: {
        cta: 'Quiero mi sitio web One Page'
      },
      redesSociais: {
        cta: 'Quiero fortalecer mis redes sociales'
      },
      criacaoSites: {
        cta: 'Quiero crear mi sitio web profesional',
        b1: 'Presentación directa de la propuesta',
        b2: 'Secciones con anclas personalizadas',
        b3: 'Alta tasa de conversión directa',
        b4: 'Arquitectura SEO escalable',
        b5: 'Páginas exclusivas para cada servicio',
        b6: 'Preparado para estrategias de contenido'
      },
      guestHub: {
        compGenericTitle: 'Páginas de enlaces genéricas',
        f1: 'Central digital 100% Mobile-First',
        f2: 'Normas de la casa, Wi-Fi y check-in/out',
        f3: 'Guía gastronómica y atracciones locales',
        f4: 'Botón directo de WhatsApp con el anfitrión',
        f5: 'Código QR para imprimir y colocar en el lugar',
        f6: 'Todo incluido en el plan Guest Hub Digital',
        f7: 'Welcome Book en PDF diagramado en alta resolución',
        f8: 'Archivo listo para imprenta / encuadernación',
        f9: 'Elegante placa con código QR para mostrador o mesa',
        f10: 'Todas las funcionalidades del paquete completo',
        f11: 'Personalización avanzada de secciones y fotos',
        f12: 'Soporte prioritario en la implementación',
        request: 'Solicitar CONEXUS Guest Hub',
        viewDemo: 'Ver Demo Vila Serena'
      },
      s1: {
        b1: 'Diseño exclusivo y Mobile-First',
        b2: 'Estructura lista para SEO en Google',
        b3: 'Integración directa con WhatsApp'
      },
      s2: {
        b1: 'Navegación fluida en una sola página',
        b2: 'Foco total en conversión y agilidad'
      },
      s3: {
        b1: 'Investigación avanzada de palabras clave',
        b2: 'Optimización On-Page y técnica',
        b3: 'Crecimiento orgánico sostenible'
      },
      s4: {
        b1: 'Optimización del Perfil de Empresa',
        b2: 'Destacado en Google Maps regional',
        b3: 'Atracción de clientes en las inmediaciones'
      },
      s5: {
        b1: 'Creación de logotipo profesional',
        b2: 'Manual de marca y guía de colores',
        b3: 'Posicionamiento de imagen premium'
      },
      s6: {
        b1: 'Planificación mensual de contenidos',
        b2: 'Diseño visual alineado a la marca',
        b3: 'Fortalecimiento de la autoridad social'
      },
      s7: {
        b1: 'Centraliza la información del alojamiento',
        b2: 'Reduce dudas repetitivas',
        b3: 'Experiencia optimizada para móviles'
      }
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

deepMerge(pt, translationsToAdd.pt);
deepMerge(en, translationsToAdd.en);
deepMerge(es, translationsToAdd.es);

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully updated src/i18n/pt.js, en.js, and es.js with all 60 keys!');
