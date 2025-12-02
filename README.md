# Royal Fit Uniform Website

The official B2B showcase website for Royal Fit Uniform, built with React, TypeScript, and Tailwind CSS.

## Overview

Royal Fit Uniform is a Hyderabad-based uniform consultancy transitioning from traditional manufacturing to a technology-driven "Expert Consultant" model. This website showcases their premium offerings in Hospitality, Healthcare, and Corporate sectors.

## Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Typography**: Playfair Display (Headings), Roboto (Body)
## Documentation

For comprehensive guides on project setup, image optimization, and development, visit the **[Documentation Index](./docs/README.md)**.

Key Resources:
- [Image Gallery Guide](./IMAGE_GALLERY_GUIDE.md) - Setup and usage of the gallery component
- [Photo Optimization Guide](./PHOTO_OPTIMIZATION_GUIDE.md) - Best practices for image optimization
- [Repository Cleanup Report](./REPOSITORY_CLEANUP_REPORT.md) - Project maintenance notes


## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/royalfituniform-website.git
    cd royalfituniform-website
    ```

2.  **Dependencies**:
    This project uses ES modules via CDN (AI Studio environment default). For a local Node.js environment, run:
    ```bash
    npm install react react-dom react-router-dom lucide-react
    ```

3.  **Run Locally**:
    *   **In AI Studio/StackBlitz**: The app runs automatically.
    *   **Local Machine**: Use Vite or Create React App to serve the `index.html`.

## Customization

### 1. Add Custom Images
To replace the placeholder images with your own:
1.  Create a folder: `public/images/`
2.  Add your files (e.g., `banquet-vest.jpg`).
3.  Update `assets.ts` to point to `/images/banquet-vest.jpg`.

### 2. Add Custom Favicon
To use your own logo in the browser tab:
1.  **Option A (Recommended)**: Save your logo as `favicon.ico` and place it in the `public/` folder.
2.  **Option B**: Save as `favicon.svg` and replace the existing file in `public/`.

## Deployment (Vercel)

This project is optimized for deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and sign up/log in.
3.  Click **"Add New Project"** and select your `royalfituniform-website` repo.
4.  Vercel will detect the framework settings. Click **Deploy**.
5.  Once deployed, go to **Settings > Domains** to add `royalfituniform.com`.

## Project Structure

- `index.html`: Entry point.
- `index.tsx`: React root rendering.
- `App.tsx`: Main application component and routing.
- `/pages`: Individual page components (Home, Categories, Story, Contact, etc.).
- `/components`: Reusable UI components (Layout, ProductCard).
- `assets.ts`: Centralized image URL management.
- `constants.ts`: Product data and navigation links.

## Color Palette

- **Royal Navy**: `#001f3f` (Primary)
- **Royal Gold**: `#d4af37` (Accent)
- **Royal White**: `#ffffff` (Backgrounds)

## License

© 2025 Royal Fit Uniform. All rights reserved.
