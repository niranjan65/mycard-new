// import axios from 'axios';


// const ERPNEXT_BASE_URL = 'https://your-erpnext-site.com';

// const api = axios.create({
//   baseURL: ERPNEXT_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor for auth
// api.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const erpnextApi = {
//   // Authentication
//   login: async (email, password) => {
//     const response = await api.post('/api/method/login', {
//       usr: email,
//       pwd: password,
//     });
//     return response.data;
//   },

//   // Get Items/Products
//   getItems: async (filters = {}) => {
//     const response = await api.get('/api/resource/Item', {
//       params: {
//         filters: JSON.stringify({ show_in_website: 1, ...filters }),
//         fields: JSON.stringify([
//           'name', 'item_name', 'item_group', 'image', 
//           'standard_rate', 'description', 'stock_qty'
//         ]),
//         limit_page_length: 20,
//       },
//     });
//     return response.data.data;
//   },

//   // Get Categories
//   getCategories: async () => {
//     const response = await api.get('/api/resource/Item Group', {
//       params: {
//         filters: JSON.stringify({ show_in_website: 1 }),
//         fields: JSON.stringify(['name', 'item_group_name', 'image']),
//       },
//     });
//     return response.data.data;
//   },

//   // Create Sales Order
//   createSalesOrder: async (orderData) => {
//     const response = await api.post('/api/resource/Sales Order', orderData);
//     return response.data.data;
//   },
// };

// export default api;


import axios from 'axios';

const ERPNEXT_BASE_URL = 'https://your-erpnext-site.com';

// Mock data for testing
const MOCK_PRODUCTS = [
  {
    name: 'wireless-earbuds-pro',
    item_name: 'Premium Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    standard_rate: 2999,
    item_group: 'Electronics',
    stock_qty: 50,
    brand: 'SoundMax',
    weight: '50g',
    warranty: '1 Year'
  },
  {
    name: 'nike-running-shoes',
    item_name: 'Nike Air Max Running Shoes',
    description: 'Lightweight and comfortable running shoes with advanced cushioning technology. Designed for performance and style with breathable mesh upper.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    standard_rate: 4999,
    item_group: 'Fashion',
    stock_qty: 25,
    brand: 'Nike',
    size: 'US 8-12',
    material: 'Mesh & Synthetic'
  },
  {
    name: 'apple-watch-series',
    item_name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and seamless connectivity. Features include heart rate monitoring, sleep tracking, and 18-hour battery life.',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    standard_rate: 39999,
    item_group: 'Electronics',
    stock_qty: 15,
    brand: 'Apple',
    display: '45mm Retina',
    battery: '18 hours'
  },
  {
    name: 'gaming-laptop-asus',
    item_name: 'ASUS ROG Gaming Laptop',
    description: 'High-performance gaming laptop with Intel i7 processor, 16GB RAM, RTX 4060 graphics card, and 1TB SSD. Perfect for gaming and professional work.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    standard_rate: 89999,
    item_group: 'Electronics',
    stock_qty: 10,
    brand: 'ASUS',
    processor: 'Intel i7',
    ram: '16GB DDR4'
  }
];

const MOCK_CATEGORIES = [
  {
    name: 'Electronics',
    item_group_name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&h=200&fit=crop'
  },
  {
    name: 'Fashion',
    item_group_name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop'
  },
  {
    name: 'Home',
    item_group_name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
  },
  {
    name: 'Books',
    item_group_name: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop'
  }
];

const api = axios.create({
  baseURL: ERPNEXT_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Flag to use mock data (set to false when ERPNext is ready)
const USE_MOCK_DATA = true;

export const erpnextApi = {
  // Authentication
  login: async (email, password) => {
    if (USE_MOCK_DATA) {
      // Mock successful login
      return { message: { api_key: 'mock-token-123' } };
    }
    
    const response = await api.post('/api/method/login', {
      usr: email,
      pwd: password,
    });
    return response.data;
  },

  // Get Items/Products
  getItems: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      let filteredProducts = [...MOCK_PRODUCTS];
      
      // Apply filters
      if (filters.item_group) {
        filteredProducts = filteredProducts.filter(
          product => product.item_group.toLowerCase() === filters.item_group.toLowerCase()
        );
      }
      
      return filteredProducts;
    }

    const response = await api.get('/api/resource/Item', {
      params: {
        filters: JSON.stringify({ show_in_website: 1, ...filters }),
        fields: JSON.stringify([
          'name', 'item_name', 'item_group', 'image', 
          'standard_rate', 'description', 'stock_qty'
        ]),
        limit_page_length: 20,
      },
    });
    return response.data.data;
  },

  // Get Item Details
  getItemDetails: async (itemName) => {
    if (USE_MOCK_DATA) {
      const product = MOCK_PRODUCTS.find(p => p.name === itemName);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }

    const response = await api.get(`/api/resource/Item/${itemName}`);
    return response.data.data;
  },

  // Get Categories
  getCategories: async () => {
    if (USE_MOCK_DATA) {
      return MOCK_CATEGORIES;
    }

    const response = await api.get('/api/resource/Item Group', {
      params: {
        filters: JSON.stringify({ show_in_website: 1 }),
        fields: JSON.stringify(['name', 'item_group_name', 'image']),
      },
    });
    return response.data.data;
  },

  // Create Sales Order
  createSalesOrder: async (orderData) => {
    if (USE_MOCK_DATA) {
      // Mock successful order creation
      const mockOrderId = `TBM-${Date.now()}`;
      return { 
        name: mockOrderId,
        status: 'Draft',
        customer: orderData.customer,
        total_amount: orderData.total_amount
      };
    }

    const response = await api.post('/api/resource/Sales Order', orderData);
    return response.data.data;
  },
};

export default api;
