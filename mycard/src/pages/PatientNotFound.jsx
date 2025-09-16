





// import React, { useState } from 'react';
// import { 
//   UserPlus, 
//   ArrowLeft, 
//   RefreshCw,
//   Shield,
//   Heart,
//   FileText,
//   Calendar
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import HealthImage from '../assets/Health.jpg';

// const PatientNotFoundPage = () => {
//   const navigate = useNavigate();
//   const [isCreating, setIsCreating] = useState(false);

//   const handleCreatePatient = () => {
//     setIsCreating(true);
//     // Add your patient creation logic here
//     // For now, just simulate loading and navigate
//     setTimeout(() => {
//       navigate('/patient-registration'); // or your patient creation route
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Main Content */}
//       <div className="min-h-screen flex items-center justify-center px-6 py-12">
//         <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
//           {/* Left Side - Content */}
//           <div className="space-y-8">
//             <div>
//               <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
//                 Medical Profile 
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                   {' '}Not Found
//                 </span>
//               </h1>
//               <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
//                 Your medical profile couldn't be found in our system. To access Health Blo Me features, you need to register as a patient first.
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-4">
//               <button
//                 onClick={handleCreatePatient}
//                 disabled={isCreating}
//                 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
//               >
//                 {isCreating ? (
//                   <>
//                     <RefreshCw className="w-6 h-6 animate-spin" />
//                     Creating Your Profile...
//                   </>
//                 ) : (
//                   <>
//                     <UserPlus className="w-6 h-6" />
//                     Create Patient Profile
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={() => navigate('/')}
//                 className="bg-gray-100 hover:bg-gray-150 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 border border-gray-200"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//                 Back to Dashboard
//               </button>
//             </div>

//             {/* Features List */}
//             <div className="space-y-4">
//               <h3 className="font-bold text-gray-800 text-xl mb-4">
//                 🏥 What you'll get with your patient profile:
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <Calendar className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <div className="font-semibold text-gray-800">Medical Appointments</div>
//                     <div className="text-gray-600 text-sm">Schedule and manage visits</div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <FileText className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <div className="font-semibold text-gray-800">Digital Health Records</div>
//                     <div className="text-gray-600 text-sm">Secure medical history</div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <div className="font-semibold text-gray-800">Prescription Management</div>
//                     <div className="text-gray-600 text-sm">Track medications safely</div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <Heart className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <div className="font-semibold text-gray-800">Lab Results Tracking</div>
//                     <div className="text-gray-600 text-sm">Monitor your health data</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Image */}
//           <div className="flex justify-center lg:justify-end">
//             <div className="relative">
//               <img 
//                 src={HealthImage} 
//                 alt="Health Regulation Illustration" 
//                 className="w-full max-w-lg h-auto object-cover rounded-3xl shadow-2xl"
//               />
              
//               {/* Floating Elements */}
//               <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
//                 <Heart className="w-8 h-8 text-white" />
//               </div>
              
//               <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
              
//               {/* Decorative dots */}
//               <div className="absolute top-1/2 -left-8 space-y-2">
//                 <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
//                 <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
//                 <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientNotFoundPage;










import React from 'react';
import { 
  ArrowLeft,
  Shield,
  Heart,
  FileText,
  Calendar,
  Stethoscope,
  Activity,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthImage from '../assets/Health.jpg';

const PatientNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Profile Status</span>
            </div>

            {/* Title - Smaller Size */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
                Medical Profile 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {' '}Not Found
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We couldn't locate your medical profile in our system. You'll need to register as a patient to access all Health Blo Me features.
              </p>
              
              {/* Info Message */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Please contact your healthcare provider or system administrator to get your patient profile created.
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button Only */}
            <div>
              <button
                onClick={() => navigate('/')}
                className="group bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 border border-gray-200 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </button>
            </div>

            {/* Features Grid - Prettier Design */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-800 text-lg">
                  Available with Patient Profile
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="group p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">Appointments</div>
                      <div className="text-gray-500 text-xs mt-1">Schedule & manage visits</div>
                    </div>
                  </div>
                </div>

                <div className="group p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">Health Records</div>
                      <div className="text-gray-500 text-xs mt-1">Secure digital history</div>
                    </div>
                  </div>
                </div>

                <div className="group p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">Prescriptions</div>
                      <div className="text-gray-500 text-xs mt-1">Track medications</div>
                    </div>
                  </div>
                </div>

                <div className="group p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-200 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors">
                      <Activity className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">Lab Results</div>
                      <div className="text-gray-500 text-xs mt-1">Monitor health data</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glass morphism card behind image */}
              <div className="absolute inset-4 bg-white/30 backdrop-blur-xl rounded-3xl"></div>
              
              {/* Main Image */}
              <img 
                src={HealthImage} 
                alt="Health Regulation Illustration" 
                className="relative w-full max-w-lg h-auto object-cover rounded-3xl shadow-2xl border-4 border-white/50"
              />
              
              {/* Floating Elements with Better Animation */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                <Heart className="w-10 h-10 text-white" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-xl animate-float-delayed">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 -left-12 space-y-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 space-x-2 flex">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to your global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-5deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default PatientNotFoundPage;