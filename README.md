# Royal Fit Uniform - B2B Website

![Royal Fit Uniform](public/favicon-96x96.png)

> India's Trusted B2B Uniform Partner for Hotels & Hospitals

A modern, conversion-optimized website for Royal Fit Uniform built with Next.js 14, Tailwind CSS, and TypeScript.

## 🌟 Features

### Core Features
- ✅ Responsive navigation with mega-menu
- ✅ Hero section with trust metrics & animations
- ✅ Service category pages (Hotel/Hospital)
- ✅ Product catalog with filtering
- ✅ Case studies with measurable results
- ✅ Testimonials carousel
- ✅ Trust badges & certifications
- ✅ 3-step multi-step quote form
- ✅ Airtable integration for lead management
- ✅ API endpoints for leads, orders, and analytics
- ✅ Mobile-first responsive design
- ✅ SEO optimized with metadata

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond + Source Sans 3
- **Database**: Airtable
- **Email**: SendGrid (planned)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vamshichintu002/royal-fit-website.git
cd royal-fit-website

# Install dependencies
npm install

# Set up Airtable integration (10 minutes)
# See QUICKSTART.md for detailed instructions
cp .env.example .env.local
# Edit .env.local with your Airtable credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 📚 Documentation
- **Quick Setup**: See [QUICKSTART.md](QUICKSTART.md) - Get Airtable connected in 10 minutes
- **Complete Guide**: See [AIRTABLE_SETUP.md](AIRTABLE_SETUP.md) - Full schema, automations, and advanced features
- **Project Context**: See [CLAUDE.md](CLAUDE.md) - Project overview and guidelines

## 📁 Project Structure

```
royal-fit-website/
├── app/
│   ├── api/                    # API routes
│   │   ├── quote/             # Quote submission (POST)
│   │   ├── leads/             # Lead management (GET, PATCH)
│   │   ├── orders/            # Order creation (POST)
│   │   └── analytics/         # Analytics (GET, POST)
│   ├── solutions/             # Solution pages
│   │   ├── hotel-uniforms/
│   │   └── hospital-uniforms/
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── Navigation.tsx         # Header & nav
│   ├── Hero.tsx              # Hero section
│   ├── ServiceCards.tsx      # Service showcase
│   ├── ProductCatalog.tsx    # Product grid
│   ├── CaseStudies.tsx       # Success stories
│   ├── Testimonials.tsx      # Client reviews
│   ├── TrustBadges.tsx       # Certifications
│   ├── RequestQuoteForm.tsx  # Quote form (connected to API)
│   └── Footer.tsx            # Footer
├── data/
│   ├── products.ts           # Product catalog
│   ├── case-studies.ts       # Case studies
│   └── testimonials.ts       # Testimonials
├── lib/
│   ├── airtable.ts           # Airtable integration (full CRUD)
│   ├── email.ts              # Email service
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utilities
├── airtable-templates/        # CSV import templates
│   └── products-import.csv
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── favicon.svg
│   └── ...
├── AIRTABLE_SETUP.md         # Complete Airtable guide
├── QUICKSTART.md             # 10-minute setup guide
├── CLAUDE.md                 # Project documentation
└── .env.example              # Environment template
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Airtable
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id

# SendGrid
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=royalfituniform@gmail.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site
NEXT_PUBLIC_SITE_URL=https://royalfituniform.com
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
3. Add environment variables
4. Deploy

### Manual Build
```bash
npm run build
npm start
```

## 📊 Integrations

- **Airtable**: Lead management, CRM, product catalog, order tracking ✅
- **SendGrid**: Transactional emails (planned)
- **Google Analytics**: Traffic analytics (configured)
- **Calendly**: Consultation booking (planned)
- **Intercom**: Live chat (planned)

## 🛣️ Roadmap

### Phase 1 ✅ (Completed)
- [x] Core website with all sections
- [x] Product catalog
- [x] Quote form
- [x] Case studies & testimonials
- [x] Airtable integration
- [x] API endpoints (leads, orders, analytics)

### Phase 2 (In Progress)
- [ ] Email notifications (SendGrid)
- [ ] Airtable automations
- [ ] Sales dashboard
- [ ] Live chat integration

### Phase 3 (Future)
- [ ] Customer portal
- [ ] Order tracking interface
- [ ] SmartFit AI sizing
- [ ] Blog section
- [ ] Multi-currency support

## 📄 License

Private - Royal Fit Uniform © 2025

## 👥 Contact

- **Website**: [royalfituniform.com](https://royalfituniform.com)
- **Email**: royalfituniform@gmail.com
- **Phone**: +91 93465 49694
