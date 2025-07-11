import React, { useState, useEffect } from 'react';
import { Edit, Save, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { fetchProductsFromAirtable, addProductToAirtable, updateProductInAirtable } from '../services/airtable';
import { Product } from '../types';

interface EditableProduct extends Product {
  isEditing?: boolean;
  originalData?: Product;
}

export function AdminProductCatalog() {
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: '',
    category: '',
    description: '',
    inStock: true,
    unit: ''
  });

  // Predefined category options
  const categoryOptions = [
    'vegetables',
    'fruits',
    'grains',
    'millets',
    'flour',
    'snacks',
    'grocery',
    'oil'
  ];

  // Load products from Airtable
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const airtableProducts = await fetchProductsFromAirtable();
      setProducts(airtableProducts.map(p => ({ ...p, isEditing: false })));
    } catch (err) {
      setError('Failed to load products from Airtable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Start editing a product
  const startEditing = (product: EditableProduct) => {
    setProducts(prev => prev.map(p => 
      p.id === product.id 
        ? { ...p, isEditing: true, originalData: { ...p } }
        : { ...p, isEditing: false }
    ));
  };

  // Cancel editing
  const cancelEditing = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p.originalData!, isEditing: false, originalData: undefined }
        : p
    ));
  };

  // Helper function to convert inStock value to boolean
  const convertInStockToBoolean = (value: any): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value.toLowerCase() === 'yes';
    }
    return false;
  };

  // Save product changes
  const saveProduct = async (product: EditableProduct) => {
    try {
      // Ensure description is a string for Airtable API
      const productToSave = {
        ...product,
        description: product.description || '',
        inStock: convertInStockToBoolean(product.inStock)
      };
      await updateProductInAirtable(productToSave);
      setProducts(prev => prev.map(p => 
        p.id === product.id 
          ? { ...product, isEditing: false, originalData: undefined }
          : p
      ));
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  // Update product field
  const updateProductField = (productId: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, [field]: value } : p
    ));
  };

  // Add new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price),
        description: newProduct.description || '',
        inStock: convertInStockToBoolean(newProduct.inStock)
      };
      
      await addProductToAirtable(productToAdd);
      setProducts(prev => [...prev, { ...productToAdd, id: `temp-${Date.now()}`, isEditing: false }]);
      setNewProduct({
        name: '',
        price: 0,
        image: '',
        category: '',
        description: '',
        inStock: true,
        unit: ''
      });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
    }
  };

  return (
    <>
      <section className="py-16 bg-gray-50" id="admin-products">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Admin - Product Management</h2>
            <p className="text-xl text-gray-600">
              Manage your product catalog from Airtable
            </p>
          </div>

          {/* Add New Product Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Add New Product Form */}
          {showAddForm && (
            <div className="max-w-2xl mx-auto mb-12 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., kg, pieces, 500g"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      In Stock *
                    </label>
                    <select
                      required
                      value={newProduct.inStock.toString()}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Product description..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Products List */}
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found. Add your first product above.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl p-6 shadow-lg">
                    {product.isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) => updateProductField(product.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={product.price}
                              onChange={(e) => updateProductField(product.id, 'price', Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <input
                              type="text"
                              value={product.category}
                              onChange={(e) => updateProductField(product.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                            <input
                              type="text"
                              value={product.unit}
                              onChange={(e) => updateProductField(product.id, 'unit', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">In Stock</label>
                            <select
                              value={product.inStock.toString()}
                              onChange={(e) => updateProductField(product.id, 'inStock', e.target.value === 'true')}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                              type="url"
                              value={product.image}
                              onChange={(e) => updateProductField(product.id, 'image', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={product.description || ''}
                            onChange={(e) => updateProductField(product.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => cancelEditing(product.id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => saveProduct(product)}
                            className="px-4 py-2 bg-green-600 text-white rounded font-medium"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                              <p className="text-gray-600">₹{product.price} per {product.unit}</p>
                              <p className="text-sm text-gray-500">Category: {product.category}</p>
                              <p className="text-sm text-gray-500">
                                Status: {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </p>
                              {product.description && (
                                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => startEditing(product)}
                          className="px-3 py-2 bg-blue-600 text-white rounded font-medium"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
} 