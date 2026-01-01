# Royal Fit Uniform - B2B Website

![Royal Fit Uniform](public/favicon-96x96.png)

> Your B2B Uniform Partner for Hotels & Hospitals

A modern, conversion-optimized website for Royal Fit Uniform built with Next.js 14, Tailwind CSS, and TypeScript.

## 🌟 Features

### Core Features
- ✅ Responsive navigation with mega-menu
- ✅ Hero section with animations
- ✅ Service category pages (Hotel/Hospital)
- ✅ Product catalog with filtering
- ✅ Case studies with measurable results
- ✅ Testimonials carousel
- ✅ Trust badges
- ✅ Multi-step quote form
- ✅ Mobile-first responsive design
- ✅ SEO optimized with metadata

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond + Source Sans 3

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
royal-fit-website/
├── app/
│   ├── api/                 # API routes
│   │   └── quote/          # Quote submission endpoint
│   ├── solutions/          # Solution pages
│   │   ├── hotel-uniforms/
│   │   └── hospital-uniforms/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── Navigation.tsx      # Header & nav
│   ├── Hero.tsx           # Hero section
│   ├── ServiceCards.tsx   # Service showcase
│   ├── ProductCatalog.tsx # Product grid
│   ├── CaseStudies.tsx    # Success stories
│   ├── Testimonials.tsx   # Client reviews
│   ├── TrustBadges.tsx    # Trust features
│   ├── RequestQuoteForm.tsx # Quote form
│   └── Footer.tsx         # Footer
├── data/
│   ├── products.ts        # Product catalog
│   ├── case-studies.ts    # Case studies
│   └── testimonials.ts    # Testimonials
├── lib/
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utilities
├── public/                # Static assets
└── .env.example          # Environment template
```

## 🎨 Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Teal) | `#227762` | Main brand |
| Gold | `#d9a83f` | Accents, CTAs |
| Charcoal | `#1a1a1a` | Text |

### Typography
- **Display**: Cormorant Garamond (headings)
- **Body**: Source Sans 3 (content)

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with all sections |
| `/solutions/hotel-uniforms` | Hotel uniforms landing |
| `/solutions/hospital-uniforms` | Hospital uniforms landing |

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Deploy

### Manual Build
```bash
npm run build
npm start
```

## 📄 License

Private - Royal Fit Uniform © 2025

## 👥 Contact

- **Website**: [royalfituniform.com](https://royalfituniform.com)
- **Email**: royalfituniform@gmail.com
- **Phone**: +91 93465 49694
