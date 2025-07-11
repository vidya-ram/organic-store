import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    console.log('handleAddToCart');
    addToCart(product, 1);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">₹{product.price}</span>
          
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="bg-primary-600 hover:bg-primary-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}