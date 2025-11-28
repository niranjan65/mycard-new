

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeGetDoc } from 'frappe-react-sdk';
import { Plus } from 'lucide-react';

// Import sub-components from components folder
import QuickStats from '../components/HealthBloMe/QuickStats';
import PatientInfo from '../components/HealthBloMe/PatientInfo';
import AppointmentsList from '../components/HealthBloMe/AppointmentsList';
import MedicalRecordsTabs from '../components/HealthBloMe/MedicalRecordsTabs';
import VitalSigns from '../components/HealthBloMe/VitalSigns';
import LabTestsSidebar from '../components/HealthBloMe/LabTestsSidebar';
import DepartmentGrid from '../components/HealthBloMe/DepartmentGrid';
import QuickActions from '../components/HealthBloMe/QuickActions';
import AppointmentModal from '../components/HealthBloMe/AppointmentModal';
import Prescription from '@/components/Prescription';
import LocationModal from '@/components/HealthBloMe/LocationModal';
import PharmacyFinder from './PharmacyFinder';
import PrescriptionModal from '@/components/HealthBloMe/PrescriptionModal';
import LabTestPortal from '@/components/HealthBloMe/LabTestPortal';
import ComingSoonPage from './ComingSoonPage';

const HealthBloMe = () => {
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  const [activeMainTab, setActiveMainTab] = useState('Total Appointments');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [cardBloMeNumber, setCardBloMeNumber] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientError, setPatientError] = useState(null);
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [appointmentTypeList, setAppointmentTypeList] = useState([]);
  const [practitionersData, setpractitionersData] = useState([]);
  const [medicationData, setMedicationData] = useState([]);
  const [vitalSignData, setVitalSIgnData] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Get dynamic user data from cookies
  const user_name = Cookies.get('full_name') || "Guest User";
  const currentUser = Cookies.get('user_id') || "USER-GUEST-001";
  const userImage = Cookies.get('user_image') || '';
  const userEmail = currentUser;

  


  const get_medical_department_list = async() => {
        try {
        
        setDepartmentsLoading(true)
        // Create headers for production server
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
        myHeaders.append("Content-Type", "application/json");
   
        // Production API URL
        const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.get_medical_department_list";
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // const parsedResult = JSON.parse(result);
        
        console.log("API Response for medical department:", result);
        setDepartmentsLoading(false)
        setDepartmentList(result.message)
        
        
        
      } catch (error) {
          
        }
      }

      const get_appointment_type_list = async() => {
        try {
        
        
        // Create headers for production server
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
        myHeaders.append("Content-Type", "application/json");
   
        // Production API URL
        const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.appointment_type";
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // const parsedResult = JSON.parse(result);
        
        console.log("API Response for Appointment TYpe:", result);
        
        setAppointmentTypeList(result.message)
        
        
        
      } catch (error) {
          
        }
      }
      const get_practitionersData_list = async() => {
        try {
        
        
        // Create headers for production server
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
        myHeaders.append("Content-Type", "application/json");
   
        // Production API URL
        const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.healthcare_practitioner";
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // const parsedResult = JSON.parse(result);
        
        console.log("API Response forPractitioner Data......:", result);
        
        setpractitionersData(result.message)
        
        
        
      } catch (error) {
          
        }
      }
  
      

  // IMPROVED: Direct API call to get User data with card_blo_me_number
  useEffect(() => {
    const fetchUserCardNumber = async () => {
      if (userDataFetched || userEmail === "USER-GUEST-001") return;
      
      console.log("Fetching user data for:", userEmail);
      
      try {
        // First, try to get card_blo_me_number from local server
        const myHeaders = new Headers();
        // Add your local server authorization if needed
        myHeaders.append("Content-Type", "application/json");
        
        // Try fetching from local server - adjust URL as needed
        const localUrl = `/api/resource/User/${userEmail}?fields=["card_blo_me_number","full_name","email"]`;
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        const response = await fetch(localUrl, requestOptions);
        
        if (response.ok) {
          const result = await response.json();
          
          if (result.data && result.data.card_blo_me_number) {
            const userCardNumber = result.data.card_blo_me_number;
            setCardBloMeNumber(userCardNumber);
            console.log("Found Card Blo Me Number:", userCardNumber);
            
            // Now fetch patient data from production
            fetchPatientFromProduction(userCardNumber);
          } else {
            console.log("No card_blo_me_number found for user");
            setPatientError("No Card Blo Me Number assigned to your account. Please contact support.");
          }
        } else {
          console.error("Failed to fetch user data:", response.status);
          
          // Fallback: Try using Frappe SDK
          console.log("Attempting fallback with Frappe SDK...");
        }
      } catch (error) {
        console.error("Error fetching user card number:", error);
        
        // Alternative: Check if card_blo_me_number is stored in cookies or localStorage
        const storedCard = Cookies.get('card_blo_me_number') || localStorage.getItem('card_blo_me_number');
        if (storedCard) {
          console.log("Found stored Card Blo Me Number:", storedCard);
          setCardBloMeNumber(storedCard);
          fetchPatientFromProduction(storedCard);
        }
      } finally {
        setUserDataFetched(true);
      }
    };
    
    fetchUserCardNumber();
  }, [userEmail, userDataFetched]);

  // FALLBACK: Use Frappe SDK if direct API doesn't work
  const { data: userData, isLoading: userLoading, error: userError } = useFrappeGetDoc(
    "User", 
    userEmail,
    {
      enabled: !userDataFetched && userEmail !== "USER-GUEST-001" // Only run if direct API failed
    }
  );

  // Process Frappe SDK data if available
  useEffect(() => {
    if (userData && userData.card_blo_me_number && !cardBloMeNumber) {
      const userCardNumber = userData.card_blo_me_number;
      setCardBloMeNumber(userCardNumber);
      console.log("Got Card Blo Me Number from Frappe SDK:", userCardNumber);
      
      // Store in cookies for future use
      Cookies.set('card_blo_me_number', userCardNumber, { expires: 7 });
      
      fetchPatientFromProduction(userCardNumber);
      get_medical_department_list();
      get_appointment_type_list();
      get_practitionersData_list();
    }
  }, [userData, cardBloMeNumber]);

  // ENHANCED: Function to fetch Patient from PRODUCTION server
  const fetchPatientFromProduction = async (cardNumber) => {
    if (!cardNumber) {
      console.error("No card number provided");
      return;
    }
    
    setPatientLoading(true);
    setPatientError(null);
    
    try {
      console.log("Fetching patient with card:", cardNumber);
      
      // Create headers for production server
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
      
      // Request body with card number
      const raw = JSON.stringify({
        "card_blo_me_number": cardNumber
      });
      
      // Production API URL
      const url = "https://lblerp.anantdv.com/api/method/erpnext.healthcare.doctype.patient.get_list.get_patients_by_card_number";
      
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
      
      console.log("API Response:", parsedResult);
      
      // Check if patient data exists
      if (parsedResult.message && Array.isArray(parsedResult.message) && parsedResult.message.length > 0) {
        const patient = parsedResult.message[0];
        
        console.log("Patient found:", {
          id: patient.name,
          name: patient.patient_name,
          cardNumber: patient.card_blo_me_number
        });
        
        // Set the patient data
        setPatientData([patient]);
        setPatientId(patient.name);
        setPatientError(null);
        
        // Store patient ID for quick access
        localStorage.setItem('current_patient_id', patient.name);
      } else {
        console.warn("No patient found with card:", cardNumber);
        setPatientError({
          message: `No patient record found for Card Number: ${cardNumber}`,
          type: 'not_found'
        });
        setPatientData(null);
        setPatientId(null);
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      setPatientError({
        message: `Failed to fetch patient data: ${error.message}`,
        type: 'error'
      });
      setPatientData(null);
      setPatientId(null);
    } finally {
      setPatientLoading(false);
    }
  };

  // State for Lab Tests and Appointments
  const [labTestData, setLabTestData] = useState(null);
  const [labTestLoading, setLabTestLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [appointmentLoading, setAppointmentLoading] = useState(false);

  // Fetch Lab Tests and Appointments when patient ID is available
  useEffect(() => {
    if (patientId) {
      console.log("Loading medical records for patient:", patientId);
      fetchLabTestsFromProduction(patientId);
      fetchAppointmentsFromProduction(patientId);
      fetchMedicationDetailsFromProduction(patientId);
      fetchVitalSignsFromProduction(patientId);
    }
  }, [patientId]);

  // Enhanced function to fetch Lab Tests from PRODUCTION server
  const fetchLabTestsFromProduction = async (patientId) => {
    if (!patientId) return;
    
    setLabTestLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
      
      // Request body with card number
      const raw = JSON.stringify({
        "patientId": patientId
      });
      
      // Production API URL
      const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.get_labtest";
      
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
      
      // const result = await response.json();
      // const parsedResult = JSON.parse(result);
      
      
      if (response.ok) {
        const result = await response.json();
        console.log("API Response for Lab Test...:", result);
        // const parsedResult = JSON.parse(result);
        setLabTestData(result.message || []);
       
      } else {
        console.error("Failed to fetch lab tests:", response.status);
        setLabTestData([]);
      }
    } catch (error) {
      console.error("Error fetching lab tests:", error.message);
      setLabTestData([]);
    } finally {
      setLabTestLoading(false);
    }
  };

  const fetchMedicationDetailsFromProduction = async (patientId) => {
    if (!patientId) return;
    
    setLabTestLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
      
      // Request body with card number
      const raw = JSON.stringify({
        "patientId": patientId
      });
      
      // Production API URL
      const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.get_medication_details";
      
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
      
      // const result = await response.json();
      // const parsedResult = JSON.parse(result);
      
      
      if (response.ok) {
        const result = await response.json();
        console.log("API Response for Medication Details...:", result);
        // const parsedResult = JSON.parse(result);
        setMedicationData(result.message || []);
       
      } else {
        console.error("Failed to fetch lab tests:", response.status);
        setLabTestData([]);
      }
    } catch (error) {
      console.error("Error fetching lab tests:", error.message);
      setLabTestData([]);
    } finally {
      setLabTestLoading(false);
    }
  };


  const fetchVitalSignsFromProduction = async (patientId) => {
    if (!patientId) return;
    
    setLabTestLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
      
      // Request body with card number
      const raw = JSON.stringify({
        "patientId": patientId
      });
      
      // Production API URL
      const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.vital_sin";
      
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
      
      // const result = await response.json();
      // const parsedResult = JSON.parse(result);
      
      
      if (response.ok) {
        const result = await response.json();
        console.log("API Response for Vital Signs...:", result);
        // const parsedResult = JSON.parse(result);
        setVitalSIgnData(result.message || []);
       
      } else {
        console.error("Failed to fetch lab tests:", response.status);
        setLabTestData([]);
      }
    } catch (error) {
      console.error("Error fetching lab tests:", error.message);
      setLabTestData([]);
    } finally {
      setLabTestLoading(false);
    }
  };

  // Enhanced function to fetch Appointments from PRODUCTION server
  const fetchAppointmentsFromProduction = async (patientId) => {
    console.log("patient id....", patientId)
    if (!patientId) return;
    
    setAppointmentLoading(true);
    try {

       const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
      
      // Request body with card number
      const raw = JSON.stringify({
        "patientId": patientId
      });
      
      // Production API URL
      const url = "https://lblerp.anantdv.com/api/method/erpnext.cad_blo_me.get_appointment";
      
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
      
      console.log("API Response for appointment...:", parsedResult);
      
      // Check if patient data exists
      if (parsedResult.message && Array.isArray(parsedResult.message) && parsedResult.message.length > 0) {
        const patient = parsedResult.message[0];
        setAppointmentData(parsedResult.message || []);
        console.log("Appointments loaded:", parsedResult.data?.length || 0, "appointments");
      } else {
        console.error("Failed to fetch appointments:", response.status);
        setAppointmentData([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      setAppointmentData([]);
    } finally {
      setAppointmentLoading(false);
    }
  };

  // Refresh function for appointments
  const refreshAppointments = useCallback(() => {
    if (patientId) {
      console.log("Refreshing appointments...");
      fetchAppointmentsFromProduction(patientId);
    }
  }, [patientId]);

  // Process Lab Test data for display
  const labReports = useMemo(() => {
    if (!labTestData) return [];
    
    return labTestData.map((test, index) => ({
      id: index + 1,
      testName: test.lab_test_name || test.template,
      date: test.result_date ? new Date(test.result_date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      }) : 'Pending',
      doctor: test.practitioner_name || 'Not specified',
      status: test.status === 'Completed' ? 'Completed' : test.status === 'Approved' ? 'Normal' : 'Pending',
      downloadable: test.status === 'Completed' || test.status === 'Approved',
      labTestId: test.name,
      invoiced: test.invoiced,
      department: test.department || 'Laboratory'
    }));
  }, [labTestData]);

  // Process all appointments for the patient
  const allAppointments = useMemo(() => {
    if (!appointmentData) return [];
    
    return appointmentData
      .map((apt, index) => ({
        id: index + 1,
        doctor: apt.practitioner_name,
        specialty: apt.department,
        date: new Date(apt.appointment_date).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'short', day: 'numeric' 
        }),
        rawDate: apt.appointment_date,
        time: apt.appointment_time ? 
          new Date(`2000-01-01 ${apt.appointment_time}`).toLocaleTimeString('en-US', { 
            hour: 'numeric', minute: '2-digit', hour12: true 
          }) : 'TBD',
        status: apt.status,
        location: apt.service_unit || `${apt.department} Department`,
        appointmentId: apt.name,
        appointmentType: apt.appointment_type || 'Consultation',
        duration: apt.duration,
        invoiced: apt.invoiced,
        refInvoice: apt.ref_sales_invoice,
        serviceUnit: apt.service_unit
      }))
      .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
  }, [appointmentData]);

  // Calculate statistics
  const totalAppointments = appointmentData ? appointmentData.length : 0;
  const totalLabReports = labTestData ? labTestData.length : 0;
  const completedLabTests = labTestData ? labTestData.filter(test => test.status === 'Completed' || test.status === 'Approved').length : 0;

  // For backward compatibility with stats
  const pastAppointments = useMemo(() => {
    return allAppointments.filter(apt => 
      apt.status === 'Closed' || new Date(apt.rawDate) < new Date()
    );
  }, [allAppointments]);

  // Recent Lab Tests for sidebar (max 3)
  const recentLabTests = useMemo(() => {
    return labReports.slice(0, 3).map(report => ({
      name: report.testName,
      date: report.date,
      status: report.status === 'Completed' ? 'completed' : 'pending',
      result: report.status === 'Completed' ? 'Normal' : '-',
      labTestId: report.labTestId
    }));
  }, [labReports]);

  // Loading state component
  if (userLoading && !userDataFetched) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Appointment Booking Modal */}
      {showAppointmentModal && departmentList && (
        <AppointmentModal
          showModal={showAppointmentModal}
          setShowModal={setShowAppointmentModal}
          patientData={patientData}
          patientId={patientId}
          user_name={user_name}
          cardBloMeNumber={cardBloMeNumber}
          refreshAppointments={refreshAppointments}
          departmentsData={departmentList}
          departmentsLoading
          appointmentTypesData={appointmentTypeList}
          practitionersData={practitionersData}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Blo Me</h1>
        <p className="text-gray-600">Manage your health records, appointments, and medical history</p>
        {cardBloMeNumber && (
          <p className="text-sm text-gray-500 mt-1">Card Number: {cardBloMeNumber}</p>
        )}
      </div>

      {/* Error Display */}
      {patientError && patientError.type === 'not_found' && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium mb-2">Patient Registration Required</h3>
          <p className="text-yellow-700 text-sm">{patientError.message}</p>
          <p className="text-yellow-700 text-sm mt-2">
            Please visit the registration desk or contact support to complete your patient registration.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <QuickStats
        totalAppointments={totalAppointments}
        pastAppointments={medicationData}
        totalLabReports={totalLabReports}
        completedLabTests={completedLabTests}
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
      />

      {/* Main Content Grid */}

      {
        activeMainTab === "Total Appointments"

        &&

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information Card */}
            <PatientInfo
              showPatientDetails={showPatientDetails}
              setShowPatientDetails={setShowPatientDetails}
              patientData={patientData}
              patientLoading={patientLoading}
              patientError={patientError}
              userImage={userImage}
              user_name={user_name}
            />

            {/* All Appointments */}
            <AppointmentsList
              allAppointments={allAppointments}
              appointmentLoading={appointmentLoading}
              setShowAppointmentModal={setShowAppointmentModal}
            />

            {/* Medical Records Tabs */}
            <MedicalRecordsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              appointmentData={appointmentData}
              appointmentLoading={appointmentLoading}
              labReports={labReports}
              labTestLoading={labTestLoading}
              patientData={patientData}
              allAppointments={allAppointments}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Vital Signs */}
            <VitalSigns vitalSignData={vitalSignData} />

            {/* Lab Test Results Sidebar */}
            <LabTestsSidebar
              recentLabTests={recentLabTests}
              labTestLoading={labTestLoading}
              setActiveTab={setActiveTab}
            />

            {/* Medical Departments Grid */}
            <DepartmentGrid />

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </div>
      }


      {
        activeMainTab === "Prescriptions"

        &&

        <Prescription selectedPrescription={selectedPrescription} setSelectedPrescription={setSelectedPrescription} prescriptions={medicationData}  />
      }


      {
        activeMainTab === "Get Medicine"

        &&

        // <PrescriptionModal activeMainTab={activeMainTab} setActiveMainTab={setActiveMainTab} selectedPrescription={selectedPrescription} setSelectedPrescription={setSelectedPrescription} prescriptions={medicationData}   />
        <ComingSoonPage />
      }

      {
        activeMainTab === "Lab Reports"

        &&

        // <LabTestPortal  />
        <ComingSoonPage />
      }

      
      
    </div>
  );
};

export default HealthBloMe;