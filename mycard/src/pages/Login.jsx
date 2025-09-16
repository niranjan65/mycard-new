// import React, { useState } from 'react';
// import logo from '@/assets/new-logo.png';
// import { useFrappeAuth } from 'frappe-react-sdk';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const { login, loading } = useFrappeAuth();
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const navigate = useNavigate()

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = () => {
//     setRememberMe(!rememberMe);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     console.log("Handle login", credentials.email, credentials.password)
    
//     try {
//       await login(credentials.email, credentials.password);
//       // On successful login, you might want to redirect the user
//       // window.location.href = '/dashboard';
//       navigate('/')
//     } catch (error) {
//       console.error("Login failed:", error);
//       setErrorMessage('Invalid email or password. Please try again.');
//     }
//   };

//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
//         <a href="#" className="flex items-center mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
//           <img className="h-32 mr-2" src={logo} alt="logo" />
//         </a>
        
//         <div className="w-full bg-white rounded-2xl shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
//                 Welcome Back
//               </h1>
//               <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                 Sign in to access your account
//               </p>
//             </div>
            
//             {errorMessage && (
//               <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
//                 {errorMessage}
//               </div>
//             )}
            
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={credentials.email}
//                     onChange={handleInputChange}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={credentials.password}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="remember"
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={handleCheckboxChange}
//                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
//                   </div>
//                 </div>
//                 <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
              
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
//                 Don't have an account yet? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
//               </p>
//             </form>
//           </div>
//         </div>
        
//         <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
//           © 2025 Your Company. All rights reserved.
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import logo from '@/assets/new-logo.png';
// import { useFrappeAuth } from 'frappe-react-sdk';
// import { Eye, EyeOff } from 'lucide-react';

// const Login = () => {
//   const { login, loading } = useFrappeAuth();
//   const [credentials, setCredentials] = useState({
//     usr: '', 
//     pwd: ''  
//   });
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isVisiblePassword, setIsVisiblePassword] = useState(false)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = () => {
//     setRememberMe(!rememberMe);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
    
//     try {
      
//       // await login({username, password}).then((res) => console.log("RESPONSE.........", res));

//       // fetch('http://192.168.101.182:8002/api/method/login', {
//       fetch('http://127.0.0.1:8080/api/method/erpnext.config.allow_login.login', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         username: username,
//         password: password
//     }),
//     credentials: 'same-origin',
// })
// .then(r => r.json())
// .then(r => {
//     console.log("r message",r);
// })

      
//       window.location.href = '/mycard'; 
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Extract the error message from the Frappe error response
//       const errorMsg = error?.message || 'Invalid email or password. Please try again.';
//       setErrorMessage(errorMsg);
//     }
//   };



//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
//         <a href="#" className="flex items-center mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
//           <img className="h-32 mr-2" src={logo} alt="logo" />
//         </a>
        
//         <div className="w-full bg-white rounded-2xl shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
//                 Welcome Back
//               </h1>
//               <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                 Sign in to access your account
//               </p>
//             </div>
            
//             {errorMessage && (
//               <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
//                 {errorMessage}
//               </div>
//             )}
            
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="usr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="usr" 
//                     id="usr"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label htmlFor="pwd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                     </svg>
//                   </div>
//                   <input
//                     type={isVisiblePassword ? "text" : "password"}
//                     name="pwd" 
//                     id="pwd"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required
//                   />
//                   <div onClick={() => setIsVisiblePassword((pass) => !pass)} className="absolute cursor-pointer inset-y-0 right-4 flex items-center pl-3 ">
//                     {
//                       isVisiblePassword 
//                       ? <EyeOff className='text-gray-500 cursor-pointer' />
//                       : <Eye className='text-gray-500 cursor-pointer' />
//                     }
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="remember"
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={handleCheckboxChange}
//                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
//                   </div>
//                 </div>
//                 <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
              
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
//                 Don't have an account yet? <a href="/mycard/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
//               </p>
//             </form>
//           </div>
//         </div>
        
//         <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
//           © 2025 Mycard. All rights reserved.
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;












import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/new-logo.png";
import { useFrappeAuth } from "frappe-react-sdk";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useFrappeAuth();
  const dispatch = useDispatch();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate()

  const { user, loading: userLoading, error: userError } = useSelector(
    (state) => state.user 
  );

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (shouldRedirect && user && !userLoading && !userError) {
      // window.location.href = '/mycard';
      navigate('/')
    } else if (shouldRedirect && userError) {
      setError("Failed to fetch user data");
      setShouldRedirect(false);
      setLoading(false);
    }
  }, [user, userLoading, userError, shouldRedirect]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (form.username === "" || form.password === "") {
        throw new Error("Please fill in all fields");
      }

      // Step 1: Login to Frappe
      const loginResult = await login(form);
      
      if (loginResult?.message === "Logged In") {
        // Step 2: Dispatch fetchUser
        dispatch(fetchUser(form.username));
        // Set flag to redirect once user data is loaded
        console.log("login success, fetching user data...");
        setTimeout(() => {
            // window.location.href = '/mycard';
            navigate('/')
          }, 100);
        setShouldRedirect(true);
      } else {
        throw new Error(loginResult?.message || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   try {
  //     // Simulate API call delay
  //     // await new Promise((resolve) => setTimeout(resolve, 2000));
  //     if (form.username === "" || form.password === "") throw new Error("Please fill in all fields");
  //     // alert("Login success for " + form.username);
  //     await login(form).then((res) => {
  //       if(res?.message === "Logged In") {
  //         dispatch(fetchUser(form.username));
  //         window.location.href = '/mycard';
  //       } else {
  //         throw new Error(res?.message || "Login failed");
  //       }
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Morphing blobs with transparent background */}
      <motion.div
        className="absolute top-[-12%] left-[-10%] w-[360px] h-[360px] bg-blue-600 opacity-[0.12] morphing-blob blur-[110px] z-0"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] right-[-10%] w-[400px] h-[400px] bg-blue-700 opacity-[0.15] morphing-blob blur-[120px] z-0"
        animate={{ scale: [1, 0.95, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />

      {/* Glassmorphic animated card with white bg */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 p-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-blue-200"
      >
        <motion.img
          src={logo}
          alt="Logo"
          className="mx-auto mb-6 h-14 rounded-full glow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        />
        <motion.h2
          className="font-bold text-3xl text-blue-700 text-center mb-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          Welcome Back!
        </motion.h2>
        <p className="text-blue-400 text-center mb-8">
          Sign in to your account
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.59, type: "spring" }}
          >
            <label
              htmlFor="username"
              className="text-sm font-semibold text-blue-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-300" />
              <input
                id="username"
                name="username"
                type="email"
                autoComplete="email"
                value={form.username}
                onChange={onChange}
                disabled={loading}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-blue-900 shadow-sm focus:shadow-lg transition-all duration-300 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.69, type: "spring" }}
          >
            <label
              htmlFor="password"
              className="text-sm font-semibold text-blue-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-blue-300" />
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={onChange}
                disabled={loading}
                required
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-white border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-blue-900 shadow-sm focus:shadow-lg transition-all duration-300 outline-none"
                placeholder="********"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="absolute right-2 top-3 text-blue-500 hover:text-blue-700"
                onClick={() => setShowPwd((v) => !v)}
                disabled={loading}
              >
                {showPwd ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </motion.div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-900 font-bold text-white text-lg shadow-lg transition-all duration-300 flex justify-center items-center ${
              loading ? "cursor-not-allowed opacity-70" : "hover:scale-105"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {error && (
          <p className="mt-4 p-2 text-red-600 bg-red-50 rounded-lg">{error}</p>
        )}

        <p className="text-sm text-blue-500 text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/mycard/signup"
            className="font-bold text-blue-700 hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
