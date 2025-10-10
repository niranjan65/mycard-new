// import React, { useEffect, useState } from 'react';
// import { useLocation, useSearchParams, Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaHeart, FaShoppingCart } from 'react-icons/fa';
// import ProductCard from '../components/ProductCard';
// import { erpnextApi } from '../api/erpnextApi';
// import { addToCart } from '../store/slices/cartSlice';
// import { addToWishlist } from '../store/slices/wishlistSlice'; // You'll need to create this
// import { COLORS } from '../constants/colors';

// const ProductsPage = () => {
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const category = searchParams.get('category');
//   const searchTerm = searchParams.get('search') || '';
//   const dispatch = useDispatch();
  
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(category || '');
//   const [viewMode, setViewMode] = useState('list');
//   const [sortBy, setSortBy] = useState('name');

//   // Filter States
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [primeOnly, setPrimeOnly] = useState(false);
//   const [fastDelivery, setFastDelivery] = useState(false);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [newItems, setNewItems] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('');

//   // EXACT SAME sample data generation as ProductDetailPage
//   const generateSampleProducts = () => {
//     const professionalCategories = [
//       {
//         name: 'Electronics',
//         subcategories: [
//           { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Desktops', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Gaming Laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop&crop=center' }
//         ]
//       },
//       {
//         name: 'Fashion',
//         subcategories: [
//           { name: 'Men\'s Clothing', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Women\'s Clothing', image: 'https://images.unsplash.com/photo-1494790108755-2616c4f5d81c?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Kids Fashion', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&crop=center' }
//         ]
//       },
//       {
//         name: 'Home & Living',
//         subcategories: [
//           { name: 'Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Kitchen Appliances', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Bedding', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop&crop=center' }
//         ]
//       },
//       {
//         name: 'Books',
//         subcategories: [
//           { name: 'Fiction', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Academic', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Comics & Manga', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' }
//         ]
//       },
//       {
//         name: 'Sports',
//         subcategories: [
//           { name: 'Fitness Equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Cricket', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Football', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=500&fit=crop&crop=center' },
//           { name: 'Tennis', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&h=500&fit=crop&crop=center' }
//         ]
//       }
//     ];

//     const products = [];
//     let productId = 1;

//     professionalCategories.forEach(category => {
//       category.subcategories.forEach(subcategory => {
//         // Generate 5 products per subcategory for more variety
//         for (let i = 1; i <= 5; i++) {
//           products.push({
//             id: productId++,
//             name: `${subcategory.name.replace(/\s+/g, '-')}-${productId}`, // For URL compatibility
//             item_name: `${subcategory.name} Product ${i}`,
//             image: subcategory.image,
//             standard_rate: Math.floor(Math.random() * 50000) + 1000,
//             originalPrice: Math.floor(Math.random() * 60000) + 55000,
//             discount: Math.floor(Math.random() * 50) + 10,
//             rating: (Math.random() * 2 + 3).toFixed(1),
//             reviews: Math.floor(Math.random() * 1000) + 100,
//             category: category.name,
//             subcategory: subcategory.name,
//             description: `Premium ${subcategory.name} product with advanced features and high-quality materials. Perfect for both professional and personal use. This product comes with excellent build quality and modern design.`,
//             features: [
//               'High-quality materials and construction',
//               'Advanced technology and features',
//               'Professional grade performance',
//               '2-year comprehensive warranty',
//               'Fast and reliable delivery'
//             ],
//             brand: ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell', 'Xiaomi', 'OnePlus'][Math.floor(Math.random() * 8)],
//             inStock: Math.random() > 0.1
//           });
//         }
//       });
//     });

//     return products;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Always use sample products for consistency
//         const sampleProducts = generateSampleProducts();
//         const sampleCategories = [
//           { name: 'Electronics', item_group_name: 'Electronics' },
//           { name: 'Fashion', item_group_name: 'Fashion' },
//           { name: 'Home & Living', item_group_name: 'Home & Living' },
//           { name: 'Books', item_group_name: 'Books' },
//           { name: 'Sports', item_group_name: 'Sports' }
//         ];

//         // Try API first, but always fallback to sample data
//         try {
//           const [productsData, categoriesData] = await Promise.all([
//             erpnextApi.getItems(selectedCategory ? { item_group: selectedCategory } : {}),
//             erpnextApi.getCategories(),
//           ]);
          
//           // Use API data if available and has content, otherwise use sample data
//           if (productsData && productsData.length > 0) {
//             // Add IDs to API products if they don't have them
//             const productsWithIds = productsData.map((product, index) => ({
//               ...product,
//               id: product.id || index + 1,
//               name: product.name || `product-${index + 1}`
//             }));
//             setProducts(productsWithIds);
//           } else {
//             setProducts(sampleProducts);
//           }
          
