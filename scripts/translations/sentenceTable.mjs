import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';

// Sentence-by-sentence high-level professional translator
// Preserves: CONEXUS, CONEXUS Guest Hub, Welcome Book, client names, emails, URLs, numbers, technical terms.

const sentenceTable = {
  // Common UI labels
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

  // Services badges & headers
  'SEDE DIGITAL PROPRIETÁRIA': { en: 'PROPRIETARY DIGITAL HEADQUARTERS', es: 'SEDE DIGITAL PROPIA' },
  'DESAFIOS COMERCIAIS RESOLVIDOS': { en: 'BUSINESS CHALLENGES RESOLVED', es: 'DESAFÍOS COMERCIALES RESUELTOS' },
  'FORMATOS DE PROJETO': { en: 'PROJECT FORMATS', es: 'FORMATOS DE PROYECTO' },
  'QUALIDADE TÉCNICA': { en: 'TECHNICAL EXCELLENCE', es: 'CALIDAD TÉCNICA' },
  'DÚVIDAS FREQUENTES': { en: 'FREQUENTLY ASKED QUESTIONS', es: 'PREGUNTAS FRECUENTES' },
  'Por que sua Empresa Precisa de um Website Profissional?': { en: 'Why Does Your Business Need a Professional Website?', es: '¿Por qué su Empresa Necesita un Sitio Web Profesional?' },
  'Diferente das redes sociais, onde o algoritmo altera as regras constantemente, seu website é o único canal digital 100% sob seu controle.': { en: 'Unlike social media, where algorithms constantly change the rules, your website is the only digital channel 100% under your control.', es: 'A diferencia de las redes sociales, donde el algoritmo cambia las reglas constantemente, su sitio web es el único canal digital 100% bajo su control.' },
  'Credibilidade & Autoridade': { en: 'Credibility & Authority', es: 'Credibilidad y Autoridad' },
  'Transmita imagem de empresa sólida e profissional aos clientes no primeiro contato visual.': { en: 'Convey a solid, professional corporate image to clients from the very first visual touchpoint.', es: 'Transmita una imagen de empresa sólida y profesional a sus clientes desde el primer impacto visual.' },
  'Navegação Mobile-First': { en: 'Mobile-First Navigation', es: 'Navegación Mobile-First' },
  'Interface totalmente otimizada para smartphones, onde mais de 80% do tráfego navega hoje.': { en: 'Fully optimized interface for smartphones, where over 80% of digital traffic happens today.', es: 'Interfaz totalmente optimizada para smartphones, donde navega más del 80% del tráfico actual.' },
  'Encontrável no Google (SEO)': { en: 'Findable on Google (SEO)', es: 'Posicionado en Google (SEO)' },
  'Código semântico e arquitetura rápida preparada para ranquear nas pesquisas de clientes.': { en: 'Semantic code and ultra-fast architecture engineered to rank for prospective client searches.', es: 'Código semántico y arquitectura veloz preparada para posicionarse en las búsquedas de clientes.' },
  'Geração Contínua de Leads': { en: 'Continuous Lead Generation', es: 'Generación Continua de Leads' },
  'Botões estratégicos de ação (WhatsApp/Formulários) posicionados nos pontos certos.': { en: 'Strategic action buttons (WhatsApp & Forms) positioned at optimal conversion points.', es: 'Botones estratégicos de acción (WhatsApp y Formularios) ubicados en puntos clave.' },
  'Falta de Confiança de Novos Clientes': { en: 'Lack of Trust from New Prospects', es: 'Falta de Confianza de Nuevos Clientes' },
  'Clientes pesquisam no Google antes de fechar negócio. Sem um site profissional, sua empresa perde vendas para a concorrência.': { en: 'Customers research on Google before making decisions. Without a professional website, your business loses sales to competitors.', es: 'Los clientes investigan en Google antes de contratar. Sin un sitio web profesional, su empresa pierde ventas frente a sus competidores.' },
  'Dependência Excessiva de Redes Sociais': { en: 'Over-Reliance on Social Media Platforms', es: 'Dependencia Excesiva de Redes Sociales' },
  'Algoritmos e contas podem mudar ou ser bloqueadas a qualquer momento. Seu site próprio é um ativo definitivo e permanente da sua marca.': { en: 'Algorithms and accounts can change or be restricted at any time. Your own website is a permanent, definitive brand asset.', es: 'Los algoritmos y las cuentas pueden cambiar o ser bloqueadas en cualquier momento. Su sitio web es un activo permanente de su marca.' },
  'Dificuldade de Explicar Serviços Complexos': { en: 'Difficulty Explaining Complex Services', es: 'Dificultad para Explicar Servicios Complejos' },
  'Uma página institucional organiza seu portfólio, diferenciais e propostas de valor de forma clara e visualmente impactante.': { en: 'An institutional website organizes your portfolio, competitive advantages, and value propositions clearly and visually.', es: 'Un sitio institucional organiza su portafolio, diferenciales y propuestas de valor de forma clara y visualmente impactante.' },
  'OBJETIVO & RÁPIDO': { en: 'DIRECT & FAST', es: 'DIRECTO Y ÁGIL' },
  'Site One Page': { en: 'One Page Website', es: 'Sitio One Page' },
  'Estrutura concisa em página única, ideal para apresentar sua empresa, serviços principais e canal direto de WhatsApp em uma experiência fluida.': { en: 'Concise single-page architecture, ideal for showcasing your company, core services, and direct WhatsApp channel in a seamless flow.', es: 'Estructura concisa de página única, ideal para presentar su empresa, servicios clave y canal directo de WhatsApp en una experiencia fluida.' },
  'COMPLETO & ESCALÁVEL': { en: 'COMPLETE & SCALABLE', es: 'COMPLETO Y ESCALABLE' },
  'Website Multipáginas': { en: 'Multi-Page Website', es: 'Sitio Web Multipágina' },
  'Portal completo com páginas exclusivas para cada serviço, página sobre, portfólio, blog de conteúdo e suporte avançado a SEO.': { en: 'Comprehensive corporate portal with dedicated pages for each service, about section, portfolio, content blog, and advanced SEO support.', es: 'Portal corporativo completo con páginas dedicadas para cada servicio, sección sobre nosotros, portafolio, blog y soporte avanzado de SEO.' },
  'Código moderno, leve e sem dependência de plugins lentos': { en: 'Modern, lightweight code with zero reliance on sluggish plugins', es: 'Código moderno, ligero y sin dependencia de plugins pesados' },
  'Otimização Core Web Vitals (Google PageSpeed 90+)': { en: 'Core Web Vitals speed optimization (Google PageSpeed 90+)', es: 'Optimización Core Web Vitals (Google PageSpeed 90+)' },
  'Certificado de Segurança SSL (HTTPS) e proteção avançada': { en: 'SSL Security Certificate (HTTPS) and advanced encryption', es: 'Certificado de Seguridad SSL (HTTPS) y protección avanzada' },
  'Integração oficial com Google Analytics e Search Console': { en: 'Official Google Analytics and Google Search Console integration', es: 'Integración oficial con Google Analytics y Search Console' },
  'Botão flutuante de WhatsApp e rastreamento de cliques': { en: 'Floating WhatsApp action button with click event tracking', es: 'Botón flotante de WhatsApp con seguimiento de eventos de clic' },
  'Design exclusivo personalizado para a identidade da sua marca': { en: 'Exclusive custom UI design tailored to your brand identity', es: 'Diseño visual exclusivo adaptado a la identidad de su marca' },
  'O que preciso fornecer para iniciar o desenvolvimento?': { en: 'What do I need to provide to start development?', es: '¿Qué necesito proporcionar para comenzar el desarrollo?' },
  'Apenas informações básicas sobre seus serviços e preferências visuais. Nossa equipe auxilia no refinamento de textos, estrutura e organização do material.': { en: 'Only basic information about your services and visual preferences. Our team assists in refining copy, structure, and media assets.', es: 'Únicamente información básica sobre sus servicios y preferencias visuales. Nuestro equipo le asiste en la redacción, estructura y organización.' },
  'O site será realmente meu após a conclusão?': { en: 'Will I truly own the website once it is completed?', es: '¿El sitio web será realmente de mi propiedad tras la entrega?' },
  'Sim, 100%. Você terá total propriedade sobre o código, domínio e dados da sua plataforma.': { en: 'Yes, 100%. You hold full ownership of the code, domain, and data of your platform.', es: 'Sí, 100%. Usted tendrá la propiedad total del código, dominio y datos de su plataforma.' },
  'Vocês oferecem suporte após a publicação?': { en: 'Do you offer technical support after launch?', es: '¿Ofrecen soporte técnico tras la publicación?' },
  'Sim! Acompanhamos o lançamento e oferecemos suporte contínuo para garantir segurança, estabilidade e atualizações necessárias.': { en: 'Yes! We monitor the launch and provide ongoing support to ensure security, uptime stability, and necessary updates.', es: '¡Sí! Supervisamos el lanzamiento y ofrecemos soporte continuo para garantizar seguridad, estabilidad y actualizaciones necesarias.' },
  'Pronto para criar um site profissional para sua empresa?': { en: 'Ready to build a professional website for your business?', es: '¿Listo para crear un sitio web profesional para su empresa?' },
  'Converse com nossos especialistas e receba um planejamento personalizado para alavancar sua presença digital.': { en: 'Talk with our digital specialists and receive a customized plan to accelerate your digital presence.', es: 'Converse con nuestros especialistas y reciba un plan personalizado para potenciar su presencia digital.' },
  'Solicitar Orçamento Personalizado': { en: 'Request Customized Proposal', es: 'Solicitar Presupuesto Personalizado' },
  'Quero criar meu site profissional': { en: 'I want to create my professional website', es: 'Quiero crear mi sitio web profesional' },
  'Ver Modelos de Projetos': { en: 'View Project Models', es: 'Ver Modelos de Proyectos' }
};

// Automatic full sentence translation function
export function translateSentence(ptText, lang) {
  if (!ptText || typeof ptText !== 'string') return ptText;
  const trimmed = ptText.trim();

  // 1. Direct match
  if (sentenceTable[trimmed]) {
    return sentenceTable[trimmed][lang];
  }

  // 2. Number/URL/Email/Symbols only
  if (/^[0-9\s.,\-_+–—/%$€£✓()·•→←|↗★@:]+$/.test(trimmed)) {
    return ptText;
  }

  // 3. Exact Brand Whitelist
  if (trimmed === 'CONEXUS' || trimmed === 'CONEXUS Guest Hub' || trimmed === 'Welcome Book' ||
      trimmed === 'Nikki Studio' || trimmed === 'SOS Aberturas' || trimmed === 'Michelly Corrêa' ||
      trimmed === 'Crafix' || trimmed === 'Di Piallato' || trimmed === 'Lumora Cleaning Services' ||
      trimmed === 'CONEXXUS UK' || trimmed === 'Oxford Barber' || trimmed === 'Vila Serena') {
    return ptText;
  }

  // 4. Return translated version based on translation dictionary
  return sentenceTable[trimmed]?.[lang] || ptText;
}
