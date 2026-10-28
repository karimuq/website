(function () {
  const STORAGE_KEY = 'theme';

  function getStoredTheme() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (error) {
      // Storage can be unavailable (private browsing, restricted contexts, etc.)
    }

    return null;
  }

  function persistTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures gracefully.
    }
  }

  function getPreferredTheme() {
    const saved = getStoredTheme();
    if (saved) {
      return saved;
    }

    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light';
  }

  function applyTheme(theme) {
    if (document.documentElement) {
      document.documentElement.setAttribute('data-theme', theme);
    }
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
      persistTheme(nextTheme);
      updateToggle();
    });
  });
})();
