import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg className="h-10 w-10 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Account Created Successfully!
          </h3>
          
          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your account has been created successfully. You can now log in with your credentials.
          </p>
          
          {/* Buttons */}
          <div className="flex space-x-2 w-full">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;