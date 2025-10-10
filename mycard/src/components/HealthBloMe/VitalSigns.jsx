// VitalSigns.jsx - Vital Signs Display Component
import React from 'react';
import { Heart, Activity, Thermometer, Wind } from 'lucide-react';

const VitalSigns = ( {vitalSignData} ) => {
  const vitalSigns = [
    { label: "Blood Pressure", value: vitalSignData[0]?.bp?.split(" ")[0], unit: "mmHg", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
    { label: "Heart Rate", value: vitalSignData[0]?.pulse, unit: "bpm", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-50" },
    { label: "Temperature", value: vitalSignData[0]?.temperature, unit: "°F", icon: Thermometer, color: "text-orange-500", bgColor: "bg-orange-50" },
    { label: "Oxygen", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs</h3>
      <p className="text-xs text-gray-500 mb-4">Last updated: Today, 9:00 AM</p>

      <div className="grid grid-cols-2 gap-3">
        {vitalSigns.map((vital, index) => {
          const IconComponent = vital.icon;
          return (
            <div key={index} className={`${vital.bgColor} rounded-lg p-3`}>
              <IconComponent className={`w-5 h-5 ${vital.color} mb-2`} />
              <p className="text-xs text-gray-600">{vital.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {vital.value} <span className="text-xs text-gray-500">{vital.unit}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VitalSigns;