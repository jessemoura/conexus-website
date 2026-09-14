import { initWhatsAppLinks } from './whatsapp.js';
import { initMobileMenu } from './mobileMenu.js';
import { initTracking } from './tracking.js';
import { initThemeToggle } from './themeToggle.js';
import { initReviews } from './reviews.js';
import { initI18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initWhatsAppLinks();
  initMobileMenu();
  initTracking();
  initThemeToggle();
  initReviews();
});
