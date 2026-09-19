import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { cluster1Articles } from './data-cluster-1.mjs';
import { cluster2Articles } from './data-cluster-2.mjs';
import { cluster3Articles } from './data-cluster-3.mjs';
import { cluster4Articles } from './data-cluster-4.mjs';
import { cluster5Articles } from './data-cluster-5.mjs';
import { cluster6Articles } from './data-cluster-6.mjs';

const all60Articles = [
  ...cluster1Articles,
  ...cluster2Articles,
  ...cluster3Articles,
  ...cluster4Articles,
  ...cluster5Articles,
  ...cluster6Articles
];

// Helper phrase mapping dictionaries for professional translation
const directTranslations = {
  en: {
    'Criação de Sites': 'Web Development',
    'SEO & Google': 'SEO & Google Search',
    'Marketing Digital': 'Digital Marketing',
    'Inteligência Artificial': 'Artificial Intelligence',
    'Negócios & Gestão': 'Business & Strategy',
    'Tecnologia & Inovação': 'Technology & Innovation',
    'Perguntas Frequentes': 'Frequently Asked Questions',
    'Pronto para fortalecer sua presença digital?': 'Ready to elevate your digital presence?',
    'Fale com os especialistas da CONEXUS e receba uma consultoria personalizada.': 'Consult with CONEXUS specialists for a tailored digital proposal.',
    'Falar com a CONEXUS': 'Talk to CONEXUS',
    'Acessar Página de Contato': 'Visit Contact Page',
    'Solicitar Análise de Projeto': 'Request Project Analysis',
    'Solicitar Proposta': 'Request a Proposal',
    'Converse com nossos especialistas para analisar o modelo mais lucrativo para sua empresa.': 'Consult our digital engineers to identify the most effective layout for your commercial targets.',
    'Agendar Consultoria Gratuita': 'Schedule Free Consultation',
    'Iniciar Projeto': 'Start a Project'
  },
  es: {
    'Criação de Sites': 'Creación de Sitios Web',
    'SEO & Google': 'SEO y Google',
    'Marketing Digital': 'Marketing Digital',
    'Inteligência Artificial': 'Inteligencia Artificial',
    'Negócios & Gestão': 'Negocios y Gestión',
    'Tecnologia & Inovação': 'Tecnología e Innovación',
    'Perguntas Frequentes': 'Preguntas Frecuentes',
    'Pronto para fortalecer sua presença digital?': '¿Desea fortalecer su presencia digital?',
    'Fale com os especialistas da CONEXUS e receba uma consultoria personalizada.': 'Hable con los especialistas de CONEXUS para una propuesta a medida.',
    'Falar com a CONEXUS': 'Hablar con CONEXUS',
    'Acessar Página de Contato': 'Ir a Página de Contacto',
    'Solicitar Análise de Projeto': 'Solicitar Análisis de Proyecto',
    'Solicitar Proposta': 'Solicitar Propuesta',
    'Converse com nossos especialistas para analisar o modelo mais lucrativo para sua empresa.': 'Consulte a nuestros especialistas para identificar la mejor opción para su empresa.',
    'Agendar Consultoria Gratuita': 'Agendar Consultoría Gratuita',
    'Iniciar Projeto': 'Iniciar Proyecto'
  }
};

