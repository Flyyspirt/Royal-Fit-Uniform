# CLAUDE.md - Royal Fit Uniform Website

This file provides context for Claude Code when working on this project.

## Project Overview

Royal Fit Uniform is a B2B uniform company serving hotels and hospitals across India. This website is built to:
1. Showcase uniform products for hospitality and healthcare sectors
2. Generate leads through a multi-step quote form
3. Build trust with case studies, testimonials, and certifications
4. Convert procurement managers into customers

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Airtable (for leads)
- **Email**: SendGrid

## Key Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Project Structure

```
app/
├── api/leads/route.ts    # Lead submission API
├── solutions/            # Sector landing pages
├── layout.tsx           # Root layout with SEO
└── page.tsx             # Home page

components/              # React components
data/                    # Static data (products, case studies)
lib/                     # Utilities (airtable, email, types)
public/                  # Static assets (favicons, images)
```

## Environment Variables Required

```env
AIRTABLE_API_KEY=        # Airtable Personal Access Token
AIRTABLE_BASE_ID=        # Airtable Base ID
SENDGRID_API_KEY=        # SendGrid API Key
SENDGRID_FROM_EMAIL=     # Verified sender email
NEXT_PUBLIC_GA_ID=       # Google Analytics 4 ID
NEXT_PUBLIC_SITE_URL=    # Production URL
```

## Design Tokens

### Colors
- Primary: `#227762` (Teal)
- Gold: `#d9a83f` (Accent)
- Charcoal: `#1a1a1a` (Text)

### Fonts
- Display: Cormorant Garamond
- Body: Source Sans 3

## Common Tasks

### Add a new product
Edit `data/products.ts` and add to the `products` array.

### Add a case study
Edit `data/case-studies.ts` with the new case study object.

### Modify the quote form
Edit `components/RequestQuoteForm.tsx` - it's a 3-step form.

### Add Airtable integration
1. Copy `lib/airtable.ts` if not present
2. Set environment variables
3. Call `submitLead()` from the form

### Add email notifications
1. Copy `lib/email.ts` if not present
2. Set SendGrid environment variables
3. Call email functions from API route

## Brand Guidelines

- Always use "Royal Fit Uniform" (singular, not "Uniforms")
- Logo colors: Teal (#4BA89C) and Dark Gray
- Professional, premium positioning
- Focus on B2B procurement managers as target audience

## Performance Targets

- LCP: < 2.5s
- INP: < 200ms
- CLS: < 0.1

## SEO Keywords

- Hotel uniforms India
- Hospital scrubs bulk
- B2B uniforms
- Hospitality workwear
- Healthcare uniforms

## Contact for Questions

- Website: royalfit.in
- Email: info@royalfit.in
