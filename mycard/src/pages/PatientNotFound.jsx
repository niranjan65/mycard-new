// PatientNotFoundPage.jsx - Simple implementation for your existing codebase

import React, { useState } from 'react';
import { 
  Stethoscope, 
  UserPlus, 
  ArrowLeft, 
  AlertTriangle,
  RefreshCw,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Animated Medical Icon */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Activity className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Patient Record Not Found</h1>
          <p className="text-gray-600">
            We couldn't find a patient record for your account. Please create your patient profile to access Health Blo Me.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 mb-6">
          <button
            onClick={handleCreatePatient}
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isCreating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Creating Patient Profile...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Patient Profile
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 text-sm mb-2">What you'll get:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Access to medical appointments</li>
            <li>• Digital health records</li>
            <li>• Prescription management</li>
            <li>• Lab results tracking</li>
          </ul>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PatientNotFoundPage;