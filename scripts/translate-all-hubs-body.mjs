import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const hubs = [
  { slug: 'servicos', file: 'servicos/index.html', key: 'servicos' },
  { slug: 'portfolio', file: 'portfolio/index.html', key: 'portfolio' },
  { slug: 'blog', file: 'blog/index.html', key: 'blog' }
];

console.log('Processing hubs (servicos, portfolio, blog) body content...');

const hubsBody = {
  pt: {},
  en: {},
  es: {}
};

hubs.forEach(({ slug, file, key }) => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match <main>...</main>
  const match = content.match(/<main[\s\S]*?<\/main>/i);
  if (!match) return;

  let mainHtml = match[0];

  // Store PT
  hubsBody.pt[key] = mainHtml.replace(/<main[^>]*>/i, '').replace(/<\/main>/i, '').trim();

  // Create EN
  let enHtml = hubsBody.pt[key]
    .replace(/Falar com a CONEXUS/g, 'Talk to CONEXUS')
    .replace(/Falar no WhatsApp/g, 'Chat on WhatsApp')
    .replace(/Explorar Nossos Serviços/g, 'Explore Our Services')
    .replace(/Solicitar Proposta Direta/g, 'Request a Direct Proposal')
    .replace(/Saiba Mais/g, 'Learn More')
    .replace(/Visualizar Projeto/g, 'View Project')
    .replace(/Ver Estudo de Caso Completo/g, 'View Full Case Study')
    .replace(/Todos os Projetos/g, 'All Projects')
    .replace(/Websites Institucionais/g, 'Institutional Websites')
    .replace(/Site One Page/g, 'One Page Website')
    .replace(/Hospitalidade & Guest Hub/g, 'Hospitality & Guest Hub')
    .replace(/Internacional/g, 'International')
    .replace(/Todos os Artigos/g, 'All Articles')
    .replace(/Ler Artigo/g, 'Read Article')
    .replace(/Falar com Especialista CONEXUS/g, 'Speak with a CONEXUS Specialist')
    .replace(/Quero uma Proposta Personalizada/g, 'Get a Custom Proposal');

  // Create ES
  let esHtml = hubsBody.pt[key]
    .replace(/Falar com a CONEXUS/g, 'Hablar con CONEXUS')
    .replace(/Falar no WhatsApp/g, 'Contactar por WhatsApp')
    .replace(/Explorar Nossos Serviços/g, 'Explorar Nuestros Servicios')
    .replace(/Solicitar Proposta Direta/g, 'Solicitar Propuesta Directa')
    .replace(/Saiba Mais/g, 'Más Información')
    .replace(/Visualizar Projeto/g, 'Ver Proyecto')
    .replace(/Ver Estudo de Caso Completo/g, 'Ver Estudio de Caso Completo')
    .replace(/Todos os Projetos/g, 'Todos los Proyectos')
    .replace(/Websites Institucionais/g, 'Sitios Institucionales')
    .replace(/Site One Page/g, 'Sitio One Page')
    .replace(/Hospitalidade & Guest Hub/g, 'Hospitalidad y Guest Hub')
    .replace(/Internacional/g, 'Internacional')
    .replace(/Todos os Artigos/g, 'Todos los Artículos')
    .replace(/Ler Artigo/g, 'Leer Artículo')
    .replace(/Falar com Especialista CONEXUS/g, 'Hablar con un Especialista CONEXUS')
    .replace(/Quero uma Proposta Personalizada/g, 'Solicitar Propuesta Personalizada');

  hubsBody.en[key] = enHtml;
  hubsBody.es[key] = esHtml;

  // Add data-i18n-html to <main> in the HTML file
  if (!content.includes(`data-i18n-html="hubsBody.${key}"`)) {
    content = content.replace(/<main([^>]*)>/i, `<main$1 data-i18n-html="hubsBody.${key}">`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Update dictionaries
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

pt.hubsBody = hubsBody.pt;
en.hubsBody = hubsBody.en;
es.hubsBody = hubsBody.es;

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully embedded hubsBody into dictionaries and HTML files!');
