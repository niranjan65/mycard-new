// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { Ionicons } from '@expo/vector-icons';
// import { removeFromWishlist, addToCart } from '../store/slices/cartSlice';
// import { COLORS } from '../constants/colors';

// const WishlistItem = ({ item, onRemove, onAddToCart }) => {
//   return (
//     <View style={{
//       backgroundColor: COLORS.white,
//       marginHorizontal: 16,
//       marginVertical: 8,
//       borderRadius: 8,
//       shadowColor: COLORS.black,
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.1,
//       shadowRadius: 2,
//       elevation: 2,
//       padding: 16
//     }}>
//       <View style={{ flexDirection: 'row' }}>
//         <Image 
//           source={{ uri: item.image || 'https://via.placeholder.com/80' }} 
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: 8
//           }}
//           resizeMode="cover"
//         />
        
//         <View style={{
//           flex: 1,
//           marginLeft: 16
//         }}>
//           <Text style={{
//             color: COLORS.textPrimary,
//             fontSize: 16,
//             fontWeight: '600',
//             marginBottom: 4
//           }} numberOfLines={2}>
//             {item.item_name}
//           </Text>
          
//           <Text style={{
//             color: COLORS.textPrimary,
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginBottom: 12
//           }}>
//             ₹{item.standard_rate}
//           </Text>
          
//           <View style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between'
//           }}>
//             <TouchableOpacity 
//               style={{
//                 backgroundColor: COLORS.primary,
//                 paddingHorizontal: 16,
//                 paddingVertical: 8,
//                 borderRadius: 6
//               }}
//               onPress={onAddToCart}
//             >
//               <Text style={{
//                 color: COLORS.white,
//                 fontSize: 14,
//                 fontWeight: '600'
//               }}>Add to Cart</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity onPress={onRemove}>
//               <Ionicons name="heart" size={24} color={COLORS.error} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const WishlistScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { wishlist } = useSelector(state => state.cart);

//   const handleRemoveFromWishlist = (itemName) => {
//     dispatch(removeFromWishlist(itemName));
//   };

//   const handleAddToCart = (item) => {
//     dispatch(addToCart(item));
//   };

//   const renderWishlistItem = ({ item }) => (
//     <WishlistItem
//       item={item}
//       onRemove={() => handleRemoveFromWishlist(item.name)}
//       onAddToCart={() => handleAddToCart(item)}
//     />
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       {wishlist.length === 0 ? (
//         <View style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingHorizontal: 32
//         }}>
//           <Ionicons name="heart-outline" size={80} color={COLORS.gray} />
//           <Text style={{
//             color: COLORS.textSecondary,
//             fontSize: 20,
//             fontWeight: '600',
//             marginBottom: 16,
//             textAlign: 'center'
//           }}>
//             Your wishlist is empty
//           </Text>
//           <Text style={{
//             color: COLORS.textLight,
//             textAlign: 'center',
//             marginBottom: 32
//           }}>
//             Save items you like to your wishlist. Review them anytime and easily move them to bag.
//           </Text>
//           <TouchableOpacity 
//             style={{
//               backgroundColor: COLORS.primary,
//               paddingHorizontal: 24,
//               paddingVertical: 12,
//               borderRadius: 8
//             }}
//             onPress={() => navigation.navigate('Home')}
//           >
//             <Text style={{
//               color: COLORS.white,
//               fontWeight: '600',
//               fontSize: 16
//             }}>Continue Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={wishlist}
//           renderItem={renderWishlistItem}
//           keyExtractor={(item) => item.name}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingVertical: 8 }}
//         />
//       )}
//     </View>
//   );
// };

// export default WishlistScreen;






import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { 
    wishlistItems, 
    removeFromWishlist, 
    addToCart, 
    isInCart 
  } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', color: '#0F1111', marginBottom: '20px' }}>
            Your Wishlist is Empty
          </h1>
          <p style={{ fontSize: '16px', color: '#565959', marginBottom: '30px' }}>
            Save items you love for later!
          </p>
          <Link 
            to="/products" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#FF9900',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Continue Shopping
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            My Wishlist ({wishlistItems.length} items)
          </h1>

          <div></div>
        </div>

        {/* Wishlist Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              {/* Remove from Wishlist */}
              <button
                onClick={() => removeFromWishlist(item.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B12704'
                }}
              >
                <FaTrash size={14} />
              </button>

              {/* Product Image */}
              <Link to={`/product/${item.id}`}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  marginBottom: '12px',
                  overflow: 'hidden',
                  borderRadius: '6px'
                }}>
                  <img
                    src={item.image}
                    alt={item.item_name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div>
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
                  {item.brand} | {item.category}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#B12704'
                  }}>
                    ₹{item.standard_rate.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span style={{
                      fontSize: '14px',
                      color: '#565959',
                      textDecoration: 'line-through'
                    }}>
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(item);
                    alert(`${item.item_name} added to cart!`);
                  }}
                  disabled={isInCart(item.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: isInCart(item.id) ? '#E8E8E8' : '#FFD814',
                    border: '1px solid #FCD200',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isInCart(item.id) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: isInCart(item.id) ? '#666666' : '#000000'
                  }}
                >
                  <FaShoppingCart size={14} />
                  {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
