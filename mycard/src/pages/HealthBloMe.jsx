

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










































// // HealthBloMe.js - Complete Health Dashboard Component with Lab Test Integration

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

//   // Fetch Lab Test data for the current patient
//   const { data: labTestData, isLoading: labTestLoading, error: labTestError } = useFrappeGetDocList("Lab Test", {
//     fields: [
//       "name",
//       "lab_test_name",
//       "template",
//       "status",
//       "result_date",
//       "time",
//       "practitioner_name",
//       "requesting_department",
//       "patient",
//       "patient_name",
//       "docstatus",
//       "expected_result_date",
//       "department",
//       "service_request"
//     ],
//     filters: [
//       ["patient_name", "=", user_name], // Filter by patient name
//       ["docstatus", "=", 1] // Only get submitted lab tests
//     ],
//     orderBy: {
//       field: "result_date",
//       order: "desc"
//     },
//     limit_page_length: 20,
//   });

//   // Fetch Patient Appointments for the current patient
//   const { data: appointmentData, isLoading: appointmentLoading } = useFrappeGetDocList("Patient Appointment", {
//     fields: [
//       "name",
//       "appointment_date",
//       "appointment_datetime",
//       "appointment_time",
//       "appointment_type",
//       "practitioner",
//       "practitioner_name",
//       "department",
//       "service_unit",
//       "status",
//       "patient",
//       "patient_name",
//       "title",
//       "duration",
//       "mode_of_payment",
//       "paid_amount",
//       "invoiced"
//     ],
//     filters: [
//       ["patient_name", "=", user_name]
//     ],
//     orderBy: {
//       field: "appointment_date",
//       order: "desc"
//     },
//     limit_page_length: 20,
//   });

//   // Debug: Console log the data
//   console.log("=== PATIENT DATA DEBUG ===");
//   console.log("User Email (filter):", userEmail);
//   console.log("Patient Data (filtered):", patientData);
//   console.log("Lab Test Data:", labTestData);
//   console.log("Lab Test Loading:", labTestLoading);
//   console.log("Lab Test Error:", labTestError);
//   console.log("========================");

//   // Dynamic patient data from logged-in user
//   const patientInfo = {
//     name: user_name,
//     id: currentUser,
//   };

//   const getInitials = () => {
//     if (user_name && user_name !== "Guest User") {
//       return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
//     }
//     return 'U';
//   };

//   // Process Lab Test data for display
//   const labReports = labTestData ? labTestData.map((test, index) => ({
//     id: index + 1,
//     testName: test.lab_test_name || test.template,
//     date: test.result_date ? new Date(test.result_date).toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     }) : 'Pending',
//     doctor: test.practitioner_name || 'Not specified',
//     status: test.status === 'Completed' ? 'Completed' : test.status === 'Approved' ? 'Normal' : 'Pending',
//     downloadable: test.status === 'Completed' || test.status === 'Approved',
//     department: test.requesting_department || test.department,
//     labTestId: test.name,
//     serviceRequest: test.service_request
//   })) : [];

//   // Process all appointments for the patient
//   const allAppointments = appointmentData ? appointmentData
//     .map((apt, index) => ({
//       id: index + 1,
//       doctor: apt.practitioner_name,
//       specialty: apt.department,
//       date: new Date(apt.appointment_date).toLocaleDateString('en-US', { 
//         year: 'numeric', 
//         month: 'short', 
//         day: 'numeric' 
//       }),
//       rawDate: apt.appointment_date, // for sorting
//       time: apt.appointment_time ? 
//         new Date(`2000-01-01 ${apt.appointment_time}`).toLocaleTimeString('en-US', { 
//           hour: 'numeric', 
//           minute: '2-digit', 
//           hour12: true 
//         }) : 'TBD',
//       status: apt.status,
//       location: apt.service_unit || `${apt.department} Department`,
//       appointmentId: apt.name,
//       appointmentType: apt.appointment_type || 'Consultation',
//       duration: apt.duration,
//       invoiced: apt.invoiced,
//       serviceUnit: apt.service_unit
//     }))
//     .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate)) // Sort by date, newest first
//     : [];

//   // For backward compatibility with stats
//   const pastAppointments = allAppointments.filter(apt => 
//     apt.status === 'Closed' || new Date(apt.rawDate) < new Date()
//   );

//   // Calculate statistics
//   const totalAppointments = appointmentData ? appointmentData.length : 0;
//   const totalLabReports = labTestData ? labTestData.length : 0;
//   const completedLabTests = labTestData ? labTestData.filter(test => test.status === 'Completed' || test.status === 'Approved').length : 0;
//   const pendingLabTests = labTestData ? labTestData.filter(test => test.status === 'Pending' || test.status === 'Partial').length : 0;

//   // Medical History Data (keeping as static for now - can be replaced with actual data later)
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

//   // Allergies Data (keeping as static for now)
//   const allergies = [
//     { id: 1, allergen: "Penicillin", reaction: "Skin rash", severity: "Moderate" },
//     { id: 2, allergen: "Peanuts", reaction: "Difficulty breathing", severity: "Severe" },
//     { id: 3, allergen: "Dust mites", reaction: "Sneezing, runny nose", severity: "Mild" }
//   ];

//   // Current Medications (keeping as static for now)
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

