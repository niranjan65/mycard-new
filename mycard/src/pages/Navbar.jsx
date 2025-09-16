// import React, { useState, useRef, useEffect } from 'react';
// import { Search, Home, Bell, MessageSquare, LogOut, Edit3, Grid, Menu, X, ChevronDown } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { useFrappeAuth } from 'frappe-react-sdk';
// // import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   // Mock data for demo - replace with your actual data
//   const value = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face";
//   const userImage = Cookies.get('user_image') || '';
//   const user_name = Cookies.get('full_name');
//   const currentUser = Cookies.get('user_id');

//   const {logout} = useFrappeAuth()
  
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showAppMenu, setShowAppMenu] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const profileMenuRef = useRef(null);
//   const appMenuRef = useRef(null);
//   const mobileMenuRef = useRef(null);
//   // const navigate = useNavigate();

//   // Close menus when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setShowProfileMenu(false);
//       }
//       if (appMenuRef.current && !appMenuRef.current.contains(event.target)) {
//         setShowAppMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);
  
//   const toggleProfileMenu = () => {
//     setShowProfileMenu(!showProfileMenu);
//     setShowAppMenu(false);
//   };
  
//   const toggleAppMenu = () => {
//     setShowAppMenu(!showAppMenu);
//     setShowProfileMenu(false);
//   };

//   const toggleMobileMenu = () => {
//     setShowMobileMenu(!showMobileMenu);
//   };

//   const toggleSearchBar = () => {
//     setShowSearchBar(!showSearchBar);
//   };

//   const handleLogout = () => {
//     console.log('Logging out...');
//     // Your logout logic here
//     logout()
//     window.location.href = '/mycard/login';
//   };

//   const getInitials = () => {
//     if (user_name) {
//       return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
//     }
//     return 'U';
//   };

//   return (
//     <>
//       {/* Glass morphism navbar */}
//       <div className="">
//         <div className="max-w-7xl mx-auto">
//           <nav className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/30 shadow-2xl shadow-black/5 rounded-2xl">
            
//             {/* Desktop Layout */}
//             <div className="hidden lg:flex items-center justify-between px-6 py-4">
//               {/* Logo */}
//               <div className="flex items-center space-x-8">
                

//                 {/* Enhanced Search Bar */}
//                 <div className="relative group">
//                   <div className={`flex items-center transition-all duration-300 ${
//                     searchFocused 
//                       ? 'bg-white dark:bg-gray-800 shadow-lg shadow-blue-500/20 border-blue-500/50' 
//                       : 'bg-gray-50/80 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-white hover:shadow-md'
//                   } border rounded-xl`}>
//                     <Search className={`w-5 h-5 ml-4 transition-colors duration-200 ${
//                       searchFocused ? 'text-blue-500' : 'text-gray-400'
//                     }`} />
//                     <input 
//                       type="text" 
//                       placeholder="Search anything..."
//                       className="w-80 px-4 py-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500"
//                       onFocus={() => setSearchFocused(true)}
//                       onBlur={() => setSearchFocused(false)}
//                     />
//                     <div className="mr-4 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
//                       <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">⌘K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Right section */}
//               <div className="flex items-center space-x-2">
//                 {/* Navigation Icons */}
//                 <div className="flex items-center space-x-1">
//                   {/* Home */}
//                   <a href="/mycard" className="group relative p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200">
//                     <Home size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
//                     <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md whitespace-nowrap">
//                       Home
//                     </span>
//                   </a>

//                   {/* Notifications */}
//                   <button className="group relative p-3 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all duration-200">
//                     <Bell size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
//                     <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-lg">
//                       3
//                     </span>
//                     <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md whitespace-nowrap">
//                       Notifications
//                     </span>
//                   </button>

//                   {/* Messages */}
//                   <button 
//                     onClick={() => window.location.href = '/chat'} 
//                     className="group relative p-3 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200"
//                   >
//                     <MessageSquare size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
//                     <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md whitespace-nowrap">
//                       Messages
//                     </span>
//                   </button>
//                 </div>

//                 {/* Divider */}
//                 <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

//                 {/* Apps Menu */}
//                 <div className="relative" ref={appMenuRef}>
//                   <button 
//                     onClick={toggleAppMenu} 
//                     className={`group relative p-3 rounded-xl transition-all duration-200 ${
//                       showAppMenu 
//                         ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
//                         : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
//                     }`}
//                   >
//                     <Grid size={20} className="transition-colors" />
//                     <ChevronDown size={12} className={`absolute -bottom-1 -right-1 transition-transform ${showAppMenu ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {/* Apps Dropdown */}
//                   {showAppMenu && (
//                     <div className="absolute top-full right-0 mt-3 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 py-3 animate-in slide-in-from-top-2 duration-200 z-50">
//                       <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
//                         <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Applications</h3>
//                       </div>
                      
//                       <a 
//                         href="/app" 
//                         target='_blank'
//                         className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
//                       >
//                         <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
//                           <span className="text-white font-bold text-sm">F</span>
//                         </div>
//                         <div>
//                           <span className="font-medium">Frappe</span>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">Framework</p>
//                         </div>
//                       </a>
                      
//                       <a 
//                         href="/raven"
//                         target='_blank'
//                         className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
//                       >
//                         <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
//                           <span className="text-white font-bold text-sm">R</span>
//                         </div>
//                         <div>
//                           <span className="font-medium">Raven</span>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">Chat App</p>
//                         </div>
//                       </a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Profile Menu */}
//                 <div className="relative" ref={profileMenuRef}>
//                   <button 
//                     className={`flex items-center space-x-3 p-2 pr-3 rounded-xl transition-all duration-200 ${
//                       showProfileMenu 
//                         ? 'bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
//                         : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
//                     }`}
//                     onClick={toggleProfileMenu}
//                   >
//                     {userImage ? (
//                       <div className="w-9 h-9 overflow-hidden rounded-xl border-2 border-white shadow-lg">
//                         <img src={userImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"} alt="Profile" className="w-full h-full object-cover" />
//                       </div>
//                     ) : (
//                       <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
//                         {getInitials()}
//                       </div>
//                     )}
//                     <div className="hidden xl:block text-left">
//                       <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{user_name}</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Online</p>
//                     </div>
//                     <ChevronDown size={16} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {/* Profile Dropdown */}
//                   {showProfileMenu && (
//                     <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 py-3 animate-in slide-in-from-top-2 duration-200">
//                       {/* Profile Header */}
//                       <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
//                         <div className="flex items-center space-x-4">
//                           {userImage ? (
//                             <div className="w-14 h-14 overflow-hidden rounded-2xl border-3 border-white shadow-xl">
//                               <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
//                             </div>
//                           ) : (
//                             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-xl">
//                               {getInitials()}
//                             </div>
//                           )}
//                           <div>
//                             <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user_name}</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser}</p>
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 mt-1">
//                               <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
//                               Online
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Menu Items */}
//                       <div className="py-2">
//                         <a 
//                           href="/mycard/edit-profile" 
//                           className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
//                         >
//                           <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
//                             <Edit3 size={18} className="text-blue-600 dark:text-blue-400" />
//                           </div>
//                           <div>
//                             <span className="font-medium">Edit Profile</span>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
//                           </div>
//                         </a>
                        
//                         <button 
//                           onClick={handleLogout}
//                           className="flex items-center w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
//                         >
//                           <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
//                             <LogOut size={18} className="text-red-600 dark:text-red-400" />
//                           </div>
//                           <div>
//                             <span className="font-medium">Sign out</span>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
//                           </div>
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Layout */}
//             <div className="flex lg:hidden items-center justify-between px-4 py-3">
//               {/* Mobile Menu Button */}
//               <button 
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" 
//                 onClick={toggleMobileMenu}
//               >
//                 <Menu size={24} className="text-gray-700 dark:text-gray-300" />
//               </button>

//               {/* Logo */}
//               <div className="flex items-center space-x-2">
//                 {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">M</span>
//                 </div>
//                 <span className="font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                   MyCard
//                 </span> */}
//               </div>

//               {/* Mobile Right Actions */}
//               <div className="flex items-center space-x-1">
//                 <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" onClick={toggleSearchBar}>
//                   <Search size={20} className="text-gray-700 dark:text-gray-300" />
//                 </button>
                
//                 <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative">
//                   <Bell size={20} className="text-gray-700 dark:text-gray-300" />
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
//                     3
//                   </span>
//                 </button>

//                 {/* Mobile Profile */}
//                 <button 
//                   className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" 
//                   onClick={toggleProfileMenu}
//                 >
//                   {value ? (
//                     <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
//                       <img src={value} alt="Profile" className="w-full h-full object-cover" />
//                     </div>
//                   ) : (
//                     <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
//                       {getInitials()}
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Search Bar */}
//             {showSearchBar && (
//               <div className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
//                 <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
//                   <Search size={18} className="text-blue-500 ml-4" />
//                   <input 
//                     type="text" 
//                     placeholder="Search anything..." 
//                     className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500" 
//                   />
//                   <button onClick={toggleSearchBar} className="p-2 mr-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
//                     <X size={18} className="text-gray-500" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu Sidebar */}
//       {showMobileMenu && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//             onClick={toggleMobileMenu}
//           />
//           <div 
//             ref={mobileMenuRef}
//             className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 transition-transform animate-in slide-in-from-left duration-300"
//           >
//             {/* Mobile Menu Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white font-bold">M</span>
//                 </div>
//                 <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                   MyCard
//                 </span>
//               </div>
//               <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
//                 <X size={24} className="text-gray-700 dark:text-gray-300" />
//               </button>
//             </div>

//             {/* User Profile Section */}
//             <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//               <div className="flex items-center space-x-4">
//                 {value ? (
//                   <div className="w-16 h-16 overflow-hidden rounded-2xl border-3 border-white shadow-xl">
//                     <img src={value} alt="Profile" className="w-full h-full object-cover" />
//                   </div>
//                 ) : (
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-xl">
//                     {getInitials()}
//                   </div>
//                 )}
//                 <div>
//                   <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user_name}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser}</p>
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 mt-2">
//                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
//                     Online
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Menu */}
//             <div className="py-4">
//               <a href="/mycard" className="flex items-center px-6 py-4 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600">
//                 <Home size={20} className="mr-4" />
//                 <span className="font-medium">Home</span>
//               </a>

//               <button className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <Bell size={20} className="mr-4" />
//                 <span>Notifications</span>
//                 <span className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
//                   3
//                 </span>
//               </button>

//               <button onClick={() => window.location.href = '/chat'} className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <MessageSquare size={20} className="mr-4" />
//                 <span>Messages</span>
//               </button>

//               <button className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <Grid size={20} className="mr-4" />
//                 <span>Applications</span>
//               </button>

//               <a 
//                 href="/mycard/edit-profile" 
//                 className="flex items-center px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
//               >
//                 <Edit3 size={20} className="mr-4 text-blue-600 dark:text-blue-400" />
//                 <span>Edit Profile</span>
//               </a>
              
//               <button 
//                 onClick={handleLogout}
//                 className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
//               >
//                 <LogOut size={20} className="mr-4 text-red-500" />
//                 <span>Sign out</span>
//               </button>
//             </div>
//           </div>
//         </>
//       )}

      
//     </>
//   );
// };

// export default Navbar;











