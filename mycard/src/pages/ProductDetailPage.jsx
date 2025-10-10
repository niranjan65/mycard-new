import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaArrowLeft, FaHeart, FaShare, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { COLORS } from '../constants/colors';
import Cookies from 'js-cookie';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  // **🎯 Fetch Single Product from ERPNext**
  const fetchProductDetails = async () => {
    try {
      console.log("🔥 Fetching product details for ID:", id);
      setLoading(true);

      // Try to get product directly by item_code first
      let response = await fetch(`/api/resource/Website Item/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          console.log("✅ Found product via Website Item:", result.data);
          setProduct(transformERPNextProduct(result.data));
          return;
        }
      }

      // If not found, try to get via Item doctype
      response = await fetch(`/api/resource/Item/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          console.log("✅ Found product via Item:", result.data);
          setProduct(transformERPNextProduct(result.data));
          return;
        }
      }

      // If still not found, search in all products
      const searchResponse = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          query_args: {
            field_filters: {},
            attribute_filters: {},
            item_group: null,
            start: null,
            from_filters: false
          }
        })
      });

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        if (searchResult.message && searchResult.message.items) {
          const foundProduct = searchResult.message.items.find(item => 
            item.item_code === id || 
            item.name === id || 
            item.route === id ||
            item.web_item_name === id ||
            item.item_name === id
          );

          if (foundProduct) {
            console.log("✅ Found product via search:", foundProduct);
            setProduct(transformERPNextProduct(foundProduct));
            return;
          }
        }
      }

      console.log("❌ Product not found for ID:", id);
      setProduct(null);

    } catch (error) {
      console.error('❌ Error fetching product details:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // **🎯 Transform ERPNext Product Data**
  const transformERPNextProduct = (item) => {
    return {
      // IDs and Names
      id: item.name || item.item_code,
      item_name: item.item_name || item.web_item_name,
      web_item_name: item.web_item_name,
      item_code: item.item_code,
      
      // Image handling
      image: item.website_image ? 
             `${window.location.origin}${item.website_image}` : 
             item.image ? `${window.location.origin}${item.image}` :
             'https://via.placeholder.com/500x500?text=No+Image',
      
      // Real pricing from ERPNext
      standard_rate: item.price_list_rate || item.standard_rate || 0,
      originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
      discount: item.formatted_mrp && (item.price_list_rate || item.standard_rate) ? 
               Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - (item.price_list_rate || item.standard_rate)) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
      formatted_price: item.formatted_price,
      formatted_mrp: item.formatted_mrp,
      
      // Categories and details
      category: item.item_group || 'General',
      brand: item.brand || 'Generic',
      
      // Stock and cart status
      inStock: item.in_stock !== false,
      in_cart: item.in_cart,
      on_backorder: item.on_backorder,
      
      // Description
      description: item.short_description || 
                  item.web_long_description || 
                  item.description ||
                  `Premium ${item.item_name || item.web_item_name} from ${item.item_group || 'our'} collection. High-quality product with excellent features and reliable performance.`,
      
      // ERPNext specific fields
      route: item.route,
      has_variants: item.has_variants,
      variant_of: item.variant_of,
      website_warehouse: item.website_warehouse,
      wished: item.wished,
      ranking: item.ranking,
      
      // Additional product details
      specifications: {
        'Item Code': item.item_code,
        'Brand': item.brand || 'Generic',
        'Category': item.item_group || 'General',
        'Stock Status': (item.in_stock !== false) ? 'In Stock' : 'Limited Stock',
        'Variants': item.has_variants ? 'Available' : 'Single Product',
        'Warehouse': item.website_warehouse || 'Default'
      }
    };
  };

  // **🎯 Add to ERPNext Cart**
  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      console.log(`🛒 Adding ${quantity} x ${product.item_name} to ERPNext cart...`);

      const response = await fetch("/api/method/webshop.webshop.shopping_cart.cart.update_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: product.item_code,
          qty: quantity
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🛒 Add to Cart Response:", result);

      if (result.message) {
        alert(`✅ Added ${quantity} x ${product.item_name} to cart!`);
        // Update product state to show it's in cart
        setProduct(prev => ({ ...prev, in_cart: true }));
      } else {
        throw new Error("Failed to add to cart");
      }

    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('❌ Error adding item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  // **🎯 Add to ERPNext Wishlist**
  const handleAddToWishlist = async () => {
    try {
      setAddingToWishlist(true);
      console.log(`💖 Adding ${product.item_name} to ERPNext wishlist...`);

      const response = await fetch("/api/method/webshop.webshop.doctype.wishlist.wishlist.add_to_wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          item_code: product.item_code
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("💖 Add to Wishlist Response:", result);

      alert(`💖 Added ${product.item_name} to wishlist!`);
      // Update product state to show it's in wishlist
      setProduct(prev => ({ ...prev, wished: true }));

    } catch (error) {
      console.error('❌ Error adding to wishlist:', error);
      alert('❌ Error adding to wishlist. Please try again.');
    } finally {
      setAddingToWishlist(false);
    }
  };

  // **🎯 Buy Now Function**
  const handleBuyNow = async () => {
    try {
      // Add to cart first
      await handleAddToCart();
      // Then navigate to cart
      setTimeout(() => {
        navigate('/cart');
      }, 1000);
    } catch (error) {
      console.error('Error during buy now:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
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
        <FaSpinner 
          size={40} 
          color="#FF9900" 
          style={{ 
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }} 
        />
        Loading product details from ERPNext...
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
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
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
                  {product.formatted_price || `₹${product.standard_rate?.toLocaleString('en-IN') || '0'}`}
                </span>
                {product.originalPrice && product.originalPrice > product.standard_rate && (
                  <span style={{
                    fontSize: '14px',
                    color: '#565959',
                    textDecoration: 'line-through'
                  }}>
                    {product.formatted_mrp || `₹${product.originalPrice?.toLocaleString('en-IN')}`}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <div style={{
                  fontSize: '14px',
                  color: '#00A652',
                  fontWeight: '600'
                }}>
                  Save {product.discount}% {product.originalPrice && `(₹${(product.originalPrice - product.standard_rate).toLocaleString('en-IN')})`}
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
            <div style={{ marginBottom: '20px' }}>
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
            </div>

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

            {/* Quantity and Action Buttons */}
            {product.inStock ? (
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

                {/* Main Action Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <button
                    onClick={handleAddToWishlist}
                    disabled={addingToWishlist || product.wished}
                    style={{
                      padding: '12px',
                      backgroundColor: product.wished ? '#E91E63' : '#FFFFFF',
                      border: `2px solid ${product.wished ? '#E91E63' : '#D5D9D9'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: product.wished ? '#FFFFFF' : '#0F1111',
                      cursor: (addingToWishlist || product.wished) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      opacity: addingToWishlist ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!product.wished && !addingToWishlist) {
                        e.target.style.backgroundColor = '#FEF2F2';
                        e.target.style.borderColor = '#E91E63';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!product.wished && !addingToWishlist) {
                        e.target.style.backgroundColor = '#FFFFFF';
                        e.target.style.borderColor = '#D5D9D9';
                      }
                    }}
                  >
                    {addingToWishlist ? (
                      <FaSpinner style={{ animation: 'spin 1s linear infinite' }} size={16} />
                    ) : (
                      <FaHeart size={16} />
                    )}
                    {product.wished ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    style={{
                      padding: '12px',
                      backgroundColor: addingToCart ? '#F0F0F0' : '#FFD814',
                      border: `1px solid ${addingToCart ? '#D0D0D0' : '#FCD200'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: addingToCart ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      opacity: addingToCart ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!addingToCart) e.target.style.backgroundColor = '#F7CA00';
                    }}
                    onMouseOut={(e) => {
                      if (!addingToCart) e.target.style.backgroundColor = '#FFD814';
                    }}
                  >
                    {addingToCart ? (
                      <FaSpinner style={{ animation: 'spin 1s linear infinite' }} size={16} />
                    ) : (
                      <FaShoppingCart size={16} />
                    )}
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>

                {/* Buy Now Button */}
                {/* <button
                  onClick={handleBuyNow}
                  disabled={addingToCart}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#FF9900',
                    border: '1px solid #FF9900',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    cursor: addingToCart ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s ease',
                    opacity: addingToCart ? 0.7 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!addingToCart) e.target.style.backgroundColor = '#E88B00';
                  }}
                  onMouseOut={(e) => {
                    if (!addingToCart) e.target.style.backgroundColor = '#FF9900';
                  }}
                >
                  Buy Now
                </button> */}

                {/* Share Button */}
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.item_name,
                        text: product.description,
                        url: window.location.href
                      });
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Product link copied to clipboard!');
                      });
                    }
                  }}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#007185',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <FaShare size={14} />
                  Share Product
                </button>
              </div>
            ) : (
              /* Out of Stock Message */
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

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;

//////////////////////////////////////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaStar, FaRegStar, FaArrowLeft, FaHeart, FaShare, FaShoppingCart } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   // **🎯 Your ERPNext API Call Function**
//   const get_filtered_products_webshop = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//     const formdata = new FormData();
//     formdata.append("query_args", `{"field_filters":{},"attribute_filters":{},"item_group":null,"start":null,"from_filters":false}`);

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: formdata,
//       redirect: "follow"
//     };

//     try {
//       console.log("🔥 Fetching product details from ERPNext...");
      
//       const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions);
//       const result = await response.json();
      
//       if (result.message && result.message.items && result.message.items.length > 0) {
//         console.log("🔥 ERPNext Products:", result.message.items);
        
//         // Transform ERPNext data
//         const transformedProducts = result.message.items.map(item => ({
//           // IDs and Names
//           id: item.name || item.item_code,
//           item_name: item.item_name || item.web_item_name,
//           web_item_name: item.web_item_name,
//           item_code: item.item_code,
          
//           // Image handling
//           image: item.website_image ? 
//                  `${window.location.origin}${item.website_image}` : 
//                  'https://via.placeholder.com/500x500?text=No+Image',
          
//           // Real pricing from ERPNext
//           standard_rate: item.price_list_rate || 0,
//           originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
//           discount: item.formatted_mrp && item.price_list_rate ? 
//                    Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - item.price_list_rate) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
//           formatted_price: item.formatted_price,
//           formatted_mrp: item.formatted_mrp,
          
//           // Categories and details
//           category: item.item_group || 'General',
//           brand: item.brand || 'Generic',
          
//           // Stock and cart status
//           inStock: item.in_stock,
//           in_cart: item.in_cart,
//           on_backorder: item.on_backorder,
          
//           // Description
//           description: item.short_description || 
//                       item.web_long_description || 
//                       `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category. High-quality product with excellent features and reliable performance.`,
          
//           // ERPNext specific fields
//           route: item.route,
//           has_variants: item.has_variants,
//           variant_of: item.variant_of,
//           website_warehouse: item.website_warehouse,
//           wished: item.wished,
//           ranking: item.ranking,
          
//           // Additional product details
//           features: [
//             'High-quality materials and construction',
//             'Professional grade performance', 
//             'Reliable and durable design',
//             'Excellent customer support',
//             'Fast delivery available',
//             'Easy returns and exchanges',
//             item.has_variants ? 'Multiple variants available' : 'Single variant product',
//             item.in_stock ? 'Currently in stock' : 'Limited availability'
//           ].filter(Boolean),
          
//           specifications: {
//             'Item Code': item.item_code,
//             'Brand': item.brand || 'Generic',
//             'Category': item.item_group || 'General',
//             'Stock Status': item.in_stock ? 'In Stock' : 'Limited Stock',
//             'Variants': item.has_variants ? 'Available' : 'Single Product',
//             'Warehouse': item.website_warehouse || 'Default',
//             'Route': item.route
//           }
//         }));
        
//         // Find product by ID, route, or name
//         const foundProduct = transformedProducts.find(p => 
//           p.id === id || 
//           p.route === id || 
//           p.item_code === id ||
//           p.name === id
//         );
        
//         if (foundProduct) {
//           console.log("✅ Product found:", foundProduct);
//           setProduct(foundProduct);
//         } else {
//           console.log("❌ Product not found for ID:", id);
//           setProduct(null);
//         }
        
//       } else {
//         console.log("❌ No products found in API response");
//         setProduct(null);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching product details:', error);
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Loading product details for ID:", id);
//     get_filtered_products_webshop();
//   }, [id]);

//   // **🎯 Add to Cart Function**
//   const handleAddToCart = async () => {
//     try {
//       // You can implement actual cart API here
//       console.log(`Adding ${quantity} x ${product.item_name} to cart`);
//       alert(`Added ${quantity} x ${product.item_name} to cart!`);
      
//       // Example cart API call (implement based on your backend)
//       // const response = await fetch('/api/cart/add', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({
//       //     item_code: product.item_code,
//       //     quantity: quantity
//       //   })
//       // });
      
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Error adding item to cart. Please try again.');
//     }
//   };

//   // **🎯 Buy Now Function**
//   const handleBuyNow = () => {
//     console.log(`Buying ${quantity} x ${product.item_name}`);
//     // Navigate to checkout or implement buy now logic
//     alert(`Proceeding to buy ${quantity} x ${product.item_name}!`);
//     // navigate('/checkout', { state: { product, quantity } });
//   };

//   // **🎯 Render Stars Function**
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= Math.floor(rating)) {
//         stars.push(<FaStar key={i} size={16} color="#FF9900" />);
//       } else {
//         stars.push(<FaRegStar key={i} size={16} color="#FF9900" />);
//       }
//     }
//     return stars;
//   };

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
//         <p>The product you're looking for doesn't exist or may have been removed.</p>
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
//               onError={(e) => {
//                 e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.item_name.substring(0, 10))}`;
//               }}
//             />
            
//             {/* Product Badge */}
//             {(product.wished || product.has_variants || product.in_cart) && (
//               <div style={{
//                 display: 'flex',
//                 gap: '8px',
//                 justifyContent: 'center',
//                 marginTop: '12px'
//               }}>
//                 {product.wished && (
//                   <span style={{
//                     backgroundColor: '#E91E63',
//                     color: '#FFFFFF',
//                     fontSize: '12px',
//                     fontWeight: '600',
//                     padding: '4px 8px',
//                     borderRadius: '4px'
//                   }}>
//                     WISHLIST
//                   </span>
//                 )}
//                 {product.has_variants && (
//                   <span style={{
//                     backgroundColor: '#2196F3',
//                     color: '#FFFFFF',
//                     fontSize: '12px',
//                     fontWeight: '600',
//                     padding: '4px 8px',
//                     borderRadius: '4px'
//                   }}>
//                     VARIANTS
//                   </span>
//                 )}
//                 {product.in_cart && (
//                   <span style={{
//                     backgroundColor: '#4CAF50',
//                     color: '#FFFFFF',
//                     fontSize: '12px',
//                     fontWeight: '600',
//                     padding: '4px 8px',
//                     borderRadius: '4px'
//                   }}>
//                     IN CART
//                   </span>
//                 )}
//               </div>
//             )}
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

//             {/* Item Code */}
//             <div style={{
//               fontSize: '14px',
//               color: '#565959',
//               marginBottom: '16px'
//             }}>
//               Item Code: {product.item_code}
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
//                   {product.formatted_price || `₹${product.standard_rate.toLocaleString()}`}
//                 </span>
//                 {product.originalPrice && product.originalPrice > product.standard_rate && (
//                   <span style={{
//                     fontSize: '14px',
//                     color: '#565959',
//                     textDecoration: 'line-through'
//                   }}>
//                     {product.formatted_mrp || `₹${product.originalPrice.toLocaleString()}`}
//                   </span>
//                 )}
//               </div>
//               {product.discount > 0 && (
//                 <div style={{
//                   fontSize: '14px',
//                   color: '#00A652',
//                   fontWeight: '600'
//                 }}>
//                   Save {product.discount}% {product.originalPrice && `(₹${(product.originalPrice - product.standard_rate).toLocaleString()})`}
//                 </div>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div style={{
//               fontSize: '18px',
//               color: product.inStock ? '#00A652' : '#B12704',
//               fontWeight: '600',
//               marginBottom: '20px'
//             }}>
//               {product.inStock ? 'In Stock' : product.on_backorder ? 'On Backorder' : 'Out of Stock'}
//             </div>

//             {/* Description */}
//             {/* <div style={{ marginBottom: '20px' }}>
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
//             </div> */}

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
//                     onChange={(e) => setQuantity(parseInt(e.target.value))}
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
//                     onClick={handleAddToCart}
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
//                       gap: '8px',
//                       transition: 'background-color 0.2s ease'
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#F7CA00'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#FFD814'}
//                   >
//                     <FaShoppingCart size={16} />
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={handleBuyNow}
//                     style={{
//                       flex: 1,
//                       padding: '12px',
//                       backgroundColor: '#FF9900',
//                       border: '1px solid #FF9900',
//                       borderRadius: '20px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       color: '#FFFFFF',
//                       cursor: 'pointer',
//                       transition: 'background-color 0.2s ease'
//                     }}
//                     onMouseOver={(e) => e.target.style.backgroundColor = '#E88B00'}
//                     onMouseOut={(e) => e.target.style.backgroundColor = '#FF9900'}
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
//                   <button 
//                     onClick={() => alert('Added to wishlist!')}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '6px',
//                       padding: '8px 16px',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       color: '#007185',
//                       cursor: 'pointer',
//                       fontSize: '14px'
//                     }}
//                   >
//                     <FaHeart size={14} />
//                     Add to Wishlist
//                   </button>
//                   <button 
//                     onClick={() => {
//                       navigator.share ? 
//                         navigator.share({
//                           title: product.item_name,
//                           text: product.description,
//                           url: window.location.href
//                         }) : 
//                         alert('Share feature not supported on this browser')
//                     }}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '6px',
//                       padding: '8px 16px',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       color: '#007185',
//                       cursor: 'pointer',
//                       fontSize: '14px'
//                     }}
//                   >
//                     <FaShare size={14} />
//                     Share
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Out of Stock Message */}
//             {!product.inStock && (
//               <div style={{
//                 border: '1px solid #D5D9D9',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 backgroundColor: '#F7F8F8',
//                 textAlign: 'center'
//               }}>
//                 <h3 style={{ color: '#B12704', marginBottom: '8px' }}>
//                   Currently Unavailable
//                 </h3>
//                 <p style={{ color: '#565959', fontSize: '14px' }}>
//                   This item is currently out of stock. Please check back later or contact us for availability.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

