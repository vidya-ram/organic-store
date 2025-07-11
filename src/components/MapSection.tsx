import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export function MapSection() {
  return (
    <section className="py-16 bg-gray-50" id="location">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Our Store</h2>
          <p className="text-xl text-gray-600">
            Come see our fresh produce in person or order online for delivery
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Store Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Store Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Address</p>
                    <p className="text-gray-600">
                      Village Naturals<br />
                      Bengaluru, Karnataka<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Store Hours</p>
                    <div className="text-gray-600">
                      <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
                      <p>Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+918861475061</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">villagenaturals.blr@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-primary-800 mb-2">🚚 Delivery Information</h4>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• Free delivery on orders above ₹500</li>
                  <li>• Same-day delivery within 5km radius</li>
                  <li>• Fresh vegetables are available on Wednesday and Saturday</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8479765305993!2d77.67558950000001!3d12.9128696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae138eb0d8fccb%3A0x926240f7ed23789c!2sVillage%20Naturals!5e0!3m2!1sen!2sin!4v1703850000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}