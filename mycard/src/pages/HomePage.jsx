import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { erpnextApi } from '../api/erpnextApi';
import { COLORS } from '../constants/colors';

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
  const [showHomepageView, setShowHomepageView] = useState(true); // Always show homepage first
  const [displayLimit, setDisplayLimit] = useState(50); // Show 50 products initially

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [newItems, setNewItems] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [activeHomeCategory, setActiveHomeCategory] = useState(''); // Empty = show all products

  // Available brands (populated from API data)
  const [availableBrands, setAvailableBrands] = useState([]);

  // **🎯 Updated ERPNext API Call Function - Fetch ALL Website Items with Pagination**
  const get_filtered_products_webshop = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    let allProducts = [];
    let start = 0;
    const pageLength = 50; // Items per page
    let hasMoreItems = true;
    let pageCount = 1;

    try {
      setLoading(true);
      console.log("🔥 Starting to fetch ALL website items from ERPNext...");

      while (hasMoreItems) {
        console.log(`📄 Fetching page ${pageCount} (start: ${start}, limit: ${pageLength})...`);
        
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

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };

        const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions);
        const result = await response.json();
        
        console.log(`📋 Page ${pageCount} API Response:`, result);
        
        if (result.message && result.message.items && result.message.items.length > 0) {
          console.log(`✅ Page ${pageCount}: Got ${result.message.items.length} items`);
          
          allProducts = allProducts.concat(result.message.items);
          
          if (result.message.items.length < pageLength) {
            console.log(`🏁 Reached end of data. Page ${pageCount} had ${result.message.items.length} items (less than ${pageLength})`);
            hasMoreItems = false;
          } else {
            start += pageLength;
            pageCount++;
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
        } else {
          console.log(`❌ Page ${pageCount}: No items found or empty response`);
          hasMoreItems = false;
        }

        if (pageCount > 200) {
          console.log("⚠️ Safety limit reached (200 pages), stopping pagination");
          hasMoreItems = false;
        }
      }

      console.log(`🎉 PAGINATION COMPLETE! Total items fetched: ${allProducts.length} from ${pageCount - 1} pages`);

      if (allProducts.length > 0) {
        console.log("🔥 Sample of raw ERPNext items:", allProducts.slice(0, 2));
        
        const transformedProducts = allProducts.map(item => ({
          id: item.name || item.item_code,
          item_name: item.item_name || item.web_item_name,
          web_item_name: item.web_item_name,
          item_code: item.item_code,
          
          image: item.website_image ? 
                 `${window.location.origin}${item.website_image}` : 
                 'https://via.placeholder.com/300x300?text=No+Image',
          
          standard_rate: item.price_list_rate || 0,
          originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
          discount: item.formatted_mrp && item.price_list_rate ? 
                   Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - item.price_list_rate) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
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
          
          description: item.short_description || 
                      item.web_long_description || 
                      `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category`,
          
          route: item.route,
          has_variants: item.has_variants,
          variant_of: item.variant_of,
          website_warehouse: item.website_warehouse,
          wished: item.wished,
          ranking: item.ranking,
          
          original_erpnext_data: item,
          
          badge: item.wished ? 'WISHLIST' : 
                (item.ranking > 0 ? 'BESTSELLER' : 
                (item.has_variants ? 'VARIANTS' : 
                (item.in_cart ? 'IN CART' : 'AVAILABLE')))
        }));
        
        console.log("🔥 Total Transformed Products:", transformedProducts.length);
        
        setProducts(transformedProducts);
        
        const uniqueCategories = [...new Set(transformedProducts.map(p => p.category))];
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
        
        console.log("🔥 ALL Categories extracted:", categoriesWithItemGroups.length, "categories");
        setCategories(categoriesWithItemGroups);
        
        const uniqueBrands = [...new Set(transformedProducts.map(p => p.brand).filter(Boolean))];
        setAvailableBrands(uniqueBrands);
        console.log("🔥 ALL Brands extracted:", uniqueBrands.length, "brands");
        
        console.log("✅ FINAL SUCCESS: Loaded", transformedProducts.length, "total website items from ERPNext");
        
      } else {
        console.log("❌ No website items found in ANY pages");
        setProducts([]);
        setCategories([]);
      }
    } catch (error) {
      console.error('❌ Error fetching ALL ERPNext website items:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Loading ALL ERPNext website items...");
    get_filtered_products_webshop();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveHomeCategory(categoryName);
    setShowHomepageView(false);
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

  // **🎯 Updated getFilteredProducts - Show ALL products by default**
  const getFilteredProducts = (categoryFilter = '') => {
    // If no categoryFilter specified, show ALL products
    const baseProducts = categoryFilter ? 
      products.filter(p => p.category === categoryFilter) : 
      products; // Show ALL products when no filter
    
    return baseProducts.filter(product => {
      const matchesSearch = searchTerm === '' || 
        (product.item_name && product.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.web_item_name && product.web_item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.item_code && product.item_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.some(brand => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
      
      const matchesPrime = !primeOnly || product.badge === 'BESTSELLER';
      const matchesDelivery = !fastDelivery || product.inStock;
      const matchesRating = selectedRating === 0 || (product.rating && parseFloat(product.rating) >= selectedRating);
      const matchesCondition = !newItems || product.badge === 'NEW LAUNCH';
      
      let matchesPrice = true;
      if (selectedPriceRange) {
        const price = product.standard_rate || 0;
        switch (selectedPriceRange) {
          case 'Under ₹1,000':
            matchesPrice = price < 1000;
            break;
          case '₹1,000 - ₹5,000':
            matchesPrice = price >= 1000 && price <= 5000;
            break;
          case '₹5,000 - ₹10,000':
            matchesPrice = price >= 5000 && price <= 10000;
            break;
          case '₹10,000 - ₹25,000':
            matchesPrice = price >= 10000 && price <= 25000;
            break;
          case 'Over ₹25,000':
            matchesPrice = price > 25000;
            break;
          default:
            matchesPrice = true;
        }
      }
      
      return matchesSearch && matchesBrand && matchesPrime && matchesDelivery && 
             matchesRating && matchesCondition && matchesPrice;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= numRating) {
        stars.push(<FaStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
      }
    }
    return stars;
  };

  const AmazonSidebar = ({ isHomepage = false }) => (
    <div style={{
      position: 'sticky',
      top: '20px',
      alignSelf: 'flex-start',
      width: '240px',
      height: 'fit-content',
      maxHeight: 'calc(100vh - 40px)',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      padding: '16px 0 16px 16px',
      fontSize: '14px',
      lineHeight: '20px',
      flexShrink: 0,
      overflowY: 'auto',
      borderRight: '1px solid #E7E7E7',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: '"Amazon Ember", Arial, sans-serif'
    }}>
      
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Category ({categories.length} total)
        </h4>
        
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            color: '#007185',
            fontSize: '14px',
            fontWeight: '700'
          }}>
            <FaChevronLeft style={{ fontSize: '10px', marginRight: '6px' }} />
            {isHomepage ? 'Shop by Category' : 'All Products'}
          </span>
        </div>
        
        <div style={{ paddingLeft: '16px' }}>
          <div 
            style={{
              padding: '2px 0',
              fontSize: '13px',
              color: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '#007185' : '#565959',
              cursor: 'pointer',
              lineHeight: '16px',
              fontWeight: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '600' : '400'
            }}
            onClick={() => {
              if (isHomepage) {
                setActiveHomeCategory('');
              } else {
                handleCategoryChange('');
                setShowHomepageView(true);
              }
            }}
          >
            All Products ({products.length})
          </div>
          
          {categories.slice(0, 12).map((category) => {
            const categoryCount = products.filter(p => p.category === category.name).length;
            return (
              <div 
                key={category.name} 
                style={{
                  padding: '2px 0',
                  fontSize: '13px',
                  color: (isHomepage && activeHomeCategory === category.name) || 
                         (!isHomepage && selectedCategory === category.name) ? '#007185' : '#565959',
                  cursor: 'pointer',
                  lineHeight: '16px',
                  fontWeight: (isHomepage && activeHomeCategory === category.name) || 
                             (!isHomepage && selectedCategory === category.name) ? '600' : '400'
                }}
                onClick={() => {
                  if (isHomepage) {
                    setActiveHomeCategory(category.name);
                  } else {
                    handleCategoryChange(category.name);
                  }
                }}
              >
                {category.name} ({categoryCount})
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Trade Blo Prime
        </h4>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          lineHeight: '20px'
        }}>
          <input 
            type="checkbox" 
            style={{ 
              marginRight: '8px', 
              transform: 'scale(1.1)',
              accentColor: '#FF9900'
            }}
            checked={primeOnly}
            onChange={(e) => setPrimeOnly(e.target.checked)}
          />
          <span style={{ 
            color: '#007185', 
            fontSize: '14px',
            fontWeight: '700'
          }}>
            ✓prime
          </span>
        </label>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Delivery Day
        </h4>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          lineHeight: '20px'
        }}>
          <input 
            type="checkbox" 
            style={{ 
              marginRight: '8px',
              transform: 'scale(1.1)',
              accentColor: '#FF9900'
            }}
            checked={fastDelivery}
            onChange={(e) => setFastDelivery(e.target.checked)}
          />
          <span style={{ color: '#0F1111', fontSize: '14px' }}>
            Get It by Tomorrow
          </span>
        </label>
      </div>

      {availableBrands.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#0F1111',
            margin: '0 0 8px 0',
            lineHeight: '24px'
          }}>
            Brands ({availableBrands.length} total)
          </h4>
          {availableBrands.slice(0, 8).map((brand) => {
            const brandCount = products.filter(p => p.brand === brand).length;
            return (
              <label key={brand} style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginBottom: '4px',
                lineHeight: '20px'
              }}>
                <input 
                  type="checkbox" 
                  style={{ 
                    marginRight: '8px',
                    transform: 'scale(1.1)',
                    accentColor: '#FF9900'
                  }}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <span style={{ color: '#0F1111', fontSize: '14px' }}>
                  {brand} ({brandCount})
                </span>
              </label>
            );
          })}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Customer Reviews
        </h4>
        {[4, 3, 2, 1].map((rating) => (
          <div 
            key={rating} 
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '4px',
              padding: '2px 0',
              lineHeight: '20px'
            }}
            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {renderStars(rating)}
              <span style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: selectedRating === rating ? '#FF9900' : '#007185',
                textDecoration: 'none',
                fontWeight: selectedRating === rating ? '600' : '400'
              }}>
                & Up
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Item Condition
        </h4>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          lineHeight: '20px'
        }}>
          <input 
            type="checkbox" 
            style={{ 
              marginRight: '8px',
              transform: 'scale(1.1)',
              accentColor: '#FF9900'
            }}
            checked={newItems}
            onChange={(e) => setNewItems(e.target.checked)}
          />
          <span style={{ color: '#0F1111', fontSize: '14px' }}>
            New
          </span>
        </label>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#0F1111',
          margin: '0 0 8px 0',
          lineHeight: '24px'
        }}>
          Price
        </h4>
        {[
          'Under ₹1,000',
          '₹1,000 - ₹5,000',
          '₹5,000 - ₹10,000',
          '₹10,000 - ₹25,000',
          'Over ₹25,000'
        ].map((range) => (
          <div 
            key={range} 
            style={{
              cursor: 'pointer',
              padding: '2px 0',
              fontSize: '14px',
              color: selectedPriceRange === range ? '#007185' : '#0F1111',
              lineHeight: '20px',
              fontWeight: selectedPriceRange === range ? '600' : '400'
            }}
            onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}
          >
            {range}
          </div>
        ))}
      </div>
    </div>
  );

  const SmallProductCard = ({ product }) => {
    if (!product) {
      return null;
    }

    return (
      <Link
        to={`/product/${product.route || product.id || product.name}`}
        style={{ textDecoration: 'none' }}
      >
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            position: 'relative',
            height: '220px',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        >
          {product.badge && (
            <div style={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              backgroundColor: product.badge === 'BESTSELLER' ? '#FF9900' : 
                              product.badge === 'WISHLIST' ? '#E91E63' :
                              product.badge === 'IN CART' ? '#4CAF50' :
                              product.badge === 'VARIANTS' ? '#2196F3' : '#0073E6',
              color: '#FFFFFF',
              fontSize: '8px',
              fontWeight: '600',
              padding: '2px 4px',
              borderRadius: '3px',
              zIndex: 1
            }}>
              {product.badge}
            </div>
          )}

          <div style={{
            width: '100%',
            height: '100px',
            marginBottom: '6px',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.item_name || product.web_item_name || 'Product'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const productName = product.item_name || product.web_item_name || 'Product';
                e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
              }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#0F1111',
              margin: '0 0 4px 0',
              lineHeight: '1.2',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {product.item_name || product.web_item_name || 'Product Name'}
            </h3>

            {product.rating && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                marginBottom: '4px'
              }}>
                <span style={{
                  backgroundColor: '#00A652',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: '600',
                  padding: '1px 3px',
                  borderRadius: '2px'
                }}>
                  {product.rating} ★
                </span>
                {product.reviews && (
                  <span style={{
                    fontSize: '9px',
                    color: '#565959'
                  }}>
                    ({product.reviews})
                  </span>
                )}
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '2px'
              }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#0F1111'
                }}>
                  {product.formatted_price || `₹${product.standard_rate ? product.standard_rate.toLocaleString() : '0'}`}
                </span>
                {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
                  <span style={{
                    fontSize: '9px',
                    color: '#565959',
                    textDecoration: 'line-through'
                  }}>
                    {product.formatted_mrp || `₹${product.originalPrice.toLocaleString()}`}
                  </span>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <div style={{
                  fontSize: '9px',
                  color: '#00A652',
                  fontWeight: '500'
                }}>
                  {product.discount}% off
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '18px',
        color: '#666666',
        backgroundColor: '#FFFFFF'
      }}>
        Loading ALL ERPNext website items...
      </div>
    );
  }

  // **🎯 Updated Homepage View - Show ALL Products by Default**
  if (showHomepageView) {
    const currentCategoryData = categories.find(cat => cat.name === activeHomeCategory);
    
    // Show ALL products by default, or filtered by activeHomeCategory if selected
    const homepageProducts = getFilteredProducts(activeHomeCategory).slice(0, displayLimit);

    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh'
      }}>
        <div style={{
          display: 'flex',
          maxWidth: '100vw',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '20px'
        }}>
          
          <AmazonSidebar isHomepage={true} />

          <div style={{ flex: 1, minHeight: '0' }}>
            
            {/* Shop by Category Section */}
            {categories.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#0F1111',
                  marginBottom: '20px'
                }}>
                  Shop by category
                </h2>
                
                <div style={{
                  display: 'flex',
                  overflowX: 'auto',
                  gap: '20px',
                  paddingBottom: '10px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                  {categories.slice(0, 8).map((category, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveHomeCategory(category.name)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '100px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginBottom: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/150x150?text=${encodeURIComponent(category.name.substring(0, 2))}`;
                          }}
                        />
                      </div>
                      <span style={{
                        fontSize: '11px',
                        color: '#565959',
                        fontWeight: '400',
                        lineHeight: '1.2'
                      }}>
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Navigation */}
            {categories.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '30px',
                overflowX: 'auto'
              }}>
                <button
                  onClick={() => setActiveHomeCategory('')}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '20px',
                    backgroundColor: activeHomeCategory === '' ? '#0F1111' : '#F7F8F8',
                    color: activeHomeCategory === '' ? '#FFFFFF' : '#565959',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  All Products ({products.length})
                </button>
                
                {categories.map((cat) => {
                  const categoryCount = products.filter(p => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveHomeCategory(cat.name)}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: activeHomeCategory === cat.name ? '#0F1111' : '#F7F8F8',
                        color: activeHomeCategory === cat.name ? '#FFFFFF' : '#565959',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {cat.name} ({categoryCount})
                    </button>
                  );
                })}
              </div>
            )}

            {/* All Products Section */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#0F1111',
                  margin: '0'
                }}>
                  {activeHomeCategory ? 
                    `${activeHomeCategory} Products (${homepageProducts.length})` : 
                    `All ERPNext Website Items (${homepageProducts.length})`}
                </h2>
                
                <button
                  onClick={() => setShowHomepageView(false)}
                  style={{
                    color: '#0F1111',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  View Detailed List →
                </button>
              </div>

              {/* Sort Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                padding: '12px 16px',
                backgroundColor: '#F7F8F8',
                borderRadius: '4px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',  
                  gap: '16px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#0F1111',
                    fontWeight: '600'
                  }}>
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid #D5D9D9',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: '#FFFFFF',
                      color: '#0F1111',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="name">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                <div style={{
                  fontSize: '14px',
                  color: '#565959'
                }}>
                  Showing {homepageProducts.length} of {products.length} products
                  {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
                   ' (filtered)'}
                </div>
              </div>

              {/* Products Grid */}
              {homepageProducts.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {homepageProducts.map((product) => (
                    <SmallProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  backgroundColor: '#F7F8F8',
                  borderRadius: '8px'
                }}>
                  <h3 style={{ color: '#0F1111', marginBottom: '12px' }}>
                    No ERPNext website items found
                  </h3>
                  <p style={{ color: '#565959', fontSize: '14px' }}>
                    {activeHomeCategory ? 
                      `No items found in ${activeHomeCategory} category. Try selecting "All Products" or adjust your filters.` :
                      'Make sure you have website items configured in ERPNext with the webshop module enabled.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setPrimeOnly(false);
                      setFastDelivery(false);
                      setSelectedRating(0);
                      setNewItems(false);
                      setSelectedPriceRange('');
                      setActiveHomeCategory('');
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0F1111',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '12px'
                    }}
                  >
                    Show All Products
                  </button>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {homepageProducts.length < products.length && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                  onClick={() => setDisplayLimit(prev => prev + 50)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#FF9900',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginRight: '12px'
                  }}
                >
                  Load More Products
                </button>
                
                <button
                  onClick={() => setShowHomepageView(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#0F1111',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  View Detailed List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // **🎯 Regular ProductsPage View with Sidebar**
  const sortedProducts = getFilteredProducts().sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return (a.standard_rate || 0) - (b.standard_rate || 0);
      case 'price_high':
        return (b.standard_rate || 0) - (a.standard_rate || 0);
      case 'rating':
        return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
      case 'newest':
        return new Date(b.creation || 0) - new Date(a.creation || 0);
      case 'name':
      default:
        return (a.item_name || '').localeCompare(b.item_name || '');
    }
  });

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '24px',
        padding: '20px'
      }}>
        
        <AmazonSidebar isHomepage={false} />

        <div style={{ flex: 1, minHeight: '0' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '400',
              color: '#0F1111',
              margin: '0 0 8px 0'
            }}>
              {selectedCategory || 'All ERPNext Products'}
            </h1>
            <div style={{
              fontSize: '14px',
              color: '#565959'
            }}>
              Showing {sortedProducts.length} website items from ERPNext
              {searchTerm && ` for "${searchTerm}"`}
              {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
               ' (filtered)'}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            padding: '12px 16px',
            backgroundColor: '#F7F8F8',
            borderRadius: '4px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#0F1111',
                fontWeight: '600'
              }}>
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #D5D9D9',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                  color: '#0F1111',
                  fontFamily: 'inherit'
                }}
              >
                <option value="name">Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #D5D9D9',
                  backgroundColor: viewMode === 'grid' ? '#FF9900' : '#FFFFFF',
                  color: viewMode === 'grid' ? '#FFFFFF' : '#0F1111',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <FaThLarge size={12} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #D5D9D9',
                  backgroundColor: viewMode === 'list' ? '#FF9900' : '#FFFFFF',
                  color: viewMode === 'list' ? '#FFFFFF' : '#0F1111',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <FaList size={12} />
              </button>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
              border: '1px solid #D5D9D9'
            }}>
              <h3 style={{
                fontSize: '24px',
                color: '#0F1111',
                marginBottom: '16px'
              }}>
                No ERPNext website items found
              </h3>
              <p style={{
                color: '#565959',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                Make sure you have website items configured in ERPNext or try adjusting your filters
              </p>
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPrimeOnly(false);
                  setFastDelivery(false);
                  setSelectedRating(0);
                  setNewItems(false);
                  setSelectedPriceRange('');
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#0F1111',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' 
                ? 'repeat(auto-fill, minmax(250px, 1fr))'
                : '1fr',
              gap: '16px'
            }}>
              {sortedProducts.map((product) => (      
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;


//////////////////////////////////////3rd attempt////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
// import { FaList, FaThLarge, FaStar, FaRegStar, FaChevronLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { erpnextApi } from '../api/erpnextApi';
// import { COLORS } from '../constants/colors';

// const ProductsPage = () => {
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const category = searchParams.get('category');
//   const searchTerm = searchParams.get('search') || '';
  
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(category || '');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('name');
//   const [showHomepageView, setShowHomepageView] = useState(!category);

//   // Filter States
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [primeOnly, setPrimeOnly] = useState(false);
//   const [fastDelivery, setFastDelivery] = useState(false);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [newItems, setNewItems] = useState(false);
//   const [selectedPriceRange, setSelectedPriceRange] = useState('');
//   const [activeHomeCategory, setActiveHomeCategory] = useState('');

//   // Available brands (populated from API data)
//   const [availableBrands, setAvailableBrands] = useState([]);

//   // **🎯 Your ERPNext API Call Function**
//   const get_filtered_products_webshop = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//     const formdata = new FormData();
//     formdata.append("query_args", `{"field_filters":{},"attribute_filters":{},"item_group":${selectedCategory ? `"${selectedCategory}"` : null},"start":null,"from_filters":false}`);

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: formdata,
//       redirect: "follow"
//     };

//     try {
//       setLoading(true);
//       console.log("🔥 Calling ERPNext API for website items...");
      
//       const response = await fetch("/api/method/webshop.webshop.api.get_product_filter_data", requestOptions);
//       const result = await response.json();
      
//       console.log("🔥 Raw API Response:", result);
      
//       if (result.message && result.message.items && result.message.items.length > 0) {
//         console.log("🔥 Website Items from ERPNext:", result.message.items);
//         console.log("🔥 First Item Sample:", result.message.items[0]);
        
//         // Transform your ERPNext data for React components
//         const transformedProducts = result.message.items.map(item => ({
//           // IDs and Names
//           id: item.name || item.item_code,
//           item_name: item.item_name || item.web_item_name,
//           web_item_name: item.web_item_name,
//           item_code: item.item_code,
          
//           // Image handling - convert relative path to full URL
//           image: item.website_image ? 
//                  `${window.location.origin}${item.website_image}` :  
//                  'https://via.placeholder.com/300x300?text=No+Image',
          
//           // Real pricing from ERPNext data
//           standard_rate: item.price_list_rate || 0,
//           originalPrice: item.formatted_mrp ? parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) : null,
//           discount: item.formatted_mrp && item.price_list_rate ? 
//                    Math.round(((parseFloat(item.formatted_mrp.replace(/[^\d.]/g, '')) - item.price_list_rate) / parseFloat(item.formatted_mrp.replace(/[^\d.]/g, ''))) * 100) : 0,
//           formatted_price: item.formatted_price,
//           formatted_mrp: item.formatted_mrp,
          
//           // Remove fake ratings - no rating data
//           rating: null,
//           reviews: null,
          
//           // Categories from your data
//           category: item.item_group || 'General',
//           subcategory: item.item_group || 'General',
//           brand: item.brand || 'Generic',
          
//           // Real stock and cart status from your data
//           inStock: item.in_stock,
//           in_cart: item.in_cart,
//           on_backorder: item.on_backorder,
          
//           // Description handling
//           description: item.short_description || 
//                       item.web_long_description || 
//                       `Premium ${item.item_name || item.web_item_name} from ${item.item_group} category`,
          
//           // ERPNext specific fields
//           route: item.route,
//           has_variants: item.has_variants,
//           variant_of: item.variant_of,
//           website_warehouse: item.website_warehouse,
//           wished: item.wished,
//           ranking: item.ranking,
          
//           // Dynamic badge based on your ERPNext data
//           badge: item.wished ? 'WISHLIST' : 
//                 (item.ranking > 0 ? 'BESTSELLER' : 
//                 (item.has_variants ? 'VARIANTS' : 
//                 (item.in_cart ? 'IN CART' : 'AVAILABLE')))
//         }));
        
//         console.log("🔥 Transformed Products for Display:", transformedProducts);
//         console.log("🔥 Sample Transformed Product:", transformedProducts[0]);
        
//         // Set products state with your real ERPNext data
//         setProducts(transformedProducts);
        
//         // Extract unique categories from your item_group data for shop by category
//         const uniqueCategories = [...new Set(transformedProducts.map(p => p.category))];
//         const categoriesWithItemGroups = uniqueCategories.map(categoryName => {
//           // Get first product image from this category for the category display
//           const categoryProduct = transformedProducts.find(p => p.category === categoryName);
//           return {
//             name: categoryName,
//             image: categoryProduct ? categoryProduct.image : 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(categoryName.substring(0, 2)),
//             // For subcategories, we'll show the item groups instead of individual products
//             subcategories: [{
//               name: categoryName,
//               image: categoryProduct ? categoryProduct.image : 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(categoryName.substring(0, 2))
//             }]
//           };
//         });
        
//         console.log("🔥 Categories extracted from your data:", categoriesWithItemGroups);
//         setCategories(categoriesWithItemGroups);
        
//         // Set first category as active if none selected
//         if (!activeHomeCategory && categoriesWithItemGroups.length > 0) {
//           setActiveHomeCategory(categoriesWithItemGroups[0].name);
//         }
        
//         // Extract brands from your data
//         const uniqueBrands = [...new Set(transformedProducts.map(p => p.brand).filter(Boolean))];
//         setAvailableBrands(uniqueBrands);
//         console.log("🔥 Brands extracted:", uniqueBrands);
        
//         console.log("✅ SUCCESS: Loaded", transformedProducts.length, "website items from ERPNext");
        
//       } else {
//         console.log("❌ No website items found in API response");
//         console.log("❌ Result message:", result.message);
//         setProducts([]);
//         setCategories([]);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching ERPNext website items:', error);
//       setProducts([]);
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **🎯 Load data when component mounts or category changes**
//   useEffect(() => {
//     console.log("Loading ERPNext website items...");
//     get_filtered_products_webshop();
//   }, [selectedCategory]);

//   // **🎯 Handle category changes**
//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setActiveHomeCategory(categoryName);
//     setShowHomepageView(false);
//     if (categoryName) {
//       setSearchParams({ category: categoryName });
//     } else {
//       setSearchParams({});
//       setShowHomepageView(true);
//     }
//   };

//   // **🎯 Handle brand filtering**
//   const handleBrandToggle = (brand) => {
//     setSelectedBrands(prev => 
//       prev.includes(brand) 
//         ? prev.filter(b => b !== brand)
//         : [...prev, brand]
//     );
//   };

//   // **🎯 Filter products based on all criteria**
//   const getFilteredProducts = (categoryFilter = '') => {
//     const baseProducts = categoryFilter ? 
//       products.filter(p => p.category === categoryFilter) : 
//       (selectedCategory ? products.filter(p => p.category === selectedCategory) : products);
    
//     return baseProducts.filter(product => {
//       const matchesSearch = searchTerm === '' || 
//         (product.item_name && product.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.web_item_name && product.web_item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.item_code && product.item_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesBrand = selectedBrands.length === 0 || 
//         selectedBrands.some(brand => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
      
//       const matchesPrime = !primeOnly || product.badge === 'BESTSELLER';
//       const matchesDelivery = !fastDelivery || product.inStock;
//       const matchesRating = selectedRating === 0 || (product.rating && parseFloat(product.rating) >= selectedRating);
//       const matchesCondition = !newItems || product.badge === 'NEW LAUNCH';
      
//       let matchesPrice = true;
//       if (selectedPriceRange) {
//         const price = product.standard_rate || 0;
//         switch (selectedPriceRange) {
//           case 'Under ₹1,000':
//             matchesPrice = price < 1000;
//             break;
//           case '₹1,000 - ₹5,000':
//             matchesPrice = price >= 1000 && price <= 5000;
//             break;
//           case '₹5,000 - ₹10,000':
//             matchesPrice = price >= 5000 && price <= 10000;
//             break;
//           case '₹10,000 - ₹25,000':
//             matchesPrice = price >= 10000 && price <= 25000;
//             break;
//           case 'Over ₹25,000':
//             matchesPrice = price > 25000;
//             break;
//           default:
//             matchesPrice = true;
//         }
//       }
      
//       return matchesSearch && matchesBrand && matchesPrime && matchesDelivery && 
//              matchesRating && matchesCondition && matchesPrice;
//     });
//   };

//   // **🎯 Render star ratings**
//   const renderStars = (rating) => {
//     const stars = [];
//     const numRating = parseFloat(rating) || 0;
//     for (let i = 1; i <= 5; i++) {
//       if (i <= numRating) {
//         stars.push(<FaStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
//       } else {
//         stars.push(<FaRegStar key={i} style={{ color: '#FF9900', fontSize: '14px' }} />);
//       }
//     }
//     return stars;
//   };

//   // **🎯 Amazon-Style Sidebar Component**
//   const AmazonSidebar = ({ isHomepage = false }) => (
//     <div style={{
//       position: 'sticky',
//       top: '20px',
//       alignSelf: 'flex-start',
//       width: '240px',
//       height: 'fit-content',
//       maxHeight: 'calc(100vh - 40px)',
//       backgroundColor: '#FFFFFF',
//       color: '#000000',
//       padding: '16px 0 16px 16px',
//       fontSize: '14px',
//       lineHeight: '20px',
//       flexShrink: 0,
//       overflowY: 'auto',
//       borderRight: '1px solid #E7E7E7',
//       borderRadius: '8px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       fontFamily: '"Amazon Ember", Arial, sans-serif'
//     }}>
      
//       {/* Category Section */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Category
//         </h4>
        
//         <div style={{ marginBottom: '8px' }}>
//           <span style={{
//             display: 'flex',
//             alignItems: 'center',
//             color: '#007185',
//             fontSize: '14px',
//             fontWeight: '700'
//           }}>
//             <FaChevronLeft style={{ fontSize: '10px', marginRight: '6px' }} />
//             {isHomepage ? 'Shop by Category' : 'All Products'}
//           </span>
//         </div>
        
//         <div style={{ paddingLeft: '16px' }}>
//           <div 
//             style={{
//               padding: '2px 0',
//               fontSize: '13px',
//               color: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '#007185' : '#565959',
//               cursor: 'pointer',
//               lineHeight: '16px',
//               fontWeight: (!selectedCategory && !isHomepage) || (isHomepage && !activeHomeCategory) ? '600' : '400'
//             }}
//             onClick={() => {
//               if (isHomepage) {
//                 setActiveHomeCategory('');
//               } else {
//                 handleCategoryChange('');
//                 setShowHomepageView(true);
//               }
//             }}
//           >
//             All Products
//           </div>
          
//           {categories.slice(0, 8).map((category) => (
//             <div 
//               key={category.name} 
//               style={{
//                 padding: '2px 0',
//                 fontSize: '13px',
//                 color: (isHomepage && activeHomeCategory === category.name) || 
//                        (!isHomepage && selectedCategory === category.name) ? '#007185' : '#565959',
//                 cursor: 'pointer',
//                 lineHeight: '16px',
//                 fontWeight: (isHomepage && activeHomeCategory === category.name) || 
//                            (!isHomepage && selectedCategory === category.name) ? '600' : '400'
//               }}
//               onClick={() => {
//                 if (isHomepage) {
//                   setActiveHomeCategory(category.name);
//                 } else {
//                   handleCategoryChange(category.name);
//                 }
//               }}
//             >
//               {category.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Trade Blo Prime Section */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Trade Blo Prime
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px', 
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={primeOnly}
//             onChange={(e) => setPrimeOnly(e.target.checked)}
//           />
//           <span style={{ 
//             color: '#007185', 
//             fontSize: '14px',
//             fontWeight: '700'
//           }}>
//             ✓prime
//           </span>
//         </label>
//       </div>

//       {/* Delivery Day */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Delivery Day
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px',
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={fastDelivery}
//             onChange={(e) => setFastDelivery(e.target.checked)}
//           />
//           <span style={{ color: '#0F1111', fontSize: '14px' }}>
//             Get It by Tomorrow
//           </span>
//         </label>
//       </div>

//       {/* Dynamic Brands from ERPNext */}
//       {availableBrands.length > 0 && (
//         <div style={{ marginBottom: '24px' }}>
//           <h4 style={{
//             fontSize: '16px',
//             fontWeight: '700',
//             color: '#0F1111',
//             margin: '0 0 8px 0',
//             lineHeight: '24px'
//           }}>
//             Brands
//           </h4>
//           {availableBrands.slice(0, 6).map((brand) => (
//             <label key={brand} style={{
//               display: 'flex',
//               alignItems: 'center',
//               cursor: 'pointer',
//               marginBottom: '4px',
//               lineHeight: '20px'
//             }}>
//               <input 
//                 type="checkbox" 
//                 style={{ 
//                   marginRight: '8px',
//                   transform: 'scale(1.1)',
//                   accentColor: '#FF9900'
//                 }}
//                 checked={selectedBrands.includes(brand)}
//                 onChange={() => handleBrandToggle(brand)}
//               />
//               <span style={{ color: '#0F1111', fontSize: '14px' }}>
//                 {brand}
//               </span>
//             </label>
//           ))}
//         </div>
//       )}

//       {/* Customer Reviews */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Customer Reviews
//         </h4>
//         {[4, 3, 2, 1].map((rating) => (
//           <div 
//             key={rating} 
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               cursor: 'pointer',
//               marginBottom: '4px',
//               padding: '2px 0',
//               lineHeight: '20px'
//             }}
//             onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
//           >
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               {renderStars(rating)}
//               <span style={{
//                 marginLeft: '8px',
//                 fontSize: '14px',
//                 color: selectedRating === rating ? '#FF9900' : '#007185',
//                 textDecoration: 'none',
//                 fontWeight: selectedRating === rating ? '600' : '400'
//               }}>
//                 & Up
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Item Condition */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Item Condition
//         </h4>
//         <label style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer',
//           lineHeight: '20px'
//         }}>
//           <input 
//             type="checkbox" 
//             style={{ 
//               marginRight: '8px',
//               transform: 'scale(1.1)',
//               accentColor: '#FF9900'
//             }}
//             checked={newItems}
//             onChange={(e) => setNewItems(e.target.checked)}
//           />
//           <span style={{ color: '#0F1111', fontSize: '14px' }}>
//             New
//           </span>
//         </label>
//       </div>

//       {/* Price */}
//       <div style={{ marginBottom: '24px' }}>
//         <h4 style={{
//           fontSize: '16px',
//           fontWeight: '700',
//           color: '#0F1111',
//           margin: '0 0 8px 0',
//           lineHeight: '24px'
//         }}>
//           Price
//         </h4>
//         {[
//           'Under ₹1,000',
//           '₹1,000 - ₹5,000',
//           '₹5,000 - ₹10,000',
//           '₹10,000 - ₹25,000',
//           'Over ₹25,000'
//         ].map((range) => (
//           <div 
//             key={range} 
//             style={{
//               cursor: 'pointer',
//               padding: '2px 0',
//               fontSize: '14px',
//               color: selectedPriceRange === range ? '#007185' : '#0F1111',
//               lineHeight: '20px',
//               fontWeight: selectedPriceRange === range ? '600' : '400'
//             }}
//             onClick={() => setSelectedPriceRange(selectedPriceRange === range ? '' : range)}
//           >
//             {range}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // **🎯 Fixed Small Product Card Component for Homepage**
//   const SmallProductCard = ({ product }) => {
//     // Add safety checks for required properties
//     if (!product) {
//       return null;
//     }

//     return (
//       <Link
//         to={`/product/${product.route || product.id || product.name}`}
//         style={{ textDecoration: 'none' }}
//       >
//         <div 
//           style={{
//             backgroundColor: '#FFFFFF',
//             borderRadius: '8px',
//             padding: '8px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             cursor: 'pointer',
//             transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//             position: 'relative',
//             height: '220px',
//             display: 'flex',
//             flexDirection: 'column'
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.transform = 'translateY(-2px)';
//             e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
//           }}
//         >
//           {product.badge && (
//             <div style={{
//               position: 'absolute',
//               top: '4px',
//               left: '4px',
//               backgroundColor: product.badge === 'BESTSELLER' ? '#FF9900' : 
//                               product.badge === 'WISHLIST' ? '#E91E63' :
//                               product.badge === 'IN CART' ? '#4CAF50' :
//                               product.badge === 'VARIANTS' ? '#2196F3' : '#0073E6',
//               color: '#FFFFFF',
//               fontSize: '8px',
//               fontWeight: '600',
//               padding: '2px 4px',
//               borderRadius: '3px',
//               zIndex: 1
//             }}>
//               {product.badge}
//             </div>
//           )}

//           <div style={{
//             width: '100%',
//             height: '100px',
//             marginBottom: '6px',
//             overflow: 'hidden',
//             borderRadius: '4px'
//           }}>
//             <img
//               src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
//               alt={product.item_name || product.web_item_name || 'Product'}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover'
//               }}
//               onError={(e) => {
//                 const productName = product.item_name || product.web_item_name || 'Product';
//                 e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName.substring(0, 10))}`;
//               }}
//             />
//           </div>

//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//             <h3 style={{
//               fontSize: '11px',
//               fontWeight: '500',
//               color: '#0F1111',
//               margin: '0 0 4px 0',
//               lineHeight: '1.2',
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//               whiteSpace: 'nowrap'
//             }}>
//               {product.item_name || product.web_item_name || 'Product Name'}
//             </h3>

//             {/* Only show rating if it exists */}
//             {product.rating && (
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '2px',
//                 marginBottom: '4px'
//               }}>
//                 <span style={{
//                   backgroundColor: '#00A652',
//                   color: '#FFFFFF',
//                   fontSize: '9px',
//                   fontWeight: '600',
//                   padding: '1px 3px',
//                   borderRadius: '2px'
//                 }}>
//                   {product.rating} ★
//                 </span>
//                 {product.reviews && (
//                   <span style={{
//                     fontSize: '9px',
//                     color: '#565959'
//                   }}>
//                     ({product.reviews})
//                   </span>
//                 )}
//               </div>
//             )}

//             <div style={{ marginTop: 'auto' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px',
//                 marginBottom: '2px'
//               }}>
//                 <span style={{
//                   fontSize: '12px',
//                   fontWeight: '600',
//                   color: '#0F1111'
//                 }}>
//                   {product.formatted_price || `₹${product.standard_rate ? product.standard_rate.toLocaleString() : '0'}`}
//                 </span>
//                 {product.originalPrice && product.originalPrice > (product.standard_rate || 0) && (
//                   <span style={{
//                     fontSize: '9px',
//                     color: '#565959',
//                     textDecoration: 'line-through'
//                   }}>
//                     {product.formatted_mrp || `₹${product.originalPrice.toLocaleString()}`}
//                   </span>
//                 )}
//               </div>
//               {product.discount && product.discount > 0 && (
//                 <div style={{
//                   fontSize: '9px',
//                   color: '#00A652',
//                   fontWeight: '500'
//                 }}>
//                   {product.discount}% off
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   // **🎯 Loading State**
//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//         fontSize: '18px',
//         color: '#666666',
//         backgroundColor: '#FFFFFF'
//       }}>
//         Loading ERPNext website items...
//       </div>
//     );
//   }

//   // **🎯 Homepage View with Sidebar**
//   if (showHomepageView) {
//     const currentCategoryData = categories.find(cat => cat.name === activeHomeCategory);
//     const homepageProducts = getFilteredProducts(activeHomeCategory).slice(0, 20);

//     return (
//       <div style={{
//         backgroundColor: '#FFFFFF',
//         minHeight: '100vh'
//       }}>
//         {/* Homepage with Sidebar Layout */}
//         <div style={{
//           display: 'flex',
//           maxWidth: '100vw',
//           justifyContent: 'space-between',
//           gap: '24px',
//           padding: '20px'
//         }}>
          
//           {/* Amazon-Style Sidebar for Homepage */}
//           <AmazonSidebar isHomepage={true} />

//           {/* Main Homepage Content */}
//           <div style={{ flex: 1, minHeight: '0' }}>
            
//             {/* Shop by Category Section - Show Item Groups */}
//             {categories.length > 0 && (
//               <div style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '24px',
//                   fontWeight: '600',
//                   color: '#0F1111',
//                   marginBottom: '20px'
//                 }}>
//                   Shop by category
//                 </h2>
                
//                 {/* Category Carousel - Show Item Groups */}
//                 <div style={{
//                   display: 'flex',
//                   overflowX: 'auto',
//                   gap: '20px',
//                   paddingBottom: '10px',
//                   scrollbarWidth: 'none',
//                   msOverflowStyle: 'none'
//                 }}>
//                   {categories.slice(0, 8).map((category, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleCategoryChange(category.name)}
//                       style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         minWidth: '100px',
//                         cursor: 'pointer',
//                         textAlign: 'center',
//                         transition: 'transform 0.2s ease'
//                       }}
//                       onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//                       onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                     >
//                       <div style={{
//                         width: '70px',
//                         height: '70px',
//                         borderRadius: '50%',
//                         overflow: 'hidden',
//                         marginBottom: '8px',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                       }}>
//                         <img
//                           src={category.image}
//                           alt={category.name}
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover'
//                           }}
//                           onError={(e) => {
//                             e.target.src = `https://via.placeholder.com/150x150?text=${encodeURIComponent(category.name.substring(0, 2))}`;
//                           }}
//                         />
//                       </div>
//                       <span style={{
//                         fontSize: '11px',
//                         color: '#565959',
//                         fontWeight: '400',
//                         lineHeight: '1.2'
//                       }}>
//                         {category.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Category Navigation */}
//             {categories.length > 0 && (
//               <div style={{
//                 display: 'flex',
//                 gap: '12px',
//                 marginBottom: '30px',
//                 overflowX: 'auto'
//               }}>
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.name}
//                     onClick={() => setActiveHomeCategory(cat.name)}
//                     style={{
//                       padding: '10px 20px',
//                       border: 'none',
//                       borderRadius: '20px',
//                       backgroundColor: activeHomeCategory === cat.name ? '#0F1111' : '#F7F8F8',
//                       color: activeHomeCategory === cat.name ? '#FFFFFF' : '#565959',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Top Products Section */}
//             <div style={{ marginBottom: '40px' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{
//                   fontSize: '24px',
//                   fontWeight: '600',
//                   color: '#0F1111',
//                   margin: '0'
//                 }}>
//                   {homepageProducts.length > 0 ? 
//                     `Top ${Math.min(homepageProducts.length, 20)} | ${activeHomeCategory || 'All Products'}` : 
//                     'ERPNext Website Items'}
//                 </h2>
//                 {activeHomeCategory && (
//                   <button
//                     onClick={() => handleCategoryChange(activeHomeCategory)}
//                     style={{
//                       color: '#0F1111',
//                       textDecoration: 'none',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       background: 'none',
//                       border: 'none',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     View All →
//                   </button>
//                 )}
//               </div>

//               {/* Sort Bar for Homepage */}
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '16px',
//                 padding: '12px 16px',
//                 backgroundColor: '#F7F8F8',
//                 borderRadius: '4px'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',  
//                   gap: '16px'
//                 }}>
//                   <span style={{
//                     fontSize: '14px',
//                     color: '#0F1111',
//                     fontWeight: '600'
//                   }}>
//                     Sort by:
//                   </span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     style={{
//                       padding: '6px 8px',
//                       border: '1px solid #D5D9D9',
//                       borderRadius: '4px',
//                       fontSize: '14px',
//                       backgroundColor: '#FFFFFF',
//                       color: '#0F1111',
//                       fontFamily: 'inherit'
//                     }}
//                   >
//                     <option value="name">Featured</option>
//                     <option value="price_low">Price: Low to High</option>
//                     <option value="price_high">Price: High to Low</option>
//                     <option value="rating">Customer Rating</option>
//                     <option value="newest">Newest Arrivals</option>
//                   </select>
//                 </div>

//                 <div style={{
//                   fontSize: '14px',
//                   color: '#565959'
//                 }}>
//                   Showing {homepageProducts.length} products
//                   {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
//                    ' (filtered)'}
//                 </div>
//               </div>

//               {/* Products Grid - Using Your ERPNext Data */}
//               {homepageProducts.length > 0 ? (
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//                   gap: '12px'
//                 }}>
//                   {homepageProducts.map((product) => (
//                     <SmallProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               ) : (
//                 <div style={{
//                   textAlign: 'center',
//                   padding: '60px 20px',
//                   backgroundColor: '#F7F8F8',
//                   borderRadius: '8px'
//                 }}>
//                   <h3 style={{ color: '#0F1111', marginBottom: '12px' }}>
//                     No ERPNext website items found
//                   </h3>
//                   <p style={{ color: '#565959', fontSize: '14px' }}>
//                     Make sure you have website items configured in ERPNext with the webshop module enabled.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSelectedBrands([]);
//                       setPrimeOnly(false);
//                       setFastDelivery(false);
//                       setSelectedRating(0);
//                       setNewItems(false);
//                       setSelectedPriceRange('');
//                     }}
//                     style={{
//                       padding: '8px 16px',
//                       backgroundColor: '#0F1111',
//                       color: '#FFFFFF',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       marginTop: '12px'
//                     }}
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* View More Button */}
//             <div style={{ textAlign: 'center', marginTop: '40px' }}>
//               <button
//                 onClick={() => setShowHomepageView(false)}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: '#0F1111',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease'
//                 }}
//               >
//                 View All Categories
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // **🎯 Regular ProductsPage View with Sidebar**
//   const sortedProducts = getFilteredProducts().sort((a, b) => {
//     switch (sortBy) {
//       case 'price_low':
//         return (a.standard_rate || 0) - (b.standard_rate || 0);
//       case 'price_high':
//         return (b.standard_rate || 0) - (a.standard_rate || 0);
//       case 'rating':
//         return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
//       case 'newest':
//         return new Date(b.creation || 0) - new Date(a.creation || 0);
//       case 'name':
//       default:
//         return (a.item_name || '').localeCompare(b.item_name || '');
//     }
//   });

