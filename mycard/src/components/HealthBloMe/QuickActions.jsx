// QuickActions.jsx - Quick Actions Component
import React from 'react';
import { User, Phone, ClipboardList, Bell, Search } from 'lucide-react';

const QuickActions = () => {
  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action logic
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6 text-white">Quick Actions</h3>

      <div className="relative space-y-4">
        {/* Enroll Patient Card */}
        <div
          onClick={() => handleQuickAction('enroll')}
          className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-xl font-bold mb-1">New</div>
              <div className="text-white text-sm opacity-90">Enroll Patient</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Emergency Call Card */}
        <div
          onClick={() => handleQuickAction('emergency')}
          className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-xl font-bold mb-1">911</div>
              <div className="text-white text-sm opacity-90">Emergency Call</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        {/* Medical History Card */}
        <div
          onClick={() => handleQuickAction('history')}
          className="relative bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-xl font-bold mb-1">View</div>
              <div className="text-white text-sm opacity-90">Medical History</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Medicine Reminder Card */}
        <div
          onClick={() => handleQuickAction('reminder')}
          className="relative bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-xl font-bold mb-1">Set</div>
              <div className="text-white text-sm opacity-90">Medicine Reminder</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Find Doctor Card */}
        <div
          onClick={() => handleQuickAction('findDoctor')}
          className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-xl font-bold mb-1">Find</div>
              <div className="text-white text-sm opacity-90">Find Doctor</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Search className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;