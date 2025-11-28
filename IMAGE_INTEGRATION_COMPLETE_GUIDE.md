# Royal Fit Uniform - Complete Image Integration Guide

## Image Organization & Naming Convention

All images have been uploaded to `/public/images/`. This guide shows how to properly organize, rename, and integrate them.

### Current Image Inventory

#### HOSPITALITY SECTOR
- `banquet-staff-vest.jpg.png` → **Rename to:** `hospitality-banquet-vest-hero.jpg`
- `banquet-staff-vest.svg` → **Keep as:** `hospitality-banquet-vest-placeholder.svg`
- `banquet-team.svg` → **Rename to:** `hospitality-banquet-team-deployment.svg`
- `chef-executive-jacket.jpg.png` → **Rename to:** `hospitality-chef-jacket-hero.jpg`
- `chef-uniform.svg` → **Rename to:** `hospitality-chef-uniform-placeholder.svg`
- `housekeeping-tunic.jpg.png` → **Rename to:** `hospitality-housekeeping-tunic-hero.jpg`

#### HEALTHCARE SECTOR
- `premium-scrub-set (1).png` → **Rename to:** `healthcare-scrub-set-hero.jpg`
- `lab-coat-professional.jpg.png` → **Rename to:** `healthcare-lab-coat-hero.jpg`

#### CORPORATE SECTOR
- `corporate-blazer.jpg.png` → **Rename to:** `corporate-blazer-hero.jpg`
- `formal-office-shirt.jpg.png` → **Rename to:** `corporate-formal-shirt-hero.jpg`

#### GENERIC/SUPPORT IMAGES
- `front-desk-uniform.svg` → **Keep as:** `front-desk-uniform-placeholder.svg`

---

## Updated assets.ts Configuration

Replace your current `assets.ts` with:

```typescript
// Centralized Asset Management
// Images organized by category and purpose

export const ASSETS = {
  HERO: {
    HOSPITALITY_HERO: '/images/hospitality-banquet-vest-hero.jpg',
    HEALTHCARE_HERO: '/images/healthcare-scrub-set-hero.jpg',
    CORPORATE_HERO: '/images/corporate-blazer-hero.jpg',
  },
  CATEGORY_HEROES: {
    // Hospitality
    HOSPITALITY_BANQUET: '/images/hospitality-banquet-vest-hero.jpg',
    HOSPITALITY_CHEF: '/images/hospitality-chef-jacket-hero.jpg',
    HOSPITALITY_HOUSEKEEPING: '/images/hospitality-housekeeping-tunic-hero.jpg',
    // Healthcare
    HEALTHCARE_SCRUBS: '/images/healthcare-scrub-set-hero.jpg',
    HEALTHCARE_LAB: '/images/healthcare-lab-coat-hero.jpg',
    // Corporate
    CORPORATE_BLAZER: '/images/corporate-blazer-hero.jpg',
    CORPORATE_SHIRT: '/images/corporate-formal-shirt-hero.jpg',
  },
  PRODUCTS: {
    // Hospitality
    HOSP_VEST: '/images/hospitality-banquet-vest-hero.jpg',
    HOSP_CHEF: '/images/hospitality-chef-jacket-hero.jpg',
    HOSP_TUNIC: '/images/hospitality-housekeeping-tunic-hero.jpg',
    // Healthcare
    HEALTH_SCRUBS: '/images/healthcare-scrub-set-hero.jpg',
    HEALTH_LAB: '/images/healthcare-lab-coat-hero.jpg',
    // Corporate
    CORP_BLAZER: '/images/corporate-blazer-hero.jpg',
    CORP_SHIRT: '/images/corporate-formal-shirt-hero.jpg',
  },
  PLACEHOLDERS: {
    BANQUET_VEST: '/images/hospitality-banquet-vest-placeholder.svg',
    CHEF_UNIFORM: '/images/hospitality-chef-uniform-placeholder.svg',
    FRONT_DESK: '/images/front-desk-uniform-placeholder.svg',
    TEAM_DEPLOYMENT: '/images/hospitality-banquet-team-deployment.svg',
  },
};
```

---

## Image Display Strategy for CategoryPage

### Gallery Section Layout

```
Product Gallery Section:
├── Hero Image (Large)
│   └── High-res product image
├── Image Grid (4-6 thumbnails)
│   ├── Front view
│   ├── Side view
│   ├── Detail/Fabric close-up
│   ├── Size chart or customization
│   └── Bulk deployment photo
└── Image Viewer/Lightbox
    └── Full-screen image viewing
```

