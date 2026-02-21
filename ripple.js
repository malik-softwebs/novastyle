/**
 * NovaFlow Ripple Effect v1.0
 * Material Design ripple for buttons and interactive elements
 */

(function() {
  'use strict';
  
  class RippleEffect {
    constructor() {
      this.init();
    }
    
    init() {
      // Add ripple class to elements with ripple effect
      document.addEventListener('click', this.createRipple.bind(this));
      
      // Watch for dynamically added elements
      this.observeNewElements();
    }
    
    createRipple(event) {
      const target = event.target.closest('.ripple, .btn, .nav-item, .chip');
      if (!target) return;
      
      // Check if element already has ripple container
      let rippleContainer = target.querySelector('.ripple-container');
      
      if (!rippleContainer) {
        rippleContainer = document.createElement('span');
        rippleContainer.className = 'ripple-container';
        rippleContainer.style.position = 'absolute';
        rippleContainer.style.top = '0';
        rippleContainer.style.left = '0';
        rippleContainer.style.right = '0';
        rippleContainer.style.bottom = '0';
        rippleContainer.style.overflow = 'hidden';
        rippleContainer.style.borderRadius = 'inherit';
        rippleContainer.style.pointerEvents = 'none';
        target.style.position = 'relative';
        target.appendChild(rippleContainer);
      }
      
      // Create ripple element
      const ripple = document.createElement('span');
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left - radius;
      const y = event.clientY - rect.top - radius;
      
      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.backgroundColor = 'currentColor';
      ripple.style.opacity = '0.3';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      
      rippleContainer.appendChild(ripple);
      
      // Animate
      setTimeout(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
      }, 10);
      
      // Remove after animation
      setTimeout(() => {
        ripple.remove();
        if (rippleContainer.children.length === 0) {
          rippleContainer.remove();
        }
      }, 500);
    }
    
    observeNewElements() {
      const observer = new MutationObserver(mutations => {
        // No need to do anything, the click handler will catch new elements
        // Just ensure we're not doing extra work
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new RippleEffect();
    });
  } else {
    new RippleEffect();
  }
  
})();
