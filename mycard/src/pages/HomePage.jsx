// import React, { useEffect, useState } from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
// import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { erpnextApi } from '../api/erpnextApi';
// import { COLORS } from '../constants/colors';

// const ProductsPage = () => {

//    const get_filtered_products_webshop = async() => {
//       const myHeaders = new Headers();
// myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

// const formdata = new FormData();
// formdata.append("query_args", "{\"field_filters\":{},\"attribute_filters\":{},\"item_group\":null,\"start\":null,\"from_filters\":false}");

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: formdata,
//   redirect: "follow"
// };

// fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions)
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
//   }

//   useEffect(() => {
//     console.log("calling the function")
//     get_filtered_products_webshop();
//   }, []);
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const category = searchParams.get('category');
//   const searchTerm = searchParams.get('search') || '';
  
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(category || '');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('name');
//   const [showHomepageView, setShowHomepageView] = useState(!category);

//   // Filter States (shared between homepage and products view)
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [primeOnly, setPrimeOnly] = useState(false);
//   const [fastDelivery, setFastDelivery] = useState(false);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [newItems, setNewItems] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('');
//   const [activeHomeCategory, setActiveHomeCategory] = useState('Electronics');



//   console.log("Home page rendered");

//   // Professional Categories with Subcategories and Images
//   const professionalCategories = [
//     {
//       name: 'Electronics',
//       subcategories: [
//         { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Desktops', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Gaming Laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&h=150&fit=crop&crop=center' }
//       ]
//     },
//     {
//       name: 'Fashion',
//       subcategories: [
//         { name: 'Men\'s Clothing', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Women\'s Clothing', image: 'https://images.unsplash.com/photo-1494790108755-2616c4f5d81c?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Kids Fashion', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Accessories', image: 'https://images.unsplash.com/photo-1506629905607-b5bd9d0ea2bd?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Bags & Luggage', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Eyewear', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=150&h=150&fit=crop&crop=center' }
//       ]
//     },
//     {
//       name: 'Home & Living',
//       subcategories: [
//         { name: 'Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Kitchen Appliances', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Bedding', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Lighting', image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Storage', image: 'https://images.unsplash.com/photo-1558618047-3c8b9c8d2e50?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Garden & Outdoor', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Bath & Laundry', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center' }
//       ]
//     },
//     {
//       name: 'Books',
//       subcategories: [
//         { name: 'Fiction', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Academic', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Comics & Manga', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Children\'s Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Self Help', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Biography', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Health & Fitness', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center' }
//       ]
//     },
//     {
//       name: 'Sports',
//       subcategories: [
//         { name: 'Fitness Equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Cricket', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Football', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Tennis', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Running', image: 'https://images.unsplash.com/photo-1544963950-a1c5500d7a7a?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Cycling', image: 'https://images.unsplash.com/photo-1558618047-3c8b9c8d2e50?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Swimming', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center' },
//         { name: 'Outdoor Sports', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=150&h=150&fit=crop&crop=center' }
//       ]
//     }
//   ];

//   // Generate 100+ Sample Products
//   const generateSampleProducts = () => {
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
//             badge: i === 1 ? 'BESTSELLER' : (i === 2 ? 'NEW LAUNCH' : 'LATEST TECH'),
//             description: `Premium ${subcategory.name} product with advanced features`,
//             brand: ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell'][Math.floor(Math.random() * 6)],
//             inStock: Math.random() > 0.1
//           });
//         }
//       });
//     });

//     return products;
//   };

//   const sampleProducts = generateSampleProducts();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const sampleProducts = generateSampleProducts();
        
//         try {
//           const [productsData, categoriesData] = await Promise.all([
//             erpnextApi.getItems(selectedCategory ? { item_group: selectedCategory } : {}),
//             erpnextApi.getCategories(),
//           ]);
          
//           if (productsData && productsData.length > 0) {
//             setProducts(productsData);
//           } else {
//             setProducts(sampleProducts);
//           }
          
//           if (categoriesData && categoriesData.length > 0) {
//             setCategories(categoriesData);
//           } else {
//             setCategories(professionalCategories);
//           }
//         } catch (apiError) {
//           console.log('API failed, using sample data:', apiError);
//           setProducts(sampleProducts);
//           setCategories(professionalCategories);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         setProducts(generateSampleProducts());
//         setCategories(professionalCategories);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCategory]);

//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setActiveHomeCategory(categoryName);
//     setShowHomepageView(false);
//     if (categoryName) {
//       setSearchParams({ category: categoryName });
//     } else {
//       setSearchParams({});
//       setShowHomepageView(true);
//     }
//   };

//   const handleBrandToggle = (brand) => {
//     setSelectedBrands(prev => 
//       prev.includes(brand) 
//         ? prev.filter(b => b !== brand)
//         : [...prev, brand]
//     );
//   };

//   // Filter products based on all criteria (works for both views)
//   const getFilteredProducts = (categoryFilter = '') => {
//     const baseProducts = categoryFilter ? 
//       sampleProducts.filter(p => p.category === categoryFilter) : 
//       (selectedCategory ? sampleProducts.filter(p => p.category === selectedCategory) : sampleProducts);
    
//     return baseProducts.filter(product => {
//       const matchesSearch = searchTerm === '' || 
//         product.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesBrand = selectedBrands.length === 0 || 
//         selectedBrands.some(brand => product.brand?.toLowerCase().includes(brand.toLowerCase()));
      
//       const matchesPrime = !primeOnly || product.badge === 'BESTSELLER';
//       const matchesDelivery = !fastDelivery || product.inStock;
//       const matchesRating = selectedRating === 0 || parseFloat(product.rating) >= selectedRating;
//       const matchesCondition = !newItems || product.badge === 'NEW LAUNCH';
      
//       let matchesPrice = true;
//       if (selectedPriceRange) {
//         const price = product.standard_rate;
//         switch (selectedPriceRange) {
//           case 'Under ₹1,000':
//             matchesPrice = price < 1000;
//             break;
//           case '₹1,000 - ₹5,000':
//             matchesPrice = price >= 1000 && price <= 5000;
//             break;
//           case '₹5,000 - ₹10,000':
//             matchesPrice = price >= 5000 && price <= 10000;
//             break;
//           case '₹10,000 - ₹25,000':
//             matchesPrice = price >= 10000 && price <= 25000;
//             break;
//           case 'Over ₹25,000':
//             matchesPrice = price > 25000;
//             break;
//         }
//       }
      
//       return matchesSearch && matchesBrand && matchesPrime && matchesDelivery && 
//              matchesRating && matchesCondition && matchesPrice;
//     });
//   };

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

//   // Amazon-Style Sidebar Component (Reusable)
//   const AmazonSidebar = ({ isHomepage = false }) => (
//     <div style={{
//       position: 'sticky',
//       top: '20px',
//       alignSelf: 'flex-start',
//       width: '240px',
//       height: 'fit-content',
//       maxHeight: 'calc(100vh - 40px)',
//       backgroundColor: '#FFFFFF',
//       color: '#000000',
//       padding: '16px 0 16px 16px',
//       fontSize: '14px',
//       lineHeight: '20px',
//       flexShrink: 0,
//       overflowY: 'auto',
//       borderRight: '1px solid #E7E7E7',
//       borderRadius: '8px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       fontFamily: '"Amazon Ember", Arial, sans-serif'
//     }}>
      
//       {/* Category Section */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Category
//         </h4>
        
//         <div style={{ marginBottom: '8px' }}>
//           <span style={{
//             display: 'flex',
//             alignItems: 'center',
//             color: '#007185',
//             fontSize: '14px',
//             fontWeight: '700'
//           }}>
//             <FaChevronLeft style={{ fontSize: '10px', marginRight: '6px' }} />
//             {isHomepage ? 'Shop by Category' : 'All Products'}
//           </span>
//         </div>
        
//         <div style={{ paddingLeft: '16px' }}>
//           <div style={{
//             padding: '2px 0',
//             fontSize: '13px',
//             color: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '#007185' : '#565959',
//             cursor: 'pointer',
//             lineHeight: '16px',
//             fontWeight: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '600' : '400'
//           }}
//           onClick={() => {
//             if (isHomepage) {
//               setActiveHomeCategory('');
//             } else {
//               handleCategoryChange('');
//               setShowHomepageView(true);
//             }
//           }}>
//             All Products
//           </div>
          
//           {professionalCategories.slice(0, 5).map((category) => (
//             <div key={category.name} style={{
//               padding: '2px 0',
//               fontSize: '13px',
//               color: (isHomepage && activeHomeCategory === category.name) || 
//                      (!isHomepage && selectedCategory === category.name) ? '#007185' : '#565959',
//               cursor: 'pointer',
//               lineHeight: '16px',
//               fontWeight: (isHomepage && activeHomeCategory === category.name) || 
//                          (!isHomepage && selectedCategory === category.name) ? '600' : '400'
//             }}
//             onClick={() => {
//               if (isHomepage) {
//                 setActiveHomeCategory(category.name);
//               } else {
//                 handleCategoryChange(category.name);
//               }
//             }}>
//               {category.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Trade Blo Prime Section */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Trade Blo Prime
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px', 
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={primeOnly}
//             onChange={(e) => setPrimeOnly(e.target.checked)}
//           />
//           <span style={{ 
//             color: '#007185', 
//             fontSize: '14px',
//             fontWeight: '700'
//           }}>
//             ✓prime
//           </span>
//         </label>
//       </div>