//   // Vaccination History (keeping as static for now)
//   const vaccinations = [
//     { id: 1, vaccine: "COVID-19 (Pfizer)", date: "Jan 2025", nextDue: "Jan 2026" },
//     { id: 2, vaccine: "Influenza", date: "Oct 2024", nextDue: "Oct 2025" },
//     { id: 3, vaccine: "Tetanus", date: "March 2020", nextDue: "March 2030" }
//   ];

//   // Vital Signs Data (keeping as static for now)
//   const vitalSigns = [
//     { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
//     { label: "Heart Rate", value: "72", unit: "bpm", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-50" },
//     { label: "Temperature", value: "98.6", unit: "°F", icon: Thermometer, color: "text-orange-500", bgColor: "bg-orange-50" },
//     { label: "Oxygen", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
//   ];

//   // Recent Lab Tests for sidebar (max 3)
//   const recentLabTests = labReports.slice(0, 3).map(report => ({
//     name: report.testName,
//     date: report.date,
//     status: report.status === 'Completed' ? 'completed' : 'pending',
//     result: report.status === 'Completed' ? 'Normal' : '-'
//   }));

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

//   const handleDownloadLabReport = (labTestId) => {
//     console.log(`Downloading lab report: ${labTestId}`);
//     // Implement download logic - you can call a Frappe API endpoint to get the PDF
//     // Example: window.open(`/api/method/healthcare.healthcare.doctype.lab_test.lab_test.download_pdf?name=${labTestId}`, '_blank');
//   };

//   const handleDownloadPrescription = (appointmentId) => {
//     console.log(`Downloading prescription for appointment ${appointmentId}`);
//     // Implement download logic
//   };

//   const handleQuickAction = (action) => {
//     console.log(`Quick action: ${action}`);
//     // Implement quick action logic
//   };

//   const tabs = [
//     { id: 'appointments', label: 'All Appointments', icon: Calendar },
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
//             {appointmentLoading ? (
//               <div className="text-center py-8">
//                 <div className="text-gray-500">Loading appointments...</div>
//               </div>
//             ) : allAppointments.length > 0 ? (
//               allAppointments.map((appointment) => (
//                 <div key={appointment.id} className="border border-gray-100 rounded-lg p-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
//                       <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                       <div className="flex items-center mt-2 space-x-4">
//                         <span className="text-sm text-gray-600">
//                           <Calendar className="w-4 h-4 inline mr-1" />
//                           {appointment.date}
//                         </span>
//                         <span className="text-sm text-gray-600">
//                           <Clock className="w-4 h-4 inline mr-1" />
//                           {appointment.time}
//                         </span>
//                         <span className="text-sm text-gray-600">
//                           Type: <span className="font-medium">{appointment.appointmentType}</span>
//                         </span>
//                       </div>
//                       {appointment.serviceUnit && (
//                         <div className="mt-1">
//                           <span className="text-sm text-gray-600">
//                             Unit: <span className="font-medium">{appointment.serviceUnit}</span>
//                           </span>
//                         </div>
//                       )}
//                       <div className="mt-2">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                           appointment.status === 'Closed' ? 'bg-green-100 text-green-700' :
//                           appointment.status === 'No Show' ? 'bg-red-100 text-red-700' :
//                           appointment.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
//                           appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
//                           'bg-yellow-100 text-yellow-700'
//                         }`}>
//                           {appointment.status}
//                         </span>
//                       </div>
//                     </div>
//                     {appointment.invoiced && (
//                       <button
//                         onClick={() => handleDownloadPrescription(appointment.appointmentId)}
//                         className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
//                       >
//                         <Download className="w-4 h-4 mr-2" />
//                         Invoice
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 No appointments found
//               </div>
//             )}
//           </div>
//         );

//       case 'lab-reports':
//         return (
//           <div className="space-y-4">
//             {labTestLoading ? (
//               <div className="text-center py-8">
//                 <div className="text-gray-500">Loading lab reports...</div>
//               </div>
//             ) : labReports.length > 0 ? (
//               labReports.map((report) => (
//                 <div key={report.id} className="border border-gray-100 rounded-lg p-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h4 className="font-medium text-gray-800">{report.testName}</h4>
//                       <p className="text-sm text-gray-500">Ordered by: {report.doctor}</p>
//                       <div className="flex items-center mt-2 space-x-4">
//                         <span className="text-sm text-gray-600">
//                           <Calendar className="w-4 h-4 inline mr-1" />
//                           {report.date}
//                         </span>
//                         <span className={`text-sm font-medium ${
//                           report.status === 'Completed' || report.status === 'Normal' ? 'text-green-600' : 
//                           report.status === 'Pending' ? 'text-yellow-600' : 'text-orange-600'
//                         }`}>
//                           {report.status}
//                         </span>
//                         {report.department && (
//                           <span className="text-sm text-gray-600">
//                             Dept: {report.department}
//                           </span>
//                         )}
//                       </div>
//                       {report.serviceRequest && (
//                         <div className="mt-1">
//                           <span className="text-xs text-gray-500">
//                             Service Request: {report.serviceRequest}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     {report.downloadable && (
//                       <button
//                         onClick={() => handleDownloadLabReport(report.labTestId)}
//                         className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
//                       >
//                         <Download className="w-4 h-4 mr-2" />
//                         Download
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 No lab reports found
//               </div>
//             )}
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
//                   </div>
//                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//                     allergy.severity === 'Severe' ? 'bg-red-100 text-red-700' :
//                     allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
//                     'bg-green-100 text-green-700'
//                   }`}>
//                     {allergy.severity}
//                   </span>
//                 </div>
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
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
//               {totalAppointments}
//             </span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Total Appointments</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <FileText className="w-8 h-8 text-green-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
//               {pastAppointments.filter(apt => apt.prescription).length}
//             </span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Prescriptions</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <TestTube className="w-8 h-8 text-purple-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
//               {totalLabReports}
//             </span>
//           </div>
//           <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Lab Reports</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
//           <div className="flex items-center justify-between mb-4">
//             <Syringe className="w-8 h-8 text-orange-500 group-hover:text-blue-500 transition-colors" />
//             <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
//               {vaccinations.length}
//             </span>
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
//                 ) : patientData && patientData.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Full Name</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.patient_name}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Patient ID</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Age</p>
//                       <p className="font-medium text-gray-800">{calculateAge(patientData[0]?.dob)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Blood Group</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.blood_group || 'Not specified'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Gender</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.sex || 'Not specified'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Contact</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.phone || 'Not specified'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Email</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
//                       <p className="font-medium text-gray-800">{patientData[0]?.mobile || 'Not specified'}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
//                     <p className="text-yellow-800 text-sm">
//                       <strong>Note:</strong> No patient record found. Please complete your patient registration to see detailed medical information.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* All Appointments */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-800">All Appointments</h3>
//               <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Book Appointment
//               </button>
//             </div>

