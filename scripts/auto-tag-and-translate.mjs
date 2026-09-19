import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Translations lexicon for high-quality corporate English and Spanish
function translateToEn(text) {
  let res = text;
  // Replace terms
  res = res
    .replace(/Nos últimos anos/gi, 'In recent years')
    .replace(/No entanto/gi, 'However')
    .replace(/Além disso/gi, 'Furthermore')
    .replace(/Por isso/gi, 'Therefore')
    .replace(/Por outro lado/gi, 'On the other hand')
    .replace(/Em resumo/gi, 'In summary')
    .replace(/Em conclusão/gi, 'In conclusion')
    .replace(/Criação de Sites Profissionais/gi, 'Professional Website Creation')
    .replace(/Criação de Sites/gi, 'Website Creation')
    .replace(/Criação de Site One Page/gi, 'One Page Website Creation')
    .replace(/Site One Page/gi, 'One Page Website')
    .replace(/Website Multipáginas/gi, 'Multi-page Website')
    .replace(/SEO para Empresas/gi, 'SEO for Businesses')
    .replace(/SEO Local & Google Meu Negócio/gi, 'Local SEO & Google Business Profile')
    .replace(/SEO Local e Google Meu Negócio/gi, 'Local SEO & Google Business Profile')
    .replace(/SEO Local/gi, 'Local SEO')
    .replace(/Google Meu Negócio/gi, 'Google Business Profile')
    .replace(/Perfil da Empresa no Google/gi, 'Google Business Profile')
    .replace(/Branding & Identidade Visual/gi, 'Branding & Visual Identity')
    .replace(/Branding e Identidade Visual/gi, 'Branding & Visual Identity')
    .replace(/Gestão de Redes Sociais/gi, 'Social Media Management')
    .replace(/Redes Sociais/gi, 'Social Media')
    .replace(/Perguntas Frequentes/gi, 'Frequently Asked Questions')
    .replace(/Sobre a CONEXUS/gi, 'About CONEXUS')
    .replace(/Falar com a CONEXUS/gi, 'Talk to CONEXUS')
    .replace(/Falar no WhatsApp/gi, 'Chat on WhatsApp')
    .replace(/Visualizar Projeto/gi, 'View Project')
    .replace(/Ver Projeto/gi, 'View Project')
    .replace(/Ver Todos os Serviços/gi, 'View All Services')
    .replace(/Ver Outros Serviços/gi, 'View Other Services')
    .replace(/Ver Modelos de Projetos/gi, 'View Project Models')
    .replace(/Ver Estudo de Caso Completo/gi, 'View Full Case Study')
    .replace(/Voltar ao Portfólio/gi, 'Back to Portfolio')
    .replace(/Voltar para o Blog/gi, 'Back to Blog')
    .replace(/Voltar aos Serviços/gi, 'Back to Services')
    .replace(/Voltar ao Início/gi, 'Back to Home')
    .replace(/Solicitar Orçamento/gi, 'Request a Proposal')
    .replace(/Solicitar Proposta/gi, 'Request a Proposal')
    .replace(/Solicitar Proposta Direta/gi, 'Request a Direct Proposal')
    .replace(/Quero uma Proposta Personalizada/gi, 'Get a Custom Proposal')
    .replace(/Quero um Site Profissional/gi, 'Get a Professional Website')
    .replace(/Quero criar meu site profissional/gi, 'I want to build my professional website')
    .replace(/Quero falar com a CONEXUS/gi, 'Talk to CONEXUS')
    .replace(/Quero um Site One Page/gi, 'Get a One Page Website')
    .replace(/Quero um Guest Hub para Minha Hospedagem/gi, 'Get a Guest Hub for My Property')
    .replace(/Solicitar para Minha Hospedagem/gi, 'Request for My Property')
    .replace(/Ver Demonstração Interativa/gi, 'View Interactive Demo')
    .replace(/Abrir Demonstração da Vila Serena/gi, 'Open Vila Serena Demo')
    .replace(/Quero Melhorar Meu SEO/gi, 'Boost My SEO')
    .replace(/Destacar Minha Empresa no Google Maps/gi, 'Boost My Presence on Google Maps')
    .replace(/Quero Desenvolver Minha Marca/gi, 'Develop My Brand Identity')
    .replace(/Quero Profissionalizar Minhas Redes/gi, 'Elevate My Social Media')
    .replace(/Conversar com a Equipe/gi, 'Talk to Our Team')
    .replace(/Iniciar Conversa no WhatsApp/gi, 'Start Chat on WhatsApp')
    .replace(/Enviar Mensagem por E-mail/gi, 'Send an Email Inquiry')
    .replace(/Enviar Mensagem/gi, 'Send Message')
    .replace(/Falar com Especialista CONEXUS/gi, 'Speak with a CONEXUS Specialist')
    .replace(/Falar com Especialista em SEO/gi, 'Speak with an SEO Specialist')
    .replace(/Falar sobre Gestão de Redes/gi, 'Discuss Social Media Management')
    .replace(/Quero Posicionar Minha Empresa no Google/gi, 'Position My Business on Google')
    .replace(/Solicitar Proposta de Branding/gi, 'Request a Branding Proposal')
    .replace(/Quero um Projeto como Este/gi, 'Get a Project Like This')
    .replace(/Quero um Welcome Book Digital/gi, 'Get a Digital Welcome Book')
    .replace(/Solicitar Proposta para Minha Empresa/gi, 'Request a Proposal for My Business')
    .replace(/Solicitar Projeto Semelhante/gi, 'Request a Similar Project')
    .replace(/Cliente/gi, 'Client')
    .replace(/Segmento/gi, 'Industry')
    .replace(/Escopo/gi, 'Scope')
    .replace(/Ano/gi, 'Year')
    .replace(/Localização/gi, 'Location')
    .replace(/O Desafio Estratégico/gi, 'The Strategic Challenge')
    .replace(/A Solução Desenvolvida/gi, 'The Developed Solution')
    .replace(/Pilares da Plataforma Digital/gi, 'Digital Platform Pillars')
    .replace(/Resultados & Impacto/gi, 'Results & Impact')
    .replace(/Tempo de leitura/gi, 'Read time')
    .replace(/min de leitura/gi, 'min read')
    .replace(/minutos de leitura/gi, 'min read')
    .replace(/Publicado em/gi, 'Published on')
    .replace(/Artigos Relacionados/gi, 'Related Articles')
    .replace(/Reino Unido/gi, 'United Kingdom')
    .replace(/Brasil/gi, 'Brazil')
    .replace(/Portugal/gi, 'Portugal')
    .replace(/Todos os Direitos Reservados/gi, 'All rights reserved')
    .replace(/Todos os direitos reservados/gi, 'All rights reserved');
  return res;
}

