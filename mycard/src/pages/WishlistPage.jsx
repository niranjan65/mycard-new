// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaHeart, FaTrash, FaShoppingCart, FaEye, FaShoppingBag } from 'react-icons/fa';
// import { addToCart, removeFromWishlist } from '../store/slices/cartSlice';
// import { COLORS } from '../constants/colors';

// const WishlistPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { wishlist } = useSelector(state => state.cart);

//   const handleRemoveFromWishlist = (itemName) => {
//     if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
//       dispatch(removeFromWishlist(itemName));
//     }
//   };

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     alert(`${product.item_name} added to cart!`);
//   };

//   const handleBuyNow = (product) => {
//     dispatch(addToCart(product));
//     navigate('/cart');
//   };

//   const handleViewProduct = (productName) => {
//     navigate(`/product/${productName}`);
//   };

//   if (wishlist.length === 0) {
//     return (
//       <div style={{
//         maxWidth: '800px',
//         margin: '0 auto',
//         padding: '80px 20px',
//         textAlign: 'center'
//       }}>
//         <FaHeart size={80} color={COLORS.gray} style={{ marginBottom: '24px' }} />
        
//         <h1 style={{
//           fontSize: '32px',
//           fontWeight: 'bold',
//           color: COLORS.textPrimary,
//           marginBottom: '16px'
//         }}>
//           Your Wishlist is Empty
//         </h1>
        
//         <p style={{
//           fontSize: '18px',
//           color: COLORS.textSecondary,
//           marginBottom: '32px',
//           lineHeight: '1.6'
//         }}>
//           Save items you love to your wishlist. Review them anytime and easily move them to your cart.
//         </p>
        
//         <Link 
//           to="/trade"
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '12px',
//             backgroundColor: COLORS.primary,
//             color: COLORS.white,
//             padding: '16px 32px',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             textDecoration: 'none',
//             borderRadius: '8px',
//             transition: 'background-color 0.3s ease'
//           }}
//         >
//           <FaShoppingBag size={20} />
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '40px 20px'
//     }}>
//       {/* Page Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '40px',
//         flexWrap: 'wrap',
//         gap: '16px'
//       }}>
//         <h1 style={{
//           fontSize: '32px',
//           fontWeight: 'bold',
//           color: COLORS.textPrimary,
//           margin: '0'
//         }}>
//           My Wishlist
//           <span style={{
//             fontSize: '16px',
//             color: COLORS.textSecondary,
//             fontWeight: 'normal',
//             marginLeft: '16px'
//           }}>
//             ({wishlist.length} items)
//           </span>
//         </h1>
        
//         <Link
//           to="/trade"
//           style={{
//             color: COLORS.primary,
//             fontSize: '16px',
//             fontWeight: '600',
//             textDecoration: 'none',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}
//         >
//           Add More Items
//         </Link>
//       </div>

//       {/* Wishlist Items Grid */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//         gap: '24px'
//       }}>
//         {wishlist.map((item) => (
//           <div
//             key={item.name}
//             style={{
//               backgroundColor: COLORS.white,
//               borderRadius: '12px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               overflow: 'hidden',
//               transition: 'all 0.3s ease',
//               position: 'relative'
//             }}
//           >
//             {/* Product Image */}
//             <div style={{
//               position: 'relative',
//               height: '200px',
//               overflow: 'hidden',
//               cursor: 'pointer'
//             }} onClick={() => handleViewProduct(item.name)}>
//               <img
//                 src={item.image || 'https://via.placeholder.com/300x200'}
//                 alt={item.item_name}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   transition: 'transform 0.3s ease'
//                 }}
//                 onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
//                 onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
//               />
              
//               {/* Remove from Wishlist Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemoveFromWishlist(item.name);
//                 }}
//                 style={{
//                   position: 'absolute',
//                   top: '12px',
//                   right: '12px',
//                   backgroundColor: COLORS.white,
//                   border: 'none',
//                   borderRadius: '50%',
//                   width: '40px',
//                   height: '40px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   cursor: 'pointer',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = COLORS.lightGray}
//                 onMouseOut={(e) => e.target.style.backgroundColor = COLORS.white}
//               >
//                 <FaHeart color={COLORS.error} size={18} />
//               </button>

