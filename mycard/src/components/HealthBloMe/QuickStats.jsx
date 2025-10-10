// QuickStats.jsx - Dashboard Statistics Cards
import React from 'react';
import { CalendarCheck, FileText, TestTube, Syringe } from 'lucide-react';

const QuickStats = ({ totalAppointments, pastAppointments, totalLabReports, completedLabTests }) => {
  const vaccinations = 3; // This can be made dynamic later

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <CalendarCheck className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
          <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
            {totalAppointments}
          </span>
        </div>
        <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Total Appointments</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <FileText className="w-8 h-8 text-green-500 group-hover:text-blue-500 transition-colors" />
          <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
            {pastAppointments?.length}
          </span>
        </div>
        <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Prescriptions</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <TestTube className="w-8 h-8 text-purple-500 group-hover:text-blue-500 transition-colors" />
          <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
            {totalLabReports}
          </span>
        </div>
        <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Lab Reports</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <Syringe className="w-8 h-8 text-orange-500 group-hover:text-blue-500 transition-colors" />
          <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
            {vaccinations}
          </span>
        </div>
        <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Vaccinations</p>
      </div>
    </div>
  );
};

export default QuickStats;