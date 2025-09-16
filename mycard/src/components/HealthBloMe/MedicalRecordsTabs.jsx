// MedicalRecordsTabs.jsx - Medical Records Tabbed Interface Component
import React from 'react';
import { Calendar, TestTube, History, ShieldAlert, Pill, Syringe, Download, Clock } from 'lucide-react';
import { handleDownloadLabReport, handleDownloadPrescription } from './utils/downloadHelpers';

const MedicalRecordsTabs = ({ 
  activeTab, 
  setActiveTab, 
  appointmentData,
  appointmentLoading,
  labReports,
  labTestLoading,
  patientData,
  allAppointments 
}) => {
  
  const tabs = [
    { id: 'appointments', label: 'All Appointments', icon: Calendar },
    { id: 'lab-reports', label: 'Lab Reports', icon: TestTube },
    { id: 'medical-history', label: 'Medical History', icon: History },
    { id: 'allergies', label: 'Allergies', icon: ShieldAlert },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'vaccinations', label: 'Vaccinations', icon: Syringe }
  ];

  // Process data from patient record
  const medicalHistory = patientData && patientData.length > 0 && patientData[0].medical_history ? 
    [{
      id: 1,
      condition: patientData[0].medical_history,
      diagnosedDate: "Not specified",
      status: "Ongoing",
      doctor: "Not specified"
    }] : 
    [{
      id: 1,
      condition: "No medical history recorded",
      diagnosedDate: "-",
      status: "-",
      doctor: "-"
    }];

  const allergies = patientData && patientData.length > 0 && patientData[0].allergies ? 
    patientData[0].allergies.split('\n').map((allergy, index) => ({
      id: index + 1,
      allergen: allergy.trim(),
      reaction: "Not specified",
      severity: "Not specified"
    })) : 
    [{ id: 1, allergen: "No allergies recorded", reaction: "-", severity: "-" }];

  const currentMedications = patientData && patientData.length > 0 && patientData[0].medication ? 
    [{
      id: 1,
      name: patientData[0].medication,
      dosage: "As prescribed",
      frequency: "As prescribed",
      prescribedBy: "Not specified",
      startDate: "Not specified"
    }] : 
    [{
      id: 1,
      name: "No current medications",
      dosage: "-",
      frequency: "-",
      prescribedBy: "-",
      startDate: "-"
    }];

  const vaccinations = [
    { id: 1, vaccine: "COVID-19 (Pfizer)", date: "Jan 2025", nextDue: "Jan 2026" },
    { id: 2, vaccine: "Influenza", date: "Oct 2024", nextDue: "Oct 2025" },
    { id: 3, vaccine: "Tetanus", date: "March 2020", nextDue: "March 2030" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="space-y-4">
            {appointmentLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading appointments...</div>
              </div>
            ) : allAppointments && allAppointments.length > 0 ? (
              allAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-gray-600">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {appointment.date}
                        </span>
                        <span className="text-sm text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {appointment.time}
                        </span>
                        <span className="text-sm text-gray-600">
                          Type: <span className="font-medium">{appointment.appointmentType}</span>
                        </span>
                      </div>
                      {appointment.serviceUnit && (
                        <div className="mt-1">
                          <span className="text-sm text-gray-600">
                            Unit: <span className="font-medium">{appointment.serviceUnit}</span>
                          </span>
                        </div>
                      )}
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Closed' ? 'bg-green-100 text-green-700' :
                          appointment.status === 'No Show' ? 'bg-red-100 text-red-700' :
                          appointment.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
                          appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    {appointment.invoiced && (
                      <button
                        onClick={() => handleDownloadPrescription(appointment.appointmentId, appointment.refInvoice)}
                        className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No appointments found
              </div>
            )}
          </div>
        );

      case 'lab-reports':
        return (
          <div className="space-y-4">
            {labTestLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading lab reports...</div>
              </div>
            ) : labReports && labReports.length > 0 ? (
              labReports.map((report) => (
                <div key={report.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">{report.testName}</h4>
                      <p className="text-sm text-gray-500">Ordered by: {report.doctor}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-gray-600">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {report.date}
                        </span>
                        <span className={`text-sm font-medium ${
                          report.status === 'Completed' || report.status === 'Normal' ? 'text-green-600' : 
                          report.status === 'Pending' ? 'text-yellow-600' : 'text-orange-600'
                        }`}>
                          {report.status}
                        </span>
                        {report.department && (
                          <span className="text-sm text-gray-600">
                            Dept: {report.department}
                          </span>
                        )}
                      </div>
                      {report.invoiced && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mt-1">
                          Invoiced
                        </span>
                      )}
                    </div>
                    {report.downloadable && (
                      <button
                        onClick={() => handleDownloadLabReport(report.labTestId)}
                        className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No lab reports found
              </div>
            )}
          </div>
        );

      case 'medical-history':
        return (
          <div className="space-y-4">
            {medicalHistory.map((condition) => (
              <div key={condition.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{condition.condition}</h4>
                    <p className="text-sm text-gray-500">Diagnosed by {condition.doctor}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-600">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {condition.diagnosedDate}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        condition.status === 'Ongoing' ? 'bg-red-100 text-red-700' :
                        condition.status === 'Managed' ? 'bg-yellow-100 text-yellow-700' :
                        condition.status === '-' ? 'bg-gray-100 text-gray-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {condition.status}
                      </span>
                    </div>
                  </div>
                </div>
                {patientData && patientData.length > 0 && patientData[0].surgical_history && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Surgical History:</p>
                    <p className="text-sm text-gray-600 mt-1">{patientData[0].surgical_history}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'allergies':
        return (
          <div className="space-y-4">
            {allergies.map((allergy) => (
              <div key={allergy.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{allergy.allergen}</h4>
                    <p className="text-sm text-gray-500">Reaction: {allergy.reaction}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    allergy.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                    allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                    allergy.severity === '-' ? 'bg-gray-100 text-gray-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {allergy.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'medications':
        return (
          <div className="space-y-4">
            {currentMedications.map((med) => (
              <div key={med.id} className="border border-gray-100 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800">{med.name}</h4>
                  <p className="text-sm text-gray-500">{med.dosage} - {med.frequency}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-gray-600">
                      Prescribed by: {med.prescribedBy}
                    </span>
                    <span className="text-sm text-gray-600">
                      Since: {med.startDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'vaccinations':
        return (
          <div className="space-y-4">
            {vaccinations.map((vaccine) => (
              <div key={vaccine.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{vaccine.vaccine}</h4>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-600">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Last: {vaccine.date}
                      </span>
                      <span className="text-sm text-gray-600">
                        Next Due: {vaccine.nextDue}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Up to Date
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Medical Records</h3>
      
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default MedicalRecordsTabs;