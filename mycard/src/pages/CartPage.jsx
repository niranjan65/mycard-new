// import React, { useEffect, useState, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingBag, FaMinus, FaPlus, FaTrash, FaArrowLeft, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';

// const CartPage = () => {
//   const navigate = useNavigate();
  
//   // **🎯 Enhanced ERPNext Cart State**
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cartSummary, setCartSummary] = useState({
//     total_items: 0,
//     total_amount: 0,
//     net_total: 0,
//     grand_total: 0,
//     taxes: 0,
//     shipping_charges: 0,
//     discount: 0
//   });
//   const [updating, setUpdating] = useState({});
//   const [notification, setNotification] = useState(null);

//   // **🎯 Show notification helper**
//   const showNotification = useCallback((message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   }, []);

//   // **🎯 Enhanced Get Current Cart from ERPNext**
//   const getCurrentCart = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log("🛒 Fetching current cart from ERPNext...");

//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.get_cart_quotation", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         credentials: 'include',
//         redirect: "follow"
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("🛒 ERPNext Cart API Response:", result);

//       if (result.message && result.message.doc) {
//         const cartData = result.message.doc;
//         const cartItems = cartData.items || [];
        
//         console.log("✅ Cart items found:", cartItems);
        
//         // Transform ERPNext cart items to display format
//         const transformedCartItems = cartItems.map(item => ({
//           // ERPNext cart item fields
//           item_code: item.item_code,
//           item_name: item.item_name || item.web_item_name,
//           qty: item.qty,
//           rate: item.rate,
//           amount: item.amount,
          
//           // Additional item details from ERPNext
//           image: item.thumbnail || item.website_image || item.image || '/placeholder.jpg',
//           description: item.description || `Premium ${item.item_name} from ERPNext`,
//           brand: item.brand || 'Generic',
//           item_group: item.item_group || 'General',
//           warehouse: item.warehouse || '',
//           additional_notes: item.additional_notes || '',
          
//           // Computed fields
//           id: item.item_code,
//           quantity: item.qty,
//           standard_rate: item.rate,
//           total_price: item.amount,
          
//           // Stock status
//           in_stock: true,
          
//           // Original ERPNext data
//           original_erpnext_data: item
//         }));

//         setCartItems(transformedCartItems);
        
//         // Enhanced cart summary from ERPNext response
//         setCartSummary({
//           total_items: cartData.total_qty || cartItems.reduce((sum, item) => sum + item.qty, 0),
//           total_amount: cartData.total || 0,
//           net_total: cartData.net_total || 0,
//           grand_total: cartData.grand_total || cartData.net_total || 0,
//           taxes: cartData.total_taxes_and_charges || ((cartData.grand_total || 0) - (cartData.net_total || 0)),
//           shipping_charges: cartData.shipping_charges || 0,
//           discount: cartData.discount_amount || 0
//         });

//         console.log("✅ Cart loaded with", transformedCartItems.length, "items");
        
//       } else {
//         console.log("ℹ️ Cart is empty or no cart found");
//         setCartItems([]);
//         setCartSummary({
//           total_items: 0,
//           total_amount: 0,
//           net_total: 0,
//           grand_total: 0,
//           taxes: 0,
//           shipping_charges: 0,
//           discount: 0
//         });
//       }
//     } catch (error) {
//       console.error('❌ Error fetching ERPNext cart:', error);
//       setError(`Failed to load cart: ${error.message}`);
//       showNotification('Failed to load cart. Please refresh the page.', 'error');
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [showNotification]);

//   // **🎯 Enhanced Update Cart Quantity in ERPNext**
//   const updateCartQuantity = async (itemCode, newQuantity, additionalNotes = null) => {
//     try {
//       setUpdating(prev => ({ ...prev, [itemCode]: true }));
//       console.log(`🛒 Updating ${itemCode} quantity to ${newQuantity}...`);

//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           item_code: itemCode,
//           qty: newQuantity,
//           additional_notes: additionalNotes
//         }),
//         redirect: "follow"
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("🛒 Update Cart API Response:", result);

//       if (result.message) {
//         console.log("✅ Successfully updated cart quantity");
//         showNotification(
//           newQuantity === 0 ? 'Item removed from cart' : 'Cart updated successfully', 
//           'success'
//         );
//         // Refresh cart data after update
//         await getCurrentCart();
//         return true;
//       } else {
//         throw new Error("Failed to update cart");
//       }
//     } catch (error) {
//       console.error('❌ Error updating cart:', error);
//       showNotification('Failed to update cart. Please try again.', 'error');
//       return false;
//     } finally {
//       setUpdating(prev => ({ ...prev, [itemCode]: false }));
//     }
//   };

//   // **🎯 Enhanced Remove Item from ERPNext Cart**
//   const removeFromCart = async (itemCode, itemName) => {
//     if (!window.confirm(`Are you sure you want to remove "${itemName}" from cart?`)) {
//       return;
//     }

//     return await updateCartQuantity(itemCode, 0);
//   };

//   // **🎯 Clear Entire Cart**
//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your entire cart?')) {
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("🗑️ Clearing entire cart...");

//       // Remove each item individually
//       const clearPromises = cartItems.map(item => 
//         updateCartQuantity(item.item_code, 0)
//       );
      
//       await Promise.all(clearPromises);

//       console.log("✅ Cart cleared successfully");
//       showNotification("Cart cleared successfully!", 'success');
      
//     } catch (error) {
//       console.error('❌ Error clearing cart:', error);
//       showNotification("Error clearing cart. Please try again.", 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Enhanced Handle Quantity Changes**
//   const handleQuantityChange = async (itemCode, currentQty, change) => {
//     const newQuantity = Math.max(0, currentQty + change);
    
//     if (newQuantity === 0) {
//       const item = cartItems.find(item => item.item_code === itemCode);
//       await removeFromCart(itemCode, item?.item_name || itemCode);
//     } else {
//       await updateCartQuantity(itemCode, newQuantity);
//     }
//   };

//   // **🎯 Request for Quotation**
//   const handleRequestQuotation = async () => {
//     if (cartItems.length === 0) {
//       showNotification('Your cart is empty. Please add items before requesting a quotation.', 'warning');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.request_for_quotation", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.message) {
//         showNotification(`Quotation requested successfully! Reference: ${result.message}`, 'success');
//         // Optionally redirect to quotations page
//         // navigate('/quotations');
//       } else {
//         throw new Error('Failed to request quotation');
//       }
//     } catch (error) {
//       console.error('Error requesting quotation:', error);
//       showNotification('Failed to request quotation. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Enhanced Handle Checkout**
//   const handleCheckout = async () => {
//     if (cartItems.length === 0) {
//       showNotification('Your cart is empty. Please add items before checkout.', 'warning');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log("🛒 Proceeding to checkout with ERPNext data:", {
//         items: cartItems.length,
//         total: cartSummary.grand_total
//       });

//       // You can implement actual order placement here
//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.place_order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.message) {
//         showNotification(`Order placed successfully! Order ID: ${result.message}`, 'success');
//         navigate(`/order-confirmation/${result.message}`);
//       } else {
//         // If not ready to place order, show summary
//         showNotification(`Proceeding to checkout with ${cartSummary.total_items} items worth ₹${cartSummary.grand_total.toFixed(2)}`, 'info');
//         navigate('/checkout');
//       }
//     } catch (error) {
//       console.error('Error during checkout:', error);
//       showNotification('Checkout failed. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Load cart on component mount**
//   useEffect(() => {
//     console.log("Loading ERPNext cart data...");
//     getCurrentCart();
//   }, [getCurrentCart]);

//   // **🎯 Auto-refresh cart every 30 seconds**
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!loading && !Object.keys(updating).some(key => updating[key])) {
//         getCurrentCart();
//       }
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [getCurrentCart, loading, updating]);

//   // **🎯 Notification Component**
//   const NotificationBar = () => {
//     if (!notification) return null;

//     const getIcon = () => {
//       switch (notification.type) {
//         case 'success': return <FaCheckCircle />;
//         case 'error': return <FaExclamationTriangle />;
//         case 'warning': return <FaExclamationTriangle />;
//         default: return <FaShoppingCart />;
//       }
//     };

//     const getColor = () => {
//       switch (notification.type) {
//         case 'success': return '#00A652';
//         case 'error': return '#B12704';
//         case 'warning': return '#FF9900';
//         default: return '#007185';
//       }
//     };

//     return (
//       <div style={{
//         position: 'fixed',
//         top: '20px',
//         right: '20px',
//         backgroundColor: getColor(),
//         color: 'white',
//         padding: '12px 20px',
//         borderRadius: '8px',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//         zIndex: 1000,
//         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//         maxWidth: '400px'
//       }}>
//         {getIcon()}
//         <span>{notification.message}</span>
//       </div>
//     );
//   };

//   // **🎯 Enhanced Loading State**
//   if (loading && cartItems.length === 0) {
//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh',
//         padding: '40px 20px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <FaSpinner 
//             size={40} 
//             color="#FF9900" 
//             style={{ 
//               animation: 'spin 1s linear infinite',
//               marginBottom: '16px'
//             }} 
//           />
//           <p style={{ color: '#565959', fontSize: '16px' }}>
//             Loading your ERPNext cart...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // **🎯 Error State**
//   if (error && cartItems.length === 0) {
//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh',
//         padding: '40px 20px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <div style={{ textAlign: 'center', maxWidth: '600px' }}>
//           <FaExclamationTriangle size={60} color="#B12704" style={{ marginBottom: '20px' }} />
//           <h2 style={{ color: '#B12704', marginBottom: '16px' }}>
//             Failed to Load Cart
//           </h2>
//           <p style={{ color: '#565959', marginBottom: '20px' }}>
//             {error}
//           </p>
//           <button
//             onClick={getCurrentCart}
//             style={{
//               backgroundColor: '#FF9900',
//               color: 'white',
//               border: 'none',
//               padding: '12px 24px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: '600'
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // **🎯 Enhanced Empty Cart State**
//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <>
//         <NotificationBar />
//         <div style={{
//           backgroundColor: '#FFFFFF',
//           minHeight: '100vh',
//           padding: '40px 20px'
//         }}>
//           <div style={{
//             maxWidth: '800px',
//             margin: '0 auto',
//             textAlign: 'center'
//           }}>
//             {/* Back Button */}
//             <div style={{ marginBottom: '40px', textAlign: 'left' }}>
//               <button
//                 onClick={() => navigate(-1)}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   padding: '10px 18px',
//                   backgroundColor: 'transparent',
//                   border: '2px solid #D5D9D9',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   color: '#0F1111',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.borderColor = '#007185';
//                   e.target.style.color = '#007185';
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.borderColor = '#D5D9D9';
//                   e.target.style.color = '#0F1111';
//                 }}
//               >
//                 <FaArrowLeft size={14} />
//                 Back to Products
//               </button>
//             </div>

