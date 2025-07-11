import React from 'react';
import { Star, User, Plus } from 'lucide-react';
import { sampleReviews } from '../data/reviews';

export function Reviews() {
  const reviews = sampleReviews;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Replace with your actual Google Maps review link for Village Naturals
  const googleMapsReviewUrl =
    'https://www.google.com/maps/place/Village+Naturals/@12.9128696,77.6755895,17z/data=!4m8!3m7!1s0x3bae138eb0d8fccb:0x926240f7ed23789c!8m2!3d12.9128696!4d77.6781644!9m1!1b1!16s%2Fg%2F11c5w2w1qg?entry=ttu';

  return (
    <section className="py-16 bg-white" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-lg font-semibold text-gray-700">
              5.0
            </span>
            <span className="text-gray-500">(30 reviews)</span>
          </div>
        </div>

        {/* Google Maps Review Button */}
        <div className="text-center mb-8">
          <a
            href={googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200 inline-flex items-center space-x-1 mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Write a Review on Google</span>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {review.customerName || 'Anonymous Customer'}
                    </h4>
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}