//       {/* Delivery Day */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Delivery Day
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px',
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={fastDelivery}
//             onChange={(e) => setFastDelivery(e.target.checked)}
//           />
//           <span style={{ color: '#0F1111', fontSize: '14px' }}>
//             Get It by Tomorrow
//           </span>
//         </label>
//       </div>

//       {/* Brands */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Brands
//         </h4>
//         {['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell'].map((brand) => (
//           <label key={brand} style={{
//             display: 'flex',
//             alignItems: 'center',
//             cursor: 'pointer',
//             marginBottom: '4px',
//             lineHeight: '20px'
//           }}>
//             <input 
//               type="checkbox" 
//               style={{ 
//                 marginRight: '8px',
//                 transform: 'scale(1.1)',
//                 accentColor: '#FF9900'
//               }}
//               checked={selectedBrands.includes(brand)}
//               onChange={() => handleBrandToggle(brand)}
//             />
//             <span style={{ color: '#0F1111', fontSize: '14px' }}>
//               {brand}
//             </span>
//           </label>
//         ))}
//       </div>

//       {/* Customer Reviews */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Customer Reviews
//         </h4>
//         {[4, 3, 2, 1].map((rating) => (
//           <div key={rating} style={{
//             display: 'flex',
//             alignItems: 'center',
//             cursor: 'pointer',
//             marginBottom: '4px',
//             padding: '2px 0',
//             lineHeight: '20px'
//           }}
//           onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               {renderStars(rating)}
//               <span style={{
//                 marginLeft: '8px',
//                 fontSize: '14px',
//                 color: selectedRating === rating ? '#FF9900' : '#007185',
//                 textDecoration: 'none',
//                 fontWeight: selectedRating === rating ? '600' : '400'
//               }}>& Up</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Item Condition */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Item Condition
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px',
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={newItems}
//             onChange={(e) => setNewItems(e.target.checked)}
//           />
//           <span style={{ color: '#0F1111', fontSize: '14px' }}>
//             New
//           </span>
//         </label>
//       </div>

//       {/* Price */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Price
//         </h4>
//         {[
//           'Under ₹1,000',
//           '₹1,000 - ₹5,000',
//           '₹5,000 - ₹10,000',
//           '₹10,000 - ₹25,000',
//           'Over ₹25,000'
//         ].map((range) => (
//           <div key={range} style={{
//             cursor: 'pointer',
//             padding: '2px 0',
//             fontSize: '14px',
//             color: selectedPriceRange === range ? '#007185' : '#0F1111',
//             lineHeight: '20px',
//             fontWeight: selectedPriceRange === range ? '600' : '400'
//           }}
//           onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}>
//             {range}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Small Product Card Component (No Add to Cart)
//   const SmallProductCard = ({ product }) => (
//     <Link
//       to={`/product/${product.id}`}
//       style={{ textDecoration: 'none' }}
//     >
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         borderRadius: '8px',
//         padding: '8px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         cursor: 'pointer',
//         transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//         position: 'relative',
//         height: '220px',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//       onMouseOver={(e) => {
//         e.currentTarget.style.transform = 'translateY(-2px)';
//         e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
//       }}
//       onMouseOut={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//       }}
//       >
//         {product.badge && (
//           <div style={{
//             position: 'absolute',
//             top: '4px',
//             left: '4px',
//             backgroundColor: product.badge === 'BESTSELLER' ? '#FF9900' : 
//                             product.badge === 'NEW LAUNCH' ? '#00A652' : '#0073E6',
//             color: '#FFFFFF',
//             fontSize: '8px',
//             fontWeight: '600',
//             padding: '2px 4px',
//             borderRadius: '3px',
//             zIndex: 1
//           }}>
//             {product.badge}
//           </div>
//         )}

//         <div style={{
//           width: '100%',
//           height: '100px',
//           marginBottom: '6px',
//           overflow: 'hidden',
//           borderRadius: '4px'
//         }}>
//           <img
//             src={product.image}
//             alt={product.item_name}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//           />
//         </div>

//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <h3 style={{
//             fontSize: '11px',
//             fontWeight: '500',
//             color: '#0F1111',
//             margin: '0 0 4px 0',
//             lineHeight: '1.2',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap'
//           }}>
//             {product.item_name}
//           </h3>

//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '2px',
//             marginBottom: '4px'
//           }}>
//             <span style={{
//               backgroundColor: '#00A652',
//               color: '#FFFFFF',
//               fontSize: '9px',
//               fontWeight: '600',
//               padding: '1px 3px',
//               borderRadius: '2px'
//             }}>
//               {product.rating} ★
//             </span>
//             <span style={{
//               fontSize: '9px',
//               color: '#565959'
//             }}>
//               ({product.reviews})
//             </span>
//           </div>

//           <div style={{ marginTop: 'auto' }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px',
//               marginBottom: '2px'
//             }}>
//               <span style={{
//                 fontSize: '12px',
//                 fontWeight: '600',
//                 color: '#0F1111'
//               }}>
//                 ₹{product.standard_rate.toLocaleString()}
//               </span>
//               <span style={{
//                 fontSize: '9px',
//                 color: '#565959',
//                 textDecoration: 'line-through'
//               }}>
//                 ₹{product.originalPrice?.toLocaleString()}
//               </span>
//             </div>
//             <div style={{
//               fontSize: '9px',
//               color: '#00A652',
//               fontWeight: '500'
//             }}>
//               {product.discount}% off
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
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

  
//   // Homepage View with Sidebar
//   if (showHomepageView) {
//     const currentCategoryData = professionalCategories.find(cat => cat.name === activeHomeCategory);
//     const currentSubcategories = currentCategoryData ? currentCategoryData.subcategories : [];
//     const homepageProducts = getFilteredProducts(activeHomeCategory).slice(0, 20);

//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh'
//       }}>
//         {/* Homepage with Sidebar Layout */}
//         <div style={{
//           display: 'flex',
//           maxWidth: '100vw',
//           // margin: '0 auto',
//           justifyContent: 'space-between',
//           gap: '24px',
//           padding: '20px'
//         }}>
          
//           {/* Amazon-Style Sidebar for Homepage */}
//           <AmazonSidebar isHomepage={true} />

//           {/* Main Homepage Content */}
//           <div style={{ flex: 1, minHeight: '0' }}>
            
//             {/* Shop by Category Section */}
//             <div style={{ marginBottom: '40px' }}>
//               <h2 style={{
//                 fontSize: '24px',
//                 fontWeight: '600',
//                 color: '#0F1111',
//                 marginBottom: '20px'
//               }}>
//                 Shop by category
//               </h2>
              
//               {/* Category Carousel */}
//               <div style={{
//                 display: 'flex',
//                 overflowX: 'auto',
//                 gap: '20px',
//                 paddingBottom: '10px',
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none'
//               }}>
//                 {currentSubcategories.map((subcategory, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleCategoryChange(activeHomeCategory)}
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       minWidth: '100px',
//                       cursor: 'pointer',
//                       textAlign: 'center',
//                       transition: 'transform 0.2s ease'
//                     }}
//                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                   >
//                     <div style={{
//                       width: '70px',
//                       height: '70px',
//                       borderRadius: '50%',
//                       overflow: 'hidden',
//                       marginBottom: '8px',
//                       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                     }}>
//                       <img
//                         src={subcategory.image}
//                         alt={subcategory.name}
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover'
//                         }}
//                       />
//                     </div>
//                     <span style={{
//                       fontSize: '11px',
//                       color: '#565959',
//                       fontWeight: '400',
//                       lineHeight: '1.2'
//                     }}>
//                       {subcategory.name}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Category Navigation */}
//             <div style={{
//               display: 'flex',
//               gap: '12px',
//               marginBottom: '30px',
//               overflowX: 'auto'
//             }}>
//               {professionalCategories.map((cat) => (
//                 <button
//                   key={cat.name}
//                   onClick={() => setActiveHomeCategory(cat.name)}
//                   style={{
//                     padding: '10px 20px',
//                     border: 'none',
//                     borderRadius: '20px',
//                     backgroundColor: activeHomeCategory === cat.name ? '#0F1111' : '#F7F8F8',
//                     color: activeHomeCategory === cat.name ? '#FFFFFF' : '#565959',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     whiteSpace: 'nowrap'
//                   }}
//                 >
//                   {cat.name}
//                 </button>
//               ))}
//             </div>

//             {/* Top Products Section */}
//             <div style={{ marginBottom: '40px' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{
//                   fontSize: '24px',
//                   fontWeight: '600',
//                   color: '#0F1111',
//                   margin: '0'
//                 }}>
//                   Top 20 | {activeHomeCategory}
//                 </h2>
//                 <button
//                   onClick={() => handleCategoryChange(activeHomeCategory)}
//                   style={{
//                     color: '#0F1111',
//                     textDecoration: 'none',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   View All →
//                 </button>
//               </div>

