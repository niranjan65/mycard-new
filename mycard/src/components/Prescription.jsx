import { useState } from 'react';
import { Pill, Calendar, User, FileText, Clock, Activity, Clipboard } from 'lucide-react';

const PrescriptionComponent = ({ prescriptions = [], selectedPrescription, setSelectedPrescription }) => {
  

  console.log("selected Prescription....", selectedPrescription)

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    return time.slice(0, 5);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Prescription List */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Prescriptions</h2>
          <p className="text-sm text-gray-500 mt-1">{prescriptions.length} total</p>
        </div>
        
        <div className="p-4 space-y-3">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.name}
              onClick={() => setSelectedPrescription(prescription)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPrescription?.name === prescription.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{prescription.patient_name}</h3>
                <span className="text-xs text-gray-500">{formatDate(prescription.encounter_date)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <User size={14} className="mr-2" />
                <span>{prescription.practitioner_name}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Pill size={14} className="mr-2" />
                <span className="truncate">{prescription.drug_name}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <span className="text-xs text-blue-600 font-medium">
                  {prescription.appointment}
                </span>
                <span className="text-xs text-gray-500">
                  {prescription.dosage_form}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Prescription Details */}
      <div className="flex-1 overflow-y-auto">
        {selectedPrescription ? (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">Prescription Details</h1>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {selectedPrescription.docstatus === 1 ? 'Submitted' : 'Draft'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Patient Name</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedPrescription.patient_name}</p>
                    <p className="text-sm text-gray-600">{selectedPrescription.patient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Patient Details</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedPrescription.patient_sex}
                      {selectedPrescription.patient_age && `, ${selectedPrescription.patient_age} years`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Prescribed By</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedPrescription.practitioner_name}</p>
                    <p className="text-sm text-gray-600">{selectedPrescription.practitioner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Appointment</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedPrescription.appointment || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Encounter Date</p>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-gray-600" />
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(selectedPrescription.encounter_date)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Encounter Time</p>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2 text-gray-600" />
                      <p className="text-lg font-semibold text-gray-800">
                        {formatTime(selectedPrescription.encounter_time)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company & Department */}
              {(selectedPrescription.company || selectedPrescription.medical_department) && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Activity className="mr-2" size={22} />
                    Organization Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedPrescription.company && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Company</p>
                        <p className="text-gray-700 font-medium">{selectedPrescription.company}</p>
                      </div>
                    )}
                    {selectedPrescription.medical_department && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Department</p>
                        <p className="text-gray-700 font-medium">{selectedPrescription.medical_department}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Medication Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Pill className="mr-2" size={22} />
                  Medication Details
                </h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">{selectedPrescription.drug_name}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Drug Code</p>
                      <p className="text-gray-700 font-medium">{selectedPrescription.drug_code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Dosage</p>
                      <p className="text-gray-700 font-medium">{selectedPrescription.dosage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Dosage Form</p>
                      <p className="text-gray-700 font-medium">{selectedPrescription.dosage_form}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Period</p>
                      <p className="text-gray-700 font-medium">{selectedPrescription.period}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Interval</p>
                      <p className="text-gray-700 font-medium">
                        {selectedPrescription.interval} {selectedPrescription.interval_uom}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Update Schedule</p>
                      <p className="text-gray-700 font-medium">
                        {selectedPrescription.update_schedule ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Clipboard className="mr-2" size={22} />
                  Additional Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Print Diagnosis</p>
                    <p className="text-gray-700 font-medium">
                      {selectedPrescription.diagnosis_in_print ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Print Symptoms</p>
                    <p className="text-gray-700 font-medium">
                      {selectedPrescription.symptoms_in_print ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Invoiced</p>
                    <p className="text-gray-700 font-medium">
                      {selectedPrescription.invoiced ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Record ID</p>
                    <p className="text-gray-700 font-medium">{selectedPrescription.name}</p>
                  </div>
                </div>
              </div>

              {/* Prescription Slip */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Pill className="mr-2" size={22} />
                  Prescription Attachment
                </h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <img src={`https://lblerp.anantdv.com${selectedPrescription?.attach_prescription}`} alt="" />
                </div>
              </div>

              <div className='w-full flex items-center justify-center '>
                <button className='py-3 px-5 bg-blue-200 rounded-md font-medium cursor-pointer'>Get Medicine</button>
              </div>

              
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Prescription Selected</h3>
              <p className="text-gray-500">Select a prescription from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionComponent;