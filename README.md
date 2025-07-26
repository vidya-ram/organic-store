# Village Naturals - Organic Store

A modern, responsive e-commerce website for Village Naturals, an organic grocery store. Built with React, TypeScript, and Tailwind CSS, featuring a complete shopping experience with cart functionality, checkout process, admin product management, and Google Maps integration.

## 🌱 Features

### ✅ Product Catalog
- **Dynamic Product Loading**: Fetches product data from Airtable API
- **Local Storage Fallback**: Uses sample data when Airtable is not configured
- **Category Filtering**: Filter products by category (vegetables, fruits, grains, millets, flour, snacks, grocery, oil)
- **Stock Management**: Products show stock status and hide out-of-stock items from customer view
- **Responsive Grid Layout**: Beautiful product cards with hover effects

### ✅ Shopping Cart
- **Full Cart Functionality**: Add, remove, and update product quantities
- **Local Storage Persistence**: Cart state persists across browser sessions
- **Real-time Updates**: Cart updates instantly across all components using React Context
- **Cart Modal**: Slide-out cart panel with order summary

### ✅ Checkout Process
- **Customer Information Collection**: Name, phone, and delivery address
- **WhatsApp Integration**: Automatically opens WhatsApp with formatted order details
- **Order Summary**: Complete order breakdown with totals
- **Responsive Form**: Works perfectly on all devices

### ✅ Admin Features
- **Secure Admin Login**: Password-based authentication with environment variable
- **Product Management**: Add, edit, and delete products directly from the admin interface
- **Inventory Management**: Update stock status, prices, and product details
- **Real-time Updates**: Changes reflect immediately in the customer-facing catalog
- **Admin Dashboard**: Dedicated admin page at `/admin` with product catalog at `/admin-product-catalog`

### ✅ Store Features
- **Google Maps Integration**: Embedded map showing store location
- **Customer Reviews**: Display customer testimonials with star ratings
- **Google Reviews Link**: Direct link to write reviews on Google Maps
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Navigation**: Smooth navigation between sections with proper routing

### ✅ Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Context**: Shared state management for cart functionality
- **Custom Hooks**: Reusable hooks for cart and product management
- **Tailwind CSS**: Modern, utility-first styling
- **Vite**: Fast development and build tooling
- **React Router**: Client-side routing for admin pages

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Data Source**: Airtable API
- **Routing**: React Router DOM
- **Deployment**: Static hosting ready

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Airtable account (for product data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/village-naturals.git
   cd village-naturals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_AIRTABLE_API_KEY=your_airtable_api_key
   VITE_AIRTABLE_BASE_ID=your_airtable_base_id
   VITE_AIRTABLE_TABLE_NAME=your_table_name
   VITE_ADMIN_PASSWORD=your_admin_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Airtable Integration

To use Airtable as your product data source:

1. **Create an Airtable base** with a table containing the following fields:
   - `id` (Single line text)
   - `name` (Single line text)
   - `price` (Number)
   - `imageUrl` (Single line text) - URL to product image
   - `category` (Single select) - with options: vegetables, fruits, grains, millets, flour, snacks, grocery, oil
   - `description` (Long text)
   - `inStock` (Single select) - with options: true, false
   - `unit` (Single line text)

2. **Get your Airtable credentials**:
   - API Key: From your Airtable account settings
   - Base ID: From the URL of your base
   - Table Name: The name of your products table

3. **Update environment variables** with your Airtable credentials

If Airtable is not configured, the app will automatically use sample data.

## 📱 Usage

### For Customers
1. **Browse Products**: View the product catalog with category filtering
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Manage Cart**: Use the cart icon in the header to view and modify your cart
4. **Checkout**: Click "Proceed to Checkout" to complete your order
5. **WhatsApp Order**: The order details will be sent via WhatsApp for confirmation

### For Store Owners (Admin)
1. **Access Admin**: Navigate to `/admin` and enter the admin password
2. **Manage Products**: Go to `/admin-product-catalog` to add, edit, or delete products
3. **Update Inventory**: Modify stock status, prices, and product details inline
4. **Add New Products**: Use the "Add New Product" form to create new items
5. **Monitor Orders**: Check WhatsApp for incoming orders

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── AdminLogin.tsx      # Admin login form
│   ├── AdminProductCatalog.tsx # Admin product management
│   ├── Cart.tsx            # Shopping cart modal
│   ├── CheckoutForm.tsx    # Checkout form
│   ├── Footer.tsx          # Site footer
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Landing section
│   ├── MapSection.tsx      # Store location
│   ├── ProductCard.tsx     # Individual product display
│   ├── ProductCatalog.tsx  # Product grid
│   └── Reviews.tsx         # Customer reviews
├── hooks/                  # Custom React hooks
│   ├── useCart.tsx         # Cart context and logic
│   ├── useLocalStorage.ts  # Local storage hook
│   └── useProducts.ts      # Product data management
├── data/                   # Static data
│   ├── products.ts         # Sample products
│   └── reviews.ts          # Sample reviews
├── services/               # External services
│   └── airtable.ts         # Airtable API integration
├── types/                  # TypeScript type definitions
│   └── index.ts            # Product, Cart, and Order types
├── App.tsx                 # Main application component
└── main.tsx                # Application entry point
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` to customize colors and theme
- Update CSS variables in `src/index.css` for primary colors
- All components use Tailwind utility classes for easy customization

### Adding Products
- **With Airtable**: Use the admin interface to add products directly
- **Without Airtable**: Modify `src/data/products.ts` to add sample products

### Business Information
- Update store details in `src/components/MapSection.tsx`
- Modify WhatsApp number in `src/components/CheckoutForm.tsx`
- Update Google Maps review link in `src/components/Reviews.tsx`

### Admin Configuration
- Change admin password by updating `VITE_ADMIN_PASSWORD` in your `.env` file
- Modify product categories in `src/components/AdminProductCatalog.tsx`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🌐 Deployment

This project can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions or deploy manually

**Important**: Make sure to set up your environment variables in your hosting platform's dashboard.

## 🔐 Security Notes

- The admin password is stored in environment variables
- Admin sessions are managed via localStorage (consider implementing server-side sessions for production)
- Airtable API keys should be kept secure and not committed to version control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
