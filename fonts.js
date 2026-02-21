/**
 * NovaFlow Font Loader v1.0
 * Smart loads Google Fonts when their utility classes are used
 * Includes 50+ popular fonts with weights 400,500,600,700
 */

(function() {
  'use strict';

  // Font configuration - 50+ fonts with their Google Fonts URLs
  const fontConfig = {
    // Brand/Display Fonts
    'comfortaa': 'Comfortaa:wght@300;400;500;600;700',
    'poppins': 'Poppins:wght@300;400;500;600;700',
    'montserrat': 'Montserrat:wght@300;400;500;600;700',
    'raleway': 'Raleway:wght@300;400;500;600;700',
    'oswald': 'Oswald:wght@300;400;500;600;700',
    'bebas-neue': 'Bebas+Neue&display=swap',
    'anton': 'Anton&display=swap',
    'archivo-black': 'Archivo+Black&display=swap',
    'caveat': 'Caveat:wght@400;500;600;700',
    'pacifico': 'Pacifico&display=swap',

    // Sans-Serif (Popular)
    'inter': 'Inter:wght@300;400;500;600;700',
    'roboto': 'Roboto:wght@300;400;500;700',
    'open-sans': 'Open+Sans:wght@300;400;500;600;700',
    'lato': 'Lato:wght@300;400;700',
    'source-sans': 'Source+Sans+Pro:wght@300;400;600;700',
    'nunito': 'Nunito:wght@300;400;500;600;700',
    'nunito-sans': 'Nunito+Sans:wght@300;400;600;700',
    'work-sans': 'Work+Sans:wght@300;400;500;600;700',
    'quicksand': 'Quicksand:wght@300;400;500;600;700',
    'josefin-sans': 'Josefin+Sans:wght@300;400;500;600;700',
    'rubik': 'Rubik:wght@300;400;500;600;700',
    'kanit': 'Kanit:wght@300;400;500;600;700',
    'ubuntu': 'Ubuntu:wght@300;400;500;700',
    'dm-sans': 'DM+Sans:wght@400;500;700',
    'asap': 'Asap:wght@400;500;600;700',
    'mukta': 'Mukta:wght@300;400;500;600;700',
    'heebo': 'Heebo:wght@300;400;500;600;700',
    'prompt': 'Prompt:wght@300;400;500;600;700',
    'fira-sans': 'Fira+Sans:wght@300;400;500;600;700',
    'roboto-condensed': 'Roboto+Condensed:wght@300;400;700',

    // Serif
    'merriweather': 'Merriweather:wght@300;400;700',
    'playfair': 'Playfair+Display:wght@400;500;600;700',
    'roboto-slab': 'Roboto+Slab:wght@300;400;500;600;700',
    'lora': 'Lora:wght@400;500;600;700',
    'cormorant': 'Cormorant:wght@300;400;500;600;700',
    'vollkorn': 'Vollkorn:wght@400;500;600;700',
    'cardo': 'Cardo:wght@400;700',
    'libre-baskerville': 'Libre+Baskerville:wght@400;700',
    'alegreya': 'Alegreya:wght@400;500;600;700',
    'source-serif': 'Source+Serif+Pro:wght@300;400;600;700',
    'domine': 'Domine:wght@400;500;600;700',
    'spectral': 'Spectral:wght@300;400;500;600;700',
    'bitter': 'Bitter:wght@300;400;500;600;700',

    // Monospace
    'jetbrains-mono': 'JetBrains+Mono:wght@300;400;500;600;700',
    'fira-code': 'Fira+Code:wght@300;400;500;600;700',
    'source-code': 'Source+Code+Pro:wght@300;400;500;600;700',
    'space-mono': 'Space+Mono:wght@400;700',
    'roboto-mono': 'Roboto+Mono:wght@300;400;500;600;700',
    'inconsolata': 'Inconsolata:wght@300;400;500;600;700',
    'ubuntu-mono': 'Ubuntu+Mono:wght@400;700',
    'cutive-mono': 'Cutive+Mono&display=swap',
    'courier-prime': 'Courier+Prime:wght@400;700',

    // Handwriting/Decorative
    'indie-flower': 'Indie+Flower&display=swap',
    'permanent-marker': 'Permanent+Marker&display=swap',
    'amatic-sc': 'Amatic+SC:wght@400;700',
    'dancing-script': 'Dancing+Script:wght@400;500;600;700',
    'shadows-into-light': 'Shadows+Into+Light&display=swap',
    'kalam': 'Kalam:wght@300;400;700',
    'gochi-hand': 'Gochi+Hand&display=swap',
    'rock-salt': 'Rock+Salt&display=swap',
    'fredoka': 'Fredoka:wght@300;400;500;600;700'
  };

  // Core fonts that load automatically (10 fonts)
  const coreFonts = [
    'inter', 'roboto', 'open-sans', 'lato', 'poppins', 
    'montserrat', 'source-sans', 'comfortaa', 'oswald', 'fira-sans'
  ];

  // Load core fonts immediately
  function loadCoreFonts() {
    const families = coreFonts.map(font => fontConfig[font]).join('&family=');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add font classes to CSS variables
    updateFontVariables();
  }

  // Update CSS variables with loaded fonts
  function updateFontVariables() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-brand: 'Inter', 'Poppins', system-ui, sans-serif;
        --font-base: system-ui, -apple-system, 'Roboto', 'Open Sans', sans-serif;
        --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
      }
    `;
    document.head.appendChild(style);
  }

  // Check DOM for font classes and load missing fonts
  function checkAndLoadFonts() {
    const allElements = document.querySelectorAll('*');
    const usedFonts = new Set();

    allElements.forEach(element => {
      // FIXED: Check if className exists and is a string
      if (element.className && typeof element.className === 'string') {
        element.className.split(' ').forEach(cls => {
          const match = cls.match(/font-([a-zA-Z0-9-]+)/);
          if (match && match[1]) {
            const fontName = match[1];
            if (fontConfig[fontName] && !coreFonts.includes(fontName)) {
              usedFonts.add(fontName);
            }
          }
        });
      }
      
      // FIXED: Also check for SVG elements that might have classList
      if (element.classList && element.classList.length > 0) {
        element.classList.forEach(cls => {
          const match = cls.match(/font-([a-zA-Z0-9-]+)/);
          if (match && match[1]) {
            const fontName = match[1];
            if (fontConfig[fontName] && !coreFonts.includes(fontName)) {
              usedFonts.add(fontName);
            }
          }
        });
      }
    });

    // Load each used font
    usedFonts.forEach(fontName => {
      loadFont(fontName);
    });
  }

  // Load a specific font
  function loadFont(fontName) {
    if (!fontConfig[fontName]) return;

    // Check if already loaded
    if (document.getElementById(`font-${fontName}`)) return;

    const link = document.createElement('link');
    link.id = `font-${fontName}`;
    link.href = `https://fonts.googleapis.com/css2?family=${fontConfig[fontName]}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    console.log(`NovaStyle: Loaded font - ${fontName}`);
  }

  // Observe DOM changes for dynamically added font classes
  function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
      let shouldCheck = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          shouldCheck = true;
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              shouldCheck = true;
            }
          });
        }
      });

      if (shouldCheck) {
        // Debounce check to avoid too many calls
        clearTimeout(window.fontCheckTimeout);
        window.fontCheckTimeout = setTimeout(checkAndLoadFonts, 100);
      }
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }

  // Initialize
  function init() {
    loadCoreFonts();

    // Initial check after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndLoadFonts);
    } else {
      checkAndLoadFonts();
    }

    // Watch for changes
    observeDOMChanges();
  }

  init();

  // Expose API for manual font loading
  window.NovaFonts = {
    load: loadFont,
    loadAll: () => {
      Object.keys(fontConfig).forEach(loadFont);
    },
    config: fontConfig
  };

})();