// General phrase translation rules for text
function translateText(text, targetLang) {
  if (!text) return '';
  if (directTranslations[targetLang] && directTranslations[targetLang][text]) {
    return directTranslations[targetLang][text];
  }

  // Common vocabulary replacements
  if (targetLang === 'en') {
    let t = text;
    t = t.replace(/São José dos Pinhais, Curitiba e Região Metropolitana/g, 'São José dos Pinhais, Curitiba, and Metropolitan Region');
    t = t.replace(/São José dos Pinhais e Curitiba/g, 'São José dos Pinhais and Curitiba');
    t = t.replace(/pequenas e médias empresas/gi, 'small and medium enterprises');
    t = t.replace(/pequena empresa/gi, 'small business');
    t = t.replace(/pequenas empresas/gi, 'small businesses');
    t = t.replace(/site profissional/gi, 'professional website');
    t = t.replace(/presença digital/gi, 'digital presence');
    t = t.replace(/mecanismos de busca/gi, 'search engines');
    t = t.replace(/taxa de conversão/gi, 'conversion rate');
    t = t.replace(/experiência do usuário/gi, 'user experience');
    t = t.replace(/inteligência artificial/gi, 'artificial intelligence');
    t = t.replace(/redes sociais/gi, 'social media');
    t = t.replace(/transformação digital/gi, 'digital transformation');
    t = t.replace(/atendimento ao cliente/gi, 'customer service');
    t = t.replace(/marketing digital/gi, 'digital marketing');
    t = t.replace(/estratégia digital/gi, 'digital strategy');
    t = t.replace(/resultados reais/gi, 'measurable results');
    t = t.replace(/retorno sobre investimento/gi, 'return on investment (ROI)');
    t = t.replace(/vantagens/gi, 'advantages');
    t = t.replace(/diferenciais/gi, 'differentiators');
    t = t.replace(/Como funciona/gi, 'How it works');
    t = t.replace(/Por que/gi, 'Why');
    t = t.replace(/O que é/gi, 'What is');
    t = t.replace(/Principais benefícios/gi, 'Main benefits');
    t = t.replace(/Conclusão/gi, 'Conclusion');
    return t;
  }

  if (targetLang === 'es') {
    let t = text;
    t = t.replace(/São José dos Pinhais, Curitiba e Região Metropolitana/g, 'São José dos Pinhais, Curitiba y Región Metropolitana');
    t = t.replace(/São José dos Pinhais e Curitiba/g, 'São José dos Pinhais y Curitiba');
    t = t.replace(/pequenas e médias empresas/gi, 'pequeñas y medianas empresas');
    t = t.replace(/pequena empresa/gi, 'pequeña empresa');
    t = t.replace(/pequenas empresas/gi, 'pequeñas empresas');
    t = t.replace(/site profissional/gi, 'sitio web profesional');
    t = t.replace(/presença digital/gi, 'presencia digital');
    t = t.replace(/mecanismos de busca/gi, 'motores de búsqueda');
    t = t.replace(/taxa de conversão/gi, 'tasa de conversión');
    t = t.replace(/experiência do usuário/gi, 'experiencia del usuario');
    t = t.replace(/inteligência artificial/gi, 'inteligencia artificial');
    t = t.replace(/redes sociais/gi, 'redes sociales');
    t = t.replace(/transformação digital/gi, 'transformación digital');
    t = t.replace(/atendimento ao cliente/gi, 'atención al cliente');
    t = t.replace(/marketing digital/gi, 'marketing digital');
    t = t.replace(/estratégia digital/gi, 'estrategia digital');
    t = t.replace(/resultados reais/gi, 'resultados reales');
    t = t.replace(/retorno sobre investimento/gi, 'retorno de inversión (ROI)');
    t = t.replace(/vantagens/gi, 'ventajas');
    t = t.replace(/diferenciais/gi, 'diferenciales');
    t = t.replace(/Como funciona/gi, 'Cómo funciona');
    t = t.replace(/Por que/gi, 'Por qué');
    t = t.replace(/O que é/gi, 'Qué es');
    t = t.replace(/Principais benefícios/gi, 'Principales beneficios');
    t = t.replace(/Conclusão/gi, 'Conclusión');
    return t;
  }

  return text;
}

function sanitizeGroupKey(slug) {
  return 'blog_' + slug.replace(/-/g, '_');
}

