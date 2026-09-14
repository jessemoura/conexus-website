import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const services = [
  { slug: 'branding-identidade-visual', key: 'branding' },
  { slug: 'conexus-guest-hub', key: 'guestHub' },
  { slug: 'criacao-de-sites', key: 'criacaoSites' },
  { slug: 'gestao-redes-sociais', key: 'gestaoRedes' },
  { slug: 'seo', key: 'seo' },
  { slug: 'seo-local-google-meu-negocio', key: 'seoLocal' },
  { slug: 'site-one-page', key: 'siteOnePage' }
];

console.log('Processing 7 service subpages body content...');

const servicesBody = {
  pt: {},
  en: {},
  es: {}
};

services.forEach(({ slug, key }) => {
  const filePath = path.join(rootDir, 'servicos', slug, 'index.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match <main>...</main>
  const match = content.match(/<main[\s\S]*?<\/main>/i);
  if (!match) return;

  let mainHtml = match[0];

  // Store PT
  servicesBody.pt[key] = mainHtml.replace(/<main[^>]*>/i, '').replace(/<\/main>/i, '').trim();

  // Create EN
  let enHtml = servicesBody.pt[key]
    .replace(/Falar com a CONEXUS/g, 'Talk to CONEXUS')
    .replace(/Quero um Site Profissional/g, 'Get a Professional Website')
    .replace(/Ver Modelos de Projetos/g, 'View Project Models')
    .replace(/Ver Todos os Serviços/g, 'View All Services')
    .replace(/Ver Outros Serviços/g, 'View Other Services')
    .replace(/Solicitar Orçamento/g, 'Request a Proposal')
    .replace(/Solicitar Proposta/g, 'Request a Proposal')
    .replace(/Falar no WhatsApp/g, 'Chat on WhatsApp')
    .replace(/Por que sua Empresa Precisa/g, 'Why Your Business Needs')
    .replace(/Problemas Comerciais que um Site Profissional Resolve/g, 'Commercial Problems a Professional Website Solves')
    .replace(/Pilares Técnicos Incluídos em Nossos Sites/g, 'Technical Standards Included in Our Websites')
    .replace(/Como Desenvolvemos Seu Site Profissional/g, 'How We Develop Your Professional Website')
    .replace(/Perguntas Frequentes/g, 'Frequently Asked Questions')
    .replace(/Pronto para/g, 'Ready to')
    .replace(/Demonstração Interativa/g, 'Interactive Demo');

  // Create ES
  let esHtml = servicesBody.pt[key]
    .replace(/Falar com a CONEXUS/g, 'Hablar con CONEXUS')
    .replace(/Quero um Site Profissional/g, 'Quiero un Sitio Web Profesional')
    .replace(/Ver Modelos de Projetos/g, 'Ver Modelos de Proyectos')
    .replace(/Ver Todos os Serviços/g, 'Ver Todos los Servicios')
    .replace(/Ver Outros Serviços/g, 'Ver Otros Servicios')
    .replace(/Solicitar Orçamento/g, 'Solicitar Presupuesto')
    .replace(/Solicitar Proposta/g, 'Solicitar Propuesta')
    .replace(/Falar no WhatsApp/g, 'Contactar por WhatsApp')
    .replace(/Por que sua Empresa Precisa/g, 'Por qué su Empresa Necesita')
    .replace(/Problemas Comerciais que um Site Profissional Resolve/g, 'Problemas Comerciales que Resuelve un Sitio Profesional')
    .replace(/Pilares Técnicos Incluídos em Nossos Sites/g, 'Estándares Técnicos Incluidos en Nuestros Sitios')
    .replace(/Como Desenvolvemos Seu Site Profissional/g, 'Cómo Desarrollamos su Sitio Profesional')
    .replace(/Perguntas Frequentes/g, 'Preguntas Frecuentes')
    .replace(/Pronto para/g, '¿Listo para')
    .replace(/Demonstração Interativa/g, 'Demostración Interactiva');

  servicesBody.en[key] = enHtml;
  servicesBody.es[key] = esHtml;

  // Add data-i18n-html to <main> in the HTML file
  if (!content.includes(`data-i18n-html="servicesBody.${key}"`)) {
    content = content.replace(/<main([^>]*)>/i, `<main$1 data-i18n-html="servicesBody.${key}">`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Update dictionaries
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

pt.servicesBody = servicesBody.pt;
en.servicesBody = servicesBody.en;
es.servicesBody = servicesBody.es;

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully embedded servicesBody into dictionaries and HTML files!');
