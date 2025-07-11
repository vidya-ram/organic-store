import React from 'react';
import { Leaf, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-400" />
              <h3 className="text-2xl font-bold">Village Naturals</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted source for fresh, organic groceries. We bring nature's best directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Village-Naturals/61565696094142" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/villagenaturalsorganic/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors duration-200">Products</a></li>
              <li><a href="#reviews" className="text-gray-300 hover:text-white transition-colors duration-200">Reviews</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-white transition-colors duration-200">Location</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Fresh Vegetables</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Organic Fruits</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Grains & Cereals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Pantry Items</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+91 88614 75061</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">villagenaturals.blr@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-gray-300">Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary-400" />
                <a 
                  href="https://wa.me/918861475061" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Village Naturals. All rights reserved. | Made with ❤️ for fresh, organic living.
          </p>
        </div>
      </div>
    </footer>
  );
}