//           if (categoriesData && categoriesData.length > 0) {
//             setCategories(categoriesData);
//           } else {
//             setCategories(sampleCategories);
//           }
//         } catch (apiError) {
//           console.log('API failed, using sample data:', apiError);
//           // Use sample data as fallback
//           setProducts(sampleProducts);
//           setCategories(sampleCategories);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         // Use sample data as final fallback
//         setProducts(generateSampleProducts());
//         setCategories([
//           { name: 'Electronics', item_group_name: 'Electronics' },
//           { name: 'Fashion', item_group_name: 'Fashion' },
//           { name: 'Home & Living', item_group_name: 'Home & Living' },
//           { name: 'Books', item_group_name: 'Books' },
//           { name: 'Sports', item_group_name: 'Sports' }
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCategory]);

//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//     if (categoryName) {
//       setSearchParams({ category: categoryName });
//     } else {
//       setSearchParams({});
//     }
//   };

//   const handleBrandToggle = (brand) => {
//     setSelectedBrands(prev => 
//       prev.includes(brand) 
//         ? prev.filter(b => b !== brand)
//         : [...prev, brand]
//     );
//   };

//   // Filter products based on all criteria
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = searchTerm === '' || 
//       product.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesBrand = selectedBrands.length === 0 || 
//       selectedBrands.some(brand => product.brand?.toLowerCase().includes(brand.toLowerCase()));
    
//     const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
//     return matchesSearch && matchesBrand && matchesCategory;
//   });

