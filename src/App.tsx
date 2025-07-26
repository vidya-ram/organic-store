import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { Reviews } from './components/Reviews';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { OurStory } from './components/OurStory';
import { CartProvider } from './hooks/useCart';
import { AdminProductCatalog } from './components/AdminProductCatalog';
import AdminLogin from './components/AdminLogin';

function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'admin-product-catalog') {
      // Navigate to admin product catalog page
      window.location.href = '/admin-product-catalog';
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleShopNow = () => {
    scrollToSection('products');
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    alert('Thank you for your order! We will contact you soon for delivery confirmation.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onCartToggle={handleCartToggle} onNavClick={scrollToSection} isAdmin={isAdmin} />
      <main>
        <section id="home">
          <Hero onShopNowClick={handleShopNow} />
        </section>
        <OurStory />
        <ProductCatalog />
        <Reviews />
        <MapSection />
      </main>
      <Footer />
      {/* Modals */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
      />
      <CheckoutForm 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleAdminLogin = () => {
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin-product-catalog');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        {isAdmin ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Admin Panel</h2>
            <p className="text-gray-600 mb-6 text-center">You are currently logged in as admin.</p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Go to Homepage
              </button>
              <button
                onClick={() => navigate('/admin-product-catalog')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Manage Products
              </button>
              <button
                onClick={handleAdminLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
      </div>
    </div>
  );
}

function AdminProductCatalogPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    
    // Redirect to admin login if not authenticated
    if (!adminStatus) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'home') {
      navigate('/');
    } else if (sectionId === 'admin-product-catalog') {
      // Already on this page, do nothing
      return;
    } else {
      // For other sections, navigate to homepage and scroll to section
      navigate('/');
      // Add a small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  if (!isAdmin) {
    return null; // Will redirect to /admin
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartToggle={() => {}} onNavClick={handleNavClick} isAdmin={isAdmin} />
      <div className="pt-20">
        <AdminProductCatalog />
        {/* Logout button at the end of the page */}
        <div className="text-center py-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin-product-catalog" element={<AdminProductCatalogPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;