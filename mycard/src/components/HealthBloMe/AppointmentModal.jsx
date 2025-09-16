// AppointmentModal.jsx - Appointment Booking Modal Component
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
    appointment_type: 'Consultation',
    service_unit: '',
    duration: 30,
    mode_of_payment: 'Cash',
    paid_amount: 0,
    add_video_conferencing: false,
    event_id: '',
    billing_item: '',
    status: 'Open'
  });

  // Fetch Healthcare Practitioners
  const { data: practitionersData, isLoading: practitionersLoading, error: practitionersError } = 
    useFrappeGetDocList("Healthcare Practitioner", {
      fields: ["name", "practitioner_name", "department", "mobile"],
      filters: [["active", "=", 1]],
      orderBy: { field: "practitioner_name", order: "asc" },
      limit_page_length: 100
    });

  // Fetch Medical Departments
  const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = 
    useFrappeGetDocList("Medical Department", {
      fields: ["name", "department"],
      orderBy: { field: "department", order: "asc" },
      limit_page_length: 100
    });

  // Fetch Healthcare Service Units
  const { data: serviceUnitsData, isLoading: serviceUnitsLoading, error: serviceUnitsError } = 
    useFrappeGetDocList("Healthcare Service Unit", {
      fields: ["name", "service_unit", "service_unit_type", "is_group"],
      filters: [["is_group", "=", 0]],
      orderBy: { field: "service_unit", order: "asc" },
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

  // Filter practitioners based on selected department
  const filteredPractitioners = useMemo(() => {
    return practitionersData?.filter(
      practitioner => !appointmentForm.department || practitioner.department === appointmentForm.department
    ) || [];
  }, [practitionersData, appointmentForm.department]);

  // Fallback practitioners if none are loaded from API
  const fallbackPractitioners = useMemo(() => [
    { name: 'DR-001', practitioner_name: 'Dr. John Smith', department: 'Cardiology' },
    { name: 'DR-002', practitioner_name: 'Dr. Sarah Johnson', department: 'General Medicine' },
    { name: 'DR-003', practitioner_name: 'Dr. Michael Chen', department: 'Orthopedics' },
    { name: 'DR-004', practitioner_name: 'Dr. Emily Davis', department: 'Pediatrics' },
    { name: 'DR-005', practitioner_name: 'Dr. Robert Wilson', department: 'Gynecology' },
    { name: 'DR-006', practitioner_name: 'Dr. Lisa Anderson', department: 'Maternity' },
    { name: 'DR-007', practitioner_name: 'Dr. James Brown', department: 'Neurology' },
    { name: 'DR-008', practitioner_name: 'Dr. Maria Garcia', department: 'Dermatology' },
  ], []);

  // Use fallback practitioners if API fails
  const availablePractitioners = useMemo(() => {
    return (filteredPractitioners.length > 0 || practitionersLoading) 
      ? filteredPractitioners 
      : fallbackPractitioners.filter(p => !appointmentForm.department || p.department === appointmentForm.department);
  }, [filteredPractitioners, practitionersLoading, fallbackPractitioners, appointmentForm.department]);

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
      const selectedPractitioner = availablePractitioners?.find(p => p.name === value);
      if (selectedPractitioner) {
        setAppointmentForm(prev => ({
          ...prev,
          practitioner_name: selectedPractitioner.practitioner_name
        }));
      }
    }
  }, [availablePractitioners]);

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
        appointment_for: appointmentForm.appointment_for || 'Patient',
        appointment_date: appointmentForm.appointment_date,
        appointment_time: appointmentForm.appointment_time,
        department: appointmentForm.department,
        practitioner: appointmentForm.practitioner,
        practitioner_name: appointmentForm.practitioner_name,
        appointment_type: appointmentForm.appointment_type,
        service_unit: appointmentForm.service_unit,
        duration: parseInt(appointmentForm.duration),
        mode_of_payment: appointmentForm.mode_of_payment,
        paid_amount: parseFloat(appointmentForm.paid_amount) || 0,
        status: 'Open'
      };

      // Add video conferencing if enabled
      if (appointmentForm.add_video_conferencing) {
        appointmentData.add_video_conferencing = 1;
      }

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
      appointment_type: 'Consultation',
      service_unit: '',
      duration: 30,
      mode_of_payment: 'Cash',
      paid_amount: 0,
      add_video_conferencing: false,
      event_id: '',
      billing_item: '',
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
                  value={appointmentForm.patient || (patientData && patientData[0]?.name) || 'Not Registered'}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                />
              </div>
            </div>
            {cardBloMeNumber && (
              <div className="mt-2">
                <span className="text-xs text-blue-700">Card Blo Me #: {cardBloMeNumber}</span>
              </div>
            )}
            {!patientData || patientData.length === 0 && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  Complete patient registration for better service
                </p>
              </div>
            )}
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
                    {departmentsData && departmentsData.length > 0 ? (
                      departmentsData.map((dept) => (
                        <option key={dept.name} value={dept.name}>
                          {dept.department || dept.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Cardiology">Cardiology</option>
                        <option value="General Medicine">General Medicine</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Gynecology">Gynecology</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="ENT">ENT</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                        <option value="Psychiatry">Psychiatry</option>
                        <option value="Emergency">Emergency</option>
                      </>
                    )}
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
                    disabled={!appointmentForm.department || practitionersLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    <option value="">
                      {practitionersLoading ? 'Loading practitioners...' :
                       !appointmentForm.department ? 'Select Department First' :
                       availablePractitioners.length === 0 ? 'No practitioners available' :
                       'Select Practitioner'}
                    </option>
                    {availablePractitioners.map((practitioner) => (
                      <option key={practitioner.name} value={practitioner.name}>
                        {practitioner.practitioner_name} {practitioner.mobile ? `(${practitioner.mobile})` : ''}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Unit
                  </label>
                  <select
                    name="service_unit"
                    value={appointmentForm.service_unit}
                    onChange={handleInputChange}
                    disabled={serviceUnitsLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    <option value="">
                      {serviceUnitsLoading ? 'Loading service units...' : 'Select Service Unit (Optional)'}
                    </option>
                    {serviceUnitsData && serviceUnitsData.length > 0 ? (
                      serviceUnitsData.map((unit) => (
                        <option key={unit.name} value={unit.name}>
                          {unit.service_unit || unit.name} {unit.service_unit_type ? `(${unit.service_unit_type})` : ''}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="OPD-01">OPD Room 1 (Consultation)</option>
                        <option value="OPD-02">OPD Room 2 (Consultation)</option>
                        <option value="ER-01">Emergency Room 1 (Emergency)</option>
                        <option value="LAB-01">Laboratory 1 (Diagnostic)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mode of Payment
                  </label>
                  <select
                    name="mode_of_payment"
                    value={appointmentForm.mode_of_payment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    name="paid_amount"
                    value={appointmentForm.paid_amount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="add_video_conferencing"
                  checked={appointmentForm.add_video_conferencing}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Add Video Conferencing</span>
                </div>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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