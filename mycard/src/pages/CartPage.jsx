import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaMinus, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartState = useSelector(state => state.cart);
  console.log('Cart state in CartPage:', cartState);
  
  const { items, totalAmount, totalItems } = cartState;
  
  console.log('Items from state:', items);
  console.log('Total items:', totalItems);
  console.log('Total amount:', totalAmount);

  const handleRemoveItem = (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      dispatch(removeFromCart(itemId));
    }
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      dispatch(updateQuantity({ id: itemId, quantity }));
    }
  };

  const handleCheckout = () => {
    if (!items || items.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }
    alert('Proceeding to checkout with ' + totalItems + ' items worth ₹' + totalAmount.toFixed(2));
    // navigate('/checkout'); // Uncomment when checkout page is ready
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      dispatch(clearCart());
    }
  };

  console.log('Rendering cart with items length:', items?.length || 0);

  if (!items || items.length === 0) {
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
            Your cart is empty
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: '#565959',
            marginBottom: '32px'
          }}>
            Looks like you haven't added anything to your cart yet
          </p>
          
          {/* Debug information - Remove in production */}
          <div style={{
            backgroundColor: '#F7F8F8',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #E5E7EB'
          }}>
            <h4 style={{ color: '#0F1111', marginBottom: '8px', fontSize: '14px' }}>Debug Info:</h4>
            <p style={{ color: '#565959', fontSize: '12px', textAlign: 'left' }}>
              Items in state: {items?.length || 0}<br/>
              Total items: {totalItems}<br/>
              Total amount: ₹{totalAmount?.toFixed(2) || '0.00'}<br/>
              Items array: {JSON.stringify(items, null, 2)}
            </p>
          </div>
          
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
            Shopping Cart ({totalItems} items)
          </h1>

          <button
            onClick={handleClearCart}
            style={{
              padding: '8px 16px',
              backgroundColor: '#B12704',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
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
            {items.map((item, index) => (
              <div
                key={item.id || item.name || index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  borderBottom: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {/* Product Image */}
                <Link to={`/product/${item.id}`} style={{ flexShrink: 0, marginRight: '20px' }}>
                  <img
                    src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                    alt={item.item_name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                </Link>

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <Link 
                    to={`/product/${item.id}`}
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
                    Brand: {item.brand || 'Unknown'} | Category: {item.category || 'General'}
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
                    ₹{item.standard_rate?.toLocaleString() || item.price?.toLocaleString() || 'N/A'}
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
                    onClick={() => handleUpdateQuantity(item.id || item.name, item.quantity - 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #D5D9D9',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
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
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleUpdateQuantity(item.id || item.name, item.quantity + 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #D5D9D9',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
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
                    ₹{((item.standard_rate || item.price || 0) * item.quantity).toLocaleString()}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id || item.name)}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#B12704',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <FaTrash size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
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
              Order Summary
            </h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '14px'
            }}>
              <span>Subtotal ({totalItems} items):</span>
              <span>₹{totalAmount.toLocaleString()}</span>
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
              <span>Tax:</span>
              <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
            </div>

            <hr style={{ margin: '15px 0', border: '1px solid #D5D9D9' }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              <span>Total:</span>
              <span style={{ color: '#B12704' }}>
                ₹{(totalAmount * 1.18).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#FFD814',
                border: '1px solid #FCD200',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#F7CA00'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#FFD814'}
            >
              Proceed to Checkout
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;






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
