// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaStar, FaArrowLeft, FaHeart, FaShare } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   // Generate same sample products as in ProductsPage
//   const generateSampleProducts = () => {
//     const professionalCategories = [
//       {
//         name: 'Electronics',
//         subcategories: [
//           { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop&crop=center' },
//           { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center' },
//           { name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop&crop=center' },
//           { name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop&crop=center' }
//         ]
//       },
//       {
//         name: 'Fashion',
//         subcategories: [
//           { name: 'Men\'s Clothing', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center' },
//           { name: 'Women\'s Clothing', image: 'https://images.unsplash.com/photo-1494790108755-2616c4f5d81c?w=150&h=150&fit=crop&crop=center' }
//         ]
//       }
//     ];

//     const products = [];
//     let productId = 1;

//     professionalCategories.forEach(category => {
//       category.subcategories.forEach(subcategory => {
//         for (let i = 1; i <= 3; i++) {
//           products.push({
//             id: productId++,
//             item_name: `${subcategory.name} Product ${i}`,
//             image: subcategory.image,
//             standard_rate: Math.floor(Math.random() * 50000) + 1000,
//             originalPrice: Math.floor(Math.random() * 60000) + 55000,
//             discount: Math.floor(Math.random() * 50) + 10,
//             rating: (Math.random() * 2 + 3).toFixed(1),
//             reviews: Math.floor(Math.random() * 1000) + 100,
//             category: category.name,
//             subcategory: subcategory.name,
//             description: `Premium ${subcategory.name} product with advanced features and high-quality materials. Perfect for professional use.`,
//             features: [
//               'High-quality materials',
//               'Advanced technology',
//               'Professional grade',
//               'Warranty included',
//               'Fast shipping available'
//             ],
//             inStock: Math.random() > 0.1,
//             brand: ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell'][Math.floor(Math.random() * 6)]
//           });
//         }
//       });
//     });

//     return products;
//   };

//   useEffect(() => {
//     const products = generateSampleProducts();
//     const foundProduct = products.find(p => p.id.toString() === id);
    
//     if (foundProduct) {
//       setProduct(foundProduct);
//     }
//     setLoading(false);
//   }, [id]);

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//         fontSize: '18px',
//         color: '#666666'
//       }}>
//         Loading product details...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//         fontSize: '18px',
//         color: '#666666'
//       }}>
//         <h2>Product not found</h2>
//         <button
//           onClick={() => navigate('/products')}
//           style={{
//             padding: '12px 24px',
//             backgroundColor: '#0F1111',
//             color: '#FFFFFF',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//             marginTop: '16px'
//           }}
//         >
//           Back to Products
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       minHeight: '100vh',
//       padding: '20px'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto'
//       }}>
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             padding: '8px 16px',
//             backgroundColor: 'transparent',
//             border: '1px solid #D5D9D9',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             marginBottom: '20px',
//             color: '#0F1111'
//           }}
//         >
//           <FaArrowLeft size={14} />
//           Back
//         </button>

//         {/* Product Detail */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: '40px',
//           alignItems: 'start'
//         }}>
//           {/* Product Image */}
//           <div style={{
//             backgroundColor: '#F7F8F8',
//             borderRadius: '8px',
//             padding: '20px',
//             textAlign: 'center'
//           }}>
//             <img
//               src={product.image}
//               alt={product.item_name}
//               style={{
//                 width: '100%',
//                 maxWidth: '400px',
//                 height: 'auto',
//                 borderRadius: '8px'
//               }}
//             />
//           </div>

//           {/* Product Info */}
//           <div>
//             <h1 style={{
//               fontSize: '28px',
//               fontWeight: '400',
//               color: '#0F1111',
//               margin: '0 0 16px 0',
//               lineHeight: '1.3'
//             }}>
//               {product.item_name}
//             </h1>

//             {/* Brand */}
//             <div style={{
//               fontSize: '14px',
//               color: '#007185',
//               marginBottom: '12px'
//             }}>
//               Brand: {product.brand}
//             </div>

