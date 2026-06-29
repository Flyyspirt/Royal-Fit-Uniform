import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { lookbookData } from './src/lookbookData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOOKBOOK_HTML = path.join(__dirname, 'lookbook.html');
const MAIN_JS = path.join(__dirname, 'src', 'main.js');
const INDEX_HTML = path.join(__dirname, 'index.html');

// 1. Generate Filter Buttons
const categories = new Set();
const catMap = {};
for (const key in lookbookData) {
  const item = lookbookData[key];
  categories.add(item.category);
  catMap[item.category] = item.categoryName;
}

let filterHTML = `        <button data-filter="all" class="font-headline text-[var(--text-label-md)] uppercase tracking-widest text-primary border-b-2 border-primary pb-1 whitespace-nowrap font-semibold">All Looks</button>\n`;
for (const cat of categories) {
  filterHTML += `        <button data-filter="${cat}" class="font-headline text-[var(--text-label-md)] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap font-semibold">${catMap[cat]}</button>\n`;
}

// 2. Generate Cards HTML
let cardsHTML = '';
let delay = 1;
for (const key in lookbookData) {
  const item = lookbookData[key];
  
  cardsHTML += `
        <!-- Look Card: ${item.title} -->
        <article class="lookbook-card reveal reveal-delay-${delay} group cursor-pointer flex flex-col gap-4" data-category="${item.category}" onclick="openDrawer('${key}')">
          <div class="relative aspect-[4/5] overflow-hidden bg-surface-container-low rounded-lg">
            <img src="${item.image}"
              alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div class="absolute bottom-4 right-4 w-8 h-8 bg-on-primary rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[20px]">add</span>
            </div>
          </div>
          <div>
            <h3 class="font-headline text-[var(--text-headline-md)] font-semibold text-primary mb-1">${item.title}</h3>
            <p class="font-body text-[var(--text-body-md)] text-on-surface-variant">${item.categoryName}</p>
            <button class="mt-4 font-headline text-[var(--text-label-md)] uppercase tracking-widest text-secondary hover:text-secondary-fixed-dim transition-colors flex items-center gap-2 font-semibold" onclick="openDrawer('${key}'); event.stopPropagation();">
              View Program Specs <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </article>
  `;
  delay = delay >= 4 ? 1 : delay + 1;
}

// Update lookbook.html
let lookbookHtml = fs.readFileSync(LOOKBOOK_HTML, 'utf8');

// Replace Filters
const filterRegex = /<div class="flex gap-8 overflow-x-auto hide-scrollbar pb-2">[\s\S]*?<\/div>\s*<\/section>\s*<!-- ========== LOOKBOOK GRID ========== -->/;
lookbookHtml = lookbookHtml.replace(filterRegex, `<div class="flex gap-8 overflow-x-auto hide-scrollbar pb-2">\n${filterHTML}\n      </div>\n    </section>\n\n    <!-- ========== LOOKBOOK GRID ========== -->`);

// Replace Grid
const gridRegex = /<div id="lookbook-grid"[^>]*>[\s\S]*?<\/div>\s*<\/section>\s*<!-- CTA Banner -->/;
lookbookHtml = lookbookHtml.replace(gridRegex, `<div id="lookbook-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gutter)]">\n${cardsHTML}\n      </div>\n    </section>\n\n    <!-- CTA Banner -->`);

fs.writeFileSync(LOOKBOOK_HTML, lookbookHtml);

// 3. Update main.js
let mainJs = fs.readFileSync(MAIN_JS, 'utf8');

// Inject the import if not there
if (!mainJs.includes("import { lookbookData }")) {
  mainJs = mainJs.replace("import SwupFadeTheme from '@swup/fade-theme';", "import SwupFadeTheme from '@swup/fade-theme';\nimport { lookbookData } from './lookbookData.js';");
}

// Also need to remove the hardcoded window.lookbookData script block from lookbook.html
lookbookHtml = fs.readFileSync(LOOKBOOK_HTML, 'utf8');
lookbookHtml = lookbookHtml.replace(/<script>\s*window\.lookbookData = \{[\s\S]*?<\/script>/, '');
fs.writeFileSync(LOOKBOOK_HTML, lookbookHtml);

// And update hash filtering mapping
let catMapStr = '{\n';
for (const cat of categories) {
  catMapStr += `      '${cat}': '${cat}',\n`;
}
catMapStr += '    }';
mainJs = mainJs.replace(/const catMap = \{[\s\S]*?\};/, `const catMap = ${catMapStr};`);

fs.writeFileSync(MAIN_JS, mainJs);

// 4. Update index.html Essential Pieces with first 4 products
const keys = Object.keys(lookbookData).slice(0, 4);
let indexCards = '';
delay = 1;
for (const key of keys) {
  const item = lookbookData[key];
  indexCards += `
        <!-- ${item.title} -->
        <a href="/lookbook.html#${item.category}" class="reveal reveal-delay-${delay} relative bg-surface p-4 group cursor-pointer block rounded-lg hover:shadow-lg transition-shadow duration-300">
          <img src="${item.image}"
            alt="${item.title}" class="w-full aspect-[3/4] object-cover mb-4 mix-blend-multiply rounded" loading="lazy" />
          <div class="text-left">
            <h4 class="font-body text-[var(--text-body-md)] font-semibold text-primary">${item.title}</h4>
            <p class="font-headline text-[var(--text-label-md)] text-on-surface-variant mt-1 uppercase tracking-widest">${item.categoryName}</p>
          </div>
          <div class="absolute bottom-4 right-4 w-8 h-8 bg-surface rounded-full flex items-center justify-center border border-outline shadow-sm hover:border-secondary transition-colors z-10">
            <span class="material-symbols-outlined text-sm text-primary">arrow_forward</span>
          </div>
        </a>
  `;
  delay++;
}

let indexHtml = fs.readFileSync(INDEX_HTML, 'utf8');
const indexGridRegex = /<div class="grid grid-cols-2 md:grid-cols-4 gap-4">[\s\S]*?<\/div>\s*<\/section>\s*<!-- ========== WHY ROYAL FIT/gi; 
// Better regex to match the grid under Essential Pieces:
const indexEssentialRegex = /<h2 class="reveal font-headline text-\[var\(--text-headline-lg\)\] font-bold text-primary mb-8 text-center tracking-tight">Essential Pieces<\/h2>\s*<div class="grid grid-cols-2 md:grid-cols-4 gap-4">[\s\S]*?<\/div>\s*<\/section>/;

indexHtml = indexHtml.replace(indexEssentialRegex, `<h2 class="reveal font-headline text-[var(--text-headline-lg)] font-bold text-primary mb-8 text-center tracking-tight">Essential Pieces</h2>\n      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">\n${indexCards}\n      </div>\n    </section>`);

fs.writeFileSync(INDEX_HTML, indexHtml);
