import { siteConfig } from '../config/siteConfig.js';
import { translations, defaultLanguage } from '../i18n/index.js';

/**
 * Retorna a URL formatada do WhatsApp com a mensagem contextual codificada no idioma ativo
 * @param {string} messageKey - Chave da mensagem em whatsapp
 * @returns {string} URL completa de direcionamento ao WhatsApp
 */
export function getWhatsAppUrl(messageKey = 'homeHero') {
  let currentLang = defaultLanguage;
  if (typeof document !== 'undefined') {
    currentLang = document.documentElement.getAttribute('data-current-lang') || 
      (typeof localStorage !== 'undefined' ? localStorage.getItem('conexus_lang') : null) || 
      defaultLanguage;
  }
  const dict = translations[currentLang] || translations[defaultLanguage];
  const message = dict?.whatsapp?.[messageKey] || siteConfig.whatsappMessages?.[messageKey] || siteConfig.whatsappMessages?.homeHero || '';
  
  const rawNumber = siteConfig.whatsappNumber || '5541991569590';
  const cleanNumber = rawNumber.replace(/\D/g, '') || '5541991569590';
  
  if (message) {
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }
  
  return `https://wa.me/${cleanNumber}`;
}

/**
 * Atualiza dinamicamente os links de WhatsApp presentes na página com a mensagem correspondente
 */
export function initWhatsAppLinks() {
  const elements = document.querySelectorAll('[data-whatsapp-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-whatsapp-key');
    const url = getWhatsAppUrl(key);
    element.setAttribute('href', url);
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener noreferrer');
  });
}