//   return (
//     <div style={{
//       backgroundColor: '#FFFFFF',
//       minHeight: '100vh'
//     }}>
//       <div style={{
//         display: 'flex',
//         maxWidth: '1400px',
//         margin: '0 auto',
//         gap: '24px',
//         padding: '20px'
//       }}>
        
//         {/* Amazon-Style Sidebar for Products View */}
//         <AmazonSidebar isHomepage={false} />

//         {/* Main Content */}
//         <div style={{ flex: 1, minHeight: '0' }}>
//           <div style={{ marginBottom: '24px' }}>
//             <h1 style={{
//               fontSize: '28px',
//               fontWeight: '400',
//               color: '#0F1111',
//               margin: '0 0 8px 0'
//             }}>
//               {selectedCategory || 'All ERPNext Products'}
//             </h1>
//             <div style={{
//               fontSize: '14px',
//               color: '#565959'
//             }}>
//               Showing {sortedProducts.length} website items from ERPNext
//               {searchTerm && ` for "${searchTerm}"`}
//               {(selectedBrands.length > 0 || primeOnly || fastDelivery || selectedRating > 0 || newItems || selectedPriceRange) && 
//                ' (filtered)'}
//             </div>
//           </div>

//           {/* Sort Bar */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '16px',
//             padding: '12px 16px',
//             backgroundColor: '#F7F8F8',
//             borderRadius: '4px'
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '16px'
//             }}>
//               <span style={{
//                 fontSize: '14px',
//                 color: '#0F1111',
//                 fontWeight: '600'
//               }}>
//                 Sort by:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 style={{
//                   padding: '6px 8px',
//                   border: '1px solid #D5D9D9',
//                   borderRadius: '4px',
//                   fontSize: '14px',
//                   backgroundColor: '#FFFFFF',
//                   color: '#0F1111',
//                   fontFamily: 'inherit'
//                 }}
//               >
//                 <option value="name">Featured</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//                 <option value="rating">Customer Rating</option>
//                 <option value="newest">Newest Arrivals</option>
//               </select>
//             </div>