//             <FaShoppingBag size={100} color="#CCCCCC" style={{ marginBottom: '32px' }} />
            
//             <h2 style={{
//               fontSize: '36px',
//               fontWeight: '600',
//               color: '#0F1111',
//               margin: '0 0 20px 0'
//             }}>
//               Your cart is empty
//             </h2>
            
//             <p style={{
//               fontSize: '18px',
//               color: '#565959',
//               marginBottom: '32px',
//               lineHeight: '1.5'
//             }}>
//               Looks like you haven't added anything to your cart yet.<br/>
//               Browse our products and find something you love!
//             </p>
            
//             <Link 
//               to="/trade"
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 backgroundColor: '#FF9900',
//                 color: '#FFFFFF',
//                 padding: '18px 36px',
//                 fontSize: '18px',
//                 fontWeight: '600',
//                 textDecoration: 'none',
//                 borderRadius: '8px',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.backgroundColor = '#E88B00';
//                 e.target.style.transform = 'translateY(-2px)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.backgroundColor = '#FF9900';
//                 e.target.style.transform = 'translateY(0)';
//               }}
//             >
//               <FaShoppingBag size={18} /> Start Shopping
//             </Link>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // **🎯 Main Cart Items Display**
//   return (
//     <>
//       <NotificationBar />
//       <div style={{
//         backgroundColor: '#F8F9FA',
//         minHeight: '100vh',
//         padding: '20px'
//       }}>
//         <div style={{
//           maxWidth: '1400px',
//           margin: '0 auto'
//         }}>
//           {/* Enhanced Header */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginBottom: '30px',
//             backgroundColor: '#FFFFFF',
//             padding: '20px 30px',
//             borderRadius: '10px',
//             boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
//           }}>
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 padding: '10px 18px',
//                 backgroundColor: 'transparent',
//                 border: '2px solid #D5D9D9',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 color: '#0F1111',
//                 fontSize: '14px',
//                 fontWeight: '600',
//                 transition: 'all 0.2s ease'
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.borderColor = '#007185';
//                 e.target.style.color = '#007185';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.borderColor = '#D5D9D9';
//                 e.target.style.color = '#0F1111';
//               }}
//             >
//               <FaArrowLeft size={14} />
//               Back
//             </button>
            
//             <div style={{ textAlign: 'center' }}>
//               <h1 style={{
//                 fontSize: '32px',
//                 fontWeight: '600',
//                 color: '#0F1111',
//                 margin: '0 0 8px 0'
//               }}>
//                 Shopping Cart
//               </h1>
//               <p style={{
//                 color: '#565959',
//                 fontSize: '16px',
//                 margin: 0
//               }}>
//                 {cartSummary.total_items} {cartSummary.total_items === 1 ? 'item' : 'items'} • 
//                 ERPNext Integration Active
//               </p>
//             </div>