//   const sortedProducts = filteredProducts.sort((a, b) => {
//     switch (sortBy) {
//       case 'price_low':
//         return a.standard_rate - b.standard_rate;
//       case 'price_high':
//         return b.standard_rate - a.standard_rate;
//       case 'name':
//       default:
//         return a.item_name.localeCompare(b.item_name);
//     }
//   });

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         stars.push(<FaStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
//       } else {
//         stars.push(<FaRegStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
//       }
//     }
//     return stars;
//   };

//   // Updated ProductListItem with functional cart and wishlist
//   const ProductListItem = ({ product }) => (
//     <div style={{
//       display: 'flex',
//       alignItems: 'center',
//       padding: '16px',
//       borderBottom: '1px solid #E5E7EB',
//       backgroundColor: '#FFFFFF',
//       transition: 'background-color 0.2s ease'
//     }}
//     onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
//     onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
//     >
//       {/* Wishlist Heart - NOW FUNCTIONAL */}
//       <div style={{ marginRight: '12px' }}>
//         <FaHeart 
//           size={18} 
//           style={{ 
//             color: '#DDD', 
//             cursor: 'pointer',
//             transition: 'color 0.2s ease'
//           }}
//           onMouseOver={(e) => e.target.style.color = '#FF4444'}
//           onMouseOut={(e) => e.target.style.color = '#DDD'}
//           onClick={() => {
//             // Add to wishlist functionality
//             dispatch(addToWishlist(product));
//             alert(`${product.item_name} added to wishlist!`);
//           }}
//         />
//       </div>

//       {/* Product Image - FIXED ROUTING */}
//       <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
//         <div style={{
//           width: '140px',
//           height: '120px',
//           borderRadius: '8px',
//           overflow: 'hidden',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           cursor: 'pointer'
//         }}>
//           <img
//             src={product.image || 'https://via.placeholder.com/140x120'}
//             alt={product.item_name}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//               transition: 'transform 0.3s ease'
//             }}
//             onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
//             onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
//           />
//         </div>
//       </Link>

//       {/* Product Info - Middle Section - FIXED ROUTING */}
//       <div style={{
//         flex: 1,
//         paddingLeft: '20px',
//         paddingRight: '20px'
//       }}>
//         <Link 
//           to={`/product/${product.id}`} 
//           style={{ textDecoration: 'none', color: 'inherit' }}
//         >
//           <h3 style={{
//             fontSize: '16px',
//             fontWeight: '600',
//             color: '#0F1111',
//             margin: '0 0 6px 0',
//             lineHeight: '1.3',
//             cursor: 'pointer'
//           }}>
//             {product.item_name}
//           </h3>
//         </Link>
        
//         {/* Rating */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           marginBottom: '8px'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             backgroundColor: '#00A652',
//             color: 'white',
//             padding: '2px 6px',
//             borderRadius: '3px',
//             fontSize: '12px',
//             fontWeight: '600'
//           }}>
//             {product.rating} ★
//           </div>
//           <span style={{
//             fontSize: '13px',
//             color: '#878787'
//           }}>
//             {product.reviews?.toLocaleString() || '0'} Ratings & Reviews
//           </span>
//         </div>

//         {/* Features/Specifications */}
//         <div style={{
//           fontSize: '13px',
//           color: '#212121',
//           lineHeight: '1.4'
//         }}>
//           {product.features?.slice(0, 4).map((feature, index) => (
//             <div key={index}>• {feature}</div>
//           )) || (
//             <>
//               <div>• High-quality materials and construction</div>
//               <div>• Advanced technology and features</div>
//               <div>• Professional grade performance</div>
//               <div>• 2-year comprehensive warranty</div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Price and Actions - Right Section */}
//       <div style={{
//         width: '220px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-end',
//         gap: '8px',
//         flexShrink: 0
//       }}>
//         {/* Price */}
//         <div style={{ textAlign: 'right' }}>
//           <div style={{
//             fontSize: '24px',
//             fontWeight: '600',
//             color: '#212121',
//             marginBottom: '4px'
//           }}>
//             ₹{(product.standard_rate || 29990).toLocaleString()}
//           </div>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             justifyContent: 'flex-end',
//             marginBottom: '4px'
//           }}>
//             <span style={{
//               fontSize: '14px',
//               color: '#878787',
//               textDecoration: 'line-through'
//             }}>
//               ₹{(product.originalPrice || 49990).toLocaleString()}
//             </span>
//             <span style={{
//               fontSize: '14px',
//               color: '#388E3C',
//               fontWeight: '600'
//             }}>
//               {product.discount || 40}% off
//             </span>
//           </div>
//         </div>

//         {/* Exchange Offer */}
//         <div style={{
//           fontSize: '13px',
//           color: '#388E3C',
//           fontWeight: '500',
//           textAlign: 'right',
//           marginBottom: '8px'
//         }}>
//           Upto ₹2,420 Off on Exchange
//         </div>

//         {/* Bank Offer */}
//         <div style={{
//           backgroundColor: '#E8F5E8',
//           color: '#2E7D32',
//           padding: '4px 8px',
//           borderRadius: '4px',
//           fontSize: '12px',
//           fontWeight: '500',
//           marginBottom: '12px'
//         }}>
//           Bank Offer
//         </div>

//         {/* Add to Cart Button - NOW FUNCTIONAL */}
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             dispatch(addToCart(product));
//             alert(`${product.item_name} added to cart!`);
//           }}
//           style={{
//             width: '100%',
//             padding: '8px 12px',
//             backgroundColor: '#FFD814',
//             border: '1px solid #FCD200',
//             borderRadius: '20px',
//             fontSize: '13px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '6px',
//             marginBottom: '8px',
//             transition: 'background-color 0.3s ease'
//           }}
//           onMouseOver={(e) => e.target.style.backgroundColor = '#F7CA00'}
//           onMouseOut={(e) => e.target.style.backgroundColor = '#FFD814'}
//         >
//           <FaShoppingCart size={12} />
//           Add to Cart
//         </button>

//         {/* Add to Compare */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '6px',
//           fontSize: '13px',
//           color: '#2874F0',
//           cursor: 'pointer'
//         }}>
//           <input type="checkbox" style={{ marginRight: '4px' }} />
//           Add to Compare
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//         fontSize: '18px',
//         color: '#666666',
//         backgroundColor: '#FFFFFF'
//       }}>
//         Loading products...
//       </div>
//     );
//   }


//   useEffect(() => {
//     console.log('Filtered Products: from use effect');
//   }, []);

//   return (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       minHeight: '100vh'
//     }}>
      
//       {/* Container with Flex Layout for Scrollable Sidebar */}
//       <div style={{
//         display: 'flex',
//         maxWidth: '1400px',
//         margin: '0 auto',
//         gap: '24px',
//         padding: '20px'
//       }}>
        
//         {/* Clean White Amazon-Style Sidebar */}
//         <div style={{
//           position: 'sticky',
//           top: '20px',
//           alignSelf: 'flex-start',
//           width: '240px',
//           height: 'fit-content',
//           maxHeight: 'calc(100vh - 40px)',
//           backgroundColor: '#FFFFFF',
//           color: '#000000',
//           padding: '16px 0 16px 16px',
//           fontSize: '14px',
//           lineHeight: '20px',
//           flexShrink: 0,
//           overflowY: 'auto',
//           borderRight: '1px solid #E7E7E7',
//           borderRadius: '8px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           fontFamily: '"Amazon Ember", Arial, sans-serif'
//         }}>
          
//           {/* Category Section */}
//           <div style={{ marginBottom: '24px' }}>
//             <h4 style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               color: '#0F1111',
//               margin: '0 0 8px 0',
//               lineHeight: '24px'
//             }}>
//               Categories
//             </h4>
            
//             <div style={{ paddingLeft: '16px' }}>
//               {/* All Products Option */}
//               <div style={{
//                 padding: '4px 0',
//                 fontSize: '13px',
//                 color: !selectedCategory ? '#007185' : '#565959',
//                 cursor: 'pointer',
//                 lineHeight: '16px',
//                 fontWeight: !selectedCategory ? '600' : '400'
//               }}
//               onClick={() => handleCategoryChange('')}>
//                 All Products ({products.length})
//               </div>
              
//               {/* Individual Categories */}
//               {categories.map((category) => {
//                 const categoryCount = products.filter(p => p.category === category.name).length;
//                 return (
//                   <div key={category.name} style={{
//                     padding: '4px 0',
//                     fontSize: '13px',
//                     color: selectedCategory === category.name ? '#007185' : '#565959',
//                     cursor: 'pointer',
//                     lineHeight: '16px',
//                     fontWeight: selectedCategory === category.name ? '600' : '400'
//                   }}
//                   onClick={() => handleCategoryChange(category.name)}>
//                     {category.item_group_name || category.name} ({categoryCount})
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Brands */}
//           <div style={{ marginBottom: '24px' }}>
//             <h4 style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               color: '#0F1111',
//               margin: '0 0 8px 0',
//               lineHeight: '24px'
//             }}>
//               Brands
//             </h4>
//             {['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell', 'Xiaomi', 'OnePlus'].map((brand) => (
//               <label key={brand} style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 marginBottom: '4px',
//                 lineHeight: '20px'
//               }}>
//                 <input 
//                   type="checkbox" 
//                   style={{ 
//                     marginRight: '8px',
//                     transform: 'scale(1.1)',
//                     accentColor: '#FF9900'
//                   }}
//                   checked={selectedBrands.includes(brand)}
//                   onChange={() => handleBrandToggle(brand)}
//                 />
//                 <span style={{ color: '#0F1111', fontSize: '14px' }}>
//                   {brand}
//                 </span>
//               </label>
//             ))}
//           </div>

