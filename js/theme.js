(function () {
  const STORAGE_KEY = 'theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    const headerContent = document.querySelector('.header-content');
    if (!headerContent || document.getElementById('theme-toggle')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'theme-toggle';
    button.type = 'button';
    headerContent.appendChild(button);

    function updateToggle() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      button.innerHTML = isDark
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
    }

    updateToggle();

    button.addEventListener('click', function () {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
      updateToggle();
    });
  });
})();
