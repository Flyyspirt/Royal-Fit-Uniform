import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Users } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import { ASSETS } from '../assets';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-royal-navy text-white overflow-hidden">
        {/* Updated Image via ASSETS */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${ASSETS.HERO.HOME}')` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <span className="text-royal-gold font-bold tracking-widest uppercase mb-4 text-sm md:text-base animate-fade-in-up">
            Premium B2B Solutions
          </span>
          <h1 
            className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight max-w-4xl animate-fade-in-up" 
            style={{ animationDelay: '0.2s' }}
          >
            Engineering <span className="text-royal-gold">Confidence</span> in Every Uniform
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 animate-fade-in-up" 
            style={{ animationDelay: '0.4s' }}
          >
            Second-generation experts delivering tailored uniform solutions for India's leading hospitality, healthcare, and corporate brands.
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" 
            style={{ animationDelay: '0.6s' }}
          >
            <Link
              to="/bulk-order"
              className="px-8 py-4 bg-royal-gold text-royal-navy font-bold rounded hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Request Bulk Quote <ArrowRight size={20} />
            </Link>
            <Link
              to="/hospitality"
              className="px-8 py-4 border border-white text-white font-bold rounded hover:bg-white hover:text-royal-navy transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-royal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-royal-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} className="text-royal-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-royal-navy">Quality Assurance</h3>
              <p className="text-gray-600">Premium fabrics tested for durability, stain resistance, and color retention in commercial environments.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-royal-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-royal-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-royal-navy">Custom Fit</h3>
              <p className="text-gray-600">Expert tailoring services ensuring comfortable fits for all staff members, enhancing professional appearance.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-royal-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck size={32} className="text-royal-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-royal-navy">Reliable Delivery</h3>
              <p className="text-gray-600">Consistent timelines and bulk order management you can trust for your operational needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-navy mb-4">Featured Collections</h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/hospitality"
              className="inline-block border-b-2 border-royal-navy pb-1 text-royal-navy font-bold hover:text-royal-gold hover:border-royal-gold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-royal-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">Client Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
                <div className="text-royal-gold text-4xl font-serif mb-4">"</div>
                <p className="text-lg italic text-gray-300 mb-6">{testimonial.text}</p>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-royal-gold text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;