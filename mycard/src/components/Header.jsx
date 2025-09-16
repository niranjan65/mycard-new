
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaSearch, FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';

// const Header = () => {
//   const navigate = useNavigate();
//   const { totalItems, wishlist } = useSelector(state => state.cart);
  
//   // State for search functionality
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // Auto-show all data when search is cleared
//   // useEffect(() => {
//   //   if (searchTerm === '' && selectedCategory === '') {
//   //     // Small delay to prevent immediate navigation on initial load
//   //     const timer = setTimeout(() => {
//   //       navigate('/products');
//   //     }, 100);
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [searchTerm, selectedCategory, navigate]);

//   // Handle search function
//   const handleSearch = () => {
//     let queryParams = [];
    
//     if (searchTerm.trim()) {
//       queryParams.push(`search=${encodeURIComponent(searchTerm.trim())}`);
//     }
    
//     if (selectedCategory) {
//       queryParams.push(`category=${encodeURIComponent(selectedCategory)}`);
//     }
    
//     const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
//     navigate(`/products${queryString}`);
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // Handle category change
//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <header style={{
//       backgroundColor: COLORS.primary,
//       color: COLORS.white,
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     }}>
//       {/* Top Bar */}
//       <div style={{
//         backgroundColor: COLORS.primaryDark,
//         padding: '8px 0',
//         fontSize: '14px'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '0 20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <span>My Card</span>
//           <div style={{ display: 'flex', gap: '20px' }}>
//             <span>Customer Care: 1800-123-4567</span>
//             <span>Track Order</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '16px 20px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//       }}>
//         {/* Logo */}
//         <Link to="/" style={{
//           fontSize: '28px',
//           fontWeight: 'bold',
//           color: COLORS.white,
//           textDecoration: 'none'
//         }}>
//           Trade Blo Me
//         </Link>

//         {/* Working Search Bar */}
//         <div style={{
//           flex: 1,
//           maxWidth: '600px',
//           margin: '0 40px',
//           position: 'relative'
//         }}>
//           <div style={{
//             display: 'flex',
//             backgroundColor: COLORS.white,
//             borderRadius: '8px',
//             overflow: 'hidden',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//           }}>
            
//             {/* Search Input - Working */}
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onKeyPress={handleKeyPress}
//               placeholder="Search for products, brands and more..."
//               style={{
//                 flex: 1,
//                 border: 'none',
//                 padding: '12px 16px',
//                 fontSize: '16px',
//                 outline: 'none',
//                 color: COLORS.textPrimary
//               }}
//             />
            
//             {/* Search Button - Working */}
//             <button 
//               onClick={handleSearch}
//               style={{
//                 backgroundColor: COLORS.secondary,
//                 border: 'none',
//                 padding: '12px 20px',
//                 cursor: 'pointer',
//                 color: COLORS.white,
//                 transition: 'background-color 0.3s ease'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = COLORS.secondaryLight}
//               onMouseOut={(e) => e.target.style.backgroundColor = COLORS.secondary}
//             >
//               <FaSearch size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '24px'
//         }}>
//           {/* User Account */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             cursor: 'pointer',
//             padding: '8px'
//           }}>
//             <FaUser size={20} />
//             <div>
//               <div style={{ fontSize: '12px', opacity: 0.8 }}>Hello, Sign in</div>
//               <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Account & Lists</div>
//             </div>
//           </div>

//           {/* Wishlist */}
//           <Link to="/wishlist" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             position: 'relative',
//             padding: '8px'
//           }}>
//             <FaHeart size={24} />
//             {wishlist.length > 0 && (
//               <span style={{
//                 position: 'absolute',
//                 top: '-4px',
//                 right: '-4px',
//                 backgroundColor: COLORS.secondary,
//                 color: COLORS.white,
//                 borderRadius: '50%',
//                 width: '20px',
//                 height: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '12px',
//                 fontWeight: 'bold'
//               }}>
//                 {wishlist.length}
//               </span>
//             )}
//           </Link>

