import { initWhatsAppLinks } from './whatsapp.js';
import { initMobileMenu } from './mobileMenu.js';
import { initTracking } from './tracking.js';
import { initThemeToggle } from './themeToggle.js';
import { initReviews } from './reviews.js';
import { initI18n } from './i18n.js';

function initAll() {
  initI18n();
  initWhatsAppLinks();
  initMobileMenu();
  initTracking();
  initThemeToggle();
  initReviews();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