//             <div className="space-y-4 max-h-96 overflow-y-auto">
//               {appointmentLoading ? (
//                 <div className="text-center py-8">
//                   <div className="text-gray-500">Loading appointments...</div>
//                 </div>
//               ) : allAppointments.length > 0 ? (
//                 allAppointments.map((appointment) => (
//                   <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-start space-x-4">
//                         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Stethoscope className="w-6 h-6 text-blue-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
//                           <p className="text-sm text-gray-500">{appointment.specialty}</p>
//                           <div className="flex items-center mt-2 text-sm text-gray-600">
//                             <Calendar className="w-4 h-4 mr-1" />
//                             {appointment.date}
//                             <Clock className="w-4 h-4 ml-3 mr-1" />
//                             {appointment.time}
//                             {appointment.duration && (
//                               <span className="ml-2 text-xs text-gray-500">
//                                 ({appointment.duration} min)
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center mt-1 text-sm text-gray-600">
//                             <MapPin className="w-4 h-4 mr-1" />
//                             {appointment.location}
//                           </div>
//                           <div className="mt-1">
//                             <span className="text-xs text-gray-500 mr-2">Type: {appointment.appointmentType}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end space-y-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           appointment.status === 'Closed' ? 'bg-green-100 text-green-700' :
//                           appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
//                           appointment.status === 'Open' || appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700' :
//                           appointment.status === 'No Show' ? 'bg-red-100 text-red-700' :
//                           appointment.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
//                           'bg-gray-100 text-gray-700'
//                         }`}>
//                           {appointment.status === 'Closed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : 
//                            appointment.status === 'No Show' ? <XCircle className="w-3 h-3 inline mr-1" /> :
//                            appointment.status === 'Cancelled' ? <XCircle className="w-3 h-3 inline mr-1" /> :
//                            <Clock className="w-3 h-3 inline mr-1" />}
//                           {appointment.status}
//                         </span>
//                         {appointment.invoiced && (
//                           <button
//                             onClick={() => handleDownloadPrescription(appointment.appointmentId)}
//                             className="flex items-center px-2 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100 transition-colors"
//                           >
//                             <Download className="w-3 h-3 mr-1" />
//                             Invoice
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   No appointments found
//                 </div>
//               )}
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
//                     className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
//                       activeTab === tab.id
//                         ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
//                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//                     }`}
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
//               <button 
//                 onClick={() => setActiveTab('lab-reports')}
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//               >
//                 View All
//               </button>
//             </div>

//             <div className="space-y-3">
//               {labTestLoading ? (
//                 <div className="text-center py-4">
//                   <div className="text-gray-500 text-sm">Loading tests...</div>
//                 </div>
//               ) : recentLabTests.length > 0 ? (
//                 recentLabTests.map((test, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">{test.name}</p>
//                       <p className="text-xs text-gray-500">{test.date}</p>
//                     </div>
//                     <div className="text-right">
//                       <span className={`text-xs font-medium ${
//                         test.status === 'completed'
//                           ? test.result === 'Normal' ? 'text-green-600' : 'text-orange-600'
//                           : 'text-gray-400'
//                       }`}>
//                         {test.result}
//                       </span>
//                       {test.status === 'completed' && (
//                         <button className="block mt-1 text-xs text-blue-600 hover:text-blue-700">
//                           <Download className="w-3 h-3 inline mr-1" />
//                           Download
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-4 text-gray-500 text-sm">
//                   No recent lab tests
//                 </div>
//               )}
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





















// HealthBloMe.js - Complete Health Dashboard Component with Lab Test Integration and Appointment Booking Modal

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useFrappeGetDocList, useFrappeCreateDoc } from 'frappe-react-sdk';
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
  Search,
  X,
  Video,
  Building2,
  UserPlus,
  Calendar as CalendarIcon,
  Info
} from 'lucide-react';

