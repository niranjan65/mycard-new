import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart, FaEye, FaShoppingBag } from 'react-icons/fa';
import { addToCart, removeFromWishlist } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector(state => state.cart);

  const handleRemoveFromWishlist = (itemName) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      dispatch(removeFromWishlist(itemName));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.item_name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  const handleViewProduct = (productName) => {
    navigate(`/product/${productName}`);
  };

  if (wishlist.length === 0) {
    return (
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <FaHeart size={80} color={COLORS.gray} style={{ marginBottom: '24px' }} />
        
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          marginBottom: '16px'
        }}>
          Your Wishlist is Empty
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: COLORS.textSecondary,
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Save items you love to your wishlist. Review them anytime and easily move them to your cart.
        </p>
        
        <Link 
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: COLORS.primary,
            color: COLORS.white,
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          <FaShoppingBag size={20} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          margin: '0'
        }}>
          My Wishlist
          <span style={{
            fontSize: '16px',
            color: COLORS.textSecondary,
            fontWeight: 'normal',
            marginLeft: '16px'
          }}>
            ({wishlist.length} items)
          </span>
        </h1>
        
        <Link
          to="/products"
          style={{
            color: COLORS.primary,
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Add More Items
        </Link>
      </div>

      {/* Wishlist Items Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {wishlist.map((item) => (
          <div
            key={item.name}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            {/* Product Image */}
            <div style={{
              position: 'relative',
              height: '200px',
              overflow: 'hidden',
              cursor: 'pointer'
            }} onClick={() => handleViewProduct(item.name)}>
              <img
                src={item.image || 'https://via.placeholder.com/300x200'}
                alt={item.item_name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
              
              {/* Remove from Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromWishlist(item.name);
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: COLORS.white,
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
                onMouseOver={(e) => e.target.style.backgroundColor = COLORS.lightGray}
                onMouseOut={(e) => e.target.style.backgroundColor = COLORS.white}
              >
                <FaHeart color={COLORS.error} size={18} />
              </button>

              {/* Quick View Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProduct(item.name);
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: COLORS.white,
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
                onMouseOver={(e) => e.target.style.backgroundColor = COLORS.lightGray}
                onMouseOut={(e) => e.target.style.backgroundColor = COLORS.white}
              >
                <FaEye color={COLORS.primary} size={18} />
              </button>
            </div>

            {/* Product Info */}
            <div style={{ padding: '20px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: COLORS.textPrimary,
                marginBottom: '8px',
                lineHeight: '1.4',
                cursor: 'pointer'
              }} onClick={() => handleViewProduct(item.name)}>
                {item.item_name}
              </h3>

              <p style={{
                color: COLORS.textSecondary,
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.description || 'High-quality product with excellent features and great value for money.'}
              </p>

              {/* Price */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: COLORS.primary
                }}>
                  ₹{Math.round(item.standard_rate * 0.8)}
                </span>
                <span style={{
                  fontSize: '18px',
                  color: COLORS.gray,
                  textDecoration: 'line-through'
                }}>
                  ₹{item.standard_rate}
                </span>
                <span style={{
                  backgroundColor: COLORS.success,
                  color: COLORS.white,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  20% OFF
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.secondary,
                    color: COLORS.white,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = COLORS.secondaryLight}
                  onMouseOut={(e) => e.target.style.backgroundColor = COLORS.secondary}
                >
                  <FaShoppingCart size={14} />
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(item)}
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = COLORS.primaryDark}
                  onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: COLORS.white,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          marginBottom: '12px'
        }}>
          Looking for something else?
        </h3>
        <p style={{
          color: COLORS.textSecondary,
          marginBottom: '20px'
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
            to="/products"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease'
            }}
          >
            Browse All Products
          </Link>
          <Link
            to="/products?category=electronics"
            style={{
              backgroundColor: 'transparent',
              color: COLORS.primary,
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '8px',
              border: `2px solid ${COLORS.primary}`,
              transition: 'all 0.3s ease'
            }}
          >
            Popular Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