//               {/* Sort Bar for Homepage */}
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '16px',
//                 padding: '12px 16px',
//                 backgroundColor: '#F7F8F8',
//                 borderRadius: '4px'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '16px'
//                 }}>
//                   <span style={{
//                     fontSize: '14px',
//                     color: '#0F1111',
//                     fontWeight: '600'
//                   }}>
//                     Sort by:
//                   </span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     style={{
//                       padding: '6px 8px',
//                       border: '1px solid #D5D9D9',
//                       borderRadius: '4px',
//                       fontSize: '14px',
//                       backgroundColor: '#FFFFFF',
//                       color: '#0F1111',
//                       fontFamily: 'inherit'
//                     }}
//                   >
//                     <option value="name">Featured</option>
//                     <option value="price_low">Price: Low to High</option>
//                     <option value="price_high">Price: High to Low</option>
//                     <option value="rating">Customer Rating</option>
//                     <option value="newest">Newest Arrivals</option>
//                   </select>
//                 </div>

//                 <div style={{
//                   fontSize: '14px',
//                   color: '#565959'
//                 }}>
//                   Showing {homepageProducts.length} products
//                   {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
//                    ' (filtered)'}
//                 </div>
//               </div>

//               {/* Products Grid - Smaller Cards */}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//                 gap: '12px'
//               }}>
//                 {homepageProducts.map((product) => (
//                   <SmallProductCard key={product.id} product={product} />
//                 ))}
//               </div>

//               {/* No Products Message */}
//               {homepageProducts.length === 0 && (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '60px 20px',
//                   backgroundColor: '#F7F8F8',
//                   borderRadius: '8px'
//                 }}>
//                   <h3 style={{ color: '#0F1111', marginBottom: '12px' }}>
//                     No products found
//                   </h3>
//                   <p style={{ color: '#565959', fontSize: '14px' }}>
//                     Try adjusting your filters or selecting a different category
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSelectedBrands([]);
//                       setPrimeOnly(false);
//                       setFastDelivery(false);
//                       setSelectedRating(0);
//                       setNewItems(false);
//                       setSelectedPriceRange('');
//                     }}
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#0F1111',
//                       color: '#FFFFFF',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       marginTop: '12px'
//                     }}
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* View More Button */}
//             <div style={{ textAlign: 'center', marginTop: '40px' }}>
//               <button
//                 onClick={() => setShowHomepageView(false)}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: '#0F1111',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease'
//                 }}
//               >
//                 View All Categories
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Regular ProductsPage View with Sidebar
//   const sortedProducts = getFilteredProducts().sort((a, b) => {
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

 

  

  

//   return (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       minHeight: '100vh'
//     }}>
//       <div style={{
//         display: 'flex',
//         maxWidth: '1400px',
//         margin: '0 auto',
//         gap: '24px',
//         padding: '20px'
//       }}>
        
//         {/* Amazon-Style Sidebar for Products View */}
//         <AmazonSidebar isHomepage={false} />

//         {/* Main Content */}
//         <div style={{ flex: 1, minHeight: '0' }}>
//           <div style={{ marginBottom: '24px' }}>
//             <h1 style={{
//               fontSize: '28px',
//               fontWeight: '400',
//               color: '#0F1111',
//               margin: '0 0 8px 0'
//             }}>
//               {selectedCategory || 'All Products'}
//             </h1>
//             <div style={{
//               fontSize: '14px',
//               color: '#565959'
//             }}>
//               Showing {sortedProducts.length} products
//               {searchTerm && ` for "${searchTerm}"`}
//               {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
//                ' (filtered)'}
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
//                 <option value="name">Featured</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//                 <option value="rating">Customer Rating</option>
//                 <option value="newest">Newest Arrivals</option>
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

//           {/* Products Grid */}
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
//                 fontSize: '14px',
//                 marginBottom: '16px'
//               }}>
//                 Try adjusting your filters or search terms
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedBrands([]);
//                   setPrimeOnly(false);
//                   setFastDelivery(false);
//                   setSelectedRating(0);
//                   setNewItems(false);
//                   setSelectedPriceRange('');
//                 }}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: '#0F1111',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: viewMode === 'grid' 
//                 ? 'repeat(auto-fill, minmax(250px, 1fr))'
//                 : '1fr',
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




// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaArrowRight } from 'react-icons/fa';
// // import ProductCard from '../components/ProductCard';
// // import CategoryCard from '../components/CategoryCard';
// // import { erpnextApi } from '../api/erpnextApi';
// // import { COLORS } from '../constants/colors';

// // const HomePage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [productsData, categoriesData] = await Promise.all([
// //           erpnextApi.getItems(),
// //           erpnextApi.getCategories(),
// //         ]);
        
// //         setProducts(productsData.slice(0, 8)); // Show first 8 products
// //         setCategories(categoriesData.slice(0, 6)); // Show first 6 categories
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div style={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         minHeight: '400px',
// //         fontSize: '18px',
// //         color: COLORS.textSecondary
// //       }}>
// //         Loading Trade Blo Me...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       {/* Hero Banner */}
// //       <section style={{
// //         background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
// //         color: COLORS.white,
// //         padding: '80px 0',
// //         textAlign: 'center'
// //       }}>
// //         <div style={{
// //           maxWidth: '1200px',
// //           margin: '0 auto',
// //           padding: '0 20px'
// //         }}>
// //           <h1 style={{
// //             fontSize: '48px',
// //             fontWeight: 'bold',
// //             marginBottom: '20px',
// //             textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
// //           }}>
// //             Welcome to Trade Blo Me
// //           </h1>
// //           <p style={{
// //             fontSize: '24px',
// //             marginBottom: '40px',
// //             opacity: 0.9
// //           }}>
// //             Discover Amazing Products at Unbeatable Prices
// //           </p>
// //           <Link 
// //             to="/products"
// //             style={{
// //               display: 'inline-flex',
// //               alignItems: 'center',
// //               gap: '12px',
// //               backgroundColor: COLORS.secondary,
// //               color: COLORS.white,
// //               padding: '16px 32px',
// //               fontSize: '18px',
// //               fontWeight: 'bold',
// //               textDecoration: 'none',
// //               borderRadius: '8px',
// //               transition: 'all 0.3s ease'
// //             }}
// //           >
// //             Shop Now <FaArrowRight />
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Categories Section */}
// //       <section style={{
// //         padding: '80px 0',
// //         backgroundColor: COLORS.white
// //       }}>
// //         <div style={{
// //           maxWidth: '1200px',
// //           margin: '0 auto',
// //           padding: '0 20px'
// //         }}>
// //           <div style={{
// //             textAlign: 'center',
// //             marginBottom: '60px'
// //           }}>
// //             <h2 style={{
// //               fontSize: '36px',
// //               fontWeight: 'bold',
// //               color: COLORS.textPrimary,
// //               marginBottom: '16px'
// //             }}>
// //               Shop by Category
// //             </h2>
// //             <p style={{
// //               fontSize: '18px',
// //               color: COLORS.textSecondary,
// //               maxWidth: '600px',
// //               margin: '0 auto'
// //             }}>
// //               Explore our wide range of product categories
// //             </p>
// //           </div>
          
// //           <div style={{
// //             display: 'grid',
// //             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// //             gap: '24px',
// //             marginBottom: '40px'
// //           }}>
// //             {categories.map((category) => (
// //               <CategoryCard key={category.name} category={category} />
// //             ))}
// //           </div>
          
// //           <div style={{ textAlign: 'center' }}>
// //             <Link 
// //               to="/products"
// //               style={{
// //                 display: 'inline-flex',
// //                 alignItems: 'center',
// //                 gap: '8px',
// //                 color: COLORS.primary,
// //                 fontSize: '16px',
// //                 fontWeight: '600',
// //                 textDecoration: 'none'
// //               }}
// //             >
// //               View All Categories <FaArrowRight />
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Products Section */}
// //       <section style={{
// //         padding: '80px 0',
// //         backgroundColor: COLORS.background
// //       }}>
// //         <div style={{
// //           maxWidth: '1200px',
// //           margin: '0 auto',
// //           padding: '0 20px'
// //         }}>
// //           <div style={{
// //             textAlign: 'center',
// //             marginBottom: '60px'
// //           }}>
// //             <h2 style={{
// //               fontSize: '36px',
// //               fontWeight: 'bold',
// //               color: COLORS.textPrimary,
// //               marginBottom: '16px'
// //             }}>
// //               Trending Products
// //             </h2>
// //             <p style={{
// //               fontSize: '18px',
// //               color: COLORS.textSecondary,
// //               maxWidth: '600px',
// //               margin: '0 auto'
// //             }}>
// //               Check out our most popular products this month
// //             </p>
// //           </div>
          
// //           <div style={{
// //             display: 'grid',
// //             gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
// //             gap: '24px',
// //             marginBottom: '40px'
// //           }}>
// //             {products.map((product) => (
// //               <ProductCard key={product.name} product={product} />
// //             ))}
// //           </div>
          
