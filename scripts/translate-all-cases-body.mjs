import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const cases = [
  { slug: 'conexxus-uk', key: 'conexxusUk' },
  { slug: 'crafix', key: 'crafix' },
  { slug: 'di-piallato', key: 'diPiallato' },
  { slug: 'lumora-cleaning-services', key: 'lumora' },
  { slug: 'michelly-correa', key: 'michellyCorrea' },
  { slug: 'nikki-studio', key: 'nikkiStudio' },
  { slug: 'sos-aberturas', key: 'sosAberturas' },
  { slug: 'welcome-book-apartamento-41', key: 'welcomeBook' }
];

console.log('Processing 8 portfolio cases body content...');

const casesBody = {
  pt: {},
  en: {},
  es: {}
};

cases.forEach(({ slug, key }) => {
  const filePath = path.join(rootDir, 'portfolio', slug, 'index.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Find main content container
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) return;

  let mainHtml = mainMatch[0];

  // Store PT
  casesBody.pt[key] = mainHtml.replace(/<main[^>]*>/i, '').replace(/<\/main>/i, '').trim();

  // Create EN
  let enHtml = casesBody.pt[key]
    .replace(/O Desafio Estratégico/g, 'The Strategic Challenge')
    .replace(/A Solução Desenvolvida/g, 'The Developed Solution')
    .replace(/Pilares da Plataforma Digital/g, 'Digital Platform Pillars')
    .replace(/Resultados & Impacto/g, 'Results & Impact')
    .replace(/Cliente/g, 'Client')
    .replace(/Segmento/g, 'Industry')
    .replace(/Escopo/g, 'Scope')
    .replace(/Ano/g, 'Year')
    .replace(/Localização/g, 'Location')
    .replace(/Voltar ao Portfólio/g, 'Back to Portfolio')
    .replace(/Falar com a CONEXUS/g, 'Talk to CONEXUS')
    .replace(/Solicitar Proposta/g, 'Request a Proposal')
    .replace(/Quero um Projeto como Este/g, 'Get a Project Like This')
    .replace(/Reino Unido/g, 'United Kingdom')
    .replace(/Brasil/g, 'Brazil')
    .replace(/Portugal/g, 'Portugal');

  // Create ES
  let esHtml = casesBody.pt[key]
    .replace(/O Desafio Estratégico/g, 'El Desafío Estratégico')
    .replace(/A Solução Desenvolvida/g, 'La Solución Desarrollada')
    .replace(/Pilares da Plataforma Digital/g, 'Pilares de la Plataforma Digital')
    .replace(/Resultados & Impacto/g, 'Resultados e Impacto')
    .replace(/Cliente/g, 'Cliente')
    .replace(/Segmento/g, 'Sector')
    .replace(/Escopo/g, 'Alcance')
    .replace(/Ano/g, 'Año')
    .replace(/Localização/g, 'Ubicación')
    .replace(/Voltar ao Portfólio/g, 'Volver al Portafolio')
    .replace(/Falar com a CONEXUS/g, 'Hablar con CONEXUS')
    .replace(/Solicitar Proposta/g, 'Solicitar Propuesta')
    .replace(/Quero um Projeto como Este/g, 'Quiero un Proyecto como Este')
    .replace(/Reino Unido/g, 'Reino Unido')
    .replace(/Brasil/g, 'Brasil')
    .replace(/Portugal/g, 'Portugal');

  casesBody.en[key] = enHtml;
  casesBody.es[key] = esHtml;

  // Add data-i18n-html to <main> in the HTML file
  if (!content.includes(`data-i18n-html="casesBody.${key}"`)) {
    content = content.replace(/<main([^>]*)>/i, `<main$1 data-i18n-html="casesBody.${key}">`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Update dictionaries
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

pt.casesBody = casesBody.pt;
en.casesBody = casesBody.en;
es.casesBody = casesBody.es;

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully embedded casesBody into dictionaries and HTML files!');
