import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaBars, FaTimes, FaHeart, FaSpinner, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { erpnextApi } from '../api/erpnextApi';
import { COLORS } from '../constants/colors';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/store/slices/cartSlice';

// **🎯 Enhanced ProductCard Component with Wishlist & Cart functionality**
const ProductCard = ({ product, wishlistedItems, wishlistLoading, cartLoading, onWishlistToggle, onAddToCart }) => {

  const dispatch = useDispatch()

  console.log("In stock.....", product)
  if (!product) return null;

  const isWishlisted = wishlistedItems?.has(product.item_code) || false;
  const isLoadingWishlist = wishlistLoading?.[product.item_code] || false;
  const isLoadingCart = cartLoading?.[product.item_code] || false;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
      {/* Product Badge */}
      {product.badge && (
        <div className={`absolute top-2 left-2 z-10 text-white text-xs font-semibold px-2 py-1 rounded ${
          product.badge === 'BESTSELLER' ? 'bg-yellow-500' : 
          product.badge === 'WISHLIST' ? 'bg-pink-600' :
          product.badge === 'IN CART' ? 'bg-green-500' :
          product.badge === 'VARIANTS' ? 'bg-blue-500' : 'bg-blue-600'
        }`}>
          {product.badge}
        </div>
      )}

      {/* Functional Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onWishlistToggle) onWishlistToggle(product, e);
        }}
        disabled={isLoadingWishlist}
        className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          isLoadingWishlist ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
        } shadow-md opacity-0 group-hover:opacity-100`}
      >
        {isLoadingWishlist ? (
          <FaSpinner size={14} className="text-gray-400 animate-spin" />
        ) : (
          <FaHeart 
            size={14} 
            className={`transition-colors duration-200 ${
              isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
            }`} 
          />
        )}
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.route || product.id || product.name}`}>
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.item_name || product.web_item_name || 'Product'}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const productName = product.item_name || product.web_item_name || 'Product';
              e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
            }}
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link to={`/product/${product.route || product.id || product.name}`} className="no-underline">
          <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.item_name || product.web_item_name || 'Product Name'}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && product.brand !== 'Generic' && (
          <div className="text-xs text-blue-600 mb-2 font-medium">
            {product.brand}
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              <span>{product.rating}</span>
              <FaStar size={8} className="ml-1" />
            </div>
            {product.reviews && (
              <span className="text-xs text-gray-500">
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-gray-900">
              {product.formatted_price || `₹${(product.standard_rate || 0).toLocaleString('en-IN')}`}
            </span>
            {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
              <span className="text-sm text-gray-500 line-through">
                {product.formatted_mrp || `₹${product.originalPrice.toLocaleString('en-IN')}`}
              </span>
            )}
          </div>
          {product.discount && product.discount > 0 && (
            <div className="text-sm text-green-600 font-medium">
              {product.discount}% off
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className={`text-sm font-medium mb-3 ${
          product.inStock ? 'text-green-600' : 'text-red-600'
        }`}>
          {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </div>

        {/* Functional Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onAddToCart) onAddToCart(product, e);
          }}
          disabled={isLoadingCart || !product.inStock}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            product.inStock 
              ? (isLoadingCart 
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black border border-yellow-400 hover:border-yellow-500'
                )
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoadingCart ? (
            <FaSpinner size={14} className="animate-spin" />
          ) : (
            <FaShoppingCart size={14} />
          )}
          <span>
            {isLoadingCart ? 'Adding...' : (!product.inStock ? 'Out of Stock' : 'Add to Cart')}
          </span>
        </button>
      </div>
    </div>
  );
};

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
  const [showHomepageView, setShowHomepageView] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [newItems, setNewItems] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [activeHomeCategory, setActiveHomeCategory] = useState('');

  // Available brands from ERPNext
  const [availableBrands, setAvailableBrands] = useState([]);

  // Wishlist Management State
  const [wishlistedItems, setWishlistedItems] = useState(new Set());
  const [wishlistLoading, setWishlistLoading] = useState({});
  const [cartLoading, setCartLoading] = useState({});
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch()

  // Show notification helper
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Fetch Current Wishlist Status
  const fetchWishlistStatus = useCallback(async () => {
    try {
      const currentUser = Cookies.get('user_id');
      if (!currentUser) return;

      const response = await fetch(`/api/resource/Wishlist/${currentUser}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.items) {
          const wishlistedItemCodes = new Set(result.data.items.map(item => item.item_code));
          setWishlistedItems(wishlistedItemCodes);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching wishlist status:', error);
    }
  }, []);

  // Add/Remove from ERPNext Wishlist
  const handleWishlistToggle = useCallback(async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const isCurrentlyWishlisted = wishlistedItems.has(product.item_code);
    const action = isCurrentlyWishlisted ? 'remove' : 'add';

    try {
      setWishlistLoading(prev => ({ ...prev, [product.item_code]: true }));
      
      const endpoint = isCurrentlyWishlisted 
        ? "/api/method/webshop.webshop.doctype.wishlist.wishlist.remove_from_wishlist"
        : "/api/method/webshop.webshop.doctype.wishlist.wishlist.add_to_wishlist";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ item_code: product.item_code })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      // Update local wishlist state
      setWishlistedItems(prev => {
        const newSet = new Set(prev);
        if (isCurrentlyWishlisted) {
          newSet.delete(product.item_code);
        } else {
          newSet.add(product.item_code);
        }
        return newSet;
      });

      // Update products state
      setProducts(prev => prev.map(p => 
        p.item_code === product.item_code 
          ? { ...p, wished: !isCurrentlyWishlisted }
          : p
      ));

      if (isCurrentlyWishlisted) {
      dispatch(removeFromWishlist(product.item_code));
    } else {
      dispatch(addToWishlist(product));
    }

      showNotification(
        `💖 ${product.item_name} ${isCurrentlyWishlisted ? 'removed from' : 'added to'} wishlist!`, 
        'success'
      );

    } catch (error) {
      console.error(`❌ Error ${action}ing to/from wishlist:`, error);
      showNotification(`❌ Failed to ${action} item. Please try again.`, 'error');
    } finally {
      setWishlistLoading(prev => ({ ...prev, [product.item_code]: false }));
    }
  }, [wishlistedItems, showNotification, dispatch]);

// const handleWishlistToggle = useCallback(async (product, e) => {
//   if (e) {
//     e.preventDefault();
//     e.stopPropagation();
//   }

//   const isCurrentlyWishlisted = wishlistedItems.some(
//     (item) => item.item_code === product.item_code
//   );
//   const action = isCurrentlyWishlisted ? "remove" : "add";

//   try {
//     setWishlistLoading((prev) => ({ ...prev, [product.item_code]: true }));

//     const endpoint = isCurrentlyWishlisted
//       ? "/api/method/webshop.webshop.doctype.wishlist.wishlist.remove_from_wishlist"
//       : "/api/method/webshop.webshop.doctype.wishlist.wishlist.add_to_wishlist";

//     const response = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ item_code: product.item_code }),
//     });

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//     // ✅ Update Redux wishlist slice
//     if (isCurrentlyWishlisted) {
//       dispatch(removeFromWishlist(product.item_code));
//     } else {
//       dispatch(addToWishlist(product));
//     }

//     // ✅ Show user notification
//     showNotification(
//       `💖 ${product.item_name} ${
//         isCurrentlyWishlisted ? "removed from" : "added to"
//       } wishlist!`,
//       "success"
//     );
//   } catch (error) {
//     console.error(`❌ Error ${action}ing to/from wishlist:`, error);
//     showNotification(
//       `❌ Failed to ${action} item. Please try again.`,
//       "error"
//     );
//   } finally {
//     setWishlistLoading((prev) => ({ ...prev, [product.item_code]: false }));
//   }
// }, [wishlistedItems, showNotification, dispatch]);


  // Add to ERPNext Cart
  const handleAddToCart = useCallback(async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      setCartLoading(prev => ({ ...prev, [product.item_code]: true }));
      console.log(`🛒 Adding ${product.item_name} to ERPNext cart...`);

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
        showNotification(`✅ ${product.item_name} added to cart!`, 'success');
        
        // Update product state to show it's in cart
        setProducts(prev => prev.map(p => 
          p.item_code === product.item_code ? { ...p, in_cart: true } : p
        ));
        return true;
      } else {
        throw new Error("Failed to add to cart");
      }

    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      showNotification('❌ Failed to add to cart. Please try again.', 'error');
      return false;
    } finally {
      setCartLoading(prev => ({ ...prev, [product.item_code]: false }));
    }
  }, [showNotification]);

  // Updated ERPNext API Call Function
  const get_filtered_products_webshop = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    let allProducts = [];
    let start = 0;
    const pageLength = 50;
    let hasMoreItems = true;
    let pageCount = 1;

    try {
      setLoading(true);
      console.log("🔥 Starting to fetch ALL website items from ERPNext...");

      while (hasMoreItems) {
        const formdata = new FormData();
        const queryArgs = {
          field_filters: {},
          attribute_filters: {},
          item_group: selectedCategory ? selectedCategory : null,
          start: start,
          page_length: pageLength,
          from_filters: false
        };
        formdata.append("query_args", JSON.stringify(queryArgs));

        const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        });
        const result = await response.json();
        
        if (result.message && result.message.items && result.message.items.length > 0) {
          allProducts = allProducts.concat(result.message.items);
          
          if (result.message.items.length < pageLength) {
            hasMoreItems = false;
          } else {
            start += pageLength;
            pageCount++;
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } else {
          hasMoreItems = false;
        }

        if (pageCount > 200) {
          hasMoreItems = false;
        }
      }

      if (allProducts.length > 0) {
        const transformedProducts = allProducts.map(item => ({
          id: item.name || item.item_code,
          item_name: item.item_name || item.web_item_name,
          web_item_name: item.web_item_name,
          item_code: item.item_code,
          image: item.website_image ? `${window.location.origin}${item.website_image}` : 'https://via.placeholder.com/300x300?text=No+Image',
          standard_rate: item.price_list_rate || 0,
          originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
          discount: item.formatted_mrp && item.price_list_rate ? Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - item.price_list_rate) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
          formatted_price: item.formatted_price,
          formatted_mrp: item.formatted_mrp,
          rating: null,
          reviews: null,
          category: item.item_group || 'General',
          subcategory: item.item_group || 'General',
          brand: item.brand || 'Generic',
          inStock: item.in_stock,
          in_cart: item.in_cart,
          on_backorder: item.on_backorder,
          description: item.short_description || item.web_long_description || `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category`,
          route: item.route,
          has_variants: item.has_variants,
          variant_of: item.variant_of,
          website_warehouse: item.website_warehouse,
          wished: item.wished,
          ranking: item.ranking,
          original_erpnext_data: item,
          badge: item.wished ? 'WISHLIST' : (item.ranking > 0 ? 'BESTSELLER' : (item.has_variants ? 'VARIANTS' : (item.in_cart ? 'IN CART' : 'AVAILABLE')))
        }));
        
        setProducts(transformedProducts);
        
        const uniqueCategories = [...new Set(transformedProducts.map(p => p.category).filter(Boolean))];
        const categoriesWithItemGroups = uniqueCategories.map(categoryName => {
          const categoryProduct = transformedProducts.find(p => p.category === categoryName);
          return {
            name: categoryName,
            image: categoryProduct ? categoryProduct.image : 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(categoryName.substring(0, 2)),
            subcategories: [{
              name: categoryName,
              image: categoryProduct ? categoryProduct.image : 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(categoryName.substring(0, 2))
            }]
          };
        });
        
        setCategories(categoriesWithItemGroups);
        
        const uniqueBrands = [...new Set(transformedProducts.map(p => p.brand).filter(Boolean))].sort();
        setAvailableBrands(uniqueBrands);
      } else {
        setProducts([]);
        setCategories([]);
        setAvailableBrands([]);
      }
    } catch (error) {
      console.error('❌ Error fetching ERPNext website items:', error);
      setProducts([]);
      setCategories([]);
      setAvailableBrands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_filtered_products_webshop();
  }, [selectedCategory]);

  useEffect(() => {
    if (products.length > 0) {
      fetchWishlistStatus();
    }
  }, [products.length, fetchWishlistStatus]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveHomeCategory(categoryName);
    setShowHomepageView(false);
    setSidebarOpen(false);
    if (categoryName) {
      setSearchParams({ category: categoryName });
    } else {
      setSearchParams({});
      setShowHomepageView(true);
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const getFilteredProducts = (categoryFilter = '') => {
    const baseProducts = categoryFilter ? products.filter(p => p.category === categoryFilter) : products;
    
    return baseProducts.filter(product => {
      const matchesSearch = searchTerm === '' || 
        (product.item_name && product.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.web_item_name && product.web_item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.item_code && product.item_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.some(brand => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
      
      const matchesRating = selectedRating === 0 || (product.rating && parseFloat(product.rating) >= selectedRating);
      const matchesCondition = !newItems || product.badge === 'NEW LAUNCH';
      
      let matchesPrice = true;
      if (selectedPriceRange) {
        const price = product.standard_rate || 0;
        switch (selectedPriceRange) {
          case 'Under ₹1,000': matchesPrice = price < 1000; break;
          case '₹1,000 - ₹5,000': matchesPrice = price >= 1000 && price <= 5000; break;
          case '₹5,000 - ₹10,000': matchesPrice = price >= 5000 && price <= 10000; break;
          case '₹10,000 - ₹25,000': matchesPrice = price >= 10000 && price <= 25000; break;
          case 'Over ₹25,000': matchesPrice = price > 25000; break;
          default: matchesPrice = true;
        }
      }
      
      return matchesSearch && matchesBrand && matchesRating && matchesCondition && matchesPrice;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= numRating) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500 text-sm" />);
      }
    }
    return stars;
  };

  const AmazonSidebar = ({ isHomepage = false }) => (
    <div className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80 lg:sticky lg:top-5 lg:w-60 lg:z-auto' : 'hidden lg:block lg:sticky lg:top-5 lg:w-60'} 
      bg-white text-black p-4 text-sm leading-5 flex-shrink-0 overflow-y-auto
      lg:border-r lg:border-gray-200 lg:rounded-lg lg:shadow-lg font-sans lg:max-h-[calc(100vh-2.5rem)]`}>
      
      <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-600 hover:text-gray-900">
          <FaTimes size={16} />
        </button>
      </div>
      
      <div className="mb-6">
        <h4 className="text-base font-bold text-gray-900 mb-2 leading-6">Category ({categories.length} total)</h4>
        <div className="mb-2">
          <span className="flex items-center text-blue-600 text-sm font-bold">
            <FaChevronLeft className="text-xs mr-2" />
            {isHomepage ? 'Shop by Category' : 'All Products'}
          </span>
        </div>
        <div className="pl-4">
          <div className={`py-1 text-xs cursor-pointer leading-4 ${
              (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) 
                ? 'text-blue-600 font-semibold' : 'text-gray-600 font-normal'
            }`}
            onClick={() => {
              if (isHomepage) {
                setActiveHomeCategory('');
              } else {
                handleCategoryChange('');
                setShowHomepageView(true);
              }
            }}>
            All Products ({products.length})
          </div>
          
          {categories.slice(0, 12).map((category) => {
            const categoryCount = products.filter(p => p.category === category.name).length;
            return (
              <div key={category.name} 
                className={`py-1 text-xs cursor-pointer leading-4 ${
                  (isHomepage && activeHomeCategory === category.name) || 
                  (!isHomepage && selectedCategory === category.name) 
                    ? 'text-blue-600 font-semibold' : 'text-gray-600 font-normal'
                }`}
                onClick={() => {
                  if (isHomepage) {
                    setActiveHomeCategory(category.name);
                  } else {
                    handleCategoryChange(category.name);
                  }
                }}>
                {category.name} ({categoryCount})
              </div>
            );
          })}
        </div>
      </div>

      {availableBrands.length > 0 && (
        <div className="mb-6">
          <h4 className="text-base font-bold text-gray-900 mb-2 leading-6">Brands ({availableBrands.length} total)</h4>
          <div className="mb-2">
            <span className="flex items-center text-blue-600 text-sm font-bold">
              <FaChevronLeft className="text-xs mr-2" />
              ERPNext Brands
            </span>
          </div>
          <div className="pl-4">
            {availableBrands.slice(0, 10).map((brand) => {
              const brandCount = products.filter(p => p.brand === brand).length;
              return (
                <label key={brand} className="flex items-center cursor-pointer mb-1 leading-5">
                  <input type="checkbox" className="mr-2 scale-110 accent-yellow-500"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)} />
                  <span className={`text-sm ${selectedBrands.includes(brand) ? 'text-blue-600 font-semibold' : 'text-gray-900 font-normal'}`}>
                    {brand} ({brandCount})
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-base font-bold text-gray-900 mb-2 leading-6">Customer Reviews</h4>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center cursor-pointer mb-1 p-1 leading-5"
            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}>
            <div className="flex items-center">
              {renderStars(rating)}
              <span className={`ml-2 text-sm no-underline ${
                selectedRating === rating ? 'text-yellow-500 font-semibold' : 'text-blue-600 font-normal'
              }`}>& Up</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-base font-bold text-gray-900 mb-2 leading-6">Price</h4>
        {['Under ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹25,000', 'Over ₹25,000'].map((range) => (
          <div key={range} 
            className={`cursor-pointer py-1 text-sm leading-5 ${
              selectedPriceRange === range ? 'text-blue-600 font-semibold' : 'text-gray-900 font-normal'
            }`}
            onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}>
            {range}
          </div>
        ))}
      </div>
    </div>
  );

  const SmallProductCard = ({ product }) => {
    if (!product) return null;

    const isWishlisted = wishlistedItems.has(product.item_code);
    const isLoadingWishlist = wishlistLoading[product.item_code];

    return (
      <Link to={`/product/${product.route || product.id || product.name}`} className="no-underline">
        <div className="bg-white rounded-lg p-2 shadow-lg cursor-pointer transition-all duration-200 relative h-56 flex flex-col hover:transform hover:-translate-y-1 hover:shadow-xl">
          

          <button
            onClick={(e) => handleWishlistToggle(product, e)}
            disabled={isLoadingWishlist}
            className={`absolute top-1 right-1 z-20 p-1 rounded-full transition-all duration-200 ${
              isLoadingWishlist ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
            } shadow-md`}
            style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isLoadingWishlist ? (
              <FaSpinner size={12} className="text-gray-400 animate-spin" />
            ) : (
              <FaHeart size={14} className={`transition-colors duration-200 ${
                isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-300'
              }`} />
            )}
          </button>

          <div className="w-full h-24 mb-2 overflow-hidden rounded">
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.item_name || product.web_item_name || 'Product'}
              className="w-full h-full object-cover"
              onError={(e) => {
                const productName = product.item_name || product.web_item_name || 'Product';
                e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
              }}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-xs font-medium text-gray-900 mb-1 leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
              {product.item_name || product.web_item_name || 'Product Name'}
            </h3>

            {product.brand && product.brand !== 'Generic' && (
              <div className="text-xs text-blue-600 mb-1 font-medium">{product.brand}</div>
            )}

            {product.rating && (
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-green-600 text-white text-xs font-semibold px-1 py-0.5 rounded">
                  {product.rating} ★
                </span>
                {product.reviews && (
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                )}
              </div>
            )}

            <div className="mt-auto">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-semibold text-gray-900">
                  {product.formatted_price || `₹${product.standard_rate ? product.standard_rate.toLocaleString() : '0'}`}
                </span>
                {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
                  <span className="text-xs text-gray-600 line-through">
                    {product.formatted_mrp || `₹${product.originalPrice.toLocaleString()}`}
                  </span>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <div className="text-xs text-green-600 font-medium">{product.discount}% off</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // Enhanced List View Product Item Component
  const ListProductItem = ({ product }) => {
    const isWishlisted = wishlistedItems.has(product.item_code);
    const isLoadingWishlist = wishlistLoading[product.item_code];
    const isLoadingCart = cartLoading[product.item_code];

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start gap-6">
          
          {/* Product Image - Left Side */}
          <Link to={`/product/${product.route || product.id || product.name}`} className="flex-shrink-0">
            <div className="w-40 h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                alt={product.item_name || product.web_item_name || 'Product'}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const productName = product.item_name || product.web_item_name || 'Product';
                  e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
                }}
              />
            </div>
            
            {/* Product Badges */}
            {product.badge && (
              <div className={`inline-block mt-2 text-white text-xs font-semibold px-2 py-1 rounded ${
                product.badge === 'BESTSELLER' ? 'bg-yellow-500' : 
                product.badge === 'WISHLIST' ? 'bg-pink-600' :
                product.badge === 'IN CART' ? 'bg-green-500' :
                product.badge === 'VARIANTS' ? 'bg-blue-500' : 'bg-blue-600'
              }`}>
                {product.badge}
              </div>
            )}
          </Link>

          {/* Product Details - Center */}
          <div className="flex-1">
            <Link to={`/product/${product.route || product.id || product.name}`} className="no-underline">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {product.item_name || product.web_item_name || 'Product Name'}
              </h3>
            </Link>

            {/* Brand */}
            {product.brand && product.brand !== 'Generic' && (
              <div className="text-sm text-blue-600 mb-2 font-medium">
                Brand: {product.brand}
              </div>
            )}

            {/* Item Code */}
            <div className="text-sm text-gray-500 mb-2">
              Item Code: {product.item_code}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.rating} ★
                </div>
                {product.reviews && (
                  <span className="text-sm text-gray-600">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Category */}
            <div className="text-sm text-gray-500 mb-2">
              Category: {product.category}
            </div>

            {/* Stock Status */}
            <div className={`text-sm font-medium mb-3 ${
              product.inStock ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              {product.on_backorder && ' (On Backorder)'}
            </div>
          </div>

          {/* Price and Actions - Right Side */}
          <div className="flex-shrink-0 text-right">
            
            {/* Price Section */}
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {product.formatted_price || `₹${(product.standard_rate || 0).toLocaleString('en-IN')}`}
              </div>
              
              {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-sm text-gray-500 line-through">
                    {product.formatted_mrp || `₹${product.originalPrice.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {product.discount}% off
                  </span>
                </div>
              )}
              
              {product.discount > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  Save ₹{((product.originalPrice || 0) - (product.standard_rate || 0)).toLocaleString('en-IN')}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              
              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlistToggle(product, e)}
                disabled={isLoadingWishlist}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100' 
                    : 'bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                } ${isLoadingWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoadingWishlist ? (
                  <FaSpinner size={14} className="animate-spin" />
                ) : (
                  <FaHeart size={14} className={isWishlisted ? 'text-red-500' : ''} />
                )}
                <span className="text-sm font-medium">
                  {isLoadingWishlist ? 'Processing...' : (isWishlisted ? 'In Wishlist' : 'Add to Wishlist')}
                </span>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={isLoadingCart || !product.inStock}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  product.inStock 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-yellow-400 hover:border-yellow-500' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300'
                } ${isLoadingCart ? 'opacity-50' : ''}`}
              >
                {isLoadingCart ? (
                  <FaSpinner size={14} className="animate-spin" />
                ) : (
                  <FaShoppingCart size={14} />
                )}
                <span className="text-sm font-bold">
                  {isLoadingCart ? 'Adding...' : (!product.inStock ? 'Out of Stock' : 'Add to Cart')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationBar = () => {
    if (!notification) return null;
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
        position: 'fixed', top: '20px', right: '20px', backgroundColor: getColor(),
        color: 'white', padding: '12px 20px', borderRadius: '8px',
        display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', maxWidth: '400px'
      }}>
        {notification.message}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-lg text-gray-600">Loading ALL ERPNext website items...</div>
      </div>
    );
  }

  if (showHomepageView) {
    const homepageProducts = getFilteredProducts(activeHomeCategory).slice(0, displayLimit);

    return (
      <>
        <NotificationBar />
        <div className="bg-white min-h-screen">
          <div className="lg:hidden fixed top-4 left-4 z-40">
            <button onClick={() => setSidebarOpen(true)} className="bg-gray-900 text-white p-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors">
              <FaBars size={16} />
            </button>
          </div>

          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
          )}

          <div className="w-full">
            <div className="flex gap-6 p-5 items-start h-[40rem] overflow-scroll">
              <AmazonSidebar isHomepage={true} />

              <div className="flex-1 min-w-0 lg:pl-0 pl-16 overflow-auto">
                {categories.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-5">Shop by category</h2>
                    <div className="flex overflow-x-auto gap-5 pb-3 scrollbar-hide">
                      {categories.slice(0, 8).map((category, index) => (
                        <div key={index} onClick={() => setActiveHomeCategory(category.name)}
                          className="flex flex-col items-center min-w-max cursor-pointer text-center transition-transform duration-200 hover:scale-105">
                          <div className="w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden mb-2 shadow-lg">
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/150x150?text=${encodeURIComponent(category.name.substring(0, 2))}`;
                              }} />
                          </div>
                          <span className="text-xs text-gray-600 font-normal leading-tight max-w-20 break-words">
                            {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {categories.length > 0 && (
                  <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    <button onClick={() => setActiveHomeCategory('')}
                      className={`px-5 py-3 border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap ${
                        activeHomeCategory === '' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                      All Products ({products.length})
                    </button>
                    
                    {categories.map((cat) => {
                      const categoryCount = products.filter(p => p.category === cat.name).length;
                      return (
                        <button key={cat.name} onClick={() => setActiveHomeCategory(cat.name)}
                          className={`px-5 py-3 border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap ${
                            activeHomeCategory === cat.name ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                          {cat.name} ({categoryCount})
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mb-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-900 m-0">
                      {activeHomeCategory ? `${activeHomeCategory} Products (${homepageProducts.length})` : `All Website Items (${homepageProducts.length})`}
                    </h2>
                    <button onClick={() => setShowHomepageView(false)}
                      className="text-gray-900 no-underline text-sm font-semibold bg-transparent border-none cursor-pointer hover:text-blue-600">
                      View Detailed List →
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 p-4 bg-gray-100 rounded gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-900 font-semibold">Sort by:</span>
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                        className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-900 font-inherit">
                        <option value="name">Featured</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                        <option value="newest">Newest Arrivals</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-600">
                      Showing {homepageProducts.length} of {products.length} products
                      {(selectedBrands.length > 0 || selectedRating > 0 || newItems || selectedPriceRange) && ' (filtered)'}
                    </div>
                  </div>

                  {homepageProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {homepageProducts.map((product) => (
                        <SmallProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-15 px-5 bg-gray-100 rounded-lg">
                      <h3 className="text-gray-900 mb-3 text-xl">No website items found</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {activeHomeCategory ? 
                          `No items found in ${activeHomeCategory} category. Try selecting "All Products" or adjust your filters.` :
                          'Make sure you have website items configured in ERPNext with the webshop module enabled.'}
                      </p>
                      <button onClick={() => {
                          setSelectedBrands([]);
                          setSelectedRating(0);
                          setNewItems(false);
                          setSelectedPriceRange('');
                          setActiveHomeCategory('');
                        }} className="px-4 py-2 bg-gray-900 text-white border-none rounded cursor-pointer mt-3">
                        Show All Products
                      </button>
                    </div>
                  )}
                </div>

                {homepageProducts.length < products.length && (
                  <div className="text-center mt-10">
                    <button onClick={() => setDisplayLimit(prev => prev + 50)}
                      className="px-6 py-3 bg-yellow-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer mr-3">
                      Load More Products
                    </button>
                    <button onClick={() => setShowHomepageView(false)}
                      className="px-6 py-3 bg-gray-900 text-white border-none rounded-md text-sm font-semibold cursor-pointer">
                      View Detailed List
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const sortedProducts = getFilteredProducts().sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return (a.standard_rate || 0) - (b.standard_rate || 0);
      case 'price_high': return (b.standard_rate || 0) - (a.standard_rate || 0);
      case 'rating': return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
      case 'newest': return new Date(b.creation || 0) - new Date(a.creation || 0);
      case 'name':
      default: return (a.item_name || '').localeCompare(b.item_name || '');
    }
  });

  return (
    <>
      <NotificationBar />
      <div className="bg-white min-h-screen">
        <div className="lg:hidden fixed top-4 left-4 z-40">
          <button onClick={() => setSidebarOpen(true)} className="bg-gray-900 text-white p-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors">
            <FaBars size={16} />
          </button>
        </div>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
        )}

        <div className="w-full">
          <div className="flex gap-6 p-5 items-start h-[40rem] overflow-scroll">
            <AmazonSidebar isHomepage={false} />

            <div className="flex-1 min-w-0 lg:pl-0 pl-16 overflow-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-normal text-gray-900 mb-2">{selectedCategory || 'All Products'}</h1>
                <div className="text-sm text-gray-600">
                  Showing {sortedProducts.length} items 
                  {searchTerm && ` for "${searchTerm}"`}
                  {(selectedBrands.length > 0 || selectedRating > 0 || newItems || selectedPriceRange) && ' (filtered)'}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 p-4 bg-gray-100 rounded gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-sm text-gray-900 font-semibold">Sort by:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-900 font-inherit">
                    <option value="name">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => setViewMode('grid')}
                    className={`p-2 border border-gray-300 rounded cursor-pointer ${
                      viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-900'
                    }`}>
                    <FaThLarge size={12} />
                  </button>
                  <button onClick={() => setViewMode('list')}
                    className={`p-2 border border-gray-300 rounded cursor-pointer ${
                      viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-900'
                    }`}>
                    <FaList size={12} />
                  </button>
                </div>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="text-center py-15 px-5 bg-white rounded border border-gray-300">
                  <h3 className="text-2xl text-gray-900 mb-4">No website items found</h3>
                  <p className="text-gray-600 text-sm mb-4">Make sure you have website items configured in ERPNext or try adjusting your filters</p>
                  <button onClick={() => {
                      setSelectedBrands([]);
                      setSelectedRating(0);
                      setNewItems(false);
                      setSelectedPriceRange('');
                    }} className="px-6 py-3 bg-gray-900 text-white border-none rounded-md cursor-pointer">
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className={`${viewMode === 'list' ? 'space-y-4' : `grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}`}>
                  {sortedProducts.map((product) => (      
                    viewMode === 'list' ? (
                      <ListProductItem key={product.id} product={product} />
                    ) : (
                      <ProductCard 
                        key={product.id} 
                        product={product}
                        wishlistedItems={wishlistedItems}
                        wishlistLoading={wishlistLoading}
                        cartLoading={cartLoading}
                        onWishlistToggle={handleWishlistToggle}
                        onAddToCart={handleAddToCart}
                      />
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
// import React, { useEffect, useState, useCallback } from 'react';
// import { useLocation, useSearchParams, Link } from 'react-router-dom';
// import { FaList, FaThLarge, FaStar, FaRegStar, FaBars, FaTimes, FaHeart, FaSpinner, FaShoppingCart, FaChevronLeft } from 'react-icons/fa';
// import Cookies from 'js-cookie';

// // If you already have a wrapper use it; else use fetch directly as shown below
// // import { erpnextApi } from '../api/erpnextApi';

// const PAGE_SIZE = 20;

// const ProductCard = ({ product, wishlistedItems, wishlistLoading, cartLoading, onWishlistToggle, onAddToCart }) => {
//   if (!product) return null;

//   const isWishlisted = wishlistedItems?.has(product.item_code) || false;
//   const isLoadingWishlist = wishlistLoading?.[product.item_code] || false;
//   const isLoadingCart = cartLoading?.[product.item_code] || false;

//   return (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
//       <div className="relative group">
//         <Link to={`/product/${product.route || product.item_code}`}>
//           <img
//             src={product.website_image || '/api/method/frappe.utils.identicon.identicon?txt=' + product.item_code}
//             alt={product.web_item_name || product.item_name}
//             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//             onError={(e) => {
//               e.target.src = '/api/method/frappe.utils.identicon.identicon?txt=' + product.item_code;
//             }}
//           />
//         </Link>

//         <button
//           onClick={() => onWishlistToggle(product.item_code, isWishlisted)}
//           disabled={isLoadingWishlist}
//           className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
//         >
//           {isLoadingWishlist ? (
//             <FaSpinner className="animate-spin text-gray-400" size={16} />
//           ) : (
//             <FaHeart className={isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} size={16} />
//           )}
//         </button>

//         <div className="absolute bottom-2 left-2">
//           <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//             {product.in_stock ? 'In Stock' : 'Out of Stock'}
//           </span>
//         </div>
//       </div>

//       <div className="p-4">
//         <Link to={`/product/${product.route || product.item_code}`}>
//           <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
//             {product.web_item_name || product.item_name}
//           </h3>
//         </Link>

//         <div className="flex items-center mb-2">
//           <div className="flex text-yellow-400">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span key={star}>
//                 {star <= (product.average_rating || 0) ? <FaStar size={14} /> : <FaRegStar size={14} />}
//               </span>
//             ))}
//           </div>
//           <span className="text-sm text-gray-500 ml-2">({product.average_rating ? Number(product.average_rating).toFixed(1) : '0.0'})</span>
//         </div>

//         <div className="mb-3">
//           <span className="text-lg font-bold text-gray-900">
//             ₹{product.formatted_price || product.price_list_rate || '0.00'}
//           </span>
//           {product.discount_percentage > 0 && <span className="text-sm text-green-600 ml-2">({product.discount_percentage}% off)</span>}
//         </div>

//         <button
//           onClick={() => onAddToCart(product.item_code)}
//           disabled={!product.in_stock || isLoadingCart}
//           className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
//             product.in_stock && !isLoadingCart ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           {isLoadingCart ? (
//             <>
//               <FaSpinner className="animate-spin" size={16} />
//               Adding...
//             </>
//           ) : (
//             <>
//               <FaShoppingCart size={16} />
//               {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const ProductsPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');

//   // data
//   const [products, setProducts] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);

//   // filters
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [priceMax, setPriceMax] = useState(10000);
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

//   // pagination
//   const [currentStart, setCurrentStart] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   // loading
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);

//   // wishlist/cart
//   const [wishlistedItems, setWishlistedItems] = useState(new Set());
//   const [wishlistLoading, setWishlistLoading] = useState({});
//   const [cartLoading, setCartLoading] = useState({});

//   const fetchProducts = useCallback(async (loadMore = false) => {
//     if (loadMore) {
//       setLoadingMore(true);
//     } else {
//       setLoading(true);
//       setCurrentStart(0);
//     }
//     setError(null);

//     try {
//       const start = loadMore ? currentStart : 0;

//       const queryArgs = {
//         search: searchTerm || null,
//         field_filters: {
//           ...(selectedCategory && { item_group: selectedCategory }),
//           ...(selectedBrand && { brand: selectedBrand }),
//         },
//         attribute_filters: {},
//         start,
//         item_group: selectedCategory || null,
//         page_length: PAGE_SIZE,
//         from_filters: !loadMore
//       };

//       const res = await fetch('/api/method/webshop.webshop.api.get_product_filter_data', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ query_args: JSON.stringify(queryArgs) })
//       });

//       const json = await res.json();

//       if (!res.ok || !json.message) {
//         throw new Error(json._server_messages || 'Failed to fetch');
//       }

//       const data = json.message;
//       const incoming = Array.isArray(data.items) ? data.items : [];

//       if (loadMore) {
//         setProducts(prev => [...prev, ...incoming]);
//         setCurrentStart(prev => prev + PAGE_SIZE);
//       } else {
//         setProducts(incoming);
//         setCurrentStart(PAGE_SIZE);
//       }

//       setTotalCount(data.items_count || 0);

//       // prefer backend has_more; fallback to length check
//       const backendHasMore = typeof data.has_more === 'boolean' ? data.has_more : null;
//       const fallbackHasMore = incoming.length === PAGE_SIZE && (start + incoming.length) < (data.items_count || 0);
//       setHasMore(backendHasMore !== null ? backendHasMore : fallbackHasMore);
//     } catch (e) {
//       console.error('Fetch products error:', e);
//       if (!loadMore) setProducts([]);
//       setHasMore(false);
//       setError('Failed to load products.');
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, [searchTerm, selectedCategory, selectedBrand, currentStart]);

//   const handleLoadMore = () => {
//     if (!loadingMore && hasMore) {
//       fetchProducts(true);
//     }
//   };

//   // initial + filter changes
//   useEffect(() => {
//     fetchProducts(false);
//   }, [searchTerm, selectedCategory, selectedBrand]);

//   // wishlist toggle
//   const onWishlistToggle = async (itemCode, isCurrentlyWishlisted) => {
//     try {
//       setWishlistLoading(prev => ({ ...prev, [itemCode]: true }));
//       const method = isCurrentlyWishlisted
//         ? '/api/method/webshop.webshop.doctype.wishlist.wishlist.remove_from_wishlist'
//         : '/api/method/webshop.webshop.doctype.wishlist.wishlist.add_to_wishlist';

//       const res = await fetch(method, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ item_code: itemCode })
//       });

//       if (!res.ok) throw new Error('Wishlist update failed');

//       setWishlistedItems(prev => {
//         const s = new Set(prev);
//         if (isCurrentlyWishlisted) s.delete(itemCode);
//         else s.add(itemCode);
//         return s;
//       });
//     } catch (e) {
//       console.error('Wishlist error:', e);
//     } finally {
//       setWishlistLoading(prev => ({ ...prev, [itemCode]: false }));
//     }
//   };

//   // add to cart
//   const onAddToCart = async (itemCode) => {
//     try {
//       setCartLoading(prev => ({ ...prev, [itemCode]: true }));
//       const res = await fetch('/api/method/webshop.webshop.shopping_cart.cart.update_cart', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ item_code: itemCode, qty: 1 })
//       });

//       if (!res.ok) throw new Error('Add to cart failed');
//     } catch (e) {
//       console.error('Cart error:', e);
//     } finally {
//       setCartLoading(prev => ({ ...prev, [itemCode]: false }));
//     }
//   };

//   // UI helpers
//   const filteredProducts = products.filter(p => {
//     const price = parseFloat(p.price_list_rate) || 0;
//     const rating = parseFloat(p.average_rating) || 0;
//     return price <= priceMax && rating >= selectedRating;
//   });
//   // Add this right after the filteredProducts calculation
//   console.log('🔍 Debug Info:', {
//     productsLength: products.length,
//     filteredProductsLength: filteredProducts.length,
//     totalCount,
//     hasMore,
//     loading,
//     loadingMore,
//     currentStart
//   });


//   if (loading && products.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <FaSpinner className="animate-spin text-4xl text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between gap-4">
//             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
//               <FaBars size={20} />
//             </button>
//             <div className="flex-1 max-w-xl">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   const params = new URLSearchParams(searchParams);
//                   if (e.target.value) params.set('search', e.target.value);
//                   else params.delete('search');
//                   setSearchParams(params);
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
//                 <FaThLarge size={18} />
//               </button>
//               <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
//                 <FaList size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Active filters */}
//           {(selectedCategory || selectedBrand || searchTerm || selectedRating > 0) && (
//             <div className="mt-4 flex flex-wrap items-center gap-2">
//               <span className="text-sm text-gray-600">Active filters:</span>
//               {selectedCategory && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
//                   Category: {selectedCategory}
//                   <button onClick={() => setSelectedCategory('')} className="text-blue-600 hover:text-blue-800">
//                     <FaTimes size={12} />
//                   </button>
//                 </span>
//               )}
//               {selectedBrand && (
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
//                   Brand: {selectedBrand}
//                   <button onClick={() => setSelectedBrand('')} className="text-green-600 hover:text-green-800">
//                     <FaTimes size={12} />
//                   </button>
//                 </span>
//               )}
//               {searchTerm && (
//                 <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1">
//                   Search: "{searchTerm}"
//                   <button onClick={() => setSearchTerm('')} className="text-purple-600 hover:text-purple-800">
//                     <FaTimes size={12} />
//                   </button>
//                 </span>
//               )}
//               {selectedRating > 0 && (
//                 <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
//                   Rating: {selectedRating}+ ⭐
//                   <button onClick={() => setSelectedRating(0)} className="text-yellow-600 hover:text-yellow-800">
//                     <FaTimes size={12} />
//                   </button>
//                 </span>
//               )}
//               <button
//                 onClick={() => {
//                   setSelectedCategory('');
//                   setSelectedBrand('');
//                   setSelectedRating(0);
//                   setPriceMax(10000);
//                   setSearchTerm('');
//                   setSearchParams({});
//                 }}
//                 className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors"
//               >
//                 Clear All
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Body */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           {/* Sidebar */}
//           <div className={`${isSidebarOpen ? 'fixed inset-0 z-50 bg-black bg-opacity-50 lg:relative lg:bg-transparent' : 'hidden lg:block'} lg:w-64 flex-shrink-0`}>
//             <div className={`${isSidebarOpen ? 'w-80 h-full bg-white shadow-xl' : 'w-full'} p-6 bg-white rounded-lg shadow-sm border`}>
//               {isSidebarOpen && (
//                 <div className="flex justify-between items-center mb-4 lg:hidden">
//                   <h3 className="text-lg font-semibold">Filters</h3>
//                   <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:text-gray-700">
//                     <FaTimes size={20} />
//                   </button>
//                 </div>
//               )}

//               <h3 className="text-lg font-semibold mb-4 hidden lg:block">Filters</h3>

//               <div className="mb-6">
//                 <h4 className="font-medium mb-2">Category</h4>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     const params = new URLSearchParams(searchParams);
//                     if (e.target.value) params.set('category', e.target.value);
//                     else params.delete('category');
//                     setSearchParams(params);
//                   }}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Categories</option>
//                   {/* If you have categories fetched from API, map them here */}
//                 </select>
//               </div>

//               <div className="mb-6">
//                 <h4 className="font-medium mb-2">Brand</h4>
//                 <input
//                   type="text"
//                   value={selectedBrand}
//                   onChange={(e) => setSelectedBrand(e.target.value)}
//                   placeholder="Type brand"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="mb-6">
//                 <h4 className="font-medium mb-2">Max Price</h4>
//                 <input
//                   type="range"
//                   min="0"
//                   max="10000"
//                   step="100"
//                   value={priceMax}
//                   onChange={(e) => setPriceMax(parseInt(e.target.value))}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>₹0</span>
//                   <span>₹{priceMax}</span>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h4 className="font-medium mb-2">Minimum Rating</h4>
//                 <div className="space-y-2">
//                   {[4, 3, 2, 1].map(r => (
//                     <label key={r} className="flex items-center cursor-pointer">
//                       <input type="radio" name="rating" value={r} checked={selectedRating === r} onChange={() => setSelectedRating(r)} className="mr-2" />
//                       <div className="flex text-yellow-400">
//                         {[1, 2, 3, 4, 5].map(star => <span key={star}>{star <= r ? <FaStar size={14} /> : <FaRegStar size={14} />}</span>)}
//                       </div>
//                       <span className="ml-1 text-sm text-gray-600">& above</span>
//                     </label>
//                   ))}
//                   <label className="flex items-center cursor-pointer">
//                     <input type="radio" name="rating" value={0} checked={selectedRating === 0} onChange={() => setSelectedRating(0)} className="mr-2" />
//                     <span className="text-sm text-gray-600">All Ratings</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main */}
//           <div className="flex-1">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Products</h2>
//                 <p className="text-gray-600 mt-1">
//                   Showing {filteredProducts.length} of {totalCount} products
//                   {searchTerm && ` for "${searchTerm}"`}
//                 </p>
//               </div>
//             </div>

//             {/* Grid/List */}
//             <div className={viewMode === 'grid' ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid gap-4 grid-cols-1'}>
//               {filteredProducts.map(product => (
//                 <ProductCard
//                   key={product.item_code}
//                   product={product}
//                   wishlistedItems={wishlistedItems}
//                   wishlistLoading={wishlistLoading}
//                   cartLoading={cartLoading}
//                   onWishlistToggle={onWishlistToggle}
//                   onAddToCart={onAddToCart}
//                 />
//               ))}
//             </div>

//             {/* Load More */}
//             {hasMore && !loading && filteredProducts.length > 0 && (
//               <div className="flex justify-center mt-8 mb-8">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={loadingMore}
//                   className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {loadingMore ? (
//                     <>
//                       <FaSpinner className="animate-spin" />
//                       Loading More...
//                     </>
//                   ) : (
//                     <>
//                       Load More Products
//                       <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
//                         {products.length} of {totalCount}
//                       </span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}

//             {!hasMore && products.length > 0 && !loading && (
//               <div className="text-center py-8 text-gray-500">
//                 <p>You've seen all {totalCount} products!</p>
//               </div>
//             )}

//             {!loading && filteredProducts.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
//               </div>
//             )}

//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                 {error}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
