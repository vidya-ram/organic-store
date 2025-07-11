import { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProductsFromAirtable } from '../services/airtable';
import { sampleProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    // Check if Airtable credentials are configured
    if (!import.meta.env.VITE_AIRTABLE_API_TOKEN || !import.meta.env.VITE_AIRTABLE_BASE_ID) {
      console.log('Airtable not configured, using sample data');
      setLoading(true);
      // Simulate loading delay for better UX
      setTimeout(() => {
        // Filter out out-of-stock products from sample data
        const inStockProducts = sampleProducts.filter(product => product.inStock);
        setProducts(inStockProducts);
        setLoading(false);
      }, 500);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const airtableProducts = await fetchProductsFromAirtable();
      // Filter out out-of-stock products
      const inStockProducts = airtableProducts.filter(product => product.inStock);
      setProducts(inStockProducts);
      console.log('Successfully loaded products from Airtable');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to load products from Airtable:', errorMessage);
      
      // Set a user-friendly error message
      setError(`Failed to load products from Airtable. ${errorMessage}`);
      
      // Keep using sample products as fallback (filtered for in-stock only)
      const inStockSampleProducts = sampleProducts.filter(product => product.inStock);
      setProducts(inStockSampleProducts);
      console.log('Using sample data as fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: loadProducts,
  };
}