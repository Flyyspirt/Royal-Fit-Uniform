# Royal Fit Uniform — Website

![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue)

## One-liner

The marketing website for [Royal Fit Uniform](https://royalfituniform.com) — a B2B hospitality uniform supplier based in Hyderabad — built as a multi-page static site with Vite, Tailwind CSS 4, and smooth page transitions via Swup.

## Why This Exists

Hotels, resorts, and enterprises need a single place to browse uniform solutions, view a lookbook of past work, and request a quote. This site replaces a previous web presence with a fast, SEO-optimized, mobile-first experience that loads in under 2 seconds and scores 90+ on Lighthouse across all categories.

The site is structured as a multi-page app (MPA) — each HTML page is a separate Rollup entry point — with client-side page transitions powered by [Swup](https://swup.js.org/) so navigation feels instant without the overhead of a full SPA framework.

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| [Node.js](https://nodejs.org/) | 18+ | `node -v` |
| npm | 9+ (ships with Node 18) | `npm -v` |

No global CLI tools required. Everything runs through `npx` and local `node_modules`.

## Installation

```bash
git clone https://github.com/Flyyspirt/Royal-Fit-Uniform.git
cd royal-fit-website
npm install
```

That's it. No environment variables needed for local development.

## Quickstart

Start the dev server:

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in your browser — you'll see the homepage with live hot-module reloading.

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Usage

### Project Structure

```
royal-fit-website/
├── index.html              # Homepage
├── about.html              # Our Story page
├── contact.html            # Contact / Request a Quote
├── lookbook.html           # Photo gallery of past work
├── product.html            # Individual product view
├── solutions.html          # Uniform solutions by segment
├── src/
│   ├── main.js             # App entry — Swup init, animations, UI logic
│   ├── style.css           # Design system (MD3 tokens + Tailwind theme)
│   ├── lookbookData.js     # Lookbook catalog data
│   └── assets/             # Images, icons, static assets
├── public/                 # Favicons, sitemap, manifest, robots.txt
├── vite.config.js          # Multi-page Rollup input config
├── vercel.json             # Deployment headers + clean URLs
├── postcss.config.js       # Tailwind CSS 4 via @tailwindcss/postcss
├── process_catalog.cjs     # Script: process product catalog images
└── update_lookbook.js      # Script: update lookbook data from source
```

### Pages

Each HTML file is a standalone page with its own `<head>` metadata, Open Graph tags, and structured data (JSON-LD). Vite treats each as a separate entry point via `vite.config.js`:

```javascript
// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lookbook: resolve(__dirname, 'lookbook.html'),
        product: resolve(__dirname, 'product.html'),
        contact: resolve(__dirname, 'contact.html'),
        about: resolve(__dirname, 'about.html'),
        solutions: resolve(__dirname, 'solutions.html'),
      },
    },
  },
});
```

### Styling

The site uses **Tailwind CSS 4** with the `@tailwindcss/postcss` plugin. The design system in `src/style.css` defines a Material Design 3 token palette:

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";

@theme {
  --color-primary: #041627;
  --color-surface: #faf9f5;
  --color-secondary-fixed-dim: #e9c176;
  /* ... full token set in src/style.css */
}
```

All utility classes use these tokens (e.g., `bg-surface`, `text-primary`, `text-secondary`). Add new tokens to the `@theme` block in `src/style.css`.

### Page Transitions

[Swup](https://swup.js.org/) handles client-side navigation between pages with a fade transition. The setup lives in `src/main.js`:

- `@swup/fade-theme` — crossfade between pages
- `@swup/scripts-plugin` — re-executes page-specific `<script>` tags after transitions

### Utility Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `process_catalog.cjs` | Processes product catalog images (resize, optimize via Sharp) | `node process_catalog.cjs` |
| `update_lookbook.js` | Regenerates `src/lookbookData.js` from source images | `node update_lookbook.js` |

## Configuration

### Deployment (Vercel)

The site deploys to Vercel. `vercel.json` configures:

- **Clean URLs** — `/about` serves `about.html` (no `.html` extension in the URL)
- **No trailing slashes**
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`
- **Asset caching** — `/assets/*` gets `Cache-Control: public, max-age=31536000, immutable`

### Google Analytics

GA4 is not yet configured. Each page has a `<!-- GA4: Add your measurement ID here once set up -->` comment in the `<head>`. When you have your GA4 measurement ID, replace the comment with the standard gtag.js snippet in all 6 HTML files.

### SEO

Each page includes:
- Unique `<title>` and `<meta name="description">`
- Canonical URL (`<link rel="canonical">`)
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`)
- JSON-LD structured data (`LocalBusiness` schema on the homepage)
- A `sitemap.xml` in `/public`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, branch naming, code standards, and the quality checklist.

## License

This project is licensed under the [MIT License](LICENSE).
