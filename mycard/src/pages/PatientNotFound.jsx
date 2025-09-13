





import React, { useState } from 'react';
import { 
  UserPlus, 
  ArrowLeft, 
  RefreshCw,
  Shield,
  Heart,
  FileText,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthImage from '../assets/Health.jpg';

const PatientNotFoundPage = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePatient = () => {
    setIsCreating(true);
    // Add your patient creation logic here
    // For now, just simulate loading and navigate
    setTimeout(() => {
      navigate('/patient-registration'); // or your patient creation route
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Medical Profile 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {' '}Not Found
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
                Your medical profile couldn't be found in our system. To access Health Blo Me features, you need to register as a patient first.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleCreatePatient}
                disabled={isCreating}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Creating Your Profile...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-6 h-6" />
                    Create Patient Profile
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/')}
                className="bg-gray-100 hover:bg-gray-150 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 border border-gray-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-xl mb-4">
                🏥 What you'll get with your patient profile:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Calendar className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Medical Appointments</div>
                    <div className="text-gray-600 text-sm">Schedule and manage visits</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <FileText className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Digital Health Records</div>
                    <div className="text-gray-600 text-sm">Secure medical history</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Prescription Management</div>
                    <div className="text-gray-600 text-sm">Track medications safely</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Heart className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Lab Results Tracking</div>
                    <div className="text-gray-600 text-sm">Monitor your health data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={HealthImage} 
                alt="Health Regulation Illustration" 
                className="w-full max-w-lg h-auto object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              
              {/* Decorative dots */}
              <div className="absolute top-1/2 -left-8 space-y-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientNotFoundPage;


// PatientNotFoundPage.jsx - Full page layout without card container
// PatientNotFoundPage.jsx - Full page layout without card container

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
//                 className="w-full max-w-md h-auto object-cover rounded-2xl shadow-xl"
//               />
              
//               {/* Floating Elements */}
//               <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
//                 <Heart className="w-6 h-6 text-white" />
//               </div>
              
//               <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
//                 <Shield className="w-5 h-5 text-white" />
//               </div>
              
//               {/* Decorative dots */}
//               <div className="absolute top-1/2 -left-6 space-y-2">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
//                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientNotFoundPage;