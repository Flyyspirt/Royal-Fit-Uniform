import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const Story: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-royal-navy text-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
        <p className="text-lg text-royal-gold tracking-widest uppercase">Legacy & Innovation</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:text-royal-navy first-letter:mr-3 first-letter:float-left">
            Founded with a vision to redefine professional attire in India, Royal Fit Uniform has grown from a modest family business into a premier B2B supplier for the nation's top establishments. We believe that a uniform is more than just clothing; it is a symbol of pride, a tool for performance, and the first point of contact for your brand.
          </p>
          <p className="mb-12">
            As second-generation experts, we blend traditional tailoring craftsmanship with modern textile technology. We understand the rigorous demands of the hospitality floor, the sterile requirements of a hospital ward, and the sharp aesthetics needed in a corporate boardroom.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
              <Target size={40} className="text-royal-navy mx-auto mb-4" />
              <h3 className="text-lg font-bold font-serif text-royal-navy mb-2">Our Mission</h3>
              <p className="text-sm">To empower workforces with uniforms that inspire confidence and ensure comfort.</p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
              <Heart size={40} className="text-royal-navy mx-auto mb-4" />
              <h3 className="text-lg font-bold font-serif text-royal-navy mb-2">Our Values</h3>
              <p className="text-sm">Integrity in pricing, quality in material, and empathy in design.</p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm">
              <Award size={40} className="text-royal-navy mx-auto mb-4" />
              <h3 className="text-lg font-bold font-serif text-royal-navy mb-2">Excellence</h3>
              <p className="text-sm">Committed to delivering nothing short of perfection for every client.</p>
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold text-royal-navy mb-6">Why Choose Royal Fit?</h2>
          <ul className="list-disc pl-6 space-y-4 marker:text-royal-gold">
             <li><strong>End-to-End Service:</strong> From initial design consultation and fabric selection to final fitting and bulk delivery.</li>
             <li><strong>Fabric Technology:</strong> We utilize advanced blends that resist stains, wrinkles, and wear, ensuring your team looks fresh after an 8-hour shift.</li>
             <li><strong>Scalability:</strong> Whether you need 50 uniforms or 5,000, our manufacturing processes are designed to scale without compromising quality.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Story;