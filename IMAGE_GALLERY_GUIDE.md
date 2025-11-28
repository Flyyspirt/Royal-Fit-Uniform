# Image Gallery Guide - Royal Fit Uniforms

Complete documentation for managing and displaying image galleries on your Royal Fit Uniforms website.

## Overview

The image gallery system is built with:
- **Centralized Metadata**: `image-gallery-metadata.json` stores all image information
- **Reusable Component**: `ImageGallery.tsx` component with filtering capabilities
- **Dedicated Gallery Page**: `Gallery.tsx` page with hero section and CTAs
- **Organized Structure**: Images organized in `/public/images` with category support

---

## Repository Structure

```
Royal-Fit-Uniform/
├── public/
│   └── images/
│       ├── banquet-staff-vest.jpg.png
│       ├── housekeeping-tunic.jpg.png
│       ├── premium-scrub-set.png
│       ├── lab-coat-professional.jpg.png
│       ├── chef-executive-jacket.jpg.png
│       ├── corporate-blazer.jpg.png
│       ├── formal-office-shirt.jpg.png
├── components/
│   ├── ImageGallery.tsx
│   └── Layout.tsx
├── pages/
│   ├── Gallery.tsx
├── image-gallery-metadata.json
└── README.md
```

---

## Key Components

### 1. ImageGallery.tsx Component
Reusable gallery component with:
- Category filtering
- Responsive grid layout (1/2/3 columns)
- Hover animations
- Featured badge support
- Error handling

### 2. Gallery.tsx Page
Full gallery page featuring:
- Hero section with statistics
- ImageGallery component
- Value proposition cards
- Call-to-action buttons

### 3. image-gallery-metadata.json
Centralized metadata organizing images into 4 categories:
- Hospitality & Banquet
- Healthcare & Medical
- Culinary & Chef
- Corporate & Executive

---

## Adding New Images

### Step 1: Upload Image
1. Go to `/public/images` in GitHub
2. Click "Add file" > "Upload files"
3. Select or drag your image
4. Commit: `feat: Add [image name]`

### Step 2: Update Metadata
Edit `image-gallery-metadata.json` and add:

```json
{
  "id": "my-product-id",
  "filename": "my-image.jpg",
  "title": "Product Title",
  "description": "Detailed description",
  "alt": "Alt text for accessibility",
  "path": "/images/my-image.jpg",
  "category": "Product Category",
  "featured": false
}
```

### Step 3: Commit
```
feat: Update gallery with new [product] image
```

---

## Image Requirements

| Requirement | Specification |
|-------------|---------------|
| Format | JPG, PNG, WebP |
| File Size | < 500 KB recommended |
| Dimensions | Minimum 800x600px |
| Aspect Ratio | 3:2 or 4:3 recommended |
| Quality | High-resolution product photos |

---

## SEO Best Practices

✓ **Filename**: Use descriptive names
- Good: `banquet-staff-vest-navy-gold.jpg`
- Bad: `IMG_1234.jpg`

✓ **Alt Text**: Include keywords
- Good: "Professional navy banquet vest with gold trim"
- Bad: "image"

✓ **Title & Description**: Use relevant keywords targeting B2B uniforms search

---

## Integration into App.tsx

Add the gallery route:

```tsx
import Gallery from './pages/Gallery';

<Route path="/gallery" element={<Gallery />} />
```

Add navigation link:

```tsx
<Link to="/gallery">Gallery</Link>
```

---

## Current Gallery Structure

### Hospitality & Banquet
- Banquet Staff Vest
- Housekeeping Tunic

### Healthcare & Medical  
- Premium Scrub Set
- Professional Lab Coat

### Culinary & Chef
- Executive Chef Jacket

### Corporate & Executive
- Corporate Blazer
- Formal Office Shirt

---

## Troubleshooting

### Images Not Displaying
- Check image path matches actual file
- Verify file exists in `/public/images`
- Check browser console for 404 errors
- Verify filename casing (case-sensitive on Linux)

### Metadata Errors
- Validate JSON at https://jsonlint.com
- Check for missing commas
- Ensure all quotes are closed
- Verify all required fields present

---

## Best Practices

✅ DO:
- Use descriptive, keyword-rich titles
- Include high-quality product photos
- Optimize image file sizes
- Update metadata when adding/removing images
- Test on mobile devices
- Include alt text for accessibility

❌ DON'T:
- Use placeholder images in production
- Upload unoptimized large images
- Forget to commit metadata changes
- Leave alt text empty

---

## Future Enhancements
- [ ] Image lazy loading
- [ ] Lightbox/modal viewer
- [ ] Image zoom functionality
- [ ] Before/after slider
- [ ] Related products section
- [ ] Gallery analytics tracking

---

**Last Updated**: November 28, 2025  
**Status**: Active and Ready for Production