//           {/* Price Range */}
//           <div style={{ marginBottom: '24px' }}>
//             <h4 style={{
//               fontSize: '16px',
//               fontWeight: '700',
//               color: '#0F1111',
//               margin: '0 0 8px 0',
//               lineHeight: '24px'
//             }}>
//               Price
//             </h4>
//             {[
//               'Under ₹1,000',
//               '₹1,000 - ₹5,000',
//               '₹5,000 - ₹10,000',
//               '₹10,000 - ₹25,000',
//               'Over ₹25,000'
//             ].map((range) => (
//               <div key={range} style={{
//                 cursor: 'pointer',
//                 padding: '4px 0',
//                 fontSize: '14px',
//                 color: selectedPriceRange === range ? '#007185' : '#0F1111',
//                 lineHeight: '20px',
//                 fontWeight: selectedPriceRange === range ? '600' : '400'
//               }}
//               onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}>
//                 {range}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div style={{
//           flex: 1,
//           minHeight: '0'
//         }}>
//           {/* Page Header */}
//           <div style={{ marginBottom: '24px' }}>
//             <h1 style={{
//               fontSize: '28px',
//               fontWeight: '400',
//               color: '#0F1111',
//               margin: '0 0 8px 0'
//             }}>
//               {selectedCategory ? `${selectedCategory}` : 'All Products'}
//             </h1>
//             <div style={{
//               fontSize: '14px',
//               color: '#565959'
//             }}>
//               Showing {sortedProducts.length} products
//               {searchTerm && ` for "${searchTerm}"`}
//             </div>
//           </div>

//           {/* Sort Bar */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '16px',
//             padding: '12px 16px',
//             backgroundColor: '#F7F8F8',
//             borderRadius: '4px'
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '16px'
//             }}>
//               <span style={{
//                 fontSize: '14px',
//                 color: '#0F1111',
//                 fontWeight: '600'
//               }}>
//                 Sort by:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 style={{
//                   padding: '6px 8px',
//                   border: '1px solid #D5D9D9',
//                   borderRadius: '4px',
//                   fontSize: '14px',
//                   backgroundColor: '#FFFFFF',
//                   color: '#0F1111',
//                   fontFamily: 'inherit'
//                 }}
//               >
//                 <option value="name">Popularity</option>
//                 <option value="price_low">Price -- Low to High</option>
//                 <option value="price_high">Price -- High to Low</option>
//                 <option value="rating">Newest First</option>
//                 <option value="newest">Discount</option>
//               </select>
//             </div>

//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}>
//               <button
//                 onClick={() => setViewMode('grid')}
//                 style={{
//                   padding: '6px 8px',
//                   border: '1px solid #D5D9D9',
//                   backgroundColor: viewMode === 'grid' ? '#FF9900' : '#FFFFFF',
//                   color: viewMode === 'grid' ? '#FFFFFF' : '#0F1111',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <FaThLarge size={12} />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 style={{
//                   padding: '6px 8px',
//                   border: '1px solid #D5D9D9',
//                   backgroundColor: viewMode === 'list' ? '#FF9900' : '#FFFFFF',
//                   color: viewMode === 'list' ? '#FFFFFF' : '#0F1111',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <FaList size={12} />
//               </button>
//             </div>
//           </div>

