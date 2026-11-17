import { initWhatsAppLinks } from './whatsapp.js?v=20261116.06';
import { initMobileMenu } from './mobileMenu.js?v=20261116.06';
import { initTracking } from './tracking.js?v=20261116.06';
import { initThemeToggle } from './themeToggle.js?v=20261116.06';
import { initReviews } from './reviews.js?v=20261116.06';
import { initI18n } from './i18n.js?v=20261116.06';
import { initCookieConsent } from './cookieConsent.js?v=20261116.06';

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

