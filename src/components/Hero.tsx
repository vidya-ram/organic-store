import React from 'react';
import { ArrowRight, Star, Truck, Shield } from 'lucide-react';

interface HeroProps {
  onShopNowClick: () => void;
}

export function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Fresh <span className="text-primary-600">Organic</span> Groceries
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover the finest selection of organic fruits, vegetables, and pantry essentials. 
              Delivered fresh to your doorstep from our trusted local farmers.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">100% Organic</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Premium Quality</span>
              </div>
            </div>

            <button
              onClick={onShopNowClick}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center space-x-2 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Fresh organic vegetables and fruits"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}