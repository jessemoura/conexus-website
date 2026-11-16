import { initWhatsAppLinks } from './whatsapp.js?v=20261116.05';
import { initMobileMenu } from './mobileMenu.js?v=20261116.05';
import { initTracking } from './tracking.js?v=20261116.05';
import { initThemeToggle } from './themeToggle.js?v=20261116.05';
import { initReviews } from './reviews.js?v=20261116.05';
import { initI18n } from './i18n.js?v=20261116.05';
import { initCookieConsent } from './cookieConsent.js?v=20261116.05';

function initAll() {
  initI18n();
  initCookieConsent();
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

