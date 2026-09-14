import { translations, defaultLanguage, supportedLanguages, languageMeta } from '../i18n/index.js';
import { initWhatsAppLinks } from './whatsapp.js';

let currentLanguage = defaultLanguage;

/**
 * Obtém valor de chave aninhada no dicionário (ex: 'nav.home' ou 'services.items.criacaoSites.title')
 */
export function getTranslation(key, lang = currentLanguage) {
  const dict = translations[lang] || translations[defaultLanguage];
  const keys = key.split('.');
  let result = dict;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback para português caso não encontre
      let fallback = translations[defaultLanguage];
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key;
        }
      }
      return fallback;
    }
  }
  return result;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Aplica todas as traduções nos elementos marcados no DOM
 */
export function applyTranslations(lang) {
  if (!supportedLanguages.includes(lang)) {
    lang = defaultLanguage;
  }
  currentLanguage = lang;
  
  const meta = languageMeta[lang] || languageMeta[defaultLanguage];
  
  // 1. Atualiza atributo lang do elemento <html>
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.setAttribute('data-current-lang', lang);

  // 2. Atualiza elementos com data-i18n (texto puro)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const translation = getTranslation(key, lang);
    if (translation && typeof translation === 'string') {
      el.textContent = translation;
    }
  });

  // 3. Atualiza elementos com data-i18n-html (HTML seguro)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    const translation = getTranslation(key, lang);
    if (translation && typeof translation === 'string') {
      el.innerHTML = translation;
    }
  });

  // 4. Atualiza atributos (data-i18n-attr="placeholder:form.name,aria-label:nav.home")
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attrConfig = el.getAttribute('data-i18n-attr');
    if (!attrConfig) return;
    
    // Suporta múltiplos atributos separados por vírgula
    const mappings = attrConfig.split(',');
    mappings.forEach(mapping => {
      const [attrName, key] = mapping.split(':').map(s => s.trim());
      if (attrName && key) {
        const translation = getTranslation(key, lang);
        if (translation && typeof translation === 'string') {
          el.setAttribute(attrName, translation);
        }
      }
    });
  });

  // 5. Atualiza Title e Meta Description da página se houver data-i18n-page no <body>
  const pageKey = document.body?.getAttribute('data-i18n-page');
  if (pageKey) {
    const titleKey = `meta.${pageKey}Title`;
    const descKey = `meta.${pageKey}Description`;
    
    const pageTitle = getTranslation(titleKey, lang);
    if (pageTitle && pageTitle !== titleKey) {
      document.title = pageTitle;
    }
    
    const metaDesc = document.querySelector('meta[name="description"]');
    const pageDesc = getTranslation(descKey, lang);
    if (metaDesc && pageDesc && pageDesc !== descKey) {
      metaDesc.setAttribute('content', pageDesc);
    }
  }

  // 6. Atualiza UI do Seletor no Header
  updateSelectorUI(lang);

  // 7. Atualiza Links do WhatsApp com as mensagens no idioma correspondente
  initWhatsAppLinks();

  // 8. Dispara evento global para outros componentes (ex: reviews.js)
  window.dispatchEvent(new CustomEvent('conexus:languageChange', { detail: { lang } }));
}

/**
 * Atualiza visual do botão e do dropdown do seletor de idiomas
 */
function updateSelectorUI(lang) {
  const meta = languageMeta[lang] || languageMeta[defaultLanguage];
  
  // Atualiza bandeiras dos botões do seletor (suporta desktop e mobile)
  document.querySelectorAll('.lang-active-flag-img').forEach(el => {
    el.setAttribute('src', meta.flag);
    el.setAttribute('alt', meta.flagAlt);
  });
  
  document.querySelectorAll('.lang-active-code').forEach(el => {
    el.textContent = meta.code.toUpperCase();
  });
  
  // Atualiza classes ativas nas opções do dropdown
  document.querySelectorAll('.lang-option').forEach(option => {
    const optLang = option.getAttribute('data-lang');
    const isSelected = optLang === lang;
    option.classList.toggle('active', isSelected);
    option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

/**
 * Troca de idioma programática
 */
export function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) {
    lang = defaultLanguage;
  }
  
  localStorage.setItem('conexus_lang', lang);
  
  // Atualiza query param na URL de forma limpa sem recarregar a página
  const url = new URL(window.location.href);
  if (lang === defaultLanguage) {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', lang);
  }
  window.history.replaceState({}, '', url.toString());

  applyTranslations(lang);
}

/**
 * Inicializa os ouvintes de eventos e estado do seletor de idioma
 */
export function initI18n() {
  // 1. Detecta idioma inicial (URL param > localStorage > default)
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');
  const savedLang = localStorage.getItem('conexus_lang');
  
  let initialLang = defaultLanguage;
  if (paramLang && supportedLanguages.includes(paramLang.toLowerCase())) {
    initialLang = paramLang.toLowerCase();
  } else if (savedLang && supportedLanguages.includes(savedLang)) {
    initialLang = savedLang;
  }

  // 2. Configura eventos dos seletores (dropdowns)
  const selectors = document.querySelectorAll('.lang-selector-dropdown');
  selectors.forEach(selector => {
    const btn = selector.querySelector('.lang-btn');
    const menu = selector.querySelector('.lang-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = selector.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    selector.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = option.getAttribute('data-lang');
        if (selectedLang) {
          setLanguage(selectedLang);
        }
        selector.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Fechar dropdowns ao clicar fora
  document.addEventListener('click', (e) => {
    selectors.forEach(selector => {
      if (!selector.contains(e.target)) {
        selector.classList.remove('is-open');
        const btn = selector.querySelector('.lang-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fechar ao pressionar tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      selectors.forEach(selector => {
        selector.classList.remove('is-open');
        const btn = selector.querySelector('.lang-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 3. Aplica idioma inicial
  applyTranslations(initialLang);
}
