/* ========================================
   Royal Fit Uniform — Shared JS
   ======================================== */

import './style.css';
import Swup from 'swup';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupFadeTheme from '@swup/fade-theme';
import { lookbookData } from './lookbookData.js';

// ---- Loading Overlay ----
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loading-overlay');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
  }
});

// ---- Mobile Nav Toggle ----
function initMobileNav() {
  const hamburger = document.getElementById('mobile-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    if (isOpen) {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      mobileOverlay?.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      mobileOverlay?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  hamburger.addEventListener('click', toggle);
  mobileOverlay?.addEventListener('click', toggle);

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', toggle);
  });
}

// ---- Specs/Quote Drawer ----
function initDrawer() {
  const drawer = document.getElementById('specs-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (!drawer) return;

  window.toggleDrawer = () => {
    if (drawer.classList.contains('drawer-closed')) {
      drawer.classList.remove('drawer-closed');
      drawer.classList.add('drawer-open');
      overlay?.classList.remove('hidden');
      setTimeout(() => {
        overlay?.classList.remove('opacity-0');
        overlay?.classList.add('opacity-100');
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('drawer-open');
      drawer.classList.add('drawer-closed');
      overlay?.classList.remove('opacity-100');
      overlay?.classList.add('opacity-0');
      setTimeout(() => {
        overlay?.classList.add('hidden');
      }, 300);
      document.body.style.overflow = '';
    }
  };

  window.openDrawer = (id) => {
    if (lookbookData && lookbookData[id]) {
      const data = lookbookData[id];
      const imgEl = document.getElementById('drawer-main-image');
      const titleEl = document.getElementById('drawer-title');
      const descEl = document.getElementById('drawer-desc');
      const itemsEl = document.getElementById('drawer-items');

      if (imgEl) imgEl.src = data.image;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      
      if (itemsEl) {
        itemsEl.innerHTML = `
          <div class="mb-4">
            <h4 class="font-headline text-[var(--text-label-md)] uppercase tracking-widest text-primary border-b border-surface-variant pb-2 font-semibold mb-4">Select Color</h4>
            <div class="flex flex-wrap gap-2" id="drawer-color-swatches"></div>
          </div>
          <div id="drawer-color-gallery" class="w-full"></div>
        `;
        
        const swatchesContainer = document.getElementById('drawer-color-swatches');
        const galleryContainer = document.getElementById('drawer-color-gallery');
        const quoteBtn = document.getElementById('drawer-quote-btn');
        
        const getSwatchInfo = (colorName, title) => {
            let cleanName = colorName;
            const titleWords = title.toLowerCase().split(/[ \-]/);
            let words = colorName.toLowerCase().split(/[ \-]/);
            const stopWords = ['shirt','uniform','tunic','trouser','set','appron','apprrons','utlity','professional','work', 'waist', 'coat', 'reception', 'recption', 'recception', 'blazer', 'blazzer'];
            words = words.filter(w => !titleWords.includes(w) && !stopWords.includes(w));
            
            if (words.length > 0) {
                cleanName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            }
            
            // Ordered from most specific to least specific
            const cMap = {
                'navy blue': '#1e3a8a', 'navy': '#1e3a8a', 'dark green': '#14532d', 'forest green': '#064e3b',
                'green mint': '#6ee7b7', 'mint': '#6ee7b7', 'charcoal grey': '#374151', 'charcoal gray': '#374151',
                'charcoal': '#374151', 'light blue': '#93c5fd', 'light green': '#86efac', 'pale grey': '#e5e7eb',
                'deep burgundy': '#7a1921', 'burgundy': '#800020', 'maroon': '#800000', 'cream': '#fffdd0',
                'black': '#111111', 'white': '#ffffff', 'red': '#b91c1c', 'blue': '#2563eb',
                'green': '#15803d', 'grey': '#6b7280', 'gray': '#6b7280', 'lavender': '#c084fc',
                'pink': '#f472b6', 'yellow': '#facc15'
            };
            
            let hex = '#cccccc';
            const rawLower = colorName.toLowerCase();
            for (const [key, value] of Object.entries(cMap)) {
               if (rawLower.includes(key)) {
                  hex = value;
                  break;
               }
            }
            
            return { name: cleanName, hex };
        };

        window.selectDrawerColor = (colorName) => {
           const colorObj = data.colors.find(c => c.name === colorName);
           if (!colorObj) return;

           Array.from(swatchesContainer.children).forEach(btn => {
              if (btn.dataset.colorName === colorName) {
                 btn.classList.add('border-primary', 'bg-surface-variant');
                 btn.classList.remove('border-surface-variant', 'bg-surface');
              } else {
                 btn.classList.remove('border-primary', 'bg-surface-variant');
                 btn.classList.add('border-surface-variant', 'bg-surface');
              }
           });
           
           galleryContainer.innerHTML = '';
           if (colorObj.images.length > 0) {
               if (imgEl) imgEl.src = colorObj.images[0];
               
               if (colorObj.images.length > 1) {
                   let gridHtml = '<div class="grid grid-cols-2 gap-4">';
                   for (let i = 1; i < colorObj.images.length; i++) {
                       gridHtml += `
                         <div class="w-full aspect-[4/5] bg-surface rounded overflow-hidden">
                           <img src="${colorObj.images[i]}" alt="${colorObj.name}" class="w-full h-full object-cover" />
                         </div>`;
                   }
                   gridHtml += '</div>';
                   galleryContainer.innerHTML = gridHtml;
               }
           }

           if (quoteBtn) {
               const sInfo = getSwatchInfo(colorObj.name, data.title);
               quoteBtn.href = `/contact.html?product=${encodeURIComponent(data.title)}&color=${encodeURIComponent(colorObj.name)}`;
               quoteBtn.innerHTML = `Request Quote for ${sInfo.name} <span class="material-symbols-outlined text-[16px]">arrow_forward</span>`;
           }
        };

        data.colors.forEach((color) => {
           const swatch = getSwatchInfo(color.name, data.title);
           const btn = document.createElement('button');
           btn.className = "flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:bg-surface-variant border-surface-variant bg-surface";
           btn.dataset.colorName = color.name;
           
           btn.innerHTML = `<span class="w-4 h-4 rounded-full border border-black/10 shadow-inner" style="background-color: ${swatch.hex};"></span>
                            <span class="font-headline text-[var(--text-label-md)] uppercase tracking-widest font-semibold text-on-surface-variant group-hover:text-primary">${swatch.name}</span>`;
           
           btn.onclick = () => window.selectDrawerColor(color.name);
           swatchesContainer.appendChild(btn);
        });

        if (data.colors.length > 0) {
           window.selectDrawerColor(data.colors[0].name);
        }
      }
    }
    window.toggleDrawer();
  };
}

// ---- Scroll Reveal ----
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ---- Lookbook Filtering ----
function initLookbook() {
  const buttons = document.querySelectorAll('button[data-filter]');
  const cards = document.querySelectorAll('.lookbook-card');
  if (!buttons.length || !cards.length) return;

  const applyFilter = (filterVal) => {
    buttons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterVal) {
        btn.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('text-primary', 'border-b-2', 'border-primary', 'pb-1');
        btn.classList.add('text-on-surface-variant');
      }
    });

    cards.forEach(card => {
      if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.getAttribute('data-filter')));
  });

  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const catMap = {
      'f-b-kitchen': 'f-b-kitchen',
      'formal-shirt': 'formal-shirt',
      'front-office': 'front-office',
      'housing-keeping-uniform': 'housing-keeping-uniform',
      'steward-uniform': 'steward-uniform',
      'supervisor-uniform': 'supervisor-uniform',
    };
    if (catMap[hash]) {
      applyFilter(catMap[hash]);
      const grid = document.getElementById('lookbook-grid');
      if (grid) setTimeout(() => grid.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }
}