//             {/* Rating */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               marginBottom: '16px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '2px'
//               }}>
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     size={16}
//                     color={i < Math.floor(product.rating) ? '#FF9900' : '#E0E0E0'}
//                   />
//                 ))}
//               </div>
//               <span style={{ fontSize: '14px', color: '#0F1111' }}>
//                 {product.rating} ({product.reviews} reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <div style={{ marginBottom: '20px' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 marginBottom: '4px'
//               }}>
//                 <span style={{
//                   fontSize: '28px',
//                   fontWeight: '400',
//                   color: '#B12704'
//                 }}>
//                   ₹{product.standard_rate.toLocaleString()}
//                 </span>
//                 <span style={{
//                   fontSize: '14px',
//                   color: '#565959',
//                   textDecoration: 'line-through'
//                 }}>
//                   ₹{product.originalPrice?.toLocaleString()}
//                 </span>
//               </div>
//               <div style={{
//                 fontSize: '14px',
//                 color: '#00A652',
//                 fontWeight: '600'
//               }}>
//                 Save {product.discount}% (₹{(product.originalPrice - product.standard_rate).toLocaleString()})
//               </div>
//             </div>

//             {/* Stock Status */}
//             <div style={{
//               fontSize: '18px',
//               color: product.inStock ? '#00A652' : '#B12704',
//               fontWeight: '600',
//               marginBottom: '20px'
//             }}>
//               {product.inStock ? 'In Stock' : 'Out of Stock'}
//             </div>

//             {/* Description */}
//             <div style={{ marginBottom: '20px' }}>
//               <h3 style={{
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 color: '#0F1111',
//                 marginBottom: '8px'
//               }}>
//                 About this item
//               </h3>
//               <p style={{
//                 color: '#565959',
//                 lineHeight: '1.5',
//                 marginBottom: '12px'
//               }}>
//                 {product.description}
//               </p>
//               <ul style={{
//                 color: '#565959',
//                 paddingLeft: '20px'
//               }}>
//                 {product.features.map((feature, index) => (
//                   <li key={index} style={{ marginBottom: '4px' }}>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Quantity and Add to Cart */}
//             {product.inStock && (
//               <div style={{
//                 border: '1px solid #D5D9D9',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 backgroundColor: '#F7F8F8'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '16px',
//                   marginBottom: '16px'
//                 }}>
//                   <label style={{
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     color: '#0F1111'
//                   }}>
//                     Quantity:
//                   </label>
//                   <select
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #D5D9D9',
//                       borderRadius: '4px',
//                       backgroundColor: '#FFFFFF'
//                     }}
//                   >
//                     {[...Array(10)].map((_, i) => (
//                       <option key={i + 1} value={i + 1}>
//                         {i + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   gap: '12px'
//                 }}>
//                   <button
//                     style={{
//                       flex: 1,
//                       padding: '12px',
//                       backgroundColor: '#FFD814',
//                       border: '1px solid #FCD200',
//                       borderRadius: '20px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                   <button
//                     style={{
//                       flex: 1,
//                       padding: '12px',
//                       backgroundColor: '#FF9900',
//                       border: '1px solid #FF9900',
//                       borderRadius: '20px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       color: '#FFFFFF',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Buy Now
//                   </button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div style={{
//                   display: 'flex',
//                   gap: '16px',
//                   marginTop: '16px',
//                   justifyContent: 'center'
//                 }}>
//                   <button style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     padding: '8px 16px',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: '#007185',
//                     cursor: 'pointer',
//                     fontSize: '14px'
//                   }}>
//                     <FaHeart size={14} />
//                     Add to Wishlist
//                   </button>
//                   <button style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     padding: '8px 16px',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: '#007185',
//                     cursor: 'pointer',
//                     fontSize: '14px'
//                   }}>
//                     <FaShare size={14} />
//                     Share
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

