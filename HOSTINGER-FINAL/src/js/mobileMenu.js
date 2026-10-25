/**
 * Gerenciador de Menu Mobile para a CONEXUS
 */
export function initMobileMenu() {
  const toggleBtn = document.querySelector('#mobile-toggle');
  const menuDrawer = document.querySelector('#mobile-menu');

  if (!toggleBtn || !menuDrawer) return;

  function toggleMenu() {
    const isOpen = menuDrawer.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    menuDrawer.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuDrawer.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em um link
  const links = menuDrawer.querySelectorAll('.nav-link, .btn');
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Tecla Escape fecha o menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuDrawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}