//             <div style={{ display: 'flex', gap: '10px' }}>
//               <button
//                 onClick={handleRequestQuotation}
//                 disabled={loading || cartItems.length === 0}
//                 style={{
//                   padding: '10px 18px',
//                   backgroundColor: '#007185',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: loading || cartItems.length === 0 ? 'not-allowed' : 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   opacity: loading || cartItems.length === 0 ? 0.6 : 1,
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => {
//                   if (!loading && cartItems.length > 0) {
//                     e.target.style.backgroundColor = '#005F73';
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   if (!loading && cartItems.length > 0) {
//                     e.target.style.backgroundColor = '#007185';
//                   }
//                 }}
//               >
//                 Request Quote
//               </button>
              
//               <button
//                 onClick={clearCart}
//                 disabled={loading || cartItems.length === 0}
//                 style={{
//                   padding: '10px 18px',
//                   backgroundColor: '#B12704',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: loading || cartItems.length === 0 ? 'not-allowed' : 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   opacity: loading || cartItems.length === 0 ? 0.6 : 1,
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => {
//                   if (!loading && cartItems.length > 0) {
//                     e.target.style.backgroundColor = '#A02100';
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   if (!loading && cartItems.length > 0) {
//                     e.target.style.backgroundColor = '#B12704';
//                   }
//                 }}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>

//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: window.innerWidth > 1024 ? '2fr 1fr' : '1fr',
//             gap: '30px'
//           }}>
//             {/* Enhanced Cart Items */}
//             <div>
//               {cartItems.map((item, index) => {
//                 const isItemUpdating = updating[item.item_code] || false;
                
//                 return (
//                   <div
//                     key={item.item_code || index}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       padding: '25px',
//                       backgroundColor: '#FFFFFF',
//                       marginBottom: '15px',
//                       borderRadius: '12px',
//                       boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//                       border: '1px solid #E5E7EB',
//                       opacity: isItemUpdating ? 0.7 : 1,
//                       position: 'relative',
//                       transition: 'all 0.2s ease',
//                       flexDirection: window.innerWidth < 768 ? 'column' : 'row',
//                       textAlign: window.innerWidth < 768 ? 'center' : 'left'
//                     }}
//                   >
//                     {/* Loading overlay for individual items */}
//                     {isItemUpdating && (
//                       <div style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         backgroundColor: 'rgba(255,255,255,0.9)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: '12px',
//                         zIndex: 10
//                       }}>
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '12px',
//                           color: '#FF9900',
//                           fontSize: '16px',
//                           fontWeight: '600'
//                         }}>
//                           <FaSpinner 
//                             size={20} 
//                             color="#FF9900" 
//                             style={{ animation: 'spin 1s linear infinite' }} 
//                           />
//                           Updating...
//                         </div>
//                       </div>
//                     )}

//                     {/* Enhanced Product Image */}
//                     <Link 
//                       to={`/product/${item.item_code}`} 
//                       style={{ 
//                         flexShrink: 0, 
//                         marginRight: window.innerWidth < 768 ? '0' : '25px',
//                         marginBottom: window.innerWidth < 768 ? '15px' : '0',
//                         display: 'block',
//                         borderRadius: '8px',
//                         overflow: 'hidden',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                       }}
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.item_name}
//                         style={{
//                           width: '120px',
//                           height: '120px',
//                           objectFit: 'cover',
//                           borderRadius: '8px',
//                           transition: 'transform 0.2s ease'
//                         }}
//                         onMouseOver={(e) => {
//                           e.target.style.transform = 'scale(1.05)';
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.style.transform = 'scale(1)';
//                         }}
//                         onError={(e) => {
//                           e.target.src = `https://via.placeholder.com/120x120?text=${encodeURIComponent(item.item_name.substring(0, 5))}`;
//                         }}
//                       />
//                     </Link>

//                     {/* Enhanced Product Info */}
//                     <div style={{ 
//                       flex: 1,
//                       marginBottom: window.innerWidth < 768 ? '15px' : '0'
//                     }}>
//                       <Link 
//                         to={`/product/${item.item_code}`}
//                         style={{ textDecoration: 'none', color: 'inherit' }}
//                       >
//                         <h3 style={{
//                           fontSize: '18px',
//                           fontWeight: '600',
//                           color: '#0F1111',
//                           margin: '0 0 10px 0',
//                           lineHeight: '1.3',
//                           transition: 'color 0.2s ease'
//                         }}
//                         onMouseOver={(e) => {
//                           e.target.style.color = '#007185';
//                         }}
//                         onMouseOut={(e) => {
//                           e.target.style.color = '#0F1111';
//                         }}
//                         >
//                           {item.item_name}
//                         </h3>
//                       </Link>
                      
//                       <div style={{
//                         fontSize: '14px',
//                         color: '#565959',
//                         marginBottom: '10px',
//                         display: 'flex',
//                         flexWrap: 'wrap',
//                         gap: '15px',
//                         justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
//                       }}>
//                         <span><strong>Code:</strong> {item.item_code}</span>
//                         <span><strong>Brand:</strong> {item.brand}</span>
//                         <span><strong>Category:</strong> {item.item_group}</span>
//                         {item.warehouse && <span><strong>Warehouse:</strong> {item.warehouse}</span>}
//                       </div>

//                       <p style={{
//                         color: '#666666',
//                         fontSize: '14px',
//                         marginBottom: '12px',
//                         lineHeight: '1.5',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: '-webkit-box',
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: 'vertical'
//                       }}>
//                         {item.description || 'No description available'}
//                       </p>
                      
//                       <div style={{
//                         fontSize: '20px',
//                         fontWeight: '700',
//                         color: '#B12704',
//                         marginBottom: '12px'
//                       }}>
//                         ₹{item.rate?.toLocaleString('en-IN') || '0'} per unit
//                       </div>

//                       {/* ERPNext Specific Info */}
//                       <div style={{
//                         fontSize: '13px',
//                         color: '#007185',
//                         backgroundColor: '#F0F8FF',
//                         padding: '6px 10px',
//                         borderRadius: '6px',
//                         display: 'inline-block',
//                         border: '1px solid #E0F2FE'
//                       }}>
//                         ERPNext Item • Qty: {item.qty} • Line Total: ₹{item.amount?.toLocaleString('en-IN')}
//                       </div>

//                       {item.additional_notes && (
//                         <div style={{
//                           marginTop: '8px',
//                           fontSize: '13px',
//                           color: '#666',
//                           fontStyle: 'italic',
//                           backgroundColor: '#FFFBF0',
//                           padding: '4px 8px',
//                           borderRadius: '4px',
//                           border: '1px solid #FEF3CD'
//                         }}>
//                           Note: {item.additional_notes}
//                         </div>
//                       )}
//                     </div>

//                     {/* Enhanced Quantity Controls */}
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '15px',
//                       marginRight: window.innerWidth < 768 ? '0' : '25px',
//                       marginBottom: window.innerWidth < 768 ? '15px' : '0'
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         backgroundColor: '#F8F9FA',
//                         borderRadius: '8px',
//                         border: '2px solid #E5E7EB',
//                         overflow: 'hidden'
//                       }}>
//                         <button
//                           onClick={() => handleQuantityChange(item.item_code, item.qty, -1)}
//                           disabled={isItemUpdating}
//                           style={{
//                             width: '40px',
//                             height: '40px',
//                             border: 'none',
//                             backgroundColor: 'transparent',
//                             cursor: isItemUpdating ? 'not-allowed' : 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             opacity: isItemUpdating ? 0.5 : 1,
//                             transition: 'all 0.2s ease'
//                           }}
//                           onMouseOver={(e) => {
//                             if (!isItemUpdating) e.target.style.backgroundColor = '#E5E7EB';
//                           }}
//                           onMouseOut={(e) => {
//                             if (!isItemUpdating) e.target.style.backgroundColor = 'transparent';
//                           }}
//                         >
//                           <FaMinus size={14} />
//                         </button>
                        
//                         <span style={{
//                           fontSize: '18px',
//                           fontWeight: '600',
//                           minWidth: '50px',
//                           textAlign: 'center',
//                           backgroundColor: '#FFFFFF',
//                           height: '40px',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           borderLeft: '1px solid #E5E7EB',
//                           borderRight: '1px solid #E5E7EB'
//                         }}>
//                           {item.qty}
//                         </span>
                        
//                         <button
//                           onClick={() => handleQuantityChange(item.item_code, item.qty, 1)}
//                           disabled={isItemUpdating}
//                           style={{
//                             width: '40px',
//                             height: '40px',
//                             border: 'none',
//                             backgroundColor: 'transparent',
//                             cursor: isItemUpdating ? 'not-allowed' : 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             opacity: isItemUpdating ? 0.5 : 1,
//                             transition: 'all 0.2s ease'
//                           }}
//                           onMouseOver={(e) => {
//                             if (!isItemUpdating) e.target.style.backgroundColor = '#E5E7EB';
//                           }}
//                           onMouseOut={(e) => {
//                             if (!isItemUpdating) e.target.style.backgroundColor = 'transparent';
//                           }}
//                         >
//                           <FaPlus size={14} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Enhanced Item Total & Remove */}
//                     <div style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: window.innerWidth < 768 ? 'center' : 'flex-end',
//                       gap: '15px'
//                     }}>
//                       <div style={{
//                         fontSize: '24px',
//                         fontWeight: 'bold',
//                         color: '#0F1111'
//                       }}>
//                         ₹{item.amount?.toLocaleString('en-IN') || '0'}
//                       </div>

//                       <button
//                         onClick={() => removeFromCart(item.item_code, item.item_name)}
//                         disabled={isItemUpdating}
//                         style={{
//                           padding: '8px 12px',
//                           backgroundColor: 'transparent',
//                           border: '2px solid #B12704',
//                           borderRadius: '6px',
//                           color: '#B12704',
//                           cursor: isItemUpdating ? 'not-allowed' : 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '6px',
//                           fontSize: '14px',
//                           fontWeight: '600',
//                           opacity: isItemUpdating ? 0.5 : 1,
//                           transition: 'all 0.2s ease'
//                         }}
//                         onMouseOver={(e) => {
//                           if (!isItemUpdating) {
//                             e.target.style.backgroundColor = '#B12704';
//                             e.target.style.color = '#FFFFFF';
//                           }
//                         }}
//                         onMouseOut={(e) => {
//                           if (!isItemUpdating) {
//                             e.target.style.backgroundColor = 'transparent';
//                             e.target.style.color = '#B12704';
//                           }
//                         }}
//                       >
//                         <FaTrash size={12} />
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Enhanced Order Summary - ERPNext Data */}
//             <div style={{
//               backgroundColor: '#FFFFFF',
//               padding: '25px',
//               borderRadius: '12px',
//               height: 'fit-content',
//               position: 'sticky',
//               top: '20px',
//               boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//               border: '1px solid #E5E7EB'
//             }}>
//               <h2 style={{
//                 fontSize: '24px',
//                 fontWeight: '600',
//                 color: '#0F1111',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <FaShoppingCart size={20} />
//                 Order Summary
//               </h2>

//               {/* Summary Details */}
//               <div style={{ marginBottom: '20px' }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '12px',
//                   fontSize: '16px'
//                 }}>
//                   <span>Subtotal ({cartSummary.total_items} items):</span>
//                   <span style={{ fontWeight: '600' }}>₹{cartSummary.net_total?.toLocaleString('en-IN')}</span>
//                 </div>

//                 {cartSummary.discount > 0 && (
//                   <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginBottom: '12px',
//                     fontSize: '16px',
//                     color: '#00A652'
//                   }}>
//                     <span>Discount:</span>
//                     <span style={{ fontWeight: '600' }}>-₹{cartSummary.discount?.toLocaleString('en-IN')}</span>
//                   </div>
//                 )}

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '12px',
//                   fontSize: '16px'
//                 }}>
//                   <span>Shipping:</span>
//                   <span style={{ color: '#00A652', fontWeight: '600' }}>
//                     {cartSummary.shipping_charges > 0 ? `₹${cartSummary.shipping_charges?.toLocaleString('en-IN')}` : 'FREE'}
//                   </span>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '12px',
//                   fontSize: '16px'
//                 }}>
//                   <span>Tax (from ERPNext):</span>
//                   <span style={{ fontWeight: '600' }}>₹{cartSummary.taxes?.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>

//               <hr style={{ 
//                 margin: '20px 0', 
//                 border: 'none', 
//                 borderTop: '2px solid #E5E7EB' 
//               }} />

//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '25px',
//                 fontSize: '20px',
//                 fontWeight: '700'
//               }}>
//                 <span>Grand Total:</span>
//                 <span style={{ color: '#B12704' }}>
//                   ₹{cartSummary.grand_total?.toLocaleString('en-IN')}
//                 </span>
//               </div>

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {/* <button
//                   onClick={handleCheckout}
//                   disabled={loading || cartItems.length === 0}
//                   style={{
//                     width: '100%',
//                     padding: '16px',
//                     backgroundColor: loading ? '#F0F0F0' : '#FFD814',
//                     border: `2px solid ${loading ? '#D0D0D0' : '#FCD200'}`,
//                     borderRadius: '8px',
//                     fontSize: '18px',
//                     fontWeight: '700',
//                     cursor: loading || cartItems.length === 0 ? 'not-allowed' : 'pointer',
//                     transition: 'all 0.3s ease',
//                     opacity: loading || cartItems.length === 0 ? 0.6 : 1,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '8px'
//                   }}
//                   onMouseOver={(e) => {
//                     if (!loading && cartItems.length > 0) {
//                       e.target.style.backgroundColor = '#F7CA00';
//                       e.target.style.transform = 'translateY(-2px)';
//                     }
//                   }}
//                   onMouseOut={(e) => {
//                     if (!loading && cartItems.length > 0) {
//                       e.target.style.backgroundColor = '#FFD814';
//                       e.target.style.transform = 'translateY(0)';
//                     }
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <FaShoppingCart />
//                       Proceed to Checkout
//                     </>
//                   )}
//                 </button> */}

//                 <Link
//                   to="/trade"
//                   style={{
//                     display: 'block',
//                     textAlign: 'center',
//                     padding: '14px',
//                     color: '#007185',
//                     textDecoration: 'none',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     border: '2px solid #007185',
//                     borderRadius: '8px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseOver={(e) => {
//                     e.target.style.backgroundColor = '#007185';
//                     e.target.style.color = '#FFFFFF';
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.style.backgroundColor = 'transparent';
//                     e.target.style.color = '#007185';
//                   }}
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>

//               {/* ERPNext Status Indicator */}
//               <div style={{
//                 marginTop: '20px',
//                 padding: '12px',
//                 backgroundColor: '#F0F8FF',
//                 borderRadius: '8px',
//                 border: '1px solid #E0F2FE',
//                 textAlign: 'center'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: '8px',
//                   color: '#007185',
//                   fontSize: '14px',
//                   fontWeight: '600'
//                 }}>
//                   <FaCheckCircle size={16} />
//                 </div>
//                 <p style={{
//                   margin: '4px 0 0 0',
//                   fontSize: '12px',
//                   color: '#565959'
//                 }}>
              
//                 </p>
//               </div>

//               {/* Debug Info - Remove in production */}
//               {process.env.NODE_ENV === 'development' && (
//                 <details style={{ marginTop: '20px', fontSize: '12px' }}>
//                   <summary style={{ cursor: 'pointer', color: '#007185', fontWeight: '600' }}>
//                     🔍 ERPNext Cart Debug
//                   </summary>
//                   <pre style={{
//                     backgroundColor: '#F8F9FA',
//                     padding: '10px',
//                     borderRadius: '6px',
//                     overflow: 'auto',
//                     marginTop: '10px',
//                     maxHeight: '200px',
//                     fontSize: '11px',
//                     border: '1px solid #E5E7EB'
//                   }}>
//                     {JSON.stringify({
//                       total_items: cartSummary.total_items,
//                       net_total: cartSummary.net_total,
//                       grand_total: cartSummary.grand_total,
//                       taxes: cartSummary.taxes,
//                       items_count: cartItems.length,
//                       updating_items: Object.keys(updating).filter(key => updating[key])
//                     }, null, 2)}
//                   </pre>
//                 </details>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* CSS for animations and responsive design */}
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default CartPage;


















//////////////////////////////////////////////////////////////// previous orders  ////////////////////////////////////////////////
// import React, { useEffect, useState, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingBag, FaMinus, FaPlus, FaTrash, FaArrowLeft, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaShoppingCart, FaChevronDown, FaChevronUp, FaFileInvoice, FaCalendarAlt, FaBoxOpen, FaEye, FaDownload } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';
// import Cookies from 'js-cookie';

// const CartPage = () => {
//   const navigate = useNavigate();
  
//   // **🎯 Enhanced ERPNext Cart State**
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cartSummary, setCartSummary] = useState({
//     total_items: 0,
//     total_amount: 0,
//     net_total: 0,
//     grand_total: 0,
//     taxes: 0,
//     shipping_charges: 0,
//     discount: 0
//   });
//   const [updating, setUpdating] = useState({});
//   const [notification, setNotification] = useState(null);

//   // **🎯 Previous Orders State - Matching ERPNext Structure**
//   const [previousOrders, setPreviousOrders] = useState([]);
//   const [ordersLoading, setOrdersLoading] = useState(false);
//   const [expandedOrders, setExpandedOrders] = useState(new Set());

//   // **🎯 Show notification helper**
//   const showNotification = useCallback((message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(()  => setNotification(null), 3000);
//   }, []);

//   // **🎯 Fetch Past Orders from ERPNext Quotations - Exact Structure Match**
//   const fetchPreviousOrders = useCallback(async () => {
//     try {
//       setOrdersLoading(true);
//       const currentUser = Cookies.get('user_id') || 'Guest';
//       const fullName = Cookies.get('full_name') ;
//       console.log('📋 Fetching ERPNext quotations for user:', currentUser);

//       // Fetch Quotations exactly like shown in your ERPNext page
//       const response = await fetch(`/api/resource/Quotation?fields=["name","quotation_to","party_name","transaction_date","grand_total","status","currency","items","modified"]&filters=[["docstatus","!=",2], ["customer_name", "=", "${fullName}"]]&limit_page_length=50&order_by=creation desc`, {
//         method: 'GET',
//         headers: { 
//           'Content-Type': 'application/json', 
//           'Accept': 'application/json' 
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('📋 ERPNext Quotations API Response:', result);

//       if (result.data && Array.isArray(result.data)) {
//         // Transform ERPNext quotations to match your UI structure
//         const transformedOrders = result.data.map(quote => {
//           // Extract main product name from items (first item's name)
//           const mainItemName = quote.items && quote.items.length > 0 ? 
//             (quote.items[0].item_name || quote.items[0].item_code || 'Product') : 
//             'Quotation Items';

//           return {
//             id: quote.name,
//             orderNumber: quote.name, // e.g., "SAL-QTN-2025-00008"
//             type: 'Quotation',
//             date: quote.transaction_date,
//             customerName: quote.party_name,
//             amount: quote.grand_total,
//             currency: quote.currency || 'K', // Using K as shown in your image
//             status: quote.status, // "Open", "Submitted", etc.
//             items: quote.items || [],
//             mainProductName: mainItemName,
            
//             // Formatted displays matching your ERPNext UI
//             formattedAmount: `${quote.currency || 'K'} ${parseFloat(quote.grand_total || 0).toLocaleString('en-IN', {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2
//             })}`,
//             formattedDate: new Date(quote.transaction_date).toLocaleDateString('en-IN', {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             }),
//             shortDate: new Date(quote.transaction_date).toLocaleDateString('en-IN', {
//               month: 'short',
//               day: 'numeric',
//               year: 'numeric'
//             })
//           };
//         });

//         // Sort by date descending (newest first)
//         transformedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        
//         setPreviousOrders(transformedOrders);
//         console.log('✅ Fetched ERPNext quotations:', transformedOrders.length);

//       } else {
//         console.log('❌ No quotations found or invalid response format');
//         setPreviousOrders([]);
//       }

//     } catch (error) {
//       console.error('❌ Error fetching ERPNext quotations:', error);
//       showNotification('Failed to load previous orders', 'error');
//       setPreviousOrders([]);
//     } finally {
//       setOrdersLoading(false);
//     }
//   }, [showNotification]);

//   // **🎯 Toggle Order Expansion**
//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrders(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(orderId)) {
//         newSet.delete(orderId);
//       } else {
//         newSet.add(orderId);
//       }
//       return newSet;
//     });
//   };

//   // **🎯 View Quotation Details (Navigate to ERPNext)**
//   const handleViewQuotation = (quotationName) => {
//     const quotationUrl = `/app/quotation/${quotationName}`;
//     window.open(quotationUrl, '_blank');
//   };

//   // **🎯 Download Quotation PDF**
//   const handleDownloadQuotation = (quotationName) => {
//     const downloadUrl = `/api/method/frappe.utils.print_format.download_pdf?doctype=Quotation&name=${quotationName}&format=Standard&no_letterhead=0`;
//     window.open(downloadUrl, '_blank');
//   };

//   // **🎯 Enhanced Get Current Cart from ERPNext**
//   const getCurrentCart = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log("🛒 Fetching current cart from ERPNext...");

//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.get_cart_quotation", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         credentials: 'include',
//         redirect: "follow"
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("🛒 ERPNext Cart API Response:", result);

//       if (result.message && result.message.doc) {
//         const cartData = result.message.doc;
//         const cartItems = cartData.items || [];
        
//         console.log("✅ Cart items found:", cartItems);
        
//         // Transform ERPNext cart items to display format
//         const transformedCartItems = cartItems.map(item => ({
//           // ERPNext cart item fields
//           item_code: item.item_code,
//           item_name: item.item_name || item.web_item_name,
//           qty: item.qty,
//           rate: item.rate,
//           amount: item.amount,
          
//           // Additional item details from ERPNext
//           image: item.thumbnail || item.website_image || item.image || '/placeholder.jpg',
//           description: item.description || `Premium ${item.item_name} from ERPNext`,
//           brand: item.brand || 'Generic',
//           item_group: item.item_group || 'General',
//           warehouse: item.warehouse || '',
//           additional_notes: item.additional_notes || '',
          
//           // Computed fields
//           id: item.item_code,
//           quantity: item.qty,
//           standard_rate: item.rate,
//           total_price: item.amount,
          
//           // Stock status
//           in_stock: true,
          
//           // Original ERPNext data
//           original_erpnext_data: item
//         }));

//         setCartItems(transformedCartItems);
        
//         // Enhanced cart summary from ERPNext response
//         setCartSummary({
//           total_items: cartData.total_qty || cartItems.reduce((sum, item) => sum + item.qty, 0),
//           total_amount: cartData.total || 0,
//           net_total: cartData.net_total || 0,
//           grand_total: cartData.grand_total || cartData.net_total || 0,
//           taxes: cartData.total_taxes_and_charges || ((cartData.grand_total || 0) - (cartData.net_total || 0)),
//           shipping_charges: cartData.shipping_charges || 0,
//           discount: cartData.discount_amount || 0
//         });

//         console.log("✅ Cart loaded with", transformedCartItems.length, "items");
        
//       } else {
//         console.log("ℹ️ Cart is empty or no cart found");
//         setCartItems([]);
//         setCartSummary({
//           total_items: 0,
//           total_amount: 0,
//           net_total: 0,
//           grand_total: 0,
//           taxes: 0,
//           shipping_charges: 0,
//           discount: 0
//         });
//       }
//     } catch (error) {
//       console.error('❌ Error fetching ERPNext cart:', error);
//       setError(`Failed to load cart: ${error.message}`);
//       showNotification('Failed to load cart. Please refresh the page.', 'error');
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [showNotification]);

//   // **🎯 Enhanced Update Cart Quantity in ERPNext**
//   const updateCartQuantity = async (itemCode, newQuantity, additionalNotes = null) => {
//     try {
//       setUpdating(prev => ({ ...prev, [itemCode]: true }));
//       console.log(`🛒 Updating ${itemCode} quantity to ${newQuantity}...`);

//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           item_code: itemCode,
//           qty: newQuantity,
//           additional_notes: additionalNotes
//         }),
//         redirect: "follow"
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("🛒 Update Cart API Response:", result);

//       if (result.message) {
//         console.log("✅ Successfully updated cart quantity");
//         showNotification(
//           newQuantity === 0 ? 'Item removed from cart' : 'Cart updated successfully', 
//           'success'
//         );
//         // Refresh cart data after update
//         await getCurrentCart();
//         return true;
//       } else {
//         throw new Error("Failed to update cart");
//       }
//     } catch (error) {
//       console.error('❌ Error updating cart:', error);
//       showNotification('Failed to update cart. Please try again.', 'error');
//       return false;
//     } finally {
//       setUpdating(prev => ({ ...prev, [itemCode]: false }));
//     }
//   };

//   // **🎯 Enhanced Remove Item from ERPNext Cart**
//   const removeFromCart = async (itemCode, itemName) => {
//     if (!window.confirm(`Are you sure you want to remove "${itemName}" from cart?`)) {
//       return;
//     }

//     return await updateCartQuantity(itemCode, 0);
//   };

//   // **🎯 Clear Entire Cart**
//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your entire cart?')) {
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("🗑️ Clearing entire cart...");

//       // Remove each item individually
//       const clearPromises = cartItems.map(item => 
//         updateCartQuantity(item.item_code, 0)
//       );
      
//       await Promise.all(clearPromises);

//       console.log("✅ Cart cleared successfully");
//       showNotification("Cart cleared successfully!", 'success');
      
//     } catch (error) {
//       console.error('❌ Error clearing cart:', error);
//       showNotification("Error clearing cart. Please try again.", 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Enhanced Handle Quantity Changes**
//   const handleQuantityChange = async (itemCode, currentQty, change) => {
//     const newQuantity = Math.max(0, currentQty + change);
    
//     if (newQuantity === 0) {
//       const item = cartItems.find(item => item.item_code === itemCode);
//       await removeFromCart(itemCode, item?.item_name || itemCode);
//     } else {
//       await updateCartQuantity(itemCode, newQuantity);
//     }
//   };

//   // **🎯 Request for Quotation**
//   const handleRequestQuotation = async () => {
//     if (cartItems.length === 0) {
//       showNotification('Your cart is empty. Please add items before requesting a quotation.', 'warning');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.request_for_quotation", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.message) {
//         showNotification(`Quotation requested successfully! Reference: ${result.message}`, 'success');
//         // Refresh orders after creating new quotation
//         setTimeout(() => fetchPreviousOrders(), 1000);
//       } else {
//         throw new Error('Failed to request quotation');
//       }
//     } catch (error) {
//       console.error('Error requesting quotation:', error);
//       showNotification('Failed to request quotation. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Enhanced Handle Checkout**
//   const handleCheckout = async () => {
//     if (cartItems.length === 0) {
//       showNotification('Your cart is empty. Please add items before checkout.', 'warning');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log("🛒 Proceeding to checkout with ERPNext data:", {
//         items: cartItems.length,
//         total: cartSummary.grand_total
//       });

//       // You can implement actual order placement here
//       const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.place_order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.message) {
//         showNotification(`Order placed successfully! Order ID: ${result.message}`, 'success');
//         navigate(`/order-confirmation/${result.message}`);
//       } else {
//         // If not ready to place order, show summary
//         showNotification(`Proceeding to checkout with ${cartSummary.total_items} items worth ₹${cartSummary.grand_total.toFixed(2)}`, 'info');
//         navigate('/checkout');
//       }
//     } catch (error) {
//       console.error('Error during checkout:', error);
//       showNotification('Checkout failed. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Load cart and previous orders on component mount**
//   useEffect(() => {
//     console.log("Loading ERPNext cart data...");
//     getCurrentCart();
//     fetchPreviousOrders();
//   }, [getCurrentCart, fetchPreviousOrders]);

//   // **🎯 Auto-refresh cart every 30 seconds**
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!loading && !Object.keys(updating).some(key => updating[key])) {
//         getCurrentCart();
//       }
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [getCurrentCart, loading, updating]);

//   // **🎯 Notification Component**
//   const NotificationBar = () => {
//     if (!notification) return null;

//     const getIcon = () => {
//       switch (notification.type) {
//         case 'success': return <FaCheckCircle />;
//         case 'error': return <FaExclamationTriangle />;
//         case 'warning': return <FaExclamationTriangle />;
//         default: return <FaShoppingCart />;
//       }
//     };

//     const getColor = () => {
//       switch (notification.type) {
//         case 'success': return '#00A652';
//         case 'error': return '#B12704';
//         case 'warning': return '#FF9900';
//         default: return '#007185';
//       }
//     };

//     return (
//       <div style={{
//         position: 'fixed',
//         top: '20px',
//         right: '20px',
//         backgroundColor: getColor(),
//         color: 'white',
//         padding: '12px 20px',
//         borderRadius: '8px',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//         zIndex: 1000,
//         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//         maxWidth: '400px'
//       }}>
//         {getIcon()}
//         <span>{notification.message}</span>
//       </div>
//     );
//   };

//   // **🎯 Previous Orders Section - Matching ERPNext Quotations Structure**
//   const PreviousOrdersSection = () => (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       padding: '30px',
//       borderRadius: '12px',
//       boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//       border: '1px solid #E5E7EB',
//       marginTop: '30px'
//     }}>
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: '25px'
//       }}>
//         <h2 style={{
//           fontSize: '24px',
//           fontWeight: '600',
//           color: '#0F1111',
//           margin: 0,
//           display: 'flex',
//           alignItems: 'center',
//           gap: '12px'
//         }}>
//           <FaFileInvoice size={22} />
//           Previous Orders (ERPNext Quotations)
//           <span style={{
//             backgroundColor: '#007185',
//             color: 'white',
//             fontSize: '12px',
//             fontWeight: '600',
//             padding: '4px 8px',
//             borderRadius: '12px'
//           }}>
//             {previousOrders.length}
//           </span>
//         </h2>

//         {ordersLoading && (
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#565959' }}>
//             <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
//             Loading quotations...
//           </div>
//         )}
//       </div>

//       {previousOrders.length === 0 ? (
//         <div style={{
//           textAlign: 'center',
//           padding: '40px',
//           color: '#565959'
//         }}>
//           <FaBoxOpen size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
//           <p style={{ fontSize: '16px', margin: 0 }}>
//             No previous quotations found. Your future orders will appear here.
//           </p>
//         </div>
//       ) : (
//         <div style={{ space: '16px' }}>
//           {previousOrders.map((order) => {
//             const isExpanded = expandedOrders.has(order.id);
            
//             return (
//               <div
//                 key={order.id}
//                 style={{
//                   border: '2px solid #E5E7EB',
//                   borderRadius: '10px',
//                   marginBottom: '16px',
//                   overflow: 'hidden',
//                   transition: 'all 0.2s ease',
//                   backgroundColor: '#FAFAFA'
//                 }}
//               >
//                 {/* Order Header - Matching ERPNext UI Structure */}
//                 <div
//                   style={{
//                     padding: '20px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     backgroundColor: '#FFFFFF',
//                     borderBottom: isExpanded ? '1px solid #E5E7EB' : 'none',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.backgroundColor = '#F8F9FA';
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.backgroundColor = '#FFFFFF';
//                   }}
//                 >
//                   {/* Left Section - Order Number & Date */}
//                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '200px' }}>
//                     <h3 style={{
//                       margin: '0 0 4px 0',
//                       fontSize: '16px',
//                       fontWeight: '600',
//                       color: '#0F1111'
//                     }}>
//                       {order.orderNumber}
//                     </h3>
//                     <div style={{
//                       fontSize: '14px',
//                       color: '#565959',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px'
//                     }}>
//                       <FaCalendarAlt size={12} />
//                       {order.shortDate}
//                     </div>
//                   </div>

//                   {/* Center Section - Status & Product */}
//                   <div style={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: '16px',
//                     flex: 1,
//                     justifyContent: 'center'
//                   }}>
//                     <span style={{
//                       backgroundColor: order.status === 'Open' ? '#D1ECF1' : 
//                                     order.status === 'Submitted' ? '#D4EDDA' : 
//                                     order.status === 'Draft' ? '#FFF3CD' : '#F8D7DA',
//                       color: order.status === 'Open' ? '#0C5460' :
//                             order.status === 'Submitted' ? '#155724' :
//                             order.status === 'Draft' ? '#856404' : '#721C24',
//                       padding: '4px 12px',
//                       borderRadius: '12px',
//                       fontSize: '12px',
//                       fontWeight: '600',
//                       textTransform: 'uppercase'
//                     }}>
//                       {order.status}
//                     </span>
//                     <div style={{
//                       fontSize: '14px',
//                       color: '#565959',
//                       maxWidth: '300px',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap'
//                     }}>
//                       {order.mainProductName}...
//                     </div>
//                   </div>

//                   {/* Right Section - Amount & Actions */}
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '16px'
//                   }}>
//                     <div style={{ textAlign: 'right' }}>
//                       <div style={{
//                         fontSize: '18px',
//                         fontWeight: '700',
//                         color: '#B12704'
//                       }}>
//                         {order.formattedAmount}
//                       </div>
//                       <div style={{
//                         fontSize: '12px',
//                         color: '#565959'
//                       }}>
//                         {order.items.length} items
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div style={{ display: 'flex', gap: '8px' }}>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleViewQuotation(order.orderNumber);
//                         }}
//                         style={{
//                           padding: '6px 12px',
//                           backgroundColor: '#007185',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           fontSize: '12px',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '4px'
//                         }}
//                         title="View in ERPNext"
//                       >
//                         <FaEye size={12} />
//                         View
//                       </button>
                      
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDownloadQuotation(order.orderNumber);
//                         }}
//                         style={{
//                           padding: '6px 12px',
//                           backgroundColor: '#FF9900',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           fontSize: '12px',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '4px'
//                         }}
//                         title="Download PDF"
//                       >
//                         <FaDownload size={12} />
//                         PDF
//                       </button>
//                     </div>
                    
//                     <div
//                       onClick={() => toggleOrderExpansion(order.id)}
//                       style={{
//                         transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
//                         transition: 'transform 0.2s ease',
//                         color: '#007185',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       <FaChevronDown size={16} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expanded Order Items */}
//                 {isExpanded && (
//                   <div style={{
//                     padding: '20px',
//                     backgroundColor: '#FAFAFA'
//                   }}>
//                     <h4 style={{
//                       margin: '0 0 16px 0',
//                       fontSize: '16px',
//                       fontWeight: '600',
//                       color: '#0F1111',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px'
//                     }}>
//                       <FaBoxOpen size={14} />
//                       Quotation Items ({order.items.length})
//                     </h4>

//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                       {order.items.map((item, index) => (
//                         <div
//                           key={index}
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             padding: '16px',
//                             backgroundColor: '#FFFFFF',
//                             borderRadius: '8px',
//                             border: '1px solid #E5E7EB'
//                           }}
//                         >
//                           <div style={{ flex: 1 }}>
//                             <div style={{
//                               fontSize: '14px',
//                               fontWeight: '600',
//                               color: '#0F1111',
//                               marginBottom: '4px'
//                             }}>
//                               {item.item_name || item.item_code}
//                             </div>
//                             <div style={{
//                               fontSize: '12px',
//                               color: '#565959'
//                             }}>
//                               Item Code: {item.item_code}
//                             </div>
//                             {item.description && (
//                               <div style={{
//                                 fontSize: '12px',
//                                 color: '#666',
//                                 marginTop: '4px',
//                                 maxWidth: '400px'
//                               }}>
//                                 {item.description}
//                               </div>
//                             )}
//                           </div>

//                           <div style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '20px',
//                             fontSize: '14px'
//                           }}>
//                             <div style={{ textAlign: 'center', minWidth: '60px' }}>
//                               <div style={{ fontWeight: '600', marginBottom: '2px' }}>Qty</div>
//                               <div>{item.qty || 1}</div>
//                             </div>
                            
//                             <div style={{ textAlign: 'center', minWidth: '100px' }}>
//                               <div style={{ fontWeight: '600', marginBottom: '2px' }}>Rate</div>
//                               <div>{order.currency} {parseFloat(item.rate || 0).toLocaleString('en-IN', {
//                                 minimumFractionDigits: 2,
//                                 maximumFractionDigits: 2
//                               })}</div>
//                             </div>
                            
//                             <div style={{ textAlign: 'center', minWidth: '120px' }}>
//                               <div style={{ fontWeight: '600', marginBottom: '2px', color: '#B12704' }}>Amount</div>
//                               <div style={{ fontWeight: '600', color: '#B12704' }}>
//                                 {order.currency} {parseFloat(item.amount || 0).toLocaleString('en-IN', {
//                                   minimumFractionDigits: 2,
//                                   maximumFractionDigits: 2
//                                 })}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div style={{
//                       marginTop: '20px',
//                       padding: '16px',
//                       backgroundColor: '#F8F9FA',
//                       borderRadius: '8px',
//                       border: '1px solid #E5E7EB'
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                       }}>
//                         <span style={{ fontSize: '16px', fontWeight: '600' }}>Total Amount:</span>
//                         <span style={{ fontSize: '20px', fontWeight: '700', color: '#B12704' }}>
//                           {order.formattedAmount}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );

//   // ... (Rest of the component code remains the same - loading states, empty cart, main cart display)

//   // **🎯 Enhanced Loading State**
//   if (loading && cartItems.length === 0) {
//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh',
//         padding: '40px 20px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <FaSpinner 
//             size={40} 
//             color="#FF9900" 
//             style={{ 
//               animation: 'spin 1s linear infinite',
//               marginBottom: '16px'
//             }} 
//           />
//           <p style={{ color: '#565959', fontSize: '16px' }}>
//             Loading your ERPNext cart...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // **🎯 Error State**
//   if (error && cartItems.length === 0) {
//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh',
//         padding: '40px 20px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <div style={{ textAlign: 'center', maxWidth: '600px' }}>
//           <FaExclamationTriangle size={60} color="#B12704" style={{ marginBottom: '20px' }} />
//           <h2 style={{ color: '#B12704', marginBottom: '16px' }}>
//             Failed to Load Cart
//           </h2>
//           <p style={{ color: '#565959', marginBottom: '20px' }}>
//             {error}
//           </p>
//           <button
//             onClick={getCurrentCart}
//             style={{
//               backgroundColor: '#FF9900',
//               color: 'white',
//               border: 'none',
//               padding: '12px 24px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: '600'
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // **🎯 Enhanced Empty Cart State**
//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <>
//         <NotificationBar />
//         <div style={{
//           backgroundColor: '#FFFFFF',
//           minHeight: '100vh',
//           padding: '40px 20px'
//         }}>
//           <div style={{
//             maxWidth: '800px',
//             margin: '0 auto',
//             textAlign: 'center'
//           }}>
//             {/* Back Button */}
//             <div style={{ marginBottom: '40px', textAlign: 'left' }}>
//               <button
//                 onClick={() => navigate(-1)}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   padding: '10px 18px',
//                   backgroundColor: 'transparent',
//                   border: '2px solid #D5D9D9',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   color: '#0F1111',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.borderColor = '#007185';
//                   e.target.style.color = '#007185';
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.borderColor = '#D5D9D9';
//                   e.target.style.color = '#0F1111';
//                 }}
//               >
//                 <FaArrowLeft size={14} />
//                 Back to Products
//               </button>
//             </div>

