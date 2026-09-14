import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

const ptWords = ['para', 'com', 'você', 'vocês', 'sua', 'seu', 'suas', 'seus', 'nossa', 'nosso', 'nossas', 'nossos', 'empresa', 'empresas', 'negócio', 'negócios', 'criação', 'desenvolvimento', 'serviços', 'contato', 'orçamento', 'soluções', 'conheça', 'saiba', 'fale', 'estratégia', 'atendimento', 'hospedagem', 'hóspedes'];
const ptOnlyInEs = ['você', 'vocês', 'nossa', 'nosso', 'nossas', 'nossos', 'criação', 'negócio', 'negócios', 'orçamento', 'conheça', 'saiba', 'hóspedes'];

const autoContentEnIssues = [];
const autoContentEsIssues = [];

for (const group in pt.autoContent || {}) {
  for (const k in pt.autoContent[group]) {
    const ptText = pt.autoContent[group][k];
    const enText = en.autoContent?.[group]?.[k] || '';
    const esText = es.autoContent?.[group]?.[k] || '';

    if (enText.length > 15) {
      const m = ptWords.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(enText));
      if (m.length >= 2) {
        autoContentEnIssues.push({ key: `autoContent.${group}.${k}`, pt: ptText, en: enText, markers: m });
      }
    }

    if (esText.length > 15) {
      const m = ptOnlyInEs.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(esText));
      if (m.length >= 1) {
        autoContentEsIssues.push({ key: `autoContent.${group}.${k}`, pt: ptText, es: esText, markers: m });
      }
    }
  }
}

console.log('autoContent EN issues count:', autoContentEnIssues.length);
if (autoContentEnIssues.length > 0) {
  console.log('Sample EN autoContent issues:', autoContentEnIssues.slice(0, 10));
}

console.log('autoContent ES issues count:', autoContentEsIssues.length);
if (autoContentEsIssues.length > 0) {
  console.log('Sample ES autoContent issues:', autoContentEsIssues.slice(0, 10));
}
