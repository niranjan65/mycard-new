
// import { TrendingUp, HelpCircle, Hospital, CreditCard, Building, LogOut, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';
// import React, { useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const navItems = [
//     { icon: CreditCard, label: "Card Blo Me", path: "/" },
//     { icon: User, label: "Mycard Profile", path: "/profile" },
//     { icon: Hospital, label: "Health Blo Me", path: "/health" },
//     { icon: Building, label: "Bank Blo Me", path: "/bank" },
//     { icon: TrendingUp, label: "Trade Blo Me", path: "/trade" },
//   ];

//   const generalItems = [
//     { icon: Settings, label: "Settings", path: "/settings" },
//     { icon: HelpCircle, label: "Help", path: "/help" },
//     { icon: LogOut, label: "Logout", path: "/logout" },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`${isCollapsed ? 'w-16' : 'w-52'} bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out relative`}>
//       {/* Collapse/Expand Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
//       >
//         {isCollapsed ? (
//           <ChevronRight size={16} className="text-gray-600" />
//         ) : (
//           <ChevronLeft size={16} className="text-gray-600" />
//         )}
//       </button>

//       {/* Logo Section */}
//       <div className="p-6 flex items-center justify-center">
//         {!isCollapsed ? (
//           <img className='h-16' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         ) : (
          
//             <img className='h-8' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
          
//         )}
//       </div>

//       <nav className="mt-6">
//         {/* Menu Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
//         )}
        
//         <div className="space-y-1">
//           {navItems.map((item, idx) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={idx} 
//                 to={item.path} 
//                 className={`flex items-center gap-3 px-6 py-3 group relative
//                   ${isActive 
//                     ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                   }
//                   ${isCollapsed ? 'justify-center' : ''}
//                 `}
//                 title={isCollapsed ? item.label : ''}
//               >
//                 <item.icon size={20} />
//                 {!isCollapsed && <span>{item.label}</span>}
                
//                 {/* Tooltip for collapsed state */}
//                 {isCollapsed && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                     {item.label}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* General Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
//         )}
        
//         <div className={`space-y-1 ${isCollapsed ? 'mt-8' : ''}`}>
//           {generalItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.path}
//               className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 group relative
//                 ${isCollapsed ? 'justify-center' : 'gap-3'}
//               `}
//               title={isCollapsed ? item.label : ''}
//             >
//               <item.icon size={20} />
//               {!isCollapsed && <span>{item.label}</span>}
              
//               {/* Tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   {item.label}
//                 </div>
//               )}
//             </Link>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;











