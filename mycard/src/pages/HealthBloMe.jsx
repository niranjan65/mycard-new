

// import React, { useState } from 'react';
// import { 
//   Calendar, 
//   Download, 
//   User, 
//   Clock, 
//   FileText, 
//   Activity,
//   Heart,
//   Stethoscope,
//   Pill,
//   ChevronRight,
//   Plus,
//   Phone,
//   MapPin,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Thermometer,
//   Droplet,
//   Wind,
//   Eye,
//   Brain,
//   ClipboardList,
//   TestTube,
//   Syringe,
//   Shield,
//   UserCheck,
//   CalendarCheck,
//   History,
//   ShieldAlert,
//   CreditCard,
//   Bell,
//   Search
// } from 'lucide-react';

// const HealthBloMe = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [showPatientDetails, setShowPatientDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState('appointments');

//   // Sample patient data
//   const patientInfo = {
//     name: "Totok Michael",
//     id: "PAT-2024-001",
//     age: 32,
//     blood: "O+",
//     phone: "+91 98765 43210",
//     email: "tmichael2@email.com",
//     address: "Kolkata, West Bengal",
//     emergencyContact: "+91 87654 32109"
//   };

//   // Sample appointments data
//   const upcomingAppointments = [
//     {
//       id: 1,
//       doctor: "Dr. Adam Smith",
//       specialty: "Cardiologist",
//       date: "Jan 25, 2025",
//       time: "10:30 AM",
//       status: "confirmed",
//       location: "Cardiac Health Care, Wall Street, London"
//     },
//     {
//       id: 2,
//       doctor: "Dr. Sarah Johnson",
//       specialty: "General Physician",
//       date: "Feb 2, 2025",
//       time: "2:00 PM",
//       status: "pending",
//       location: "City Medical Center"
//     }
//   ];

//   const pastAppointments = [
//     {
//       id: 3,
//       doctor: "Dr. Michael Chen",
//       specialty: "Neurologist",
//       date: "Jan 10, 2025",
//       diagnosis: "Migraine",
//       prescription: true,
//       notes: "Patient experiencing frequent headaches, prescribed pain management medication"
//     },
//     {
//       id: 4,
//       doctor: "Dr. Emily Davis",
//       specialty: "Orthopedic",
//       date: "Dec 28, 2024",
//       diagnosis: "Lower Back Pain",
//       prescription: true,
//       notes: "Muscle strain from heavy lifting, physiotherapy recommended"
//     },
//     {
//       id: 5,
//       doctor: "Dr. Adam Smith",
//       specialty: "Cardiologist",
//       date: "Dec 15, 2024",
//       diagnosis: "Routine Checkup",
//       prescription: false,
//       notes: "Blood pressure stable, continue current medication"
//     },
//     {
//       id: 6,
//       doctor: "Dr. Sarah Johnson",
//       specialty: "General Physician",
//       date: "Nov 22, 2024",
//       diagnosis: "Annual Physical",
//       prescription: true,
//       notes: "Overall health good, updated vaccinations"
//     },
//     {
//       id: 7,
//       doctor: "Dr. Lisa Wong",
//       specialty: "Dermatologist",
//       date: "Oct 30, 2024",
//       diagnosis: "Skin Examination",
//       prescription: true,
//       notes: "Removed benign mole, prescribed topical medication"
//     }
//   ];

//   // Lab Reports Data
//   const labReports = [
//     {
//       id: 1,
//       testName: "Complete Blood Count (CBC)",
//       date: "Jan 15, 2025",
//       doctor: "Dr. Sarah Johnson",
//       status: "Normal",
//       downloadable: true,
//       results: {
//         "White Blood Cells": "6,500/μL",
//         "Red Blood Cells": "4.8 million/μL",
//         "Hemoglobin": "14.2 g/dL",
//         "Platelets": "275,000/μL"
//       }
//     },
//     {
//       id: 2,
//       testName: "Lipid Profile",
//       date: "Jan 12, 2025",
//       doctor: "Dr. Adam Smith",
//       status: "Review Required",
//       downloadable: true,
//       results: {
//         "Total Cholesterol": "210 mg/dL",
//         "LDL": "130 mg/dL",
//         "HDL": "45 mg/dL",
//         "Triglycerides": "180 mg/dL"
//       }
//     },
//     {
//       id: 3,
//       testName: "Thyroid Function Test",
//       date: "Dec 20, 2024",
//       doctor: "Dr. Michael Chen",
//       status: "Normal",
//       downloadable: true,
//       results: {
//         "TSH": "2.1 mU/L",
//         "T4": "7.8 μg/dL",
//         "T3": "140 ng/dL"
//       }
//     },
//     {
//       id: 4,
//       testName: "Liver Function Panel",
//       date: "Dec 18, 2024",
//       doctor: "Dr. Sarah Johnson",
//       status: "Normal",
//       downloadable: true,
//       results: {
//         "ALT": "28 U/L",
//         "AST": "22 U/L",
//         "Bilirubin": "0.8 mg/dL"
//       }
//     },
//     {
//       id: 5,
//       testName: "Kidney Function Panel",
//       date: "Dec 15, 2024",
//       doctor: "Dr. Sarah Johnson",
//       status: "Normal",
//       downloadable: true,
//       results: {
//         "Creatinine": "1.0 mg/dL",
//         "BUN": "18 mg/dL",
//         "eGFR": ">60 mL/min"
//       }
//     }
//   ];

//   // Medical History Data
//   const medicalHistory = [
//     {
//       id: 1,
//       condition: "Hypertension (High Blood Pressure)",
//       diagnosedDate: "March 2020",
//       status: "Ongoing",
//       doctor: "Dr. Adam Smith",
//       severity: "Mild",
//       treatment: "Lisinopril 10mg daily, lifestyle modifications"
//     },
//     {
//       id: 2,
//       condition: "Migraine Headaches",
//       diagnosedDate: "June 2019",
//       status: "Managed",
//       doctor: "Dr. Michael Chen",
//       severity: "Moderate",
//       treatment: "Sumatriptan as needed, trigger avoidance"
//     },
//     {
//       id: 3,
//       condition: "Lower Back Pain (Chronic)",
//       diagnosedDate: "December 2024",
//       status: "Treated",
//       doctor: "Dr. Emily Davis",
//       severity: "Moderate",
//       treatment: "Physical therapy, NSAIDs as needed"
//     },
//     {
//       id: 4,
//       condition: "Seasonal Allergies",
//       diagnosedDate: "April 2018",
//       status: "Managed",
//       doctor: "Dr. Sarah Johnson",
//       severity: "Mild",
//       treatment: "Antihistamines during allergy season"
//     },
//     {
//       id: 5,
//       condition: "Vitamin D Deficiency",
//       diagnosedDate: "January 2023",
//       status: "Resolved",
//       doctor: "Dr. Sarah Johnson",
//       severity: "Mild",
//       treatment: "Vitamin D3 supplements, resolved after 6 months"
//     }
//   ];

//   // Allergies Data
//   const allergies = [
//     { 
//       id: 1, 
//       allergen: "Penicillin", 
//       reaction: "Skin rash, hives", 
//       severity: "Moderate",
//       diagnosedDate: "2015",
//       notes: "Avoid all penicillin-based antibiotics"
//     },
//     { 
//       id: 2, 
//       allergen: "Peanuts", 
//       reaction: "Difficulty breathing, swelling", 
//       severity: "Severe",
//       diagnosedDate: "2010",
//       notes: "Carries EpiPen at all times"
//     },
//     { 
//       id: 3, 
//       allergen: "Dust Mites", 
//       reaction: "Sneezing, runny nose, watery eyes", 
//       severity: "Mild",
//       diagnosedDate: "2018",
//       notes: "Managed with regular cleaning and air purifiers"
//     },
//     { 
//       id: 4, 
//       allergen: "Shellfish", 
//       reaction: "Nausea, stomach cramps", 
//       severity: "Moderate",
//       diagnosedDate: "2019",
//       notes: "Avoid all shellfish and cross-contaminated foods"
//     }
//   ];

//   // Current Medications
//   const currentMedications = [
//     {
//       id: 1,
//       name: "Lisinopril",
//       dosage: "10mg",
//       frequency: "Once daily in the morning",
//       prescribedBy: "Dr. Adam Smith",
//       startDate: "March 2020",
//       purpose: "Blood pressure management",
//       sideEffects: "Dry cough (rare)",
//       instructions: "Take with or without food"
//     },
//     {
//       id: 2,
//       name: "Ibuprofen",
//       dosage: "400mg",
//       frequency: "As needed for pain",
//       prescribedBy: "Dr. Emily Davis",
//       startDate: "Dec 2024",
//       purpose: "Back pain relief",
//       sideEffects: "Stomach upset if taken without food",
//       instructions: "Take with food, maximum 3 times daily"
//     },
//     {
//       id: 3,
//       name: "Sumatriptan",
//       dosage: "50mg",
//       frequency: "As needed for migraines",
//       prescribedBy: "Dr. Michael Chen",
//       startDate: "June 2019",
//       purpose: "Migraine treatment",
//       sideEffects: "Drowsiness, dizziness",
//       instructions: "Take at first sign of migraine"
//     },
//     {
//       id: 4,
//       name: "Multivitamin",
//       dosage: "1 tablet",
//       frequency: "Once daily",
//       prescribedBy: "Dr. Sarah Johnson",
//       startDate: "January 2023",
//       purpose: "General health maintenance",
//       sideEffects: "None reported",
//       instructions: "Take with breakfast"
//     }
//   ];

//   // Vaccination History
//   const vaccinations = [
//     { 
//       id: 1, 
//       vaccine: "COVID-19 (Pfizer-BioNTech)", 
//       date: "Jan 2025", 
//       nextDue: "Jan 2026",
//       batchNumber: "FF1234",
//       location: "City Medical Center",
//       notes: "Annual booster received"
//     },
//     { 
//       id: 2, 
//       vaccine: "Influenza (Flu Shot)", 
//       date: "Oct 2024", 
//       nextDue: "Oct 2025",
//       batchNumber: "FL5678",
//       location: "Local Pharmacy",
//       notes: "Seasonal vaccination"
//     },
//     { 
//       id: 3, 
//       vaccine: "Tetanus-Diphtheria (Td)", 
//       date: "March 2020", 
//       nextDue: "March 2030",
//       batchNumber: "TD9012",
//       location: "Family Clinic",
//       notes: "10-year booster"
//     },
//     { 
//       id: 4, 
//       vaccine: "Hepatitis B", 
//       date: "July 2019", 
//       nextDue: "Lifetime protection",
//       batchNumber: "HB3456",
//       location: "Travel Clinic",
//       notes: "Travel vaccination series completed"
//     },
//     { 
//       id: 5, 
//       vaccine: "Measles-Mumps-Rubella (MMR)", 
//       date: "June 1995", 
//       nextDue: "Lifetime protection",
//       batchNumber: "MMR7890",
//       location: "Pediatric Clinic",
//       notes: "Childhood vaccination"
//     }
//   ];

//   // Vital Signs Data
//   const vitalSigns = [
//     { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
//     { label: "Heart Rate", value: "72", unit: "bpm", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-50" },
//     { label: "Temperature", value: "98.6", unit: "°F", icon: Thermometer, color: "text-orange-500", bgColor: "bg-orange-50" },
//     { label: "Oxygen", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
//   ];

//   // Lab Test Results
//   const labTests = [
//     { name: "Complete Blood Count", date: "Jan 15, 2025", status: "completed", result: "Normal" },
//     { name: "Lipid Profile", date: "Jan 12, 2025", status: "completed", result: "Review Required" },
//     { name: "Thyroid Function", date: "Jan 20, 2025", status: "pending", result: "-" }
//   ];

//   // Medical Departments
//   const departments = [
//     { name: "General Physician", icon: UserCheck, color: "bg-teal-500" },
//     { name: "Neurologist", icon: Brain, color: "bg-purple-500" },
//     { name: "ENT", icon: Eye, color: "bg-indigo-500" },
//     { name: "Urology", icon: Droplet, color: "bg-blue-500" },
//     { name: "Cardio", icon: Heart, color: "bg-red-500" },
//     { name: "Gynaecology", icon: Shield, color: "bg-pink-500" },
//     { name: "Oncology", icon: Activity, color: "bg-orange-500" },
//     { name: "Trauma", icon: AlertCircle, color: "bg-yellow-500" }
//   ];

//   const handleDownloadPrescription = (appointmentId) => {
//     console.log(`Downloading prescription for appointment ${appointmentId}`);
//     // Implement download logic
//   };

//   const handleQuickAction = (action) => {
//     console.log(`Quick action: ${action}`);
//     // Implement quick action logic
//   };