//             <FaShoppingBag size={100} color="#CCCCCC" style={{ marginBottom: '32px' }} />
            
//             <h2 style={{
//               fontSize: '36px',
//               fontWeight: '600',
//               color: '#0F1111',
//               margin: '0 0 20px 0'
//             }}>
//               Your cart is empty
//             </h2>
            
//             <p style={{
//               fontSize: '18px',
//               color: '#565959',
//               marginBottom: '32px',
//               lineHeight: '1.5'
//             }}>
//               Looks like you haven't added anything to your cart yet.<br/>
//               Browse our products and find something you love!
//             </p>
            
//             <Link 
//               to="/trade"
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 backgroundColor: '#FF9900',
//                 color: '#FFFFFF',
//                 padding: '18px 36px',
//                 fontSize: '18px',
//                 fontWeight: '600',
//                 textDecoration: 'none',
//                 borderRadius: '8px',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.backgroundColor = '#E88B00';
//                 e.target.style.transform = 'translateY(-2px)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.backgroundColor = '#FF9900';
//                 e.target.style.transform = 'translateY(0)';
//               }}
//             >
//               <FaShoppingBag size={18} /> Start Shopping
//             </Link>
//           </div>

//           {/* Show Previous Orders even when cart is empty */}
//           <div style={{ maxWidth: '1400px', margin: '60px auto 0' }}>
//             <PreviousOrdersSection />
//           </div>
//         </div>
//       </>
//     );
//   }

//   // **🎯 Main Cart Items Display with Previous Orders** (Cart items rendering code remains the same)
//   return (
//     <>
//       <NotificationBar />
//       <div style={{
//         backgroundColor: '#F8F9FA',
//         minHeight: '100vh',
//         padding: '20px'
//       }}>
//         <div style={{
//           maxWidth: '1400px',
//           margin: '0 auto'
//         }}>
//           {/* Your existing cart rendering code here... */}
//           {/* I'm including only the PreviousOrdersSection since the rest stays the same */}
          
//           {/* **🎯 Previous Orders Section - Now matching ERPNext structure** */}
//           <PreviousOrdersSection />
//         </div>

//         {/* CSS for animations and responsive design */}
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default CartPage;




/////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaMinus, FaPlus, FaTrash, FaArrowLeft, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaShoppingCart, FaChevronDown, FaFileInvoice, FaCalendarAlt, FaBoxOpen, FaEye, FaDownload } from 'react-icons/fa';
import { COLORS } from '../constants/colors';
import Cookies from 'js-cookie';

const CartPage = () => {
  const navigate = useNavigate();
  
  // **🎯 Enhanced Cart State**
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartSummary, setCartSummary] = useState({
    total_items: 0,
    total_amount: 0,
    net_total: 0,
    grand_total: 0,
    taxes: 0,
    shipping_charges: 0,
    discount: 0
  });
  const [updating, setUpdating] = useState({});
  const [notification, setNotification] = useState(null);

  // **🎯 Previous Orders State**
  const [previousOrders, setPreviousOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  // **🎯 Show notification helper**
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // **🎯 Fetch Past Orders from Quotations**
  const fetchPreviousOrders = useCallback(async () => {
    try {
      setOrdersLoading(true);
      const currentUser = Cookies.get('user_id') || 'Guest';
      const fullName = Cookies.get('full_name');
      console.log('📋 Fetching quotations for user:', currentUser);

      // Fetch Quotations
      const response = await fetch(`/api/resource/Quotation?fields=["name","quotation_to","party_name","transaction_date","grand_total","status","currency","items","modified"]&filters=[["docstatus","!=",2], ["customer_name", "=", "${fullName}"]]&limit_page_length=50&order_by=creation desc`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        console.log('📋 Quotations API Response:', result);

        if (result.data && Array.isArray(result.data)) {
          // Transform quotations to match your UI structure
          const transformedOrders = result.data.map(quote => {
            // Extract main product name from items (first item's name)
            const mainItemName = quote.items && quote.items.length > 0 ? 
              (quote.items[0].item_name || quote.items[0].item_code || 'Product') : 
              'Quotation Items';

            return {
              id: quote.name,
              orderNumber: quote.name,
              type: 'Quotation',
              date: quote.transaction_date,
              customerName: quote.party_name,
              amount: quote.grand_total,
              currency: quote.currency || 'K',
              status: quote.status,
              items: quote.items || [],
              mainProductName: mainItemName,
              
              // Formatted displays
              formattedAmount: `${quote.currency || 'K'} ${parseFloat(quote.grand_total || 0).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`,
              formattedDate: new Date(quote.transaction_date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              shortDate: new Date(quote.transaction_date).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            };
          });

          // Sort by date descending (newest first)
          transformedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
          
          setPreviousOrders(transformedOrders);
          console.log('✅ Fetched quotations:', transformedOrders.length);
        } else {
          setPreviousOrders([]);
        }
      } else {
        setPreviousOrders([]);
      }

    } catch (error) {
      console.error('❌ Error fetching quotations:', error);
      setPreviousOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  // **🎯 Toggle Order Expansion**
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // **🎯 View Quotation Details**
  const handleViewQuotation = (quotationName) => {
    const quotationUrl = `/app/quotation/${quotationName}`;
    window.open(quotationUrl, '_blank');
  };

  // **🎯 Download Quotation PDF**
  const handleDownloadQuotation = (quotationName) => {
    const downloadUrl = `/api/method/frappe.utils.print_format.download_pdf?doctype=Quotation&name=${quotationName}&format=Standard&no_letterhead=0`;
    window.open(downloadUrl, '_blank');
  };

  // **🎯 Enhanced Get Current Cart**
  const getCurrentCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🛒 Fetching current cart...");

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.get_cart_quotation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🛒 Cart API Response:", result);

      if (result.message && result.message.doc) {
        const cartData = result.message.doc;
        const cartItems = cartData.items || [];
        
        console.log("✅ Cart items found:", cartItems);
        
        // Transform cart items to display format
        const transformedCartItems = cartItems.map(item => ({
          // Cart item fields
          item_code: item.item_code,
          item_name: item.item_name || item.web_item_name,
          qty: item.qty,
          rate: item.rate,
          amount: item.amount,
          
          // Additional item details
          image: item.thumbnail || item.website_image || item.image || '/placeholder.jpg',
          description: item.description || `Premium ${item.item_name}`,
          brand: item.brand || 'Generic',
          item_group: item.item_group || 'General',
          warehouse: item.warehouse || '',
          additional_notes: item.additional_notes || '',
          
          // Computed fields
          id: item.item_code,
          quantity: item.qty,
          standard_rate: item.rate,
          total_price: item.amount,
          
          // Stock status
          in_stock: true,
          
          // Original data
          original_data: item
        }));

        setCartItems(transformedCartItems);
        
        // Enhanced cart summary
        setCartSummary({
          total_items: cartData.total_qty || cartItems.reduce((sum, item) => sum + item.qty, 0),
          total_amount: cartData.total || 0,
          net_total: cartData.net_total || 0,
          grand_total: cartData.grand_total || cartData.net_total || 0,
          taxes: cartData.total_taxes_and_charges || ((cartData.grand_total || 0) - (cartData.net_total || 0)),
          shipping_charges: cartData.shipping_charges || 0,
          discount: cartData.discount_amount || 0
        });

        console.log("✅ Cart loaded with", transformedCartItems.length, "items");
        
      } else {
        console.log("ℹ️ Cart is empty or no cart found");
        setCartItems([]);
        setCartSummary({
          total_items: 0,
          total_amount: 0,
          net_total: 0,
          grand_total: 0,
          taxes: 0,
          shipping_charges: 0,
          discount: 0
        });
      }
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
      setError(`Failed to load cart: ${error.message}`);
      showNotification('Failed to load cart. Please refresh the page.', 'error');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  // **🎯 Enhanced Update Cart Quantity**
  const updateCartQuantity = async (itemCode, newQuantity, additionalNotes = null) => {
    try {
      setUpdating(prev => ({ ...prev, [itemCode]: true }));
      console.log(`🛒 Updating ${itemCode} quantity to ${newQuantity}...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: itemCode,
          qty: newQuantity,
          additional_notes: additionalNotes
        }),
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🛒 Update Cart API Response:", result);

      if (result.message) {
        console.log("✅ Successfully updated cart quantity");
        showNotification(
          newQuantity === 0 ? 'Item removed from cart' : 'Cart updated successfully', 
          'success'
        );
        // Refresh cart data after update
        await getCurrentCart();
        return true;
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error('❌ Error updating cart:', error);
      showNotification('Failed to update cart. Please try again.', 'error');
      return false;
    } finally {
      setUpdating(prev => ({ ...prev, [itemCode]: false }));
    }
  };

  // **🎯 Enhanced Remove Item from Cart**
  const removeFromCart = async (itemCode, itemName) => {
    if (!window.confirm(`Are you sure you want to remove "${itemName}" from cart?`)) {
      return;
    }

    return await updateCartQuantity(itemCode, 0);
  };

  // **🎯 Clear Entire Cart**
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }

    try {
      setLoading(true);
      console.log("🗑️ Clearing entire cart...");

      // Remove each item individually
      const clearPromises = cartItems.map(item => 
        updateCartQuantity(item.item_code, 0)
      );
      
      await Promise.all(clearPromises);

      console.log("✅ Cart cleared successfully");
      showNotification("Cart cleared successfully!", 'success');
      
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      showNotification("Error clearing cart. Please try again.", 'error');
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Enhanced Handle Quantity Changes**
  const handleQuantityChange = async (itemCode, currentQty, change) => {
    const newQuantity = Math.max(0, currentQty + change);
    
    if (newQuantity === 0) {
      const item = cartItems.find(item => item.item_code === itemCode);
      await removeFromCart(itemCode, item?.item_name || itemCode);
    } else {
      await updateCartQuantity(itemCode, newQuantity);
    }
  };

  // **🎯 Request for Quotation - ORIGINAL WORKING VERSION**
  const handleRequestQuotation = async () => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty. Please add items before requesting a quotation.', 'warning');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.request_for_quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.message) {
        showNotification(`Quotation requested successfully! Reference: ${result.message}`, 'success');
        // Refresh orders after creating new quotation
        setTimeout(() => fetchPreviousOrders(), 1000);
      } else {
        throw new Error('Failed to request quotation');
      }
    } catch (error) {
      console.error('Error requesting quotation:', error);
      showNotification('Failed to request quotation. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Enhanced Handle Checkout**
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty. Please add items before checkout.', 'warning');
      return;
    }
    
    try {
      setLoading(true);
      console.log("🛒 Proceeding to checkout with data:", {
        items: cartItems.length,
        total: cartSummary.grand_total
      });

      // You can implement actual order placement here
      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.place_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.message) {
        showNotification(`Order placed successfully! Order ID: ${result.message}`, 'success');
        navigate(`/order-confirmation/${result.message}`);
      } else {
        // If not ready to place order, show summary
        showNotification(`Proceeding to checkout with ${cartSummary.total_items} items worth ₹${cartSummary.grand_total.toFixed(2)}`, 'info');
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      showNotification('Checkout failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Load cart and previous orders on component mount**
  useEffect(() => {
    console.log("Loading cart data...");
    getCurrentCart();
    fetchPreviousOrders();
  }, [getCurrentCart, fetchPreviousOrders]);

  // **🎯 Auto-refresh cart every 30 seconds**
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !Object.keys(updating).some(key => updating[key])) {
        getCurrentCart();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [getCurrentCart, loading, updating]);

  // **🎯 Notification Component**
  const NotificationBar = () => {
    if (!notification) return null;

    const getIcon = () => {
      switch (notification.type) {
        case 'success': return <FaCheckCircle />;
        case 'error': return <FaExclamationTriangle />;
        case 'warning': return <FaExclamationTriangle />;
        default: return <FaShoppingCart />;
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

  // **🎯 Previous Orders Section - Clean Design**
  const PreviousOrdersSection = () => {
    // Only render if there are orders
    if (previousOrders.length === 0 && !ordersLoading) {
      return null; // Don't show anything if no orders
    }

    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB',
        marginTop: '30px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '25px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#0F1111',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FaFileInvoice size={22} />
            Previous Orders
            {previousOrders.length > 0 && (
              <span style={{
                backgroundColor: '#007185',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: '12px'
              }}>
                {previousOrders.length}
              </span>
            )}
          </h2>

          {ordersLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#565959' }}>
              <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
              Loading quotations...
            </div>
          )}
        </div>

        {ordersLoading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#565959'
          }}>
            <FaSpinner size={48} style={{ marginBottom: '16px', opacity: 0.5, animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '16px', margin: 0 }}>
              Loading your order history...
            </p>
          </div>
        ) : (
          <div style={{ space: '16px' }}>
            {previousOrders.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              
              return (
                <div
                  key={order.id}
                  style={{
                    border: '2px solid #E5E7EB',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  {/* Order Header */}
                  <div
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#FFFFFF',
                      borderBottom: isExpanded ? '1px solid #E5E7EB' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8F9FA';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    {/* Left Section - Order Number & Date */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '200px' }}>
                      <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#0F1111'
                      }}>
                        {order.orderNumber}
                      </h3>
                      <div style={{
                        fontSize: '14px',
                        color: '#565959',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <FaCalendarAlt size={12} />
                        {order.shortDate}
                      </div>
                    </div>

                    {/* Center Section - Status & Product */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px',
                      flex: 1,
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        backgroundColor: order.status === 'Open' ? '#D1ECF1' : 
                                      order.status === 'Submitted' ? '#D4EDDA' : 
                                      order.status === 'Draft' ? '#FFF3CD' : '#F8D7DA',
                        color: order.status === 'Open' ? '#0C5460' :
                              order.status === 'Submitted' ? '#155724' :
                              order.status === 'Draft' ? '#856404' : '#721C24',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {order.status}
                      </span>
                      <div style={{
                        fontSize: '14px',
                        color: '#565959',
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {order.mainProductName}...
                      </div>
                    </div>

                    {/* Right Section - Amount & Actions */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#B12704'
                        }}>
                          {order.formattedAmount}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#565959'
                        }}>
                          {order.items.length} items
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewQuotation(order.orderNumber);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#007185',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="View Details"
                        >
                          <FaEye size={12} />
                          View
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadQuotation(order.orderNumber);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#FF9900',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Download PDF"
                        >
                          <FaDownload size={12} />
                          PDF
                        </button>
                      </div>
                      
                      <div
                        onClick={() => toggleOrderExpansion(order.id)}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: '#007185',
                          cursor: 'pointer'
                        }}
                      >
                        <FaChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Items */}
                  {isExpanded && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#FAFAFA'
                    }}>
                      <h4 style={{
                        margin: '0 0 16px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#0F1111',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FaBoxOpen size={14} />
                        Order Items ({order.items.length})
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '16px',
                              backgroundColor: '#FFFFFF',
                              borderRadius: '8px',
                              border: '1px solid #E5E7EB'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#0F1111',
                                marginBottom: '4px'
                              }}>
                                {item.item_name || item.item_code}
                              </div>
                              <div style={{
                                fontSize: '12px',
                                color: '#565959'
                              }}>
                                Item Code: {item.item_code}
                              </div>
                              {item.description && (
                                <div style={{
                                  fontSize: '12px',
                                  color: '#666',
                                  marginTop: '4px',
                                  maxWidth: '400px'
                                }}>
                                  {item.description}
                                </div>
                              )}
                            </div>

                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '20px',
                              fontSize: '14px'
                            }}>
                              <div style={{ textAlign: 'center', minWidth: '60px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '2px' }}>Qty</div>
                                <div>{item.qty || 1}</div>
                              </div>
                              
                              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '2px' }}>Rate</div>
                                <div>{order.currency} {parseFloat(item.rate || 0).toLocaleString('en-IN', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}</div>
                              </div>
                              
                              <div style={{ textAlign: 'center', minWidth: '120px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '2px', color: '#B12704' }}>Amount</div>
                                <div style={{ fontWeight: '600', color: '#B12704' }}>
                                  {order.currency} {parseFloat(item.amount || 0).toLocaleString('en-IN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        backgroundColor: '#F8F9FA',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontSize: '16px', fontWeight: '600' }}>Total Amount:</span>
                          <span style={{ fontSize: '20px', fontWeight: '700', color: '#B12704' }}>
                            {order.formattedAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // **🎯 Enhanced Loading State**
  if (loading && cartItems.length === 0) {
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
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  // **🎯 Error State**
  if (error && cartItems.length === 0) {
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
            Failed to Load Cart
          </h2>
          <p style={{ color: '#565959', marginBottom: '20px' }}>
            {error}
          </p>
          <button
            onClick={getCurrentCart}
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

  // **🎯 Enhanced Empty Cart State**
  if (!cartItems || cartItems.length === 0) {
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

            <FaShoppingBag size={100} color="#CCCCCC" style={{ marginBottom: '32px' }} />
            
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#0F1111',
              margin: '0 0 20px 0'
            }}>
              Your cart is empty
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#565959',
              marginBottom: '32px',
              lineHeight: '1.5'
            }}>
              Looks like you haven't added anything to your cart yet.<br/>
              Browse our products and find something you love!
            </p>
            
            <Link 
              to="/trade"
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
              <FaShoppingBag size={18} /> Start Shopping
            </Link>
          </div>

          {/* Show Previous Orders even when cart is empty */}
          <div style={{ maxWidth: '1400px', margin: '60px auto 0' }}>
            <PreviousOrdersSection />
          </div>
        </div>
      </>
    );
  }

  // **🎯 Main Cart Items Display**
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
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
                Shopping Cart
              </h1>
              <p style={{
                color: '#565959',
                fontSize: '16px',
                margin: 0
              }}>
                {cartSummary.total_items} {cartSummary.total_items === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleRequestQuotation}
                disabled={loading || cartItems.length === 0}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#007185',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: loading || cartItems.length === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  opacity: loading || cartItems.length === 0 ? 0.6 : 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!loading && cartItems.length > 0) {
                    e.target.style.backgroundColor = '#005F73';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && cartItems.length > 0) {
                    e.target.style.backgroundColor = '#007185';
                  }
                }}
              >
                Request Quote
              </button>
              
              {/* <button
                onClick={clearCart}
                disabled={loading || cartItems.length === 0}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#B12704',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: loading || cartItems.length === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  opacity: loading || cartItems.length === 0 ? 0.6 : 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!loading && cartItems.length > 0) {
                    e.target.style.backgroundColor = '#A02100';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && cartItems.length > 0) {
                    e.target.style.backgroundColor = '#B12704';
                  }
                }}
              >
                Clear Cart
              </button> */}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 1024 ? '2fr 1fr' : '1fr',
            gap: '30px'
          }}>
            {/* Enhanced Cart Items */}
            <div>
              {cartItems.map((item, index) => {
                const isItemUpdating = updating[item.item_code] || false;
                
                return (
                  <div
                    key={item.item_code || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '25px',
                      backgroundColor: '#FFFFFF',
                      marginBottom: '15px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      border: '1px solid #E5E7EB',
                      opacity: isItemUpdating ? 0.7 : 1,
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                      textAlign: window.innerWidth < 768 ? 'center' : 'left'
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
                    <Link 
                      to={`/product/${item.item_code}`} 
                      style={{ 
                        flexShrink: 0, 
                        marginRight: window.innerWidth < 768 ? '0' : '25px',
                        marginBottom: window.innerWidth < 768 ? '15px' : '0',
                        display: 'block',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.item_name}
                        style={{
                          width: '120px',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/120x120?text=${encodeURIComponent(item.item_name.substring(0, 5))}`;
                        }}
                      />
                    </Link>

                    {/* Enhanced Product Info */}
                    <div style={{ 
                      flex: 1,
                      marginBottom: window.innerWidth < 768 ? '15px' : '0'
                    }}>
                      <Link 
                        to={`/product/${item.item_code}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#0F1111',
                          margin: '0 0 10px 0',
                          lineHeight: '1.3',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = '#007185';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = '#0F1111';
                        }}
                        >
                          {item.item_name}
                        </h3>
                      </Link>
                      
                      <div style={{
                        fontSize: '14px',
                        color: '#565959',
                        marginBottom: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '15px',
                        justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
                      }}>
                        <span><strong>Code:</strong> {item.item_code}</span>
                        <span><strong>Brand:</strong> {item.brand}</span>
                        <span><strong>Category:</strong> {item.item_group}</span>
                        {item.warehouse && <span><strong>Warehouse:</strong> {item.warehouse}</span>}
                      </div>

                      <p style={{
                        color: '#666666',
                        fontSize: '14px',
                        marginBottom: '12px',
                        lineHeight: '1.5',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {item.description || 'No description available'}
                      </p>
                      
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#B12704',
                        marginBottom: '12px'
                      }}>
                        ₹{item.rate?.toLocaleString('en-IN') || '0'} per unit
                      </div>

                      {/* Item Info */}
                      <div style={{
                        fontSize: '13px',
                        color: '#007185',
                        backgroundColor: '#F0F8FF',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        display: 'inline-block',
                        border: '1px solid #E0F2FE'
                      }}>
                        Item • Qty: {item.qty} • Line Total: ₹{item.amount?.toLocaleString('en-IN')}
                      </div>

                      {item.additional_notes && (
                        <div style={{
                          marginTop: '8px',
                          fontSize: '13px',
                          color: '#666',
                          fontStyle: 'italic',
                          backgroundColor: '#FFFBF0',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid #FEF3CD'
                        }}>
                          Note: {item.additional_notes}
                        </div>
                      )}
                    </div>

                    {/* Enhanced Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginRight: window.innerWidth < 768 ? '0' : '25px',
                      marginBottom: window.innerWidth < 768 ? '15px' : '0'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#F8F9FA',
                        borderRadius: '8px',
                        border: '2px solid #E5E7EB',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => handleQuantityChange(item.item_code, item.qty, -1)}
                          disabled={isItemUpdating}
                          style={{
                            width: '40px',
                            height: '40px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isItemUpdating ? 0.5 : 1,
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            if (!isItemUpdating) e.target.style.backgroundColor = '#E5E7EB';
                          }}
                          onMouseOut={(e) => {
                            if (!isItemUpdating) e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <FaMinus size={14} />
                        </button>
                        
                        <span style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          minWidth: '50px',
                          textAlign: 'center',
                          backgroundColor: '#FFFFFF',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderLeft: '1px solid #E5E7EB',
                          borderRight: '1px solid #E5E7EB'
                        }}>
                          {item.qty}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.item_code, item.qty, 1)}
                          disabled={isItemUpdating}
                          style={{
                            width: '40px',
                            height: '40px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isItemUpdating ? 0.5 : 1,
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            if (!isItemUpdating) e.target.style.backgroundColor = '#E5E7EB';
                          }}
                          onMouseOut={(e) => {
                            if (!isItemUpdating) e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Item Total & Remove */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: window.innerWidth < 768 ? 'center' : 'flex-end',
                      gap: '15px'
                    }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#0F1111'
                      }}>
                        ₹{item.amount?.toLocaleString('en-IN') || '0'}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.item_code, item.item_name)}
                        disabled={isItemUpdating}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: 'transparent',
                          border: '2px solid #B12704',
                          borderRadius: '6px',
                          color: '#B12704',
                          cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          opacity: isItemUpdating ? 0.5 : 1,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          if (!isItemUpdating) {
                            e.target.style.backgroundColor = '#B12704';
                            e.target.style.color = '#FFFFFF';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isItemUpdating) {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#B12704';
                          }
                        }}
                      >
                        <FaTrash size={12} />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Order Summary */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '25px',
              borderRadius: '12px',
              height: 'fit-content',
              position: 'sticky',
              top: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              border: '1px solid #E5E7EB'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#0F1111',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaShoppingCart size={20} />
                Order Summary
              </h2>

              {/* Summary Details */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '16px'
                }}>
                  <span>Subtotal ({cartSummary.total_items} items):</span>
                  <span style={{ fontWeight: '600' }}>₹{cartSummary.net_total?.toLocaleString('en-IN')}</span>
                </div>

                {cartSummary.discount > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: '#00A652'
                  }}>
                    <span>Discount:</span>
                    <span style={{ fontWeight: '600' }}>-₹{cartSummary.discount?.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '16px'
                }}>
                  <span>Shipping:</span>
                  <span style={{ color: '#00A652', fontWeight: '600' }}>
                    {cartSummary.shipping_charges > 0 ? `₹${cartSummary.shipping_charges?.toLocaleString('en-IN')}` : 'FREE'}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '16px'
                }}>
                  <span>Tax:</span>
                  <span style={{ fontWeight: '600' }}>₹{cartSummary.taxes?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <hr style={{ 
                margin: '20px 0', 
                border: 'none', 
                borderTop: '2px solid #E5E7EB' 
              }} />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '25px',
                fontSize: '20px',
                fontWeight: '700'
              }}>
                <span>Grand Total:</span>
                <span style={{ color: '#B12704' }}>
                  ₹{cartSummary.grand_total?.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  to="/trade"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px',
                    color: '#007185',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '2px solid #007185',
                    borderRadius: '8px',
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
                  Continue Shopping
                </Link>
              </div>

              {/* Status Indicator */}
              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#F0F8FF',
                borderRadius: '8px',
                border: '1px solid #E0F2FE',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#007185',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  <FaCheckCircle size={16} />
                  System Connected
                </div>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '12px',
                  color: '#565959'
                }}>
                  Previous orders loaded
                </p>
              </div>

              {/* Debug Info - Remove in production */}
              {process.env.NODE_ENV === 'development' && (
                <details style={{ marginTop: '20px', fontSize: '12px' }}>
                  <summary style={{ cursor: 'pointer', color: '#007185', fontWeight: '600' }}>
                    🔍 Debug Info
                  </summary>
                  <pre style={{
                    backgroundColor: '#F8F9FA',
                    padding: '10px',
                    borderRadius: '6px',
                    overflow: 'auto',
                    marginTop: '10px',
                    maxHeight: '200px',
                    fontSize: '11px',
                    border: '1px solid #E5E7EB'
                  }}>
                    {JSON.stringify({
                      total_items: cartSummary.total_items,
                      net_total: cartSummary.net_total,
                      grand_total: cartSummary.grand_total,
                      taxes: cartSummary.taxes,
                      items_count: cartItems.length,
                      updating_items: Object.keys(updating).filter(key => updating[key])
                    }, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>

          {/* Previous Orders Section */}
          <PreviousOrdersSection />
        </div>

        {/* CSS for animations and responsive design */}
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

export default CartPage;