// //           <div style={{ textAlign: 'center' }}>
// //             <Link 
// //               to="/products"
// //               style={{
// //                 display: 'inline-flex',
// //                 alignItems: 'center',
// //                 gap: '8px',
// //                 backgroundColor: COLORS.primary,
// //                 color: COLORS.white,
// //                 padding: '16px 32px',
// //                 fontSize: '16px',
// //                 fontWeight: '600',
// //                 textDecoration: 'none',
// //                 borderRadius: '8px',
// //                 transition: 'background-color 0.3s ease'
// //               }}
// //             >
// //               View All Products <FaArrowRight />
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section style={{
// //         padding: '80px 0',
// //         backgroundColor: COLORS.white
// //       }}>
// //         <div style={{
// //           maxWidth: '1200px',
// //           margin: '0 auto',
// //           padding: '0 20px'
// //         }}>
// //           <div style={{
// //             display: 'grid',
// //             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
// //             gap: '40px'
// //           }}>
// //             {[
// //               {
// //                 title: 'Free Shipping',
// //                 description: 'On orders over ₹500',
// //                 icon: '🚚'
// //               },
// //               {
// //                 title: 'Secure Payment',
// //                 description: '100% secure transactions',
// //                 icon: '🔒'
// //               },
// //               {
// //                 title: '24/7 Support',
// //                 description: 'Dedicated customer service',
// //                 icon: '📞'
// //               },
// //               {
// //                 title: 'Easy Returns',
// //                 description: '30-day return policy',
// //                 icon: '↩️'
// //               }
// //             ].map((feature, index) => (
// //               <div key={index} style={{
// //                 textAlign: 'center',
// //                 padding: '24px'
// //               }}>
// //                 <div style={{
// //                   fontSize: '48px',
// //                   marginBottom: '16px'
// //                 }}>
// //                   {feature.icon}
// //                 </div>
// //                 <h3 style={{
// //                   fontSize: '20px',
// //                   fontWeight: 'bold',
// //                   color: COLORS.textPrimary,
// //                   marginBottom: '8px'
// //                 }}>
// //                   {feature.title}
// //                 </h3>
// //                 <p style={{
// //                   fontSize: '16px',
// //                   color: COLORS.textSecondary,
// //                   margin: '0'
// //                 }}>
// //                   {feature.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default HomePage;





////////////////////////////////////2nd attempt/////////////////////////////////////////////



// import React, { useEffect, useState } from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
// import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { erpnextApi } from '../api/erpnextApi';
// import { COLORS } from '../constants/colors';

// const ProductsPage = () => {
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const category = searchParams.get('category');
//   const searchTerm = searchParams.get('search') || '';
  
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(category || '');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('name');
//   const [showHomepageView, setShowHomepageView] = useState(!category);

//   // Filter States
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [primeOnly, setPrimeOnly] = useState(false);
//   const [fastDelivery, setFastDelivery] = useState(false);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [newItems, setNewItems] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('');
//   const [activeHomeCategory, setActiveHomeCategory] = useState('');

//   // Available brands (populated from API data)
//   const [availableBrands, setAvailableBrands] = useState([]);

//   // **🎯 Your ERPNext API Call Function**
//   const get_filtered_products_webshop = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//     const formdata = new FormData();
//     formdata.append("query_args", `{"field_filters":{},"attribute_filters":{},"item_group":${selectedCategory ? `"${selectedCategory}"` : null},"start":null,"from_filters":false}`);

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: formdata,
//       redirect: "follow"
//     };

//     try {
//       setLoading(true);
//       console.log("🔥 Calling ERPNext API for website items...");
      
//       const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions);
//       const result = await response.json();
      
//       console.log("🔥 Raw API Response:", result);
      
//       if (result.message && result.message.items && result.message.items.length > 0) {
//         console.log("🔥 Website Items from ERPNext:", result.message.items);
//         console.log("🔥 First Item Sample:", result.message.items[0]);
        
//         // Transform your ERPNext data for React components
//         const transformedProducts = result.message.items.map(item => ({
//           // IDs and Names
//           id: item.name || item.item_code,
//           item_name: item.item_name || item.web_item_name,
//           web_item_name: item.web_item_name,
//           item_code: item.item_code,
          
//           // Image handling - convert relative path to full URL
//           image: item.website_image ? 
//                  `${window.location.origin}${item.website_image}` : 
//                  'https://via.placeholder.com/300x300?text=No+Image',
          
//           // Pricing (you can add actual price fields later if available)
//           standard_rate: Math.floor(Math.random() * 50000) + 1000,
//           originalPrice: Math.floor(Math.random() * 60000) + 55000,
//           discount: Math.floor(Math.random() * 30) + 10,
          
//           // Ratings (can be made dynamic later)
//           rating: (Math.random() * 2 + 3).toFixed(1),
//           reviews: Math.floor(Math.random() * 500) + 50,
          
//           // Categories from your data
//           category: item.item_group || 'General',
//           subcategory: item.item_group || 'General',
//           brand: item.brand || 'Generic',
          
//           // Stock and cart status from your data
//           inStock: !item.on_backorder,
//           in_cart: item.in_cart,
//           on_backorder: item.on_backorder,
          
//           // Description handling
//           description: item.short_description || 
//                       item.web_long_description || 
//                       `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category`,
          
//           // ERPNext specific fields
//           route: item.route,
//           has_variants: item.has_variants,
//           variant_of: item.variant_of,
//           website_warehouse: item.website_warehouse,
//           wished: item.wished,
//           ranking: item.ranking,
          
//           // Dynamic badge based on your ERPNext data
//           badge: item.wished ? 'WISHLIST' : 
//                 (item.ranking > 0 ? 'BESTSELLER' : 
//                 (item.has_variants ? 'VARIANTS' : 
//                 (item.in_cart ? 'IN CART' : 'AVAILABLE')))
//         }));
        
//         console.log("🔥 Transformed Products for Display:", transformedProducts);
//         console.log("🔥 Sample Transformed Product:", transformedProducts[0]);
        
//         // Set products state with your real ERPNext data
//         setProducts(transformedProducts);
        
//         // Extract unique categories from your item_group data
//         const uniqueCategories = [...new Set(transformedProducts.map(p => p.category))];
//         const categoriesWithSubcategories = uniqueCategories.map(categoryName => ({
//           name: categoryName,
//           subcategories: transformedProducts
//             .filter(p => p.category === categoryName)
//             .slice(0, 8)
//             .map(p => ({
//               name: p.item_name,
//               image: p.image
//             }))
//         }));
        
//         console.log("🔥 Categories extracted from your data:", categoriesWithSubcategories);
//         setCategories(categoriesWithSubcategories);
        
//         // Set first category as active if none selected
//         if (!activeHomeCategory && categoriesWithSubcategories.length > 0) {
//           setActiveHomeCategory(categoriesWithSubcategories[0].name);
//         }
        
//         // Extract brands from your data
//         const uniqueBrands = [...new Set(transformedProducts.map(p => p.brand).filter(Boolean))];
//         setAvailableBrands(uniqueBrands);
//         console.log("🔥 Brands extracted:", uniqueBrands);
        
//         console.log("✅ SUCCESS: Loaded", transformedProducts.length, "website items from ERPNext");
        
//       } else {
//         console.log("❌ No website items found in API response");
//         console.log("❌ Result message:", result.message);
//         setProducts([]);
//         setCategories([]);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching ERPNext website items:', error);
//       setProducts([]);
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Load data when component mounts or category changes**
//   useEffect(() => {
//     console.log("Loading ERPNext website items...");
//     get_filtered_products_webshop();
//   }, [selectedCategory]);

//   // **🎯 Handle category changes**
//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setActiveHomeCategory(categoryName);
//     setShowHomepageView(false);
//     if (categoryName) {
//       setSearchParams({ category: categoryName });
//     } else {
//       setSearchParams({});
//       setShowHomepageView(true);
//     }
//   };

//   // **🎯 Handle brand filtering**
//   const handleBrandToggle = (brand) => {
//     setSelectedBrands(prev => 
//       prev.includes(brand) 
//         ? prev.filter(b => b !== brand)
//         : [...prev, brand]
//     );
//   };

//   // **🎯 Filter products based on all criteria**
//   const getFilteredProducts = (categoryFilter = '') => {
//     const baseProducts = categoryFilter ? 
//       products.filter(p => p.category === categoryFilter) : 
//       (selectedCategory ? products.filter(p => p.category === selectedCategory) : products);
    
//     return baseProducts.filter(product => {
//       const matchesSearch = searchTerm === '' || 
//         (product.item_name && product.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.web_item_name && product.web_item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.item_code && product.item_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesBrand = selectedBrands.length === 0 || 
//         selectedBrands.some(brand => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
      
//       const matchesPrime = !primeOnly || product.badge === 'BESTSELLER';
//       const matchesDelivery = !fastDelivery || product.inStock;
//       const matchesRating = selectedRating === 0 || parseFloat(product.rating) >= selectedRating;
//       const matchesCondition = !newItems || product.badge === 'NEW LAUNCH';
      
//       let matchesPrice = true;
//       if (selectedPriceRange) {
//         const price = product.standard_rate || 0;
//         switch (selectedPriceRange) {
//           case 'Under ₹1,000':
//             matchesPrice = price < 1000;
//             break;
//           case '₹1,000 - ₹5,000':
//             matchesPrice = price >= 1000 && price <= 5000;
//             break;
//           case '₹5,000 - ₹10,000':
//             matchesPrice = price >= 5000 && price <= 10000;
//             break;
//           case '₹10,000 - ₹25,000':
//             matchesPrice = price >= 10000 && price <= 25000;
//             break;
//           case 'Over ₹25,000':
//             matchesPrice = price > 25000;
//             break;
//           default:
//             matchesPrice = true;
//         }
//       }
      
//       return matchesSearch && matchesBrand && matchesPrime && matchesDelivery && 
//              matchesRating && matchesCondition && matchesPrice;
//     });
//   };

//   // **🎯 Render star ratings**
//   const renderStars = (rating) => {
//     const stars = [];
//     const numRating = parseFloat(rating) || 0;
//     for (let i = 1; i <= 5; i++) {
//       if (i <= numRating) {
//         stars.push(<FaStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
//       } else {
//         stars.push(<FaRegStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
//       }
//     }
//     return stars;
//   };

//   // **🎯 Amazon-Style Sidebar Component**
//   const AmazonSidebar = ({ isHomepage = false }) => (
//     <div style={{
//       position: 'sticky',
//       top: '20px',
//       alignSelf: 'flex-start',
//       width: '240px',
//       height: 'fit-content',
//       maxHeight: 'calc(100vh - 40px)',
//       backgroundColor: '#FFFFFF',
//       color: '#000000',
//       padding: '16px 0 16px 16px',
//       fontSize: '14px',
//       lineHeight: '20px',
//       flexShrink: 0,
//       overflowY: 'auto',
//       borderRight: '1px solid #E7E7E7',
//       borderRadius: '8px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       fontFamily: '"Amazon Ember", Arial, sans-serif'
//     }}>
      
//       {/* Category Section */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Category
//         </h4>
        
//         <div style={{ marginBottom: '8px' }}>
//           <span style={{
//             display: 'flex',
//             alignItems: 'center',
//             color: '#007185',
//             fontSize: '14px',
//             fontWeight: '700'
//           }}>
//             <FaChevronLeft style={{ fontSize: '10px', marginRight: '6px' }} />
//             {isHomepage ? 'Shop by Category' : 'All Products'}
//           </span>
//         </div>
        
//         <div style={{ paddingLeft: '16px' }}>
//           <div 
//             style={{
//               padding: '2px 0',
//               fontSize: '13px',
//               color: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '#007185' : '#565959',
//               cursor: 'pointer',
//               lineHeight: '16px',
//               fontWeight: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '600' : '400'
//             }}
//             onClick={() => {
//               if (isHomepage) {
//                 setActiveHomeCategory('');
//               } else {
//                 handleCategoryChange('');
//                 setShowHomepageView(true);
//               }
//             }}
//           >
//             All Products
//           </div>
          
//           {categories.slice(0, 8).map((category) => (
//             <div 
//               key={category.name} 
//               style={{
//                 padding: '2px 0',
//                 fontSize: '13px',
//                 color: (isHomepage && activeHomeCategory === category.name) || 
//                        (!isHomepage && selectedCategory === category.name) ? '#007185' : '#565959',
//                 cursor: 'pointer',
//                 lineHeight: '16px',
//                 fontWeight: (isHomepage && activeHomeCategory === category.name) || 
//                            (!isHomepage && selectedCategory === category.name) ? '600' : '400'
//               }}
//               onClick={() => {
//                 if (isHomepage) {
//                   setActiveHomeCategory(category.name);
//                 } else {
//                   handleCategoryChange(category.name);
//                 }
//               }}
//             >
//               {category.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Trade Blo Prime Section */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Trade Blo Prime
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px', 
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={primeOnly}
//             onChange={(e) => setPrimeOnly(e.target.checked)}
//           />
//           <span style={{ 
//             color: '#007185', 
//             fontSize: '14px',
//             fontWeight: '700'
//           }}>
//             ✓prime
//           </span>
//         </label>
//       </div>

//       {/* Delivery Day */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Delivery Day
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px',
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={fastDelivery}
//             onChange={(e) => setFastDelivery(e.target.checked)}
//           />
//           <span style={{ color: '#0F1111', fontSize: '14px' }}>
//             Get It by Tomorrow
//           </span>
//         </label>
//       </div>

//       {/* Dynamic Brands from ERPNext */}
//       {availableBrands.length > 0 && (
//         <div style={{ marginBottom: '24px' }}>
//           <h4 style={{
//             fontSize: '16px',
//             fontWeight: '700',
//             color: '#0F1111',
//             margin: '0 0 8px 0',
//             lineHeight: '24px'
//           }}>
//             Brands
//           </h4>
//           {availableBrands.slice(0, 6).map((brand) => (
//             <label key={brand} style={{
//               display: 'flex',
//               alignItems: 'center',
//               cursor: 'pointer',
//               marginBottom: '4px',
//               lineHeight: '20px'
//             }}>
//               <input 
//                 type="checkbox" 
//                 style={{ 
//                   marginRight: '8px',
//                   transform: 'scale(1.1)',
//                   accentColor: '#FF9900'
//                 }}
//                 checked={selectedBrands.includes(brand)}
//                 onChange={() => handleBrandToggle(brand)}
//               />
//               <span style={{ color: '#0F1111', fontSize: '14px' }}>
//                 {brand}
//               </span>
//             </label>
//           ))}
//         </div>
//       )}

//       {/* Customer Reviews */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Customer Reviews
//         </h4>
//         {[4, 3, 2, 1].map((rating) => (
//           <div 
//             key={rating} 
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               cursor: 'pointer',
//               marginBottom: '4px',
//               padding: '2px 0',
//               lineHeight: '20px'
//             }}
//             onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
//           >
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               {renderStars(rating)}
//               <span style={{
//                 marginLeft: '8px',
//                 fontSize: '14px',
//                 color: selectedRating === rating ? '#FF9900' : '#007185',
//                 textDecoration: 'none',
//                 fontWeight: selectedRating === rating ? '600' : '400'
//               }}>
//                 & Up
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Item Condition */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Item Condition
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px',
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={newItems}
//             onChange={(e) => setNewItems(e.target.checked)}
//           />
//           <span style={{ color: '#0F1111', fontSize: '14px' }}>
//             New
//           </span>
//         </label>
//       </div>

//       {/* Price */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Price
//         </h4>
//         {[
//           'Under ₹1,000',
//           '₹1,000 - ₹5,000',
//           '₹5,000 - ₹10,000',
//           '₹10,000 - ₹25,000',
//           'Over ₹25,000'
//         ].map((range) => (
//           <div 
//             key={range} 
//             style={{
//               cursor: 'pointer',
//               padding: '2px 0',
//               fontSize: '14px',
//               color: selectedPriceRange === range ? '#007185' : '#0F1111',
//               lineHeight: '20px',
//               fontWeight: selectedPriceRange === range ? '600' : '400'
//             }}
//             onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}
//           >
//             {range}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // **🎯 Fixed Small Product Card Component for Homepage**
//   const SmallProductCard = ({ product }) => {
//     // Add safety checks for required properties
//     if (!product) {
//       return null;
//     }

//     return (
//       <Link
//         to={`/product/${product.route || product.id || product.name}`}
//         style={{ textDecoration: 'none' }}
//       >
//         <div 
//           style={{
//             backgroundColor: '#FFFFFF',
//             borderRadius: '8px',
//             padding: '8px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             cursor: 'pointer',
//             transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//             position: 'relative',
//             height: '220px',
//             display: 'flex',
//             flexDirection: 'column'
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.transform = 'translateY(-2px)';
//             e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//           }}
//         >
//           {product.badge && (
//             <div style={{
//               position: 'absolute',
//               top: '4px',
//               left: '4px',
//               backgroundColor: product.badge === 'BESTSELLER' ? '#FF9900' : 
//                               product.badge === 'WISHLIST' ? '#E91E63' :
//                               product.badge === 'IN CART' ? '#4CAF50' :
//                               product.badge === 'VARIANTS' ? '#2196F3' : '#0073E6',
//               color: '#FFFFFF',
//               fontSize: '8px',
//               fontWeight: '600',
//               padding: '2px 4px',
//               borderRadius: '3px',
//               zIndex: 1
//             }}>
//               {product.badge}
//             </div>
//           )}

//           <div style={{
//             width: '100%',
//             height: '100px',
//             marginBottom: '6px',
//             overflow: 'hidden',
//             borderRadius: '4px'
//           }}>
//             <img
//               src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
//               alt={product.item_name || product.web_item_name || 'Product'}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover'
//               }}
//               onError={(e) => {
//                 const productName = product.item_name || product.web_item_name || 'Product';
//                 e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
//               }}
//             />
//           </div>

//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//             <h3 style={{
//               fontSize: '11px',
//               fontWeight: '500',
//               color: '#0F1111',
//               margin: '0 0 4px 0',
//               lineHeight: '1.2',
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//               whiteSpace: 'nowrap'
//             }}>
//               {product.item_name || product.web_item_name || 'Product Name'}
//             </h3>

//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '2px',
//               marginBottom: '4px'
//             }}>
//               <span style={{
//                 backgroundColor: '#00A652',
//                 color: '#FFFFFF',
//                 fontSize: '9px',
//                 fontWeight: '600',
//                 padding: '1px 3px',
//                 borderRadius: '2px'
//               }}>
//                 {product.rating || '4.0'} ★
//               </span>
//               <span style={{
//                 fontSize: '9px',
//                 color: '#565959'
//               }}>
//                 ({product.reviews || '0'})
//               </span>
//             </div>

//             <div style={{ marginTop: 'auto' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px',
//                 marginBottom: '2px'
//               }}>
//                 <span style={{
//                   fontSize: '12px',
//                   fontWeight: '600',
//                   color: '#0F1111'
//                 }}>
//                   ₹{product.standard_rate ? product.standard_rate.toLocaleString() : '0'}
//                 </span>
//                 {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
//                   <span style={{
//                     fontSize: '9px',
//                     color: '#565959',
//                     textDecoration: 'line-through'
//                   }}>
//                     ₹{product.originalPrice.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//               {product.discount && product.discount > 0 && (
//                 <div style={{
//                   fontSize: '9px',
//                   color: '#00A652',
//                   fontWeight: '500'
//                 }}>
//                   {product.discount}% off
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   // **🎯 Loading State**
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
//         Loading ERPNext website items...
//       </div>
//     );
//   }

//   // **🎯 Homepage View with Sidebar**
//   if (showHomepageView) {
//     const currentCategoryData = categories.find(cat => cat.name === activeHomeCategory);
//     const currentSubcategories = currentCategoryData ? currentCategoryData.subcategories : [];
//     const homepageProducts = getFilteredProducts(activeHomeCategory).slice(0, 20);

//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh'
//       }}>
//         {/* Homepage with Sidebar Layout */}
//         <div style={{
//           display: 'flex',
//           maxWidth: '100vw',
//           justifyContent: 'space-between',
//           gap: '24px',
//           padding: '20px'
//         }}>
          
//           {/* Amazon-Style Sidebar for Homepage */}
//           <AmazonSidebar isHomepage={true} />

//           {/* Main Homepage Content */}
//           <div style={{ flex: 1, minHeight: '0' }}>
            
//             {/* Shop by Category Section */}
//             {currentSubcategories.length > 0 && (
//               <div style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '24px',
//                   fontWeight: '600',
//                   color: '#0F1111',
//                   marginBottom: '20px'
//                 }}>
//                   Shop by category
//                 </h2>
                
//                 {/* Category Carousel */}
//                 <div style={{
//                   display: 'flex',
//                   overflowX: 'auto',
//                   gap: '20px',
//                   paddingBottom: '10px',
//                   scrollbarWidth: 'none',
//                   msOverflowStyle: 'none'
//                 }}>
//                   {currentSubcategories.slice(0, 8).map((subcategory, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleCategoryChange(activeHomeCategory)}
//                       style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         minWidth: '100px',
//                         cursor: 'pointer',
//                         textAlign: 'center',
//                         transition: 'transform 0.2s ease'
//                       }}
//                       onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//                       onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                     >
//                       <div style={{
//                         width: '70px',
//                         height: '70px',
//                         borderRadius: '50%',
//                         overflow: 'hidden',
//                         marginBottom: '8px',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                       }}>
//                         <img
//                           src={subcategory.image}
//                           alt={subcategory.name}
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover'
//                           }}
//                           onError={(e) => {
//                             e.target.src = `https://via.placeholder.com/150x150?text=${encodeURIComponent(subcategory.name.substring(0, 2))}`;
//                           }}
//                         />
//                       </div>
//                       <span style={{
//                         fontSize: '11px',
//                         color: '#565959',
//                         fontWeight: '400',
//                         lineHeight: '1.2'
//                       }}>
//                         {subcategory.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Category Navigation */}
//             {categories.length > 0 && (
//               <div style={{
//                 display: 'flex',
//                 gap: '12px',
//                 marginBottom: '30px',
//                 overflowX: 'auto'
//               }}>
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.name}
//                     onClick={() => setActiveHomeCategory(cat.name)}
//                     style={{
//                       padding: '10px 20px',
//                       border: 'none',
//                       borderRadius: '20px',
//                       backgroundColor: activeHomeCategory === cat.name ? '#0F1111' : '#F7F8F8',
//                       color: activeHomeCategory === cat.name ? '#FFFFFF' : '#565959',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Top Products Section */}
//             <div style={{ marginBottom: '40px' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{
//                   fontSize: '24px',
//                   fontWeight: '600',
//                   color: '#0F1111',
//                   margin: '0'
//                 }}>
//                   {homepageProducts.length > 0 ? 
//                     `Top ${Math.min(homepageProducts.length, 20)} | ${activeHomeCategory || 'All Products'}` : 
//                     'ERPNext Website Items'}
//                 </h2>
//                 {activeHomeCategory && (
//                   <button
//                     onClick={() => handleCategoryChange(activeHomeCategory)}
//                     style={{
//                       color: '#0F1111',
//                       textDecoration: 'none',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       background: 'none',
//                       border: 'none',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     View All →
//                   </button>
//                 )}
//               </div>

//               {/* Sort Bar for Homepage */}
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '16px',
//                 padding: '12px 16px',
//                 backgroundColor: '#F7F8F8',
//                 borderRadius: '4px'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',  
//                   gap: '16px'
//                 }}>
//                   <span style={{
//                     fontSize: '14px',
//                     color: '#0F1111',
//                     fontWeight: '600'
//                   }}>
//                     Sort by:
//                   </span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     style={{
//                       padding: '6px 8px',
//                       border: '1px solid #D5D9D9',
//                       borderRadius: '4px',
//                       fontSize: '14px',
//                       backgroundColor: '#FFFFFF',
//                       color: '#0F1111',
//                       fontFamily: 'inherit'
//                     }}
//                   >
//                     <option value="name">Featured</option>
//                     <option value="price_low">Price: Low to High</option>
//                     <option value="price_high">Price: High to Low</option>
//                     <option value="rating">Customer Rating</option>
//                     <option value="newest">Newest Arrivals</option>
//                   </select>
//                 </div>

//                 <div style={{
//                   fontSize: '14px',
//                   color: '#565959'
//                 }}>
//                   Showing {homepageProducts.length} products
//                   {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
//                    ' (filtered)'}
//                 </div>
//               </div>

//               {/* Products Grid - Using Your ERPNext Data */}
//               {homepageProducts.length > 0 ? (
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//                   gap: '12px'
//                 }}>
//                   {homepageProducts.map((product) => (
//                     <SmallProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               ) : (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '60px 20px',
//                   backgroundColor: '#F7F8F8',
//                   borderRadius: '8px'
//                 }}>
//                   <h3 style={{ color: '#0F1111', marginBottom: '12px' }}>
//                     No ERPNext website items found
//                   </h3>
//                   <p style={{ color: '#565959', fontSize: '14px' }}>
//                     Make sure you have website items configured in ERPNext with the webshop module enabled.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSelectedBrands([]);
//                       setPrimeOnly(false);
//                       setFastDelivery(false);
//                       setSelectedRating(0);
//                       setNewItems(false);
//                       setSelectedPriceRange('');
//                     }}
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#0F1111',
//                       color: '#FFFFFF',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       marginTop: '12px'
//                     }}
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* View More Button */}
//             <div style={{ textAlign: 'center', marginTop: '40px' }}>
//               <button
//                 onClick={() => setShowHomepageView(false)}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: '#0F1111',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease'
//                 }}
//               >
//                 View All Categories
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // **🎯 Regular ProductsPage View with Sidebar**
//   const sortedProducts = getFilteredProducts().sort((a, b) => {
//     switch (sortBy) {
//       case 'price_low':
//         return (a.standard_rate || 0) - (b.standard_rate || 0);
//       case 'price_high':
//         return (b.standard_rate || 0) - (a.standard_rate || 0);
//       case 'rating':
//         return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
//       case 'newest':
//         return new Date(b.creation || 0) - new Date(a.creation || 0);
//       case 'name':
//       default:
//         return (a.item_name || '').localeCompare(b.item_name || '');
//     }
//   });