//           {/* Products Display */}
//           {sortedProducts.length === 0 ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '60px 20px',
//               backgroundColor: '#FFFFFF',
//               borderRadius: '4px',
//               border: '1px solid #D5D9D9'
//             }}>
//               <h3 style={{
//                 fontSize: '24px',
//                 color: '#0F1111',
//                 marginBottom: '16px'
//               }}>
//                 No products found
//               </h3>
//               <p style={{
//                 color: '#565959',
//                 fontSize: '14px'
//               }}>
//                 Try adjusting your filters or search terms
//               </p>
//             </div>
//           ) : viewMode === 'list' ? (
//             // List View Layout - Show ALL products
//             <div style={{
//               backgroundColor: '#FFFFFF',
//               borderRadius: '8px',
//               border: '1px solid #E5E7EB',
//               overflow: 'hidden'
//             }}>
//               {sortedProducts.map((product) => (
//                 <ProductListItem key={product.id} product={product} />
//               ))}
//             </div>
//           ) : (
//             // Grid View - Show ALL products
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//               gap: '16px'
//             }}>
//               {sortedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;

//////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaList, FaThLarge, FaStar, FaRegStar, FaHeart, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { erpnextApi } from '../api/erpnextApi';
import { addToCart } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';
import Cookies from 'js-cookie';

const ProductsPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchTerm = searchParams.get('search') || '';
  const dispatch = useDispatch();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('name');

  // Loading states for individual buttons
  const [cartLoading, setCartLoading] = useState({});
  const [wishlistLoading, setWishlistLoading] = useState({});

  // Notification state
  const [notification, setNotification] = useState(null);

  // Show notification helper
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [newItems, setNewItems] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  // **🎯 Add to ERPNext Cart**
  const handleAddToCart = useCallback(async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      setCartLoading(prev => ({ ...prev, [product.id]: true }));
      console.log(`🛒 Adding ${product.item_name} to ERPNext cart...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: product.item_code || product.id,
          qty: 1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🛒 Add to Cart API Response:", result);

      if (result.message) {
        // Also add to Redux store for immediate UI update
        dispatch(addToCart({
          ...product,
          quantity: 1
        }));
        
        showNotification(`✅ ${product.item_name} added to cart!`, 'success');
        return true;
      } else {
        throw new Error("Failed to add to cart");
      }

    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      showNotification('❌ Failed to add to cart. Please try again.', 'error');
      return false;
    } finally {
      setCartLoading(prev => ({ ...prev, [product.id]: false }));
    }
  }, [dispatch, showNotification]);

  // **🎯 Add to ERPNext Wishlist**
  const handleAddToWishlist = useCallback(async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      setWishlistLoading(prev => ({ ...prev, [product.id]: true }));
      console.log(`💖 Adding ${product.item_name} to ERPNext wishlist...`);

      const response = await fetch("/api/method/webshop.webshop.doctype.wishlist.wishlist.add_to_wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: product.item_code || product.id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("💖 Add to Wishlist API Response:", result);

      showNotification(`💖 ${product.item_name} added to wishlist!`, 'success');
      
      // Update product state to show it's wishlisted
      setProducts(prev => prev.map(p => 
        p.id === product.id ? { ...p, wished: true } : p
      ));

      return true;

    } catch (error) {
      console.error('❌ Error adding to wishlist:', error);
      showNotification('❌ Failed to add to wishlist. Please try again.', 'error');
      return false;
    } finally {
      setWishlistLoading(prev => ({ ...prev, [product.id]: false }));
    }
  }, [showNotification]);

  // Generate sample products (keeping your existing logic)
  const generateSampleProducts = () => {
    const professionalCategories = [
      {
        name: 'Electronics',
        subcategories: [
          { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&crop=center' },
          { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center' },
          { name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&crop=center' },
          { name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center' },
          { name: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop&crop=center' },
          { name: 'Desktops', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop&crop=center' },
          { name: 'Gaming Laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop&crop=center' },
          { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop&crop=center' }
        ]
      },
      {
        name: 'Fashion',
        subcategories: [
          { name: 'Men\'s Clothing', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center' },
          { name: 'Women\'s Clothing', image: 'https://images.unsplash.com/photo-1494790108755-2616c4f5d81c?w=500&h=500&fit=crop&crop=center' },
          { name: 'Kids Fashion', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=500&fit=crop&crop=center' },
          { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&crop=center' }
        ]
      },
      {
        name: 'Home & Living',
        subcategories: [
          { name: 'Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&crop=center' },
          { name: 'Kitchen Appliances', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&crop=center' },
          { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=500&fit=crop&crop=center' },
          { name: 'Bedding', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop&crop=center' }
        ]
      },
      {
        name: 'Books',
        subcategories: [
          { name: 'Fiction', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&crop=center' },
          { name: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop&crop=center' },
          { name: 'Academic', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center' },
          { name: 'Comics & Manga', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' }
        ]
      },
      {
        name: 'Sports',
        subcategories: [
          { name: 'Fitness Equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center' },
          { name: 'Cricket', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=500&fit=crop&crop=center' },
          { name: 'Football', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=500&fit=crop&crop=center' },
          { name: 'Tennis', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&h=500&fit=crop&crop=center' }
        ]
      }
    ];

    const products = [];
    let productId = 1;

    professionalCategories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        for (let i = 1; i <= 5; i++) {
          products.push({
            id: productId++,
            name: `${subcategory.name.replace(/\s+/g, '-')}-${productId}`,
            item_name: `${subcategory.name} Product ${i}`,
            item_code: `ITEM-${productId}`,
            image: subcategory.image,
            standard_rate: Math.floor(Math.random() * 50000) + 1000,
            originalPrice: Math.floor(Math.random() * 60000) + 55000,
            discount: Math.floor(Math.random() * 50) + 10,
            rating: (Math.random() * 2 + 3).toFixed(1),
            reviews: Math.floor(Math.random() * 1000) + 100,
            category: category.name,
            subcategory: subcategory.name,
            description: `Premium ${subcategory.name} product with advanced features and high-quality materials.`,
            features: [
              'High-quality materials and construction',
              'Advanced technology and features',
              'Professional grade performance',
              '2-year comprehensive warranty',
              'Fast and reliable delivery'
            ],
            brand: ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell', 'Xiaomi', 'OnePlus'][Math.floor(Math.random() * 8)],
            inStock: Math.random() > 0.1,
            wished: false,
            in_cart: false
          });
        }
      });
    });

    return products;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const sampleProducts = generateSampleProducts();
        const sampleCategories = [
          { name: 'Electronics', item_group_name: 'Electronics' },
          { name: 'Fashion', item_group_name: 'Fashion' },
          { name: 'Home & Living', item_group_name: 'Home & Living' },
          { name: 'Books', item_group_name: 'Books' },
          { name: 'Sports', item_group_name: 'Sports' }
        ];

        try {
          const [productsData, categoriesData] = await Promise.all([
            erpnextApi.getItems(selectedCategory ? { item_group: selectedCategory } : {}),
            erpnextApi.getCategories(),
          ]);
          
          if (productsData && productsData.length > 0) {
            const productsWithIds = productsData.map((product, index) => ({
              ...product,
              id: product.id || product.item_code || index + 1,
              name: product.name || `product-${index + 1}`,
              item_code: product.item_code || `ITEM-${index + 1}`,
              wished: false,
              in_cart: false
            }));
            setProducts(productsWithIds);
          } else {
            setProducts(sampleProducts);
          }
          
          if (categoriesData && categoriesData.length > 0) {
            setCategories(categoriesData);
          } else {
            setCategories(sampleCategories);
          }
        } catch (apiError) {
          console.log('API failed, using sample data:', apiError);
          setProducts(sampleProducts);
          setCategories(sampleCategories);
        }
      } catch (error) {
        console.error('Error:', error);
        setProducts(generateSampleProducts());
        setCategories([
          { name: 'Electronics', item_group_name: 'Electronics' },
          { name: 'Fashion', item_group_name: 'Fashion' },
          { name: 'Home & Living', item_group_name: 'Home & Living' },
          { name: 'Books', item_group_name: 'Books' },
          { name: 'Sports', item_group_name: 'Sports' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName) {
      setSearchParams({ category: categoryName });
    } else {
      setSearchParams({});
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = selectedBrands.length === 0 || 
      selectedBrands.some(brand => product.brand?.toLowerCase().includes(brand.toLowerCase()));
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.standard_rate - b.standard_rate;
      case 'price_high':
        return b.standard_rate - a.standard_rate;
      case 'name':
      default:
        return a.item_name.localeCompare(b.item_name);
    }
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
      }
    }
    return stars;
  };

  // **🎯 Enhanced ProductListItem with functional cart and wishlist**
  const ProductListItem = ({ product }) => {
    const isCartLoading = cartLoading[product.id];
    const isWishlistLoading = wishlistLoading[product.id];

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        transition: 'background-color 0.2s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
      >
        {/* **🎯 Functional Wishlist Heart** */}
        <div style={{ marginRight: '12px' }}>
          <button
            onClick={(e) => handleAddToWishlist(product, e)}
            disabled={isWishlistLoading || product.wished}
            style={{
              background: 'none',
              border: 'none',
              cursor: isWishlistLoading || product.wished ? 'not-allowed' : 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isWishlistLoading ? (
              <FaSpinner size={18} style={{ animation: 'spin 1s linear infinite', color: '#FF9900' }} />
            ) : (
              <FaHeart 
                size={18} 
                style={{ 
                  color: product.wished ? '#FF4444' : '#DDD',
                  transition: 'color 0.2s ease'
                }}
              />
            )}
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '140px',
            height: '120px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}>
            <img
              src={product.image || 'https://via.placeholder.com/140x120'}
              alt={product.item_name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
        </Link>

        {/* Product Info */}
        <div style={{
          flex: 1,
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>
          <Link 
            to={`/product/${product.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0F1111',
              margin: '0 0 6px 0',
              lineHeight: '1.3',
              cursor: 'pointer'
            }}>
              {product.item_name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#00A652',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {product.rating} ★
            </div>
            <span style={{
              fontSize: '13px',
              color: '#878787'
            }}>
              {product.reviews?.toLocaleString() || '0'} Ratings & Reviews
            </span>
          </div>

          {/* Features */}
          <div style={{
            fontSize: '13px',
            color: '#212121',
            lineHeight: '1.4'
          }}>
            {product.features?.slice(0, 4).map((feature, index) => (
              <div key={index}>• {feature}</div>
            )) || (
              <>
                <div>• High-quality materials and construction</div>
                <div>• Advanced technology and features</div>
                <div>• Professional grade performance</div>
                <div>• 2-year comprehensive warranty</div>
              </>
            )}
          </div>
        </div>

        {/* Price and Actions */}
        <div style={{
          width: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          flexShrink: 0
        }}>
          {/* Price */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#212121',
              marginBottom: '4px'
            }}>
              ₹{(product.standard_rate || 29990).toLocaleString()}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'flex-end',
              marginBottom: '4px'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#878787',
                textDecoration: 'line-through'
              }}>
                ₹{(product.originalPrice || 49990).toLocaleString()}
              </span>
              <span style={{
                fontSize: '14px',
                color: '#388E3C',
                fontWeight: '600'
              }}>
                {product.discount || 40}% off
              </span>
            </div>
          </div>

          {/* Exchange Offer */}
          <div style={{
            fontSize: '13px',
            color: '#388E3C',
            fontWeight: '500',
            textAlign: 'right',
            marginBottom: '8px'
          }}>
            Upto ₹2,420 Off on Exchange
          </div>

          {/* Bank Offer */}
          <div style={{
            backgroundColor: '#E8F5E8',
            color: '#2E7D32',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '12px'
          }}>
            Bank Offer
          </div>

          {/* **🎯 Functional Add to Cart Button** */}
          <button
            onClick={(e) => handleAddToCart(product, e)}
            disabled={isCartLoading || !product.inStock}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: isCartLoading ? '#F0F0F0' : (product.inStock ? '#FFD814' : '#CCCCCC'),
              border: `1px solid ${isCartLoading ? '#D0D0D0' : (product.inStock ? '#FCD200' : '#AAAAAA')}`,
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: (isCartLoading || !product.inStock) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '8px',
              transition: 'all 0.3s ease',
              opacity: (isCartLoading || !product.inStock) ? 0.7 : 1,
              color: !product.inStock ? '#666666' : '#000000'
            }}
            onMouseOver={(e) => {
              if (!isCartLoading && product.inStock) {
                e.target.style.backgroundColor = '#F7CA00';
              }
            }}
            onMouseOut={(e) => {
              if (!isCartLoading && product.inStock) {
                e.target.style.backgroundColor = '#FFD814';
              }
            }}
          >
            {isCartLoading ? (
              <FaSpinner style={{ animation: 'spin 1s linear infinite' }} size={12} />
            ) : (
              <FaShoppingCart size={12} />
            )}
            {isCartLoading ? 'Adding...' : (!product.inStock ? 'Out of Stock' : 'Add to Cart')}
          </button>

          {/* Add to Compare */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#2874F0',
            cursor: 'pointer'
          }}>
            <input type="checkbox" style={{ marginRight: '4px' }} />
            Add to Compare
          </div>
        </div>
      </div>
    );
  };

  // **🎯 Notification Component**
  const NotificationBar = () => {
    if (!notification) return null;

    const getColor = () => {
      switch (notification.type) {
        case 'success': return '#00A652';
        case 'error': return '#B12704';
        case 'warning': return '#FF9900';
        default: return '#007185';
      }
    };

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: getColor(),
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '400px'
      }}>
        {notification.message}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '18px',
        color: '#666666',
        backgroundColor: '#FFFFFF'
      }}>
        <FaSpinner 
          size={40} 
          color="#FF9900" 
          style={{ 
            animation: 'spin 1s linear infinite',
            marginRight: '16px'
          }} 
        />
        Loading products...
      </div>
    );
  }

  return (
    <>
      <NotificationBar />
      <div style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh'
      }}>
        
        {/* Container with Flex Layout */}
        <div style={{
          display: 'flex',
          maxWidth: '1400px',
          margin: '0 auto',
          gap: '24px',
          padding: '20px'
        }}>
          
          {/* Sidebar */}
          <div style={{
            position: 'sticky',
            top: '20px',
            alignSelf: 'flex-start',
            width: '240px',
            height: 'fit-content',
            maxHeight: 'calc(100vh - 40px)',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            padding: '16px 0 16px 16px',
            fontSize: '14px',
            lineHeight: '20px',
            flexShrink: 0,
            overflowY: 'auto',
            borderRight: '1px solid #E7E7E7',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontFamily: '"Amazon Ember", Arial, sans-serif'
          }}>
            
            {/* Category Section */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#0F1111',
                margin: '0 0 8px 0',
                lineHeight: '24px'
              }}>
                Categories
              </h4>
              
              <div style={{ paddingLeft: '16px' }}>
                <div style={{
                  padding: '4px 0',
                  fontSize: '13px',
                  color: !selectedCategory ? '#007185' : '#565959',
                  cursor: 'pointer',
                  lineHeight: '16px',
                  fontWeight: !selectedCategory ? '600' : '400'
                }}
                onClick={() => handleCategoryChange('')}>
                  All Products ({products.length})
                </div>
                
                {categories.map((category) => {
                  const categoryCount = products.filter(p => p.category === category.name).length;
                  return (
                    <div key={category.name} style={{
                      padding: '4px 0',
                      fontSize: '13px',
                      color: selectedCategory === category.name ? '#007185' : '#565959',
                      cursor: 'pointer',
                      lineHeight: '16px',
                      fontWeight: selectedCategory === category.name ? '600' : '400'
                    }}
                    onClick={() => handleCategoryChange(category.name)}>
                      {category.item_group_name || category.name} ({categoryCount})
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#0F1111',
                margin: '0 0 8px 0',
                lineHeight: '24px'
              }}>
                Brands
              </h4>
              {['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell', 'Xiaomi', 'OnePlus'].map((brand) => (
                <label key={brand} style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  lineHeight: '20px'
                }}>
                  <input 
                    type="checkbox" 
                    style={{ 
                      marginRight: '8px',
                      transform: 'scale(1.1)',
                      accentColor: '#FF9900'
                    }}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span style={{ color: '#0F1111', fontSize: '14px' }}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#0F1111',
                margin: '0 0 8px 0',
                lineHeight: '24px'
              }}>
                Price
              </h4>
              {[
                'Under ₹1,000',
                '₹1,000 - ₹5,000',
                '₹5,000 - ₹10,000',
                '₹10,000 - ₹25,000',
                'Over ₹25,000'
              ].map((range) => (
                <div key={range} style={{
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: '14px',
                  color: selectedPriceRange === range ? '#007185' : '#0F1111',
                  lineHeight: '20px',
                  fontWeight: selectedPriceRange === range ? '600' : '400'
                }}
                onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}>
                  {range}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            flex: 1,
            minHeight: '0'
          }}>
            {/* Page Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '400',
                color: '#0F1111',
                margin: '0 0 8px 0'
              }}>
                {selectedCategory ? `${selectedCategory}` : 'All Products'}
              </h1>
              <div style={{
                fontSize: '14px',
                color: '#565959'
              }}>
                Showing {sortedProducts.length} products
                {searchTerm && ` for "${searchTerm}"`}
              </div>
            </div>

            {/* Sort Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '12px 16px',
              backgroundColor: '#F7F8F8',
              borderRadius: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#0F1111',
                  fontWeight: '600'
                }}>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '6px 8px',
                    border: '1px solid #D5D9D9',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F1111',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="name">Popularity</option>
                  <option value="price_low">Price -- Low to High</option>
                  <option value="price_high">Price -- High to Low</option>
                  <option value="rating">Newest First</option>
                  <option value="newest">Discount</option>
                </select>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '6px 8px',
                    border: '1px solid #D5D9D9',
                    backgroundColor: viewMode === 'grid' ? '#FF9900' : '#FFFFFF',
                    color: viewMode === 'grid' ? '#FFFFFF' : '#0F1111',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <FaThLarge size={12} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '6px 8px',
                    border: '1px solid #D5D9D9',
                    backgroundColor: viewMode === 'list' ? '#FF9900' : '#FFFFFF',
                    color: viewMode === 'list' ? '#FFFFFF' : '#0F1111',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <FaList size={12} />
                </button>
              </div>
            </div>

            {/* Products Display */}
            {sortedProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                border: '1px solid #D5D9D9'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  color: '#0F1111',
                  marginBottom: '16px'
                }}>
                  No products found
                </h3>
                <p style={{
                  color: '#565959',
                  fontSize: '14px'
                }}>
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : viewMode === 'list' ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                overflow: 'hidden'
              }}>
                {sortedProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CSS for animations */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ProductsPage;
