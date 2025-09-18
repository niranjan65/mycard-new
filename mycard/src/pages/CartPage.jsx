import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaMinus, FaPlus, FaTrash, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { COLORS } from '../constants/colors';

const CartPage = () => {
  const navigate = useNavigate();
  
  // **🎯 ERPNext Cart State**
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartSummary, setCartSummary] = useState({
    total_items: 0,
    total_amount: 0,
    net_total: 0,
    grand_total: 0,
    taxes: 0
  });
  const [updating, setUpdating] = useState({});

  // **🎯 Get Current Cart from ERPNext**
  const getCurrentCart = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    try {
      setLoading(true);
      console.log("🛒 Fetching current cart from ERPNext...");

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.get_cart_quotation", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      });

      const result = await response.json();
      console.log("🛒 ERPNext Cart API Response:", result);

      if (result.message && result.message.items && result.message.items.length > 0) {
        console.log("✅ Cart items found:", result.message.items);
        
        // Transform ERPNext cart items to display format
        const transformedCartItems = result.message.items.map(item => ({
          // ERPNext cart item fields
          item_code: item.item_code,
          item_name: item.item_name,
          qty: item.qty,
          rate: item.rate,
          amount: item.amount,
          
          // Additional item details (you may need to fetch these)
          image: item.image || item.website_image || 'https://via.placeholder.com/100x100?text=No+Image',
          description: item.description || `Premium ${item.item_name} from ERPNext`,
          brand: item.brand || 'Generic',
          item_group: item.item_group || 'General',
          
          // Computed fields
          id: item.item_code,
          quantity: item.qty,
          standard_rate: item.rate,
          total_price: item.amount,
          
          // Stock status
          in_stock: true, // Assume in stock if in cart
          
          // Original ERPNext data
          original_erpnext_data: item
        }));

        setCartItems(transformedCartItems);
        
        // Set cart summary from ERPNext response
        setCartSummary({
          total_items: result.message.items.reduce((sum, item) => sum + item.qty, 0),
          total_amount: result.message.net_total || 0,
          net_total: result.message.net_total || 0,
          grand_total: result.message.grand_total || result.message.net_total || 0,
          taxes: (result.message.grand_total || 0) - (result.message.net_total || 0)
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
          taxes: 0
        });
      }
    } catch (error) {
      console.error('❌ Error fetching ERPNext cart:', error);
      setCartItems([]);
      setCartSummary({
        total_items: 0,
        total_amount: 0,
        net_total: 0,
        grand_total: 0,
        taxes: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Update Cart Quantity in ERPNext**
  const updateCartQuantity = async (itemCode, newQuantity) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
    myHeaders.append("Content-Type", "application/json");

    try {
      setUpdating(prev => ({ ...prev, [itemCode]: true }));
      console.log(`🛒 Updating ${itemCode} quantity to ${newQuantity}...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.update_cart", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          item_code: itemCode,
          qty: newQuantity
        }),
        redirect: "follow"
      });

      const result = await response.json();
      console.log("🛒 Update Cart API Response:", result);

      if (result.message) {
        console.log("✅ Successfully updated cart quantity");
        // Refresh cart data after update
        await getCurrentCart();
        return true;
      } else {
        console.error("❌ Failed to update cart:", result);
        alert("Failed to update cart. Please try again.");
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating cart:', error);
      alert("Error updating cart. Please check your connection.");
      return false;
    } finally {
      setUpdating(prev => ({ ...prev, [itemCode]: false }));
    }
  };

  // **🎯 Remove Item from ERPNext Cart**
  const removeFromCart = async (itemCode) => {
    if (!window.confirm('Are you sure you want to remove this item from cart?')) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
    myHeaders.append("Content-Type", "application/json");

    try {
      setUpdating(prev => ({ ...prev, [itemCode]: true }));
      console.log(`🗑️ Removing ${itemCode} from cart...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.update_cart", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          item_code: itemCode,
          qty: 0
        }),
        redirect: "follow"
      });

      const result = await response.json();
      console.log("🗑️ Remove from Cart API Response:", result);

      if (result.message) {
        console.log("✅ Successfully removed from cart");
        alert(`Removed ${itemCode} from cart!`);
        // Refresh cart data after removal
        await getCurrentCart();
        return true;
      } else {
        console.error("❌ Failed to remove from cart:", result);
        alert("Failed to remove item. Please try again.");
        return false;
      }
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      alert("Error removing item. Please check your connection.");
      return false;
    } finally {
      setUpdating(prev => ({ ...prev, [itemCode]: false }));
    }
  };

  // **🎯 Clear Entire Cart**
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }

    try {
      setLoading(true);
      console.log("🗑️ Clearing entire cart...");

      // Remove each item individually (ERPNext may not have a bulk clear method)
      for (const item of cartItems) {
        await updateCartQuantity(item.item_code, 0);
      }

      console.log("✅ Cart cleared successfully");
      alert("Cart cleared successfully!");
      
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      alert("Error clearing cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Handle Quantity Changes**
  const handleQuantityChange = async (itemCode, currentQty, change) => {
    const newQuantity = currentQty + change;
    
    if (newQuantity <= 0) {
      await removeFromCart(itemCode);
    } else {
      await updateCartQuantity(itemCode, newQuantity);
    }
  };

  // **🎯 Handle Checkout**
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }
    
    console.log("🛒 Proceeding to checkout with ERPNext data:", {
      items: cartItems.length,
      total: cartSummary.grand_total
    });
    
    alert(`Proceeding to checkout with ${cartSummary.total_items} items worth ₹${cartSummary.grand_total.toFixed(2)}`);
    // navigate('/checkout'); // Uncomment when checkout is ready
  };

  // **🎯 Load cart on component mount**
  useEffect(() => {
    console.log("Loading ERPNext cart data...");
    getCurrentCart();
  }, []);

  // **🎯 Loading State**
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
            Loading your ERPNext cart...
          </p>
        </div>
      </div>
    );
  }

  // **🎯 Empty Cart State**
  if (!cartItems || cartItems.length === 0) {
    return (
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
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #D5D9D9',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#0F1111'
              }}
            >
              <FaArrowLeft size={14} />
              Back
            </button>
          </div>

          <FaShoppingBag size={80} color="#CCCCCC" style={{ marginBottom: '24px' }} />
          
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#0F1111',
            margin: '0 0 16px 0'
          }}>
            Your ERPNext cart is empty
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: '#565959',
            marginBottom: '32px'
          }}>
            Looks like you haven't added anything to your ERPNext cart yet
          </p>
          
          <Link 
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FF9900',
              color: '#FFFFFF',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E88B00'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#FF9900'}
          >
            <FaShoppingBag /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // **🎯 Cart Items Display**
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
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px'
        }}>
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
              color: '#0F1111'
            }}
          >
            <FaArrowLeft size={14} />
            Back
          </button>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: '400',
            color: '#0F1111',
            margin: 0
          }}>
            ERPNext Shopping Cart ({cartSummary.total_items} items)
          </h1>

          <button
            onClick={clearCart}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#B12704',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              opacity: loading ? 0.6 : 1
            }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px'
        }}>
          {/* Cart Items */}
          <div>
            {cartItems.map((item, index) => {
              const isItemUpdating = updating[item.item_code] || false;
              
              return (
                <div
                  key={item.item_code || index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    borderBottom: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    opacity: isItemUpdating ? 0.7 : 1,
                    position: 'relative'
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
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      zIndex: 10
                    }}>
                      <FaSpinner 
                        size={20} 
                        color="#FF9900" 
                        style={{ animation: 'spin 1s linear infinite' }} 
                      />
                    </div>
                  )}

                  {/* Product Image */}
                  <Link to={`/product/${item.item_code}`} style={{ flexShrink: 0, marginRight: '20px' }}>
                    <img
                      src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                      alt={item.item_name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/100x100?text=${encodeURIComponent(item.item_name.substring(0, 5))}`;
                      }}
                    />
                  </Link>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <Link 
                      to={`/product/${item.item_code}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#0F1111',
                        margin: '0 0 8px 0',
                        lineHeight: '1.3'
                      }}>
                        {item.item_name}
                      </h3>
                    </Link>
                    
                    <div style={{
                      fontSize: '14px',
                      color: '#565959',
                      marginBottom: '8px'
                    }}>
                      Item Code: {item.item_code} | Brand: {item.brand} | Category: {item.item_group}
                    </div>

                    <p style={{
                      color: '#666666',
                      fontSize: '13px',
                      marginBottom: '12px',
                      lineHeight: '1.4',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.description || 'No description available'}
                    </p>
                    
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#B12704',
                      marginBottom: '12px'
                    }}>
                      ₹{item.rate?.toLocaleString() || '0'} per unit
                    </div>

                    {/* ERPNext Specific Info */}
                    <div style={{
                      fontSize: '12px',
                      color: '#007185',
                      backgroundColor: '#F0F8FF',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}>
                      ERPNext Item • Qty: {item.qty} • Amount: ₹{item.amount?.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginRight: '20px'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(item.item_code, item.qty, -1)}
                      disabled={isItemUpdating}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #D5D9D9',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                        cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isItemUpdating ? 0.5 : 1
                      }}
                    >
                      <FaMinus size={12} />
                    </button>
                    
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {item.qty}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.item_code, item.qty, 1)}
                      disabled={isItemUpdating}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #D5D9D9',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                        cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isItemUpdating ? 0.5 : 1
                      }}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '12px'
                  }}>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#0F1111'
                    }}>
                      ₹{item.amount?.toLocaleString() || '0'}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.item_code)}
                      disabled={isItemUpdating}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#B12704',
                        cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        opacity: isItemUpdating ? 0.5 : 1
                      }}
                    >
                      <FaTrash size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary - ERPNext Data */}
          <div style={{
            backgroundColor: '#F7F8F8',
            padding: '20px',
            borderRadius: '8px',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0F1111',
              marginBottom: '20px'
            }}>
              ERPNext Order Summary
            </h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '14px'
            }}>
              <span>Subtotal ({cartSummary.total_items} items):</span>
              <span>₹{cartSummary.net_total?.toLocaleString()}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '14px'
            }}>
              <span>Shipping:</span>
              <span style={{ color: '#00A652', fontWeight: '600' }}>FREE</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '14px'
            }}>
              <span>Tax (from ERPNext):</span>
              <span>₹{cartSummary.taxes?.toLocaleString()}</span>
            </div>

            <hr style={{ margin: '15px 0', border: '1px solid #D5D9D9' }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              <span>Grand Total:</span>
              <span style={{ color: '#B12704' }}>
                ₹{cartSummary.grand_total?.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#F0F0F0' : '#FFD814',
                border: `1px solid ${loading ? '#D0D0D0' : '#FCD200'}`,
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '10px',
                transition: 'background-color 0.3s ease',
                opacity: loading ? 0.6 : 1
              }}
              onMouseOver={(e) => {
                if (!loading) e.target.style.backgroundColor = '#F7CA00';
              }}
              onMouseOut={(e) => {
                if (!loading) e.target.style.backgroundColor = '#FFD814';
              }}
            >
              {loading ? 'Updating Cart...' : 'Proceed to Checkout'}
            </button>

            <Link
              to="/products"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '10px',
                color: '#007185',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Continue Shopping
            </Link>

            {/* Debug Info - Remove in production */}
            <details style={{ marginTop: '20px', fontSize: '12px' }}>
              <summary style={{ cursor: 'pointer', color: '#007185' }}>
                🔍 ERPNext Cart Debug
              </summary>
              <pre style={{
                backgroundColor: '#F0F0F0',
                padding: '8px',
                borderRadius: '4px',
                overflow: 'auto',
                marginTop: '8px',
                maxHeight: '200px'
              }}>
                {JSON.stringify({
                  total_items: cartSummary.total_items,
                  net_total: cartSummary.net_total,
                  grand_total: cartSummary.grand_total,
                  taxes: cartSummary.taxes,
                  items_count: cartItems.length
                }, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CartPage;


/////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingBag, FaMinus, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';
// import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
// import { COLORS } from '../constants/colors';

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const cartState = useSelector(state => state.cart);
//   console.log('Cart state in CartPage:', cartState);
  
//   const { items, totalAmount, totalItems } = cartState;
  
//   console.log('Items from state:', items);
//   console.log('Total items:', totalItems);
//   console.log('Total amount:', totalAmount);

//   const handleRemoveItem = (itemId) => {
//     if (window.confirm('Are you sure you want to remove this item from cart?')) {
//       dispatch(removeFromCart(itemId));
//     }
//   };

//   const handleUpdateQuantity = (itemId, quantity) => {
//     if (quantity <= 0) {
//       handleRemoveItem(itemId);
//     } else {
//       dispatch(updateQuantity({ id: itemId, quantity }));
//     }
//   };

//   const handleCheckout = () => {
//     if (!items || items.length === 0) {
//       alert('Your cart is empty. Please add items before checkout.');
//       return;
//     }
//     alert('Proceeding to checkout with ' + totalItems + ' items worth ₹' + totalAmount.toFixed(2));
//     // navigate('/checkout'); // Uncomment when checkout page is ready
//   };

//   const handleClearCart = () => {
//     if (window.confirm('Are you sure you want to clear your entire cart?')) {
//       dispatch(clearCart());
//     }
//   };

//   console.log('Rendering cart with items length:', items?.length || 0);

//   if (!items || items.length === 0) {
//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh',
//         padding: '40px 20px'
//       }}>
//         <div style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           textAlign: 'center'
//         }}>
//           {/* Back Button */}
//           <div style={{ marginBottom: '40px', textAlign: 'left' }}>
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 padding: '8px 16px',
//                 backgroundColor: 'transparent',
//                 border: '1px solid #D5D9D9',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 color: '#0F1111'
//               }}
//             >
//               <FaArrowLeft size={14} />
//               Back
//             </button>
//           </div>

//           <FaShoppingBag size={80} color="#CCCCCC" style={{ marginBottom: '24px' }} />
          
//           <h2 style={{
//             fontSize: '32px',
//             fontWeight: '600',
//             color: '#0F1111',
//             margin: '0 0 16px 0'
//           }}>
//             Your cart is empty
//           </h2>
          
//           <p style={{
//             fontSize: '18px',
//             color: '#565959',
//             marginBottom: '32px'
//           }}>
//             Looks like you haven't added anything to your cart yet
//           </p>
          
//           {/* Debug information - Remove in production */}
//           <div style={{
//             backgroundColor: '#F7F8F8',
//             padding: '16px',
//             borderRadius: '8px',
//             marginBottom: '24px',
//             border: '1px solid #E5E7EB'
//           }}>
//             <h4 style={{ color: '#0F1111', marginBottom: '8px', fontSize: '14px' }}>Debug Info:</h4>
//             <p style={{ color: '#565959', fontSize: '12px', textAlign: 'left' }}>
//               Items in state: {items?.length || 0}<br/>
//               Total items: {totalItems}<br/>
//               Total amount: ₹{totalAmount?.toFixed(2) || '0.00'}<br/>
//               Items array: {JSON.stringify(items, null, 2)}
//             </p>
//           </div>
          
//           <Link 
//             to="/products"
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '12px',
//               backgroundColor: '#FF9900',
//               color: '#FFFFFF',
//               padding: '16px 32px',
//               fontSize: '18px',
//               fontWeight: '600',
//               textDecoration: 'none',
//               borderRadius: '8px',
//               transition: 'background-color 0.3s ease'
//             }}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#E88B00'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#FF9900'}
//           >
//             <FaShoppingBag /> Start Shopping
//           </Link>
//         </div>
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
//         {/* Header */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginBottom: '30px'
//         }}>
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               padding: '8px 16px',
//               backgroundColor: 'transparent',
//               border: '1px solid #D5D9D9',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               color: '#0F1111'
//             }}
//           >
//             <FaArrowLeft size={14} />
//             Back
//           </button>
          
//           <h1 style={{
//             fontSize: '28px',
//             fontWeight: '400',
//             color: '#0F1111',
//             margin: 0
//           }}>
//             Shopping Cart ({totalItems} items)
//           </h1>

//           <button
//             onClick={handleClearCart}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#B12704',
//               color: '#FFFFFF',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '600'
//             }}
//           >
//             Clear Cart
//           </button>
//         </div>

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '2fr 1fr',
//           gap: '30px'
//         }}>
//           {/* Cart Items */}
//           <div>
//             {items.map((item, index) => (
//               <div
//                 key={item.id || item.name || index}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '20px',
//                   borderBottom: '1px solid #E5E7EB',
//                   backgroundColor: '#FFFFFF',
//                   marginBottom: '10px',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//                 }}
//               >
//                 {/* Product Image */}
//                 <Link to={`/product/${item.id}`} style={{ flexShrink: 0, marginRight: '20px' }}>
//                   <img
//                     src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
//                     alt={item.item_name}
//                     style={{
//                       width: '100px',
//                       height: '100px',
//                       objectFit: 'cover',
//                       borderRadius: '6px'
//                     }}
//                   />
//                 </Link>

//                 {/* Product Info */}
//                 <div style={{ flex: 1 }}>
//                   <Link 
//                     to={`/product/${item.id}`}
//                     style={{ textDecoration: 'none', color: 'inherit' }}
//                   >
//                     <h3 style={{
//                       fontSize: '16px',
//                       fontWeight: '600',
//                       color: '#0F1111',
//                       margin: '0 0 8px 0',
//                       lineHeight: '1.3'
//                     }}>
//                       {item.item_name}
//                     </h3>
//                   </Link>
                  
//                   <div style={{
//                     fontSize: '14px',
//                     color: '#565959',
//                     marginBottom: '8px'
//                   }}>
//                     Brand: {item.brand || 'Unknown'} | Category: {item.category || 'General'}
//                   </div>

//                   <p style={{
//                     color: '#666666',
//                     fontSize: '13px',
//                     marginBottom: '12px',
//                     lineHeight: '1.4',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     display: '-webkit-box',
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: 'vertical'
//                   }}>
//                     {item.description || 'No description available'}
//                   </p>
                  
//                   <div style={{
//                     fontSize: '18px',
//                     fontWeight: '600',
//                     color: '#B12704',
//                     marginBottom: '12px'
//                   }}>
//                     ₹{item.standard_rate?.toLocaleString() || item.price?.toLocaleString() || 'N/A'}
//                   </div>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px',
//                   marginRight: '20px'
//                 }}>
//                   <button
//                     onClick={() => handleUpdateQuantity(item.id || item.name, item.quantity - 1)}
//                     style={{
//                       width: '32px',
//                       height: '32px',
//                       border: '1px solid #D5D9D9',
//                       backgroundColor: '#FFFFFF',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <FaMinus size={12} />
//                   </button>
                  
//                   <span style={{
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     minWidth: '30px',
//                     textAlign: 'center'
//                   }}>
//                     {item.quantity}
//                   </span>
                  
//                   <button
//                     onClick={() => handleUpdateQuantity(item.id || item.name, item.quantity + 1)}
//                     style={{
//                       width: '32px',
//                       height: '32px',
//                       border: '1px solid #D5D9D9',
//                       backgroundColor: '#FFFFFF',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <FaPlus size={12} />
//                   </button>
//                 </div>

//                 {/* Item Total & Remove */}
//                 <div style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'flex-end',
//                   gap: '12px'
//                 }}>
//                   <div style={{
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                     color: '#0F1111'
//                   }}>
//                     ₹{((item.standard_rate || item.price || 0) * item.quantity).toLocaleString()}
//                   </div>

//                   <button
//                     onClick={() => handleRemoveItem(item.id || item.name)}
//                     style={{
//                       padding: '8px',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       color: '#B12704',
//                       cursor: 'pointer',
//                       borderRadius: '4px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '6px',
//                       fontSize: '14px'
//                     }}
//                   >
//                     <FaTrash size={14} />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div style={{
//             backgroundColor: '#F7F8F8',
//             padding: '20px',
//             borderRadius: '8px',
//             height: 'fit-content',
//             position: 'sticky',
//             top: '20px'
//           }}>
//             <h2 style={{
//               fontSize: '20px',
//               fontWeight: '600',
//               color: '#0F1111',
//               marginBottom: '20px'
//             }}>
//               Order Summary
//             </h2>

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '10px',
//               fontSize: '14px'
//             }}>
//               <span>Subtotal ({totalItems} items):</span>
//               <span>₹{totalAmount.toLocaleString()}</span>
//             </div>

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '10px',
//               fontSize: '14px'
//             }}>
//               <span>Shipping:</span>
//               <span style={{ color: '#00A652', fontWeight: '600' }}>FREE</span>
//             </div>

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '10px',
//               fontSize: '14px'
//             }}>
//               <span>Tax:</span>
//               <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
//             </div>

//             <hr style={{ margin: '15px 0', border: '1px solid #D5D9D9' }} />

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '20px',
//               fontSize: '18px',
//               fontWeight: '600'
//             }}>
//               <span>Total:</span>
//               <span style={{ color: '#B12704' }}>
//                 ₹{(totalAmount * 1.18).toFixed(2)}
//               </span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: '#FFD814',
//                 border: '1px solid #FCD200',
//                 borderRadius: '20px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 marginBottom: '10px',
//                 transition: 'background-color 0.3s ease'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = '#F7CA00'}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#FFD814'}
//             >
//               Proceed to Checkout
//             </button>

//             <Link
//               to="/products"
//               style={{
//                 display: 'block',
//                 textAlign: 'center',
//                 padding: '10px',
//                 color: '#007185',
//                 textDecoration: 'none',
//                 fontSize: '14px',
//                 fontWeight: '600'
//               }}
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

//////////////////////////////////////////////////////////////////////////////////////////////




// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingBag, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
// import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
// import { COLORS } from '../constants/colors';

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const cartState = useSelector(state => state.cart);
//   console.log('Cart state in CartPage:', cartState);
  
//   const { items, totalAmount, totalItems } = cartState;
  
//   console.log('Items from state:', items);
//   console.log('Total items:', totalItems);
//   console.log('Total amount:', totalAmount);

//   const handleRemoveItem = (itemName) => {
//     if (window.confirm('Are you sure you want to remove this item from cart?')) {
//       dispatch(removeFromCart(itemName));
//     }
//   };

//   const handleUpdateQuantity = (itemName, quantity) => {
//     if (quantity <= 0) {
//       handleRemoveItem(itemName);
//     } else {
//       dispatch(updateQuantity({ itemName, quantity }));
//     }
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       alert('Your cart is empty. Please add items before checkout.');
//       return;
//     }
//     navigate('/checkout');
//   };

//   const handleClearCart = () => {
//     if (window.confirm('Are you sure you want to clear your entire cart?')) {
//       dispatch(clearCart());
//     }
//   };

//   console.log('Rendering cart with items length:', items?.length || 0);

//   if (!items || items.length === 0) {
//     return (
//       <div style={{
//         maxWidth: '800px',
//         margin: '0 auto',
//         padding: '80px 20px',
//         textAlign: 'center',
//         backgroundColor: COLORS.background,
//         minHeight: '100vh'
//       }}>
//         <FaShoppingBag size={80} color={COLORS.textSecondary} />
//         <h2 style={{
//           fontSize: '32px',
//           fontWeight: 'bold',
//           color: COLORS.textPrimary,
//           margin: '24px 0 16px 0'
//         }}>
//           Your cart is empty
//         </h2>
//         <p style={{
//           fontSize: '18px',
//           color: COLORS.textSecondary,
//           marginBottom: '32px'
//         }}>
//           Looks like you haven't added anything to your cart yet
//         </p>
        
//         {/* Debug information */}
//         <div style={{
//           backgroundColor: COLORS.surface,
//           padding: '16px',
//           borderRadius: '8px',
//           marginBottom: '24px',
//           border: `1px solid ${COLORS.border}`
//         }}>
//           <h4 style={{ color: COLORS.textPrimary, marginBottom: '8px' }}>Debug Info:</h4>
//           <p style={{ color: COLORS.textSecondary, fontSize: '14px' }}>
//             Items in state: {items?.length || 0}<br/>
//             Total items: {totalItems}<br/>
//             Items array: {JSON.stringify(items)}
//           </p>
//         </div>
        
//         <Link 
//           to="/products"
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
//           <FaShoppingBag /> Start Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '40px 20px',
//       backgroundColor: COLORS.background,
//       minHeight: '100vh'
//     }}>
//       <h1 style={{
//         fontSize: '32px',
//         fontWeight: 'bold',
//         color: COLORS.textPrimary,
//         marginBottom: '32px'
//       }}>
//         Shopping Cart ({totalItems} items)
//       </h1>

//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: '1fr 350px',
//         gap: '40px',
//         '@media (max-width: 768px)': {
//           gridTemplateColumns: '1fr'
//         }
//       }}>
//         {/* Cart Items */}
//         <div>
//           {items.map((item, index) => (
//             <div key={item.name || index} style={{
//               backgroundColor: COLORS.surface,
//               borderRadius: '12px',
//               padding: '24px',
//               marginBottom: '16px',
//               border: `1px solid ${COLORS.border}`
//             }}>
//               <div style={{
//                 display: 'flex',
//                 gap: '20px',
//                 alignItems: 'flex-start'
//               }}>
//                 <img 
//                   src={item.image || 'https://via.placeholder.com/120'} 
//                   alt={item.item_name}
//                   style={{
//                     width: '120px',
//                     height: '120px',
//                     objectFit: 'cover',
//                     borderRadius: '8px'
//                   }}
//                 />
                
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{
//                     fontSize: '18px',
//                     fontWeight: '600',
//                     color: COLORS.textPrimary,
//                     marginBottom: '8px',
//                     lineHeight: '1.4'
//                   }}>
//                     {item.item_name}
//                   </h3>
                  
//                   <p style={{
//                     color: COLORS.textSecondary,
//                     fontSize: '14px',
//                     marginBottom: '12px',
//                     lineHeight: '1.5'
//                   }}>
//                     {item.description?.substring(0, 100)}...
//                   </p>
                  
//                   <div style={{
//                     fontSize: '24px',
//                     fontWeight: 'bold',
//                     color: COLORS.primary,
//                     marginBottom: '16px'
//                   }}>
//                     ₹{item.standard_rate}
//                   </div>
                  
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                   }}>
//                     {/* Quantity Controls */}
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       backgroundColor: COLORS.surfaceLight,
//                       borderRadius: '8px',
//                       padding: '4px'
//                     }}>
//                       <button 
//                         onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}
//                         style={{
//                           border: 'none',
//                           backgroundColor: 'transparent',
//                           padding: '8px',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}
//                       >
//                         <FaMinus size={14} color={COLORS.textSecondary} />
//                       </button>
                      
//                       <span style={{
//                         padding: '8px 16px',
//                         fontWeight: 'bold',
//                         fontSize: '16px'
//                       }}>
//                         {item.quantity}
//                       </span>
                      
//                       <button 
//                         onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}
//                         style={{
//                           border: 'none',
//                           backgroundColor: 'transparent',
//                           padding: '8px',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}
//                       >
//                         <FaPlus size={14} color={COLORS.textSecondary} />
//                       </button>
//                     </div>
                    
//                     {/* Remove Button */}
//                     <button 
//                       onClick={() => handleRemoveItem(item.name)}
//                       style={{
//                         border: 'none',
//                         backgroundColor: 'transparent',
//                         color: COLORS.error,
//                         cursor: 'pointer',
//                         padding: '8px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}
//                     >
//                       <FaTrash size={16} />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Item Total */}
//                 <div style={{
//                   textAlign: 'right'
//                 }}>
//                   <div style={{
//                     fontSize: '20px',
//                     fontWeight: 'bold',
//                     color: COLORS.textPrimary
//                   }}>
//                     ₹{(item.standard_rate * item.quantity).toFixed(2)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div style={{
//           backgroundColor: COLORS.surface,
//           borderRadius: '12px',
//           padding: '24px',
//           border: `1px solid ${COLORS.border}`,
//           height: 'fit-content'
//         }}>
//           <h3 style={{
//             fontSize: '20px',
//             fontWeight: 'bold',
//             color: COLORS.textPrimary,
//             marginBottom: '20px'
//           }}>
//             Order Summary
//           </h3>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             marginBottom: '12px'
//           }}>
//             <span>Subtotal ({totalItems} items)</span>
//             <span>₹{totalAmount.toFixed(2)}</span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             marginBottom: '12px'
//           }}>
//             <span>Shipping</span>
//             <span style={{ color: COLORS.success }}>FREE</span>
//           </div>
          
//           <hr style={{
//             border: 'none',
//             borderTop: `1px solid ${COLORS.border}`,
//             margin: '16px 0'
//           }} />
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             marginBottom: '24px',
//             fontSize: '20px',
//             fontWeight: 'bold'
//           }}>
//             <span>Total</span>
//             <span style={{ color: COLORS.primary }}>₹{totalAmount.toFixed(2)}</span>
//           </div>
          
//           <button 
//             onClick={handleCheckout}
//             style={{
//               width: '100%',
//               backgroundColor: COLORS.primary,
//               color: COLORS.white,
//               border: 'none',
//               borderRadius: '8px',
//               padding: '16px',
//               fontSize: '18px',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               marginBottom: '12px',
//               transition: 'background-color 0.3s ease'
//             }}
//           >
//             Proceed to Checkout
//           </button>
          
//           <button 
//             onClick={handleClearCart}
//             style={{
//               width: '100%',
//               backgroundColor: 'transparent',
//               color: COLORS.error,
//               border: `2px solid ${COLORS.error}`,
//               borderRadius: '8px',
//               padding: '12px',
//               fontSize: '16px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               marginBottom: '12px',
//               transition: 'all 0.3s ease'
//             }}
//           >
//             Clear Cart
//           </button>
          
//           <Link 
//             to="/products"
//             style={{
//               display: 'block',
//               width: '100%',
//               textAlign: 'center',
//               color: COLORS.primary,
//               padding: '12px',
//               fontSize: '16px',
//               fontWeight: '600',
//               textDecoration: 'none'
//             }}
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
