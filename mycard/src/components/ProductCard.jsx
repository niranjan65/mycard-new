import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { addToCart, addToWishlist, removeFromWishlist } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';

const ProductCard = ({ product }) => {
  console.log("Products......", product)
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.cart);
  
  const isInWishlist = wishlist.some(item => item.name === product.name);

  const handleAddToCart = async () => {
    try {
      // setAddingToCart(true);
      console.log(`🛒 Adding 1 x ${product.item_name} to ERPNext cart...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: product.item_code,
          qty: 1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🛒 Add to Cart Response:", result);

      if (result.message) {
        alert(`✅ Added 1 x ${product.item_name} to cart!`);
        // Update product state to show it's in cart
        // setProduct(prev => ({ ...prev, in_cart: true }));
      } else {
        throw new Error("Failed to add to cart");
      }

    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('❌ Error adding item to cart. Please try again.');
    } finally {
      // setAddingToCart(false);
    }
  };

  // const handleAddToCart = (e) => {
  //   e.preventDefault();
  //   dispatch(addToCart(product));
  // };

  const handleWishlistToggle = async(e) => {
    e.preventDefault();
    // if (isInWishlist) {
    //   dispatch(removeFromWishlist(product.name));
    // } else {
    //   dispatch(addToWishlist(product));
    // }

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
  };

  return (
    <div  style={{
      textDecoration: 'none',
      color: 'inherit'
    }}>
      <div style={{
        backgroundColor: COLORS.white,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        height: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Product Image */}
        <div style={{
          position: 'relative',
          height: '220px',
          overflow: 'hidden'
        }}>
          <img 
            src={product.image || 'https://via.placeholder.com/300x220'} 
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
          
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistToggle}
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
          >
            {isInWishlist ? (
              <FaHeart color={COLORS.error} size={18} />
            ) : (
              <FaRegHeart color={COLORS.gray} size={18} />
            )}
          </button>

          
        </div>
        
        {/* Product Info */}
        <div style={{
          padding: '16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.textPrimary,
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.item_name}
            </h3>
            
            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: COLORS.success,
                padding: '2px 6px',
                borderRadius: '4px',
                marginRight: '8px'
              }}>
                <FaStar color={COLORS.white} size={12} />
                <span style={{
                  color: COLORS.white,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginLeft: '4px'
                }}>4.2</span>
              </div>
              <span style={{
                color: COLORS.gray,
                fontSize: '12px'
              }}>(150 reviews)</span>
            </div>
            
            {/* Price */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: COLORS.textPrimary
              }}>₹{product.standard_rate}</span>
              
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            style={{
              width: '100%',
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = COLORS.primaryDark}
            onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
