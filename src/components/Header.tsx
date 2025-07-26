import React from 'react';
import { ShoppingCart, Leaf, Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onCartToggle: () => void;
  onNavClick: (sectionId: string) => void;
  isAdmin?: boolean;
}

export function Header({ onCartToggle, onNavClick, isAdmin = false }: HeaderProps) {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'products', label: 'Products' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  // Add Admin link if user is admin
  if (isAdmin) {
    navItems.push({ id: 'admin-product-catalog', label: 'Inventory' });
  }

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">Village Naturals</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartToggle}
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}