///////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaStar, FaArrowLeft, FaHeart, FaShare, FaShoppingCart } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   // Generate SAME sample products as in ProductsPage
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
//         for (let i = 1; i <= 3; i++) {
//           products.push({
//             id: productId++,
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
//               'Fast and reliable delivery',
//               '24/7 customer support',
//               'Easy returns and exchanges',
//               'Eco-friendly packaging'
//             ],
//             brand: ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell', 'Xiaomi', 'OnePlus'][Math.floor(Math.random() * 8)],
//             inStock: Math.random() > 0.1,
//             specifications: {
//               'Model': `${subcategory.name.replace(/\s+/g, '')}-${i}${Math.floor(Math.random() * 1000)}`,
//               'Brand': ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell'][Math.floor(Math.random() * 6)],
//               'Color': ['Black', 'White', 'Silver', 'Blue', 'Red'][Math.floor(Math.random() * 5)],
//               'Weight': `${(Math.random() * 5 + 0.5).toFixed(1)} kg`,
//               'Dimensions': `${Math.floor(Math.random() * 50 + 20)} x ${Math.floor(Math.random() * 30 + 15)} x ${Math.floor(Math.random() * 10 + 2)} cm`,
//               'Power': `${Math.floor(Math.random() * 200 + 50)}W`,
//               'Connectivity': 'Wi-Fi, Bluetooth, USB',
//               'Operating System': category.name === 'Electronics' ? 'Windows 11' : 'N/A'
//             }
//           });
//         }
//       });
//     });

//     return products;
//   };

//   useEffect(() => {
//     const products = generateSampleProducts();
//     const foundProduct = products.find(p => p.id.toString() === id);
    
//     if (foundProduct) {
//       setProduct(foundProduct);
//     }
//     setLoading(false);
//   }, [id]);

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//         fontSize: '18px',
//         color: '#666666'
//       }}>
//         Loading product details...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//         fontSize: '18px',
//         color: '#666666'
//       }}>
//         <h2>Product not found</h2>
//         <p>The product you're looking for doesn't exist.</p>
//         <button
//           onClick={() => navigate('/trade')}
//           style={{
//             padding: '12px 24px',
//             backgroundColor: '#0F1111',
//             color: '#FFFFFF',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//             marginTop: '16px'
//           }}
//         >
//           Back to Products
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       minHeight: '100vh',
//       padding: '20px'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto'
//       }}>
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             padding: '8px 16px',
//             backgroundColor: 'transparent',
//             border: '1px solid #D5D9D9',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             marginBottom: '20px',
//             color: '#0F1111'
//           }}
//         >
//           <FaArrowLeft size={14} />
//           Back
//         </button>

//         {/* Product Detail */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: '40px',
//           alignItems: 'start'
//         }}>
//           {/* Product Image */}
//           <div style={{
//             backgroundColor: '#F7F8F8',
//             borderRadius: '8px',
//             padding: '20px',
//             textAlign: 'center'
//           }}>
//             <img
//               src={product.image}
//               alt={product.item_name}
//               style={{
//                 width: '100%',
//                 maxWidth: '500px',
//                 height: 'auto',
//                 borderRadius: '8px'
//               }}
//             />
//           </div>

//           {/* Product Info */}
//           <div>
//             <h1 style={{
//               fontSize: '28px',
//               fontWeight: '400',
//               color: '#0F1111',
//               margin: '0 0 16px 0',
//               lineHeight: '1.3'
//             }}>
//               {product.item_name}
//             </h1>

//             {/* Brand */}
//             <div style={{
//               fontSize: '16px',
//               color: '#007185',
//               marginBottom: '12px',
//               fontWeight: '600'
//             }}>
//               Brand: {product.brand}
//             </div>

//             {/* Rating */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               marginBottom: '16px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '2px'
//               }}>
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     size={16}
//                     color={i < Math.floor(product.rating) ? '#FF9900' : '#E0E0E0'}
//                   />
//                 ))}
//               </div>
//               <span style={{ fontSize: '14px', color: '#0F1111' }}>
//                 {product.rating} ({product.reviews} reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <div style={{ marginBottom: '20px' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 marginBottom: '4px'
//               }}>
//                 <span style={{
//                   fontSize: '28px',
//                   fontWeight: '400',
//                   color: '#B12704'
//                 }}>
//                   ₹{product.standard_rate.toLocaleString()}
//                 </span>
//                 <span style={{
//                   fontSize: '14px',
//                   color: '#565959',
//                   textDecoration: 'line-through'
//                 }}>
//                   ₹{product.originalPrice?.toLocaleString()}
//                 </span>
//               </div>
//               <div style={{
//                 fontSize: '14px',
//                 color: '#00A652',
//                 fontWeight: '600'
//               }}>
//                 Save {product.discount}% (₹{(product.originalPrice - product.standard_rate).toLocaleString()})
//               </div>
//             </div>

