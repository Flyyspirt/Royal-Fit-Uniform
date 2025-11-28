# Gallery Setup & Integration Guide

Quick start guide to integrate the image gallery into your Royal Fit Uniforms website.

## ⚡ 5-Minute Setup

### Step 1: Add Route to App.tsx

Open your `App.tsx` and add the gallery route:

```tsx
import Gallery from './pages/Gallery';

// Inside your Routes component
<Route path="/gallery" element={<Gallery />} />
```

### Step 2: Add Navigation Link

Update your navigation component to include gallery link:

```tsx
<nav>
  <Link to="/">Home</Link>
  <Link to="/gallery">Gallery</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

### Step 3: Test Locally

```bash
npm install
npm run dev
# Visit http://localhost:5173/gallery
```

### Step 4: Deploy to Vercel

```bash
git add .
git commit -m "feat: Integrate image gallery to website"
git push
# Vercel auto-deploys from main branch
```

---

## 📁 File Locations

| File | Purpose | Location |
|------|---------|----------|
| Gallery Page | Main gallery page | `pages/Gallery.tsx` |
| Gallery Component | Reusable component | `components/ImageGallery.tsx` |
| Metadata | Image data & settings | `image-gallery-metadata.json` |
| Images | Product photos | `public/images/` |

---

## 🖼️ Current Images

Your gallery contains 7 images across 4 categories:

```
├─ Hospitality & Banquet (2 images)
│  ├─ banquet-staff-vest.jpg.png
│  └─ housekeeping-tunic.jpg.png
├─ Healthcare & Medical (2 images)
│  ├─ premium-scrub-set.png
│  └─ lab-coat-professional.jpg.png
├─ Culinary & Chef (1 image)
│  └─ chef-executive-jacket.jpg.png
└─ Corporate & Executive (2 images)
   ├─ corporate-blazer.jpg.png
   └─ formal-office-shirt.jpg.png
```

---

## 🎨 Gallery Features

✅ **Dynamic Filtering**
- "All Collections" button shows all images
- Category buttons filter by industry
- Buttons highlight when selected

✅ **Responsive Design**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

✅ **Interactive Elements**
- Hover scale animation on images
- Featured badge for promoted items
- Smooth transitions

✅ **Accessibility**
- Alt text on all images
- Semantic HTML structure
- Keyboard navigable

---

## ➕ Adding New Images

### Quick Process:

1. **Upload Image**
   ```
   Go to /public/images > Add file > Upload
   ```

2. **Update Metadata**
   ```json
   Edit image-gallery-metadata.json:
   {
     "id": "unique-id",
     "filename": "image-name.jpg",
     "title": "Product Title",
     "description": "Description",
     "alt": "Alt text",
     "path": "/images/image-name.jpg",
     "category": "Category Name",
     "featured": false
   }
   ```

3. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: Add new gallery image"
   git push
   ```

---

## 🔧 Customization

### Change Grid Columns

Edit `components/ImageGallery.tsx`:

```tsx
// Change from:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// To:
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
```

### Modify Colors

Edit Tailwind classes in `ImageGallery.tsx` and `Gallery.tsx`:

```tsx
// Change primary color from blue-900 to your brand color
className="bg-blue-900 text-white"  // Current
className="bg-purple-900 text-white" // Custom
```

### Update Hero Statistics

Edit `pages/Gallery.tsx` hero section:

```tsx
<div className="text-3xl font-bold">50+</div>
<p className="text-blue-100">Uniform Styles</p>
```

---

## 📊 Gallery Metadata Structure

```json
{
  "version": "1.0.0",
  "description": "Gallery metadata",
  "lastUpdated": "2025-11-28",
  "galleries": [
    {
      "id": "category-id",
      "name": "Category Name",
      "description": "Category description",
      "images": [
        {
          "id": "image-id",
          "filename": "image.jpg",
          "title": "Image Title",
          "description": "Description",
          "alt": "Alt text for accessibility",
          "path": "/images/image.jpg",
          "category": "Tag/Category",
          "featured": true
        }
      ]
    }
  ]
}
```

---

## 🚀 Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: Add gallery to website"
   git push
   ```

2. **Vercel Auto-Deploy**
   - Vercel automatically builds and deploys
   - Check deployment at dashboard.vercel.com

3. **Verify Live**
   - Visit https://royalfituniform.com/gallery
   - Test on mobile and desktop
   - Verify images load correctly

---

## ✅ Verification Checklist

Before going live:

- [ ] Gallery route added to App.tsx
- [ ] Navigation link added
- [ ] Local testing works (npm run dev)
- [ ] All images display correctly
- [ ] Filtering works (all 4 categories)
- [ ] Responsive on mobile
- [ ] Alt text present on all images
- [ ] Deployed to Vercel
- [ ] Live URL accessible
- [ ] SEO metadata in place

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not showing | Check image path in metadata matches actual file path |
| Filtering not working | Verify JSON syntax in image-gallery-metadata.json |
| Styles not applying | Ensure Tailwind CSS is properly configured |
| 404 on gallery page | Verify route added to App.tsx and component imported |
| Slow loading | Optimize image file sizes (< 500 KB recommended) |

---

## 📚 Documentation Files

- **IMAGE_GALLERY_GUIDE.md** - Comprehensive guide with all details
- **GALLERY_SETUP.md** - This quick setup guide
- **README.md** - Main project documentation

---

## 🎯 Next Steps

1. ✅ Integrate gallery route in App.tsx
2. ✅ Add navigation link
3. ✅ Test locally
4. ✅ Deploy to Vercel
5. ✅ Share gallery URL with team/clients
6. ✅ Monitor analytics
7. ✅ Add more images as needed

---

**Status**: Ready for Production  
**Last Updated**: November 28, 2025  
**Deployed**: https://royalfituniform.com/gallery
