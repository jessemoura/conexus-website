import { pt } from './pt.js?v=20261003.04';
import { en } from './en.js?v=20261003.04';
import { es } from './es.js?v=20261003.04';

export const translations = {
  pt,
  en,
  es
};

export const defaultLanguage = 'pt';
export const supportedLanguages = ['pt', 'en', 'es'];

export const languageMeta = {
  pt: { code: 'pt', name: 'Português', flag: '/assets/icons/flags/br.svg', flagAlt: 'Bandeira do Brasil', htmlLang: 'pt-BR' },
  en: { code: 'en', name: 'English', flag: '/assets/icons/flags/gb.svg', flagAlt: 'Flag of the United Kingdom', htmlLang: 'en' },
  es: { code: 'es', name: 'Español', flag: '/assets/icons/flags/es.svg', flagAlt: 'Bandera de España', htmlLang: 'es' }
};

