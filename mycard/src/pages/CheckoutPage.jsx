import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { erpnextApi } from '../api/erpnextApi';
import { clearCart } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const orderData = {
        customer: 'Guest Customer',
        delivery_date: new Date().toISOString().split('T')[0],
        items: items.map(item => ({
          item_code: item.name,
          qty: item.quantity,
          rate: item.standard_rate,
        })),
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        total_amount: totalAmount,
      };

      const response = await erpnextApi.createSalesOrder(orderData);
      
      if (response) {
        dispatch(clearCart());
        
        alert(`Order placed successfully! Your order ID is ${response.name}. Thank you for shopping with Trade Blo Me!`);
        navigate('/');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: '32px'
      }}>
        Checkout
      </h1>

      <form onSubmit={handlePlaceOrder}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '40px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Checkout Form */}
          <div>
            {/* Shipping Address */}
            <div style={{
              backgroundColor: COLORS.white,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: COLORS.textPrimary,
                marginBottom: '20px'
              }}>
                Shipping Address
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                  required
                  style={{
                    gridColumn: '1 / -1',
                    border: `1px solid ${COLORS.lightGray}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  required
                  style={{
                    gridColumn: '1 / -1',
                    border: `1px solid ${COLORS.lightGray}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                
                <input
                  type="text"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  required
                  style={{
                    border: `1px solid ${COLORS.lightGray}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                
                <input
                  type="text"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  required
                  style={{
                    border: `1px solid ${COLORS.lightGray}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                
                <input
                  type="text"
                  placeholder="Pincode"
                  value={shippingAddress.pincode}
                  onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                  required
                  style={{
                    border: `1px solid ${COLORS.lightGray}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                  required
                  style={{
                    border: `1px solid ${COLORS.lightGray}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div style={{
              backgroundColor: COLORS.white,
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: COLORS.textPrimary,
                marginBottom: '20px'
              }}>
                Payment Method
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '8px',
                  border: `2px solid ${paymentMethod === 'cod' ? COLORS.primary : COLORS.lightGray}`,
                  backgroundColor: paymentMethod === 'cod' ? COLORS.primaryLight + '10' : COLORS.white,
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '12px' }}
                  />
                  <FaMoneyBillWave size={24} color={COLORS.primary} style={{ marginRight: '12px' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Cash on Delivery</div>
                    <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>Pay when your order arrives</div>
                  </div>
                </label>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '8px',
                  border: `2px solid ${paymentMethod === 'online' ? COLORS.primary : COLORS.lightGray}`,
                  backgroundColor: paymentMethod === 'online' ? COLORS.primaryLight + '10' : COLORS.white,
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '12px' }}
                  />
                  <FaCreditCard size={24} color={COLORS.primary} style={{ marginRight: '12px' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Online Payment</div>
                    <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>Credit/Debit Card, UPI, Net Banking</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: COLORS.white,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: COLORS.textPrimary,
              marginBottom: '20px'
            }}>
              Order Summary
            </h3>
            
            {/* Order Items */}
            <div style={{ marginBottom: '20px' }}>
              {items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  marginBottom: '12px',
                  borderBottom: `1px solid ${COLORS.lightGray}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: COLORS.textPrimary,
                      marginBottom: '4px'
                    }}>
                      {item.item_name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: COLORS.textSecondary
                    }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{
                    fontWeight: 'bold',
                    color: COLORS.textPrimary
                  }}>
                    ₹{(item.quantity * item.standard_rate).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span>Shipping</span>
              <span style={{ color: COLORS.success }}>FREE</span>
            </div>
            
            <hr style={{
              border: 'none',
              borderTop: `2px solid ${COLORS.primary}`,
              margin: '16px 0'
            }} />
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '24px',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              <span>Total</span>
              <span style={{ color: COLORS.primary }}>₹{totalAmount.toFixed(2)}</span>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? COLORS.gray : COLORS.primary,
                color: COLORS.white,
                border: 'none',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
