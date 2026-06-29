# Contributing to Royal Fit Uniform Website

Thanks for your interest in contributing. This guide covers how to set up the project locally and submit changes.

## Getting Started

```bash
git clone https://github.com/Flyyspirt/Royal-Fit-Uniform.git
cd royal-fit-website
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` with hot-module reloading.

## Branch Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make changes** and test locally
3. **Build before pushing** to catch errors:
   ```bash
   npm run build
   ```
4. **Push and open a Pull Request** against `main`

## Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/short-description` | `feature/add-spa-uniform-page` |
| Bug fix | `fix/short-description` | `fix/mobile-nav-overlap` |
| Content update | `content/short-description` | `content/update-lookbook-images` |

## Code Standards

- **HTML**: Each page has its own `<head>` with unique title, meta description, OG tags, and canonical URL
- **CSS**: Use Tailwind utility classes with the design tokens from `src/style.css`. Don't add inline styles
- **JavaScript**: Keep page-specific logic in the HTML page's inline `<script>` blocks. Shared logic goes in `src/main.js`
- **Images**: Use `.webp` format. Run `node process_catalog.cjs` for catalog images

## Quality Checklist

Before opening a PR, verify:

- [ ] `npm run build` completes without errors
- [ ] All pages render correctly at mobile (375px), tablet (768px), and desktop (1440px)
- [ ] Lighthouse scores 90+ on Performance, Accessibility, Best Practices, and SEO
- [ ] No broken links or missing images
- [ ] Page transitions via Swup work on all navigation paths

## Reporting Issues

Open an issue on GitHub with:
- **What you expected** vs. **what happened**
- **Browser and device** (e.g., Chrome 120 on iPhone 15)
- **Screenshots** if it's a visual bug

## Questions?

Open a GitHub issue or reach out to the project maintainer.
