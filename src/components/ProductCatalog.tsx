import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { categories } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { products, loading, error, refetch } = useProducts();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-50" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Fresh Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked organic produce from trusted local farmers, delivered fresh to your doorstep
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-800">{error}</p>
              </div>
              <button
                onClick={refetch}
                className="flex items-center space-x-2 text-yellow-700 hover:text-yellow-800 font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}