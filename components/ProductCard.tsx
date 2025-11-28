import React, { useState } from 'react';
import { Product } from '../types';
import { Check, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Increased limit to 3 to show all features for current products by default
  const visibleFeatures = isExpanded ? product.features : product.features.slice(0, 3);
  const hasMore = product.features.length > 3;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-royal-gold">
      <div className="relative overflow-hidden h-64 bg-gray-200">
        {/** Use a descriptive alt for Banquet Staff Vest per content request */}
        {(() => {
          const altText = product.name === 'Banquet Staff Vest'
            ? 'Diverse Indian team in Royal Fit banquet vest for premium service'
            : product.name;
          return (
            <img
              src={product.imageUrl}
              alt={altText}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          );
        })()}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 bg-royal-gold text-royal-navy px-3 py-1 text-sm font-bold">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-royal-navy mb-2 group-hover:text-royal-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {product.description}
        </p>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {visibleFeatures.map((feature, idx) => (
              <span key={idx} className="inline-flex items-center text-xs bg-royal-navy/5 text-royal-navy px-2 py-1 rounded-full">
                <Check size={10} className="mr-1 text-royal-gold" aria-hidden="true" /> {feature}
              </span>
            ))}
            {hasMore && !isExpanded && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(true);
                }}
                className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-royal-gold hover:text-royal-navy transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-navy"
                aria-expanded={false}
                aria-label={`Show ${product.features.length - 3} more features for ${product.name}`}
              >
                +{product.features.length - 3} more
              </button>
            )}
            {hasMore && isExpanded && (
               <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(false);
                }}
                className="inline-flex items-center text-xs text-gray-400 hover:text-royal-navy p-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-navy"
                aria-label={`Show less features for ${product.name}`}
                aria-expanded={true}
                title="Show less"
              >
                <ChevronUp size={14} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="font-bold text-royal-navy">{product.priceRange}</span>
            <Link
              to="/bulk-order"
              className="text-xs uppercase font-bold text-royal-gold hover:text-royal-navy tracking-wider transition-colors focus:outline-none focus:underline"
              aria-label={`Get quote for ${product.name}`}
            >
              Get Quote &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;