//             {/* Stock Status */}
//             <div style={{
//               fontSize: '18px',
//               color: product.inStock ? '#00A652' : '#B12704',
//               fontWeight: '600',
//               marginBottom: '20px'
//             }}>
//               {product.inStock ? 'In Stock' : 'Out of Stock'}
//             </div>

//             {/* Description */}
//             <div style={{ marginBottom: '20px' }}>
//               <h3 style={{
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 color: '#0F1111',
//                 marginBottom: '8px'
//               }}>
//                 About this item
//               </h3>
//               <p style={{
//                 color: '#565959',
//                 lineHeight: '1.5',
//                 marginBottom: '12px'
//               }}>
//                 {product.description}
//               </p>
//               <ul style={{
//                 color: '#565959',
//                 paddingLeft: '20px'
//               }}>
//                 {product.features.slice(0, 6).map((feature, index) => (
//                   <li key={index} style={{ marginBottom: '4px' }}>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Specifications */}
//             <div style={{ marginBottom: '20px' }}>
//               <h3 style={{
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 color: '#0F1111',
//                 marginBottom: '8px'
//               }}>
//                 Specifications
//               </h3>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 2fr',
//                 gap: '8px',
//                 backgroundColor: '#F7F8F8',
//                 padding: '12px',
//                 borderRadius: '6px'
//               }}>
//                 {Object.entries(product.specifications).map(([key, value]) => (
//                   <React.Fragment key={key}>
//                     <div style={{
//                       fontWeight: '600',
//                       color: '#0F1111',
//                       fontSize: '14px'
//                     }}>
//                       {key}:
//                     </div>
//                     <div style={{
//                       color: '#565959',
//                       fontSize: '14px'
//                     }}>
//                       {value}
//                     </div>
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity and Add to Cart */}
//             {product.inStock && (
//               <div style={{
//                 border: '1px solid #D5D9D9',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 backgroundColor: '#F7F8F8'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '16px',
//                   marginBottom: '16px'
//                 }}>
//                   <label style={{
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     color: '#0F1111'
//                   }}>
//                     Quantity:
//                   </label>
//                   <select
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #D5D9D9',
//                       borderRadius: '4px',
//                       backgroundColor: '#FFFFFF'
//                     }}
//                   >
//                     {[...Array(10)].map((_, i) => (
//                       <option key={i + 1} value={i + 1}>
//                         {i + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   gap: '12px'
//                 }}>
//                   <button
//                     onClick={() => alert(`Added ${quantity} ${product.item_name} to cart`)}
//                     style={{
//                       flex: 1,
//                       padding: '12px',
//                       backgroundColor: '#FFD814',
//                       border: '1px solid #FCD200',
//                       borderRadius: '20px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '8px'
//                     }}
//                   >
//                     <FaShoppingCart size={16} />
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={() => alert(`Proceeding to buy ${quantity} ${product.item_name}`)}
//                     style={{
//                       flex: 1,
//                       padding: '12px',
//                       backgroundColor: '#FF9900',
//                       border: '1px solid #FF9900',
//                       borderRadius: '20px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       color: '#FFFFFF',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Buy Now
//                   </button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div style={{
//                   display: 'flex',
//                   gap: '16px',
//                   marginTop: '16px',
//                   justifyContent: 'center'
//                 }}>
//                   <button style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     padding: '8px 16px',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: '#007185',
//                     cursor: 'pointer',
//                     fontSize: '14px'
//                   }}>
//                     <FaHeart size={14} />
//                     Add to Wishlist
//                   </button>
//                   <button style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     padding: '8px 16px',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: '#007185',
//                     cursor: 'pointer',
//                     fontSize: '14px'
//                   }}>
//                     <FaShare size={14} />
//                     Share
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;
//////////////////////////////////////////////////////////////////////////////////



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaArrowLeft, FaHeart, FaShare, FaShoppingCart } from 'react-icons/fa';
import { COLORS } from '../constants/colors';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // **🎯 Your ERPNext API Call Function**
  const get_filtered_products_webshop = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    const formdata = new FormData();
    formdata.append("query_args", `{"field_filters":{},"attribute_filters":{},"item_group":null,"start":null,"from_filters":false}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    try {
      console.log("🔥 Fetching product details from ERPNext...");
      
      const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions);
      const result = await response.json();
      
      if (result.message && result.message.items && result.message.items.length > 0) {
        console.log("🔥 ERPNext Products:", result.message.items);
        
        // Transform ERPNext data
        const transformedProducts = result.message.items.map(item => ({
          // IDs and Names
          id: item.name || item.item_code,
          item_name: item.item_name || item.web_item_name,
          web_item_name: item.web_item_name,
          item_code: item.item_code,
          
          // Image handling
          image: item.website_image ? 
                 `${window.location.origin}${item.website_image}` : 
                 'https://via.placeholder.com/500x500?text=No+Image',
          
          // Real pricing from ERPNext
          standard_rate: item.price_list_rate || 0,
          originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
          discount: item.formatted_mrp && item.price_list_rate ? 
                   Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - item.price_list_rate) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
          formatted_price: item.formatted_price,
          formatted_mrp: item.formatted_mrp,
          
          // Categories and details
          category: item.item_group || 'General',
          brand: item.brand || 'Generic',
          
          // Stock and cart status
          inStock: item.in_stock,
          in_cart: item.in_cart,
          on_backorder: item.on_backorder,
          
          // Description
          description: item.short_description || 
                      item.web_long_description || 
                      `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category. High-quality product with excellent features and reliable performance.`,
          
          // ERPNext specific fields
          route: item.route,
          has_variants: item.has_variants,
          variant_of: item.variant_of,
          website_warehouse: item.website_warehouse,
          wished: item.wished,
          ranking: item.ranking,
          
          // Additional product details
          features: [
            'High-quality materials and construction',
            'Professional grade performance', 
            'Reliable and durable design',
            'Excellent customer support',
            'Fast delivery available',
            'Easy returns and exchanges',
            item.has_variants ? 'Multiple variants available' : 'Single variant product',
            item.in_stock ? 'Currently in stock' : 'Limited availability'
          ].filter(Boolean),
          
          specifications: {
            'Item Code': item.item_code,
            'Brand': item.brand || 'Generic',
            'Category': item.item_group || 'General',
            'Stock Status': item.in_stock ? 'In Stock' : 'Limited Stock',
            'Variants': item.has_variants ? 'Available' : 'Single Product',
            'Warehouse': item.website_warehouse || 'Default',
            'Route': item.route
          }
        }));
        
        // Find product by ID, route, or name
        const foundProduct = transformedProducts.find(p => 
          p.id === id || 
          p.route === id || 
          p.item_code === id ||
          p.name === id
        );
        
        if (foundProduct) {
          console.log("✅ Product found:", foundProduct);
          setProduct(foundProduct);
        } else {
          console.log("❌ Product not found for ID:", id);
          setProduct(null);
        }
        
      } else {
        console.log("❌ No products found in API response");
        setProduct(null);
      }
    } catch (error) {
      console.error('❌ Error fetching product details:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Loading product details for ID:", id);
    get_filtered_products_webshop();
  }, [id]);

  // **🎯 Add to Cart Function**
  const handleAddToCart = async () => {
    try {
      // You can implement actual cart API here
      console.log(`Adding ${quantity} x ${product.item_name} to cart`);
      alert(`Added ${quantity} x ${product.item_name} to cart!`);
      
      // Example cart API call (implement based on your backend)
      // const response = await fetch('/api/cart/add', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     item_code: product.item_code,
      //     quantity: quantity
      //   })
      // });
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart. Please try again.');
    }
  };

  // **🎯 Buy Now Function**
  const handleBuyNow = () => {
    console.log(`Buying ${quantity} x ${product.item_name}`);
    // Navigate to checkout or implement buy now logic
    alert(`Proceeding to buy ${quantity} x ${product.item_name}!`);
    // navigate('/checkout', { state: { product, quantity } });
  };

  // **🎯 Render Stars Function**
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} size={16} color="#FF9900" />);
      } else {
        stars.push(<FaRegStar key={i} size={16} color="#FF9900" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '18px',
        color: '#666666'
      }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '18px',
        color: '#666666'
      }}>
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist or may have been removed.</p>
        <button
          onClick={() => navigate('/trade')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#0F1111',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: '1px solid #D5D9D9',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px',
            color: '#0F1111'
          }}
        >
          <FaArrowLeft size={14} />
          Back
        </button>

        {/* Product Detail */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Product Image */}
          <div style={{
            backgroundColor: '#F7F8F8',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <img
              src={product.image}
              alt={product.item_name}
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                borderRadius: '8px'
              }}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.item_name.substring(0, 10))}`;
              }}
            />
            
            {/* Product Badge */}
            {(product.wished || product.has_variants || product.in_cart) && (
              <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                marginTop: '12px'
              }}>
                {product.wished && (
                  <span style={{
                    backgroundColor: '#E91E63',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    WISHLIST
                  </span>
                )}
                {product.has_variants && (
                  <span style={{
                    backgroundColor: '#2196F3',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    VARIANTS
                  </span>
                )}
                {product.in_cart && (
                  <span style={{
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    IN CART
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '400',
              color: '#0F1111',
              margin: '0 0 16px 0',
              lineHeight: '1.3'
            }}>
              {product.item_name}
            </h1>

            {/* Brand */}
            <div style={{
              fontSize: '16px',
              color: '#007185',
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              Brand: {product.brand}
            </div>

            {/* Item Code */}
            <div style={{
              fontSize: '14px',
              color: '#565959',
              marginBottom: '16px'
            }}>
              Item Code: {product.item_code}
            </div>

            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '4px'
              }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: '400',
                  color: '#B12704'
                }}>
                  {product.formatted_price || `₹${product.standard_rate.toLocaleString()}`}
                </span>
                {product.originalPrice && product.originalPrice > product.standard_rate && (
                  <span style={{
                    fontSize: '14px',
                    color: '#565959',
                    textDecoration: 'line-through'
                  }}>
                    {product.formatted_mrp || `₹${product.originalPrice.toLocaleString()}`}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <div style={{
                  fontSize: '14px',
                  color: '#00A652',
                  fontWeight: '600'
                }}>
                  Save {product.discount}% {product.originalPrice && `(₹${(product.originalPrice - product.standard_rate).toLocaleString()})`}
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div style={{
              fontSize: '18px',
              color: product.inStock ? '#00A652' : '#B12704',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              {product.inStock ? 'In Stock' : product.on_backorder ? 'On Backorder' : 'Out of Stock'}
            </div>

            {/* Description */}
            {/* <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0F1111',
                marginBottom: '8px'
              }}>
                About this item
              </h3>
              <p style={{
                color: '#565959',
                lineHeight: '1.5',
                marginBottom: '12px'
              }}>
                {product.description}
              </p>
              <ul style={{
                color: '#565959',
                paddingLeft: '20px'
              }}>
                {product.features.slice(0, 6).map((feature, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Specifications */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#0F1111',
                marginBottom: '8px'
              }}>
                Specifications
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '8px',
                backgroundColor: '#F7F8F8',
                padding: '12px',
                borderRadius: '6px'
              }}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div style={{
                      fontWeight: '600',
                      color: '#0F1111',
                      fontSize: '14px'
                    }}>
                      {key}:
                    </div>
                    <div style={{
                      color: '#565959',
                      fontSize: '14px'
                    }}>
                      {value}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div style={{
                border: '1px solid #D5D9D9',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#F7F8F8'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#0F1111'
                  }}>
                    Quantity:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{
                      padding: '8px',
                      border: '1px solid #D5D9D9',
                      borderRadius: '4px',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FFD814',
                      border: '1px solid #FCD200',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#F7CA00'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FFD814'}
                  >
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#FF9900',
                      border: '1px solid #FF9900',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#E88B00'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FF9900'}
                  >
                    Buy Now
                  </button>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '16px',
                  justifyContent: 'center'
                }}>
                  <button 
                    onClick={() => alert('Added to wishlist!')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#007185',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <FaHeart size={14} />
                    Add to Wishlist
                  </button>
                  <button 
                    onClick={() => {
                      navigator.share ? 
                        navigator.share({
                          title: product.item_name,
                          text: product.description,
                          url: window.location.href
                        }) : 
                        alert('Share feature not supported on this browser')
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#007185',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <FaShare size={14} />
                    Share
                  </button>
                </div>
              </div>
            )}

            {/* Out of Stock Message */}
            {!product.inStock && (
              <div style={{
                border: '1px solid #D5D9D9',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#F7F8F8',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#B12704', marginBottom: '8px' }}>
                  Currently Unavailable
                </h3>
                <p style={{ color: '#565959', fontSize: '14px' }}>
                  This item is currently out of stock. Please check back later or contact us for availability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

