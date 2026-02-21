/**
 * NovaFlow Dark Mode Toggle v1.0
 * Handles manual dark mode switching with localStorage
 */

(function() {
  'use strict';
  
  class DarkModeManager {
    constructor() {
      this.init();
    }
    
    init() {
      // Check for saved preference
      const savedMode = localStorage.getItem('novacss-dark-mode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
      
      // Watch for system changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('novacss-dark-mode')) {
          if (e.matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      });
    }
    
    toggle() {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('novacss-dark-mode', isDark ? 'dark' : 'light');
      return isDark;
    }
    
    enable() {
      document.documentElement.classList.add('dark');
      localStorage.setItem('novacss-dark-mode', 'dark');
    }
    
    disable() {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('novacss-dark-mode', 'light');
    }
  }
  
  // Expose global API
  window.NovaDarkMode = new DarkModeManager();
  
})();
