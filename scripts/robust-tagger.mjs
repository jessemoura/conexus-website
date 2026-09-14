import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function getAllHtml(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') getAllHtml(p, list);
    } else if (f.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const allFiles = getAllHtml(rootDir);

const textToKeyMap = [
  { text: 'Falar com a CONEXUS', key: 'common.talkToConexus' },
  { text: 'Conversar pelo WhatsApp', key: 'common.chatWhatsapp' },
  { text: 'Falar no WhatsApp', key: 'common.talkWhatsApp' },
  { text: 'Falar com a CONEXUS no WhatsApp', key: 'common.talkWhatsAppConexus' },
  { text: 'Tirar Dúvidas pelo WhatsApp', key: 'faq.askOnWhatsapp' },
  { text: 'Voltar para o Blog', key: 'blog.backToBlog' },
  { text: 'Voltar para o Portfólio', key: 'portfolio.backToPortfolio' },
  { text: 'Ver Case Completo', key: 'portfolio.viewCase' },
  { text: 'Iniciar Projeto Semelhante', key: 'portfolio.startSimilarProject' },
  { text: 'Ler Artigo', key: 'blog.readArticle' },
  { text: 'Solicitar Orçamento de Site', key: 'services.requestSiteQuote' },
  { text: 'Conversar sobre meu projeto', key: 'services.talkAboutProject' },
  { text: 'Solicitar Proposta Integrada', key: 'services.requestIntegratedProposal' },
  { text: 'Solicitar CONEXUS Guest Hub', key: 'services.guestHub.request' },
  { text: 'Ver Demonstração Vila Serena', key: 'services.guestHub.viewDemo' },
  { text: 'Ver Demo Vila Serena', key: 'services.guestHub.viewDemo' },
  { text: 'Páginas de links genéricas', key: 'services.guestHub.compGenericTitle' },
  { text: 'Conheça a demonstração Vila Serena', key: 'blog.articles.conexusGuestHub.demoBtn' },
  { text: 'Conheça o CONEXUS Guest Hub', key: 'blog.articles.conexusGuestHub.serviceBtn' },
  { text: 'Quero criar meu site profissional', key: 'services.criacaoSites.cta' },
  { text: 'Quero fortalecer minhas redes sociais', key: 'services.redesSociais.cta' },
  { text: 'Quero fortalecer minha marca', key: 'services.branding.cta' },
  { text: 'Quero melhorar minha presença no Google', key: 'services.seo.cta' },
  { text: 'Quero ser encontrado na minha região', key: 'services.seoLocal.cta' },
  { text: 'Quero meu site One Page', key: 'services.siteOnePage.cta' },
  { text: 'Conversar com a Equipe', key: 'common.talkToTeam' }
];

for (const file of allFiles) {
  let html = fs.readFileSync(file, 'utf8');
  let mod = false;

  for (const { text, key } of textToKeyMap) {
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match <tag attr...> whitespace TEXT whitespace </tag>
    const regex = new RegExp(`(<([a-zA-Z1-6]+)([^>]*?)>)\\s*(${escapedText})\\s*(<\\/\\2>)`, 'gi');

    html = html.replace(regex, (match, openTag, tagName, attrs, innerText, closeTag) => {
      if (attrs.includes('data-i18n') || attrs.includes('data-i18n-html')) {
        return match;
      }
      mod = true;
      return `<${tagName}${attrs} data-i18n="${key}">${innerText}${closeTag}`;
    });
  }

  if (mod) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Successfully tagged items in ${path.relative(rootDir, file)}`);
  }
}
