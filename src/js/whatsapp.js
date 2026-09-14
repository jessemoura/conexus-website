import { siteConfig } from '../config/siteConfig.js';
import { translations, defaultLanguage } from '../i18n/index.js';

/**
 * Retorna a URL formatada do WhatsApp com a mensagem contextual codificada no idioma ativo
 * @param {string} messageKey - Chave da mensagem em whatsapp
 * @returns {string} URL completa de direcionamento ao WhatsApp
 */
export function getWhatsAppUrl(messageKey = 'homeHero') {
  const currentLang = document.documentElement.getAttribute('data-current-lang') || localStorage.getItem('conexus_lang') || defaultLanguage;
  const dict = translations[currentLang] || translations[defaultLanguage];
  const message = dict?.whatsapp?.[messageKey] || siteConfig.whatsappMessages[messageKey] || siteConfig.whatsappMessages.homeHero;
  const encodedText = encodeURIComponent(message);
  
  if (!siteConfig.whatsappNumber) {
    // Se o número ainda não estiver configurado no staging, utiliza o endpoint de API do WhatsApp com mensagem
    return `https://api.whatsapp.com/send?text=${encodedText}`;
  }
  
  // Limpa caracteres não numéricos do telefone
  const cleanNumber = siteConfig.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
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
