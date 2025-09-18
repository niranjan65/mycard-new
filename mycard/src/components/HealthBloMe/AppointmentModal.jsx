// AppointmentModal.jsx - Appointment Booking Modal Component  
// Fixed version with minimal fields to avoid 417 errors

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useFrappeGetDocList, useFrappeCreateDoc } from 'frappe-react-sdk';
import { 
  X, Calendar as CalendarIcon, User, Stethoscope, CreditCard, 
  Video, Info, CalendarCheck 
} from 'lucide-react';

const AppointmentModal = ({ 
  showModal, 
  setShowModal, 
  patientData, 
  patientId,
  user_name,
  cardBloMeNumber,
  refreshAppointments 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patient: '',
    patient_name: '',
    appointment_for: 'Patient',
    appointment_date: '',
    appointment_time: '',
    department: '',
    practitioner: '',
    practitioner_name: '',
    appointment_type: 'New',
    service_unit: '',
    duration: 30,
    mode_of_payment: 'Cash',
    paid_amount: 0,
    add_video_conferencing: false,
    status: 'Open'
  });

  // Fetch Medical Departments with only name field
  const { data: departmentsData, isLoading: departmentsLoading } = 
    useFrappeGetDocList("Medical Department", {
      fields: ["name"],
      orderBy: { field: "name", order: "asc" },
      limit_page_length: 100
    });

  // Fetch Healthcare Practitioners with minimal fields - REMOVED FILTERS TO AVOID 417
  const { data: practitionersData, isLoading: practitionersLoading } = 
    useFrappeGetDocList("Healthcare Practitioner", {
      fields: ["name"],
      orderBy: { field: "name", order: "asc" },
      limit_page_length: 100
    });

  // Fetch Appointment Types with only name field
  const { data: appointmentTypesData, isLoading: appointmentTypesLoading } = 
    useFrappeGetDocList("Appointment Type", {
      fields: ["name"],
      orderBy: { field: "name", order: "asc" },
      limit_page_length: 100
    });

  // Create appointment hook
  const { createDoc } = useFrappeCreateDoc();

  // Initialize form with patient data when modal opens
  useEffect(() => {
    if (showModal && patientData && patientData.length > 0) {
      setAppointmentForm(prev => ({
        ...prev,
        patient: patientData[0].name,
        patient_name: patientData[0].patient_name || user_name,
        appointment_for: 'Patient'
      }));
    }
  }, [showModal, patientData, user_name]);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear practitioner when department changes
    if (name === 'department') {
      setAppointmentForm(prev => ({
        ...prev,
        practitioner: '',
        practitioner_name: ''
      }));
    }

    // Set practitioner name when practitioner is selected
    if (name === 'practitioner') {
      setAppointmentForm(prev => ({
        ...prev,
        practitioner_name: value
      }));
    }
  }, []);

  // Handle appointment submission
  const handleAppointmentSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!appointmentForm.patient || !appointmentForm.department || 
          !appointmentForm.practitioner || !appointmentForm.appointment_date || 
          !appointmentForm.appointment_time) {
        alert('Please fill all required fields');
        setIsSubmitting(false);
        return false;
      }

      // Prepare data for submission
      const appointmentData = {
        doctype: "Patient Appointment",
        patient: appointmentForm.patient,
        patient_name: appointmentForm.patient_name,
        appointment_date: appointmentForm.appointment_date,
        appointment_time: appointmentForm.appointment_time,
        department: appointmentForm.department,
        practitioner: appointmentForm.practitioner,
        appointment_type: appointmentForm.appointment_type || 'New',
        duration: parseInt(appointmentForm.duration),
        status: 'Open'
      };

      // Create the appointment
      await createDoc('Patient Appointment', appointmentData);

      // Show success message
      alert('Appointment booked successfully!');

      // Refresh appointments list
      if (refreshAppointments) {
        refreshAppointments();
      }

      // Close modal and reset form
      setShowModal(false);
      resetAppointmentForm();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    
    return false;
  }, [appointmentForm, createDoc, refreshAppointments, isSubmitting, setShowModal]);

  // Reset appointment form
  const resetAppointmentForm = useCallback(() => {
    setAppointmentForm({
      patient: '',
      patient_name: '',
      appointment_for: 'Patient',
      appointment_date: '',
      appointment_time: '',
      department: '',
      practitioner: '',
      practitioner_name: '',
      appointment_type: 'New',
      service_unit: '',
      duration: 30,
      mode_of_payment: 'Cash',
      paid_amount: 0,
      add_video_conferencing: false,
      status: 'Open'
    });
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 border border-gray-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Book New Appointment</h2>
              <p className="text-sm text-gray-500">
                {user_name} with Dr. {appointmentForm.practitioner_name || '...'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowModal(false);
              resetAppointmentForm();
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleAppointmentSubmit} className="p-6">
          {/* Patient Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Patient Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patient_name"
                  value={appointmentForm.patient_name}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <input
                  type="text"
                  name="patient"
                  value={appointmentForm.patient || 'Not Registered'}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details Section */}
          <div className="space-y-6">
            {/* Date and Time Row */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Schedule Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={appointmentForm.appointment_date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="appointment_time"
                    value={appointmentForm.appointment_time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <select
                    name="duration"
                    value={appointmentForm.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Consultation Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Stethoscope className="w-4 h-4 mr-2" />
                Consultation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={appointmentForm.department}
                    onChange={handleInputChange}
                    required
                    disabled={departmentsLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    <option value="">
                      {departmentsLoading ? 'Loading departments...' : 'Select Department'}
                    </option>
                    {departmentsData && departmentsData.map((dept) => (
                      <option key={dept.name} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Practitioner <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="practitioner"
                    value={appointmentForm.practitioner}
                    onChange={handleInputChange}
                    required
                    disabled={practitionersLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    <option value="">
                      {practitionersLoading ? 'Loading practitioners...' : 'Select Practitioner'}
                    </option>
                    {practitionersData && practitionersData.map((practitioner) => (
                      <option key={practitioner.name} value={practitioner.name}>
                        {practitioner.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type
                  </label>
                  <select
                    name="appointment_type"
                    value={appointmentForm.appointment_type}
                    onChange={handleInputChange}
                    disabled={appointmentTypesLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    {appointmentTypesLoading ? (
                      <option>Loading types...</option>
                    ) : (
                      appointmentTypesData && appointmentTypesData.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))
                    )}
                    {(!appointmentTypesData || appointmentTypesData.length === 0) && (
                      <>
                        <option value="New">New</option>
                        <option value="Follow Up">Follow Up</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetAppointmentForm();
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !appointmentForm.department || !appointmentForm.practitioner}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Book Appointment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;