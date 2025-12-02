# Photo Optimization Guide for Royal Fit Uniforms Website

## Overview
This guide covers best practices for optimizing product photos and images for your royal-fit-uniform.vercel.app website. Proper image optimization improves page load speed, SEO ranking, and user experience across devices.

---

## Recommended Image Dimensions & Formats

### For Vercel Deployment (public/ folder)

| Use Case | Dimensions | Format | Max Size | Quality |
|----------|-----------|--------|----------|---------|
| Hero Banner | 1280×720 | WebP | ~150KB | High |
| Product Thumbnail | 400×400 | WebP | ~50KB | High |
| Gallery Images | 800×600 | WebP | ~100KB | High |
| Product Details | 1024×768 | WebP | ~120KB | High |
| Mobile Hero | 640×360 | WebP | ~80KB | Medium-High |

### Favicon/Icons (Already Done ✓)
- favicon.svg (32×32+ viewBox, scalable)
- apple-touch-icon.svg (180×180)
- android-chrome-192x192.svg (192×192)

---

## Step-by-Step Image Optimization Process

### 1. **Capture/Source High-Quality Images**
- Use minimum 2000×1200px source images for hero banners
- Use minimum 1000×1000px for product photos
- Ensure well-lit, professional photography
- Use consistent white or neutral background for product shots

### 2. **Resize Using Free Online Tools**

#### Option A: Image Resizer (Simple)
- Go to: https://imageresizer.com
- Upload your image
- Set dimensions (e.g., 1280×720)
- Download resized image

#### Option B: Bulk Image Resizer
- https://www.birme.net (Multi-image resize)
- Upload 10+ images at once
- Set dimensions and format
- Batch download

### 3. **Convert to WebP Format (Lightweight & Modern)**

**Best Free Tools:**
1. **CloudConvert** (https://cloudconvert.com/webp)
   - Upload JPG/PNG → select WebP output
   - Quality: 75-85 (good balance)
   - Download

2. **Online-Convert** (https://image.online-convert.com/convert-to-webp)
   - Simple interface
   - Set quality slider to 75-85

3. **XnConvert** (Free software - download)
   - Batch convert 100+ images
   - Supports all formats
   - Best for bulk operations

### 4. **Compress & Optimize**

**TinyPNG/TinyJPG** (Recommended)
- Go to: https://tinypng.com
- Drag & drop WebP files
- Auto-compression (20-50% smaller)
- Download optimized versions

**Alternatively:**
- https://squoosh.app (Google's tool - excellent)
- Drag images, adjust quality slider
- Real-time preview

---

## Recommended Setup for Royal Fit Uniforms

### Directory Structure in `/public/`
```
public/
├── favicon.svg
├── apple-touch-icon.svg
├── android-chrome-192x192.svg
├── images/
│   ├── hero-hospitality.webp      (1280×720, ~140KB)
│   ├── chef-coat-product.webp     (800×800, ~80KB)
│   ├── hotel-staff-uniform.webp   (800×600, ~75KB)
│   ├── thumbs/
│   │   ├── chef-coat-thumb.webp   (400×400, ~45KB)
│   │   ├── bartender-thumb.webp   (400×400, ~45KB)
│   │   └── housekeeping-thumb.webp(400×400, ~45KB)
│   └── gallery/
│       ├── product-1.webp         (1024×768, ~110KB)
│       └── product-2.webp         (1024×768, ~110KB)
```

---

## Implementation in HTML

### Update your index.html:
```html
<!-- Hero Image -->
<img 
  src="/images/hero-hospitality.webp" 
  alt="Royal Fit Uniforms - Premium Hospitality Uniform Collection" 
  loading="lazy" 
  decoding="async"
  width="1280" 
  height="720"
/>

<!-- Product Thumbnail with Picture Element (Best Practice) -->
<picture>
  <source srcset="/images/thumbs/chef-coat-thumb.webp" type="image/webp">
  <img 
    src="/images/thumbs/chef-coat-thumb.jpg" 
    alt="Chef Coat Uniform" 
    loading="lazy"
    width="400" 
    height="400"
  />
</picture>

<!-- Mobile Responsive -->
<picture>
  <source media="(max-width: 768px)" srcset="/images/hero-mobile.webp">
  <source media="(min-width: 769px)" srcset="/images/hero-hospitality.webp">
  <img src="/images/hero-hospitality.webp" alt="Hero Banner" />
</picture>
```

---

## Free Tools Summary

### Image Editing & Resize
- **Canva** (https://canva.com) - Design + resize (Free tier)
- **GIMP** (Free software) - Professional resizing
- **Paint.NET** (Free software, Windows)

### Format Conversion
- **CloudConvert** - WebP, AVIF, formats
- **Squoosh** - Google's web-based tool
- **XnConvert** - Batch processing

### Compression
- **TinyPNG/TinyJPG** - Best compression
- **Compressor.io** - Multiple formats
- **ImageOptimizer** - Desktop tool

---

## Performance Optimization Checklist

- [ ] All images in WebP format for modern browsers
- [ ] JPG fallbacks for older browsers
- [ ] Image dimensions set in HTML (prevents layout shift)
- [ ] `loading="lazy"` for below-the-fold images
- [ ] Alt text for SEO and accessibility
- [ ] Images named descriptively (e.g., `chef-coat-product.webp`)
- [ ] Hero image < 150KB
- [ ] Thumbnail < 50KB each
- [ ] Gallery images 75-110KB range

---

## Upload to Vercel

### Via GitHub (Recommended)
1. Add optimized images to `/public/images/` folder
2. Commit and push to GitHub
3. Vercel automatically deploys (~1 minute)

### Direct Vercel Upload (Advanced)
1. Connect GitHub repo → Automatic deployments
2. Use Vercel CLI for direct file upload:
```bash
vercel env pull    # Pull environment
vercel --prod      # Deploy to production
```

---

## Performance Testing

### Test Your Images
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://webpagetest.org

Upload your site URL → Check image optimization recommendations

---

## Size Reduction Example

**Before Optimization:**
- JPG Product Photo: 2.5MB (3000×3000px)

**After Optimization:**
- Step 1 (Resize to 800×800): 450KB JPG
- Step 2 (Convert to WebP): 150KB WebP  
- Step 3 (Compress with TinyPNG): 85KB WebP ✓

**Result: ~97% size reduction with no visible quality loss!**

---

## Questions or Issues?

- **Vercel Deployment**: Check https://vercel.com/docs/concepts/deployments/overview
- **Image Format Support**: Most modern browsers support WebP (>95% coverage)
- **Cache Busting**: If images don't update, hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

Last Updated: December 2, 2025