### Implementation in CategoryPage

Add to your CategoryPage component:

```typescript
import { useState } from 'react';
import { ASSETS } from '../assets';

interface ImageGalleryProps {
  productId: string;
  category: 'Hospitality' | 'Healthcare' | 'Corporate';
  images: {
    hero: string;
    views: string[];
    details: string[];
  };
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  productId,
  category,
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(images.hero);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="product-gallery-section">
      {/* Hero Image */}
      <div className="hero-image-wrapper">
        <img
          src={selectedImage}
          alt={`${productId} product view`}
          className="hero-image"
          onClick={() => setIsLightboxOpen(true)}
        />
        <div className="image-zoom-indicator">Click to expand</div>
      </div>

      {/* Thumbnail Grid */}
      <div className="thumbnail-grid">
        {[images.hero, ...images.views, ...images.details].map(
          (image, idx) => (
            <button
              key={idx}
              className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`View ${idx + 1}`} />
            </button>
          )
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
          <img src={selectedImage} alt="Full size" />
        </div>
      )}
    </div>
  );
};
```

---

## CSS Styles for Image Display

Add to your Tailwind CSS or styles:

```css
/* Product Gallery */
.product-gallery-section {
  @apply space-y-6 my-8;
}

.hero-image-wrapper {
  @apply relative w-full bg-gray-100 rounded-lg overflow-hidden;
  aspect-ratio: 4 / 3;
}

.hero-image {
  @apply w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300;
}

.image-zoom-indicator {
  @apply absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded;
}

/* Thumbnail Grid */
.thumbnail-grid {
  @apply grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8;
}

.thumbnail {
  @apply relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-gold transition-all;
  aspect-ratio: 1;
}

.thumbnail img {
  @apply w-full h-full object-cover;
}

.thumbnail.active {
  @apply border-gold shadow-lg;
}

/* Lightbox */
.lightbox {
  @apply fixed inset-0 z-50 bg-black/90 flex items-center justify-center;
}

.lightbox img {
  @apply max-w-4xl max-h-screen object-contain;
}
```

---

## File Renaming Steps

To rename files in GitHub:

1. Navigate to each image file in `/public/images/`
2. Click the file name to open it
3. Click the "..." menu (More file actions)
4. Select "Edit file"
5. At the top, change the filename
6. Scroll to bottom and commit with message: `refactor: organize and rename images by category`

**Or use Git CLI:**
```bash
git mv public/images/banquet-staff-vest.jpg.png public/images/hospitality-banquet-vest-hero.jpg
git commit -m "refactor: reorganize and rename product images by category"
git push origin main
```

---

## Product Image Configuration Example

Update your `constants.ts` product definitions:

```typescript
export const HOSPITALITY_PRODUCTS = [
  {
    id: 'banquet-vest',
    name: 'Banquet Staff Vest',
    category: 'Hospitality',
    images: {
      hero: '/images/hospitality-banquet-vest-hero.jpg',
      views: [
        '/images/hospitality-banquet-vest-hero.jpg',
        // Add additional view images here
      ],
      details: [
        // Fabric close-ups, size charts, customization mocks
      ],
      bulkDeployment: '/images/hospitality-banquet-team-deployment.svg',
    },
    price: { min: 800, max: 1200 },
    features: ['Stain Resistant', 'Adjustable Back', 'Premium Poly-Viscose'],
    moq: 50,
    leadTime: '10-15 days',
  },
  // ... more products
];
```

---

## Integration Checklist

- [ ] Rename all image files per naming convention
- [ ] Update `assets.ts` with new file paths
- [ ] Update `constants.ts` product image references
- [ ] Create `ImageGallery` component
- [ ] Add gallery styles to Tailwind
- [ ] Test images display in dev server
- [ ] Optimize image sizes (compress JPGs, reduce PNG size)
- [ ] Add lazy loading for performance
- [ ] Test on mobile and desktop
- [ ] Deploy to Vercel
- [ ] Verify images load correctly in production

---

## Next Steps

1. **Rename Files**: Use the GitHub UI or Git CLI to rename images per convention
2. **Update Code**: Replace asset paths in `assets.ts` and `constants.ts`
3. **Test Locally**: Run `npm run dev` and verify images display
4. **Performance**: Compress images and implement lazy loading
5. **Deploy**: Push to GitHub and verify Vercel deployment

**Need Help?** Refer to `IMAGE_GALLERY_GUIDE.md` for additional gallery features.
