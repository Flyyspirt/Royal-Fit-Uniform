import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { PRODUCTS } from '../constants';
import { ASSETS } from '../assets';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
  category: Category;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const products = PRODUCTS.filter((p) => p.category === category);

  const getCategoryDescription = (cat: Category) => {
    switch (cat) {
      case 'Hospitality':
        return 'Elevate your guest experience with sophisticated, durable uniforms designed for hotels, restaurants, and resorts.';
      case 'Healthcare':
        return 'Professional medical attire blending antimicrobial technology with all-day comfort for doctors, nurses, and staff.';
      case 'Corporate':
        return 'Sharp, brand-aligned corporate wear that instills pride and professionalism in your workforce.';
      default:
        return '';
    }
  };

  const getHeroImage = (cat: Category) => {
    switch (cat) {
      case 'Hospitality': return ASSETS.CATEGORY_HEROES.HOSPITALITY;
      case 'Healthcare': return ASSETS.CATEGORY_HEROES.HEALTHCARE;
      case 'Corporate': return ASSETS.CATEGORY_HEROES.CORPORATE;
      default: return '';
    }
  };

  // Generate JSON-LD Structured Data for Products
  const structuredData = products.map((product) => {
    // robustly parse price strings like "₹800 - ₹1,200" or "₹500"
    // Remove commas first to handle formatting like 1,200
    const normalizedPriceString = product.priceRange.replace(/,/g, '');
    const priceNumbers = normalizedPriceString.match(/\d+/g);
    
    let lowPrice = '';
    let highPrice = '';

    if (priceNumbers && priceNumbers.length > 0) {
      lowPrice = priceNumbers[0];
      // If there is a second number, use it as high price. 
      // If not, high price is same as low price (single price point).
      highPrice = priceNumbers.length > 1 ? priceNumbers[1] : lowPrice;
    }

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": product.imageUrl,
      "description": product.description,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": "Royal Fit Uniform"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": lowPrice,
        "highPrice": highPrice,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
  });

  return (
    <div>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />

      {/* Category Hero */}
      <div className="relative bg-royal-navy py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={getHeroImage(category)}
            alt={`${category} professional environment`}
            className="w-full h-full object-cover opacity-40"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-royal-navy via-royal-navy/50 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 shadow-sm">{category} Uniforms</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light drop-shadow-md">{getCategoryDescription(category)}</p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-gray-400">No products found in this category yet.</h3>
            <p className="mt-4 text-gray-500">Check back soon or contact us for custom orders.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-royal-gold py-16 relative overflow-hidden">
        {/* Pattern overlay for royal texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl font-serif font-bold text-royal-navy mb-6">Need a Custom Design?</h2>
          <p className="text-royal-navy/80 mb-8 text-lg font-medium">
            We specialize in bespoke uniform solutions tailored to your brand's unique identity and operational needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-royal-navy text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-white hover:text-royal-navy transition-all duration-300 transform hover:-translate-y-1"
          >
            Consult Our Designers
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;