// ---- Form Validation & Success ----
function initForms() {
  document.querySelectorAll('form[data-rf-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic inline validation
      let valid = true;
      form.querySelectorAll('[required]').forEach((input) => {
        const wrapper = input.closest('.form-field') || input.parentElement;
        const errorEl = wrapper?.querySelector('.field-error');

        if (!input.value.trim()) {
          valid = false;
          input.classList.add('border-error');
          if (errorEl) errorEl.classList.remove('hidden');
        } else {
          input.classList.remove('border-error');
          if (errorEl) errorEl.classList.add('hidden');
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        valid = false;
        emailField.classList.add('border-error');
        const wrapper = emailField.closest('.form-field') || emailField.parentElement;
        const errorEl = wrapper?.querySelector('.field-error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address';
          errorEl.classList.remove('hidden');
        }
      }

      if (!valid) return;

      // Extract form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Add timestamp and page source
      data.submittedAt = new Date().toISOString();
      data.sourcePage = window.location.pathname;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
      }

      // Send to n8n webhook
      fetch('https://n8n.royalfituniform.com/webhook/royal-fit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'royalfit-rfu': 'fitvalueisprovided',
        },
        body: JSON.stringify(data),
      })
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
        }
        // Show success state
        const successEl = form.parentElement?.querySelector('.form-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.classList.add('visible');
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
        alert('There was an error submitting your inquiry. Please try again or call us directly.');
      });
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        input.classList.remove('border-error');
        const wrapper = input.closest('.form-field') || input.parentElement;
        const errorEl = wrapper?.querySelector('.field-error');
        if (errorEl) errorEl.classList.add('hidden');
      });
    });
  });
}

// ---- Smooth Scroll for Anchor Links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Header Scroll Effect ----
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ---- Active Header Navigation ----
function updateActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('header nav a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' && path === '/') {
      link.classList.add('text-secondary', 'border-b-2', 'border-secondary', 'pb-1');
      link.classList.remove('text-primary');
    } else if (href !== '/' && path.startsWith(href)) {
      link.classList.add('text-secondary', 'border-b-2', 'border-secondary', 'pb-1');
      link.classList.remove('text-primary');
    } else {
      link.classList.remove('text-secondary', 'border-b-2', 'border-secondary', 'pb-1');
      link.classList.add('text-primary');
    }
  });
}

let globalInitDone = false;

// ---- Initialize Everything ----
function initAll() {
  initDrawer();
  initReveal();
  initForms();
  initSmoothScroll();
  initLookbook();
  updateActiveNav();

  // FIXED: Only attach event listeners to persistent elements (header, mobile menu, window) once
  // to prevent stacking duplicate listeners on every Swup page transition
  if (!globalInitDone) {
    initMobileNav();
    initHeaderScroll();
    globalInitDone = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initAll();

  // Initialize Swup
  const swup = new Swup({
    plugins: [
      new SwupScriptsPlugin(),
      new SwupFadeTheme()
    ]
  });

  // Re-init components and fire GA4 on page change
  swup.hooks.on('content:replace', () => {
    initAll();
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title
      });
    }
  });
});
