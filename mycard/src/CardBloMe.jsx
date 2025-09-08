
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './App.css';
import Form1 from './from1.jsx';
import Form2 from './from2.jsx';
import Form3 from './from3.jsx';
import Form4 from './from4.jsx';
import Form5 from './from5.jsx';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useFrappeGetDoc } from 'frappe-react-sdk';

const CardBloMe = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSaved, setHasSaved] = useState({ 1: false, 2: false, 3: false, 4: false });
  // const [cardData, setCardBloMeData] = useState(null);

  const countries = useMemo(() => [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Belize", code: "+501" },
    { name: "Benin", code: "+229" },
    { name: "Bhutan", code: "+975" },
    { name: "Bolivia", code: "+591" },
    { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Botswana", code: "+267" },
    { name: "Brazil", code: "+55" },
    { name: "Brunei", code: "+673" },
    { name: "Bulgaria", code: "+359" },
    { name: "Burkina Faso", code: "+226" },
    { name: "Burundi", code: "+257" },
    { name: "Cambodia", code: "+855" },
    { name: "Cameroon", code: "+237" },
    { name: "Canada", code: "+1" },
    { name: "Cape Verde", code: "+238" },
    { name: "Chad", code: "+235" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Colombia", code: "+57" },
    { name: "Comoros", code: "+269" },
    { name: "Congo", code: "+242" },
    { name: "Costa Rica", code: "+506" },
    { name: "Croatia", code: "+385" },
    { name: "Cuba", code: "+53" },
    { name: "Cyprus", code: "+357" },
    { name: "Czech Republic", code: "+420" },
    { name: "Denmark", code: "+45" },
    { name: "Djibouti", code: "+253" },
    { name: "Dominican Republic", code: "+1809" },
    { name: "Ecuador", code: "+593" },
    { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" },
    { name: "Estonia", code: "+372" },
    { name: "Ethiopia", code: "+251" },
    { name: "Fiji", code: "+679" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "Gabon", code: "+241" },
    { name: "Gambia", code: "+220" },
    { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" },
    { name: "Greece", code: "+30" },
    { name: "Guatemala", code: "+502" },
    { name: "Guinea", code: "+224" },
    { name: "Guyana", code: "+592" },
    { name: "Haiti", code: "+509" },
    { name: "Honduras", code: "+504" },
    { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Jamaica", code: "+1876" },
    { name: "Japan", code: "+81" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kuwait", code: "+965" },
    { name: "Kyrgyzstan", code: "+996" },
    { name: "Laos", code: "+856" },
    { name: "Latvia", code: "+371" },
    { name: "Lebanon", code: "+961" },
    { name: "Lesotho", code: "+266" },
    { name: "Liberia", code: "+231" },
    { name: "Libya", code: "+218" },
    { name: "Lithuania", code: "+370" },
    { name: "Luxembourg", code: "+352" },
    { name: "Madagascar", code: "+261" },
    { name: "Malawi", code: "+265" },
    { name: "Malaysia", code: "+60" },
    { name: "Maldives", code: "+960" },
    { name: "Mali", code: "+223" },
    { name: "Malta", code: "+356" },
    { name: "Mauritania", code: "+222" },
    { name: "Mauritius", code: "+230" },
    { name: "Mexico", code: "+52" },
    { name: "Moldova", code: "+373" },
    { name: "Monaco", code: "+377" },
    { name: "Mongolia", code: "+976" },
    { name: "Montenegro", code: "+382" },
    { name: "Morocco", code: "+212" },
    { name: "Mozambique", code: "+258" },
    { name: "Myanmar", code: "+95" },
    { name: "Namibia", code: "+264" },
    { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" },
    { name: "New Zealand", code: "+64" },
    { name: "Nicaragua", code: "+505" },
    { name: "Niger", code: "+227" },
    { name: "Nigeria", code: "+234" },
    { name: "North Korea", code: "+850" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Panama", code: "+507" },
    { name: "Papua New Guinea", code: "+675" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Philippines", code: "+63" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Qatar", code: "+974" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Rwanda", code: "+250" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Senegal", code: "+221" },
    { name: "Serbia", code: "+381" },
    { name: "Singapore", code: "+65" },
    { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" },
    { name: "Solomon Islands", code: "+677" },
    { name: "Somalia", code: "+252" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sudan", code: "+249" },
    { name: "Suriname", code: "+597" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" },
    { name: "Tajikistan", code: "+992" },
    { name: "Tanzania", code: "+255" },
    { name: "Thailand", code: "+66" },
    { name: "Togo", code: "+228" },
    { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" },
    { name: "Turkmenistan", code: "+993" },
    { name: "Uganda", code: "+256" },
    { name: "Ukraine", code: "+380" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Uzbekistan", code: "+998" },
    { name: "Vanuatu", code: "+678" },
    { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" },
    { name: "Yemen", code: "+967" },
    { name: "Zambia", code: "+260" },
    { name: "Zimbabwe", code: "+263" }
  ], []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

  const current_user = Cookies.get('user_id');
  const userImage = Cookies.get('user_image')

  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    if (!current_user) return;
    fetch(`/api/resource/User/${current_user}`, {
      headers: { "Accept": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      setUserData(data.data);
      if(!data.data.card_blo_me_number) {
        setCardData(prev => ({
      ...prev,
      ...{
        
        first_name: data?.data?.first_name || '',
        middle_name: data?.data?.middle_name || '',
        last_name: data?.data?.last_name || '',
        gender: data?.data?.gender || '',
        date_of_birth: data?.data?.birth_date || '' 
      },
    }));
      }
      return fetch(`/api/resource/Card%20Blo%20Me%20Page1/${data.data.card_blo_me_number}`, {
        headers: { "Accept": "application/json" }
      });
    })
    .then(res => res.json())
    .then(cardData => setCardData(cardData.data));
  }, [current_user]);
    
    
    

  const [formData, setFormData] = useState({
    naming_series: 'CBM-',
    status: 'Drafted',
    inactive_date: '',
    inactive_reason: '',
    title: '',
    first_name: cardData?.first_name || '',
    middle_name: cardData?.middle_name || '',
    last_name: cardData?.last_name || '',
    gender: cardData?.gender || '',
    date_of_birth: cardData?.date_of_birth || '',
    blood_group: cardData?.blood_group || '',
    resident_status: '',
    portion_nolot_no: '',
    village: '',
    town: '',
    district: cardData?.district || '',
    province: '',
    country: cardData?.country || 'Papua New Guinea',
    po_box: '',
    postal_code: '',
    portion_lot_no: '',
    village_street: '',
    town1: '',
    district1: cardData?.district1 || '',
    province1: '',
    country1: cardData?.country1 || 'Papua New Guinea',
    po_box1: '',
    postal_code1: '',
    personal_country_code: '+675',
    phone_no: '',
    personal_email_address: '',
    office_country_code: '+675',
    mobile_no: cardData?.mobile_no || '',
    office_email: '',
    place_of_birth: 'Hospital',
    hospital_name: cardData?.hospital_name || '',
    village1: '',
    district2: cardData?.district2 || '',
    province2: '',
    country2: cardData?.country2 || '',
    location: cardData?.location || '',
    location1: '',
    check_the_box_if_you_willing_to_provide_your_family_details: false,
    mothers_full_name: '',
    mother_middle_name: '',
    mother_last_name: '',
    mother_origin_village: '',
    mother_district: '',
    mother_province: '',
    mother_country: 'Papua New Guinea',
    mother_alive: 'Yes',
    mothers_contact_no: '',
    mothers_email: '',
    cause_of_death: '',
    fathers_full_name: '',
    father_middle_name: '',
    father_last_name: '',
    father_origin_village: '',
    father_district: '',
    father_province: '',
    father_country: 'Papua New Guinea',
    father_alive: 'Yes',
    fathers_contact_no: '',
    fathers_email: '',
    father_cause_of_death: '',
    marital_status: 'Married',
    date: new Date().toISOString().split('T')[0],
    age: '',
    height: '',
    weight: '',
    bmi: '',
    abdominal_circumference: '',
    hip_circumference: '',
    bp_systolic: '',
    diastolic: '',
    pulse_rate: '',
    blood_sugar: '',
    prevailing_medical_conditions: '',
    are_surgical_operation_done_in_the_past: 'No',
    type_of_operation: '',
    operation_date: '',
    are_you_taking_medications: 'No',
    blo_me_no: '',
    emergency_first_name: '',
    emergency_middle_name: '',
    emergency_last_name: '',
    emergency_gender: '',
    emergency_date_of_birth: '',
    emergency_blood_group: '',
    emergency_number: '',
    emergency_village: '',
    emergency_district: '',
    emergency_province: '',
    emergency_country: 'Papua New Guinea',
    emergency_personal_country_code: '+675',
    emergency_phone_no: '',
    emergency_office_country_code: '+675',
    emergency_phone_no1: '',
    emergency_personal_email: '',
    emergency_office_email: '',
    kin_firstname: '',
    kin_middlename: '',
    kin_lastname: '',
    kin_gender: '',
    kin_date_of_birth: '',
    kin_blood_group: '',
    kin_number: '',
    kin_village: '',
    kin_district: '',
    kin_province: '',
    kin_country: 'Papua New Guinea',
    kin_personal_country_code: '+675',
    kin_phone_no: '',
    kin_office_country_code: '+675',
    kin_office_phone_no: '',
    kin_personal_email: '',
    kin_office_email: '',
    bank_name: '',
    branch: '',
    BH_date: '',
    blome_no: '',
    account_no: '',
    declaration_name: '',
    signature: '',
    company: '',
    department: '',
    company_physical_address: '',
    po_box_address: '',
    employee_type_emailwebsite: '',
    supervisor_name: '',
    supervisor_position: '',
    supervisor_contact: '',
    supervisor_email: '',
    hr_manager_name: '',
    hr_manager_contact: '',
    hr_manager_email_address: '',
    nature_of_work: '',
    workplace_hazards: '',
    work_risk_type: '',
    alcohol: 'No',
    frequency_of_taking_alcohol: 'Never',
    smoking: 'No',
    frequency_of_smoking: 'Never',
    beteinut: 'No',
    frequency_of_beteinut: 'Never'
  });

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
  if (cardData) {
    setFormData(prev => ({
      ...prev,
      ...{
        // Only fill fields from cardData if they exist
        first_name: cardData.first_name || '',
        middle_name: cardData.middle_name || '',
        last_name: cardData.last_name || '',
        gender: cardData.gender || '',
        date_of_birth: cardData.date_of_birth || '',
        blood_group: cardData.blood_group || '',
        district: cardData.district || '',
        district1: cardData.district1 || '',
        mobile_no: cardData.mobile_no || '',
        hospital_name: cardData.hospital_name || '',
        district2: cardData.district2 || '',
        location: cardData.location || '',
        qr_code: cardData.qr_code || ''
        // Add more fields as needed...
      },
    }));
  }
}, [cardData]);


  const forms = useMemo(() => [
    { id: 1, name: 'Personal Info', icon: '👤' },
    { id: 2, name: 'Health Declaration', icon: '🏥' },
    { id: 3, name: 'Emergency & Bank', icon: '📋' },
    { id: 4, name: 'Employment & Lifestyle', icon: '💼' },
    { id: 5, name: 'Final Review', icon: '✅' }
  ], []);

  const isFormValid = useCallback(page => {
    switch (page) {
      case 1:
        return (
          formData.title.trim() &&
          formData.first_name.trim() &&
          formData.last_name.trim() &&
          formData.gender &&
          formData.date_of_birth &&
          formData.blood_group &&
          formData.resident_status &&
          formData.postal_code.trim() &&
          formData.postal_code1.trim()
        );
      case 2:
        if (!formData.check_the_box_if_you_willing_to_provide_your_family_details) {
          return (
            formData.marital_status
          );
        }
        return (
          // formData.mothers_full_name.trim() &&
          formData.mother_alive &&
          // (formData.mother_alive === 'Yes'
          //   ? formData.mothers_contact_no.trim() && formData.mothers_email.trim()
          //   : formData.cause_of_death.trim()
          // ) &&
          // formData.fathers_full_name.trim() &&
          formData.father_alive &&
          // (formData.father_alive === 'Yes'
          //   ? formData.fathers_contact_no.trim() && formData.fathers_email.trim()
          //   : formData.father_cause_of_death.trim()
          // ) &&
          formData.marital_status
          // formData.age &&
          // formData.height &&
          // formData.weight &&
          // formData.bmi
        );
      case 3:
        return (
          // formData.declaration_name.trim() &&
          formData.signature.trim()
        );
      // return (
      //   formData.emergency_first_name.trim() &&
      //   formData.emergency_phone_no.trim() &&
      //   formData.emergency_personal_email.trim() &&
      //   formData.kin_firstname.trim() &&
      //   formData.kin_phone_no.trim() &&
      //   formData.bank_name.trim() &&
      //   formData.account_no.trim() &&
      //   formData.declaration_name.trim() &&
      //   formData.signature.trim()
      // );
      case 4:
        return (
          formData.company.trim() &&
          formData.department.trim() &&
          // formData.supervisor_name.trim() &&
          // formData.supervisor_contact.trim() &&
          // formData.nature_of_work.trim()
          formData.alcohol &&
          formData.smoking &&
          formData.frequency_of_smoking &&
          formData.frequency_of_taking_alcohol
        );
      default:
        return true;
    }
  }, [formData]);


  const handleSaveForm = useCallback(async () => {
    if (!isFormValid(currentForm)) return;
    try {
      setIsSaving(true);
      await new Promise(r => setTimeout(r, 1500));
      setHasSaved(prev => ({ ...prev, [currentForm]: true }));

      // setModalTitle('Success');
      // setModalMessage(`Form ${currentForm} saved successfully!`);
      // setModalType('success');
      // setModalVisible(true);
      toast.success(`Form ${currentForm} saved successfully!`)

      if (currentForm < 5) {
        setCurrentForm(f => Math.min(5, f + 1));
      }

    } catch {
      // setModalTitle('Error');
      // setModalMessage('Error saving form. Please try again.');
      // setModalType('error');
      // setModalVisible(true);
      toast.error('Error saving form. Please try again.');

    } finally {
      setIsSaving(false);
    }
  }, [currentForm, isFormValid]);

  // const handleSaveForm = useCallback(async () => {
  //   if (!isFormValid(currentForm)) return;
  //   try {
  //     setIsSaving(true);
  //     await new Promise(r => setTimeout(r, 1500));
  //     setHasSaved(prev => ({ ...prev, [currentForm]: true }));
  //     alert(`Form ${currentForm} saved successfully!`);
  //   } catch {
  //     alert('Error saving form. Please try again.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // }, [currentForm, isFormValid]);

  // Final submission function
  const handleFinalSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);


      // Get child table data from hidden inputs
      const spouseDataElements = document.querySelector('[data-spouse-data="true"]');
      const childrenDataElements = document.querySelector('[data-children-data="true"]');

      const spouseData = spouseDataElements ? JSON.parse(spouseDataElements.value || '[]') : [];
      const childrenData = childrenDataElements ? JSON.parse(childrenDataElements.value || '[]') : [];

      // Step 1: Create Card Blo Me Page1 DocType
      console.log("Step 1: Creating Card Blo Me Page1...");

      const erpNextPayload1 = {
        naming_series: formData.naming_series,
        status: formData.status,
        inactive_date: formData.inactive_date,
        inactive_reason: formData.inactive_reason,

        // Personal Health Declaration fields
        title: formData.title,
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        gender: formData.gender,
        date_of_birth: formData.date_of_birth,
        blood_group: formData.blood_group,
        resident_status: formData.resident_status,

        // Current Address (as flat fields)
        portion_nolot_no: formData.portion_nolot_no,
        village: formData.village,
        town: formData.town,
        district: formData.district,
        province: formData.province,
        country: formData.country,
        po_box: formData.po_box,
        postal_code: formData.postal_code,

        // Physical Address section
        portion_lot_no: formData.portion_lot_no,
        village_street: formData.village_street,
        town1: formData.town1,
        district1: formData.district1,
        province1: formData.province1,
        country1: formData.country1,
        po_box1: formData.po_box1,
        postal_code1: formData.postal_code1,

        // Contact Details
        personal_contact_no_country_code: parseInt(formData.personal_country_code.replace('+', ''), 10),
        phone_no: formData.phone_no,
        personal_email_address: formData.personal_email_address,
        office_contact_no_country_code: parseInt(formData.office_country_code.replace('+', ''), 10),
        mobile_no: formData.mobile_no,
        office_email: formData.office_email,

        // Origin
        place_of_birth: formData.place_of_birth,
        hospital_name: formData.hospital_name,
        village1: formData.village1,
        district2: formData.district2,
        province2: formData.province2,
        country2: formData.country2,

        // Location fields
        location: formData.location,
        location1: formData.location1,
      };
      const currentUser = Cookies.get('user_id');
      const response1 = await fetch('/api/resource/Card Blo Me Page1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token b1c76d08aa8f177:5b0d80f9e2e2e48',
        },
        credentials: "omit",
        body: JSON.stringify(erpNextPayload1),
      });


      if (!response1.ok) {
        const errorText = await response1.text();
        throw new Error(`Step 1 failed: ${response1.status} ${response1.statusText} - ${errorText}`);
      }
      console.log("Response from Step 1:", response1);
      console.log("Response Status:", response1.status);
      console.log("Response Status Text:", response1.statusText);
      // console.log("Response Headers:", ;
      const result1 = await response1.json();
      const page1Name = result1.data.name;
      console.log("Result from Step 1:", page1Name);


      const card_blome_payload = {
        card_blo_me_number: result1.data.name
      }
      console.log("Updating User with Card Blo Me Number:", card_blome_payload);
      const update_user = await fetch(`/api/resource/User/${currentUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token b1c76d08aa8f177:5b0d80f9e2e2e48',
        },
        credentials: "omit",
        body: JSON.stringify(card_blome_payload),
      });
      if (update_user.ok) {
        console.log("User updated with Card Blo Me Number:", result1.data.name);
      } else {
        const errorText = await update_user.text();
        console.error(`Failed to update user: ${update_user.status} ${update_user.statusText} - ${errorText}`);
      }

      console.log("Step 1 completed. Page1 ID:", page1Name);

      // Step 2: Create Card Blo Me Page2 DocType with reference to Page1
      console.log("Step 2: Creating Card Blo Me Page2...");

      const erpNextPayload2 = {
        // Reference to Page1
        from1: page1Name,

        // Health Declaration
        check_the_box_if_you_willing_to_provide_your_family_details: formData.check_the_box_if_you_willing_to_provide_your_family_details ? 1 : 0,

        // Mother's Details
        mothers_full_name: formData.mothers_full_name,
        middle_name: formData.mother_middle_name,
        last_name: formData.mother_last_name,
        mother_origin_village: formData.mother_origin_village,
        district: formData.mother_district,
        province: formData.mother_province,
        country: formData.mother_country,
        mother_alive: formData.mother_alive,
        mothers_contact_no: formData.mothers_contact_no,
        mothers_email: formData.mothers_email,
        cause_of_death: formData.cause_of_death,

        // Father's Details
        fathers_full_name: formData.fathers_full_name,
        middle_name_1: formData.father_middle_name,
        last_name_1: formData.father_last_name,
        father_origin_village: formData.father_origin_village,
        district1: formData.father_district,
        province1: formData.father_province,
        country1: formData.father_country,
        father_alive: formData.father_alive,
        fathers_contact_no: formData.fathers_contact_no,
        fathers_email: formData.fathers_email,
        cause_ofdeath: formData.father_cause_of_death,

        // Marital Status
        marital_status: formData.marital_status,

        // Child Tables (only if married)
        ...(formData.marital_status === "Married" && {
          table_31: spouseData, // CRM Details of Spose
          table_32: childrenData, // CRM Details of Children
        }),

        // Basic Health Information
        date: formData.date,
        age: parseInt(formData.age) || 0,
        height: formData.height,
        weight: formData.weight,
        bmi: formData.bmi,
        abdominal_circumference: formData.abdominal_circumference,
        hip_circumference: formData.hip_circumference,
        bp_systolic: formData.bp_systolic,
        diastolic: formData.diastolic,
        pulse_rate: formData.pulse_rate,
        blood_sugar: formData.blood_sugar,
        prevailing_medical_conditionsdiseases: formData.prevailing_medical_conditions,
        are_surgical_operation_done_in_the_past: formData.are_surgical_operation_done_in_the_past,
        type_of_operation: formData.type_of_operation,
        date1: formData.operation_date,
        are_you_taking_any_medications_describe: formData.are_you_taking_medications,
        blo_me_no: formData.blo_me_no,
      };

      const response2 = await fetch('https://mycard.anantdv.com/api/resource/Card Blo Me Page2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token b1c76d08aa8f177:5b0d80f9e2e2e48',
        },
        credentials: "omit",
        body: JSON.stringify(erpNextPayload2),
      });

      if (!response2.ok) {
        const errorText = await response2.text();
        throw new Error(`Step 2 failed: ${response2.status} ${response2.statusText} - ${errorText}`);
      }

      const result2 = await response2.json();
      const page2Name = result2.data.name;
      console.log("Step 2 completed. Page2 ID:", page2Name);

      // Step 3: Create Card Blo Me Page3 DocType with reference to Page2
      console.log("Step 3: Creating Card Blo Me Page3...");

      const erpNextPayload3 = {
        // Reference to Page2
        from2: page2Name,

        // Emergency Contact Details
        emergency_first_name: formData.emergency_first_name,
        emergency_middle_name: formData.emergency_middle_name,
        emergency_last_name: formData.emergency_last_name,
        emergency_gender: formData.emergency_gender,
        emergency_date_of_birth: formData.emergency_date_of_birth,
        emergency_blood_group: formData.emergency_blood_group,
        emergency_number: formData.emergency_number,
        emergency_village: formData.emergency_village,
        emergency_district: formData.emergency_district,
        emergency_province: formData.emergency_province,
        emergency_country: formData.emergency_country,
        emergency_personal_country_code: formData.emergency_personal_country_code,
        emergency_phone_no: formData.emergency_phone_no,
        emergency_office_country_code: formData.emergency_office_country_code,
        emergency_phone_no1: formData.emergency_phone_no1,
        emergency_personal_email: formData.emergency_personal_email,
        emergency_office_email: formData.emergency_office_email,

        // Kin Details
        kin_firstname: formData.kin_firstname,
        kin_middlename: formData.kin_middlename,
        kin_lastname: formData.kin_lastname,
        kin_gender: formData.kin_gender,
        kin_date_of_birth: formData.kin_date_of_birth,
        kin_blood_group: formData.kin_blood_group,
        kin_number: formData.kin_number,
        kin_village: formData.kin_village,
        kin_district: formData.kin_district,
        kin_province: formData.kin_province,
        kin_country: formData.kin_country,
        kin_personal_country_code: formData.kin_personal_country_code,
        kin_phone_no: formData.kin_phone_no,
        kin_office_country_code: formData.kin_office_country_code,
        kin_office_phone_no: formData.kin_office_phone_no,
        kin_personal_email: formData.kin_personal_email,
        kin_office_email: formData.kin_office_email,

        // Bank Details
        bank_name: formData.bank_name,
        branch: formData.branch,
        account_no: formData.account_no,

        // Declaration
        declaration_name: formData.declaration_name,
        signature: formData.signature,
      };

      const response3 = await fetch('https://mycard.anantdv.com/api/resource/Card Blo Me Page3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token b1c76d08aa8f177:5b0d80f9e2e2e48',
        },
        credentials: "omit",
        body: JSON.stringify(erpNextPayload3),
      });

      if (!response3.ok) {
        const errorText = await response3.text();
        throw new Error(`Step 3 failed: ${response3.status} ${response3.statusText} - ${errorText}`);
      }

      const result3 = await response3.json();
      const page3Name = result3.data.name;
      console.log("Step 3 completed. Page3 ID:", page3Name);

      // Step 4: Create Card Blo Me Page4 DocType with reference to Page3
      console.log("Step 4: Creating Card Blo Me Page4...");

      const erpNextPayload4 = {
        // Reference to Page3
        from3: page3Name,

        // Employment Details
        company: formData.company,
        department: formData.department,
        company_physical_address: formData.company_physical_address,
        po_box_address: formData.po_box_address,
        employee_type_emailwebsite: formData.employee_type_emailwebsite,
        supervisor_name: formData.supervisor_name,
        supervisor_position: formData.supervisor_position,
        supervisor_contact: formData.supervisor_contact,
        supervisor_email: formData.supervisor_email,
        hr_manager_contact: formData.hr_manager_contact,
        hr_manager_email_address: formData.hr_manager_email_address,
        nature_of_work: formData.nature_of_work,
        workplace_hazards: formData.workplace_hazards,
        work_risk_type: formData.work_risk_type,

        // Lifestyle Information
        alcohol: formData.alcohol,
        frequency_of_taking_alcohol: formData.frequency_of_taking_alcohol,
        smoking: formData.smoking,
        frequency_of_smoking: formData.frequency_of_smoking,
        beteinut: formData.beteinut,
        frequency_of_beteinut: formData.frequency_of_beteinut,
      };

      const response4 = await fetch('https://mycard.anantdv.com/api/resource/Card Blo Me Page 4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token b1c76d08aa8f177:5b0d80f9e2e2e48',
        },
        credentials: "omit",
        body: JSON.stringify(erpNextPayload4),
      });

      if (!response4.ok) {
        const errorText = await response4.text();
        throw new Error(`Step 4 failed: ${response4.status} ${response4.statusText} - ${errorText}`);
      }

      const result4 = await response4.json();
      const page4Name = result4.data.name;
      console.log("Step 4 completed. Page4 ID:", page4Name);

      // All steps completed successfully
      console.log("All submissions completed successfully!");
      console.log("Document IDs created:", {
        page1: page1Name,
        page2: page2Name,
        page3: page3Name,
        page4: page4Name
      });

      setModalTitle('Application Submitted');
      setModalMessage(`Customer Created Successfully`);
      setModalType('success');
      setModalVisible(true);

    } catch (error) {
      console.error("Submission error:", error);
      alert(`❌ Error submitting application: ${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Custom Print Function
  // const handlePrint = useCallback(() => {
  //   const printWindow = window.open('', '_blank');
  //   const currentDate = new Date().toLocaleDateString();

  //   // const printContent = `
  //   //   <!DOCTYPE html>
  //   //   <html>
  //   //     <head>
  //   //       <title>Card Blo Me Registration - ${formData.first_name} ${formData.last_name}</title>
  //   //       <style>
  //   //         @media print {
  //   //           @page {
  //   //             margin: 0.5in;
  //   //             size: A4;
  //   //           }
  //   //           body {
  //   //             font-family: 'Arial', sans-serif;
  //   //             font-size: 12px;
  //   //             line-height: 1.4;
  //   //             color: #000;
  //   //             margin: 0;
  //   //             padding: 0;
  //   //           }
  //   //         }

  //   //         body {
  //   //           font-family: 'Arial', sans-serif;
  //   //           font-size: 12px;
  //   //           line-height: 1.4;
  //   //           color: #000;
  //   //           margin: 0;
  //   //           padding: 20px;
  //   //           background: white;
  //   //         }

  //   //         .print-header {
  //   //           text-align: center;
  //   //           border-bottom: 3px solid #2563eb;
  //   //           padding-bottom: 15px;
  //   //           margin-bottom: 25px;
  //   //         }

  //   //         .print-header h1 {
  //   //           color: #2563eb;
  //   //           font-size: 24px;
  //   //           font-weight: bold;
  //   //           margin: 0 0 5px 0;
  //   //         }

  //   //         .print-header h2 {
  //   //           color: #6b7280;
  //   //           font-size: 16px;
  //   //           font-weight: normal;
  //   //           margin: 0;
  //   //         }

  //   //         .print-meta {
  //   //           text-align: right;
  //   //           margin-bottom: 25px;
  //   //           font-size: 11px;
  //   //           color: #6b7280;
  //   //         }

  //   //         .section {
  //   //           margin-bottom: 25px;
  //   //           page-break-inside: avoid;
  //   //         }

  //   //         .section-title {
  //   //           background: #f3f4f6;
  //   //           color: #1f2937;
  //   //           font-size: 14px;
  //   //           font-weight: bold;
  //   //           padding: 8px 12px;
  //   //           margin-bottom: 12px;
  //   //           border-left: 4px solid #2563eb;
  //   //         }

  //   //         .field-group {
  //   //           display: flex;
  //   //           flex-wrap: wrap;
  //   //           gap: 15px;
  //   //           margin-bottom: 12px;
  //   //         }

  //   //         .field {
  //   //           flex: 1;
  //   //           min-width: 200px;
  //   //         }

  //   //         .field-label {
  //   //           font-weight: 600;
  //   //           color: #374151;
  //   //           margin-bottom: 2px;
  //   //           font-size: 11px;
  //   //           text-transform: uppercase;
  //   //           letter-spacing: 0.5px;
  //   //         }

  //   //         .field-value {
  //   //           padding: 6px 8px;
  //   //           border: 1px solid #d1d5db;
  //   //           background: #f9fafb;
  //   //           border-radius: 3px;
  //   //           min-height: 16px;
  //   //           font-size: 12px;
  //   //         }

  //   //         .field-value.empty {
  //   //           color: #9ca3af;
  //   //           font-style: italic;
  //   //         }

  //   //         .signature-section {
  //   //           margin-top: 40px;
  //   //           display: flex;
  //   //           justify-content: space-between;
  //   //           page-break-inside: avoid;
  //   //         }

  //   //         .signature-box {
  //   //           width: 45%;
  //   //           text-align: center;
  //   //         }

  //   //         .signature-line {
  //   //           border-bottom: 1px solid #000;
  //   //           margin-bottom: 5px;
  //   //           height: 40px;
  //   //         }

  //   //         .footer {
  //   //           margin-top: 30px;
  //   //           text-align: center;
  //   //           font-size: 10px;
  //   //           color: #6b7280;
  //   //           border-top: 1px solid #e5e7eb;
  //   //           padding-top: 15px;
  //   //         }

  //   //         @media print {
  //   //           .no-print {
  //   //             display: none !important;
  //   //           }
  //   //         }
  //   //       </style>
  //   //     </head>
  //   //     <body>
  //   //       <div class="print-header">
  //   //         <h1>Card Blo Me Registration Form</h1>
  //   //         <h2>Application Summary</h2>
  //   //       </div>

  //   //       <div class="print-meta">
  //   //         <strong>Application ID:</strong> ${formData.naming_series}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}<br>
  //   //         <strong>Status:</strong> ${formData.status}<br>
  //   //         <strong>Generated on:</strong> ${currentDate}
  //   //       </div>

  //   //       <!-- Personal Information Section -->
  //   //       <div class="section">
  //   //         <div class="section-title">👤 Personal Information</div>
  //   //         <div class="field-group">
  //   //           <div class="field">
  //   //             <div class="field-label">First Name</div>
  //   //             <div class="field-value ${!formData.first_name ? 'empty' : ''}">${formData.first_name || 'Not provided'}</div>
  //   //           </div>
  //   //           <div class="field">
  //   //             <div class="field-label">Middle Name</div>
  //   //             <div class="field-value ${!formData.middle_name ? 'empty' : ''}">${formData.middle_name || 'Not provided'}</div>
  //   //           </div>
  //   //           <div class="field">
  //   //             <div class="field-label">Last Name</div>
  //   //             <div class="field-value ${!formData.last_name ? 'empty' : ''}">${formData.last_name || 'Not provided'}</div>
  //   //           </div>
  //   //         </div>
  //   //         <div class="field-group">
  //   //           <div class="field">
  //   //             <div class="field-label">Title</div>
  //   //             <div class="field-value ${!formData.title ? 'empty' : ''}">${formData.title || 'Not provided'}</div>
  //   //           </div>
  //   //           <div class="field">
  //   //             <div class="field-label">Gender</div>
  //   //             <div class="field-value ${!formData.gender ? 'empty' : ''}">${formData.gender || 'Not provided'}</div>
  //   //           </div>
  //   //           <div class="field">
  //   //             <div class="field-label">Date of Birth</div>
  //   //             <div class="field-value ${!formData.date_of_birth ? 'empty' : ''}">${formData.date_of_birth || 'Not provided'}</div>
  //   //           </div>
  //   //         </div>
  //   //         <div class="field-group">
  //   //           <div class="field">
  //   //             <div class="field-label">Blood Group</div>
  //   //             <div class="field-value ${!formData.blood_group ? 'empty' : ''}">${formData.blood_group || 'Not provided'}</div>
  //   //           </div>
  //   //           <div class="field">
  //   //             <div class="field-label">Resident Status</div>
  //   //             <div class="field-value ${!formData.resident_status ? 'empty' : ''}">${formData.resident_status || 'Not provided'}</div>
  //   //           </div>
  //   //         </div>
  //   //       </div>

  //   //       <div class="footer">
  //   //         <p><strong>Card Blo Me Registration System</strong></p>
  //   //         <p>This document was generated automatically on ${currentDate}</p>
  //   //         <p>For inquiries, please contact our support team</p>
  //   //       </div>
  //   //     </body>
  //   //   </html>
  //   // `;
    // const printContent = `
    //   <!DOCTYPE html>
    //   <html>
    //     <head>
    //       <title>Card Blo Me Registration - ${formData.first_name} ${formData.last_name}</title>
    //       <style>
    //         @media print {
    //           @page {
    //             margin: 0.5in;
    //             size: A4;
    //           }
    //           body {
    //             font-family: 'Arial', sans-serif;
    //             font-size: 12px;
    //             line-height: 1.4;
    //             color: #000;
    //             margin: 0;
    //             padding: 0;
    //           }
    //         }
            
    //         body {
    //           font-family: 'Arial', sans-serif;
    //           font-size: 12px;
    //           line-height: 1.4;
    //           color: #000;
    //           margin: 0;
    //           padding: 20px;
    //           background: white;
    //         }
            
    //         .print-header {
    //           text-align: center;
    //           border-bottom: 3px solid #2563eb;
    //           padding-bottom: 15px;
    //           margin-bottom: 25px;
    //         }
            
    //         .print-header h1 {
    //           color: #2563eb;
    //           font-size: 24px;
    //           font-weight: bold;
    //           margin: 0 0 5px 0;
    //         }
            
    //         .print-header h2 {
    //           color: #6b7280;
    //           font-size: 16px;
    //           font-weight: normal;
    //           margin: 0;
    //         }
            
    //         .print-meta {
    //           text-align: right;
    //           margin-bottom: 25px;
    //           font-size: 11px;
    //           color: #6b7280;
    //         }
            
    //         .section {
    //           margin-bottom: 25px;
    //           page-break-inside: avoid;
    //         }
            
    //         .section-title {
    //           background: #f3f4f6;
    //           color: #1f2937;
    //           font-size: 14px;
    //           font-weight: bold;
    //           padding: 8px 12px;
    //           margin-bottom: 12px;
    //           border-left: 4px solid #2563eb;
    //         }
            
    //         .field-group {
    //           display: flex;
    //           flex-wrap: wrap;
    //           gap: 15px;
    //           margin-bottom: 12px;
    //         }
            
    //         .field {
    //           flex: 1;
    //           min-width: 200px;
    //         }
            
    //         .field-label {
    //           font-weight: 600;
    //           color: #374151;
    //           margin-bottom: 2px;
    //           font-size: 11px;
    //           text-transform: uppercase;
    //           letter-spacing: 0.5px;
    //         }
            
    //         .field-value {
    //           padding: 6px 8px;
    //           border: 1px solid #d1d5db;
    //           background: #f9fafb;
    //           border-radius: 3px;
    //           min-height: 16px;
    //           font-size: 12px;
    //         }
            
    //         .field-value.empty {
    //           color: #9ca3af;
    //           font-style: italic;
    //         }
            
    //         .signature-section {
    //           margin-top: 40px;
    //           display: flex;
    //           justify-content: space-between;
    //           page-break-inside: avoid;
    //         }
            
    //         .signature-box {
    //           width: 45%;
    //           text-align: center;
    //         }
            
    //         .signature-line {
    //           border-bottom: 1px solid #000;
    //           margin-bottom: 5px;
    //           height: 40px;
    //         }
            
    //         .footer {
    //           margin-top: 30px;
    //           text-align: center;
    //           font-size: 10px;
    //           color: #6b7280;
    //           border-top: 1px solid #e5e7eb;
    //           padding-top: 15px;
    //         }
            
    //         @media print {
    //           .no-print {
    //             display: none !important;
    //           }
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <div class="print-header">
    //         <h1>Card Blo Me Registration Form</h1>
    //         <h2>Application Summary</h2>
    //       </div>
          
    //       <div class="print-meta">
    //         <strong>Application ID:</strong> ${formData.naming_series}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}<br>
    //         <strong>Status:</strong> ${formData.status}<br>
    //         <strong>Generated on:</strong> ${currentDate}
    //       </div>

    //       <!-- Personal Information Section -->
    //       <div class="section">
    //         <div class="section-title">👤 Personal Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">First Name</div>
    //             <div class="field-value ${!formData.first_name ? 'empty' : ''}">${formData.first_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Middle Name</div>
    //             <div class="field-value ${!formData.middle_name ? 'empty' : ''}">${formData.middle_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Last Name</div>
    //             <div class="field-value ${!formData.last_name ? 'empty' : ''}">${formData.last_name || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Title</div>
    //             <div class="field-value ${!formData.title ? 'empty' : ''}">${formData.title || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Gender</div>
    //             <div class="field-value ${!formData.gender ? 'empty' : ''}">${formData.gender || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Date of Birth</div>
    //             <div class="field-value ${!formData.date_of_birth ? 'empty' : ''}">${formData.date_of_birth || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Blood Group</div>
    //             <div class="field-value ${!formData.blood_group ? 'empty' : ''}">${formData.blood_group || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Resident Status</div>
    //             <div class="field-value ${!formData.resident_status ? 'empty' : ''}">${formData.resident_status || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Address Information Section -->
    //       <div class="section">
    //         <div class="section-title">🏠 Address Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Village</div>
    //             <div class="field-value ${!formData.village ? 'empty' : ''}">${formData.village || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Town</div>
    //             <div class="field-value ${!formData.town ? 'empty' : ''}">${formData.town || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">District</div>
    //             <div class="field-value ${!formData.district ? 'empty' : ''}">${formData.district || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Province</div>
    //             <div class="field-value ${!formData.province ? 'empty' : ''}">${formData.province || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Country</div>
    //             <div class="field-value ${!formData.country ? 'empty' : ''}">${formData.country || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">PO Box</div>
    //             <div class="field-value ${!formData.po_box ? 'empty' : ''}">${formData.po_box || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Contact Information Section -->
    //       <div class="section">
    //         <div class="section-title">📞 Contact Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Personal Phone</div>
    //             <div class="field-value ${!formData.phone_no ? 'empty' : ''}">${formData.personal_country_code} ${formData.phone_no || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Office Phone</div>
    //             <div class="field-value ${!formData.mobile_no ? 'empty' : ''}">${formData.office_country_code} ${formData.mobile_no || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Personal Email</div>
    //             <div class="field-value ${!formData.personal_email_address ? 'empty' : ''}">${formData.personal_email_address || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Office Email</div>
    //             <div class="field-value ${!formData.office_email ? 'empty' : ''}">${formData.office_email || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Family Information Section -->
    //       <div class="section">
    //         <div class="section-title">👨‍👩‍👧‍👦 Family Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Mother's Full Name</div>
    //             <div class="field-value ${!formData.mothers_full_name ? 'empty' : ''}">${formData.mothers_full_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Mother Alive</div>
    //             <div class="field-value ${!formData.mother_alive ? 'empty' : ''}">${formData.mother_alive || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Mother's Contact</div>
    //             <div class="field-value ${!formData.mothers_contact_no ? 'empty' : ''}">${formData.mothers_contact_no || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Father's Full Name</div>
    //             <div class="field-value ${!formData.fathers_full_name ? 'empty' : ''}">${formData.fathers_full_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Father Alive</div>
    //             <div class="field-value ${!formData.father_alive ? 'empty' : ''}">${formData.father_alive || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Father's Contact</div>
    //             <div class="field-value ${!formData.fathers_contact_no ? 'empty' : ''}">${formData.fathers_contact_no || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Marital Status</div>
    //             <div class="field-value ${!formData.marital_status ? 'empty' : ''}">${formData.marital_status || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Health Information Section -->
    //       <div class="section">
    //         <div class="section-title">🏥 Health Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Age</div>
    //             <div class="field-value ${!formData.age ? 'empty' : ''}">${formData.age || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Height</div>
    //             <div class="field-value ${!formData.height ? 'empty' : ''}">${formData.height || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Weight</div>
    //             <div class="field-value ${!formData.weight ? 'empty' : ''}">${formData.weight || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">BMI</div>
    //             <div class="field-value ${!formData.bmi ? 'empty' : ''}">${formData.bmi || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Blood Pressure (Systolic)</div>
    //             <div class="field-value ${!formData.bp_systolic ? 'empty' : ''}">${formData.bp_systolic || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Blood Pressure (Diastolic)</div>
    //             <div class="field-value ${!formData.diastolic ? 'empty' : ''}">${formData.diastolic || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Medical Conditions</div>
    //             <div class="field-value ${!formData.prevailing_medical_conditions ? 'empty' : ''}">${formData.prevailing_medical_conditions || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Previous Surgery</div>
    //             <div class="field-value ${!formData.are_surgical_operation_done_in_the_past ? 'empty' : ''}">${formData.are_surgical_operation_done_in_the_past || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Taking Medications</div>
    //             <div class="field-value ${!formData.are_you_taking_medications ? 'empty' : ''}">${formData.are_you_taking_medications || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Emergency Contact Section -->
    //       <div class="section">
    //         <div class="section-title">🚨 Emergency Contact</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Emergency Contact Name</div>
    //             <div class="field-value ${!formData.emergency_first_name ? 'empty' : ''}">${formData.emergency_first_name} ${formData.emergency_middle_name} ${formData.emergency_last_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Emergency Phone</div>
    //             <div class="field-value ${!formData.emergency_phone_no ? 'empty' : ''}">${formData.emergency_personal_country_code} ${formData.emergency_phone_no || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Emergency Email</div>
    //             <div class="field-value ${!formData.emergency_personal_email ? 'empty' : ''}">${formData.emergency_personal_email || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Employment Information Section -->
    //       <div class="section">
    //         <div class="section-title">💼 Employment Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Company</div>
    //             <div class="field-value ${!formData.company ? 'empty' : ''}">${formData.company || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Department</div>
    //             <div class="field-value ${!formData.department ? 'empty' : ''}">${formData.department || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Supervisor Name</div>
    //             <div class="field-value ${!formData.supervisor_name ? 'empty' : ''}">${formData.supervisor_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Supervisor Contact</div>
    //             <div class="field-value ${!formData.supervisor_contact ? 'empty' : ''}">${formData.supervisor_contact || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Nature of Work</div>
    //             <div class="field-value ${!formData.nature_of_work ? 'empty' : ''}">${formData.nature_of_work || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Lifestyle Information Section -->
    //       <div class="section">
    //         <div class="section-title">🎯 Lifestyle Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Alcohol Consumption</div>
    //             <div class="field-value ${!formData.alcohol ? 'empty' : ''}">${formData.alcohol || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Frequency of Alcohol</div>
    //             <div class="field-value ${!formData.frequency_of_taking_alcohol ? 'empty' : ''}">${formData.frequency_of_taking_alcohol || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Smoking</div>
    //             <div class="field-value ${!formData.smoking ? 'empty' : ''}">${formData.smoking || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Frequency of Smoking</div>
    //             <div class="field-value ${!formData.frequency_of_smoking ? 'empty' : ''}">${formData.frequency_of_smoking || 'Not provided'}</div>
    //           </div>
    //         </div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Betel Nut</div>
    //             <div class="field-value ${!formData.beteinut ? 'empty' : ''}">${formData.beteinut || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Frequency of Betel Nut</div>
    //             <div class="field-value ${!formData.frequency_of_beteinut ? 'empty' : ''}">${formData.frequency_of_beteinut || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Bank Information Section -->
    //       <div class="section">
    //         <div class="section-title">🏦 Bank Information</div>
    //         <div class="field-group">
    //           <div class="field">
    //             <div class="field-label">Bank Name</div>
    //             <div class="field-value ${!formData.bank_name ? 'empty' : ''}">${formData.bank_name || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Branch</div>
    //             <div class="field-value ${!formData.branch ? 'empty' : ''}">${formData.branch || 'Not provided'}</div>
    //           </div>
    //           <div class="field">
    //             <div class="field-label">Account Number</div>
    //             <div class="field-value ${!formData.account_no ? 'empty' : ''}">${formData.account_no || 'Not provided'}</div>
    //           </div>
    //         </div>
    //       </div>

    //       <!-- Signature Section -->
    //       <div class="signature-section">
    //         <div class="signature-box">
    //           <div class="signature-line"></div>
    //           <strong>Applicant Signature</strong><br>
    //           <small>Date: _________________</small>
    //         </div>
    //         <div class="signature-box">
    //           <div class="signature-line"></div>
    //           <strong>Authorized Signature</strong><br>
    //           <small>Date: _________________</small>
    //         </div>
    //       </div>

    //       <div class="footer">
    //         <p><strong>Card Blo Me Registration System</strong></p>
    //         <p>This document was generated automatically on ${currentDate}</p>
    //         <p>For inquiries, please contact our support team</p>
    //       </div>

          
    //     </body>
    //   </html>
    // `;

  //   printWindow.document.write(printContent);
  //   printWindow.document.close();

  //   // Wait for content to load then print
  //   printWindow.onload = function () {
  //     printWindow.print();
  //     printWindow.close();
  //   };
  // }, [formData]);


//   const handlePrint = useCallback(() => {
//   const printWindow = window.open('', '_blank');
//   const currentDate = new Date().toLocaleDateString();

//   const printContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Card Blo Me Registration - ${formData.first_name} ${formData.last_name}</title>
//         <style>
//           @media print {
//             @page {
//               margin: 0.5in;
//               size: A4;
//             }
//             body {
//               font-family: 'Arial', sans-serif;
//               font-size: 12px;
//               line-height: 1.4;
//               color: #000;
//               margin: 0;
//               padding: 0;
//             }
//             .no-print {
//               display: none !important;
//             }
//           }
//           body {
//             font-family: 'Arial', sans-serif;
//             font-size: 12px;
//             line-height: 1.4;
//             color: #000;
//             margin: 0;
//             padding: 20px;
//             background: white;
//           }
//           .print-header {
//             text-align: center;
//             border-bottom: 3px solid #2563eb;
//             padding-bottom: 15px;
//             margin-bottom: 25px;
//           }
//           .print-header h1 {
//             color: #2563eb;
//             font-size: 24px;
//             font-weight: bold;
//             margin: 0 0 5px 0;
//           }
//           .print-header h2 {
//             color: #6b7280;
//             font-size: 16px;
//             font-weight: normal;
//             margin: 0;
//           }
//           .print-meta {
//             text-align: right;
//             margin-bottom: 25px;
//             font-size: 11px;
//             color: #6b7280;
//           }
//           .section {
//             margin-bottom: 25px;
//             page-break-inside: avoid;
//           }
//           .section-title {
//             background: #f3f4f6;
//             color: #1f2937;
//             font-size: 14px;
//             font-weight: bold;
//             padding: 8px 12px;
//             margin-bottom: 12px;
//             border-left: 4px solid #2563eb;
//           }
//           .field-group {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 15px;
//             margin-bottom: 12px;
//           }
//           .field {
//             flex: 1;
//             min-width: 200px;
//           }
//           .field-label {
//             font-weight: 600;
//             color: #374151;
//             margin-bottom: 2px;
//             font-size: 11px;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
//           .field-value {
//             padding: 6px 8px;
//             border: 1px solid #d1d5db;
//             background: #f9fafb;
//             border-radius: 3px;
//             min-height: 16px;
//             font-size: 12px;
//           }
//           .field-value.empty {
//             color: #9ca3af;
//             font-style: italic;
//           }
//           .signature-section {
//             margin-top: 40px;
//             display: flex;
//             justify-content: space-between;
//             page-break-inside: avoid;
//           }
//           .signature-box {
//             width: 45%;
//             text-align: center;
//           }
//           .signature-line {
//             border-bottom: 1px solid #000;
//             margin-bottom: 5px;
//             height: 40px;
//           }
//           .footer {
//             margin-top: 30px;
//             text-align: center;
//             font-size: 10px;
//             color: #6b7280;
//             border-top: 1px solid #e5e7eb;
//             padding-top: 15px;
//           }

//           /* Card Styles merged */
//           .card-container {
//             width: 532px;
//             height: 337px;
//             padding: 26px;
//             position: relative;
//             border: 1px solid #ccc;
//             border-radius: 10px;
//             background-image: url('/assets/erpnext/images/cardbg1.png');
//             background-size: 532px 337px;
//             box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//             overflow: hidden;
//             margin: 40px auto 0 auto;
//           }
//           .card-decoration {
//             position: absolute;
//             top: 0;
//             right: 0;
//             width: 200px;
//             height: 200px;
//             opacity: 0.7;
//             transform: rotate(180deg);
//           }
//           .logo-section {
//             position: absolute;
//             top: 26px;
//             left: 26px;
//             display: flex;
//             align-items: center;
//           }
//           .logo-circle {
//             width: 100px;
//             height: 100px;
//             background: linear-gradient(135deg, #ffb74d 0%, #ff9800 100%);
//             border-radius: 50%;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//           }
//           .logo-text {
//             font-size: 36px;
//             font-weight: bold;
//             color: #000;
//           }
//           .card-details {
//             position: absolute;
//             top: 30px;
//             left: 140px;
//           }
//           .detail-row {
//             display: flex;
//             margin-bottom: 4px;
//           }
//           .detail-label {
//             width: 117px;
//             font-weight: bold;
//             font-size: 13px;
//           }
//           .detail-value {
//             font-size: 13px;
//           }
//           .profile-section {
//             position: absolute;
//             top: 140px;
//             left: 26px;
//             display: flex;
//             gap: 20px;
//           }
//           .profile-image {
//             width: 150px;
//             height: 150px;
//             border-radius: 10px;
//             object-fit: cover;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//           }
//           .profile-details {
//             width: 225px;
//           }
//           .profile-label {
//             font-weight: bold;
//             font-size: 12px;
//           }
//           .profile-value {
//             margin-top: 0;
//             margin-bottom: 8px;
//             font-size: 12px;
//           }
//           .qr-code {
//             position: absolute;
//             bottom: 26px;
//             right: 26px;
//             width: 100px;
//             height: 100px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="print-header">
//           <h1>Card Blo Me Registration Form</h1>
//           <h2>Application Summary</h2>
//         </div>
//         <div class="print-meta">
//           <strong>Application ID:</strong> ${formData.naming_series}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}<br>
//           <strong>Status:</strong> ${formData.status}<br>
//           <strong>Generated on:</strong> ${currentDate}
//         </div>

//         <!-- Personal Information Section -->
//         <!-- (Your existing field groups go here, omitted for brevity) -->

//         <div class="footer">
//           <p><strong>Card Blo Me Registration System</strong></p>
//           <p>This document was generated automatically on ${currentDate}</p>
//           <p>For inquiries, please contact our support team</p>
//         </div>

//         <!-- Insert card below footer -->
//         <div class="card-container">
//           <div class="card-decoration">
//             <img src="/assets/erpnext/images/design1.png" alt="Decorative Pattern" />
//           </div>
//           <div class="logo-section">
//             <img style="height: 68px" src="/assets/erpnext/images/mycard-logo.png" />
//           </div>
//           <div class="card-details">
//             <div class="detail-row">
//               <div class="detail-label">CARD NUMBER</div>
//               <div class="detail-value">${formData.naming_series}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
//             </div>
//             <div class="detail-row">
//               <div class="detail-label">DATE OF ISSUE</div>
//               <div class="detail-value">${currentDate}</div>
//             </div>
//             <div class="detail-row">
//               <div class="detail-label">DATE OF EXPIRY</div>
//               <div class="detail-value">12/02/2030</div>
//             </div>
//           </div>
//           <div class="profile-section">
//             <img style="height: 160px; width: 124px; border-radius: 15px;" src="${formData.profile_image}" />
//             <div class="profile-details">
//               <p class="profile-label">NAME</p>
//               <p class="profile-value">${formData.title} ${formData.first_name} ${formData.last_name}</p>

//               <p class="profile-label">DATE OF BIRTH</p>
//               <p class="profile-value">${formData.date_of_birth}</p>

//               <p class="profile-label">ORIGIN</p>
//               <p class="profile-value">${formData.origin}</p>

//               <p class="profile-label">NATIONALITY</p>
//               <p class="profile-value">${formData.nationility}</p>
//             </div>
//           </div>
//           <div class="qr-code">
//             <img src="${formData.qr_code}" alt="QR Code" />
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   printWindow.document.write(printContent);
//   printWindow.document.close();

//   printWindow.onload = function () {
//     printWindow.print();
//     printWindow.close();
//   };
// }, [formData]);


const handlePrint = useCallback(() => {
  const printWindow = window.open('', '_blank');
  const currentDate = new Date().toLocaleDateString();

  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Card Blo Me Registration - ${formData.first_name} ${formData.last_name}</title>
        <style>
          @media print {
            @page {
              margin: 0.5in;
              size: A4;
            }
            body {
              font-family: 'Arial', sans-serif;
              font-size: 12px;
              line-height: 1.4;
              color: #000;
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
          }
          body {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .print-header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 15px;
            margin-bottom: 25px;
          }
          .print-header h1 {
            color: #2563eb;
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 5px 0;
          }
          .print-header h2 {
            color: #6b7280;
            font-size: 16px;
            font-weight: normal;
            margin: 0;
          }
          .print-meta {
            text-align: right;
            margin-bottom: 25px;
            font-size: 11px;
            color: #6b7280;
          }
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .section-title {
            background: #f3f4f6;
            color: #1f2937;
            font-size: 14px;
            font-weight: bold;
            padding: 8px 12px;
            margin-bottom: 12px;
            border-left: 4px solid #2563eb;
          }
          .field-group {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 12px;
          }
          .field {
            flex: 1;
            min-width: 200px;
          }
          .field-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 2px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            padding: 6px 8px;
            border: 1px solid #d1d5db;
            background: #f9fafb;
            border-radius: 3px;
            min-height: 16px;
            font-size: 12px;
          }
          .field-value.empty {
            color: #9ca3af;
            font-style: italic;
          }
          .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
          }
          .signature-box {
            width: 45%;
            text-align: center;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
            height: 40px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
          }

          /* Card Styles: fixed overflow issue & improved layout */
          .card-container {
           -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
            width: 532px;
            height: 337px;
            padding: 26px;
            position: relative;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-image: url('/assets/erpnext/images/cardbg1.png');
            background-size: 532px 337px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            overflow: hidden;
            margin: 40px auto 0 auto;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            
          }
          .card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  opacity: 0.7;
  transform: rotate(180deg);
  z-index: 2;
  overflow: hidden;
  box-sizing: border-box;
}

.card-decoration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

          .logo-section {
            position: absolute;
            top: 26px;
            left: 26px;
            display: flex;
            align-items: center;
            z-index: 2;
          }
          .card-details {
            position: absolute;
            top: 36px;
            left: 140px;
            right: 26px;
            z-index: 2;
            width: 350px;
          }
          .detail-row {
            display: flex;
            margin-bottom: 4px;
          }
          .detail-label {
            width: 128px;
            font-weight: bold;
            font-size: 13px;
            text-align: left;
          }
          .detail-value {
            font-size: 13px;
            text-align: left;
            flex: 1;
            word-break: break-word;
          }
          .profile-section {
            position: absolute;
            top: 120px;
            left: 26px;
            display: flex;
            gap: 20px;
            z-index: 2;
            right: 150px;
          }
          .profile-image {
            width: 124px;
            height: 150px;
            border-radius: 10px;
            object-fit: cover;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .profile-details {
            width: 160px;
            overflow: hidden;
            word-break: break-word;
          }
          .profile-label {
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 1px;
          }
          .profile-value {
            margin-top: 0;
            margin-bottom: 8px;
            font-size: 12px;
            word-break: break-word;
          }
          .qr-code {
            position: absolute;
            bottom: 26px;
            right: 26px;
            width: 100px;
            height: 100px;
            z-index: 2;
            background: #fff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .qr-code img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }


          .decorative-pattern img {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 430px;
    }
    
    .declaration-text {
    position: absolute;
    top: 154px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%; /* Or set to 33rem if preferred, but 80% fits responsive layouts */
    text-align: center;
    font-style: italic;
    font-size: 10px;
    line-height: 1.4;
}

    
    .signature-section {
      position: absolute;
      top: 316px;
      left: 0;
      right: 0;
      text-align: center;
    }
    
    .signature-line {
      width: 300px;
      border-top: 1px dotted #000;
      height: 1px;
      margin: 0 auto 5px auto;
    }
    
    .signature-label {
      font-weight: bold;
      font-size: 14px;
    }
    
    .contact-info-text {
    width: 401px;
    position: absolute;
    top: 345px;
    left: 95px;
    right: 50px;
    text-align: center;
    font-size: 10px;
    line-height: 1.4;
}
    
    .contact-details {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 20px;
      font-size: 9px;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .contact-icon {
      width: 16px;
      height: 16px;
    }
        </style>
      </head>
      <body>
       

        <!-- Personal Information -->
        <div class="section">
          <div class="section-title">👤 Personal Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">First Name</div>
              <div class="field-value ${!formData.first_name ? 'empty' : ''}">${formData.first_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Middle Name</div>
              <div class="field-value ${!formData.middle_name ? 'empty' : ''}">${formData.middle_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Last Name</div>
              <div class="field-value ${!formData.last_name ? 'empty' : ''}">${formData.last_name || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Title</div>
              <div class="field-value ${!formData.title ? 'empty' : ''}">${formData.title || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Gender</div>
              <div class="field-value ${!formData.gender ? 'empty' : ''}">${formData.gender || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Birth</div>
              <div class="field-value ${!formData.date_of_birth ? 'empty' : ''}">${formData.date_of_birth || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Blood Group</div>
              <div class="field-value ${!formData.blood_group ? 'empty' : ''}">${formData.blood_group || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Resident Status</div>
              <div class="field-value ${!formData.resident_status ? 'empty' : ''}">${formData.resident_status || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="section">
          <div class="section-title">🏠 Address Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Village</div>
              <div class="field-value ${!formData.village ? 'empty' : ''}">${formData.village || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Town</div>
              <div class="field-value ${!formData.town ? 'empty' : ''}">${formData.town || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">District</div>
              <div class="field-value ${!formData.district ? 'empty' : ''}">${formData.district || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Province</div>
              <div class="field-value ${!formData.province ? 'empty' : ''}">${formData.province || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Country</div>
              <div class="field-value ${!formData.country ? 'empty' : ''}">${formData.country || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">PO Box</div>
              <div class="field-value ${!formData.po_box ? 'empty' : ''}">${formData.po_box || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="section">
          <div class="section-title">📞 Contact Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Personal Phone</div>
              <div class="field-value ${!formData.phone_no ? 'empty' : ''}">${formData.personal_country_code} ${formData.phone_no || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Office Phone</div>
              <div class="field-value ${!formData.mobile_no ? 'empty' : ''}">${formData.office_country_code} ${formData.mobile_no || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Personal Email</div>
              <div class="field-value ${!formData.personal_email_address ? 'empty' : ''}">${formData.personal_email_address || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Office Email</div>
              <div class="field-value ${!formData.office_email ? 'empty' : ''}">${formData.office_email || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Family Information -->
        <div class="section">
          <div class="section-title">👨‍👩‍👧‍👦 Family Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Mother's Full Name</div>
              <div class="field-value ${!formData.mothers_full_name ? 'empty' : ''}">${formData.mothers_full_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Mother Alive</div>
              <div class="field-value ${!formData.mother_alive ? 'empty' : ''}">${formData.mother_alive || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Mother's Contact</div>
              <div class="field-value ${!formData.mothers_contact_no ? 'empty' : ''}">${formData.mothers_contact_no || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Father's Full Name</div>
              <div class="field-value ${!formData.fathers_full_name ? 'empty' : ''}">${formData.fathers_full_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Father Alive</div>
              <div class="field-value ${!formData.father_alive ? 'empty' : ''}">${formData.father_alive || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Father's Contact</div>
              <div class="field-value ${!formData.fathers_contact_no ? 'empty' : ''}">${formData.fathers_contact_no || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Marital Status</div>
              <div class="field-value ${!formData.marital_status ? 'empty' : ''}">${formData.marital_status || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Health Information -->
        <div class="section">
          <div class="section-title">🏥 Health Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Age</div>
              <div class="field-value ${!formData.age ? 'empty' : ''}">${formData.age || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Height</div>
              <div class="field-value ${!formData.height ? 'empty' : ''}">${formData.height || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Weight</div>
              <div class="field-value ${!formData.weight ? 'empty' : ''}">${formData.weight || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">BMI</div>
              <div class="field-value ${!formData.bmi ? 'empty' : ''}">${formData.bmi || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Blood Pressure (Systolic)</div>
              <div class="field-value ${!formData.bp_systolic ? 'empty' : ''}">${formData.bp_systolic || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Blood Pressure (Diastolic)</div>
              <div class="field-value ${!formData.diastolic ? 'empty' : ''}">${formData.diastolic || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Medical Conditions</div>
              <div class="field-value ${!formData.prevailing_medical_conditions ? 'empty' : ''}">${formData.prevailing_medical_conditions || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Previous Surgery</div>
              <div class="field-value ${!formData.are_surgical_operation_done_in_the_past ? 'empty' : ''}">${formData.are_surgical_operation_done_in_the_past || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Taking Medications</div>
              <div class="field-value ${!formData.are_you_taking_medications ? 'empty' : ''}">${formData.are_you_taking_medications || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="section">
          <div class="section-title">🚨 Emergency Contact</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Emergency Contact Name</div>
              <div class="field-value ${!formData.emergency_first_name ? 'empty' : ''}">${formData.emergency_first_name} ${formData.emergency_middle_name} ${formData.emergency_last_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Emergency Phone</div>
              <div class="field-value ${!formData.emergency_phone_no ? 'empty' : ''}">${formData.emergency_personal_country_code} ${formData.emergency_phone_no || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Emergency Email</div>
              <div class="field-value ${!formData.emergency_personal_email ? 'empty' : ''}">${formData.emergency_personal_email || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Employment Information -->
        <div class="section">
          <div class="section-title">💼 Employment Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Company</div>
              <div class="field-value ${!formData.company ? 'empty' : ''}">${formData.company || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Department</div>
              <div class="field-value ${!formData.department ? 'empty' : ''}">${formData.department || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Supervisor Name</div>
              <div class="field-value ${!formData.supervisor_name ? 'empty' : ''}">${formData.supervisor_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Supervisor Contact</div>
              <div class="field-value ${!formData.supervisor_contact ? 'empty' : ''}">${formData.supervisor_contact || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Nature of Work</div>
              <div class="field-value ${!formData.nature_of_work ? 'empty' : ''}">${formData.nature_of_work || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Lifestyle Information -->
        <div class="section">
          <div class="section-title">🎯 Lifestyle Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Alcohol Consumption</div>
              <div class="field-value ${!formData.alcohol ? 'empty' : ''}">${formData.alcohol || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Frequency of Alcohol</div>
              <div class="field-value ${!formData.frequency_of_taking_alcohol ? 'empty' : ''}">${formData.frequency_of_taking_alcohol || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Smoking</div>
              <div class="field-value ${!formData.smoking ? 'empty' : ''}">${formData.smoking || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Frequency of Smoking</div>
              <div class="field-value ${!formData.frequency_of_smoking ? 'empty' : ''}">${formData.frequency_of_smoking || 'Not provided'}</div>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Betel Nut</div>
              <div class="field-value ${!formData.beteinut ? 'empty' : ''}">${formData.beteinut || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Frequency of Betel Nut</div>
              <div class="field-value ${!formData.frequency_of_beteinut ? 'empty' : ''}">${formData.frequency_of_beteinut || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Bank Information -->
        <div class="section">
          <div class="section-title">🏦 Bank Information</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Bank Name</div>
              <div class="field-value ${!formData.bank_name ? 'empty' : ''}">${formData.bank_name || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Branch</div>
              <div class="field-value ${!formData.branch ? 'empty' : ''}">${formData.branch || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="field-label">Account Number</div>
              <div class="field-value ${!formData.account_no ? 'empty' : ''}">${formData.account_no || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <!-- Signature Section -->
        <div class="signature-section">
          <div class="signature-box">
            <div class="signature-line"></div>
            <strong>Applicant Signature</strong><br>
            <small>Date: _________________</small>
          </div>
          <div class="signature-box">
            <div class="signature-line"></div>
            <strong>Authorized Signature</strong><br>
            <small>Date: _________________</small>
          </div>
        </div>

       
        
        <!-- Card front below footer -->
        <div class="card-container">
          <div class="card-decoration">
            <img src="/assets/erpnext/images/design1.png" alt="Decorative Pattern" />
          </div>
          <div class="logo-section">
            <img style="height: 68px" src="/assets/erpnext/images/mycard-logo.png" />
          </div>
          <div class="card-details">
            <div class="detail-row">
              <div class="detail-label">CARD NUMBER</div>
              <div class="detail-value">${formData.naming_series}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">DATE OF ISSUE</div>
              <div class="detail-value">${currentDate}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">DATE OF EXPIRY</div>
              <div class="detail-value">12/02/2030</div>
            </div>
          </div>
          <div class="profile-section">
            <img class="profile-image" src="${userImage}" />
            <div class="profile-details">
              <p class="profile-label">NAME</p>
              <p class="profile-value">${formData.title} ${formData.first_name} ${formData.last_name}</p>
              <p class="profile-label">DATE OF BIRTH</p>
              <p class="profile-value">${formData.date_of_birth}</p>
              <p class="profile-label">ORIGIN</p>
              <p class="profile-value">${formData.origin || 'Not provided'}</p>
              <p class="profile-label">NATIONALITY</p>
              <p class="profile-value">${formData.nationility || 'Not provided'}</p>
            </div>
          </div>
          <div class="qr-code">
            <img src="${formData.qr_code}" alt="QR Code" />
          </div>
        </div>

        <!-- Card back below footer -->
        <div class="card-container">
    <!-- Logo Section -->
    <div class="logo-section">
      <img style="height: 68px" src="/assets/erpnext/images/mycard-logo.png" />
    </div>
    
    <!-- Decorative Pattern -->
    <div class="decorative-pattern">
      <img style="transform: scaleX(-1);" src="/assets/erpnext/images/design2.png" alt="Decorative Pattern with Bird">
    </div>
    
    <!-- Declaration Text -->
    <div class="declaration-text">
      I, the undersigned, hereby declare that all information and biometric data provided by me through this personal identification card are true, accurate, and correct to the best of my knowledge. I acknowledge that such information has been duly verified by LOT ICT Solutions Limited.
      <br><br>
      This card remains the exclusive property of LOT ICT Solutions Limited. In the event that this card is found please notify the below given contact details through email or message.
    </div>
    
    <!-- Signature Section -->
    <div class="signature-section">
      <div class="signature-line"></div>
      <div class="signature-label">Declared owners Signature</div>
    </div>
    
    <!-- Contact Info Text -->
    <div class="contact-info-text">
      To access or verify the details given in this Personal Identification Card please contact Info@mycardpng.com to release the information after obtaining approval from the declared owner of the Card.
    </div>
    
    <!-- Contact Details -->
    <div class="contact-details">
      <div class="contact-item">
        <span>📞 +675 7190 2850</span>
      </div>
      <div class="contact-item">
        <span>📞 +675 8223 4447</span>
      </div>
      <div class="contact-item">
        <span>✉️ info@mycardpng.com</span>
      </div>
      <div class="contact-item">
        <span>🌐 mycardpng.com</span>
      </div>
    </div>
  </div>
      </body>
    </html>  
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
}, [formData]);




  const formProps = useMemo(() => ({
    formData,
    handleChange,
    countries
  }), [formData, handleChange, countries]);

  const renderCurrentForm = useCallback(() => {
    switch (currentForm) {
      case 1: return <Form1 {...formProps} />;
      case 2: return <Form2 {...formProps} />;
      case 3: return <Form3 {...formProps} />;
      case 4: return <Form4 {...formProps} />;
      case 5: return <Form5 {...formProps} />;
      default: return <Form1 {...formProps} />;
    }
  }, [currentForm, formProps]);

  const getCardBloMe = async (card_blo_me_number) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 508b6fa8bc5d7b1:2b6e1c5b9eedebe");
      // myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`/api/resource/Card Blo Me Page1/${card_blo_me_number}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // setCardBloMeData(result?.data)
          setCardData(result?.data);
          console.log('Fetched Card Blo Me data:', result?.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error('Error fetching Card Blo Me data:', error);
    }
  }

  useEffect(() => {
    if(userData?.card_blo_me_number) {
      console.log("card number", userData.card_blo_me_number)
      getCardBloMe(userData.card_blo_me_number);
    }
  }, [userData]);

  return (
    <>
      <div className="main-container">
        <div className="form-navigation">
          {forms.map(form => (
            <button
              key={form.id}
              onClick={() => setCurrentForm(form.id)}
              className={`form-nav-btn ${currentForm === form.id ? 'active' : 'inactive'}`}
            >
              <span style={{ fontSize: '1.1rem' }}>{form.icon}</span>
              <span>{form.name}</span>
            </button>
          ))}
        </div>

        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-text">Progress</span>
            <span className="progress-text">{currentForm}/5</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentForm / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={currentForm === 5 ? handleFinalSubmit : e => e.preventDefault()}>
          {renderCurrentForm()}

          <div className="navigation-buttons">
            <button
              type="button"
              onClick={() => setCurrentForm(f => Math.max(1, f - 1))}
              disabled={currentForm === 1}
              className="btn btn-previous"
            >
              ← Previous
            </button>

            {currentForm < 5 ? (
              <div className="action-buttons">
                <button
                  type="button"
                  onClick={handleSaveForm}
                  disabled={isSaving || !isFormValid(currentForm)}
                  className="btn btn-save"
                >
                  {isSaving ? 'Saving...' : '💾 Save Progress'}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentForm(f => Math.min(5, f + 1))}
                  disabled={!hasSaved[currentForm]}
                  className="btn btn-next"
                  style={{
                    opacity: hasSaved[currentForm] ? 1 : 0.5,
                    cursor: hasSaved[currentForm] ? 'pointer' : 'not-allowed'
                  }}
                >
                  Next →
                </button>
              </div>
            ) : (
              <div className="action-buttons">
                <button
                  type="button"
                  onClick={handleSaveForm}
                  disabled={isSaving}
                  className="btn btn-draft"
                >
                  {isSaving ? 'Saving...' : '💾 Save Final Draft'}
                </button>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="btn btn-clear"
                >
                  🗑️ Clear Form
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-print"
                >
                  🖨️ Print Application
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-submit"
                >
                  {isSubmitting ? 'Submitting...' : '🚀 Submit Application'}
                </button>
              </div>
            )}
          </div>

          {currentForm < 5 && !hasSaved[currentForm] && (
            <p style={{ color: 'red', marginTop: '1rem' }}>
              Please complete all required fields before saving.
            </p>
          )}
        </form>
      </div>

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
        type={modalType}
      />
    </>
  );
};

export default CardBloMe;