// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
// import { COLORS } from '../constants/colors';

// const Footer = () => {
//   return (
//     <footer style={{
//       background: COLORS.primary, // #231F20 - Deep Charcoal
//       color: COLORS.white,
//       padding: '60px 0 20px 0'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '0 20px'
//       }}>
//         {/* Main Footer Content */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//           gap: '40px',
//           marginBottom: '40px'
//         }}>
//           {/* Company Info */}
//           <div>
//             <h3 style={{
//               fontSize: '24px',
//               fontWeight: 'bold',
//               marginBottom: '16px',
//               color: COLORS.white // White text
//             }}>
//               Trade Blo Me
//             </h3>
//             <p style={{
//               color: COLORS.lightGray, // #EAEAEA - Light gray text
//               lineHeight: '1.6',
//               marginBottom: '20px',
//               opacity: 0.9
//             }}>
//               Your trusted e-commerce platform for quality products at amazing prices. 
//               Shop with confidence and enjoy our premium service.
//             </p>
//             <div style={{
//               display: 'flex',
//               gap: '16px'
//             }}>
//               <a href="#" style={{ color: COLORS.secondary, fontSize: '24px', transition: 'color 0.3s ease' }}>
//                 <FaFacebook />
//               </a>
//               <a href="#" style={{ color: COLORS.secondary, fontSize: '24px', transition: 'color 0.3s ease' }}>
//                 <FaTwitter />
//               </a>
//               <a href="#" style={{ color: COLORS.secondary, fontSize: '24px', transition: 'color 0.3s ease' }}>
//                 <FaInstagram />
//               </a>
//               <a href="#" style={{ color: COLORS.secondary, fontSize: '24px', transition: 'color 0.3s ease' }}>
//                 <FaLinkedin />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 style={{
//               fontSize: '18px',
//               fontWeight: 'bold',
//               marginBottom: '16px',
//               color: COLORS.white // White heading
//             }}>
//               Quick Links
//             </h4>
//             <ul style={{
//               listStyle: 'none',
//               padding: '0',
//               margin: '0'
//             }}>
//               {[
//                 { label: 'About Us', path: '/about' },
//                 { label: 'Contact Us', path: '/contact' },
//                 { label: 'Privacy Policy', path: '/privacy' },
//                 { label: 'Terms & Conditions', path: '/terms' },
//                 { label: 'FAQ', path: '/faq' }
//               ].map((link, index) => (
//                 <li key={index} style={{ marginBottom: '8px' }}>
//                   <Link to={link.path} style={{
//                     color: COLORS.lightGray, // #EAEAEA - Light gray links
//                     textDecoration: 'none',
//                     transition: 'color 0.3s ease',
//                     opacity: 0.9
//                   }}
//                   onMouseOver={(e) => e.target.style.color = COLORS.secondary} // Gold hover
//                   onMouseOut={(e) => e.target.style.color = COLORS.lightGray}
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 style={{
//               fontSize: '18px',
//               fontWeight: 'bold',
//               marginBottom: '16px',
//               color: COLORS.white // White heading
//             }}>
//               Categories
//             </h4>
//             <ul style={{
//               listStyle: 'none',
//               padding: '0',
//               margin: '0'
//             }}>
//               {[
//                 { label: 'Electronics', path: '/products?category=Electronics' },
//                 { label: 'Fashion', path: '/products?category=Fashion' },
//                 { label: 'Home & Living', path: '/products?category=Home' },
//                 { label: 'Books', path: '/products?category=Books' },
//                 { label: 'Sports', path: '/products?category=Sports' }
//               ].map((category, index) => (
//                 <li key={index} style={{ marginBottom: '8px' }}>
//                   <Link to={category.path} style={{
//                     color: COLORS.lightGray, // #EAEAEA - Light gray links
//                     textDecoration: 'none',
//                     transition: 'color 0.3s ease',
//                     opacity: 0.9
//                   }}
//                   onMouseOver={(e) => e.target.style.color = COLORS.secondary} // Gold hover
//                   onMouseOut={(e) => e.target.style.color = COLORS.lightGray}
//                   >
//                     {category.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 style={{
//               fontSize: '18px',
//               fontWeight: 'bold',
//               marginBottom: '16px',
//               color: COLORS.white // White heading
//             }}>
//               Contact Info
//             </h4>
//             <div style={{
//               color: COLORS.lightGray, // #EAEAEA - Light gray text
//               lineHeight: '1.6'
//             }}>
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 marginBottom: '12px',
//                 opacity: 0.9
//               }}>
//                 <FaMapMarkerAlt style={{ marginRight: '12px', color: COLORS.secondary }} />
//                 <span>123 Trade Street, Business District, City 400001</span>
//               </div>
              
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 marginBottom: '12px',
//                 opacity: 0.9
//               }}>
//                 <FaPhone style={{ marginRight: '12px', color: COLORS.secondary }} />
//                 <span>+91 1800-123-4567</span>
//               </div>
              
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 marginBottom: '12px',
//                 opacity: 0.9
//               }}>
//                 <FaEnvelope style={{ marginRight: '12px', color: COLORS.secondary }} />
//                 <span>support@tradblome.com</span>
//               </div>
              
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 marginBottom: '0',
//                 opacity: 0.9
//               }}>
//                 <FaClock style={{ marginRight: '12px', color: COLORS.secondary }} />
//                 <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div style={{
//           borderTop: `1px solid rgba(234, 234, 234, 0.2)`, // Subtle border
//           paddingTop: '20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '16px'
//         }}>
//           <p style={{
//             margin: '0',
//             color: COLORS.lightGray, // #EAEAEA - Light gray
//             fontSize: '14px',
//             opacity: 0.8
//           }}>
//             © 2025 Trade Blo Me. All rights reserved.
//           </p>
//           <div style={{
//             display: 'flex',
//             gap: '20px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: COLORS.secondary, fontWeight: '600' }}>Secure Payment</span>
//             <span style={{ color: COLORS.secondary, fontWeight: '600' }}>Free Shipping</span>
//             <span style={{ color: COLORS.secondary, fontWeight: '600' }}>24/7 Support</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

///////////////////////////////////////////////////////////////////////


import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaShieldAlt, FaShippingFast, FaHeadset } from 'react-icons/fa';

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
            
            {/* Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              {[
                { icon: FaFacebookF, color: '#1877F2' },
                { icon: FaTwitter, color: '#1DA1F2' },
                { icon: FaInstagram, color: '#E4405F' },
                { icon: FaLinkedinIn, color: '#0A66C2' }
              ].map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: color,
                    borderRadius: '50%',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, opacity 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.opacity = '0.8';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.opacity = '1';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
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
