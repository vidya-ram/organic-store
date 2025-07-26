import React from 'react';
import { Leaf, Heart, Users } from 'lucide-react';

export function OurStory() {
  return (
    <section id="our-story" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/our-story.jpg"
                  alt="Young woman in a green field holding fresh vegetables"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <Leaf className="w-10 h-10 text-primary-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Our Story
                </h2>
                
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Our journey began with a simple belief: everyone deserves access to fresh, 
                    healthy, and organically grown food.
                  </p>
                  
                  <p>
                    What started as a small family effort has blossomed into a trusted store for 
                    organic groceries—connecting local farmers with mindful shoppers who value 
                    sustainability, quality, and real food.
                  </p>
                  
                  <p>
                    Along with fresh produce and pantry staples, we also offer wholesome Indian snacks and mixes, 
                    thoughtfully made by local home cooks using clean, natural ingredients.
                  </p>
                </div>
              </div>

              {/* Values Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Organic</h3>
                  <p className="text-sm text-gray-600">100% certified organic products</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Fresh</h3>
                  <p className="text-sm text-gray-600">Daily fresh from local farms</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
                  <p className="text-sm text-gray-600">Supporting local farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 