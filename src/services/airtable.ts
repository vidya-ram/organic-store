import Airtable from 'airtable';
import { Product } from '../types';

const apiKey = import.meta.env.VITE_AIRTABLE_API_TOKEN;
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Products';

const base = new Airtable({ apiKey }).base(baseId);

export async function fetchProductsFromAirtable(): Promise<Product[]> {
  const records = await base(tableName).select().all();
  return records.map((record: any) => {
    // Handle image field - Airtable can return either attachment arrays or URL strings
    let imageUrl = '';
    const imageField = record.get('image');
    const imageUrlField = record.get('imageUrl'); // Try separate URL field first
    
    if (imageUrlField && typeof imageUrlField === 'string') {
      // Use the dedicated imageUrl field if available
      imageUrl = imageUrlField;
    } else if (imageField) {
      if (Array.isArray(imageField) && imageField.length > 0) {
        // Handle attachment array (from file uploads)
        imageUrl = imageField[0].url || '';
      } else if (typeof imageField === 'string') {
        // Handle URL string (from manual URL entry)
        imageUrl = imageField;
      }
    }

    return {
      id: record.id,
      name: record.get('name') || '',
      price: Number(record.get('price')) || 0,
      image: imageUrl,
      category: record.get('category') || '',
      description: record.get('description') || '',
      inStock: record.get('inStock') === true || record.get('inStock') === 'true',
      unit: record.get('unit') || ''
    };
  });
}

export async function addProductToAirtable(product: Omit<Product, 'id'>): Promise<void> {
  // Store image URL in a separate field to avoid attachment conflicts
  await base(tableName).create([
    {
      fields: {
        name: product.name,
        price: product.price,
        imageUrl: product.image || '', // Store URL in separate field
        category: product.category,
        description: product.description,
        inStock: product.inStock ? 'true' : 'false', // Use "true"/"false" strings for single select
        unit: product.unit
      }
    }
  ]);
}

export async function updateProductInAirtable(product: Product): Promise<void> {
  // Update using the imageUrl field instead of image field
  await base(tableName).update([
    {
      id: product.id,
      fields: {
        name: product.name,
        price: product.price,
        imageUrl: product.image || '', // Use imageUrl field
        category: product.category,
        description: product.description,
        inStock: product.inStock ? 'true' : 'false', // Use "true"/"false" strings for single select
        unit: product.unit
      }
    }
  ]);
} 