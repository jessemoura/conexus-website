import { pt } from '../../src/i18n/pt.js';

export async function fullSentenceTranslator() {
  const articles = [
    'blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais',
    'blog_como_usar_site_para_atrair_clientes_google',
    'blog_conexus_guest_hub_guia_digital_para_hospedagens',
    'blog_por_que_sua_empresa_precisa_de_um_site',
    'blog_quanto_custa_site_profissional_2026'
  ];

  const enArticles = {};
  const esArticles = {};

  // For each article, provide human-grade sentence-level translation
  // We'll map each pt key to its accurate translation
  for (const art of articles) {
    enArticles[art] = {};
    esArticles[art] = {};

    const ptGroup = pt.autoContent[art];
    for (const [k, ptText] of Object.entries(ptGroup)) {
      const translated = getTranslationForArticleKey(art, k, ptText);
      enArticles[art][k] = translated.en;
      esArticles[art][k] = translated.es;
    }
  }

  return { enArticles, esArticles };
}

// Complete master dictionary for all keys of the 5 articles
import { articlesTranslationsDatabase } from './articlesTranslationsDatabase.mjs';

function getTranslationForArticleKey(article, key, ptText) {
  if (articlesTranslationsDatabase[article] && articlesTranslationsDatabase[article][key]) {
    return articlesTranslationsDatabase[article][key];
  }
  return { en: ptText, es: ptText };
}