//           {/* Cart */}
//           <Link to="/cart" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             position: 'relative',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             padding: '8px'
//           }}>
//             <FaShoppingCart size={24} />
//             <div>
//               <div style={{ fontSize: '12px', opacity: 0.8 }}>Cart</div>
//               <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
//                 {totalItems} items
//               </div>
//             </div>
//             {totalItems > 0 && (
//               <span style={{
//                 position: 'absolute',
//                 top: '-4px',
//                 right: '-4px',
//                 backgroundColor: COLORS.secondary,
//                 color: COLORS.white,
//                 borderRadius: '50%',
//                 width: '20px',
//                 height: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '12px',
//                 fontWeight: 'bold'
//               }}>
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <nav style={{
//         backgroundColor: COLORS.primaryDark,
//         borderTop: `1px solid ${COLORS.primaryLight}`
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '12px 20px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '32px'
//         }}>
//           <Link to="/products" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             fontSize: '16px',
//             fontWeight: '500',
//             padding: '8px 0',
//             borderBottom: '2px solid transparent',
//             transition: 'border-color 0.3s'
//           }}>
//             All Products
//           </Link>
//           <Link to="/products?category=Electronics" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             fontSize: '16px',
//             fontWeight: '500',
//             padding: '8px 0'
//           }}>
//             Electronics
//           </Link>
//           <Link to="/products?category=Fashion" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             fontSize: '16px',
//             fontWeight: '500',
//             padding: '8px 0'
//           }}>
//             Fashion
//           </Link>
//           <Link to="/products?category=Home" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             fontSize: '16px',
//             fontWeight: '500',
//             padding: '8px 0'
//           }}>
//             Home & Living
//           </Link>
//           <Link to="/products?category=Books" style={{
//             color: COLORS.white,
//             textDecoration: 'none',
//             fontSize: '16px',
//             fontWeight: '500',
//             padding: '8px 0'
//           }}>
//             Books
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;







import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaHome } from 'react-icons/fa';
import { COLORS } from '../constants/colors';

const Header = () => {
  const navigate = useNavigate();
  const { totalItems, wishlist } = useSelector(state => state.cart);
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handle search function
  const handleSearch = () => {
    let queryParams = [];
    
    if (searchTerm.trim()) {
      queryParams.push(`search=${encodeURIComponent(searchTerm.trim())}`);
    }
    
    if (selectedCategory) {
      queryParams.push(`category=${encodeURIComponent(selectedCategory)}`);
    }
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    navigate(`/trade${queryString}`);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header style={{
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      

      {/* Main Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <img className='h-16 mr-12' src='/assets/erpnext/images/mycard.png' alt="MyCard Logo" />
        </div>
        {/* Logo */}
        <Link to="/trade" style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: COLORS.white,
          textDecoration: 'none'
        }}>
          Trade Blo Me
        </Link>

        {/* Home Button - NEW ADDITION */}
        {/* <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            marginLeft: '20px',
            borderRadius: '6px',
            textDecoration: 'none',
            color: COLORS.white,
            transition: 'background-color 0.3s ease',
            flexShrink: 0
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Home"
        >
          <FaHome size={22} />
        </Link> */}

        {/* Working Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: '600px',
          margin: '0 40px',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            backgroundColor: COLORS.white,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            
            {/* Search Input - Working */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search for products, brands and more..."
              style={{
                flex: 1,
                border: 'none',
                padding: '12px 16px',
                fontSize: '16px',
                outline: 'none',
                color: COLORS.textPrimary
              }}
            />
            
            {/* Search Button - Working */}
            <button 
              onClick={handleSearch}
              style={{
                backgroundColor: COLORS.secondary,
                border: 'none',
                padding: '12px 20px',
                cursor: 'pointer',
                color: COLORS.white,
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = COLORS.secondaryLight}
              onMouseOut={(e) => e.target.style.backgroundColor = COLORS.secondary}
            >
              <FaSearch size={18} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* User Account */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            <FaUser size={20} />
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Hello, Sign in</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Account & Lists</div>
            </div>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" style={{
            color: COLORS.white,
            textDecoration: 'none',
            position: 'relative',
            padding: '8px'
          }}>
            <FaHeart size={24} />
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: COLORS.secondary,
                color: COLORS.white,
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" style={{
            color: COLORS.white,
            textDecoration: 'none',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px'
          }}>
            <FaShoppingCart size={24} />
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Cart</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {totalItems} items
              </div>
            </div>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: COLORS.secondary,
                color: COLORS.white,
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: COLORS.primaryDark,
        borderTop: `1px solid ${COLORS.primaryLight}`
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}>
          <a to="/trade" style={{
            color: COLORS.white,
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            padding: '8px 0',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.3s'
          }}>
            All Products
          </a>
          {/* <Link to="/products?category=Electronics" style={{
            color: COLORS.white,
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            padding: '8px 0'
          }}>
            Electronics
          </Link>
          <Link to="/products?category=Fashion" style={{
            color: COLORS.white,
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            padding: '8px 0'
          }}>
            Fashion
          </Link>
          <Link to="/products?category=Home" style={{
            color: COLORS.white,
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            padding: '8px 0'
          }}>
            Home & Living
          </Link>
          <Link to="/products?category=Books" style={{
            color: COLORS.white,
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            padding: '8px 0'
          }}>
            Books
          </Link> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