//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}>
//               <button
//                 onClick={() => setViewMode('grid')}
//                 style={{
//                   padding: '6px 8px',
//                   border: '1px solid #D5D9D9',
//                   backgroundColor: viewMode === 'grid' ? '#FF9900' : '#FFFFFF',
//                   color: viewMode === 'grid' ? '#FFFFFF' : '#0F1111',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <FaThLarge size={12} />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 style={{
//                   padding: '6px 8px',
//                   border: '1px solid #D5D9D9',
//                   backgroundColor: viewMode === 'list' ? '#FF9900' : '#FFFFFF',
//                   color: viewMode === 'list' ? '#FFFFFF' : '#0F1111',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 <FaList size={12} />
//               </button>
//             </div>
//           </div>

//           {/* Products Grid - Your ERPNext Data */}
//           {sortedProducts.length === 0 ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '60px 20px',
//               backgroundColor: '#FFFFFF',
//               borderRadius: '4px',
//               border: '1px solid #D5D9D9'
//             }}>
//               <h3 style={{
//                 fontSize: '24px',
//                 color: '#0F1111',
//                 marginBottom: '16px'
//               }}>
//                 No ERPNext website items found
//               </h3>
//               <p style={{
//                 color: '#565959',
//                 fontSize: '14px',
//                 marginBottom: '16px'
//               }}>
//                 Make sure you have website items configured in ERPNext or try adjusting your filters
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedBrands([]);
//                   setPrimeOnly(false);
//                   setFastDelivery(false);
//                   setSelectedRating(0);
//                   setNewItems(false);
//                   setSelectedPriceRange('');
//                 }}
//                 style={{
//                   padding: '12px 24px',
//                   backgroundColor: '#0F1111',
//                   color: '#FFFFFF',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: viewMode === 'grid' 
//                 ? 'repeat(auto-fill, minmax(250px, 1fr))'
//                 : '1fr',
//               gap: '16px'
//             }}>
//               {sortedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