//   const tabs = [
//     { id: 'appointments', label: 'Past Appointments', icon: Calendar },
//     { id: 'lab-reports', label: 'Lab Reports', icon: TestTube },
//     { id: 'medical-history', label: 'Medical History', icon: History },
//     { id: 'allergies', label: 'Allergies', icon: ShieldAlert },
//     { id: 'medications', label: 'Medications', icon: Pill },
//     { id: 'vaccinations', label: 'Vaccinations', icon: Syringe }
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'appointments':
//         return (
//           <div className="space-y-4">
//             {pastAppointments.map((appointment) => (
//               <div key={appointment.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
//                     <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         {appointment.date}
//                       </span>
//                       <span className="text-sm text-gray-600">
//                         Diagnosis: <span className="font-medium">{appointment.diagnosis}</span>
//                       </span>
//                     </div>
//                   </div>
//                   {appointment.prescription && (
//                     <button 
//                       onClick={() => handleDownloadPrescription(appointment.id)}
//                       className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Prescription
//                     </button>
//                   )}
//                 </div>
//                 {appointment.notes && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Notes:</strong> {appointment.notes}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'lab-reports':
//         return (
//           <div className="space-y-4">
//             {labReports.map((report) => (
//               <div key={report.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{report.testName}</h4>
//                     <p className="text-sm text-gray-500">Ordered by: {report.doctor}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         {report.date}
//                       </span>
//                       <span className={`text-sm font-medium ${
//                         report.status === 'Normal' ? 'text-green-600' : 'text-orange-600'
//                       }`}>
//                         {report.status}
//                       </span>
//                     </div>
//                   </div>
//                   {report.downloadable && (
//                     <button 
//                       onClick={() => handleDownloadPrescription(report.id)}
//                       className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Download
//                     </button>
//                   )}
//                 </div>
//                 {report.results && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Test Results:</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       {Object.entries(report.results).map(([key, value]) => (
//                         <div key={key} className="text-sm">
//                           <span className="text-gray-600">{key}:</span>
//                           <span className="font-medium text-gray-800 ml-1">{value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'medical-history':
//         return (
//           <div className="space-y-4">
//             {medicalHistory.map((condition) => (
//               <div key={condition.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{condition.condition}</h4>
//                     <p className="text-sm text-gray-500">Diagnosed by {condition.doctor}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         {condition.diagnosedDate}
//                       </span>
//                       {condition.severity && (
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                           condition.severity === 'Severe' ? 'bg-red-100 text-red-700' :
//                           condition.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
//                           'bg-green-100 text-green-700'
//                         }`}>
//                           {condition.severity}
//                         </span>
//                       )}
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                         condition.status === 'Ongoing' ? 'bg-red-100 text-red-700' :
//                         condition.status === 'Managed' ? 'bg-yellow-100 text-yellow-700' :
//                         'bg-green-100 text-green-700'
//                       }`}>
//                         {condition.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 {condition.treatment && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Treatment:</strong> {condition.treatment}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'allergies':
//         return (
//           <div className="space-y-4">
//             {allergies.map((allergy) => (
//               <div key={allergy.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{allergy.allergen}</h4>
//                     <p className="text-sm text-gray-500">Reaction: {allergy.reaction}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         Diagnosed: {allergy.diagnosedDate}
//                       </span>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//                     allergy.severity === 'Severe' ? 'bg-red-100 text-red-700' :
//                     allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
//                     'bg-green-100 text-green-700'
//                   }`}>
//                     {allergy.severity}
//                   </span>
//                 </div>
//                 {allergy.notes && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Notes:</strong> {allergy.notes}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'medications':
//         return (
//           <div className="space-y-4">
//             {currentMedications.map((med) => (
//               <div key={med.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="mb-3">
//                   <h4 className="font-medium text-gray-800">{med.name}</h4>
//                   <p className="text-sm text-gray-500">{med.dosage} - {med.frequency}</p>
//                   <div className="flex items-center mt-2 space-x-4">
//                     <span className="text-sm text-gray-600">
//                       Prescribed by: {med.prescribedBy}
//                     </span>
//                     <span className="text-sm text-gray-600">
//                       Since: {med.startDate}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   {med.purpose && (
//                     <div className="p-2 bg-blue-50 rounded">
//                       <p className="text-sm text-blue-800">
//                         <strong>Purpose:</strong> {med.purpose}
//                       </p>
//                     </div>
//                   )}
//                   {med.instructions && (
//                     <div className="p-2 bg-green-50 rounded">
//                       <p className="text-sm text-green-800">
//                         <strong>Instructions:</strong> {med.instructions}
//                       </p>
//                     </div>
//                   )}
//                   {med.sideEffects && (
//                     <div className="p-2 bg-yellow-50 rounded">
//                       <p className="text-sm text-yellow-800">
//                         <strong>Side Effects:</strong> {med.sideEffects}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       case 'vaccinations':
//         return (
//           <div className="space-y-4">
//             {vaccinations.map((vaccine) => (
//               <div key={vaccine.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{vaccine.vaccine}</h4>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         Last: {vaccine.date}
//                       </span>
//                       <span className="text-sm text-gray-600">
//                         Next Due: {vaccine.nextDue}
//                       </span>
//                     </div>
//                   </div>
//                   <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
//                     Up to Date
//                   </span>
//                 </div>
//                 <div className="mt-3 space-y-2">
//                   {vaccine.location && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Location:</strong> {vaccine.location}
//                     </p>
//                   )}
//                   {vaccine.batchNumber && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Batch #:</strong> {vaccine.batchNumber}
//                     </p>
//                   )}
//                   {vaccine.notes && (
//                     <div className="p-3 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-700">
//                         <strong>Notes:</strong> {vaccine.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Blo Me</h1>
//         <p className="text-gray-600">Manage your health records, appointments, and medical history</p>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <CalendarCheck className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">12</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Total Appointments</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <FileText className="w-8 h-8 text-green-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">8</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Prescriptions</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <TestTube className="w-8 h-8 text-purple-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">15</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Lab Reports</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <Syringe className="w-8 h-8 text-orange-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">6</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Vaccinations</p>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* Patient Encounter Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//             <div 
//               className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
//               onClick={() => setShowPatientDetails(!showPatientDetails)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
//                     <User className="w-7 h-7 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
//                     <p className="text-sm text-gray-500">Click to view your medical profile</p>
//                   </div>
//                 </div>
//                 <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showPatientDetails ? 'rotate-90' : ''}`} />
//               </div>
//             </div>

//             {showPatientDetails && (
//               <div className="px-6 pb-6 border-t border-gray-100">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Full Name</p>
//                     <p className="font-medium text-gray-800">{patientInfo.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Patient ID</p>
//                     <p className="font-medium text-gray-800">{patientInfo.id}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Age</p>
//                     <p className="font-medium text-gray-800">{patientInfo.age} years</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Blood Group</p>
//                     <p className="font-medium text-gray-800">{patientInfo.blood}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Contact</p>
//                     <p className="font-medium text-gray-800">{patientInfo.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Email</p>
//                     <p className="font-medium text-gray-800">{patientInfo.email}</p>
//                   </div>
//                   <div className="md:col-span-2">
//                     <p className="text-xs text-gray-500 mb-1">Address</p>
//                     <p className="font-medium text-gray-800">{patientInfo.address}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
//               <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Book Appointment
//               </button>
//             </div>

//             <div className="space-y-4">
//               {upcomingAppointments.map((appointment) => (
//                 <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                         <Stethoscope className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
//                         <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                         <div className="flex items-center mt-2 text-sm text-gray-600">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {appointment.date}
//                           <Clock className="w-4 h-4 ml-3 mr-1" />
//                           {appointment.time}
//                         </div>
//                         <div className="flex items-center mt-1 text-sm text-gray-600">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {appointment.location}
//                         </div>
//                       </div>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       appointment.status === 'confirmed' 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {appointment.status === 'confirmed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <Clock className="w-3 h-3 inline mr-1" />}
//                       {appointment.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Medical Records Tabs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-6">Medical Records</h3>

//             {/* Tab Navigation */}
//             <div className="flex flex-wrap gap-3 mb-6">
//               {tabs.map((tab) => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                       activeTab === tab.id
//                         ? 'bg-blue-500 text-white border-blue-500 shadow-md'
//                         : 'bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm'
//                     }`}
//                   >
//                     <IconComponent className={`w-4 h-4 mr-2 ${
//                       activeTab === tab.id ? 'text-white' : ''
//                     }`} />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Tab Content */}
//             {renderTabContent()}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">

//           {/* Vital Signs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs</h3>
//             <p className="text-xs text-gray-500 mb-4">Last updated: Today, 9:00 AM</p>

//             <div className="grid grid-cols-2 gap-3">
//               {vitalSigns.map((vital, index) => {
//                 const IconComponent = vital.icon;
//                 return (
//                   <div key={index} className={`${vital.bgColor} rounded-lg p-3`}>
//                     <IconComponent className={`w-5 h-5 ${vital.color} mb-2`} />
//                     <p className="text-xs text-gray-600">{vital.label}</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {vital.value} <span className="text-xs text-gray-500">{vital.unit}</span>
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Lab Test Results */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Recent Lab Tests</h3>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                 View All
//               </button>
//             </div>

//             <div className="space-y-3">
//               {labTests.map((test, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">{test.name}</p>
//                     <p className="text-xs text-gray-500">{test.date}</p>
//                   </div>
//                   <div className="text-right">
//                     <span className={`text-xs font-medium ${
//                       test.status === 'completed' 
//                         ? test.result === 'Normal' ? 'text-green-600' : 'text-orange-600'
//                         : 'text-gray-400'
//                     }`}>
//                       {test.result}
//                     </span>
//                     {test.status === 'completed' && (
//                       <button className="block mt-1 text-xs text-blue-600 hover:text-blue-700">
//                         <Download className="w-3 h-3 inline mr-1" />
//                         Download
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Medical Departments */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Search by Departments</h3>

//             <div className="grid grid-cols-4 gap-3">
//               {departments.map((dept, index) => {
//                 const IconComponent = dept.icon;
//                 return (
//                   <button
//                     key={index}
//                     className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
//                   >
//                     <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </div>
//                     <span className="text-xs text-gray-600">{dept.name}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-gray-900 rounded-xl p-6">
//             <h3 className="text-lg font-semibold mb-6 text-white">Quick Actions</h3>

//             <div className="relative space-y-4">
//               {/* Enroll Patient Card */}
//               <div 
//                 onClick={() => handleQuickAction('enroll')}
//                 className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">New</div>
//                     <div className="text-white text-sm opacity-90">Enroll Patient</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <User className="w-6 h-6 text-purple-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Call Card */}
//               <div 
//                 onClick={() => handleQuickAction('emergency')}
//                 className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">911</div>
//                     <div className="text-white text-sm opacity-90">Emergency Call</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <Phone className="w-6 h-6 text-red-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* Medical History Card */}
//               <div 
//                 onClick={() => handleQuickAction('history')}
//                 className="relative bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">View</div>
//                     <div className="text-white text-sm opacity-90">Medical History</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <ClipboardList className="w-6 h-6 text-green-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* Medicine Reminder Card */}
//               <div 
//                 onClick={() => handleQuickAction('reminder')}
//                 className="relative bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">Set</div>
//                     <div className="text-white text-sm opacity-90">Medicine Reminder</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <Bell className="w-6 h-6 text-orange-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* Find Doctor Card */}
//               <div 
//                 onClick={() => handleQuickAction('findDoctor')}
//                 className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">Find</div>
//                     <div className="text-white text-sm opacity-90">Find Doctor</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <Search className="w-6 h-6 text-indigo-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };























//////9.04.2025/////
// import React, { useState } from 'react';
// import Cookies from 'js-cookie';
// import { useFrappeGetDocList } from 'frappe-react-sdk';
// import {
//   Calendar,
//   Download,
//   User,
//   Clock,
//   FileText,
//   Activity,
//   Heart,
//   Stethoscope,
//   Pill,
//   ChevronRight,
//   Plus,
//   Phone,
//   MapPin,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Thermometer,
//   Droplet,
//   Wind,
//   Eye,
//   Brain,
//   ClipboardList,
//   TestTube,
//   Syringe,
//   Shield,
//   UserCheck,
//   CalendarCheck,
//   History,
//   ShieldAlert,
//   CreditCard,
//   Bell,
//   Search
// } from 'lucide-react';

// const HealthBloMe = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [showPatientDetails, setShowPatientDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState('appointments');

//   // Get dynamic user data from cookies (same as navbar)
//   const user_name = Cookies.get('full_name') || "Guest User";
//   const currentUser = Cookies.get('user_id') || "USER-GUEST-001";
//   const userImage = Cookies.get('user_image') || '';
//   const userEmail = currentUser; // Assuming user_id is the email

//   // Fetch patient data from Patient doctype
//   const { data: patientData, isLoading: patientLoading, error: patientError } = useFrappeGetDocList("Patient", {
//     fields: ["*"],
//     filters: [["email", "=", userEmail]], // Filter by logged-in user's email
//     limit_page_length: 1,
//   });

//   // Try fetching all patients (for debugging) - remove this after testing
//   const { data: allPatients } = useFrappeGetDocList("Patient", {
//     fields: ["name", "patient_name", "email", "mobile", "phone"],
//     limit_page_length: 5,
//   });

//   // Debug: Console log the data
//   console.log("=== PATIENT DATA DEBUG ===");
//   console.log("User Email (filter):", userEmail);
//   console.log("Patient Data (filtered):", patientData);
//   console.log("All Patients (first 5):", allPatients);
//   console.log("Patient Loading:", patientLoading);
//   console.log("Patient Error:", patientError);
//   console.log("========================");

//   // Dynamic patient data from logged-in user
//   const patientInfo = {
//     name: user_name,
//     id: currentUser,
//     // age: "40", 
//     // blood: patientData[0]?.blood_group, 
//     // phone: patientData[0]?.phone ,
//     // email: patientData[0]?.email, // This could be dynamic too if stored in cookies
//     // address: "Kolkata, West Bengal",
//     // emergencyContact: "+91 87654 32109"
//   };

//   const getInitials = () => {
//     if (user_name && user_name !== "Guest User") {
//       return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
//     }
//     return 'U';
//   };

//   // Sample appointments data
//   const upcomingAppointments = [
//     {
//       id: 1,
//       doctor: "Dr. Adam Smith",
//       specialty: "Cardiologist",
//       date: "Jan 25, 2025",
//       time: "10:30 AM",
//       status: "confirmed",
//       location: "Cardiac Health Care, Wall Street, London"
//     },
//     {
//       id: 2,
//       doctor: "Dr. Sarah Johnson",
//       specialty: "General Physician",
//       date: "Feb 2, 2025",
//       time: "2:00 PM",
//       status: "pending",
//       location: "City Medical Center"
//     }
//   ];

//   const pastAppointments = [
//     {
//       id: 3,
//       doctor: "Dr. Michael Chen",
//       specialty: "Neurologist",
//       date: "Jan 10, 2025",
//       diagnosis: "Migraine",
//       prescription: true
//     },
//     {
//       id: 4,
//       doctor: "Dr. Emily Davis",
//       specialty: "Orthopedic",
//       date: "Dec 28, 2024",
//       diagnosis: "Back Pain",
//       prescription: true
//     }
//   ];

//   // Lab Reports Data
//   const labReports = [
//     {
//       id: 1,
//       testName: "Complete Blood Count (CBC)",
//       date: "Jan 15, 2025",
//       doctor: "Dr. Sarah Johnson",
//       status: "Normal",
//       downloadable: true
//     },
//     {
//       id: 2,
//       testName: "Lipid Profile",
//       date: "Jan 12, 2025",
//       doctor: "Dr. Adam Smith",
//       status: "Review Required",
//       downloadable: true
//     },
//     {
//       id: 3,
//       testName: "Thyroid Function Test",
//       date: "Dec 20, 2024",
//       doctor: "Dr. Michael Chen",
//       status: "Normal",
//       downloadable: true
//     }
//   ];

//   // Medical History Data
//   const medicalHistory = [
//     {
//       id: 1,
//       condition: "Hypertension",
//       diagnosedDate: "March 2020",
//       status: "Ongoing",
//       doctor: "Dr. Adam Smith"
//     },
//     {
//       id: 2,
//       condition: "Migraine",
//       diagnosedDate: "June 2019",
//       status: "Managed",
//       doctor: "Dr. Michael Chen"
//     },
//     {
//       id: 3,
//       condition: "Lower Back Pain",
//       diagnosedDate: "December 2024",
//       status: "Treated",
//       doctor: "Dr. Emily Davis"
//     }
//   ];

//   // Allergies Data
//   const allergies = [
//     { id: 1, allergen: "Penicillin", reaction: "Skin rash", severity: "Moderate" },
//     { id: 2, allergen: "Peanuts", reaction: "Difficulty breathing", severity: "Severe" },
//     { id: 3, allergen: "Dust mites", reaction: "Sneezing, runny nose", severity: "Mild" }
//   ];

//   // Current Medications
//   const currentMedications = [
//     {
//       id: 1,
//       name: "Lisinopril",
//       dosage: "10mg",
//       frequency: "Once daily",
//       prescribedBy: "Dr. Adam Smith",
//       startDate: "March 2020"
//     },
//     {
//       id: 2,
//       name: "Ibuprofen",
//       dosage: "400mg",
//       frequency: "As needed",
//       prescribedBy: "Dr. Emily Davis",
//       startDate: "Dec 2024"
//     }
//   ];

//   // Vaccination History
//   const vaccinations = [
//     { id: 1, vaccine: "COVID-19 (Pfizer)", date: "Jan 2025", nextDue: "Jan 2026" },
//     { id: 2, vaccine: "Influenza", date: "Oct 2024", nextDue: "Oct 2025" },
//     { id: 3, vaccine: "Tetanus", date: "March 2020", nextDue: "March 2030" }
//   ];

//   // Vital Signs Data
//   const vitalSigns = [
//     { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
//     { label: "Heart Rate", value: "72", unit: "bpm", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-50" },
//     { label: "Temperature", value: "98.6", unit: "°F", icon: Thermometer, color: "text-orange-500", bgColor: "bg-orange-50" },
//     { label: "Oxygen", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
//   ];

//   // Lab Test Results
//   const labTests = [
//     { name: "Complete Blood Count", date: "Jan 15, 2025", status: "completed", result: "Normal" },
//     { name: "Lipid Profile", date: "Jan 12, 2025", status: "completed", result: "Review Required" },
//     { name: "Thyroid Function", date: "Jan 20, 2025", status: "pending", result: "-" }
//   ];

//   // Medical Departments
//   const departments = [
//     { name: "General Physician", icon: UserCheck, color: "bg-teal-500" },
//     { name: "Neurologist", icon: Brain, color: "bg-purple-500" },
//     { name: "ENT", icon: Eye, color: "bg-indigo-500" },
//     { name: "Urology", icon: Droplet, color: "bg-blue-500" },
//     { name: "Cardio", icon: Heart, color: "bg-red-500" },
//     { name: "Gynaecology", icon: Shield, color: "bg-pink-500" },
//     { name: "Oncology", icon: Activity, color: "bg-orange-500" },
//     { name: "Trauma", icon: AlertCircle, color: "bg-yellow-500" }
//   ];

//   const handleDownloadPrescription = (appointmentId) => {
//     console.log(`Downloading prescription for appointment ${appointmentId}`);
//     // Implement download logic
//   };

//   const handleQuickAction = (action) => {
//     console.log(`Quick action: ${action}`);
//     // Implement quick action logic
//   };

//   const tabs = [
//     { id: 'appointments', label: 'Past Appointments', icon: Calendar },
//     { id: 'lab-reports', label: 'Lab Reports', icon: TestTube },
//     { id: 'medical-history', label: 'Medical History', icon: History },
//     { id: 'allergies', label: 'Allergies', icon: ShieldAlert },
//     { id: 'medications', label: 'Medications', icon: Pill },
//     { id: 'vaccinations', label: 'Vaccinations', icon: Syringe }
//   ];


//   const calculateAge = (dob) => {
//     if (!dob) return "Not specified";

//     const birthDate = new Date(dob);
//     const today = new Date();

//     if (isNaN(birthDate.getTime())) {
//       return "Not specified";
//     }

//     let years = today.getFullYear() - birthDate.getFullYear();
//     let months = today.getMonth() - birthDate.getMonth();
//     let days = today.getDate() - birthDate.getDate();

//     if (months < 0) {
//       years--;
//       months += 12;
//     }

//     if (days < 0) {
//       months--;
//       if (months < 0) {
//         years--;
//         months += 12;
//       }
//     }

//     // Format the output
//     if (years === 0 && months === 0) {
//       return "Less than 1 month";
//     } else if (years === 0) {
//       return `${months} month${months !== 1 ? 's' : ''}`;
//     } else if (months === 0) {
//       return `${years} yr${years !== 1 ? 's' : ''}`;
//     } else {
//       return `${years} yr${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'appointments':
//         return (
//           <div className="space-y-4">
//             {pastAppointments.map((appointment) => (
//               <div key={appointment.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
//                     <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         {appointment.date}
//                       </span>
//                       <span className="text-sm text-gray-600">
//                         Diagnosis: <span className="font-medium">{appointment.diagnosis}</span>
//                       </span>
//                     </div>
//                   </div>
//                   {appointment.prescription && (
//                     <button
//                       onClick={() => handleDownloadPrescription(appointment.id)}
//                       className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Prescription
//                     </button>
//                   )}
//                 </div>
//                 {appointment.notes && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Notes:</strong> {appointment.notes}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'lab-reports':
//         return (
//           <div className="space-y-4">
//             {labReports.map((report) => (
//               <div key={report.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{report.testName}</h4>
//                     <p className="text-sm text-gray-500">Ordered by: {report.doctor}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         {report.date}
//                       </span>
//                       <span className={`text-sm font-medium ${report.status === 'Normal' ? 'text-green-600' : 'text-orange-600'
//                         }`}>
//                         {report.status}
//                       </span>
//                     </div>
//                   </div>
//                   {report.downloadable && (
//                     <button
//                       onClick={() => handleDownloadPrescription(report.id)}
//                       className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Download
//                     </button>
//                   )}
//                 </div>
//                 {report.results && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Test Results:</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       {Object.entries(report.results).map(([key, value]) => (
//                         <div key={key} className="text-sm">
//                           <span className="text-gray-600">{key}:</span>
//                           <span className="font-medium text-gray-800 ml-1">{value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'medical-history':
//         return (
//           <div className="space-y-4">
//             {medicalHistory.map((condition) => (
//               <div key={condition.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{condition.condition}</h4>
//                     <p className="text-sm text-gray-500">Diagnosed by {condition.doctor}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         {condition.diagnosedDate}
//                       </span>
//                       {condition.severity && (
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${condition.severity === 'Severe' ? 'bg-red-100 text-red-700' :
//                           condition.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
//                             'bg-green-100 text-green-700'
//                           }`}>
//                           {condition.severity}
//                         </span>
//                       )}
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${condition.status === 'Ongoing' ? 'bg-red-100 text-red-700' :
//                         condition.status === 'Managed' ? 'bg-yellow-100 text-yellow-700' :
//                           'bg-green-100 text-green-700'
//                         }`}>
//                         {condition.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 {condition.treatment && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Treatment:</strong> {condition.treatment}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'allergies':
//         return (
//           <div className="space-y-4">
//             {allergies.map((allergy) => (
//               <div key={allergy.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{allergy.allergen}</h4>
//                     <p className="text-sm text-gray-500">Reaction: {allergy.reaction}</p>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         Diagnosed: {allergy.diagnosedDate}
//                       </span>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${allergy.severity === 'Severe' ? 'bg-red-100 text-red-700' :
//                     allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
//                       'bg-green-100 text-green-700'
//                     }`}>
//                     {allergy.severity}
//                   </span>
//                 </div>
//                 {allergy.notes && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Notes:</strong> {allergy.notes}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 'medications':
//         return (
//           <div className="space-y-4">
//             {currentMedications.map((med) => (
//               <div key={med.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="mb-3">
//                   <h4 className="font-medium text-gray-800">{med.name}</h4>
//                   <p className="text-sm text-gray-500">{med.dosage} - {med.frequency}</p>
//                   <div className="flex items-center mt-2 space-x-4">
//                     <span className="text-sm text-gray-600">
//                       Prescribed by: {med.prescribedBy}
//                     </span>
//                     <span className="text-sm text-gray-600">
//                       Since: {med.startDate}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   {med.purpose && (
//                     <div className="p-2 bg-blue-50 rounded">
//                       <p className="text-sm text-blue-800">
//                         <strong>Purpose:</strong> {med.purpose}
//                       </p>
//                     </div>
//                   )}
//                   {med.instructions && (
//                     <div className="p-2 bg-green-50 rounded">
//                       <p className="text-sm text-green-800">
//                         <strong>Instructions:</strong> {med.instructions}
//                       </p>
//                     </div>
//                   )}
//                   {med.sideEffects && (
//                     <div className="p-2 bg-yellow-50 rounded">
//                       <p className="text-sm text-yellow-800">
//                         <strong>Side Effects:</strong> {med.sideEffects}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       case 'vaccinations':
//         return (
//           <div className="space-y-4">
//             {vaccinations.map((vaccine) => (
//               <div key={vaccine.id} className="border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{vaccine.vaccine}</h4>
//                     <div className="flex items-center mt-2 space-x-4">
//                       <span className="text-sm text-gray-600">
//                         <Calendar className="w-4 h-4 inline mr-1" />
//                         Last: {vaccine.date}
//                       </span>
//                       <span className="text-sm text-gray-600">
//                         Next Due: {vaccine.nextDue}
//                       </span>
//                     </div>
//                   </div>
//                   <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
//                     Up to Date
//                   </span>
//                 </div>
//                 <div className="mt-3 space-y-2">
//                   {vaccine.location && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Location:</strong> {vaccine.location}
//                     </p>
//                   )}
//                   {vaccine.batchNumber && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Batch #:</strong> {vaccine.batchNumber}
//                     </p>
//                   )}
//                   {vaccine.notes && (
//                     <div className="p-3 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-700">
//                         <strong>Notes:</strong> {vaccine.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Blo Me</h1>
//         <p className="text-gray-600">Manage your health records, appointments, and medical history</p>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <CalendarCheck className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">12</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Total Appointments</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <FileText className="w-8 h-8 text-green-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">8</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Prescriptions</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <TestTube className="w-8 h-8 text-purple-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">15</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Lab Reports</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <Syringe className="w-8 h-8 text-orange-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">6</span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Vaccinations</p>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* Patient Encounter Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//             <div
//               className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
//               onClick={() => setShowPatientDetails(!showPatientDetails)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   {userImage ? (
//                     <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-blue-200 shadow-lg">
//                       <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
//                     </div>
//                   ) : (
//                     <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
//                       {getInitials()}
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
//                     <p className="text-sm text-gray-500">Click to view your medical profile</p>
//                   </div>
//                 </div>
//                 <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showPatientDetails ? 'rotate-90' : ''}`} />
//               </div>
//             </div>

//             {showPatientDetails && (
//               <div className="px-6 pb-6 border-t border-gray-100">
//                 {patientLoading ? (
//                   <div className="mt-4 flex items-center justify-center py-8">
//                     <div className="text-gray-500">Loading patient information...</div>
//                   </div>
//                 ) : patientError ? (
//                   <div className="mt-4 p-4 bg-red-50 rounded-lg">
//                     <p className="text-red-600 text-sm">Error loading patient data: {patientError.message}</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Full Name</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.patient_name}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Patient ID</p>
//                       <p className="font-medium text-gray-800">{patientData[0].name}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Age</p>
//                       <p className="font-medium text-gray-800">{calculateAge(patientData[0]?.dob)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Blood Group</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.blood_group}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Gender</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.sex}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Contact</p>
//                       <p className="font-medium text-gray-800">{patientData[0].phone}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Email</p>
//                       <p className="font-medium text-gray-800">{patientData[0].email}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
//                       <p className="font-medium text-gray-800">{patientData[0].mobile || 9903554842}</p>
//                     </div>
//                     {/* <div className="md:col-span-2">
//                       <p className="text-xs text-gray-500 mb-1">Address</p>
//                       <p className="font-medium text-gray-800">{patientInfo.address}</p>
//                     </div> */}
//                     {!patientData || patientData.length === 0 && (
//                       <div className="md:col-span-2 mt-4 p-3 bg-yellow-50 rounded-lg">
//                         <p className="text-yellow-800 text-sm">
//                           <strong>Note:</strong> No patient record found. Please complete your patient registration to see detailed medical information.
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
//               <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Book Appointment
//               </button>
//             </div>

//             <div className="space-y-4">
//               {upcomingAppointments.map((appointment) => (
//                 <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                         <Stethoscope className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
//                         <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                         <div className="flex items-center mt-2 text-sm text-gray-600">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {appointment.date}
//                           <Clock className="w-4 h-4 ml-3 mr-1" />
//                           {appointment.time}
//                         </div>
//                         <div className="flex items-center mt-1 text-sm text-gray-600">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {appointment.location}
//                         </div>
//                       </div>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                       {appointment.status === 'confirmed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <Clock className="w-3 h-3 inline mr-1" />}
//                       {appointment.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Medical Records Tabs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-6">Medical Records</h3>

//             {/* Tab Navigation */}
//             <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
//               {tabs.map((tab) => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeTab === tab.id
//                       ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
//                       : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//                       }`}
//                   >
//                     <IconComponent className="w-4 h-4 mr-2" />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Tab Content */}
//             {renderTabContent()}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">

//           {/* Vital Signs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs</h3>
//             <p className="text-xs text-gray-500 mb-4">Last updated: Today, 9:00 AM</p>

//             <div className="grid grid-cols-2 gap-3">
//               {vitalSigns.map((vital, index) => {
//                 const IconComponent = vital.icon;
//                 return (
//                   <div key={index} className={`${vital.bgColor} rounded-lg p-3`}>
//                     <IconComponent className={`w-5 h-5 ${vital.color} mb-2`} />
//                     <p className="text-xs text-gray-600">{vital.label}</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {vital.value} <span className="text-xs text-gray-500">{vital.unit}</span>
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Lab Test Results */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Recent Lab Tests</h3>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                 View All
//               </button>
//             </div>

//             <div className="space-y-3">
//               {labTests.map((test, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">{test.name}</p>
//                     <p className="text-xs text-gray-500">{test.date}</p>
//                   </div>
//                   <div className="text-right">
//                     <span className={`text-xs font-medium ${test.status === 'completed'
//                       ? test.result === 'Normal' ? 'text-green-600' : 'text-orange-600'
//                       : 'text-gray-400'
//                       }`}>
//                       {test.result}
//                     </span>
//                     {test.status === 'completed' && (
//                       <button className="block mt-1 text-xs text-blue-600 hover:text-blue-700">
//                         <Download className="w-3 h-3 inline mr-1" />
//                         Download
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Medical Departments */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Search by Departments</h3>

//             <div className="grid grid-cols-4 gap-3">
//               {departments.map((dept, index) => {
//                 const IconComponent = dept.icon;
//                 return (
//                   <button
//                     key={index}
//                     className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
//                   >
//                     <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </div>
//                     <span className="text-xs text-gray-600">{dept.name}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-gray-900 rounded-xl p-6">
//             <h3 className="text-lg font-semibold mb-6 text-white">Quick Actions</h3>

//             <div className="relative space-y-4">
//               {/* Enroll Patient Card */}
//               <div
//                 onClick={() => handleQuickAction('enroll')}
//                 className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">New</div>
//                     <div className="text-white text-sm opacity-90">Enroll Patient</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <User className="w-6 h-6 text-purple-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Call Card */}
//               <div
//                 onClick={() => handleQuickAction('emergency')}
//                 className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">911</div>
//                     <div className="text-white text-sm opacity-90">Emergency Call</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <Phone className="w-6 h-6 text-red-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* Medical History Card */}
//               <div
//                 onClick={() => handleQuickAction('history')}
//                 className="relative bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">View</div>
//                     <div className="text-white text-sm opacity-90">Medical History</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <ClipboardList className="w-6 h-6 text-green-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* Medicine Reminder Card */}
//               <div
//                 onClick={() => handleQuickAction('reminder')}
//                 className="relative bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">Set</div>
//                     <div className="text-white text-sm opacity-90">Medicine Reminder</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <Bell className="w-6 h-6 text-orange-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* Find Doctor Card */}
//               <div
//                 onClick={() => handleQuickAction('findDoctor')}
//                 className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white text-xl font-bold mb-1">Find</div>
//                     <div className="text-white text-sm opacity-90">Find Doctor</div>
//                   </div>
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                     <Search className="w-6 h-6 text-indigo-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealthBloMe;





// HealthBloMe.js - Complete Health Dashboard Component

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import {
  Calendar,
  Download,
  User,
  Clock,
  FileText,
  Activity,
  Heart,
  Stethoscope,
  Pill,
  ChevronRight,
  Plus,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Thermometer,
  Droplet,
  Wind,
  Eye,
  Brain,
  ClipboardList,
  TestTube,
  Syringe,
  Shield,
  UserCheck,
  CalendarCheck,
  History,
  ShieldAlert,
  CreditCard,
  Bell,
  Search
} from 'lucide-react';

const HealthBloMe = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  // Get dynamic user data from cookies (same as navbar)
  const user_name = Cookies.get('full_name') || "Guest User";
  const currentUser = Cookies.get('user_id') || "USER-GUEST-001";
  const userImage = Cookies.get('user_image') || '';
  const userEmail = currentUser; // Assuming user_id is the email

  // Fetch patient data from Patient doctype
  const { data: patientData, isLoading: patientLoading, error: patientError } = useFrappeGetDocList("Patient", {
    fields: ["*"],
    filters: [["email", "=", userEmail]], // Filter by logged-in user's email
    limit_page_length: 1,
  });

  // Try fetching all patients (for debugging) - remove this after testing
  const { data: allPatients } = useFrappeGetDocList("Patient", {
    fields: ["name", "patient_name", "email", "mobile", "phone"],
    limit_page_length: 5,
  });

  // Debug: Console log the data
  console.log("=== PATIENT DATA DEBUG ===");
  console.log("User Email (filter):", userEmail);
  console.log("Patient Data (filtered):", patientData);
  console.log("All Patients (first 5):", allPatients);
  console.log("Patient Loading:", patientLoading);
  console.log("Patient Error:", patientError);
  console.log("========================");

  // Dynamic patient data from logged-in user
  const patientInfo = {
    name: user_name,
    id: currentUser,
    // age: "40", 
    // blood: patientData[0]?.blood_group, 
    // phone: patientData[0]?.phone ,
    // email: patientData[0]?.email, // This could be dynamic too if stored in cookies
    // address: "Kolkata, West Bengal",
    // emergencyContact: "+91 87654 32109"
  };

  const getInitials = () => {
    if (user_name && user_name !== "Guest User") {
      return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'U';
  };

  // Sample appointments data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Adam Smith",
      specialty: "Cardiologist",
      date: "Jan 25, 2025",
      time: "10:30 AM",
      status: "confirmed",
      location: "Cardiac Health Care, Wall Street, London"
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Physician",
      date: "Feb 2, 2025",
      time: "2:00 PM",
      status: "pending",
      location: "City Medical Center"
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Michael Chen",
      specialty: "Neurologist",
      date: "Jan 10, 2025",
      diagnosis: "Migraine",
      prescription: true
    },
    {
      id: 4,
      doctor: "Dr. Emily Davis",
      specialty: "Orthopedic",
      date: "Dec 28, 2024",
      diagnosis: "Back Pain",
      prescription: true
    }
  ];

  // Lab Reports Data
  const labReports = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      date: "Jan 15, 2025",
      doctor: "Dr. Sarah Johnson",
      status: "Normal",
      downloadable: true
    },
    {
      id: 2,
      testName: "Lipid Profile",
      date: "Jan 12, 2025",
      doctor: "Dr. Adam Smith",
      status: "Review Required",
      downloadable: true
    },
    {
      id: 3,
      testName: "Thyroid Function Test",
      date: "Dec 20, 2024",
      doctor: "Dr. Michael Chen",
      status: "Normal",
      downloadable: true
    }
  ];

  // Medical History Data
  const medicalHistory = [
    {
      id: 1,
      condition: "Hypertension",
      diagnosedDate: "March 2020",
      status: "Ongoing",
      doctor: "Dr. Adam Smith"
    },
    {
      id: 2,
      condition: "Migraine",
      diagnosedDate: "June 2019",
      status: "Managed",
      doctor: "Dr. Michael Chen"
    },
    {
      id: 3,
      condition: "Lower Back Pain",
      diagnosedDate: "December 2024",
      status: "Treated",
      doctor: "Dr. Emily Davis"
    }
  ];

  // Allergies Data
  const allergies = [
    { id: 1, allergen: "Penicillin", reaction: "Skin rash", severity: "Moderate" },
    { id: 2, allergen: "Peanuts", reaction: "Difficulty breathing", severity: "Severe" },
    { id: 3, allergen: "Dust mites", reaction: "Sneezing, runny nose", severity: "Mild" }
  ];

  // Current Medications
  const currentMedications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Adam Smith",
      startDate: "March 2020"
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      prescribedBy: "Dr. Emily Davis",
      startDate: "Dec 2024"
    }
  ];

  // Vaccination History
  const vaccinations = [
    { id: 1, vaccine: "COVID-19 (Pfizer)", date: "Jan 2025", nextDue: "Jan 2026" },
    { id: 2, vaccine: "Influenza", date: "Oct 2024", nextDue: "Oct 2025" },
    { id: 3, vaccine: "Tetanus", date: "March 2020", nextDue: "March 2030" }
  ];

  // Vital Signs Data
  const vitalSigns = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-50" },
    { label: "Temperature", value: "98.6", unit: "°F", icon: Thermometer, color: "text-orange-500", bgColor: "bg-orange-50" },
    { label: "Oxygen", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
  ];

  // Lab Test Results
  const labTests = [
    { name: "Complete Blood Count", date: "Jan 15, 2025", status: "completed", result: "Normal" },
    { name: "Lipid Profile", date: "Jan 12, 2025", status: "completed", result: "Review Required" },
    { name: "Thyroid Function", date: "Jan 20, 2025", status: "pending", result: "-" }
  ];

  // Medical Departments
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

  const handleDownloadPrescription = (appointmentId) => {
    console.log(`Downloading prescription for appointment ${appointmentId}`);
    // Implement download logic
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action logic
  };

  const tabs = [
    { id: 'appointments', label: 'Past Appointments', icon: Calendar },
    { id: 'lab-reports', label: 'Lab Reports', icon: TestTube },
    { id: 'medical-history', label: 'Medical History', icon: History },
    { id: 'allergies', label: 'Allergies', icon: ShieldAlert },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'vaccinations', label: 'Vaccinations', icon: Syringe }
  ];

  const calculateAge = (dob) => {
    if (!dob) return "Not specified";

    const birthDate = new Date(dob);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      return "Not specified";
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    // Format the output
    if (years === 0 && months === 0) {
      return "Less than 1 month";
    } else if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${years} yr${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} yr${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
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
                        Diagnosis: <span className="font-medium">{appointment.diagnosis}</span>
                      </span>
                    </div>
                  </div>
                  {appointment.prescription && (
                    <button
                      onClick={() => handleDownloadPrescription(appointment.id)}
                      className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Prescription
                    </button>
                  )}
                </div>
                {appointment.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'lab-reports':
        return (
          <div className="space-y-4">
            {labReports.map((report) => (
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
                      <span className={`text-sm font-medium ${report.status === 'Normal' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  {report.downloadable && (
                    <button
                      onClick={() => handleDownloadPrescription(report.id)}
                      className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  )}
                </div>
                {report.results && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Test Results:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(report.results).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium text-gray-800 ml-1">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
                      {condition.severity && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${condition.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                          condition.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                          {condition.severity}
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${condition.status === 'Ongoing' ? 'bg-red-100 text-red-700' :
                        condition.status === 'Managed' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                        {condition.status}
                      </span>
                    </div>
                  </div>
                </div>
                {condition.treatment && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Treatment:</strong> {condition.treatment}
                    </p>
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
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-600">
                        Diagnosed: {allergy.diagnosedDate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${allergy.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                    allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                    {allergy.severity}
                  </span>
                </div>
                {allergy.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {allergy.notes}
                    </p>
                  </div>
                )}
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
                <div className="space-y-2">
                  {med.purpose && (
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Purpose:</strong> {med.purpose}
                      </p>
                    </div>
                  )}
                  {med.instructions && (
                    <div className="p-2 bg-green-50 rounded">
                      <p className="text-sm text-green-800">
                        <strong>Instructions:</strong> {med.instructions}
                      </p>
                    </div>
                  )}
                  {med.sideEffects && (
                    <div className="p-2 bg-yellow-50 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>Side Effects:</strong> {med.sideEffects}
                      </p>
                    </div>
                  )}
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
                <div className="mt-3 space-y-2">
                  {vaccine.location && (
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {vaccine.location}
                    </p>
                  )}
                  {vaccine.batchNumber && (
                    <p className="text-sm text-gray-600">
                      <strong>Batch #:</strong> {vaccine.batchNumber}
                    </p>
                  )}
                  {vaccine.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {vaccine.notes}
                      </p>
                    </div>
                  )}
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Blo Me</h1>
        <p className="text-gray-600">Manage your health records, appointments, and medical history</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <CalendarCheck className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">12</span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Total Appointments</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-green-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">8</span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Prescriptions</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <TestTube className="w-8 h-8 text-purple-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">15</span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Lab Reports</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <Syringe className="w-8 h-8 text-orange-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">6</span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Vaccinations</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Patient Encounter Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setShowPatientDetails(!showPatientDetails)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {userImage ? (
                    <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-blue-200 shadow-lg">
                      <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {getInitials()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
                    <p className="text-sm text-gray-500">Click to view your medical profile</p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showPatientDetails ? 'rotate-90' : ''}`} />
              </div>
            </div>

            {showPatientDetails && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {patientLoading ? (
                  <div className="mt-4 flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading patient information...</div>
                  </div>
                ) : patientError ? (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-600 text-sm">Error loading patient data: {patientError.message}</p>
                  </div>
                ) : patientData && patientData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.patient_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Patient ID</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Age</p>
                      <p className="font-medium text-gray-800">{calculateAge(patientData[0]?.dob)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.blood_group || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Gender</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.sex || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Contact</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.phone || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
                      <p className="font-medium text-gray-800">{patientData[0]?.mobile || 'Not specified'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> No patient record found. Please complete your patient registration to see detailed medical information.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.date}
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {appointment.location}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {appointment.status === 'confirmed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <Clock className="w-3 h-3 inline mr-1" />}
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Records Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Medical Records</h3>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeTab === tab.id
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

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Vital Signs */}
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

          {/* Lab Test Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Lab Tests</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {labTests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{test.name}</p>
                    <p className="text-xs text-gray-500">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${test.status === 'completed'
                      ? test.result === 'Normal' ? 'text-green-600' : 'text-orange-600'
                      : 'text-gray-400'
                      }`}>
                      {test.result}
                    </span>
                    {test.status === 'completed' && (
                      <button className="block mt-1 text-xs text-blue-600 hover:text-blue-700">
                        <Download className="w-3 h-3 inline mr-1" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Departments */}
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

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Actions</h3>

            <div className="relative space-y-4">
              {/* Enroll Patient Card */}
              <div
                onClick={() => handleQuickAction('enroll')}
                className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xl font-bold mb-1">New</div>
                    <div className="text-white text-sm opacity-90">Enroll Patient</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Emergency Call Card */}
              <div
                onClick={() => handleQuickAction('emergency')}
                className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xl font-bold mb-1">911</div>
                    <div className="text-white text-sm opacity-90">Emergency Call</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </div>

              {/* Medical History Card */}
              <div
                onClick={() => handleQuickAction('history')}
                className="relative bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xl font-bold mb-1">View</div>
                    <div className="text-white text-sm opacity-90">Medical History</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Medicine Reminder Card */}
              <div
                onClick={() => handleQuickAction('reminder')}
                className="relative bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xl font-bold mb-1">Set</div>
                    <div className="text-white text-sm opacity-90">Medicine Reminder</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Bell className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Find Doctor Card */}
              <div
                onClick={() => handleQuickAction('findDoctor')}
                className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 -mt-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xl font-bold mb-1">Find</div>
                    <div className="text-white text-sm opacity-90">Find Doctor</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBloMe;