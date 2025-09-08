
// import React, { useState } from 'react'
// import logo from '@/assets/new-logo.png'
// import { useFrappeCreateDoc, useFrappeGetDocList } from 'frappe-react-sdk';
// import SuccessModal from '@/components/SuccessModal';
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"


// const Signup = () => {
//     const { createDoc, loading } = useFrappeCreateDoc();
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const [userData, setUserData] = useState({
//         first_name: "",
//         email: "",
//         gender: "",
//         full_name: "",
//         birth_date: "2025-04-02",
//         mobile_no: "",
//         new_password: "",
//         role_profile_name: "User All Access"
//      })


//      const createUser = (docData) => {
//       const myHeaders = new Headers();
// myHeaders.append("Authorization", "token a36acbb78e6712b:d67b02287bbba9a");
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

// console.log("create user",userData)


// const raw = JSON.stringify({
//   "first_name": userData.first_name,
//   "email": userData.email,
//   "gender": userData.gender,
//   "full_name": "",
//   "birth_date": "2025-04-02",
//   "mobile_no": "",
//   "new_password": userData.new_password
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("/api/resource/User", requestOptions)
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
//      }


//     const genderData = ["Prefer not to say", "Non-Conforming", "Genderqueer", "Transgender", "Other", "Female", "Male"]

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         console.log("EMAIL.....", userData)
//         const docData = {
//             first_name: userData.first_name,
//             email: userData.email,
//             gender: userData.gender,
//             full_name: userData.full_name,
//             birth_date: "2025-04-02",
//             mobile_no: userData.mobile_no,
//             new_password: userData.new_password,
//             role_profile_name: "User All Access"
//          };

//          console.log("USER data....", docData)

//         try {
//             // const result = await createDoc("User", docData);
//             if(userData.new_password === userData.confirm_password) {
//               const result = createUser(docData);
//               console.log("result", result)
//               if(result) {
//                 setShowSuccessModal(true)
//               }
//             }
//         } catch (error) {
//             console.error("Error creating user:", error);
            
//         }
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
        
//         setUserData(prev => ({ ...prev, [name]: value }));
//     };

//     // Handle gender selection change
//     const handleGenderChange = (value) => {
//         setUserData(prev => ({ ...prev, gender: value }));
//     };

//     // Close modal and potentially redirect to login
//     const handleCloseModal = () => {
//         setShowSuccessModal(false);
//         // You can add navigation to login page here if needed
//         // Example: window.location.href = '/login';
//     };

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//        <div className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
//       {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//           <img className="h-48" src={logo} alt="logo"/>
             
//       </a> */}
//       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                   Create an account
//               </h1>
//               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
//                   <div className='flex gap-5'>
//                   <div>
//                       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                       <input type="email" name="email" id="email" value={userData.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
//                   </div>
//                   <div>
//                       <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
//                       <input type="text" name="first_name" id="first_name" onChange={handleInputChange} placeholder="First Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                   </div>
//                   </div>
//                   <div>
//                       <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set Password</label>
//                       <input type="password" name="new_password" id="new_password" onChange={handleInputChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                   </div>
//                   <div>
//                       <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
//                       <input type="password" name="confirm_password" id="confirm_password" onChange={handleInputChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                   </div>

                  
//                   <div className='flex gap-5'>
//                   <div>
//                   <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
//                   <Select onValueChange={handleGenderChange} value={userData.gender}>
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Select a gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Gender</SelectLabel>
                        
//                         {genderData && genderData.map((gender, index) => (
//                           <SelectItem key={index} value={gender}>{gender}</SelectItem>
//                         ))}
                        
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   </div>
//                   <div>
//                       <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
//                       <input type="text" name="full_name" id="full_name" value={userData.full_name} onChange={handleInputChange} placeholder="Full Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                   </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                       <div className="flex items-center h-5">
//                         <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
//                       </div>
//                   </div>
//                   {
//                     loading 
//                     ? <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-not-allowed" disabled>Creating User....</button>
//                     : <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
//                   }
//                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                       Already have an account? <a href="/mycard/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
//                   </p>
//               </form>
//           </div>
//       </div>
//   </div>
  
//   {/* Success Modal */}
//   <SuccessModal 
//     isOpen={showSuccessModal} 
//     onClose={handleCloseModal} 
//   />
// </section>
//   )
// }

// export default Signup















import React, { useState } from 'react'
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import SuccessModal from '@/components/SuccessModal';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

const Signup = () => {
    const { createDoc, loading } = useFrappeCreateDoc();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    
    const [userData, setUserData] = useState({
        first_name: "",
        email: "",
        gender: "",
        last_name: "",
        birth_date: "2025-04-02",
        mobile_no: "",
        new_password: "",
        confirm_password: "",
        role_profile_name: "User All Access"
    });

    // const createUser = async (docData) => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Authorization", "token a36acbb78e6712b:d67b02287bbba9a");
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    //     console.log("create user", userData)

    //     const raw = JSON.stringify({
    //         "first_name": userData.first_name,
    //         "email": userData.email,
    //         "gender": userData.gender,
    //         "full_name": userData.full_name,
    //         "birth_date": "2025-04-02",
    //         "mobile_no": userData.mobile_no,
    //         "new_password": userData.new_password
    //     });

    //     const requestOptions = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //     };

    //     return await fetch("/api/resource/User", requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result);
    //             return result;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             throw error;
    //         });
    // }

const createUser = (docData) => {
const myHeaders = new Headers();
myHeaders.append("Authorization", "token 3533a01fba5c78a:12e33572bb13e99");
myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

console.log("create user",userData)


const raw = JSON.stringify({
  "first_name": userData.first_name,
  "email": userData.email,
  "gender": userData.gender,
  "last_name": userData.last_name,
  "birth_date": "2025-04-02",
  "mobile_no": "",
  "new_password": userData.new_password,
  "role_profile_name": "User All Access"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
  credentials: "omit",
};

fetch("/api/resource/User", requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    if(result.data) {
        setShowSuccessModal(true)
    } else if (result.exception) {
        setPasswordError(result.exception)
    }
  })
  .catch((error) => console.error(error));
     }


    const genderData = [ "Female", "Male", "Prefer not to say", "Non-Conforming", "Genderqueer", "Transgender", "Other"];

    const validatePasswords = () => {
        if (userData.new_password !== userData.confirm_password) {
            setPasswordError("Passwords do not match");
            return false;
        }
        if (userData.new_password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePasswords()) {
            return;
        }

        console.log("EMAIL.....", userData)
        const docData = {
            first_name: userData.first_name,
            email: userData.email,
            gender: userData.gender,
            full_name: userData.full_name,
            birth_date: "2025-04-02",
            mobile_no: userData.mobile_no,
            new_password: userData.new_password,
            role_profile_name: "User All Access"
        };

        console.log("USER data....", docData)

        try {
            const result = createUser(docData);
            console.log("result", result)
            // if (result) {
            //     setShowSuccessModal(true)
            // }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        
        // Clear password error when user starts typing
        if (name === 'new_password' || name === 'confirm_password') {
            setPasswordError("");
        }
    };

    const handleGenderChange = (value) => {
        setUserData(prev => ({ ...prev, gender: value }));
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const passwordsMatch = userData.new_password && userData.confirm_password && userData.new_password === userData.confirm_password;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse dark:bg-blue-500/10"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse dark:bg-purple-500/10" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-2xl animate-pulse dark:bg-pink-500/10" style={{animationDelay: '2s'}}></div>
            
            <div className="w-full max-w-lg relative z-10">
               
                <div className="text-center mb-8">
                    
                    <p className="text-gray-600 dark:text-gray-400">Create your account in seconds</p>
                </div>

                {/* Form container with glassmorphism effect */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/20 p-8 transform transition-all duration-300 hover:shadow-3xl">
                <div className='ml-[40%]'>
                  <img className='h-16' src='/assets/erpnext/images/mycard-logo.png' alt="MyCard Logo" />
                </div>
                    <div className="space-y-6">

                        <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={userData.email} 
                                    onChange={handleInputChange} 
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400" 
                                    placeholder="name@company.com" 
                                    required 
                                />
                            </div>
                        {/* Email and First Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <div className="space-y-2">
                                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    First Name
                                </label>
                                <input 
                                    type="text" 
                                    name="first_name" 
                                    id="first_name" 
                                    value={userData.first_name}
                                    onChange={handleInputChange} 
                                    placeholder="First Name" 
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400" 
                                    required 
                                />
                            </div>

                            {/* Last Name */}
                        <div className="space-y-2">
                            <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Last Name
                            </label>
                            <input 
                                type="text" 
                                name="last_name" 
                                id="last_name" 
                                value={userData.last_name} 
                                onChange={handleInputChange} 
                                placeholder="Full Name" 
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400" 
                                required 
                            />
                        </div>
                        </div>

                        

                        

                        {/* Gender and Mobile Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Gender
                                </label>
                                <Select onValueChange={handleGenderChange} value={userData.gender}>
                                    <SelectTrigger className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700/50 dark:border-gray-600">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            {genderData.map((gender, index) => (
                                                <SelectItem key={index} value={gender} className="rounded-lg">
                                                    {gender}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="mobile_no" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Mobile Number
                                </label>
                                <input 
                                    type="tel" 
                                    name="mobile_no" 
                                    id="mobile_no" 
                                    value={userData.mobile_no} 
                                    onChange={handleInputChange} 
                                    placeholder="Mobile Number" 
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400" 
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="new_password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        name="new_password" 
                                        id="new_password" 
                                        value={userData.new_password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400" 
                                        placeholder="Enter password"
                                        required 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirm_password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirm_password" 
                                        id="confirm_password" 
                                        value={userData.confirm_password}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 pr-12 rounded-xl border-2 bg-white/50 text-gray-900 placeholder-gray-500 transition-all duration-200 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 ${
                                            passwordError 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                                                : passwordsMatch && userData.confirm_password
                                                ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                                : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                        } dark:border-gray-600`}
                                        placeholder="Confirm password"
                                        required 
                                    />
                                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                                        {userData.confirm_password && (
                                            passwordsMatch ? (
                                                <CheckCircle2 size={20} className="text-green-500" />
                                            ) : (
                                                <AlertCircle size={20} className="text-red-500" />
                                            )
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password Error Message */}
                        {passwordError && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 ">
                                <AlertCircle size={16} />
                                <span>{passwordError}</span>
                            </div>
                        )}

                        {/* Password Match Success */}
                        {passwordsMatch && userData.confirm_password && !passwordError && (
                            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                <CheckCircle2 size={16} />
                                <span>Passwords match perfectly!</span>
                            </div>
                        )}

                        {/* Terms and Conditions */}
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-6 mt-1">
                                <input 
                                    id="terms" 
                                    type="checkbox" 
                                    className="w-5 h-5 border-2 border-gray-300 rounded-lg bg-white focus:ring-3 focus:ring-blue-300 checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600" 
                                    required 
                                />
                            </div>
                            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                I agree to the{' '}
                                <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors dark:text-blue-400 dark:hover:text-blue-300">
                                    Terms and Conditions
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors dark:text-blue-400 dark:hover:text-blue-300">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || passwordError || !passwordsMatch || !userData.email || !userData.first_name || !userData.new_password}
                            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                                loading || passwordError || !passwordsMatch || !userData.email || !userData.first_name || !userData.new_password
                                    ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <a 
                                    href="/mycard/login" 
                                    className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <SuccessModal 
                isOpen={showSuccessModal} 
                onClose={handleCloseModal} 
            />
        </div>
    )
}

export default Signup