//               {/* Quick View Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleViewProduct(item.name);
//                 }}
//                 style={{
//                   position: 'absolute',
//                   top: '12px',
//                   left: '12px',
//                   backgroundColor: COLORS.white,
//                   border: 'none',
//                   borderRadius: '50%',
//                   width: '40px',
//                   height: '40px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   cursor: 'pointer',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = COLORS.lightGray}
//                 onMouseOut={(e) => e.target.style.backgroundColor = COLORS.white}
//               >
//                 <FaEye color={COLORS.primary} size={18} />
//               </button>
//             </div>

//             {/* Product Info */}
//             <div style={{ padding: '20px' }}>
//               <h3 style={{
//                 fontSize: '18px',
//                 fontWeight: '600',
//                 color: COLORS.textPrimary,
//                 marginBottom: '8px',
//                 lineHeight: '1.4',
//                 cursor: 'pointer'
//               }} onClick={() => handleViewProduct(item.name)}>
//                 {item.item_name}
//               </h3>

//               <p style={{
//                 color: COLORS.textSecondary,
//                 fontSize: '14px',
//                 lineHeight: '1.5',
//                 marginBottom: '12px',
//                 display: '-webkit-box',
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: 'vertical',
//                 overflow: 'hidden'
//               }}>
//                 {item.description || 'High-quality product with excellent features and great value for money.'}
//               </p>

//               {/* Price */}
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 marginBottom: '16px',
//                 flexWrap: 'wrap',
//                 gap: '8px'
//               }}>
//                 <span style={{
//                   fontSize: '24px',
//                   fontWeight: 'bold',
//                   color: COLORS.primary
//                 }}>
//                   ₹{Math.round(item.standard_rate * 0.8)}
//                 </span>
//                 <span style={{
//                   fontSize: '18px',
//                   color: COLORS.gray,
//                   textDecoration: 'line-through'
//                 }}>
//                   ₹{item.standard_rate}
//                 </span>
//                 <span style={{
//                   backgroundColor: COLORS.success,
//                   color: COLORS.white,
//                   padding: '2px 6px',
//                   borderRadius: '4px',
//                   fontSize: '12px',
//                   fontWeight: 'bold'
//                 }}>
//                   20% OFF
//                 </span>
//               </div>

//               {/* Action Buttons */}
//               <div style={{
//                 display: 'flex',
//                 gap: '8px'
//               }}>
//                 <button
//                   onClick={() => handleAddToCart(item)}
//                   style={{
//                     flex: 1,
//                     backgroundColor: COLORS.secondary,
//                     color: COLORS.white,
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '12px 16px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '6px',
//                     transition: 'background-color 0.3s ease'
//                   }}
//                   onMouseOver={(e) => e.target.style.backgroundColor = COLORS.secondaryLight}
//                   onMouseOut={(e) => e.target.style.backgroundColor = COLORS.secondary}
//                 >
//                   <FaShoppingCart size={14} />
//                   Add to Cart
//                 </button>

//                 <button
//                   onClick={() => handleBuyNow(item)}
//                   style={{
//                     flex: 1,
//                     backgroundColor: COLORS.primary,
//                     color: COLORS.white,
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '12px 16px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.3s ease'
//                   }}
//                   onMouseOver={(e) => e.target.style.backgroundColor = COLORS.primaryDark}
//                   onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Actions */}
//       <div style={{
//         marginTop: '48px',
//         padding: '24px',
//         backgroundColor: COLORS.white,
//         borderRadius: '12px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         textAlign: 'center'
//       }}>
//         <h3 style={{
//           fontSize: '20px',
//           fontWeight: 'bold',
//           color: COLORS.textPrimary,
//           marginBottom: '12px'
//         }}>
//           Looking for something else?
//         </h3>
//         <p style={{
//           color: COLORS.textSecondary,
//           marginBottom: '20px'
//         }}>
//           Explore our wide range of products and find exactly what you need
//         </p>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           gap: '16px',
//           flexWrap: 'wrap'
//         }}>
//           <Link
//             to="/trade"
//             style={{
//               backgroundColor: COLORS.primary,
//               color: COLORS.white,
//               padding: '12px 24px',
//               fontSize: '16px',
//               fontWeight: '600',
//               textDecoration: 'none',
//               borderRadius: '8px',
//               transition: 'background-color 0.3s ease'
//             }}
//           >
//             Browse All Products
//           </Link>
//           <Link
//             to="/products?category=electronics"
//             style={{
//               backgroundColor: 'transparent',
//               color: COLORS.primary,
//               padding: '12px 24px',
//               fontSize: '16px',
//               fontWeight: '600',
//               textDecoration: 'none',
//               borderRadius: '8px',
//               border: `2px solid ${COLORS.primary}`,
//               transition: 'all 0.3s ease'
//             }}
//           >
//             Popular Categories
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;


