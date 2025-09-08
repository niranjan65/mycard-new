
import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Button } from './components/ui/button'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Comments from './pages/Comments'
import { Toaster } from 'sonner'
import EditProfile from './pages/EditProfile'
import RavenChatApp from './components/RavenChatApp'
import { CreateChannelButton } from './components/CreateChannelButton'
import ProspectDetailsDisplay from './ProspectDetailsDisplay'
import Dashboard from './pages/Dashboard'
import Sidebar from './pages/Sidebar'
import { Bell, Mail, Search } from 'lucide-react'
import HealthBloMe from './pages/HealthBloMe'
import ERPForm from './ERPForm'
import CardBloMe from './CardBloMe'
import LoyaltyDashboard from './pages/LoyaltyDashboard'
import Cookies from 'js-cookie'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import Footer from './components/Footer'
import Header from './components/Header'
import { COLORS } from './constants/colors'

// const Layout = () => {
//   const currentUser = Cookies.get('user_id');
//   const location = useLocation();

//   console.log('Current Path:', location.pathname);

//   console.log('Current User from App:', currentUser);
//   const showHeaderFooterRoutes = [
//   '/trade',
//   '/products',
//   '/product',
//   '/cart',
//   '/wishlist',
//   '/checkout'
// ];

// const shouldShowHeaderFooter = () => {
//   // Handle dynamic product detail page
//   if (location.pathname.startsWith('/product/')) return true;
//   return showHeaderFooterRoutes.includes(location.pathname);
// };

//   return (
//     <div className="flex-1 overflow-hidden">
//       {/* <Navbar /> */}
//       {location.pathname === '/trade' ? <Header/> : <Navbar />}
      
      // <Routes>
      //   {/* <Route path="/" element={<CardBloMe />} /> */}
      //   <Route
      //     path="/"
      //     element={
      //       <ProtectedRoute user={currentUser}>
      //         <CardBloMe />
      //       </ProtectedRoute>
      //     }
      //   />
      //   {/* <Route path="/social_media" element={<Home />} /> */}
      //   <Route
      //     path="/social_media"
      //     element={
      //       <ProtectedRoute user={currentUser}>
      //         <Home />
      //       </ProtectedRoute>
      //     }
      //   />
      //   <Route path="/profile/:id" element={<ProspectDetailsDisplay />} />
      //   <Route path="/comments/:id" element={<Comments />} />
      //   <Route path="/edit-profile" element={<EditProfile />} />
      //   <Route path="/chat" element={<RavenChatApp />} />
      //   <Route path="/create-channel" element={<CreateChannelButton />} />
      //   {/* <Route path="/health" element={<HealthBloMe />} />
      //   <Route path="/profile" element={<CardBloMe />} /> */}
      //   <Route
      //     path="/profile"
      //     element={
      //       <ProtectedRoute user={currentUser}>
      //         <CardBloMe />
      //       </ProtectedRoute>
      //     }
      //   />
        
      //   {/* <Route path="/loyalty" element={<LoyaltyDashboard />} /> */}
      //   <Route
      //     path="/loyalty"
      //     element={
      //       <ProtectedRoute user={currentUser}>
      //         <LoyaltyDashboard />
      //       </ProtectedRoute>
      //     }
      //   />
      //   <Route
      //     path="/health"
      //     element={
      //       <ProtectedRoute user={currentUser}>
      //         <HealthBloMe />
      //       </ProtectedRoute>
      //     }
      //   />

      //   {/* <div style={{
      //     minHeight: '100vh',
      //     backgroundColor: COLORS.background,
      //     fontFamily: 'Arial, sans-serif'
      //   }}> */}
      //     {/* <Header /> */}
      //     {/* <main style={{ minHeight: 'calc(100vh - 200px)' }}> */}
      //       {/* <Routes> */}
      //         <Route path="/trade" element={<HomePage />} />
      //         <Route path="/products" element={<ProductsPage />} />
      //         <Route path="/product/:id" element={<ProductDetailPage />} />
      //         <Route path="/cart" element={<CartPage />} />
      //         <Route path="/wishlist" element={<WishlistPage />} />
      //         <Route path="/checkout" element={<CheckoutPage />} />
      //       {/* </Routes> */}
      //     {/* </main> */}
      //     {/* <Footer /> */}
      //   {/* </div> */}
      // </Routes>

//       {location.pathname === '/trade' && <Footer/> }
//     </div>
//   );
// };


const Layout = () => {
  
  const location = useLocation();
const currentUser = Cookies.get('user_id');

  // New logic
  const shouldShowHeaderFooter = () => {
    if (location.pathname.startsWith('/product/')) return true;
    return [
      '/trade',
      '/products',
      '/cart',
      '/wishlist',
      '/checkout'
    ].includes(location.pathname);
  };

  return (
    <div className="flex-1 overflow-hidden">
      {shouldShowHeaderFooter() ? <Header /> : <Navbar />}
            <Routes>
        {/* <Route path="/" element={<CardBloMe />} /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={currentUser}>
              <CardBloMe />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/social_media" element={<Home />} /> */}
        <Route
          path="/social_media"
          element={
            <ProtectedRoute user={currentUser}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:id" element={<ProspectDetailsDisplay />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/chat" element={<RavenChatApp />} />
        <Route path="/create-channel" element={<CreateChannelButton />} />
        {/* <Route path="/health" element={<HealthBloMe />} />
        <Route path="/profile" element={<CardBloMe />} /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={currentUser}>
              <CardBloMe />
            </ProtectedRoute>
          }
        />
        
        {/* <Route path="/loyalty" element={<LoyaltyDashboard />} /> */}
        <Route
          path="/loyalty"
          element={
            <ProtectedRoute user={currentUser}>
              <LoyaltyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/health"
          element={
            <ProtectedRoute user={currentUser}>
              <HealthBloMe />
            </ProtectedRoute>
          }
        />

        {/* <div style={{
          minHeight: '100vh',
          backgroundColor: COLORS.background,
          fontFamily: 'Arial, sans-serif'
        }}> */}
          {/* <Header /> */}
          {/* <main style={{ minHeight: 'calc(100vh - 200px)' }}> */}
            {/* <Routes> */}
              <Route path="/trade" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            {/* </Routes> */}
          {/* </main> */}
          {/* <Footer /> */}
        {/* </div> */}
      </Routes>
      {shouldShowHeaderFooter() && <Footer />}
    </div>
  );
};


function App() {
  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Toaster richColors />
        <Routes>
          {/* Auth routes without Sidebar & Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main app layout with Sidebar + Navbar */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen w-screen bg-gray-50 flex p-3">
                <Sidebar />
                <Layout />
              </div>
            }
          />
        </Routes>

        <Toaster richColors />
      </BrowserRouter>
    </FrappeProvider>
  );
}


export default App