const HealthBloMe = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patient: '',
    patient_name: '',
    appointment_for: 'Patient', // Required field - either 'Patient' or 'Group'
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

  // Fetch Healthcare Practitioners
  const { data: practitionersData, isLoading: practitionersLoading, error: practitionersError } = useFrappeGetDocList("Healthcare Practitioner", {
    fields: ["name", "practitioner_name", "department", "mobile"],
    filters: [["active", "=", 1]],
    orderBy: {
      field: "practitioner_name",
      order: "asc"
    },
    limit_page_length: 100
  });

  // Fetch Medical Departments
  const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = useFrappeGetDocList("Medical Department", {
    fields: ["name", "department"],
    orderBy: {
      field: "department",
      order: "asc"
    },
    limit_page_length: 100
  });

  // Fetch Healthcare Service Units
  const { data: serviceUnitsData, isLoading: serviceUnitsLoading, error: serviceUnitsError } = useFrappeGetDocList("Healthcare Service Unit", {
    fields: ["name", "service_unit", "service_unit_type", "is_group"],
    filters: [["is_group", "=", 0]],
    orderBy: {
      field: "service_unit",
      order: "asc"
    },
    limit_page_length: 100
  });

  // Fetch Lab Test data for the current patient
  const { data: labTestData, isLoading: labTestLoading, error: labTestError } = useFrappeGetDocList("Lab Test", {
    fields: [
      "name",
      "lab_test_name",
      "template",
      "status",
      "result_date",
      "time",
      "practitioner_name",
      "requesting_department",
      "patient",
      "patient_name",
      "docstatus",
      "expected_result_date",
      "department",
      "service_request"
    ],
    filters: [
      ["patient_name", "=", user_name], // Filter by patient name
      ["docstatus", "=", 1] // Only get submitted lab tests
    ],
    orderBy: {
      field: "result_date",
      order: "desc"
    },
    limit_page_length: 20,
  });

  // Fetch Patient Appointments for the current patient
  const { data: appointmentData, isLoading: appointmentLoading, mutate: refreshAppointments } = useFrappeGetDocList("Patient Appointment", {
    fields: [
      "name",
      "appointment_date",
      "appointment_datetime",
      "appointment_time",
      "appointment_type",
      "practitioner",
      "practitioner_name",
      "department",
      "service_unit",
      "status",
      "patient",
      "patient_name",
      "title",
      "duration",
      "mode_of_payment",
      "paid_amount",
      "invoiced"
    ],
    filters: [
      ["patient_name", "=", user_name]
    ],
    orderBy: {
      field: "appointment_date",
      order: "desc"
    },
    limit_page_length: 20,
  });

  // Create appointment hook
  const { createDoc } = useFrappeCreateDoc();

  // Initialize form with patient data when modal opens
  useEffect(() => {
    if (showAppointmentModal && patientData && patientData.length > 0) {
      setAppointmentForm(prev => ({
        ...prev,
        patient: patientData[0].name,
        patient_name: patientData[0].patient_name || user_name,
        appointment_for: 'Patient' // Ensure this is always set
      }));
    }
  }, [showAppointmentModal, patientData, user_name]);

  // Filter practitioners based on selected department - MEMOIZED
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
    { name: 'DR-009', practitioner_name: 'Dr. David Lee', department: 'ENT' },
    { name: 'DR-010', practitioner_name: 'Dr. Jennifer Taylor', department: 'Ophthalmology' },
    { name: 'DR-011', practitioner_name: 'Dr. Christopher Martin', department: 'Psychiatry' },
    { name: 'DR-012', practitioner_name: 'Dr. Amanda White', department: 'Emergency' },
    { name: 'DR-013', practitioner_name: 'Dr. Daniel Thompson', department: 'Maternity' },
    { name: 'DR-014', practitioner_name: 'Dr. Rachel Green', department: 'Maternity' }
  ], []);

  // Use fallback practitioners if API fails or returns empty - MEMOIZED
  const availablePractitioners = useMemo(() => {
    return (filteredPractitioners.length > 0 || practitionersLoading) 
      ? filteredPractitioners 
      : fallbackPractitioners.filter(p => !appointmentForm.department || p.department === appointmentForm.department);
  }, [filteredPractitioners, practitionersLoading, fallbackPractitioners, appointmentForm.department]);

  // Debug logging - only when modal opens or data changes
  useEffect(() => {
    if (showAppointmentModal) {
      console.log("=== APPOINTMENT MODAL DEBUG ===");
      console.log("Departments Data:", departmentsData);
      console.log("Practitioners Data:", practitionersData);
      console.log("Service Units Data:", serviceUnitsData);
      console.log("Selected Department:", appointmentForm.department);
      console.log("Available Practitioners:", availablePractitioners);
      console.log("Using Fallback Data:", (!practitionersData || practitionersData.length === 0) && !practitionersLoading);
      console.log("========================");
    }
  }, [showAppointmentModal, appointmentForm.department, practitionersData, serviceUnitsData, availablePractitioners, practitionersLoading]);

  // Dynamic patient data from logged-in user
  const patientInfo = {
    name: user_name,
    id: currentUser,
  };

  const getInitials = () => {
    if (user_name && user_name !== "Guest User") {
      return user_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'U';
  };

  // Handle form input changes - MEMOIZED with useCallback
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

  // Handle appointment submission - MEMOIZED with useCallback
  const handleAppointmentSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // Validate required fields first
      if (!appointmentForm.patient || !appointmentForm.department || !appointmentForm.practitioner || !appointmentForm.appointment_date || !appointmentForm.appointment_time) {
        alert('Please fill all required fields');
        setIsSubmitting(false);
        return false;
      }

      // Prepare data for submission
      const appointmentData = {
        doctype: "Patient Appointment",
        patient: appointmentForm.patient,
        patient_name: appointmentForm.patient_name,
        appointment_for: appointmentForm.appointment_for || 'Patient', // Required field
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

      // Add video conferencing fields if enabled
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
      setShowAppointmentModal(false);
      resetAppointmentForm();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    
    return false; // Prevent any default behavior
  }, [appointmentForm, createDoc, refreshAppointments, isSubmitting]);

  // Reset appointment form - MEMOIZED with useCallback
  const resetAppointmentForm = useCallback(() => {
    setAppointmentForm({
      patient: '',
      patient_name: '',
      appointment_for: 'Patient', // Required field
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

  // Process Lab Test data for display
  const labReports = labTestData ? labTestData.map((test, index) => ({
    id: index + 1,
    testName: test.lab_test_name || test.template,
    date: test.result_date ? new Date(test.result_date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) : 'Pending',
    doctor: test.practitioner_name || 'Not specified',
    status: test.status === 'Completed' ? 'Completed' : test.status === 'Approved' ? 'Normal' : 'Pending',
    downloadable: test.status === 'Completed' || test.status === 'Approved',
    department: test.requesting_department || test.department,
    labTestId: test.name,
    serviceRequest: test.service_request
  })) : [];

  // Process all appointments for the patient
  const allAppointments = appointmentData ? appointmentData
    .map((apt, index) => ({
      id: index + 1,
      doctor: apt.practitioner_name,
      specialty: apt.department,
      date: new Date(apt.appointment_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      rawDate: apt.appointment_date, // for sorting
      time: apt.appointment_time ? 
        new Date(`2000-01-01 ${apt.appointment_time}`).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        }) : 'TBD',
      status: apt.status,
      location: apt.service_unit || `${apt.department} Department`,
      appointmentId: apt.name,
      appointmentType: apt.appointment_type || 'Consultation',
      duration: apt.duration,
      invoiced: apt.invoiced,
      serviceUnit: apt.service_unit
    }))
    .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate)) // Sort by date, newest first
    : [];

  // For backward compatibility with stats
  const pastAppointments = allAppointments.filter(apt => 
    apt.status === 'Closed' || new Date(apt.rawDate) < new Date()
  );

  // Calculate statistics
  const totalAppointments = appointmentData ? appointmentData.length : 0;
  const totalLabReports = labTestData ? labTestData.length : 0;
  const completedLabTests = labTestData ? labTestData.filter(test => test.status === 'Completed' || test.status === 'Approved').length : 0;
  const pendingLabTests = labTestData ? labTestData.filter(test => test.status === 'Pending' || test.status === 'Partial').length : 0;

  // Medical History Data (keeping as static for now - can be replaced with actual data later)
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

  // Allergies Data (keeping as static for now)
  const allergies = [
    { id: 1, allergen: "Penicillin", reaction: "Skin rash", severity: "Moderate" },
    { id: 2, allergen: "Peanuts", reaction: "Difficulty breathing", severity: "Severe" },
    { id: 3, allergen: "Dust mites", reaction: "Sneezing, runny nose", severity: "Mild" }
  ];

  // Current Medications (keeping as static for now)
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

  // Vaccination History (keeping as static for now)
  const vaccinations = [
    { id: 1, vaccine: "COVID-19 (Pfizer)", date: "Jan 2025", nextDue: "Jan 2026" },
    { id: 2, vaccine: "Influenza", date: "Oct 2024", nextDue: "Oct 2025" },
    { id: 3, vaccine: "Tetanus", date: "March 2020", nextDue: "March 2030" }
  ];

  // Vital Signs Data (keeping as static for now)
  const vitalSigns = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-50" },
    { label: "Temperature", value: "98.6", unit: "°F", icon: Thermometer, color: "text-orange-500", bgColor: "bg-orange-50" },
    { label: "Oxygen", value: "98", unit: "%", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
  ];

  // Recent Lab Tests for sidebar (max 3)
  const recentLabTests = labReports.slice(0, 3).map(report => ({
    name: report.testName,
    date: report.date,
    status: report.status === 'Completed' ? 'completed' : 'pending',
    result: report.status === 'Completed' ? 'Normal' : '-'
  }));

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

  const handleDownloadLabReport = (labTestId) => {
    console.log(`Downloading lab report: ${labTestId}`);
    // Implement download logic - you can call a Frappe API endpoint to get the PDF
    // Example: window.open(`/api/method/healthcare.healthcare.doctype.lab_test.lab_test.download_pdf?name=${labTestId}`, '_blank');
  };

  const handleDownloadPrescription = (appointmentId) => {
    console.log(`Downloading prescription for appointment ${appointmentId}`);
    // Implement download logic
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action logic
  };

  const tabs = [
    { id: 'appointments', label: 'All Appointments', icon: Calendar },
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
            {appointmentLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading appointments...</div>
              </div>
            ) : allAppointments.length > 0 ? (
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
                        onClick={() => handleDownloadPrescription(appointment.appointmentId)}
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
            ) : labReports.length > 0 ? (
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
                      {report.serviceRequest && (
                        <div className="mt-1">
                          <span className="text-xs text-gray-500">
                            Service Request: {report.serviceRequest}
                          </span>
                        </div>
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
                        'bg-green-100 text-green-700'
                      }`}>
                        {condition.status}
                      </span>
                    </div>
                  </div>
                </div>
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Appointment Booking Modal */}
      {showAppointmentModal && (
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
                  <p className="text-sm text-gray-500">{user_name} with Dr. {appointmentForm.practitioner_name || '...'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAppointmentModal(false);
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
                          {departmentsLoading ? 'Loading departments...' :
                           departmentsError ? 'Select Department' :
                           'Select Department'}
                        </option>
                        {/* Show departments from API if available */}
                        {departmentsData && departmentsData.length > 0 ? (
                          departmentsData.map((dept) => (
                            <option key={dept.name} value={dept.name}>
                              {dept.department || dept.name}
                            </option>
                          ))
                        ) : (
                          /* Fallback departments if API fails or returns empty */
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
                      {departmentsError && (
                        <p className="text-xs text-yellow-600 mt-1">Using default departments. Some options may not be available.</p>
                      )}
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
                           practitionersError ? 'Error loading practitioners' :
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
                      {practitionersError && (
                        <p className="text-xs text-red-500 mt-1">Failed to load practitioners. Using default list.</p>
                      )}
                      {appointmentForm.department && availablePractitioners.length === 0 && !practitionersLoading && (
                        <p className="text-xs text-yellow-600 mt-1">No practitioners found for {appointmentForm.department}. Try selecting a different department.</p>
                      )}
                      {!practitionersData && !practitionersLoading && availablePractitioners.length > 0 && (
                        <p className="text-xs text-blue-600 mt-1">Using sample practitioners. Configure Healthcare Practitioners in ERPNext for actual data.</p>
                      )}
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
                          {serviceUnitsLoading ? 'Loading service units...' :
                           serviceUnitsError ? 'Select Service Unit (Optional)' :
                           (!serviceUnitsData || serviceUnitsData.length === 0) ? 'Select Service Unit (Optional)' :
                           'Select Service Unit (Optional)'}
                        </option>
                        {/* Show service units from API if available */}
                        {serviceUnitsData && serviceUnitsData.length > 0 ? (
                          serviceUnitsData.map((unit) => (
                            <option key={unit.name} value={unit.name}>
                              {unit.service_unit || unit.name} {unit.service_unit_type ? `(${unit.service_unit_type})` : ''}
                            </option>
                          ))
                        ) : (
                          /* Fallback service units if API fails or returns empty */
                          <>
                            <option value="OPD-01">OPD Room 1 (Consultation)</option>
                            <option value="OPD-02">OPD Room 2 (Consultation)</option>
                            <option value="OPD-03">OPD Room 3 (Consultation)</option>
                            <option value="ER-01">Emergency Room 1 (Emergency)</option>
                            <option value="ER-02">Emergency Room 2 (Emergency)</option>
                            <option value="LAB-01">Laboratory 1 (Diagnostic)</option>
                            <option value="XRAY-01">X-Ray Room (Imaging)</option>
                            <option value="USG-01">Ultrasound Room (Imaging)</option>
                            <option value="OT-01">Operation Theater 1 (Surgery)</option>
                            <option value="OT-02">Operation Theater 2 (Surgery)</option>
                            <option value="WARD-01">General Ward (Inpatient)</option>
                            <option value="ICU-01">ICU Bed 1 (Critical Care)</option>
                            <option value="MATERNITY-01">Maternity Ward (Maternity)</option>
                            <option value="PEDS-01">Pediatric Ward (Pediatrics)</option>
                          </>
                        )}
                      </select>
                      {serviceUnitsError && (
                        <p className="text-xs text-red-500 mt-1">Failed to load service units.</p>
                      )}
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
                    setShowAppointmentModal(false);
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
      )}

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
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {totalAppointments}
            </span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Total Appointments</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-green-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {pastAppointments.filter(apt => apt.prescription).length}
            </span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Prescriptions</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <TestTube className="w-8 h-8 text-purple-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {totalLabReports}
            </span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Lab Reports</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <Syringe className="w-8 h-8 text-orange-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {vaccinations.length}
            </span>
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

          {/* All Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">All Appointments</h3>
              <button 
                onClick={() => setShowAppointmentModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {appointmentLoading ? (
                <div className="text-center py-8">
                  <div className="text-gray-500">Loading appointments...</div>
                </div>
              ) : allAppointments.length > 0 ? (
                allAppointments.map((appointment) => (
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
                            {appointment.duration && (
                              <span className="ml-2 text-xs text-gray-500">
                                ({appointment.duration} min)
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appointment.location}
                          </div>
                          <div className="mt-1">
                            <span className="text-xs text-gray-500 mr-2">Type: {appointment.appointmentType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Closed' ? 'bg-green-100 text-green-700' :
                          appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                          appointment.status === 'Open' || appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700' :
                          appointment.status === 'No Show' ? 'bg-red-100 text-red-700' :
                          appointment.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {appointment.status === 'Closed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : 
                           appointment.status === 'No Show' ? <XCircle className="w-3 h-3 inline mr-1" /> :
                           appointment.status === 'Cancelled' ? <XCircle className="w-3 h-3 inline mr-1" /> :
                           <Clock className="w-3 h-3 inline mr-1" />}
                          {appointment.status}
                        </span>
                        {appointment.invoiced && (
                          <button
                            onClick={() => handleDownloadPrescription(appointment.appointmentId)}
                            className="flex items-center px-2 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100 transition-colors"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No appointments found
                </div>
              )}
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
              ) : recentLabTests.length > 0 ? (
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
                        <button className="block mt-1 text-xs text-blue-600 hover:text-blue-700">
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























// // HealthBloMe.jsx - Fetches User from local, Patient from production
// // User data from 192.168.101.182, Patient data from 202.165.197.58

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import Cookies from 'js-cookie';
// import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeGetDoc } from 'frappe-react-sdk';
// import { Plus } from 'lucide-react';

// // Import sub-components from components folder
// import QuickStats from '../components/HealthBloMe/QuickStats';
// import PatientInfo from '../components/HealthBloMe/PatientInfo';
// import AppointmentsList from '../components/HealthBloMe/AppointmentsList';
// import MedicalRecordsTabs from '../components/HealthBloMe/MedicalRecordsTabs';
// import VitalSigns from '../components/HealthBloMe/VitalSigns';
// import LabTestsSidebar from '../components/HealthBloMe/LabTestsSidebar';
// import DepartmentGrid from '../components/HealthBloMe/DepartmentGrid';
// import QuickActions from '../components/HealthBloMe/QuickActions';
// import AppointmentModal from '../components/HealthBloMe/AppointmentModal';

// const HealthBloMe = () => {
//   const [showPatientDetails, setShowPatientDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState('appointments');
//   const [showAppointmentModal, setShowAppointmentModal] = useState(false);
//   const [cardBloMeNumber, setCardBloMeNumber] = useState(null);
//   const [patientId, setPatientId] = useState(null);
//   const [patientData, setPatientData] = useState(null);
//   const [patientLoading, setPatientLoading] = useState(false);
//   const [patientError, setPatientError] = useState(null);

//   // Get dynamic user data from cookies
//   const user_name = Cookies.get('full_name') || "Guest User";
//   const currentUser = Cookies.get('user_id') || "USER-GUEST-001";
//   const userImage = Cookies.get('user_image') || '';
//   const userEmail = currentUser;

//   // STEP 1: Fetch User from LOCAL server (192.168.101.182) to get Card Blo Me Number
//   const { data: userData, isLoading: userLoading, error: userError } = useFrappeGetDoc("User", userEmail);

//   // STEP 2: When we get the Card Blo Me Number, fetch Patient from PRODUCTION server (202.165.197.58)
//   useEffect(() => {
//     if (userData && userData.card_blo_me_number) {
//       const userCardNumber = userData.card_blo_me_number;
//       setCardBloMeNumber(userCardNumber);
//       console.log("Card Blo Me Number found in User:", userCardNumber);
      
//       // Fetch patient from production server using direct API call
//       fetchPatientFromProduction(userCardNumber);
//     }
//   }, [userData]);

//   // Function to fetch Patient from PRODUCTION server (202.165.197.58)
//   const fetchPatientFromProduction = async (cardNumber) => {
//     setPatientLoading(true);
//     setPatientError(null);
    
//     try {
//       // PRODUCTION SERVER URL
//       const url = `http://202.165.197.58:8002/api/resource/Patient/?filters=[["card_blo_me_number","=","${cardNumber}"]]&fields=["*"]`;
//       console.log("Fetching patient from production:", url);
      
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': 'token 5312bae822ce9d8:a2f1543d757a43a',
//           'Content-Type': 'application/json',
//         },
//         credentials: 'omit'
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log("Patient API response:", result);
      
//       if (result.data && result.data.length > 0) {
//         const patient = result.data[0];
//         setPatientData([patient]); // Wrap in array to match component expectations
//         setPatientId(patient.name);
//         console.log("Patient fetched successfully:", patient.name);
//         console.log("Patient details:", patient);
//       } else {
//         console.log("No patient found with Card Blo Me Number:", cardNumber);
//         setPatientError("No patient record found");
//       }
//     } catch (error) {
//       console.error("Error fetching patient from production:", error);
//       setPatientError(error.message);
      
//       // If CORS error, inform user
//       if (error.message === "Failed to fetch") {
//         setPatientError("Cannot connect to production server. Please check CORS settings or use VPN.");
//       }
//     } finally {
//       setPatientLoading(false);
//     }
//   };

//   // IMPORTANT: Fetch Lab Tests and Appointments from PRODUCTION server too
//   // Since patient is on production, their lab tests and appointments are also there
//   const [labTestData, setLabTestData] = useState(null);
//   const [labTestLoading, setLabTestLoading] = useState(false);
//   const [appointmentData, setAppointmentData] = useState(null);
//   const [appointmentLoading, setAppointmentLoading] = useState(false);

//   // Fetch Lab Tests from production when patient ID is available
//   useEffect(() => {
//     if (patientId) {
//       fetchLabTestsFromProduction(patientId);
//       fetchAppointmentsFromProduction(patientId);
//     }
//   }, [patientId]);

//   // Function to fetch Lab Tests from PRODUCTION server
//   const fetchLabTestsFromProduction = async (patientId) => {
//     setLabTestLoading(true);
//     try {
//       const url = `http://202.165.197.58:8002/api/resource/Lab Test?fields=["name","lab_test_name","template","status","result_date","practitioner_name","patient","patient_name","docstatus","invoiced"]&filters=[["patient","=","${patientId}"],["docstatus","=",1]]&order_by=result_date desc&limit_page_length=20`;
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': 'token 5312bae822ce9d8:a2f1543d757a43a',
//           'Content-Type': 'application/json',
//         },
//         credentials: 'omit'
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         setLabTestData(result.data || []);
//         console.log("Lab tests fetched:", result.data?.length || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching lab tests:", error);
//     } finally {
//       setLabTestLoading(false);
//     }
//   };

//   // Function to fetch Appointments from PRODUCTION server
//   const fetchAppointmentsFromProduction = async (patientId) => {
//     setAppointmentLoading(true);
//     try {
//       const url = `http://202.165.197.58:8002/api/resource/Patient Appointment?fields=["name","appointment_date","appointment_time","appointment_type","practitioner","practitioner_name","department","service_unit","status","patient","patient_name","duration","invoiced","ref_sales_invoice"]&filters=[["patient","=","${patientId}"]]&order_by=appointment_date desc&limit_page_length=20`;
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': 'token 5312bae822ce9d8:a2f1543d757a43a',
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         setAppointmentData(result.data || []);
//         console.log("Appointments fetched:", result.data?.length || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     } finally {
//       setAppointmentLoading(false);
//     }
//   };

//   // Refresh function for appointments
//   const refreshAppointments = () => {
//     if (patientId) {
//       fetchAppointmentsFromProduction(patientId);
//     }
//   };

//   // Process Lab Test data for display
//   const labReports = labTestData ? labTestData.map((test, index) => ({
//     id: index + 1,
//     testName: test.lab_test_name || test.template,
//     date: test.result_date ? new Date(test.result_date).toLocaleDateString('en-US', { 
//       year: 'numeric', month: 'short', day: 'numeric' 
//     }) : 'Pending',
//     doctor: test.practitioner_name || 'Not specified',
//     status: test.status === 'Completed' ? 'Completed' : test.status === 'Approved' ? 'Normal' : 'Pending',
//     downloadable: test.status === 'Completed' || test.status === 'Approved',
//     labTestId: test.name,
//     invoiced: test.invoiced
//   })) : [];

//   // Process all appointments for the patient
//   const allAppointments = appointmentData ? appointmentData
//     .map((apt, index) => ({
//       id: index + 1,
//       doctor: apt.practitioner_name,
//       specialty: apt.department,
//       date: new Date(apt.appointment_date).toLocaleDateString('en-US', { 
//         year: 'numeric', month: 'short', day: 'numeric' 
//       }),
//       rawDate: apt.appointment_date,
//       time: apt.appointment_time ? 
//         new Date(`2000-01-01 ${apt.appointment_time}`).toLocaleTimeString('en-US', { 
//           hour: 'numeric', minute: '2-digit', hour12: true 
//         }) : 'TBD',
//       status: apt.status,
//       location: apt.service_unit || `${apt.department} Department`,
//       appointmentId: apt.name,
//       appointmentType: apt.appointment_type || 'Consultation',
//       duration: apt.duration,
//       invoiced: apt.invoiced,
//       refInvoice: apt.ref_sales_invoice
//     }))
//     .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
//     : [];

//   // Calculate statistics
//   const totalAppointments = appointmentData ? appointmentData.length : 0;
//   const totalLabReports = labTestData ? labTestData.length : 0;
//   const completedLabTests = labTestData ? labTestData.filter(test => test.status === 'Completed' || test.status === 'Approved').length : 0;

//   // For backward compatibility with stats
//   const pastAppointments = allAppointments.filter(apt => 
//     apt.status === 'Closed' || new Date(apt.rawDate) < new Date()
//   );

//   // Recent Lab Tests for sidebar (max 3)
//   const recentLabTests = labReports.slice(0, 3).map(report => ({
//     name: report.testName,
//     date: report.date,
//     status: report.status === 'Completed' ? 'completed' : 'pending',
//     result: report.status === 'Completed' ? 'Normal' : '-',
//     labTestId: report.labTestId
//   }));

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Appointment Booking Modal */}
//       {showAppointmentModal && (
//         <AppointmentModal
//           showModal={showAppointmentModal}
//           setShowModal={setShowAppointmentModal}
//           patientData={patientData}
//           patientId={patientId}
//           user_name={user_name}
//           cardBloMeNumber={cardBloMeNumber}
//           refreshAppointments={refreshAppointments}
//         />
//       )}

//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Blo Me</h1>
//         <p className="text-gray-600">Manage your health records, appointments, and medical history</p>
//       </div>

//       {/* Quick Stats */}
//       <QuickStats
//         totalAppointments={totalAppointments}
//         pastAppointments={pastAppointments}
//         totalLabReports={totalLabReports}
//         completedLabTests={completedLabTests}
//       />

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Patient Information Card */}
//           <PatientInfo
//             showPatientDetails={showPatientDetails}
//             setShowPatientDetails={setShowPatientDetails}
//             patientData={patientData}
//             patientLoading={patientLoading}
//             patientError={patientError}
//             userImage={userImage}
//             user_name={user_name}
//           />

//           {/* All Appointments */}
//           <AppointmentsList
//             allAppointments={allAppointments}
//             appointmentLoading={appointmentLoading}
//             setShowAppointmentModal={setShowAppointmentModal}
//           />

//           {/* Medical Records Tabs */}
//           <MedicalRecordsTabs
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             appointmentData={appointmentData}
//             appointmentLoading={appointmentLoading}
//             labReports={labReports}
//             labTestLoading={labTestLoading}
//             patientData={patientData}
//             allAppointments={allAppointments}
//           />
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Vital Signs */}
//           <VitalSigns />

//           {/* Lab Test Results Sidebar */}
//           <LabTestsSidebar
//             recentLabTests={recentLabTests}
//             labTestLoading={labTestLoading}
//             setActiveTab={setActiveTab}
//           />

//           {/* Medical Departments Grid */}
//           <DepartmentGrid />

//           {/* Quick Actions */}
//           <QuickActions />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealthBloMe;