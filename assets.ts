// Centralized Asset Management
// These images match the "Engineering Confidence" visual identity of Royal Fit.

// HOW TO ADD YOUR OWN PHOTOS:
// 1. Create a folder named 'public' in your project root.
// 2. Create an 'images' folder inside 'public'.
// 3. Add your photos there (e.g., banquet-vest.jpg).
// 4. Update the URLs below to point to your local file (e.g., '/images/banquet-vest.jpg').

export const ASSETS = {
  HERO: {
    // Professional tailoring/texture close-up for the main hero
    HOME: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1600&auto=format&fit=crop', 
    // Example for custom image:
    // HOME: '/images/hero-bg.jpg', 
  },
  CATEGORY_HEROES: {
    // Team meeting for Corporate (Matches user image: Group in meeting)
    CORPORATE: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop',
    // Lab environment for Healthcare (Matches user image: Lab professionals)
    HEALTHCARE: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop',
    // Waitstaff/Service for Hospitality (Matches user image: Waiters)
    HOSPITALITY: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=1600&auto=format&fit=crop',
  },
  PRODUCTS: {
    // Hospitality
    // Updated to match "Banquet" context: Waitstaff serving (professional vest)
    // Local project images (replace placeholders with optimized JPG/PNG as needed)
    HOSP_VEST: 'public/images/banquet-staff-vest.jpg.png', 
    HOSP_CHEF: 'public/images/chef-executive-jacket.jpg.png', // Chef
    // Updated to match "Housekeeping" context: Staff making bed (placeholder used)
    HOSP_TUNIC: 'public/images/housekeeping-tunic.jpg.png', 

    // Healthcare
    HEALTH_SCRUBS: 'public/images/premium-scrub-set (1).png', // Scrubs/Mask
    HEALTH_LAB: 'public/images/lab-coat-professional.jpg.png', // Lab Coat

    // Corporate
    CORP_BLAZER: 'public/images/corporate-blazer.jpg.png', // Man in Blazer
    CORP_SHIRT: 'public/images/formal-office-shirt.jpg.png', // Woman w/ Headset (Matches user image)
  }
};
