import React, { useState } from 'react';
import { X, User, MapPin, MessageCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Customer } from '../types';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

export function CheckoutForm({ isOpen, onClose, onOrderComplete }: CheckoutFormProps) {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order details for logging
      const orderData = {
        customerName: customer.name,
        address: customer.address,
        items: cartItems,
        total: getTotalPrice(),
        timestamp: new Date().toISOString(),
      };

      console.log('Order submitted:', orderData);

      // Create WhatsApp message
      const itemsList = cartItems.map(item => 
        `${item.name} (${item.unit}) - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const message = `🛒 *New Order*\n\n*Customer Details:*\nName: ${customer.name}\nAddress: ${customer.address}\n\n*Order Items:*\n${itemsList}\n\n*Total Amount: ₹${getTotalPrice().toFixed(2)}`;

      const whatsappUrl = `https://wa.me/918861475061?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      onOrderComplete();
      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-primary-600">₹{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Delivery Address *
              </label>
              <textarea
                required
                value={customer.address}
                onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Enter your complete delivery address"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">After clicking "Place Order":</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>WhatsApp will open with your order message</li>
                    <li>Send the message to confirm your order</li>
                    <li>We'll contact you for delivery confirmation</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  <span>Place Order via WhatsApp</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}