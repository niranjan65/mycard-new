// // AppointmentModal.jsx - Appointment Booking Modal Component  
// // Fixed version with minimal fields to avoid 417 errors

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useFrappeGetDocList, useFrappeCreateDoc } from 'frappe-react-sdk';
// import { 
//   X, Calendar as CalendarIcon, User, Stethoscope, CreditCard, 
//   Video, Info, CalendarCheck 
// } from 'lucide-react';

// const AppointmentModal = ({ 
//   showModal, 
//   setShowModal, 
//   patientData, 
//   patientId,
//   user_name,
//   cardBloMeNumber,
//   refreshAppointments,
//   departmentsData,
//   departmentsLoading,
//   appointmentTypesData,
//   practitionersData
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [appointmentForm, setAppointmentForm] = useState({
//     patient: '',
//     patient_name: '',
//     appointment_for: 'Patient',
//     appointment_date: '',
//     appointment_time: '',
//     department: '',
//     practitioner: '',
//     practitioner_name: '',
//     appointment_type: 'New',
//     service_unit: '',
//     duration: 30,
//     mode_of_payment: 'Cash',
//     paid_amount: 0,
//     add_video_conferencing: false,
//     status: 'Open'
//   });

//   const [practitionerId, setPractitionerId] = useState()

//   // Fetch Medical Departments with only name field
//   // const { data: departmentsData, isLoading: departmentsLoading } = 
//   //   useFrappeGetDocList("Medical Department", {
//   //     fields: ["name"],
//   //     orderBy: { field: "name", order: "asc" },
//   //     limit_page_length: 100
//   //   });


//   console.log("------------------------------------------", practitionersData)

    
    

//   // Fetch Healthcare Practitioners with minimal fields - REMOVED FILTERS TO AVOID 417
//   // const { data: practitionersData, isLoading: practitionersLoading } = 
//   //   useFrappeGetDocList("Healthcare Practitioner", {
//   //     fields: ["name"],
//   //     orderBy: { field: "name", order: "asc" },
//   //     limit_page_length: 100
//   //   });

//   // Fetch Appointment Types with only name field
//   // const { data: appointmentTypesData, isLoading: appointmentTypesLoading } = 
//   //   useFrappeGetDocList("Appointment Type", {
//   //     fields: ["name"],
//   //     orderBy: { field: "name", order: "asc" },
//   //     limit_page_length: 100
//   //   });

//   // Create appointment hook
//   const { createDoc } = useFrappeCreateDoc();

//   // Initialize form with patient data when modal opens
//   useEffect(() => {
//     if (showModal && patientData && patientData.length > 0) {
//       setAppointmentForm(prev => ({
//         ...prev,
//         patient: patientData[0].name,
//         patient_name: patientData[0].patient_name || user_name,
//         appointment_for: 'Patient'
//       }));
//     }
//   }, [showModal, patientData, user_name]);

//   // Handle form input changes
//   const handleInputChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     // For date, pass the current practitioner and the new date value
//   if(name === "appointment_date") {
//     handleGetAvailabilityData(appointmentForm.practitioner, value);
//   }

//   // For practitioner, pass the new practitioner and current date value
//   if(name === "practitioner") {
//     setPractitionerId(value);
//     handleGetAvailabilityData(value, appointmentForm.appointment_date);
//   }
//     setAppointmentForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Clear practitioner when department changes
//     if (name === 'department') {
//       setAppointmentForm(prev => ({
//         ...prev,
//         practitioner: '',
//         practitioner_name: ''
//       }));
//     }

//     // Set practitioner name when practitioner is selected
//     if (name === 'practitioner') {
//       setPractitionerId(value)
//       setAppointmentForm(prev => ({
//         ...prev,
//         practitioner_name: value
//       }));
//     }
//   }, []);

//   // Handle appointment submission
//   const handleAppointmentSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isSubmitting) return;
    
//     setIsSubmitting(true);

//     console.log(appointmentForm.patient)

//     try {
//       // Validate required fields
//       // if (!appointmentForm.patient || !appointmentForm.department || 
//       //     !appointmentForm.practitioner || !appointmentForm.appointment_date || 
//       //     !appointmentForm.appointment_time) {
//       //   alert('Please fill all required fields');
//       //   setIsSubmitting(false);
//       //   return false;
//       // }

//       // Prepare data for submission
//       const appointmentForm1 = {
//         doctype: "Patient Appointment",
//         patient: appointmentForm.patient,
//         patient_name: appointmentForm.patient_name,
//         appointment_date: appointmentForm.appointment_date,
//         appointment_time: appointmentForm.appointment_time,
//         department: appointmentForm.department,
//         practitioner: appointmentForm.practitioner,
//         appointment_type: appointmentForm.appointment_type || 'New',
//         duration: parseInt(appointmentForm.duration),
//         status: 'Open'
//       };

//       // Create the appointment
//       // await createDoc('Patient Appointment', appointmentData);
//       const response1 = await fetch('https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.create_appointment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'token 73fb1eefb9d16d3:5b665ea071ecae4',
//       },
//       credentials: "omit",
//       body: JSON.stringify({appointmentForm1}),
//     });

//     if (!response1.ok) {
//       const errorText = await response1.text();
      
//     }

//     const result1 = await response1.json();
//     console.log("patient created succesfully", result1)

//       // Show success message
//       alert('Appointment booked successfully!');

//       // Refresh appointments list
//       if (refreshAppointments) {
//         refreshAppointments();
//       }

//       // Close modal and reset form
//       setShowModal(false);
//       resetAppointmentForm();
//     } catch (error) {
//       console.error('Error creating appointment:', error);
//       alert('Failed to book appointment. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
    
//     return false;
//   }, [appointmentForm, refreshAppointments, isSubmitting, setShowModal]);

//   const handleGetAvailabilityData = useCallback(async (practitioner, appointment_date) => {
//   console.log("Practitioner:", practitioner, "Date:", appointment_date);
//   try {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//     const raw = JSON.stringify({
//       "practitioner": practitioner,
//       "date": appointment_date
//     });

//     const url = "https://lblerp.anantdv.com/api/method/erpnext.healthcare.doctype.patient_appointment.patient_appointment.get_availability_data";

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.text();
//     const parsedResult = JSON.parse(result);

//     console.log("get availability data.........", parsedResult)
//   } catch (error) {
//     console.log(error)
//   }
// });

//   // Reset appointment form
//   const resetAppointmentForm = useCallback(() => {
//     setAppointmentForm({
//       patient: '',
//       patient_name: '',
//       appointment_for: 'Patient',
//       appointment_date: '',
//       appointment_time: '',
//       department: '',
//       practitioner: '',
//       practitioner_name: '',
//       appointment_type: 'New',
//       service_unit: '',
//       duration: 30,
//       mode_of_payment: 'Cash',
//       paid_amount: 0,
//       add_video_conferencing: false,
//       status: 'Open'
//     });
//   }, []);

//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 border border-gray-200">
//         {/* Modal Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <CalendarIcon className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Book New Appointment</h2>
//               <p className="text-sm text-gray-500">
//                 {user_name} with Dr. {appointmentForm.practitioner_name || '...'}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               setShowModal(false);
//               resetAppointmentForm();
//             }}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Modal Body */}
//         <form onSubmit={handleAppointmentSubmit} className="p-6">
//           {/* Patient Info Section */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//             <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
//               <User className="w-4 h-4 mr-2" />
//               Patient Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Patient Name
//                 </label>
//                 <input
//                   type="text"
//                   name="patient_name"
//                   value={appointmentForm.patient_name}
//                   readOnly
//                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Patient ID
//                 </label>
//                 <input
//                   type="text"
//                   name="patient"
//                   value={appointmentForm.patient || 'Not Registered'}
//                   readOnly
//                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Consultation Details */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
//                 <Stethoscope className="w-4 h-4 mr-2" />
//                 Consultation Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Department <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="department"
//                     value={appointmentForm.department}
//                     onChange={handleInputChange}
//                     required
//                     // disabled={departmentsLoading}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
//                   >
//                     <option value="">
//                       { 'Select Department'}
//                     </option>
//                     {departmentsData && departmentsData.map((dept) => (
//                       <option key={dept.name} value={dept.name}>
//                         {dept.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Practitioner <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="practitioner"
//                     value={appointmentForm.practitioner}
//                     onChange={handleInputChange}
//                     required
//                     // disabled={practitionersLoading}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
//                   >
//                     <option value="">
//                       {'Select Practitioner'}
//                     </option>
//                     {practitionersData && practitionersData.map((practitioner) => (
//                       <option key={practitioner.name} value={practitioner.name}>
//                         {practitioner.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Appointment Type
//                   </label>
//                   <select
//                     name="appointment_type"
//                     value={appointmentForm.appointment_type}
//                     onChange={handleInputChange}
//                     // disabled={appointmentTypesLoading}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
//                   >

//                     {
//                       appointmentTypesData && appointmentTypesData.map((type) => (
//                         <option key={type.name} value={type.name}>
//                           {type.name}
//                         </option>
//                       ))
//                     }
//                     {/* {
//                     appointmentTypesLoading ? (
//                       <option>Loading types...</option>
//                     ) :
//                      (
//                       appointmentTypesData && appointmentTypesData.map((type) => (
//                         <option key={type.name} value={type.name}>
//                           {type.name}
//                         </option>
//                       ))
//                     )}
//                     {(!appointmentTypesData || appointmentTypesData.length === 0) && (
//                       <>
//                         <option value="New">New</option>
//                         <option value="Follow Up">Follow Up</option>
//                       </>
//                     )} */}
//                   </select>
//                 </div>
//               </div>
//             </div>

//           {/* Appointment Details Section */}
//           <div className="space-y-6">
//             {/* Date and Time Row */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
//                 <CalendarIcon className="w-4 h-4 mr-2" />
//                 Schedule Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Appointment Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="appointment_date"
//                     value={appointmentForm.appointment_date}
//                     // onClick={() => handleGetAvailabilityData(appointmentForm.appointment_date)}
//                     // onSelect={() => handleGetAvailabilityData(appointmentForm.appointment_date)}
//                     onChange={handleInputChange}
//                     min={new Date().toISOString().split('T')[0]}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Time <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="time"
//                     name="appointment_time"
//                     value={appointmentForm.appointment_time}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Duration (Minutes)
//                   </label>
//                   <select
//                     name="duration"
//                     value={appointmentForm.duration}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   >
//                     <option value="15">15 minutes</option>
//                     <option value="30">30 minutes</option>
//                     <option value="45">45 minutes</option>
//                     <option value="60">60 minutes</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

            
//           </div>

//           <div className='space-y-6'></div>

//           {/* Modal Footer */}
//           <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => {
//                 setShowModal(false);
//                 resetAppointmentForm();
//               }}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting || !appointmentForm.department || !appointmentForm.practitioner}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Booking...
//                 </>
//               ) : (
//                 <>
//                   <CalendarCheck className="w-4 h-4 mr-2" />
//                   Book Appointment
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AppointmentModal;

















/// AppointmentModal.jsx - Appointment Booking Modal Component  
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
  refreshAppointments,
  departmentsData,
  departmentsLoading,
  appointmentTypesData,
  practitionersData
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

  const [practitionerId, setPractitionerId] = useState()
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  // Fetch Medical Departments with only name field
  // const { data: departmentsData, isLoading: departmentsLoading } = 
  //   useFrappeGetDocList("Medical Department", {
  //     fields: ["name"],
  //     orderBy: { field: "name", order: "asc" },
  //     limit_page_length: 100
  //   });


  console.log("------------------------------------------", practitionersData)

    
    

  // Fetch Healthcare Practitioners with minimal fields - REMOVED FILTERS TO AVOID 417
  // const { data: practitionersData, isLoading: practitionersLoading } = 
  //   useFrappeGetDocList("Healthcare Practitioner", {
  //     fields: ["name"],
  //     orderBy: { field: "name", order: "asc" },
  //     limit_page_length: 100
  //   });

  // Fetch Appointment Types with only name field
  // const { data: appointmentTypesData, isLoading: appointmentTypesLoading } = 
  //   useFrappeGetDocList("Appointment Type", {
  //     fields: ["name"],
  //     orderBy: { field: "name", order: "asc" },
  //     limit_page_length: 100
  //   });

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
    // For date, pass the current practitioner and the new date value
  if(name === "appointment_date") {
    handleGetAvailabilityData(appointmentForm.practitioner, value);
  }

  // For practitioner, pass the new practitioner and current date value
  if(name === "practitioner") {
    setPractitionerId(value);
    handleGetAvailabilityData(value, appointmentForm.appointment_date);
  }
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
      setPractitionerId(value)
      setAppointmentForm(prev => ({
        ...prev,
        practitioner_name: value
      }));
    }
  }, [appointmentForm.practitioner, appointmentForm.appointment_date]);

  // Handle appointment submission
  const handleAppointmentSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    console.log("appointment form------>",appointmentForm)

    try {
      // Validate required fields
      // if (!appointmentForm.patient || !appointmentForm.department || 
      //     !appointmentForm.practitioner || !appointmentForm.appointment_date || 
      //     !appointmentForm.appointment_time) {
      //   alert('Please fill all required fields');
      //   setIsSubmitting(false);
      //   return false;
      // }

      // Prepare data for submission
      const appointmentForm1 = {
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
      // await createDoc('Patient Appointment', appointmentData);
      const response1 = await fetch('https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.create_appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 73fb1eefb9d16d3:5b665ea071ecae4',
      },
      credentials: "omit",
      body: JSON.stringify({appointmentForm1}),
    });

    if (!response1.ok) {
      const errorText = await response1.text();
      
    }

    const result1 = await response1.json();
    console.log("patient created succesfully", result1)

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
  }, [appointmentForm, refreshAppointments, isSubmitting, setShowModal]);

  const handleGetAvailabilityData = useCallback(async (practitioner, appointment_date) => {
  console.log("Practitioner:", practitioner, "Date:", appointment_date);
  
  if (!practitioner || !appointment_date) {
    setAvailableSlots([]);
    return;
  }
  
  setLoadingSlots(true);
  
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    const raw = JSON.stringify({
      "practitioner": practitioner,
      "date": appointment_date
    });

    const url = "https://lblerp.anantdv.com/api/method/erpnext.healthcare.doctype.patient_appointment.patient_appointment.get_availability_data";

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    const parsedResult = JSON.parse(result);

    console.log("get availability data.........", parsedResult);
    
    // Extract available slots from the API response
    if (parsedResult && parsedResult.message && parsedResult.message.slot_details) {
      setAvailableSlots(parsedResult?.message?.slot_details[0]?.avail_slot);
    } else {
      setAvailableSlots([]);
    }
  } catch (error) {
    console.log(error);
    setAvailableSlots([]);
  } finally {
    setLoadingSlots(false);
  }
});

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
    setAvailableSlots([]);
    setLoadingSlots(false);
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
                    // disabled={departmentsLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    <option value="">
                      { 'Select Department'}
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
                    // disabled={practitionersLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >
                    <option value="">
                      {'Select Practitioner'}
                    </option>
                    {practitionersData && practitionersData.map((practitioner) => (
                      <option key={practitioner.name} value={practitioner.name}>
                        {practitioner.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time Row */}
                    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={appointmentForm.appointment_date}
                    // onClick={() => handleGetAvailabilityData(appointmentForm.appointment_date)}
                    // onSelect={() => handleGetAvailabilityData(appointmentForm.appointment_date)}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type
                  </label>
                  <select
                    name="appointment_type"
                    value={appointmentForm.appointment_type}
                    onChange={handleInputChange}
                    // disabled={appointmentTypesLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  >

                    {
                      appointmentTypesData && appointmentTypesData.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))
                    }
                    {/* {
                    appointmentTypesLoading ? (
                      <option>Loading types...</option>
                    ) :
                     (
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
                    )} */}
                  </select>
                </div>
              </div>
            </div>

          {/* Appointment Details Section */}
          <div className="space-y-6">
            

            {/* Available Time Slots Section */}
            {appointmentForm.practitioner && appointmentForm.appointment_date && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  {appointmentForm.practitioner_name ? `${appointmentForm.practitioner_name}'s Schedule` : 'Available Time Slots'}
                </h3>
                
                {loadingSlots ? (
                  <div className="flex items-center justify-center py-8">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-3 text-gray-600">Loading available slots...</span>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableSlots.map((slot, index) => {
                      // Handle different slot formats
                      const slotTime = typeof slot === 'string' ? slot : (slot.slot_name || slot.avail_slot || slot.time);
                      // const isAvailable = typeof slot === 'object' ? (slot.avail_slot && slot.avail_slot.length > 0) : true;
                      const isAvailable = true;
                      
                      return (
                        <button
                          key={index}
                          type="button"
                          // disabled={!isAvailable}
                          onClick={() => {
                            setAppointmentForm(prev => ({
                                ...prev,
                                appointment_time: slot?.from_time
                              }));
                          }}
                          className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer
                             ${ 
                            appointmentForm.appointment_time === slot?.from_time
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : isAvailable
                              ? 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot?.from_time || 'N/A'}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No available slots for this date</p>
                    <p className="text-sm text-gray-500 mt-1">Please select a different date or practitioner</p>
                  </div>
                )}
              </div>
            )}
            
          </div>

          <div className='space-y-6'></div>

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
              // disabled={isSubmitting || !appointmentForm.department || !appointmentForm.practitioner}
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