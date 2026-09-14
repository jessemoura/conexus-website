// Theme Toggle Manager - CONEXUS
export function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // 1. Check saved preference or system preference
  const savedTheme = localStorage.getItem('conexus_theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  
  let currentTheme = savedTheme ? savedTheme : (prefersLight ? 'light' : 'dark');
  applyTheme(currentTheme);

  // 2. Listen to OS color scheme changes if user has no saved preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('conexus_theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  // 3. Toggle button listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isCurrentlyLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('conexus_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}
