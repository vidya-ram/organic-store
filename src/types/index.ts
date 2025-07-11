export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  unit: string; // kg, pieces, packets, etc.
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Customer {
  name: string;
  address: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
}