// import { TrendingUp, HelpCircle, Hospital, CreditCard, Building, LogOut, Settings, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// import React, { useState, useEffect } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if screen is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setIsMobileOpen(false);
//       }
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const navItems = [
//     { icon: CreditCard, label: "Card Blo Me", path: "/" },
//     { icon: User, label: "Mycard Profile", path: "/profile" },
//     { icon: Hospital, label: "Health Blo Me", path: "/health" },
//     { icon: Building, label: "Bank Blo Me", path: "/bank" },
//     { icon: TrendingUp, label: "Trade Blo Me", path: "/trade" },
//   ];

//   const generalItems = [
//     { icon: Settings, label: "Settings", path: "/settings" },
//     { icon: HelpCircle, label: "Help", path: "/help" },
//     { icon: LogOut, label: "Logout", path: "/logout" },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (isMobile) {
//       setIsMobileOpen(false);
//     }
//   };

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setIsMobileOpen(!isMobileOpen);
//     } else {
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   const closeMobileSidebar = () => {
//     if (isMobile) {
//       setIsMobileOpen(false);
//     }
//   };

//   // Mobile overlay
//   if (isMobile && isMobileOpen) {
//     return (
//       <>
//         {/* Mobile Overlay */}
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={closeMobileSidebar}
//         />
        
//         {/* Mobile Sidebar */}
//         <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
//           {/* Mobile Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <img className='h-10' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//             <button
//               onClick={closeMobileSidebar}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X size={20} className="text-gray-600" />
//             </button>
//           </div>

//           <nav className="mt-6">
//             {/* Menu Section */}
//             <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
            
//             <div className="space-y-1">
//               {navItems.map((item, idx) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link 
//                     key={idx} 
//                     to={item.path}
//                     onClick={() => handleNavigation(item.path)}
//                     className={`flex items-center gap-3 px-6 py-4 
//                       ${isActive 
//                         ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
//                         : 'text-gray-600 hover:bg-gray-50'
//                       }
//                     `}
//                   >
//                     <item.icon size={20} />
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* General Section */}
//             <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
            
//             <div className="space-y-1">
//               {generalItems.map((item, idx) => (
//                 <Link
//                   key={idx}
//                   to={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium"
//                 >
//                   <item.icon size={20} />
//                   <span>{item.label}</span>
//                 </Link>
//               ))}
//             </div>
//           </nav>
//         </div>
//       </>
//     );
//   }

//   // Desktop Sidebar
//   return (
//     <div className={`hidden md:block ${isCollapsed ? 'w-16' : 'w-52'} bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out relative`}>
//       {/* Collapse/Expand Button - Desktop only */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
//       >
//         {isCollapsed ? (
//           <ChevronRight size={16} className="text-gray-600" />
//         ) : (
//           <ChevronLeft size={16} className="text-gray-600" />
//         )}
//       </button>

//       {/* Logo Section */}
//       <div className="p-6 flex items-center justify-center">
//         {!isCollapsed ? (
//           <img className='h-16' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         ) : (
//           <img className='h-8' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         )}
//       </div>

//       <nav className="mt-6">
//         {/* Menu Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
//         )}
        
//         <div className="space-y-1">
//           {navItems.map((item, idx) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={idx} 
//                 to={item.path} 
//                 className={`flex items-center gap-3 px-6 py-3 group relative
//                   ${isActive 
//                     ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                   }
//                   ${isCollapsed ? 'justify-center' : ''}
//                 `}
//                 title={isCollapsed ? item.label : ''}
//               >
//                 <item.icon size={20} />
//                 {!isCollapsed && <span>{item.label}</span>}
                
//                 {/* Tooltip for collapsed state */}
//                 {isCollapsed && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                     {item.label}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* General Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
//         )}
        
//         <div className={`space-y-1 ${isCollapsed ? 'mt-8' : ''}`}>
//           {generalItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.path}
//               className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 group relative
//                 ${isCollapsed ? 'justify-center' : 'gap-3'}
//               `}
//               title={isCollapsed ? item.label : ''}
//             >
//               <item.icon size={20} />
//               {!isCollapsed && <span>{item.label}</span>}
              
//               {/* Tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   {item.label}
//                 </div>
//               )}
//             </Link>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// // Mobile Navigation Toggle Button Component (to be used in your main layout)
// export const MobileNavToggle = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="md:hidden fixed top-4 left-4 z-30 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
//     >
//       <Menu size={20} className="text-gray-600" />
//     </button>
//   );
// };

// export default Sidebar;










// wallet point balance

// import { useFrappeGetDoc } from 'frappe-react-sdk';
// import Cookies from 'js-cookie';
// import { TrendingUp, HelpCircle, Hospital, CreditCard, Building, LogOut, Settings, User, ChevronLeft, ChevronRight, Coins } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [loyaltyPoints, setLoyaltyPoints] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const current_user = Cookies.get('user_id');
//   console.log("current_user", current_user)
//   const {data} = useFrappeGetDoc("User", current_user);
  
//   const getCustomerFromLbl = async(cbmid) => {
//     const myHeaders = new Headers();
// myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
// myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };

// fetch(`https://lblerp.anantdv.com/api/resource/Customer?filters=[[\"cbm_id\", \"=\", \"${cbmid}\"]]&amp;limit=1`, requestOptions)
//   .then((response) => response.json())
//   .then((result) => {
//     return result?.data[0]?.name;
//   })
//   .catch((error) => console.error(error));
//   }

  
//   const getLoyaltyPoints = async() => {
//     const full_name = Cookies.get('full_name');
    
//     console.log("data", data)

//     let card_blo_me_number = data?.card_blo_me_number
//     let customer_name = await getCustomerFromLbl(card_blo_me_number)

//     console.log("customer_name", customer_name)

    
//     try {
//       setIsLoading(true); 

//       const myHeaders = new Headers();
//       // myHeaders.append("Authorization", "token e0723ce34466cea:55cc01f7742549c");
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//       const raw = JSON.stringify({
//         "party_type": "Customer",
//         "party": customer_name,
//         // "party": "MOSES OTI",
//         "loyalty_program": "Card Blo me Points"
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//         // referrerPolicy: "unsafe-url" 
//       };

//       const response = await fetch("https://lblerp.anantdv.com/api/method/erpnext.accounts.party.get_dashboard_info", requestOptions);
//       const result = await response.json();
      
//       // Update loyalty points with the fetched value or keep 0 if not available
//       console.log(result)
//       const points = result.message[0]?.loyalty_points || 0;
//       setLoyaltyPoints(points);
//       setIsLoading(false); // Set loading to false after successful fetch

//     } catch (error) {
//       console.log("error in loyalty fetch", error);
//       setLoyaltyPoints(0); // Keep 0 in case of error
//       setIsLoading(false); // Set loading to false even on error
//     }
//   }

//   useEffect(() => {
    
//   getLoyaltyPoints()
    
//   }, [data])
  

//   const navItems = [
//     { icon: CreditCard, label: "Social Blo Me", path: "/" },
//     { icon: User, label: "Kad Blo Me", path: "/profile" },
//     { icon: Hospital, label: "Health Blo Me", path: "/health" },
//     { icon: Building, label: "Bank Blo Me", path: "/bank" },
//     { icon: TrendingUp, label: "Trade Blo Me", path: "/trade" },
//   ];

//   const generalItems = [
//     { icon: Settings, label: "Settings", path: "/settings" },
//     { icon: HelpCircle, label: "Help", path: "/help" },
//     { icon: LogOut, label: "Logout", path: "/logout" },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`${isCollapsed ? 'w-16' : 'w-52'} bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out relative`}>
//       {/* Collapse/Expand Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
//       >
//         {isCollapsed ? (
//           <ChevronRight size={16} className="text-gray-600" />
//         ) : (
//           <ChevronLeft size={16} className="text-gray-600" />
//         )}
//       </button>

//       {/* Logo Section */}
//       <div className="p-6 flex items-center justify-center">
//         {!isCollapsed ? (
//           <img className='h-16' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         ) : (
//           <img className='h-8' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         )}
//       </div>

//       {/* Credit Points Section */}
//       <div className={`mx-6 mb-6 ${isCollapsed ? 'mx-2' : ''}`}>
//         {!isCollapsed ? (
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
//             <div className="flex items-center gap-2 mb-1">
//               <Coins size={18} className="text-blue-600" />
//               <span className="text-sm font-medium text-gray-600"> Wallet Points</span>
//             </div>
//             <div className="text-2xl font-bold text-blue-600">
//               {loyaltyPoints}
//             </div>
//             <div className="text-xs text-gray-500 mt-1">Available Balance</div>
//           </div>
//         ) : (
//           <div className="relative group">
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100 flex justify-center">
//               <Coins size={18} className="text-blue-600" />
//             </div>
           
//             <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//               {loyaltyPoints} Credits
//             </div>
//           </div>
//         )}
//       </div>

//       <nav>
//         {/* Menu Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
//         )}
        
//         <div className="space-y-1">
//           {navItems.map((item, idx) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={idx} 
//                 to={item.path} 
//                 className={`flex items-center gap-3 px-6 py-3 group relative
//                   ${isActive 
//                     ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                   }
//                   ${isCollapsed ? 'justify-center' : ''}
//                 `}
//                 title={isCollapsed ? item.label : ''}
//               >
//                 <item.icon size={20} />
//                 {!isCollapsed && <span>{item.label}</span>}
                
//                 {/* Tooltip for collapsed state */}
//                 {isCollapsed && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                     {item.label}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* General Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
//         )}
        
//         <div className={`space-y-1 ${isCollapsed ? 'mt-8' : ''}`}>
//           {generalItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.path}
//               className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 group relative
//                 ${isCollapsed ? 'justify-center' : 'gap-3'}
//               `}
//               title={isCollapsed ? item.label : ''}
//             >
//               <item.icon size={20} />
//               {!isCollapsed && <span>{item.label}</span>}
              
//               {/* Tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   {item.label}
//                 </div>
//               )}
//             </Link>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;














///////9.04.2025/////////////////
// import { useFrappeGetDoc } from 'frappe-react-sdk';
// import Cookies from 'js-cookie';
// import { TrendingUp, HelpCircle, Hospital, CreditCard, Building, LogOut, Settings, User, ChevronLeft, ChevronRight, Coins, School, BookOpenText, GraduationCap } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [loyaltyPoints, setLoyaltyPoints] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const current_user = Cookies.get('user_id');
//   console.log("current_user", current_user)
//   const {data} = useFrappeGetDoc("User", current_user);
  
//   const getCustomerFromLbl = async(cbmid) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
//     // myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow"
//     };

//     try {
//       const response = await fetch(`https://lblerp.anantdv.com/api/resource/Customer?filters=[["cbm_id", "=", "${cbmid}"]]&limit=1`, requestOptions);
//       const result = await response.json();
//       return result?.data?.[0]?.name;
//     } catch (error) {
//       console.error("Error fetching customer:", error);
//       return null;
//     }
//   }

//   const getLoyaltyPoints = async() => {
//     if (!data?.card_blo_me_number) {
//       setIsLoading(false);
//       return;
//     }
    
//     console.log("data", data)

//     let card_blo_me_number = data?.card_blo_me_number
//     let customer_name = await getCustomerFromLbl(card_blo_me_number)

//     console.log("customer_name", customer_name)

//     if (!customer_name) {
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       setIsLoading(true); 

//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
//       myHeaders.append("Content-Type", "application/json");
//       // myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//       const raw = JSON.stringify({
//         "party_type": "Customer",
//         "party": customer_name,
//         "loyalty_program": "Card Blo me Points"
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//       };

//       const response = await fetch("https://lblerp.anantdv.com/api/method/erpnext.accounts.party.get_dashboard_info", requestOptions);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       console.log(result)
//       const points = result?.message?.[0]?.loyalty_points || 0;
//       setLoyaltyPoints(points);

//     } catch (error) {
//       console.log("error in loyalty fetch", error);
//       setLoyaltyPoints(0);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (data) {
//       getLoyaltyPoints();
//     }
//   }, [data])
  
//   const navItems = [
//     { icon: CreditCard, label: "Social Blo Me", path: "/social_media" },
//     { icon: User, label: "Kad Blo Me", path: "/" },
//     { icon: Hospital, label: "Health Blo Me", path: "/health" },
//     { icon: Building, label: "Bank Blo Me", path: "/bank" },
//     { icon: TrendingUp, label: "Trade Blo Me", path: "/trade" },
//     { icon: School, label: "Academy Blo Me", path: "/academy" },
//     { icon: BookOpenText, label: "Legal Blo Me", path: "/legal" },
//     { icon: GraduationCap, label: "Career Me", path: "/career" },
//   ];

//   const generalItems = [
//     { icon: Settings, label: "Settings", path: "/settings" },
//     { icon: HelpCircle, label: "Help", path: "/help" },
//     { icon: LogOut, label: "Logout", path: "/logout" },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleNavClick = (item) => (e) => {
//     if (
//       item.path === "/social_media" &&
//       (!data?.card_blo_me_number || data.card_blo_me_number === "")
//     ) {
//       e.preventDefault();
//       navigate("/");
//       return;
//     }
//     navigate(item.path);
//   };

//   return (
//     <div className={`${isCollapsed ? 'w-16' : 'w-52'} bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out relative`}>
//       {/* Collapse/Expand Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
//       >
//         {isCollapsed ? (
//           <ChevronRight size={16} className="text-gray-600" />
//         ) : (
//           <ChevronLeft size={16} className="text-gray-600" />
//         )}
//       </button>

//       {/* Logo Section */}
//       <div className="p-6 flex items-center justify-center">
//         {!isCollapsed ? (
//           <img className='h-16' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         ) : (
//           <img className='h-8' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
//         )}
//       </div>

//       {/* Credit Points Section */}
//       <div className={`mx-6 mb-6 ${isCollapsed ? 'mx-2' : ''}`}>
//         {!isCollapsed ? (
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
//             <p className='text-center text-xl font-bold text-blue-600'>{ data?.card_blo_me_number || ''}</p>
//             <div className="flex items-center gap-2 mb-1">
//               <Coins size={18} className="text-blue-600" />
//               <span className="text-sm font-medium text-gray-600">Wallet Points</span>
//             </div>
//             <div className="text-2xl font-bold text-blue-600">
//               {isLoading ? '...' : loyaltyPoints}
//             </div>
//             <div className="text-xs text-gray-500 mt-1 cursor-pointer">Available Balance</div>
//           </div>
//         ) : (
//           <div className="relative group">
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100 flex justify-center">
//               <Coins size={18} className="text-blue-600" />
//             </div>
           
//             <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//               {isLoading ? '...' : `${loyaltyPoints} Credits`}
//             </div>
//           </div>
//         )}
//       </div>

//       <nav>
//         {/* Menu Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
//         )}
        
//         <div className="space-y-1">
//           {navItems.map((item, idx) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={idx} 
//                 to={item.path} 
//                 onClick={handleNavClick(item)}
//                 className={`flex items-center gap-3 px-6 py-3 group relative
//                   ${isActive 
//                     ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                   }
//                   ${isCollapsed ? 'justify-center' : ''}
//                 `}
//                 title={isCollapsed ? item.label : ''}
//               >
//                 <item.icon size={20} />
//                 {!isCollapsed && <span>{item.label}</span>}
                
//                 {/* Tooltip for collapsed state */}
//                 {isCollapsed && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                     {item.label}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* General Section */}
//         {!isCollapsed && (
//           <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
//         )}
        
//         <div className={`space-y-1 ${isCollapsed ? 'mt-8' : ''}`}>
//           {generalItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.path}
//               className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 group relative
//                 ${isCollapsed ? 'justify-center' : 'gap-3'}
//               `}
//               title={isCollapsed ? item.label : ''}
//             >
//               <item.icon size={20} />
//               {!isCollapsed && <span>{item.label}</span>}
              
//               {/* Tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                   {item.label}
//                 </div>
//               )}
//             </Link>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;




// Sidebar.js - Complete code with patient checking functionality

import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import Cookies from 'js-cookie';
import { TrendingUp, HelpCircle, Hospital, CreditCard, Building, LogOut, Settings, User, ChevronLeft, ChevronRight, Coins, School, BookOpenText, GraduationCap } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Patient checking states
  const [patientExists, setPatientExists] = useState(null);
  const [isCheckingPatient, setIsCheckingPatient] = useState(false);
  
  const current_user = Cookies.get('user_id');
  console.log("current_user", current_user)
  
  const {data} = useFrappeGetDoc("User", current_user);
  
  // Check if patient exists for current user
  const { data: patientData, isLoading: patientLoading } = useFrappeGetDocList("Patient", {
    fields: ["name", "patient_name", "email"],
    filters: [["email", "=", current_user]], // using your existing current_user
    limit_page_length: 1,
  });

  // Update patient existence when data changes
  useEffect(() => {
    if (!patientLoading) {
      setPatientExists(patientData && patientData.length > 0);
      setIsCheckingPatient(false);
    } else {
      setIsCheckingPatient(true);
    }
  }, [patientData, patientLoading]);
  
  const getCustomerFromLbl = async(cbmid) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    try {
      const response = await fetch(`https://lblerp.anantdv.com/api/resource/Customer?filters=[["cbm_id", "=", "${cbmid}"]]&limit=1`, requestOptions);
      const result = await response.json();
      return result?.data?.[0]?.name;
    } catch (error) {
      console.error("Error fetching customer:", error);
      return null;
    }
  }
  
  const getLoyaltyPoints = async() => {
    if (!data?.card_blo_me_number) {
      setIsLoading(false);
      return;
    }
    
    console.log("data", data)
    let card_blo_me_number = data?.card_blo_me_number
    let customer_name = await getCustomerFromLbl(card_blo_me_number)
    console.log("customer_name", customer_name)
    
    if (!customer_name) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true); 
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "party_type": "Customer",
        "party": customer_name,
        "loyalty_program": "Card Blo me Points"
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      const response = await fetch("https://lblerp.anantdv.com/api/method/erpnext.accounts.party.get_dashboard_info", requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log(result)
      const points = result?.message?.[0]?.loyalty_points || 0;
      setLoyaltyPoints(points);
    } catch (error) {
      console.log("error in loyalty fetch", error);
      setLoyaltyPoints(0);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (data) {
      getLoyaltyPoints();
    }
  }, [data])
  
  const navItems = [
    { icon: CreditCard, label: "Social Blo Me", path: "/social_media" },
    { icon: User, label: "Kad Blo Me", path: "/" },
    { icon: Hospital, label: "Health Blo Me", path: "/health" },
    { icon: Building, label: "Bank Blo Me", path: "/bank" },
    { icon: TrendingUp, label: "Trade Blo Me", path: "/trade" },
    { icon: School, label: "Academy Blo Me", path: "/academy" },
    { icon: BookOpenText, label: "Legal Blo Me", path: "/legal" },
    { icon: GraduationCap, label: "Career Me", path: "/career" },
  ];
  
  const generalItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help", path: "/help" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleNavClick = (item) => (e) => {
    if (
      item.path === "/social_media" &&
      (!data?.card_blo_me_number || data.card_blo_me_number === "")
    ) {
      e.preventDefault();
      navigate("/");
      return;
    }

    // Health Blo Me patient check
    if (item.path === "/health") {
      e.preventDefault();
      
      if (isCheckingPatient) {
        // Still checking, don't navigate yet
        return;
      }
      
      if (!patientExists) {
        // No patient found, go to patient not found page
        navigate("/patient-not-found");
        return;
      }
      
      // Patient exists, proceed to health page
      navigate(item.path);
      return;
    }

    navigate(item.path);
  };
  
  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-52'} bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out relative`}>
      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-gray-600" />
        ) : (
          <ChevronLeft size={16} className="text-gray-600" />
        )}
      </button>
      
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center">
        {!isCollapsed ? (
          <img className='h-16' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
        ) : (
          <img className='h-8' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
        )}
      </div>
      
      {/* Credit Points Section */}
      <div className={`mx-6 mb-6 ${isCollapsed ? 'mx-2' : ''}`}>
        {!isCollapsed ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <p className='text-center text-xl font-bold text-blue-600'>{data?.card_blo_me_number || ''}</p>
            <div className="flex items-center gap-2 mb-1">
              <Coins size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Wallet Points</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {isLoading ? '...' : loyaltyPoints}
            </div>
            <div className="text-xs text-gray-500 mt-1 cursor-pointer">Available Balance</div>
          </div>
        ) : (
          <div className="relative group">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100 flex justify-center">
              <Coins size={18} className="text-blue-600" />
            </div>
           
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {isLoading ? '...' : `${loyaltyPoints} Credits`}
            </div>
          </div>
        )}
      </div>
      
      <nav>
        {/* Menu Section */}
        {!isCollapsed && (
          <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
        )}
        
        <div className="space-y-1">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const isHealthItem = item.path === "/health";
            const showHealthLoading = isHealthItem && isCheckingPatient;
            
            return (
              <Link 
                key={idx} 
                to={item.path} 
                onClick={handleNavClick(item)}
                className={`flex items-center gap-3 px-6 py-3 group relative
                  ${isActive 
                    ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                  ${showHealthLoading ? 'opacity-60 cursor-wait' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <span className="flex items-center gap-2">
                    {item.label}
                    {showHealthLoading && (
                      <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {showHealthLoading && " (Checking...)"}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* General Section */}
        {!isCollapsed && (
          <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
        )}
        
        <div className={`space-y-1 ${isCollapsed ? 'mt-8' : ''}`}>
          {generalItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 group relative
                ${isCollapsed ? 'justify-center' : 'gap-3'}
              `}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;