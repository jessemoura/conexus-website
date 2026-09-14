import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const infoPages = [
  { slug: 'sobre', file: 'sobre/index.html', key: 'sobre' },
  { slug: 'faq', file: 'faq/index.html', key: 'faq' },
  { slug: 'contato', file: 'contato/index.html', key: 'contato' }
];

console.log('Processing info pages (sobre, faq, contato) body content...');

const infoPagesBody = {
  pt: {},
  en: {},
  es: {}
};

infoPages.forEach(({ slug, file, key }) => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match <main>...</main>
  const match = content.match(/<main[\s\S]*?<\/main>/i);
  if (!match) return;

  let mainHtml = match[0];

  // Store PT
  infoPagesBody.pt[key] = mainHtml.replace(/<main[^>]*>/i, '').replace(/<\/main>/i, '').trim();

  // Create EN
  let enHtml = infoPagesBody.pt[key]
    .replace(/Falar com a CONEXUS/g, 'Talk to CONEXUS')
    .replace(/Falar no WhatsApp/g, 'Chat on WhatsApp')
    .replace(/Conhecer Nossos Serviços/g, 'Discover Our Services')
    .replace(/Enviar Mensagem por E-mail/g, 'Send an Email Inquiry')
    .replace(/Iniciar Conversa no WhatsApp/g, 'Start Chat on WhatsApp')
    .replace(/Enviar Mensagem/g, 'Send Message')
    .replace(/Nome Completo/g, 'Full Name')
    .replace(/E-mail Comercial/g, 'Business Email')
    .replace(/Telefone \/ WhatsApp/g, 'Phone / WhatsApp')
    .replace(/Serviço de Interesse/g, 'Service of Interest')
    .replace(/Mensagem ou Detalhes do Projeto/g, 'Message or Project Details')
    .replace(/Segunda a Sexta, das 9h às 18h/g, 'Monday to Friday, 9:00 AM to 6:00 PM')
    .replace(/Atendimento via WhatsApp/g, 'WhatsApp Support')
    .replace(/Contato por E-mail/g, 'Email Contact')
    .replace(/Horário de Atendimento/g, 'Business Hours');

  // Create ES
  let esHtml = infoPagesBody.pt[key]
    .replace(/Falar com a CONEXUS/g, 'Hablar con CONEXUS')
    .replace(/Falar no WhatsApp/g, 'Contactar por WhatsApp')
    .replace(/Conhecer Nossos Serviços/g, 'Conocer Nuestros Servicios')
    .replace(/Enviar Mensagem por E-mail/g, 'Enviar Mensaje por Correo')
    .replace(/Iniciar Conversa no WhatsApp/g, 'Iniciar Chat en WhatsApp')
    .replace(/Enviar Mensagem/g, 'Enviar Mensaje')
    .replace(/Nome Completo/g, 'Nombre Completo')
    .replace(/E-mail Comercial/g, 'Correo Electrónico Comercial')
    .replace(/Telefone \/ WhatsApp/g, 'Teléfono / WhatsApp')
    .replace(/Serviço de Interesse/g, 'Servicio de Interés')
    .replace(/Mensagem ou Detalhes do Projeto/g, 'Mensaje o Detalles del Proyecto')
    .replace(/Segunda a Sexta, das 9h às 18h/g, 'Lunes a Viernes, de 9:00 a 18:00')
    .replace(/Atendimento via WhatsApp/g, 'Atención por WhatsApp')
    .replace(/Contato por E-mail/g, 'Contacto por Correo Electrónico')
    .replace(/Horário de Atendimento/g, 'Horario de Atención');

  infoPagesBody.en[key] = enHtml;
  infoPagesBody.es[key] = esHtml;

  // Add data-i18n-html to <main> in the HTML file
  if (!content.includes(`data-i18n-html="infoPagesBody.${key}"`)) {
    content = content.replace(/<main([^>]*)>/i, `<main$1 data-i18n-html="infoPagesBody.${key}">`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Update dictionaries
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

pt.infoPagesBody = infoPagesBody.pt;
en.infoPagesBody = infoPagesBody.en;
es.infoPagesBody = infoPagesBody.es;

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully embedded infoPagesBody into dictionaries and HTML files!');