//   return (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       minHeight: '100vh'
//     }}>
//       <div style={{
//         display: 'flex',
//         maxWidth: '1400px',
//         margin: '0 auto',
//         gap: '24px',
//         padding: '20px'
//       }}>
        
//         {/* Amazon-Style Sidebar for Products View */}
//         <AmazonSidebar isHomepage={false} />

//         {/* Main Content */}
//         <div style={{ flex: 1, minHeight: '0' }}>
//           <div style={{ marginBottom: '24px' }}>
//             <h1 style={{
//               fontSize: '28px',
//               fontWeight: '400',
//               color: '#0F1111',
//               margin: '0 0 8px 0'
//             }}>
//               {selectedCategory || 'All ERPNext Products'}
//             </h1>
//             <div style={{
//               fontSize: '14px',
//               color: '#565959'
//             }}>
//               Showing {sortedProducts.length} website items from ERPNext
//               {searchTerm && ` for "${searchTerm}"`}
//               {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
//                ' (filtered)'}
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
//                 <option value="name">Featured</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//                 <option value="rating">Customer Rating</option>
//                 <option value="newest">Newest Arrivals</option>
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

//           {/* Products Grid - Your ERPNext Data */}
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
//                 No ERPNext website items found
//               </h3>
//               <p style={{
//                 color: '#565959',
//                 fontSize: '14px',
//                 marginBottom: '16px'
//               }}>
//                 Make sure you have website items configured in ERPNext or try adjusting your filters
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedBrands([]);
//                   setPrimeOnly(false);
//                   setFastDelivery(false);
//                   setSelectedRating(0);
//                   setNewItems(false);
//                   setSelectedPriceRange('');
//                 }}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: '#0F1111',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: viewMode === 'grid' 
//                 ? 'repeat(auto-fill, minmax(250px, 1fr))'
//                 : '1fr',
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




//////////////////////////////////////3rd attempt////////////////////////////////////////////


import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { erpnextApi } from '../api/erpnextApi';
import { COLORS } from '../constants/colors';

const ProductsPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchTerm = searchParams.get('search') || '';
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showHomepageView, setShowHomepageView] = useState(!category);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [newItems, setNewItems] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [activeHomeCategory, setActiveHomeCategory] = useState('');

  // Available brands (populated from API data)
  const [availableBrands, setAvailableBrands] = useState([]);

  // **🎯 Your ERPNext API Call Function**
  const get_filtered_products_webshop = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    const formdata = new FormData();
    formdata.append("query_args", `{"field_filters":{},"attribute_filters":{},"item_group":${selectedCategory ? `"${selectedCategory}"` : null},"start":null,"from_filters":false}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    try {
      setLoading(true);
      console.log("🔥 Calling ERPNext API for website items...");
      
      const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions);
      const result = await response.json();
      
      console.log("🔥 Raw API Response:", result);
      
      if (result.message && result.message.items && result.message.items.length > 0) {
        console.log("🔥 Website Items from ERPNext:", result.message.items);
        console.log("🔥 First Item Sample:", result.message.items[0]);
        
        // Transform your ERPNext data for React components
        const transformedProducts = result.message.items.map(item => ({
          // IDs and Names
          id: item.name || item.item_code,
          item_name: item.item_name || item.web_item_name,
          web_item_name: item.web_item_name,
          item_code: item.item_code,
          
          // Image handling - convert relative path to full URL
          image: item.website_image ? 
                 `${window.location.origin}${item.website_image}` : 
                 'https://via.placeholder.com/300x300?text=No+Image',
          
          // Real pricing from ERPNext data
          standard_rate: item.price_list_rate || 0,
          originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
          discount: item.formatted_mrp && item.price_list_rate ? 
                   Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - item.price_list_rate) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
          formatted_price: item.formatted_price,
          formatted_mrp: item.formatted_mrp,
          
          // Remove fake ratings - no rating data
          rating: null,
          reviews: null,
          
          // Categories from your data
          category: item.item_group || 'General',
          subcategory: item.item_group || 'General',
          brand: item.brand || 'Generic',
          
          // Real stock and cart status from your data
          inStock: item.in_stock,
          in_cart: item.in_cart,
          on_backorder: item.on_backorder,
          
          // Description handling
          description: item.short_description || 
                      item.web_long_description || 
                      `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category`,
          
          // ERPNext specific fields
          route: item.route,
          has_variants: item.has_variants,
          variant_of: item.variant_of,
          website_warehouse: item.website_warehouse,
          wished: item.wished,
          ranking: item.ranking,
          
          // Dynamic badge based on your ERPNext data
          badge: item.wished ? 'WISHLIST' : 
                (item.ranking > 0 ? 'BESTSELLER' : 
                (item.has_variants ? 'VARIANTS' : 
                (item.in_cart ? 'IN CART' : 'AVAILABLE')))
        }));
        
        console.log("🔥 Transformed Products for Display:", transformedProducts);
        console.log("🔥 Sample Transformed Product:", transformedProducts[0]);
        
        // Set products state with your real ERPNext data
        setProducts(transformedProducts);
        
        // Extract unique categories from your item_group data for shop by category
        const uniqueCategories = [...new Set(transformedProducts.map(p => p.category))];
        const categoriesWithItemGroups = uniqueCategories.map(categoryName => {
          // Get first product image from this category for the category display
          const categoryProduct = transformedProducts.find(p => p.category === categoryName);
          return {
            name: categoryName,
            image: categoryProduct ? categoryProduct.image : 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(categoryName.substring(0, 2)),
            // For subcategories, we'll show the item groups instead of individual products
            subcategories: [{
              name: categoryName,
              image: categoryProduct ? categoryProduct.image : 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(categoryName.substring(0, 2))
            }]
          };
        });
        
        console.log("🔥 Categories extracted from your data:", categoriesWithItemGroups);
        setCategories(categoriesWithItemGroups);
        
        // Set first category as active if none selected
        if (!activeHomeCategory && categoriesWithItemGroups.length > 0) {
          setActiveHomeCategory(categoriesWithItemGroups[0].name);
        }
        
        // Extract brands from your data
        const uniqueBrands = [...new Set(transformedProducts.map(p => p.brand).filter(Boolean))];
        setAvailableBrands(uniqueBrands);
        console.log("🔥 Brands extracted:", uniqueBrands);
        
        console.log("✅ SUCCESS: Loaded", transformedProducts.length, "website items from ERPNext");
        
      } else {
        console.log("❌ No website items found in API response");
        console.log("❌ Result message:", result.message);
        setProducts([]);
        setCategories([]);
      }
    } catch (error) {
      console.error('❌ Error fetching ERPNext website items:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Load data when component mounts or category changes**
  useEffect(() => {
    console.log("Loading ERPNext website items...");
    get_filtered_products_webshop();
  }, [selectedCategory]);

  // **🎯 Handle category changes**
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveHomeCategory(categoryName);
    setShowHomepageView(false);
    if (categoryName) {
      setSearchParams({ category: categoryName });
    } else {
      setSearchParams({});
      setShowHomepageView(true);
    }
  };

  // **🎯 Handle brand filtering**
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // **🎯 Filter products based on all criteria**
  const getFilteredProducts = (categoryFilter = '') => {
    const baseProducts = categoryFilter ? 
      products.filter(p => p.category === categoryFilter) : 
      (selectedCategory ? products.filter(p => p.category === selectedCategory) : products);
    
    return baseProducts.filter(product => {
      const matchesSearch = searchTerm === '' || 
        (product.item_name && product.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.web_item_name && product.web_item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.item_code && product.item_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.some(brand => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
      
      const matchesPrime = !primeOnly || product.badge === 'BESTSELLER';
      const matchesDelivery = !fastDelivery || product.inStock;
      const matchesRating = selectedRating === 0 || (product.rating && parseFloat(product.rating) >= selectedRating);
      const matchesCondition = !newItems || product.badge === 'NEW LAUNCH';
      
      let matchesPrice = true;
      if (selectedPriceRange) {
        const price = product.standard_rate || 0;
        switch (selectedPriceRange) {
          case 'Under ₹1,000':
            matchesPrice = price < 1000;
            break;
          case '₹1,000 - ₹5,000':
            matchesPrice = price >= 1000 && price <= 5000;
            break;
          case '₹5,000 - ₹10,000':
            matchesPrice = price >= 5000 && price <= 10000;
            break;
          case '₹10,000 - ₹25,000':
            matchesPrice = price >= 10000 && price <= 25000;
            break;
          case 'Over ₹25,000':
            matchesPrice = price > 25000;
            break;
          default:
            matchesPrice = true;
        }
      }
      
      return matchesSearch && matchesBrand && matchesPrime && matchesDelivery && 
             matchesRating && matchesCondition && matchesPrice;
    });
  };

  // **🎯 Render star ratings**
  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= numRating) {
        stars.push(<FaStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
      }
    }
    return stars;
  };

  // **🎯 Amazon-Style Sidebar Component**
  const AmazonSidebar = ({ isHomepage = false }) => (
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
          Category
        </h4>
        
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            color: '#007185',
            fontSize: '14px',
            fontWeight: '700'
          }}>
            <FaChevronLeft style={{ fontSize: '10px', marginRight: '6px' }} />
            {isHomepage ? 'Shop by Category' : 'All Products'}
          </span>
        </div>
        
        <div style={{ paddingLeft: '16px' }}>
          <div 
            style={{
              padding: '2px 0',
              fontSize: '13px',
              color: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '#007185' : '#565959',
              cursor: 'pointer',
              lineHeight: '16px',
              fontWeight: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '600' : '400'
            }}
            onClick={() => {
              if (isHomepage) {
                setActiveHomeCategory('');
              } else {
                handleCategoryChange('');
                setShowHomepageView(true);
              }
            }}
          >
            All Products
          </div>
          
          {categories.slice(0, 8).map((category) => (
            <div 
              key={category.name} 
              style={{
                padding: '2px 0',
                fontSize: '13px',
                color: (isHomepage && activeHomeCategory === category.name) || 
                       (!isHomepage && selectedCategory === category.name) ? '#007185' : '#565959',
                cursor: 'pointer',
                lineHeight: '16px',
                fontWeight: (isHomepage && activeHomeCategory === category.name) || 
                           (!isHomepage && selectedCategory === category.name) ? '600' : '400'
              }}
              onClick={() => {
                if (isHomepage) {
                  setActiveHomeCategory(category.name);
                } else {
                  handleCategoryChange(category.name);
                }
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      {/* Trade Blo Prime Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Trade Blo Prime
        </h4>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          lineHeight: '20px'
        }}>
          <input 
            type="checkbox" 
            style={{ 
              marginRight: '8px', 
              transform: 'scale(1.1)',
              accentColor: '#FF9900'
            }}
            checked={primeOnly}
            onChange={(e) => setPrimeOnly(e.target.checked)}
          />
          <span style={{ 
            color: '#007185', 
            fontSize: '14px',
            fontWeight: '700'
          }}>
            ✓prime
          </span>
        </label>
      </div>

      {/* Delivery Day */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Delivery Day
        </h4>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          lineHeight: '20px'
        }}>
          <input 
            type="checkbox" 
            style={{ 
              marginRight: '8px',
              transform: 'scale(1.1)',
              accentColor: '#FF9900'
            }}
            checked={fastDelivery}
            onChange={(e) => setFastDelivery(e.target.checked)}
          />
          <span style={{ color: '#0F1111', fontSize: '14px' }}>
            Get It by Tomorrow
          </span>
        </label>
      </div>

      {/* Dynamic Brands from ERPNext */}
      {availableBrands.length > 0 && (
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
          {availableBrands.slice(0, 6).map((brand) => (
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
      )}

      {/* Customer Reviews */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Customer Reviews
        </h4>
        {[4, 3, 2, 1].map((rating) => (
          <div 
            key={rating} 
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '4px',
              padding: '2px 0',
              lineHeight: '20px'
            }}
            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {renderStars(rating)}
              <span style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: selectedRating === rating ? '#FF9900' : '#007185',
                textDecoration: 'none',
                fontWeight: selectedRating === rating ? '600' : '400'
              }}>
                & Up
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Item Condition */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Item Condition
        </h4>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          lineHeight: '20px'
        }}>
          <input 
            type="checkbox" 
            style={{ 
              marginRight: '8px',
              transform: 'scale(1.1)',
              accentColor: '#FF9900'
            }}
            checked={newItems}
            onChange={(e) => setNewItems(e.target.checked)}
          />
          <span style={{ color: '#0F1111', fontSize: '14px' }}>
            New
          </span>
        </label>
      </div>

      {/* Price */}
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
          <div 
            key={range} 
            style={{
              cursor: 'pointer',
              padding: '2px 0',
              fontSize: '14px',
              color: selectedPriceRange === range ? '#007185' : '#0F1111',
              lineHeight: '20px',
              fontWeight: selectedPriceRange === range ? '600' : '400'
            }}
            onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}
          >
            {range}
          </div>
        ))}
      </div>
    </div>
  );

  // **🎯 Fixed Small Product Card Component for Homepage**
  const SmallProductCard = ({ product }) => {
    // Add safety checks for required properties
    if (!product) {
      return null;
    }

    return (
      <Link
        to={`/product/${product.route || product.id || product.name}`}
        style={{ textDecoration: 'none' }}
      >
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            position: 'relative',
            height: '220px',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        >
          {product.badge && (
            <div style={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              backgroundColor: product.badge === 'BESTSELLER' ? '#FF9900' : 
                              product.badge === 'WISHLIST' ? '#E91E63' :
                              product.badge === 'IN CART' ? '#4CAF50' :
                              product.badge === 'VARIANTS' ? '#2196F3' : '#0073E6',
              color: '#FFFFFF',
              fontSize: '8px',
              fontWeight: '600',
              padding: '2px 4px',
              borderRadius: '3px',
              zIndex: 1
            }}>
              {product.badge}
            </div>
          )}

          <div style={{
            width: '100%',
            height: '100px',
            marginBottom: '6px',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.item_name || product.web_item_name || 'Product'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const productName = product.item_name || product.web_item_name || 'Product';
                e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
              }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#0F1111',
              margin: '0 0 4px 0',
              lineHeight: '1.2',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {product.item_name || product.web_item_name || 'Product Name'}
            </h3>

            {/* Only show rating if it exists */}
            {product.rating && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                marginBottom: '4px'
              }}>
                <span style={{
                  backgroundColor: '#00A652',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: '600',
                  padding: '1px 3px',
                  borderRadius: '2px'
                }}>
                  {product.rating} ★
                </span>
                {product.reviews && (
                  <span style={{
                    fontSize: '9px',
                    color: '#565959'
                  }}>
                    ({product.reviews})
                  </span>
                )}
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '2px'
              }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#0F1111'
                }}>
                  {product.formatted_price || `₹${product.standard_rate ? product.standard_rate.toLocaleString() : '0'}`}
                </span>
                {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
                  <span style={{
                    fontSize: '9px',
                    color: '#565959',
                    textDecoration: 'line-through'
                  }}>
                    {product.formatted_mrp || `₹${product.originalPrice.toLocaleString()}`}
                  </span>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <div style={{
                  fontSize: '9px',
                  color: '#00A652',
                  fontWeight: '500'
                }}>
                  {product.discount}% off
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // **🎯 Loading State**
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
        Loading ERPNext website items...
      </div>
    );
  }

  // **🎯 Homepage View with Sidebar**
  if (showHomepageView) {
    const currentCategoryData = categories.find(cat => cat.name === activeHomeCategory);
    const homepageProducts = getFilteredProducts(activeHomeCategory).slice(0, 20);

    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh'
      }}>
        {/* Homepage with Sidebar Layout */}
        <div style={{
          display: 'flex',
          maxWidth: '100vw',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '20px'
        }}>
          
          {/* Amazon-Style Sidebar for Homepage */}
          <AmazonSidebar isHomepage={true} />

          {/* Main Homepage Content */}
          <div style={{ flex: 1, minHeight: '0' }}>
            
            {/* Shop by Category Section - Show Item Groups */}
            {categories.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#0F1111',
                  marginBottom: '20px'
                }}>
                  Shop by category
                </h2>
                
                {/* Category Carousel - Show Item Groups */}
                <div style={{
                  display: 'flex',
                  overflowX: 'auto',
                  gap: '20px',
                  paddingBottom: '10px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                  {categories.slice(0, 8).map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryChange(category.name)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '100px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginBottom: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/150x150?text=${encodeURIComponent(category.name.substring(0, 2))}`;
                          }}
                        />
                      </div>
                      <span style={{
                        fontSize: '11px',
                        color: '#565959',
                        fontWeight: '400',
                        lineHeight: '1.2'
                      }}>
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Navigation */}
            {categories.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '30px',
                overflowX: 'auto'
              }}>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveHomeCategory(cat.name)}
                    style={{
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '20px',
                      backgroundColor: activeHomeCategory === cat.name ? '#0F1111' : '#F7F8F8',
                      color: activeHomeCategory === cat.name ? '#FFFFFF' : '#565959',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* Top Products Section */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#0F1111',
                  margin: '0'
                }}>
                  {homepageProducts.length > 0 ? 
                    `Top ${Math.min(homepageProducts.length, 20)} | ${activeHomeCategory || 'All Products'}` : 
                    'ERPNext Website Items'}
                </h2>
                {activeHomeCategory && (
                  <button
                    onClick={() => handleCategoryChange(activeHomeCategory)}
                    style={{
                      color: '#0F1111',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    View All →
                  </button>
                )}
              </div>

              {/* Sort Bar for Homepage */}
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
                    <option value="name">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                <div style={{
                  fontSize: '14px',
                  color: '#565959'
                }}>
                  Showing {homepageProducts.length} products
                  {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
                   ' (filtered)'}
                </div>
              </div>

              {/* Products Grid - Using Your ERPNext Data */}
              {homepageProducts.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {homepageProducts.map((product) => (
                    <SmallProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  backgroundColor: '#F7F8F8',
                  borderRadius: '8px'
                }}>
                  <h3 style={{ color: '#0F1111', marginBottom: '12px' }}>
                    No ERPNext website items found
                  </h3>
                  <p style={{ color: '#565959', fontSize: '14px' }}>
                    Make sure you have website items configured in ERPNext with the webshop module enabled.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setPrimeOnly(false);
                      setFastDelivery(false);
                      setSelectedRating(0);
                      setNewItems(false);
                      setSelectedPriceRange('');
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0F1111',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '12px'
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* View More Button */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                onClick={() => setShowHomepageView(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0F1111',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // **🎯 Regular ProductsPage View with Sidebar**
  const sortedProducts = getFilteredProducts().sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return (a.standard_rate || 0) - (b.standard_rate || 0);
      case 'price_high':
        return (b.standard_rate || 0) - (a.standard_rate || 0);
      case 'rating':
        return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
      case 'newest':
        return new Date(b.creation || 0) - new Date(a.creation || 0);
      case 'name':
      default:
        return (a.item_name || '').localeCompare(b.item_name || '');
    }
  });

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '24px',
        padding: '20px'
      }}>
        
        {/* Amazon-Style Sidebar for Products View */}
        <AmazonSidebar isHomepage={false} />

        {/* Main Content */}
        <div style={{ flex: 1, minHeight: '0' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '400',
              color: '#0F1111',
              margin: '0 0 8px 0'
            }}>
              {selectedCategory || 'All ERPNext Products'}
            </h1>
            <div style={{
              fontSize: '14px',
              color: '#565959'
            }}>
              Showing {sortedProducts.length} website items from ERPNext
              {searchTerm && ` for "${searchTerm}"`}
              {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
               ' (filtered)'}
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
                <option value="name">Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
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

          {/* Products Grid - Your ERPNext Data */}
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
                No ERPNext website items found
              </h3>
              <p style={{
                color: '#565959',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                Make sure you have website items configured in ERPNext or try adjusting your filters
              </p>
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPrimeOnly(false);
                  setFastDelivery(false);
                  setSelectedRating(0);
                  setNewItems(false);
                  setSelectedPriceRange('');
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0F1111',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' 
                ? 'repeat(auto-fill, minmax(250px, 1fr))'
                : '1fr',
              gap: '16px'
            }}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
