// LabTestsSidebar.jsx - Recent Lab Tests Sidebar Component
import React from 'react';
import { Download } from 'lucide-react';
import { handleDownloadLabReport } from './utils/downloadHelpers';

const LabTestsSidebar = ({ recentLabTests, labTestLoading, setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Lab Tests</h3>
        <button 
          onClick={() => setActiveTab('lab-reports')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {labTestLoading ? (
          <div className="text-center py-4">
            <div className="text-gray-500 text-sm">Loading tests...</div>
          </div>
        ) : recentLabTests && recentLabTests.length > 0 ? (
          recentLabTests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">{test.name}</p>
                <p className="text-xs text-gray-500">{test.date}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium ${
                  test.status === 'completed'
                    ? test.result === 'Normal' ? 'text-green-600' : 'text-orange-600'
                    : 'text-gray-400'
                }`}>
                  {test.result}
                </span>
                {test.status === 'completed' && (
                  <button 
                    onClick={() => handleDownloadLabReport(test.labTestId)}
                    className="block mt-1 text-xs text-blue-600 hover:text-blue-700">
                    <Download className="w-3 h-3 inline mr-1" />
                    Download
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No recent lab tests
          </div>
        )}
      </div>
    </div>
  );
};

export default LabTestsSidebar;