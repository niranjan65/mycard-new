// DepartmentGrid.jsx - Medical Departments Grid Component
import React from 'react';
import { UserCheck, Brain, Eye, Droplet, Heart, Shield, Activity, AlertCircle } from 'lucide-react';

const DepartmentGrid = () => {
  const departments = [
    { name: "General Physician", icon: UserCheck, color: "bg-teal-500" },
    { name: "Neurologist", icon: Brain, color: "bg-purple-500" },
    { name: "ENT", icon: Eye, color: "bg-indigo-500" },
    { name: "Urology", icon: Droplet, color: "bg-blue-500" },
    { name: "Cardio", icon: Heart, color: "bg-red-500" },
    { name: "Gynaecology", icon: Shield, color: "bg-pink-500" },
    { name: "Oncology", icon: Activity, color: "bg-orange-500" },
    { name: "Trauma", icon: AlertCircle, color: "bg-yellow-500" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Search by Departments</h3>

      <div className="grid grid-cols-4 gap-3">
        {departments.map((dept, index) => {
          const IconComponent = dept.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">{dept.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentGrid;
