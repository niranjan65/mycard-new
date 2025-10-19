import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaShieldAlt, FaShippingFast, FaHeadset, FaExternalLinkAlt, FaHeartbeat, FaCreditCard, FaUsers, FaHome, FaUniversity } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#3A3A3C', // Your requested color
      color: '#FFFFFF',
      padding: '60px 0 0 0',
      marginTop: '60px'
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: '20px',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>
              Trade Blo Me
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#CCCCCC',
              lineHeight: '1.6',
              marginBottom: '30px',
              maxWidth: '300px'
            }}>
              Your trusted e-commerce platform for quality products at amazing prices. Shop with confidence and enjoy our premium service.
            </p>
            
            {/* Explore Other Apps Section */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#FFD814',
                marginBottom: '15px'
              }}>
                Explore Other Apps
              </h4>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {[
                  { 
                    name: 'Health Card', 
                    url: 'http://192.168.101.182:8002/mycard/health',
                    icon: FaHeartbeat,
                    color: '#FF6B6B'
                  },
                  { 
                    name: 'My Card', 
                    url: 'http://192.168.101.182:8002/mycard/',
                    icon: FaCreditCard,
                    color: '#4ECDC4'
                  },
                  { 
                    name: 'Social Card', 
                    url: 'http://192.168.101.182:8002/mycard/social',
                    icon: FaUsers,
                    color: '#45B7D1'
                  },
                  { 
                    name: 'Home Card', 
                    url: 'http://192.168.101.182:8002/mycard',
                    icon: FaHome,
                    color: '#96CEB4'
                  },
                  { 
                    name: 'Bank Card', 
                    url: 'http://192.168.101.182:8002/mycard/bank',
                    icon: FaUniversity,
                    color: '#FECA57'
                  }
                ].map((app, index) => (
                  <a
                    key={index}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      backgroundColor: '#4A4A4C',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      border: `1px solid ${app.color}20`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = app.color + '20';
                      e.currentTarget.style.borderColor = app.color;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#4A4A4C';
                      e.currentTarget.style.borderColor = app.color + '20';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <app.icon
                      size={16}
                      style={{ color: app.color }}
                    />
                    <span>{app.name}</span>
                    <FaExternalLinkAlt
                      size={12}
                      style={{ 
                        marginLeft: 'auto',
                        color: '#CCCCCC'
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginBottom: '20px'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'About Us', link: '/about' },
                { name: 'Contact Us', link: '/contact' },
                { name: 'Privacy Policy', link: '/privacy' },
                { name: 'Terms & Conditions', link: '/terms' },
                { name: 'FAQ', link: '/faq' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link
                    to={item.link}
                    style={{
                      color: '#CCCCCC',
                      textDecoration: 'none',
                      fontSize: '16px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#FFD814'}
                    onMouseOut={(e) => e.target.style.color = '#CCCCCC'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginBottom: '20px'
            }}>
              Categories
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Electronics', link: '/products?category=Electronics' },
                { name: 'Fashion', link: '/products?category=Fashion' },
                { name: 'Home & Living', link: '/products?category=Home & Living' },
                { name: 'Books', link: '/products?category=Books' },
                { name: 'Sports', link: '/products?category=Sports' }
              ].map((category, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link
                    to={category.link}
                    style={{
                      color: '#CCCCCC',
                      textDecoration: 'none',
                      fontSize: '16px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#FFD814'}
                    onMouseOut={(e) => e.target.style.color = '#CCCCCC'}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginBottom: '20px'
            }}>
              Contact Info
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                {
                  icon: FaMapMarkerAlt,
                  text: '123 Trade Street, Business District, City 400001',
                  color: '#FFD814'
                },
                {
                  icon: FaPhone,
                  text: '+91 1800-123-4567',
                  color: '#FFD814'
                },
                {
                  icon: FaEnvelope,
                  text: 'support@tradblome.com',
                  color: '#FFD814'
                },
                {
                  icon: FaClock,
                  text: 'Mon - Sat: 9:00 AM - 8:00 PM',
                  color: '#FFD814'
                }
              ].map((contact, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <contact.icon
                    size={18}
                    style={{
                      color: contact.color,
                      marginTop: '2px',
                      flexShrink: 0
                    }}
                  />
                  <span style={{
                    color: '#CCCCCC',
                    fontSize: '16px',
                    lineHeight: '1.5'
                  }}>
                    {contact.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        borderTop: '1px solid #555555',
        paddingTop: '30px',
        paddingBottom: '30px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Copyright */}
          <div style={{
            color: '#CCCCCC',
            fontSize: '16px'
          }}>
            © 2025 Trade Blo Me. All rights reserved.
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
          }}>
            {[
              { icon: FaShieldAlt, text: 'Secure Payment', color: '#00A652' },
              { icon: FaShippingFast, text: 'Free Shipping', color: '#FFD814' },
              { icon: FaHeadset, text: '24/7 Support', color: '#FF9900' }
            ].map((badge, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <badge.icon
                  size={20}
                  style={{ color: badge.color }}
                />
                <span style={{
                  color: '#CCCCCC',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// //////////////////////////////////////////


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaShieldAlt, FaShippingFast, FaHeadset, FaExternalLinkAlt, FaHeartbeat, FaCreditCard, FaUsers, FaHome, FaUniversity } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer style={{
//       backgroundColor: '#3A3A3C', // Your requested color
//       color: '#FFFFFF',
//       padding: '60px 0 0 0',
//       marginTop: '60px'
//     }}>
//       {/* Main Footer Content */}
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '0 20px'
//       }}>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//           gap: '40px',
//           marginBottom: '40px'
//         }}>
          
//           {/* Brand Section */}
//           <div>
//             <h3 style={{
//               fontSize: '28px',
//               fontWeight: 'bold',
//               color: '#FFFFFF',
//               marginBottom: '20px',
//               fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
//             }}>
//               Trade Blo Me
//             </h3>
//             <p style={{
//               fontSize: '16px',
//               color: '#CCCCCC',
//               lineHeight: '1.6',
//               marginBottom: '30px',
//               maxWidth: '300px'
//             }}>
//               Your trusted e-commerce platform for quality products at amazing prices. Shop with confidence and enjoy our premium service.
//             </p>
            
//             {/* Explore Other Apps Section */}
//             <div>
//               <h4 style={{
//                 fontSize: '18px',
//                 fontWeight: '600',
//                 color: '#FFD814',
//                 marginBottom: '15px'
//               }}>
//                 Explore Other Apps
//               </h4>
              
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '10px'
//               }}>
//                 {[
//                   { 
//                     name: 'Health Card', 
//                     url: 'http://192.168.101.182:8002/mycard/health',
//                     icon: FaHeartbeat,
//                     color: '#FF6B6B'
//                   },
//                   { 
//                     name: 'My Card', 
//                     url: 'http://192.168.101.182:8002/mycard/',
//                     icon: FaCreditCard,
//                     color: '#4ECDC4'
//                   },
//                   { 
//                     name: 'Social Card', 
//                     url: 'http://192.168.101.182:8002/mycard/social',
//                     icon: FaUsers,
//                     color: '#45B7D1'
//                   },
//                   { 
//                     name: 'Home Card', 
//                     url: 'http://192.168.101.182:8002/mycard',
//                     icon: FaHome,
//                     color: '#96CEB4'
//                   },
//                   { 
//                     name: 'Bank Card', 
//                     url: 'http://192.168.101.182:8002/mycard/bank',
//                     icon: FaUniversity,
//                     color: '#FECA57'
//                   }
//                 ].map((app, index) => (
//                   <a
//                     key={index}
//                     href={app.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '10px',
//                       padding: '8px 12px',
//                       backgroundColor: '#4A4A4C',
//                       borderRadius: '6px',
//                       textDecoration: 'none',
//                       color: '#FFFFFF',
//                       fontSize: '14px',
//                       fontWeight: '500',
//                       transition: 'all 0.3s ease',
//                       border: `1px solid ${app.color}20`
//                     }}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.backgroundColor = app.color + '20';
//                       e.currentTarget.style.borderColor = app.color;
//                       e.currentTarget.style.transform = 'translateX(5px)';
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.backgroundColor = '#4A4A4C';
//                       e.currentTarget.style.borderColor = app.color + '20';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }}
//                   >
//                     <app.icon
//                       size={16}
//                       style={{ color: app.color }}
//                     />
//                     <span>{app.name}</span>
//                     <FaExternalLinkAlt
//                       size={12}
//                       style={{ 
//                         marginLeft: 'auto',
//                         color: '#CCCCCC'
//                       }}
//                     />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 style={{
//               fontSize: '20px',
//               fontWeight: '600',
//               color: '#FFFFFF',
//               marginBottom: '20px'
//             }}>
//               Quick Links
//             </h4>
//             <ul style={{
//               listStyle: 'none',
//               padding: 0,
//               margin: 0
//             }}>
//               {[
//                 { name: 'About Us', link: '/about' },
//                 { name: 'Contact Us', link: '/contact' },
//                 { name: 'Privacy Policy', link: '/privacy' },
//                 { name: 'Terms & Conditions', link: '/terms' },
//                 { name: 'FAQ', link: '/faq' }
//               ].map((item, index) => (
//                 <li key={index} style={{ marginBottom: '12px' }}>
//                   <Link
//                     to={item.link}
//                     style={{
//                       color: '#CCCCCC',
//                       textDecoration: 'none',
//                       fontSize: '16px',
//                       transition: 'color 0.3s ease'
//                     }}
//                     onMouseOver={(e) => e.target.style.color = '#FFD814'}
//                     onMouseOut={(e) => e.target.style.color = '#CCCCCC'}
//                   >
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 style={{
//               fontSize: '20px',
//               fontWeight: '600',
//               color: '#FFFFFF',
//               marginBottom: '20px'
//             }}>
//               Categories
//             </h4>
//             <ul style={{
//               listStyle: 'none',
//               padding: 0,
//               margin: 0
//             }}>
//               {[
//                 { name: 'Electronics', link: '/products?category=Electronics' },
//                 { name: 'Fashion', link: '/products?category=Fashion' },
//                 { name: 'Home & Living', link: '/products?category=Home & Living' },
//                 { name: 'Books', link: '/products?category=Books' },
//                 { name: 'Sports', link: '/products?category=Sports' }
//               ].map((category, index) => (
//                 <li key={index} style={{ marginBottom: '12px' }}>
//                   <Link
//                     to={category.link}
//                     style={{
//                       color: '#CCCCCC',
//                       textDecoration: 'none',
//                       fontSize: '16px',
//                       transition: 'color 0.3s ease'
//                     }}
//                     onMouseOver={(e) => e.target.style.color = '#FFD814'}
//                     onMouseOut={(e) => e.target.style.color = '#CCCCCC'}
//                   >
//                     {category.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 style={{
//               fontSize: '20px',
//               fontWeight: '600',
//               color: '#FFFFFF',
//               marginBottom: '20px'
//             }}>
//               Contact Info
//             </h4>
//             <div style={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '16px'
//             }}>
//               {[
//                 {
//                   icon: FaMapMarkerAlt,
//                   text: '123 Trade Street, Business District, City 400001',
//                   color: '#FFD814'
//                 },
//                 {
//                   icon: FaPhone,
//                   text: '+91 1800-123-4567',
//                   color: '#FFD814'
//                 },
//                 {
//                   icon: FaEnvelope,
//                   text: 'support@tradblome.com',
//                   color: '#FFD814'
//                 },
//                 {
//                   icon: FaClock,
//                   text: 'Mon - Sat: 9:00 AM - 8:00 PM',
//                   color: '#FFD814'
//                 }
//               ].map((contact, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}
//                 >
//                   <contact.icon
//                     size={18}
//                     style={{
//                       color: contact.color,
//                       marginTop: '2px',
//                       flexShrink: 0
//                     }}
//                   />
//                   <span style={{
//                     color: '#CCCCCC',
//                     fontSize: '16px',
//                     lineHeight: '1.5'
//                   }}>
//                     {contact.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div style={{
//         borderTop: '1px solid #555555',
//         paddingTop: '30px',
//         paddingBottom: '30px'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '0 20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '20px'
//         }}>
//           {/* Copyright */}
//           <div style={{
//             color: '#CCCCCC',
//             fontSize: '16px'
//           }}>
//             © 2025 Trade Blo Me. All rights reserved.
//           </div>

//           {/* Trust Badges */}
//           <div style={{
//             display: 'flex',
//             gap: '30px',
//             alignItems: 'center'
//           }}>
//             {[
//               { icon: FaShieldAlt, text: 'Secure Payment', color: '#00A652' },
//               { icon: FaShippingFast, text: 'Free Shipping', color: '#FFD814' },
//               { icon: FaHeadset, text: '24/7 Support', color: '#FF9900' }
//             ].map((badge, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px'
//                 }}
//               >
//                 <badge.icon
//                   size={20}
//                   style={{ color: badge.color }}
//                 />
//                 <span style={{
//                   color: '#CCCCCC',
//                   fontSize: '14px',
//                   fontWeight: '600'
//                 }}>
//                   {badge.text}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
