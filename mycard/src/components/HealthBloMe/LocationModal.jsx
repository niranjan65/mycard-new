// import { useState } from 'react';
// import { MapPin, X } from 'lucide-react';

// export default function LocationModal( {city, setCity} ) {
//   const [showWarning, setShowWarning] = useState(true);
//   const [showPincodeModal, setShowPincodeModal] = useState(false);

//   const handleDone = () => {
//     setShowWarning(false);
//     setShowPincodeModal(true);
//   };

//   const handleSubmit = () => {
    
//       setCity("")
//       console.log('Pincode submitted:', pincode);
//       setShowPincodeModal(false);
  
//   };

//   const handleCancel = () => {
//     setShowPincodeModal(false);
//     setPincode('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       {/* Demo Page Content */}
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4">Pharmacies Near You</h1>
//         <p className="text-gray-600 mb-4">
//           Click the button below to trigger the location modals
//         </p>
//         <button
//           onClick={() => setShowWarning(true)}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Show Location Modal
//         </button>
//       </div>

//       {/* Warning Modal */}
//       {showWarning && (
//         <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
//             {/* Header */}
//             <div className="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl font-semibold">Warning</h2>
//               {/* <button
//                 onClick={() => setShowWarning(false)}
//                 className="text-white hover:text-gray-200"
//               >
//                 <X size={24} />
//               </button> */}
//             </div>

//             {/* Content */}
//             <div className="p-8 text-center">
//               <p className="text-red-500 text-lg font-medium mb-6">
//                 Please Enable Location
//               </p>
//               <button
//                 onClick={handleDone}
//                 className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg shadow-md transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Pincode Modal */}
//       {showPincodeModal && (
//         <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
//             <h2 className="text-2xl font-bold mb-6">Help us serve you better!</h2>

//             {/* Location Icon */}
//             <div className="flex justify-center mb-6">
//               <div className="relative">
//                 <MapPin size={80} className="text-yellow-500 fill-yellow-500" />
//                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
//                 <div className="absolute top-8 right-2 w-4 h-4 bg-yellow-300 rounded-full"></div>
//                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-teal-700 rounded-full border-4 border-white"></div>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="text-gray-700 mb-6">
//               Please provide us your delivery city name for faster and
//               seamless deliveries.
//             </p>

//             {/* Input Field */}
//             <div className="mb-2">
//               <label className="block text-gray-800 font-medium mb-2">
//                 Delivery City
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter pincode here"
//                 value={pincode}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, '');
//                   if (value.length <= 6) {
//                     setPincode(value);
//                   }
//                 }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//             <p className="text-sm text-gray-600 mb-6">
//               *Enter your 6 digit pincode to proceed
//             </p>

//             {/* Buttons */}
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={handleCancel}
//                 className="px-6 py-2 text-teal-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







import { useState } from 'react';
import { MapPin, X } from 'lucide-react';

export default function LocationModal({ city, setCity }) {
  const [showWarning, setShowWarning] = useState(true);
  const [showPincodeModal, setShowPincodeModal] = useState(false);

  const handleDone = () => {
    setShowWarning(false);
    setShowPincodeModal(true);
  };

  const handleSubmit = () => {
    setCity("");
    console.log('City submitted:', city);
    setShowPincodeModal(false);
  };

  const handleCancel = () => {
    setShowPincodeModal(false);
    setCity('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Demo Page Content */}
      {/* <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Pharmacies Near You</h1>
        <p className="text-gray-600 mb-4">
          Click the button below to trigger the location modals
        </p>
        <button
          onClick={() => setShowWarning(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Show Location Modal
        </button>
      </div> */}

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Warning</h2>
              {/* <button
                onClick={() => setShowWarning(false)}
                className="text-white hover:text-gray-200"
              >
                <X size={24} />
              </button> */}
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <p className="text-red-500 text-lg font-medium mb-6">
                Please Enable Location
              </p>
              <button
                onClick={handleDone}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pincode Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Help us serve you better!</h2>

            {/* Location Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <MapPin size={80} className="text-yellow-500 fill-yellow-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-8 right-2 w-4 h-4 bg-yellow-300 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-teal-700 rounded-full border-4 border-white"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              Please provide us your delivery city name for faster and
              seamless deliveries.
            </p>

            {/* Input Field */}
            <div className="mb-2">
              <label className="block text-gray-800 font-medium mb-2">
                Delivery City
              </label>
              <input
                type="text"
                placeholder="Enter city name here"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              *Enter your city name to proceed
            </p>

            {/* Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-teal-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}