////////////////////////////////////////////////////////////////////////////////////////



import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart, FaEye, FaShoppingBag, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { COLORS } from '../constants/colors';
import Cookies from 'js-cookie';

const WishlistPage = () => {
  const navigate = useNavigate();
  
  // **🎯 Enhanced ERPNext Wishlist State**
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});
  const [notification, setNotification] = useState(null);
  const [loadingPrices, setLoadingPrices] = useState({});

  // **🎯 Show notification helper**
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // **🎯 Fetch Item Price from ERPNext**
  const fetchItemPrice = async (itemCode) => {
    try {
      setLoadingPrices(prev => ({ ...prev, [itemCode]: true }));
      console.log(`💰 Fetching price for ${itemCode}...`);

      // Try to get price from Item Price first
      const priceResponse = await fetch(`/api/resource/Item Price?filters=[["item_code","=","${itemCode}"],["selling","=",1]]&fields=["price_list_rate","currency"]&limit=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      });

      if (priceResponse.ok) {
        const priceResult = await priceResponse.json();
        if (priceResult.data && priceResult.data.length > 0) {
          console.log(`✅ Price found for ${itemCode}:`, priceResult.data[0].price_list_rate);
          return {
            standard_rate: priceResult.data[0].price_list_rate,
            currency: priceResult.data[0].currency || 'INR'
          };
        }
      }

      // If no Item Price found, try to get from Item master
      const itemResponse = await fetch(`/api/resource/Item/${itemCode}?fields=["standard_rate","currency"]`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      });

      if (itemResponse.ok) {
        const itemResult = await itemResponse.json();
        if (itemResult.data && itemResult.data.standard_rate) {
          console.log(`✅ Standard rate found for ${itemCode}:`, itemResult.data.standard_rate);
          return {
            standard_rate: itemResult.data.standard_rate,
            currency: itemResult.data.currency || 'INR'
          };
        }
      }

      // If still no price found, try Website Item
      const webItemResponse = await fetch(`/api/resource/Website Item?filters=[["item_code","=","${itemCode}"]]&fields=["price_list_rate"]&limit=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      });

      if (webItemResponse.ok) {
        const webItemResult = await webItemResponse.json();
        if (webItemResult.data && webItemResult.data.length > 0 && webItemResult.data[0].price_list_rate) {
          console.log(`✅ Website item price found for ${itemCode}:`, webItemResult.data[0].price_list_rate);
          return {
            standard_rate: webItemResult.data[0].price_list_rate,
            currency: 'INR'
          };
        }
      }

      console.log(`⚠️ No price found for ${itemCode}, using default`);
      return {
        standard_rate: 2990, // Default fallback price
        currency: 'INR'
      };

    } catch (error) {
      console.error(`❌ Error fetching price for ${itemCode}:`, error);
      return {
        standard_rate: 2990, // Default fallback price
        currency: 'INR'
      };
    } finally {
      setLoadingPrices(prev => ({ ...prev, [itemCode]: false }));
    }
  };

  // **🎯 Get Current Wishlist from ERPNext**
  const getWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("💖 Fetching wishlist from ERPNext...");

      const currentUser = Cookies.get('user_id');

      // Since there's no direct get_wishlist API, we'll fetch the user's wishlist document
      const response = await fetch(`/api/resource/Wishlist/${currentUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No wishlist exists yet
          console.log("ℹ️ No wishlist found for user");
          setWishlistItems([]);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("💖 ERPNext Wishlist API Response:", result);

      if (result.data && result.data.items) {
        // First, create items with basic data
        const basicWishlistItems = result.data.items.map(item => ({
          // ERPNext wishlist item fields
          item_code: item.item_code,
          item_name: item.item_name,
          web_item_name: item.web_item_name,
          item_group: item.item_group,
          website_item: item.website_item,
          
          // Image and display data
          image: item.image || item.website_image || '/placeholder.jpg',
          route: item.route,
          warehouse: item.warehouse,
          
          // Computed fields for display
          id: item.item_code,
          name: item.item_code, // For compatibility with existing code
          description: `Premium ${item.item_name || item.web_item_name} from our collection`,
          standard_rate: null, // Will be fetched
          currency: 'INR',
          
          // ERPNext specific data
          original_erpnext_data: item
        }));

        setWishlistItems(basicWishlistItems);
        console.log("✅ Basic wishlist loaded with", basicWishlistItems.length, "items");

        // Now fetch prices for each item
        const itemsWithPrices = await Promise.all(
          basicWishlistItems.map(async (item) => {
            const priceData = await fetchItemPrice(item.item_code);
            return {
              ...item,
              standard_rate: priceData.standard_rate,
              currency: priceData.currency
            };
          })
        );

        setWishlistItems(itemsWithPrices);
        console.log("✅ Wishlist updated with prices for", itemsWithPrices.length, "items");
        
      } else {
        console.log("ℹ️ Wishlist is empty");
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('❌ Error fetching ERPNext wishlist:', error);
      setError(`Failed to load wishlist: ${error.message}`);
      showNotification('Failed to load wishlist. Please refresh the page.', 'error');
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  // **🎯 Add Item to ERPNext Wishlist**
  const addToWishlist = async (itemCode) => {
    try {
      setUpdating(prev => ({ ...prev, [itemCode]: true }));
      console.log(`💖 Adding ${itemCode} to ERPNext wishlist...`);

      const response = await fetch("/api/method/webshop.webshop.doctype.wishlist.wishlist.add_to_wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: itemCode
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("💖 Add to Wishlist API Response:", result);

      console.log("✅ Successfully added to wishlist");
      showNotification('Item added to wishlist successfully!', 'success');
      
      // Refresh wishlist data after add
      await getWishlist();
      return true;

    } catch (error) {
      console.error('❌ Error adding to wishlist:', error);
      showNotification('Failed to add to wishlist. Please try again.', 'error');
      return false;
    } finally {
      setUpdating(prev => ({ ...prev, [itemCode]: false }));
    }
  };

  // Remove Item from ERPNext Wishlist**
  const removeFromWishlist = async (itemCode, itemName) => {
    if (!window.confirm(`Are you sure you want to remove "${itemName}" from your wishlist?`)) {
      return;
    }

    try {
      setUpdating(prev => ({ ...prev, [itemCode]: true }));
      console.log(`💔 Removing ${itemCode} from ERPNext wishlist...`);

      const response = await fetch("/api/method/webshop.webshop.doctype.wishlist.wishlist.remove_from_wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: itemCode
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("💔 Remove from Wishlist API Response:", result);

      console.log("✅ Successfully removed from wishlist");
      showNotification('Item removed from wishlist', 'success');
      
      // Refresh wishlist data after removal
      await getWishlist();
      return true;

    } catch (error) {
      console.error('❌ Error removing from wishlist:', error);
      showNotification('Failed to remove from wishlist. Please try again.', 'error');
      return false;
    } finally {
      setUpdating(prev => ({ ...prev, [itemCode]: false }));
    }
  };

  // Add Item to Cart from Wishlist**
  const handleAddToCart = async (item) => {
    try {
      console.log(`🛒 Adding ${item.item_code} to cart...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: item.item_code,
          qty: 1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🛒 Add to Cart API Response:", result);

      if (result.message) {
        showNotification(`${item.item_name} added to cart!`, 'success');
        return true;
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      showNotification('Failed to add to cart. Please try again.', 'error');
      return false;
    }
  };

  // Buy Now - Add to Cart and Navigate**
  const handleBuyNow = async (item) => {
    const success = await handleAddToCart(item);
    if (success) {
      navigate('/cart');
    }
  };

  // View Product Details**
  const handleViewProduct = (itemCode) => {
    navigate(`/product/${itemCode}`);
  };

  //Load wishlist on component mount**
  useEffect(() => {
    console.log("Loading ERPNext wishlist data...");
    getWishlist();
  }, [getWishlist]);

  // Notification Component**
  const NotificationBar = () => {
    if (!notification) return null;

    const getIcon = () => {
      switch (notification.type) {
        case 'success': return <FaCheckCircle />;
        case 'error': return <FaExclamationTriangle />;
        case 'warning': return <FaExclamationTriangle />;
        default: return <FaHeart />;
      }
    };

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
        {getIcon()}
        <span>{notification.message}</span>
      </div>
    );
  };

  // Enhanced Loading State**
  if (loading) {
    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <FaSpinner 
            size={40} 
            color="#FF9900" 
            style={{ 
              animation: 'spin 1s linear infinite',
              marginBottom: '16px'
            }} 
          />
          <p style={{ color: '#565959', fontSize: '16px' }}>
            Loading your ERPNext wishlist...
          </p>
        </div>
      </div>
    );
  }

  // **🎯 Error State**
  if (error && wishlistItems.length === 0) {
    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <FaExclamationTriangle size={60} color="#B12704" style={{ marginBottom: '20px' }} />
          <h2 style={{ color: '#B12704', marginBottom: '16px' }}>
            Failed to Load Wishlist
          </h2>
          <p style={{ color: '#565959', marginBottom: '20px' }}>
            {error}
          </p>
          <button
            onClick={getWishlist}
            style={{
              backgroundColor: '#FF9900',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // **🎯 Enhanced Empty Wishlist State**
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <>
        <NotificationBar />
        <div style={{
          backgroundColor: '#FFFFFF',
          minHeight: '100vh',
          padding: '40px 20px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            {/* Back Button */}
            <div style={{ marginBottom: '40px', textAlign: 'left' }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  backgroundColor: 'transparent',
                  border: '2px solid #D5D9D9',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#0F1111',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#007185';
                  e.target.style.color = '#007185';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#D5D9D9';
                  e.target.style.color = '#0F1111';
                }}
              >
                <FaArrowLeft size={14} />
                Back to Products
              </button>
            </div>

            <FaHeart size={100} color="#CCCCCC" style={{ marginBottom: '32px' }} />
            
            <h1 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#0F1111',
              margin: '0 0 20px 0'
            }}>
              Your ERPNext Wishlist is Empty
            </h1>
            
            <p style={{
              fontSize: '18px',
              color: '#565959',
              marginBottom: '32px',
              lineHeight: '1.5'
            }}>
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.<br/>
              Start exploring our amazing collection!
            </p>
            
            <Link 
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#FF9900',
                color: '#FFFFFF',
                padding: '18px 36px',
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#E88B00';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#FF9900';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaShoppingBag size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Main Wishlist Items Display**
  return (
    <>
      <NotificationBar />
      <div style={{
        backgroundColor: '#F8F9FA',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Enhanced Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
            backgroundColor: '#FFFFFF',
            padding: '20px 30px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: 'transparent',
                border: '2px solid #D5D9D9',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#0F1111',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#007185';
                e.target.style.color = '#007185';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#D5D9D9';
                e.target.style.color = '#0F1111';
              }}
            >
              <FaArrowLeft size={14} />
              Back
            </button>

            <div style={{ textAlign: 'center' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#0F1111',
                margin: '0 0 8px 0'
              }}>
                My Wishlist
              </h1>
              <p style={{
                color: '#565959',
                fontSize: '16px',
                margin: 0
              }}>
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} • 
                ERPNext Integration Active
              </p>
            </div>

            <Link
              to="/trade"
              style={{
                color: '#007185',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                border: '2px solid #007185',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#007185';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#007185';
              }}
            >
              Add More Items
            </Link>
          </div>

          {/* Enhanced Wishlist Items Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {wishlistItems.map((item) => {
              const isItemUpdating = updating[item.item_code] || false;
              const isLoadingPrice = loadingPrices[item.item_code] || false;
              
              return (
                <div
                  key={item.item_code}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    border: '1px solid #E5E7EB',
                    opacity: isItemUpdating ? 0.7 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!isItemUpdating) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isItemUpdating) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  {/* Loading overlay for individual items */}
                  {isItemUpdating && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      zIndex: 10
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#FF9900',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}>
                        <FaSpinner 
                          size={20} 
                          color="#FF9900" 
                          style={{ animation: 'spin 1s linear infinite' }} 
                        />
                        Updating...
                      </div>
                    </div>
                  )}

                  {/* Enhanced Product Image */}
                  <div style={{
                    position: 'relative',
                    height: '220px',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }} onClick={() => handleViewProduct(item.item_code)}>
                    <img
                      src={item.image}
                      alt={item.item_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        if (!isItemUpdating) e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        if (!isItemUpdating) e.target.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/320x220?text=${encodeURIComponent(item.item_name.substring(0, 5))}`;
                      }}
                    />
                    
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item.item_code, item.item_name);
                      }}
                      disabled={isItemUpdating}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease',
                        opacity: isItemUpdating ? 0.6 : 1
                      }}
                      onMouseOver={(e) => {
                        if (!isItemUpdating) e.target.style.backgroundColor = '#FEE2E2';
                      }}
                      onMouseOut={(e) => {
                        if (!isItemUpdating) e.target.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      <FaHeart color="#B12704" size={18} />
                    </button>

                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProduct(item.item_code);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#F0F8FF'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                    >
                      <FaEye color="#007185" size={18} />
                    </button>

                    {/* ERPNext Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: '#007185',
                      color: '#FFFFFF',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      ERPNext Item
                    </div>
                  </div>

                  {/* Enhanced Product Info */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#0F1111',
                      marginBottom: '8px',
                      lineHeight: '1.4',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onClick={() => handleViewProduct(item.item_code)}
                    onMouseOver={(e) => e.target.style.color = '#007185'}
                    onMouseOut={(e) => e.target.style.color = '#0F1111'}
                    >
                      {item.item_name || item.web_item_name}
                    </h3>

                    <div style={{
                      fontSize: '14px',
                      color: '#565959',
                      marginBottom: '8px'
                    }}>
                      <span><strong>Code:</strong> {item.item_code}</span>
                      {item.item_group && (
                        <span style={{ marginLeft: '12px' }}>
                          <strong>Category:</strong> {item.item_group}
                        </span>
                      )}
                    </div>

                    <p style={{
                      color: '#666666',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.description || 'High-quality product with excellent features and great value for money.'}
                    </p>

                    {/* Enhanced Price Section with ERPNext Pricing */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {isLoadingPrice ? (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#FF9900',
                          fontSize: '14px'
                        }}>
                          <FaSpinner 
                            size={14} 
                            color="#FF9900" 
                            style={{ animation: 'spin 1s linear infinite' }} 
                          />
                          Loading price...
                        </div>
                      ) : item.standard_rate ? (
                        <>
                          <span style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#B12704'
                          }}>
                            ₹{Math.round(item.standard_rate * 1).toLocaleString('en-IN')}
                          </span>
                          <span style={{
                            fontSize: '18px',
                            color: '#666666',
                            textDecoration: 'line-through'
                          }}>
                            ₹{item.standard_rate?.toLocaleString('en-IN')}
                          </span>
                          {/* <span style={{
                            backgroundColor: '#00A652',
                            color: '#FFFFFF',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                          </span> */}
                          <div style={{
                            fontSize: '12px',
                            color: '#007185',
                            backgroundColor: '#F0F8FF',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid #E0F2FE'
                          }}>
                          </div>
                        </>
                      ) : (
                        <span style={{
                          fontSize: '16px',
                          color: '#666666'
                        }}>
                          Price not available
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isItemUpdating}
                        style={{
                          flex: 1,
                          backgroundColor: isItemUpdating ? '#F0F0F0' : '#4f4b45ff',
                          color: isItemUpdating ? '#999999' : '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '12px 16px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'background-color 0.3s ease',
                          opacity: isItemUpdating ? 0.6 : 1
                        }}
                        onMouseOver={(e) => {
                          if (!isItemUpdating) e.target.style.backgroundColor = '#005F73';
                        }}
                        onMouseOut={(e) => {
                          if (!isItemUpdating) e.target.style.backgroundColor = '#4f4b45ff';
                        }}
                      >
                        <FaShoppingCart size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Bottom Actions */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '30px',
            textAlign: 'center',
            border: '1px solid #E5E7EB'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#0F1111',
              marginBottom: '12px'
            }}>
              Looking for something else?
            </h3>
            <p style={{
              color: '#565959',
              marginBottom: '24px',
              fontSize: '16px'
            }}>
              Explore our wide range of products and find exactly what you need
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/cart"
                style={{
                  backgroundColor: 'transparent',
                  color: '#007185',
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  border: '2px solid #007185',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#007185';
                  e.target.style.color = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#007185';
                }}
              >
                <FaShoppingCart size={16} />
                View Cart
              </Link>
            </div>
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

export default WishlistPage;
