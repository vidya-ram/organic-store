import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Spinach',
    price: 45,
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'vegetables',
    description: 'Fresh organic spinach leaves, rich in iron and vitamins',
    inStock: true,
    unit: '250g'
  },
  {
    id: '2',
    name: 'Organic Tomatoes',
    price: 60,
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'vegetables',
    description: 'Juicy red organic tomatoes, perfect for salads and cooking',
    inStock: true,
    unit: '500g'
  },
  {
    id: '3',
    name: 'Organic Bananas',
    price: 40,
    image: 'https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'fruits',
    description: 'Sweet organic bananas, naturally ripened',
    inStock: true,
    unit: '1 dozen'
  },
  {
    id: '4',
    name: 'Organic Apples',
    price: 120,
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'fruits',
    description: 'Crisp and sweet organic apples',
    inStock: true,
    unit: '1kg'
  },
  {
    id: '5',
    name: 'Brown Rice',
    price: 85,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'grains',
    description: 'Organic brown rice, unpolished and nutritious',
    inStock: true,
    unit: '1kg'
  },
  {
    id: '6',
    name: 'Organic Carrots',
    price: 50,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'vegetables',
    description: 'Fresh organic carrots, rich in beta-carotene',
    inStock: true,
    unit: '500g'
  },
  {
    id: '7',
    name: 'Organic Honey',
    price: 450,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'pantry',
    description: 'Pure organic honey from local beekeepers',
    inStock: true,
    unit: '500g'
  },
  {
    id: '8',
    name: 'Organic Quinoa',
    price: 280,
    image: 'https://images.pexels.com/photos/1446406/pexels-photo-1446406.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'grains',
    description: 'Protein-rich organic quinoa, gluten-free superfood',
    inStock: true,
    unit: '500g'
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'grains', name: 'Grains' },
  { id: 'millets', name: 'Millets' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'oil', name: 'Oil' },
  { id: 'flour', name: 'Flour' },
  { id: 'grocery', name: 'Grocery' }
];