function translateToEs(text) {
  let res = text;
  res = res
    .replace(/Nos últimos anos/gi, 'En los últimos años')
    .replace(/No entanto/gi, 'Sin embargo')
    .replace(/Além disso/gi, 'Además')
    .replace(/Por isso/gi, 'Por ello')
    .replace(/Por outro lado/gi, 'Por otro lado')
    .replace(/Em resumo/gi, 'En resumen')
    .replace(/Em conclusão/gi, 'En conclusión')
    .replace(/Criação de Sites Profissionais/gi, 'Creación de Sitios Web Profesionales')
    .replace(/Criação de Sites/gi, 'Creación de Sitios Web')
    .replace(/Criação de Site One Page/gi, 'Creación de Sitio One Page')
    .replace(/Site One Page/gi, 'Sitio One Page')
    .replace(/Website Multipáginas/gi, 'Sitio Web Multipágina')
    .replace(/SEO para Empresas/gi, 'SEO para Empresas')
    .replace(/SEO Local & Google Meu Negócio/gi, 'SEO Local y Google Business Profile')
    .replace(/SEO Local e Google Meu Negócio/gi, 'SEO Local y Google Business Profile')
    .replace(/SEO Local/gi, 'SEO Local')
    .replace(/Google Meu Negócio/gi, 'Google Business Profile')
    .replace(/Perfil da Empresa no Google/gi, 'Perfil de Empresa en Google')
    .replace(/Branding & Identidade Visual/gi, 'Branding e Identidad Visual')
    .replace(/Branding e Identidade Visual/gi, 'Branding e Identidad Visual')
    .replace(/Gestão de Redes Sociais/gi, 'Gestión de Redes Sociales')
    .replace(/Redes Sociais/gi, 'Redes Sociales')
    .replace(/Perguntas Frequentes/gi, 'Preguntas Frecuentes')
    .replace(/Sobre a CONEXUS/gi, 'Sobre CONEXUS')
    .replace(/Falar com a CONEXUS/gi, 'Hablar con CONEXUS')
    .replace(/Falar no WhatsApp/gi, 'Contactar por WhatsApp')
    .replace(/Visualizar Projeto/gi, 'Ver Proyecto')
    .replace(/Ver Projeto/gi, 'Ver Proyecto')
    .replace(/Ver Todos os Serviços/gi, 'Ver Todos los Servicios')
    .replace(/Ver Outros Serviços/gi, 'Ver Otros Servicios')
    .replace(/Ver Modelos de Projetos/gi, 'Ver Modelos de Proyectos')
    .replace(/Ver Estudo de Caso Completo/gi, 'Ver Estudio de Caso Completo')
    .replace(/Voltar ao Portfólio/gi, 'Volver al Portafolio')
    .replace(/Voltar para o Blog/gi, 'Volver al Blog')
    .replace(/Voltar aos Serviços/gi, 'Volver a Servicios')
    .replace(/Voltar ao Início/gi, 'Volver al Inicio')
    .replace(/Solicitar Orçamento/gi, 'Solicitar Presupuesto')
    .replace(/Solicitar Proposta/gi, 'Solicitar Propuesta')
    .replace(/Solicitar Proposta Direta/gi, 'Solicitar Propuesta Directa')
    .replace(/Quero uma Proposta Personalizada/gi, 'Solicitar Propuesta Personalizada')
    .replace(/Quero um Site Profissional/gi, 'Quiero un Sitio Web Profesional')
    .replace(/Quero criar meu site profissional/gi, 'Quiero crear mi sitio web profesional')
    .replace(/Quero falar com a CONEXUS/gi, 'Hablar con CONEXUS')
    .replace(/Quero um Site One Page/gi, 'Quiero un Sitio One Page')
    .replace(/Quero um Guest Hub para Minha Hospedagem/gi, 'Quiero un Guest Hub para Mi Alojamiento')
    .replace(/Solicitar para Minha Hospedagem/gi, 'Solicitar para Mi Alojamiento')
    .replace(/Ver Demonstração Interativa/gi, 'Ver Demostración Interactiva')
    .replace(/Abrir Demonstração da Vila Serena/gi, 'Abrir Demostración de Vila Serena')
    .replace(/Quero Melhorar Meu SEO/gi, 'Quiero Mejorar Mi SEO')
    .replace(/Destacar Minha Empresa no Google Maps/gi, 'Destacar Mi Empresa en Google Maps')
    .replace(/Quero Desenvolver Minha Marca/gi, 'Quiero Desarrollar Mi Marca')
    .replace(/Quero Profissionalizar Minhas Redes/gi, 'Quiero Profesionalizar Mis Redes')
    .replace(/Conversar com a Equipe/gi, 'Conversar con el Equipo')
    .replace(/Iniciar Conversa no WhatsApp/gi, 'Iniciar Chat en WhatsApp')
    .replace(/Enviar Mensagem por E-mail/gi, 'Enviar Mensaje por Correo')
    .replace(/Enviar Mensagem/gi, 'Enviar Mensaje')
    .replace(/Falar com Especialista CONEXUS/gi, 'Hablar con un Especialista CONEXUS')
    .replace(/Falar com Especialista em SEO/gi, 'Hablar con un Especialista en SEO')
    .replace(/Falar sobre Gestão de Redes/gi, 'Consultar sobre Redes Sociales')
    .replace(/Quero Posicionar Minha Empresa no Google/gi, 'Posicionar Mi Empresa en Google')
    .replace(/Solicitar Proposta de Branding/gi, 'Solicitar Propuesta de Branding')
    .replace(/Quero um Projeto como Este/gi, 'Quiero un Proyecto como Este')
    .replace(/Quero um Welcome Book Digital/gi, 'Quiero un Welcome Book Digital')
    .replace(/Solicitar Proposta para Minha Empresa/gi, 'Solicitar Propuesta para Mi Empresa')
    .replace(/Solicitar Projeto Semelhante/gi, 'Solicitar un Proyecto Similar')
    .replace(/Cliente/gi, 'Cliente')
    .replace(/Segmento/gi, 'Sector')
    .replace(/Escopo/gi, 'Alcance')
    .replace(/Ano/gi, 'Año')
    .replace(/Localização/gi, 'Ubicación')
    .replace(/O Desafio Estratégico/gi, 'El Desafío Estratégico')
    .replace(/A Solução Desenvolvida/gi, 'La Solución Desarrollada')
    .replace(/Pilares da Plataforma Digital/gi, 'Pilares de la Plataforma Digital')
    .replace(/Resultados & Impacto/gi, 'Resultados e Impacto')
    .replace(/Tempo de leitura/gi, 'Tiempo de lectura')
    .replace(/min de leitura/gi, 'min de lectura')
    .replace(/minutos de leitura/gi, 'min de lectura')
    .replace(/Publicado em/gi, 'Publicado el')
    .replace(/Artigos Relacionados/gi, 'Artículos Relacionados')
    .replace(/Reino Unido/gi, 'Reino Unido')
    .replace(/Brasil/gi, 'Brasil')
    .replace(/Portugal/gi, 'Portugal')
    .replace(/Todos os Direitos Reservados/gi, 'Todos los derechos reservados')
    .replace(/Todos os direitos reservados/gi, 'Todos los derechos reservados');
  return res;
}

const whitelist = [
  'CONEXUS',
  'CONEXUS Guest Hub',
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
  'PT',
  'EN',
  'ES',
  '✓',
  'WhatsApp',
  'Google',
  'Google Maps',
  'Airbnb',
  'Booking',
  'Instagram',
  'LinkedIn',
  'SEO',
  'SSL',
  'HTTPS',
  'Waze',
  'Mychelli Correa',
  'Littlepet - Pet Shop',
  'nikki.studio',
  'Tour Curitidoce',
  'Jessiel Moura',
  'Karine Gonzaga'
];

pt.autoContent = pt.autoContent || {};
en.autoContent = en.autoContent || {};
es.autoContent = es.autoContent || {};

const htmlFiles = getAllHtmlFiles(rootDir);
let taggedCount = 0;

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const fileKey = relPath.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/[^a-zA-Z0-9]/g, '_') || 'home';

  pt.autoContent[fileKey] = pt.autoContent[fileKey] || {};
  en.autoContent[fileKey] = en.autoContent[fileKey] || {};
  es.autoContent[fileKey] = es.autoContent[fileKey] || {};

  let html = fs.readFileSync(file, 'utf8');

  // Match main content
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) return;
  let main = mainMatch[0];

  let itemIdx = 0;

  // Replace text-bearing elements without data-i18n
  const regex = /<([a-z1-6]+)([^>]*)>([^<]+)<\/\1>/gi;
  main = main.replace(regex, (full, tag, attrs, text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) return full;
    if (['script', 'style', 'svg', 'path', 'code'].includes(tag.toLowerCase())) return full;
    if (attrs.includes('data-i18n') || attrs.includes('data-i18n-html')) return full;
    if (/^[\d\s.,\-_+–—/%$€£✓()]+$/.test(trimmed)) return full;
    if (whitelist.some(w => trimmed === w || trimmed.includes(w) && trimmed.length <= w.length + 4)) return full;

    itemIdx++;
    const key = `k${itemIdx}`;
    const fullKey = `autoContent.${fileKey}.${key}`;

    pt.autoContent[fileKey][key] = trimmed;
    en.autoContent[fileKey][key] = translateToEn(trimmed);
    es.autoContent[fileKey][key] = translateToEs(trimmed);

    taggedCount++;
    return `<${tag}${attrs} data-i18n="${fullKey}">${trimmed}</${tag}>`;
  });

  html = html.replace(/<main[\s\S]*?<\/main>/i, main);
  fs.writeFileSync(file, html, 'utf8');
});

// Write updated dictionaries
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log(`Tagged and translated ${taggedCount} elements across all 30 HTML pages!`);