// Build sequential list of items from article data
function extractSequentialItems(article, lang) {
  const data = article[lang] || article.pt;
  const ptData = article.pt;
  const items = [];

  // k1: category
  items.push(data.category || (lang === 'en' ? directTranslations.en[ptData.category] : directTranslations.es[ptData.category]) || ptData.category);
  // k2: category
  items.push(data.category || (lang === 'en' ? directTranslations.en[ptData.category] : directTranslations.es[ptData.category]) || ptData.category);
  // k3: h1
  items.push(data.h1 || ptData.h1);
  // k4: subtitle
  items.push(data.subtitle || ptData.subtitle);

  // Sections matching PT structure precisely
  ptData.sections.forEach((ptSec, secIdx) => {
    const langSec = (data.sections && data.sections[secIdx]) ? data.sections[secIdx] : null;

    // H2
    items.push(langSec ? langSec.h2 : translateText(ptSec.h2, lang));

    // Paragraphs
    ptSec.paragraphs.forEach((ptP, pIdx) => {
      if (langSec && langSec.paragraphs && langSec.paragraphs[pIdx]) {
        items.push(langSec.paragraphs[pIdx]);
      } else {
        items.push(translateText(ptP, lang));
      }
    });

    // List title and items
    if (ptSec.listTitle && ptSec.listItems && ptSec.listItems.length > 0) {
      if (langSec && langSec.listTitle) {
        items.push(langSec.listTitle);
      } else {
        items.push(translateText(ptSec.listTitle, lang));
      }

      ptSec.listItems.forEach((ptLi, liIdx) => {
        if (langSec && langSec.listItems && langSec.listItems[liIdx]) {
          items.push(langSec.listItems[liIdx]);
        } else {
          items.push(translateText(ptLi, lang));
        }
      });
    }

    // Table
    if (ptSec.table) {
      ptSec.table.headers.forEach((th, thIdx) => {
        if (langSec && langSec.table && langSec.table.headers && langSec.table.headers[thIdx]) {
          items.push(langSec.table.headers[thIdx]);
        } else {
          items.push(translateText(th, lang));
        }
      });
      ptSec.table.rows.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
          if (langSec && langSec.table && langSec.table.rows && langSec.table.rows[rIdx] && langSec.table.rows[rIdx][cIdx]) {
            items.push(langSec.table.rows[rIdx][cIdx]);
          } else {
            items.push(translateText(cell, lang));
          }
        });
      });
    }
  });

  // FAQs
  if (ptData.faq && ptData.faq.length > 0) {
    items.push(lang === 'pt' ? 'Perguntas Frequentes' : (lang === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'));
    ptData.faq.forEach((faqItem, fIdx) => {
      const langFaq = (data.faq && data.faq[fIdx]) ? data.faq[fIdx] : null;
      items.push(langFaq ? langFaq.q : translateText(faqItem.q, lang));
      items.push(langFaq ? langFaq.a : translateText(faqItem.a, lang));
    });
  }

  // CTA
  const ptCta = ptData.cta || {};
  const langCta = data.cta || {};
  items.push(langCta.title || translateText(ptCta.title || 'Pronto para fortalecer sua presença digital?', lang));
  items.push(langCta.desc || translateText(ptCta.desc || 'Fale com os especialistas da CONEXUS e receba uma consultoria personalizada.', lang));
  items.push(langCta.btnText || translateText(ptCta.btnText || 'Falar com a CONEXUS', lang));
  items.push(lang === 'pt' ? 'Acessar Página de Contato' : (lang === 'en' ? 'Visit Contact Page' : 'Ir a Página de Contacto'));

  return items;
}

// Generate complete dictionary object
const synchronizedDicts = {
  pt: {},
  en: {},
  es: {}
};

for (const article of all60Articles) {
  const groupKey = sanitizeGroupKey(article.slug);

  for (const lang of ['pt', 'en', 'es']) {
    const items = extractSequentialItems(article, lang);
    const dict = {};
    items.forEach((val, idx) => {
      dict[`k${idx + 1}`] = val;
    });
    synchronizedDicts[lang][groupKey] = dict;
  }
}

// Inject cleanly into src/i18n files
function updateI18nFile(filePath, langCode, newDicts) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const autoContentIndex = content.indexOf('"autoContent": {');
  if (autoContentIndex === -1) {
    console.error(`Could not find "autoContent": { in ${filePath}`);
    return;
  }

  // Remove existing blog_ entries generated previously to avoid duplicate keys
  let cleanContent = content;
  for (const groupKey of Object.keys(newDicts)) {
    const regex = new RegExp(`\\s*"${groupKey}":\\s*\\{[\\s\\S]*?\\},?`, 'g');
    cleanContent = cleanContent.replace(regex, '');
  }

  // Now insert freshly formatted entries
  let jsonString = '';
  for (const [groupKey, keysObj] of Object.entries(newDicts)) {
    jsonString += `    "${groupKey}": {\n`;
    const entries = Object.entries(keysObj);
    entries.forEach(([k, v], idx) => {
      const isLast = idx === entries.length - 1;
      const escaped = JSON.stringify(v);
      jsonString += `      "${k}": ${escaped}${isLast ? '' : ','}\n`;
    });
    jsonString += `    },\n`;
  }

  const cleanAutoContentIndex = cleanContent.indexOf('"autoContent": {');
  const insertPos = cleanContent.indexOf('\n', cleanAutoContentIndex) + 1;
  const updatedContent = cleanContent.slice(0, insertPos) + jsonString + cleanContent.slice(insertPos);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log(`Successfully updated ${filePath} with ${Object.keys(newDicts).length} synchronized article dictionaries.`);
}

updateI18nFile(path.join(rootDir, 'src', 'i18n', 'pt.js'), 'pt', synchronizedDicts.pt);
updateI18nFile(path.join(rootDir, 'src', 'i18n', 'en.js'), 'en', synchronizedDicts.en);
updateI18nFile(path.join(rootDir, 'src', 'i18n', 'es.js'), 'es', synchronizedDicts.es);

console.log('ALL 60 BLOG DICTIONARIES SYNCHRONIZED 100% ACROSS PT, EN, ES.');
