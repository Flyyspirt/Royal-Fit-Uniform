import React from 'react';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery';

const Gallery = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 font-playfair">
              Uniform Collections Gallery
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our comprehensive portfolio of professional uniforms across
              hospitality, healthcare, culinary, and corporate sectors. Each
              collection showcases the quality, craftsmanship, and attention to
              detail that defines Royal Fit Uniforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">50+</div>
                <p className="text-blue-100">Uniform Styles</p>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">4</div>
                <p className="text-blue-100">Industry Categories</p>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">500+</div>
                <p className="text-blue-100">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <ImageGallery />

        {/* Info Section */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Our Collections?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Premium Quality
                </h3>
                <p className="text-gray-600">
                  Crafted from premium fabrics with superior stitching and
                  durability for long-lasting wear.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Perfect Fit
                </h3>
                <p className="text-gray-600">
                  Available in multiple sizes and customizable fits to ensure
                  comfort and professional appearance.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Customization
                </h3>
                <p className="text-gray-600">
                  Personalize with your logo, embroidery, or color preferences
                  for brand-specific uniforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-900 text-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Uniforms?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Contact our team to discuss your uniform needs and get a customized
              quote for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="bg-gold-500 hover:bg-yellow-600 text-blue-900 font-bold px-8 py-3 rounded-lg transition"
              >
                Get a Quote
              </a>
              <a
                href="/bulk-order"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold px-8 py-3 rounded-lg transition"
              >
                Bulk Orders
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
