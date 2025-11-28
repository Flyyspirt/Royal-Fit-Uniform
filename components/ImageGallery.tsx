import React, { useState } from 'react';
import galleryData from '../image-gallery-metadata.json';

interface Image {
  id: string;
  filename: string;
  title: string;
  description: string;
  alt: string;
  path: string;
  category: string;
  featured: boolean;
}

interface Gallery {
  id: string;
  name: string;
  description: string;
  images: Image[];
}

interface GalleryData {
  galleries: Gallery[];
}

export const ImageGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const data: GalleryData = galleryData;

  const filteredGalleries = selectedCategory
    ? data.galleries.filter(g => g.id === selectedCategory)
    : data.galleries;

  const allImages = filteredGalleries.flatMap(g => g.images);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Uniform Collections
          </h2>
          <p className="text-lg text-gray-600">
            Explore our comprehensive range of professional uniforms across industries
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Collections
          </button>
          {data.galleries.map(gallery => (
            <button
              key={gallery.id}
              onClick={() => setSelectedCategory(gallery.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === gallery.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {gallery.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allImages.map(image => (
            <div
              key={image.id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative overflow-hidden bg-gray-100 h-64">
                <img
                  src={image.path}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                {image.featured && (
                  <div className="absolute top-3 right-3 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {image.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                    {image.category}
                  </span>
                  <a
                    href={image.path}
                    download
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
