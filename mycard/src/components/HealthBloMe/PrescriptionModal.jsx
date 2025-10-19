// import { useState } from 'react';
// import { Upload, FileText, X } from 'lucide-react';

// export default function PrescriptionModal({ prescriptions = [], selectedPrescription, setSelectedPrescription }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const [selectedFile, setSelectedFile] = useState(null);


//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setSelectedPrescription(null);
//     }
//   };

//   const handlePrescriptionSelect = (prescription) => {
//     console.log("Handle selected prescription...", prescription)
//     setSelectedPrescription(prescription);
//     setSelectedFile(null);
//   };

//   const handleSubmit = () => {
//     if (selectedPrescription) {
//       alert(`Selected prescription: ${selectedPrescription.name}`);
//       setActiveMainTab("Prescriptions")
//     } else if (selectedFile) {
//       alert(`Uploaded file: ${selectedFile.name}`);
//     } else {
//       alert('Please select a prescription or upload a file');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-semibold text-gray-800">Select Prescription</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Existing Prescriptions */}
//           <div className="mb-6">
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Your Prescriptions</h3>
//             <div className="space-y-3">
//               {prescriptions.map((prescription) => (
//                 <div
//                   key={prescription.name}
//                   onClick={() => handlePrescriptionSelect(prescription)}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     selectedPrescription?.name === prescription.name
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex items-start">
//                     <FileText className={`mt-1 mr-3 ${selectedPrescription?.name === prescription.name ? 'text-blue-500' : 'text-gray-400'}`} size={20} />
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-800">{prescription?.title}</div>
//                       <div className="text-sm text-gray-500 mt-1">Date: {prescription?.date}</div>
//                       <div className="text-sm text-gray-600 mt-1">Medications: {prescription?.medications}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500">OR</span>
//             </div>
//           </div>

//           {/* Upload Section */}
//           <div>
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Upload New Prescription</h3>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="hidden"
//                 accept="image/*,.pdf"
//                 onChange={handleFileChange}
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <Upload className="mx-auto text-gray-400 mb-4" size={48} />
//                 <p className="text-gray-600 mb-2">
//                   Click to upload or drag and drop
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   PDF, PNG, JPG (max. 10MB)
//                 </p>
//               </label>
//               {selectedFile && (
//                 <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="text-sm text-blue-700 font-medium">
//                     Selected: {selectedFile.name}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
//           <button
//             onClick={() => setIsOpen(false)}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={!selectedPrescription && !selectedFile}
//             className={`px-6 py-2 rounded-lg transition-colors ${
//               selectedPrescription || selectedFile
//                 ? 'bg-blue-600 text-white hover:bg-blue-700'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

export default function PrescriptionModal({ prescriptions = [], selectedPrescription, setSelectedPrescription, onClose, onSubmit, setActiveMainTab }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedPrescription(null);
    }
  };

  const handlePrescriptionSelect = (prescription) => {
    console.log("Handle select prescription...", prescription);
    console.log("Handle selected prescription...", selectedPrescription);
    setSelectedPrescription(prescription);
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (selectedPrescription) {
      onSubmit && onSubmit(selectedPrescription, null);
      setActiveMainTab("Prescriptions")
      setIsOpen(false);
    } else if (selectedFile) {
      onSubmit && onSubmit(null, selectedFile);
      setIsOpen(false);
    } else {
      alert('Please select a prescription or upload a file');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Select Prescription</h2>
         {/* <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button> */}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Existing Prescriptions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Your Prescriptions</h3>
            <div className="space-y-3">
              {prescriptions.map((prescription) => (
                <div
                  key={prescription.name || prescription.parent}
                  onClick={() => handlePrescriptionSelect(prescription)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPrescription?.name === prescription.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <FileText className={`mt-1 mr-3 ${selectedPrescription?.name === prescription.name ? 'text-blue-500' : 'text-gray-400'}`} size={20} />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{prescription?.title || 'Prescription'}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Date: {prescription?.encounter_date || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Drug: {prescription?.drug_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">
                        Dosage: {prescription?.dosage || 'N/A'} | {prescription?.period || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Practitioner: {prescription?.practitioner_name || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Upload New Prescription</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PDF, PNG, JPG (max. 10MB)
                </p>
              </label>
              {selectedFile && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    Selected: {selectedFile.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedPrescription && !selectedFile}
            className={`px-6 py-2 rounded-lg transition-colors ${
              selectedPrescription || selectedFile
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}