import { translations, defaultLanguage, supportedLanguages, languageMeta } from '../i18n/index.js?v=20261003.04';
import { initWhatsAppLinks } from './whatsapp.js';

let currentLanguage = defaultLanguage;

/**
 * Obtém valor de chave aninhada no dicionário (ex: 'nav.home' ou 'services.items.criacaoSites.title')
 */
export function getTranslation(key, lang = currentLanguage) {
  if (!key || typeof key !== 'string') return null;
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
          return null;
        }
      }
      return (fallback !== undefined && typeof fallback === 'string') ? fallback : null;
    }
  }
  return (result !== undefined && typeof result === 'string') ? result : null;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Valida se uma string traduzida é válida para renderização (não é chave técnica vazia/nula)
 */
function isValidTranslation(val, key) {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed === '') return false;
  if (trimmed === key) return false;
  if (trimmed.startsWith('autoContent.') || trimmed.startsWith('blog_') || trimmed.startsWith('meta.') || trimmed.startsWith('nav.') || trimmed.startsWith('footer.') || trimmed.startsWith('common.') || trimmed.startsWith('services.') || trimmed.startsWith('portfolio.') || trimmed.startsWith('faq.')) return false;
  if (/\.k\d+/.test(trimmed) || /^k\d+$/.test(trimmed)) return false;
  return true;
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
    if (isValidTranslation(translation, key)) {
      el.textContent = translation;
    }
  });

  // 3. Atualiza elementos com data-i18n-html (HTML seguro)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    const translation = getTranslation(key, lang);
    if (isValidTranslation(translation, key)) {
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
        if (isValidTranslation(translation, key)) {
          el.setAttribute(attrName, translation);
        }
      }
    });
  });

  // 5. Atualiza Title e Meta Description da página se houver data-i18n-page no <body>
  const pageKey = document.body?.getAttribute('data-i18n-page');
  let translatedPageTitle = null;
  let translatedPageDesc = null;

  if (pageKey) {
    const titleKey = `meta.${pageKey}Title`;
    const descKey = `meta.${pageKey}Description`;
    
    let pageTitle = getTranslation(titleKey, lang);
    if (!isValidTranslation(pageTitle, titleKey)) {
      pageTitle = getTranslation(`${pageKey}_title`, lang) || getTranslation(`${pageKey}.title`, lang);
    }
    if (isValidTranslation(pageTitle, titleKey)) {
      document.title = pageTitle;
      translatedPageTitle = pageTitle;
    }
    
    const metaDesc = document.querySelector('meta[name="description"]');
    let pageDesc = getTranslation(descKey, lang);
    if (!isValidTranslation(pageDesc, descKey)) {
      pageDesc = getTranslation(`${pageKey}_desc`, lang) || getTranslation(`${pageKey}.desc`, lang);
    }
    if (metaDesc && isValidTranslation(pageDesc, descKey)) {
      metaDesc.setAttribute('content', pageDesc);
      translatedPageDesc = pageDesc;
    }
  }

  // 5B. Atualiza Canonical, Open Graph e Twitter Cards conforme o idioma ativo
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    const rawHref = canonicalEl.getAttribute('href') || '';
    const cleanHref = rawHref.split('?')[0];
    if (lang === defaultLanguage) {
      canonicalEl.setAttribute('href', cleanHref);
    } else {
      canonicalEl.setAttribute('href', `${cleanHref}?lang=${lang}`);
    }
  }

  const ogUrlEl = document.querySelector('meta[property="og:url"]');
  if (ogUrlEl) {
    const rawOgHref = ogUrlEl.getAttribute('content') || '';
    const cleanOgHref = rawOgHref.split('?')[0];
    if (lang === defaultLanguage) {
      ogUrlEl.setAttribute('content', cleanOgHref);
    } else {
      ogUrlEl.setAttribute('content', `${cleanOgHref}?lang=${lang}`);
    }
  }

  if (translatedPageTitle) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', translatedPageTitle);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', translatedPageTitle);
  }

  if (translatedPageDesc) {
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', translatedPageDesc);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', translatedPageDesc);
  }

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    const localeMap = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
    ogLocale.setAttribute('content', localeMap[lang] || 'pt_BR');
  }

  // 5C. Preserva o idioma ativo nos links internos (evita que card/links em EN/ES apontem para PT)
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('linkedin.com') || href.includes('instagram.com')) return;

    const isInternalRelative = href.startsWith('/') || href.startsWith('./') || (!href.includes('://') && !href.startsWith('//'));
    const isInternalAbsolute = href.startsWith('https://conexus.press') || href.startsWith('https://www.conexus.press');

    if (isInternalRelative || isInternalAbsolute) {
      try {
        const url = new URL(href, window.location.origin);
        if (/\.(webp|png|jpe?g|gif|svg|ico|pdf|xml|webmanifest|css|js)$/i.test(url.pathname)) return;

        if (lang === defaultLanguage) {
          url.searchParams.delete('lang');
        } else {
          url.searchParams.set('lang', lang);
        }

        if (isInternalRelative && !isInternalAbsolute) {
          const updated = url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
          a.setAttribute('href', updated);
        } else {
          a.setAttribute('href', url.toString());
        }
      } catch (e) {}
    }
  });

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