import React, { useState, useRef, useEffect } from 'react';
import { Search, Home, Bell, MessageSquare, LogOut, Edit3, Grid, Menu, X, ChevronDown } from 'lucide-react';
import Cookies from 'js-cookie';
import { useFrappeAuth } from 'frappe-react-sdk';
// import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Mock data for demo - replace with your actual data
  const value = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face";
  const userImage = Cookies.get('user_image') || '';
  const user_name = Cookies.get('full_name');
  const currentUser = Cookies.get('user_id');

  const {logout} = useFrappeAuth()
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileMenuRef = useRef(null);
  const appMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  // const navigate = useNavigate();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (appMenuRef.current && !appMenuRef.current.contains(event.target)) {
        setShowAppMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowAppMenu(false);
  };
  
  const toggleAppMenu = () => {
    setShowAppMenu(!showAppMenu);
    setShowProfileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Your logout logic here
    logout()
    window.location.href = '/mycard/login';
  };

  const getInitials = () => {
    if (user_name) {
      return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      {/* Glass morphism navbar */}
      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <nav className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/30 shadow-2xl shadow-black/5 rounded-2xl relative z-40">
            
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <div className="flex items-center space-x-8">
                

                {/* Enhanced Search Bar */}
                <div className="relative group">
                  <div className={`flex items-center transition-all duration-300 ${
                    searchFocused 
                      ? 'bg-white dark:bg-gray-800 shadow-lg shadow-blue-500/20 border-blue-500/50' 
                      : 'bg-gray-50/80 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-white hover:shadow-md'
                  } border rounded-xl`}>
                    <Search className={`w-5 h-5 ml-4 transition-colors duration-200 ${
                      searchFocused ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type="text" 
                      placeholder="Search anything..."
                      className="w-80 px-4 py-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                    <div className="mr-4 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">⌘K</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right section */}
              <div className="flex items-center space-x-2">
                {/* Navigation Icons */}
                <div className="flex items-center space-x-1">
                  {/* Home */}
                  <a href="/mycard" className="group relative p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200">
                    <Home size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md whitespace-nowrap z-50">
                      Home
                    </span>
                  </a>

                  {/* Notifications */}
                  <button className="group relative p-3 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all duration-200">
                    <Bell size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-lg">
                      3
                    </span>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md whitespace-nowrap z-50">
                      Notifications
                    </span>
                  </button>

                  {/* Messages */}
                  <button 
                    onClick={() => window.location.href = '/chat'} 
                    className="group relative p-3 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200"
                  >
                    <MessageSquare size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded-md whitespace-nowrap z-50">
                      Messages
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

                {/* Apps Menu */}
                <div className="relative" ref={appMenuRef}>
                  <button 
                    onClick={toggleAppMenu} 
                    className={`group relative p-3 rounded-xl transition-all duration-200 ${
                      showAppMenu 
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                        : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    <Grid size={20} className="transition-colors" />
                    <ChevronDown size={12} className={`absolute -bottom-1 -right-1 transition-transform ${showAppMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Apps Dropdown */}
                  {showAppMenu && (
                    <div className="absolute top-full right-0 mt-3 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 py-3 animate-in slide-in-from-top-2 duration-200 z-[60]">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Applications</h3>
                      </div>
                      
                      <a 
                        href="/app" 
                        target='_blank'
                        className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                          <span className="text-white font-bold text-sm">F</span>
                        </div>
                        <div>
                          <span className="font-medium">Frappe</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Framework</p>
                        </div>
                      </a>
                      
                      <a 
                        href="/raven"
                        target='_blank'
                        className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                          <span className="text-white font-bold text-sm">R</span>
                        </div>
                        <div>
                          <span className="font-medium">Raven</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Chat App</p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                {/* Profile Menu */}
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    className={`flex items-center space-x-3 p-2 pr-3 rounded-xl transition-all duration-200 ${
                      showProfileMenu 
                        ? 'bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                    onClick={toggleProfileMenu}
                  >
                    {userImage ? (
                      <div className="w-9 h-9 overflow-hidden rounded-xl border-2 border-white shadow-lg">
                        <img src={userImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {getInitials()}
                      </div>
                    )}
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{user_name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Online</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 py-3 animate-in slide-in-from-top-2 duration-200 z-[60]">
                      {/* Profile Header */}
                      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-4">
                          {userImage ? (
                            <div className="w-14 h-14 overflow-hidden rounded-2xl border-3 border-white shadow-xl">
                              <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-xl">
                              {getInitials()}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user_name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser}</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 mt-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                              Online
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <a 
                          href="/mycard/edit-profile" 
                          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                        >
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                            <Edit3 size={18} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <span className="font-medium">Edit Profile</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
                          </div>
                        </a>
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                        >
                          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                            <LogOut size={18} className="text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <span className="font-medium">Sign out</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex lg:hidden items-center justify-between px-4 py-3">
              {/* Mobile Menu Button */}
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" 
                onClick={toggleMobileMenu}
              >
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  MyCard
                </span> */}
              </div>

              {/* Mobile Right Actions */}
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" onClick={toggleSearchBar}>
                  <Search size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative">
                  <Bell size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    3
                  </span>
                </button>

                {/* Mobile Profile */}
                <button 
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" 
                  onClick={toggleProfileMenu}
                >
                  {value ? (
                    <div className="w-8 h-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <img src={value} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {getInitials()}
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            {showSearchBar && (
              <div className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <Search size={18} className="text-blue-500 ml-4" />
                  <input 
                    type="text" 
                    placeholder="Search anything..." 
                    className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500" 
                  />
                  <button onClick={toggleSearchBar} className="p-2 mr-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMobileMenu}
          />
          <div 
            ref={mobileMenuRef}
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 transition-transform animate-in slide-in-from-left duration-300"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  MyCard
                </span>
              </div>
              <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-4">
                {value ? (
                  <div className="w-16 h-16 overflow-hidden rounded-2xl border-3 border-white shadow-xl">
                    <img src={value} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-xl">
                    {getInitials()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user_name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 mt-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="py-4">
              <a href="/mycard" className="flex items-center px-6 py-4 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600">
                <Home size={20} className="mr-4" />
                <span className="font-medium">Home</span>
              </a>

              <button className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Bell size={20} className="mr-4" />
                <span>Notifications</span>
                <span className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                  3
                </span>
              </button>

              <button onClick={() => window.location.href = '/chat'} className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <MessageSquare size={20} className="mr-4" />
                <span>Messages</span>
              </button>

              <button className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Grid size={20} className="mr-4" />
                <span>Applications</span>
              </button>

              <a 
                href="/mycard/edit-profile" 
                className="flex items-center px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Edit3 size={20} className="mr-4 text-blue-600 dark:text-blue-400" />
                <span>Edit Profile</span>
              </a>
              
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={20} className="mr-4 text-red-500" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </>
      )}

      
    </>
  );
};

export default Navbar;