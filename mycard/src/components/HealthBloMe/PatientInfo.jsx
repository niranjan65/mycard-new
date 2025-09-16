// PatientInfo.jsx - Patient Information Card Component
import React from 'react';
import { ChevronRight } from 'lucide-react';

const PatientInfo = ({ 
  showPatientDetails, 
  setShowPatientDetails, 
  patientData, 
  patientLoading, 
  patientError,
  userImage,
  user_name 
}) => {
  
  const getInitials = () => {
    if (user_name && user_name !== "Guest User") {
      return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'U';
  };

  const calculateAge = (dob) => {
    if (!dob) return "Not specified";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "Not specified";

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }
    if (days < 0) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    if (years === 0 && months === 0) {
      return "Less than 1 month";
    } else if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${years} yr${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} yr${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setShowPatientDetails(!showPatientDetails)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {userImage ? (
              <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-blue-200 shadow-lg">
                <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {getInitials()}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
              <p className="text-sm text-gray-500">Click to view your medical profile</p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showPatientDetails ? 'rotate-90' : ''}`} />
        </div>
      </div>

      {showPatientDetails && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {patientLoading ? (
            <div className="mt-4 flex items-center justify-center py-8">
              <div className="text-gray-500">Loading patient information...</div>
            </div>
          ) : patientError ? (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600 text-sm">Error loading patient data: {patientError.message}</p>
            </div>
          ) : patientData && patientData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="font-medium text-gray-800">{patientData[0]?.patient_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Patient ID</p>
                <p className="font-medium text-gray-800">{patientData[0]?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Age</p>
                <p className="font-medium text-gray-800">{calculateAge(patientData[0]?.dob)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                <p className="font-medium text-gray-800">{patientData[0]?.blood_group || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Gender</p>
                <p className="font-medium text-gray-800">{patientData[0]?.sex || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Contact</p>
                <p className="font-medium text-gray-800">{patientData[0]?.phone || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-800">{patientData[0]?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
                <p className="font-medium text-gray-800">{patientData[0]?.mobile || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Occupation</p>
                <p className="font-medium text-gray-800">{patientData[0]?.occupation || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Marital Status</p>
                <p className="font-medium text-gray-800">{patientData[0]?.marital_status || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Customer Group</p>
                <p className="font-medium text-gray-800">{patientData[0]?.customer_group || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Card Blo Me Number</p>
                <p className="font-medium text-gray-800">{patientData[0]?.card_blo_me_number || 'Not assigned'}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> No patient record found. Please complete your patient registration to see detailed medical information.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientInfo;