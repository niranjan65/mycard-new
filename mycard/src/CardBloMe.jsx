
import React, { useState, useCallback, useMemo, useEffect, use } from 'react';
import './App.css';
import Form1 from './from1.jsx';
import Form2 from './from2.jsx';
import Form3 from './from3.jsx';
import Form4 from './from4.jsx';
import Form5 from './from5.jsx';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardBloMePage1, updateCardBloMePage1 } from './store/slices/cardBloMePage1Slice';
import { fetchCardBloMePage2, updateCardBloMePage2 } from './store/slices/cardBloMePage2Slice';
import { fetchCardBloMePage3, updateCardBloMePage3 } from './store/slices/cardBloMePage3Slice';
import { fetchCardBloMePage4, updateCardBloMePage4 } from './store/slices/cardBloMePage4Slice';
import { AlarmCheck } from 'lucide-react';
import { useFrappeFileUpload, useFrappeGetDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { GetPrintHtml } from "./Printformet"
import { fromTheme } from 'tailwind-merge';
import { GetCardPrintHTML } from './CardPrint';

const CardBloMe = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSaved, setHasSaved] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isupdating, setisupdating] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null); // holds the file or URL
  const [profileUrl, setProfileUrl] = useState(''); // preview URL

  const [spouseData, setSpouseData] = useState([]);
  const [childrenData, setChildrenData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [bankDataInitialized, setBankDataInitialized] = useState(false);

  const user_id = Cookies.get('user_id');

  const { data: userDetails } = useFrappeGetDoc('User', user_id);

  const [cardBloMeError, setCardBloMeError] = useState()


  useEffect(() => {
    console.log("User deatils............", userDetails);
    if(userDetails?.is_submitted === 1) {
      setIsFormSubmitted(true)
      setCurrentForm(5)
    }
  }, [userDetails])
  

  // Check if documents already exist
  const hasExistingDocuments = Boolean(
    userDetails?.card_blo_me_number ||
    userDetails?.card_blo_me_page_2 ||
    userDetails?.card_blo_me_page_3 ||
    userDetails?.card_blo_me_page_4
  )

  // Store the existing document names
  const existingDocs = useMemo(() => ({
    page1: userDetails?.card_blo_me_number,
    page2: userDetails?.card_blo_me_page_2,
    page3: userDetails?.card_blo_me_page_3,
    page4: userDetails?.card_blo_me_page_4
  }), [userDetails]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfileUrl(URL.createObjectURL(file));
    }
    console.log("profile picture changed", profilePicture, profileUrl)
  };

  const { upload, progress, isCompleted, reset } = useFrappeFileUpload();
  const { updateDoc } = useFrappeUpdateDoc()

  const uploadProfilePicture = async () => {
  if (!profilePicture) return;

  try {
    const user = currentUser.name || Cookies.get("user_id");
    const fileDoc = await upload(profilePicture, {
      isPrivate: true,
      doctype: 'User',
      docname: user,
      fieldname: 'user_image'
    });

    if (fileDoc?.file_url) {
      setProfileUrl(fileDoc.file_url);
      setProfilePicture(null);
      
      // Update the User document
      await updateDoc('User', user, { user_image: fileDoc.file_url });
      
      // Update the cookie to reflect the new profile image
      Cookies.set('user_image', fileDoc.file_url, { 
        expires: 30, // Set expiration as needed (30 days in this example)
        secure: true, // Use secure flag if using HTTPS
        sameSite: 'strict' // Add sameSite for security
      });
      
      alert("Profile picture uploaded successfully!");
    }
    reset();
  } catch (error) {
    alert("Upload failed. Please try again.");
    console.error(error);
    setCardBloMeError(error)
    throw new Error(error)
  }
};

  // const uploadProfilePicture = async () => {
  //   if (!profilePicture) return;

  //   try {
  //     const user = currentUser.name || Cookies.get("user_id");
  //     const fileDoc = await upload(profilePicture, {
  //       isPrivate: true,
  //       doctype: 'User',
  //       docname: user,
  //       fieldname: 'user_image'
  //     });

  //     if (fileDoc?.file_url) {
  //       setProfileUrl(fileDoc.file_url);
  //       setProfilePicture(null);
  //       await updateDoc('User', user, { user_image: fileDoc.file_url });
  //       alert("Profile picture uploaded successfully!");
  //     }
  //     reset();
  //   } catch (error) {
  //     alert("Upload failed. Please try again.");
  //     console.error(error);
  //   }
  // };

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

  const userImage = Cookies.get('user_image')

  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const requiredFields = [
    "title",
    "first_name",
    "last_name",
    "gender",
    "date_of_birth",
    "blood_group",
    "resident_status",
  ];

  const validateForm = () => {
    const errors = {};
    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === "string" && !formData[field].trim())) {
        errors[field] = true;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const dispatch = useDispatch();
  
  // Redux selectors for all four pages
  const { data: page1Data, loading: page1Loading, error: page1Error } = useSelector((state) => state.cardBloMePage1);
  const { data: page2Data, loading: page2Loading, error: page2Error } = useSelector((state) => state.cardBloMePage2);
  const { data: page3Data, loading: page3Loading, error: page3Error } = useSelector((state) => state.cardBloMePage3);
  const { data: page4Data, loading: page4Loading, error: page4Error } = useSelector((state) => state.cardBloMePage4);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  // Combined data state
  const [allCardData, setAllCardData] = useState({
    page1: null,
    page2: null,
    page3: null,
    page4: null
  });

  // Document names for fetching
  const docNames = useMemo(() => ({
    page1: currentUser?.card_blo_me_number,
    page2: currentUser?.card_blo_me_page_2,
    page3: currentUser?.card_blo_me_page_3,
    page4: currentUser?.card_blo_me_page_4
  }), [currentUser]);

  // Fetch all data when component mounts or user changes
  useEffect(() => {
    console.log("Current User from Redux:", currentUser);
    console.log("Has Existing Documents:", hasExistingDocuments);
    
    if (hasExistingDocuments && existingDocs.page1) {
      dispatch(fetchCardBloMePage1(existingDocs.page1));
    }
    if (hasExistingDocuments && existingDocs.page2) {
      dispatch(fetchCardBloMePage2(existingDocs.page2));
    }
    if (hasExistingDocuments && existingDocs.page3) {
      dispatch(fetchCardBloMePage3(existingDocs.page3));
    }
    if (hasExistingDocuments && existingDocs.page4) {
      dispatch(fetchCardBloMePage4(existingDocs.page4));
    }
  }, [currentUser, hasExistingDocuments, existingDocs, dispatch]);

  // Update combined data state when individual page data changes
  useEffect(() => {
    setAllCardData(prev => ({
      ...prev,
      page1: page1Data,
      page2: page2Data,
      page3: page3Data,
      page4: page4Data
    }));

    // Set primary card data from page1 for backward compatibility
    if (page1Data) {
      setCardData(page1Data);
    }
  }, [page1Data, page2Data, page3Data, page4Data]);

  // Update spouse and children data from page2
  useEffect(() => {
    if (page2Data) {
      if (page2Data.table_31) {
        setSpouseData(page2Data.table_31);
      }
      if (page2Data.table_32) {
        setChildrenData(page2Data.table_32);
      }
    }
  }, [page2Data]);

  // Update bank data from page3
  useEffect(() => {
    if (page3Data && page3Data.bank_details) {
      setBankData(page3Data.bank_details);
    }
  }, [page3Data]);

  const [formData, setFormData] = useState({
    naming_series: 'CBM-',
    status: 'Drafted',
    inactive_date: '',
    inactive_reason: '',
    title: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    blood_group: '',
    resident_status: '',
    portion_nolot_no: '',
    village: '',
    town: '',
    district: '',
    province: '',
    country: 'Papua New Guinea',
    po_box: '',
    postal_code: '',
    portion_lot_no: '',
    village_street: '',
    town1: '',
    same_as_current: false,
    district1: '',
    province1: '',
    country1: 'Papua New Guinea',
    po_box1: '',
    postal_code1: '',
    personal_country_code: '+675',
    phone_no: '',
    personal_email_address: '',
    office_country_code: '+675',
    mobile_no: '',
    office_email: '',
    place_of_birth: 'Hospital',
    hospital_name: '',
    village1: '',
    district2: '',
    province2: '',
    qr_code: '',
    country2: '',
    location: '',
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
    frequency_of_beteinut: 'Never',
    custom_id: ''
  });

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Enhanced form data population from all pages
  useEffect(() => {
    const populateFormData = () => {
      let updatedFormData = { ...formData };

      // Populate from page1 data
      if (page1Data) {
        updatedFormData = {
          ...updatedFormData,
          first_name: page1Data.first_name || '',
          middle_name: page1Data.middle_name || '',
          last_name: page1Data.last_name || '',
          gender: page1Data.gender || '',
          date_of_birth: page1Data.date_of_birth || '',
          blood_group: page1Data.blood_group || '',
          district: page1Data.district || '',
          district1: page1Data.district1 || '',
          mobile_no: page1Data.mobile_no || '',
          hospital_name: page1Data.hospital_name || '',
          district2: page1Data.district2 || '',
          location: page1Data.location || '',
          qr_code: page1Data.qr_code || '',
          title: page1Data.title || '',
          resident_status: page1Data.resident_status || '',
          province: page1Data.province || '',
          province1: page1Data.province1 || '',
          province2: page1Data.province2 || '',
          postal_code: page1Data.postal_code || '',
          postal_code1: page1Data.postal_code1 || '',
          country: page1Data.country || 'Papua New Guinea',
          country1: page1Data.country1 || 'Papua New Guinea',
          country2: page1Data.country2 || 'Papua New Guinea',
          custom_id: page1Data?.custom_id || '',
          office_contact_no_country_code: page1Data.office_contact_no_country_code ? `+${page1Data.office_contact_no_country_code}` : '+675',
          personal_contact_no_country_code: page1Data.personal_contact_no_country_code ? `+${page1Data.personal_contact_no_country_code}` : '+675',
          personal_email_address: page1Data.personal_email_address || '',
          phone_no: page1Data.phone_no || '',
          town: page1Data.town || '',
          town1: page1Data.town1 || '',
          village: page1Data.village || '',
          village_street: page1Data.village_street || '',
          portion_nolot_no: page1Data.portion_nolot_no || '',
          portion_lot_no: page1Data.portion_lot_no || '',
          po_box: page1Data.po_box || '',
          po_box1: page1Data.po_box1 || '',
          office_email: page1Data.office_email || '',
          place_of_birth: page1Data.place_of_birth || 'Hospital',
          village1: page1Data.village1 || '',
          location1: page1Data.location1 || ''
        };
      }

      // Populate from page2 data
      if (page2Data) {
        updatedFormData = {
          ...updatedFormData,
          check_the_box_if_you_willing_to_provide_your_family_details: page2Data.check_the_box_if_you_willing_to_provide_your_family_details || false,
          mothers_full_name: page2Data.mothers_full_name || '',
          mother_middle_name: page2Data.middle_name || '',
          mother_last_name: page2Data.last_name || '',
          mother_origin_village: page2Data.mother_origin_village || '',
          mother_district: page2Data.district || '',
          mother_province: page2Data.province || '',
          mother_country: page2Data.country || 'Papua New Guinea',
          mother_alive: page2Data.mother_alive || 'Yes',
          mothers_contact_no: page2Data.mothers_contact_no || '',
          mothers_email: page2Data.mothers_email || '',
          cause_of_death: page2Data.cause_of_death || '',
          fathers_full_name: page2Data.fathers_full_name || '',
          father_middle_name: page2Data.middle_name_1 || '',
          father_last_name: page2Data.last_name_1 || '',
          father_origin_village: page2Data.father_origin_village || '',
          father_district: page2Data.district1 || '',
          father_province: page2Data.province1 || '',
          father_country: page2Data.country1 || 'Papua New Guinea',
          father_alive: page2Data.father_alive || 'Yes',
          fathers_contact_no: page2Data.fathers_contact_no || '',
          fathers_email: page2Data.fathers_email || '',
          father_cause_of_death: page2Data.cause_ofdeath || '',
          marital_status: page2Data.marital_status || 'Married',
          date: page2Data.date || new Date().toISOString().split('T')[0],
          age: page2Data.age ? page2Data.age.toString() : '',
          height: page2Data.height || '',
          weight: page2Data.weight || '',
          bmi: page2Data.bmi || '',
          abdominal_circumference: page2Data.abdominal_circumference || '',
          hip_circumference: page2Data.hip_circumference || '',
          bp_systolic: page2Data.bp_systolic || '',
          diastolic: page2Data.diastolic || '',
          pulse_rate: page2Data.pulse_rate || '',
          blood_sugar: page2Data.blood_sugar || '',
          prevailing_medical_conditions: page2Data.prevailing_medical_conditionsdiseases || '',
          are_surgical_operation_done_in_the_past: page2Data.are_surgical_operation_done_in_the_past || 'No',
          type_of_operation: page2Data.type_of_operation || '',
          operation_date: page2Data.date1 || '',
          are_you_taking_medications: page2Data.are_you_taking_any_medications_describe || 'No',
          blo_me_no: page2Data.blo_me_no || ''
        };
      }

      // Populate from page3 data
      if (page3Data) {
        updatedFormData = {
          ...updatedFormData,
          bank_details: page3Data.bank_details || [],
          emergency_first_name: page3Data.emergency_first_name || '',
          emergency_middle_name: page3Data.emergency_middle_name || '',
          emergency_last_name: page3Data.emergency_last_name || '',
          emergency_gender: page3Data.emergency_gender || '',
          emergency_date_of_birth: page3Data.emergency_date_of_birth || '',
          emergency_blood_group: page3Data.emergency_blood_group || '',
          emergency_number: page3Data.emergency_number || '',
          emergency_village: page3Data.emergency_village || '',
          emergency_district: page3Data.emergency_district || '',
          emergency_province: page3Data.emergency_province || '',
          emergency_country: page3Data.emergency_country || 'Papua New Guinea',
          emergency_personal_country_code: page3Data.emergency_personal_country_code || '+675',
          emergency_phone_no: page3Data.emergency_phone_no || '',
          emergency_office_country_code: page3Data.emergency_office_country_code || '+675',
          emergency_phone_no1: page3Data.emergency_phone_no1 || '',
          emergency_personal_email: page3Data.emergency_personal_email || '',
          emergency_office_email: page3Data.emergency_office_email || '',
          kin_firstname: page3Data.kin_firstname || '',
          kin_middlename: page3Data.kin_middlename || '',
          kin_lastname: page3Data.kin_lastname || '',
          kin_gender: page3Data.kin_gender || '',
          kin_date_of_birth: page3Data.kin_date_of_birth || '',
          kin_blood_group: page3Data.kin_blood_group || '',
          kin_number: page3Data.kin_number || '',
          kin_village: page3Data.kin_village || '',
          kin_district: page3Data.kin_district || '',
          kin_province: page3Data.kin_province || '',
          kin_country: page3Data.kin_country || 'Papua New Guinea',
          kin_personal_country_code: page3Data.kin_personal_country_code || '+675',
          kin_phone_no: page3Data.kin_phone_no || '',
          kin_office_country_code: page3Data.kin_office_country_code || '+675',
          kin_office_phone_no: page3Data.kin_office_phone_no || '',
          kin_personal_email: page3Data.kin_personal_email || '',
          kin_office_email: page3Data.kin_office_email || '',
          declaration_name: page3Data.declaration_name || '',
          signature: page3Data.signature || ''
        };
      }

      // Populate from page4 data
      if (page4Data) {
        updatedFormData = {
          ...updatedFormData,
          company: page4Data.company || '',
          department: page4Data.department || '',
          company_physical_address: page4Data.company_physical_address || '',
          po_box_address: page4Data.po_box_address || '',
          employee_type_emailwebsite: page4Data.employee_type_emailwebsite || '',
          supervisor_name: page4Data.supervisor_name || '',
          supervisor_position: page4Data.supervisor_position || '',
          supervisor_contact: page4Data.supervisor_contact || '',
          supervisor_email: page4Data.supervisor_email || '',
          hr_manager_name: page4Data.hr_manager_name || '',
          hr_manager_contact: page4Data.hr_manager_contact || '',
          hr_manager_email_address: page4Data.hr_manager_email_address || '',
          nature_of_work: page4Data.nature_of_work || '',
          workplace_hazards: page4Data.workplace_hazards || '',
          work_risk_type: page4Data.work_risk_type || '',
          alcohol: page4Data.alcohol || 'No',
          frequency_of_taking_alcohol: page4Data.frequency_of_taking_alcohol || 'Never',
          smoking: page4Data.smoking || 'No',
          frequency_of_smoking: page4Data.frequency_of_smoking || 'Never',
          beteinut: page4Data.beteinut || 'No',
          frequency_of_beteinut: page4Data.frequency_of_beteinut || 'Never'
        };
      }

      setFormData(updatedFormData);

      console.log("Form data populated from existing documents:", page1Data, page2Data, page3Data, page4Data, updatedFormData);
    };

    // Only populate if we have data from any page
    if (page1Data || page2Data || page3Data || page4Data) {
      populateFormData();
    }
  }, [page1Data, page2Data, page3Data, page4Data]);

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
          formData?.title?.trim() &&
          formData?.first_name?.trim() &&
          formData?.last_name?.trim() &&
          formData?.gender &&
          formData?.date_of_birth &&
          formData?.blood_group &&
          formData?.resident_status
        );
      case 2:
        if (!formData.check_the_box_if_you_willing_to_provide_your_family_details) {
          return (
            formData.marital_status
          );
        }
        return (
          formData.mother_alive &&
          formData.father_alive &&
          formData.marital_status
        );
      case 3:
        return (
          formData.signature.trim()
        );
      case 4:
        return (
          formData.company.trim() &&
          formData.department.trim() &&
          formData.alcohol &&
          formData.smoking &&
          formData.frequency_of_smoking &&
          formData.frequency_of_taking_alcohol
        );
      default:
        return true;
    }
  }, [formData]);

  // useEffect(() => {
  //   const localData = localStorage.getItem(`cardBloMeForm${currentForm}`);
    
  //   if (localData) {
  //     setFormData(JSON.parse(localData));
    

  //   console.warn(`cardBloMeForm${currentForm}`, formData)
  //   }
  // }, [currentForm]);

  const saveFormToLocalStorage = (formNumber, formValues) => {
    localStorage.setItem(`cardBloMeForm${formNumber}`, JSON.stringify(formValues));
  };

  const handleSaveForm = useCallback(async () => {
    if (!isFormValid(currentForm)) return;

    if (!validateForm(currentForm)) return;

    const mergedFormData = {
      ...formData,
      spouseData,
      childrenData,
      bankData
    }

    try {
      setIsSaving(true);
      saveFormToLocalStorage(currentForm, mergedFormData);
      await new Promise(r => setTimeout(r, 1500));
      setHasSaved(prev => ({ ...prev, [currentForm]: true }));

      toast.success(`Form ${currentForm} saved successfully!`)

      if (currentForm < 5) {
        setCurrentForm(f => Math.min(5, f + 1));
      }

    } catch {
      toast.error('Error saving form. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [currentForm, formData, spouseData, bankData, childrenData, isFormValid]);

  // Final submission function
  const handleFinalSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Check if we need to create or update
      const shouldUpdate = hasExistingDocuments;
      
      if (shouldUpdate) {
        console.log("Updating existing documents...");
        await updateExistingDocuments();
      } else {
        console.log("Creating new documents...");
        await createNewDocuments();
      }

      const card_blome_payload = {
      
      is_submitted: 1
    }
    
    const user = Cookies.get('user_id')
    const update_user = await fetch(`/api/resource/User/${user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(card_blome_payload),
    });


      setModalTitle('Application Processed');
      setModalMessage(shouldUpdate ? 'Application Updated Successfully' : 'Application Created Successfully');
      setModalType('success');
      setModalVisible(true);
      setIsFormSubmitted(true);

    } catch (error) {
      console.error("Submission error:", error);
      alert(error)
      setCardBloMeError(`Error ${hasExistingDocuments ? 'updating' : 'creating'} application: ${error.message}`)
      throw new Error(`Error ${hasExistingDocuments ? 'updating' : 'creating'} application: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, hasExistingDocuments]);

  const updateExistingDocuments = async () => {
    // Update Card Blo Me Page1
    const updatePayload1 = {
      naming_series: formData.naming_series,
      status: formData.status,
      inactive_date: formData.inactive_date,
      inactive_reason: formData.inactive_reason,
      title: formData.title,
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      blood_group: formData.blood_group,
      resident_status: formData.resident_status,
      portion_nolot_no: formData.portion_nolot_no,
      village: formData.village,
      town: formData.town,
      district: formData.district,
      province: formData.province,
      country: formData.country,
      po_box: formData.po_box,
      postal_code: formData.postal_code,
      portion_lot_no: formData.portion_lot_no,
      village_street: formData.village_street,
      town1: formData.town1,
      district1: formData.district1,
      province1: formData.province1,
      country1: formData.country1,
      po_box1: formData.po_box1,
      postal_code1: formData.postal_code1,
      personal_contact_no_country_code: parseInt(formData.personal_country_code.replace('+', ''), 10),
      phone_no: formData.phone_no,
      personal_email_address: formData.personal_email_address,
      office_contact_no_country_code: parseInt(formData.office_country_code.replace('+', ''), 10),
      mobile_no: formData.mobile_no,
      office_email: formData.office_email,
      place_of_birth: formData.place_of_birth,
      hospital_name: formData.hospital_name,
      village1: formData.village1,
      district2: formData.district2,
      province2: formData.province2,
      country2: formData.country2,
      location: formData.location,
      location1: formData.location1,
    };

    const response1 = await fetch(`/api/resource/Card Blo Me Page1/${existingDocs.page1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(updatePayload1),
    });

    if (!response1.ok) {
      setCardBloMeError(`Failed to update Page1: ${response1.statusText}`)
      throw new Error(`Failed to update Page1: ${response1.statusText}`);
    }

    // Update Card Blo Me Page2
    const updatePayload2 = {
      from1: existingDocs.page1,
      check_the_box_if_you_willing_to_provide_your_family_details: formData.check_the_box_if_you_willing_to_provide_your_family_details ? 1 : 0,
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
      marital_status: formData.marital_status,
      ...(formData.marital_status === "Married" && {
        table_31: spouseData, 
        table_32: childrenData, 
      }),
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

    const response2 = await fetch(`/api/resource/Card Blo Me Page2/${existingDocs.page2}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(updatePayload2),
    });

    if (!response2.ok) {
      setCardBloMeError(`Failed to update Page2: ${response2.statusText}`)
      throw new Error(`Failed to update Page2: ${response2.statusText}`);
    }

    console.log("bankData before update call:", bankData);

    // Similarly update Page3 and Page4...
    await updatePage3();
    await updatePage4();
  };

  const updatePage3 = async () => {
    let BankDetailsFromLocal = localStorage.getItem('cardBloMeForm3');
    const updatePayload3 = {
      from2: existingDocs.page2,
      from1: existingDocs.page1,
      bank_details: BankDetailsFromLocal ? JSON.parse(BankDetailsFromLocal).bankData : bankData,
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
      declaration_name: formData.declaration_name,
      signature: formData.signature,
    };


    console.log("form data..............", bankData)

    const response = await fetch(`/api/resource/Card Blo Me Page3/${existingDocs.page3}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(updatePayload3),
    });

    let result = await response.json();

    console.log("Update Page3 response:", result);

    if (!response.ok) {
      setCardBloMeError(`Failed to update Page3: ${response.statusText}`)
      throw new Error(`Failed to update Page3: ${response.statusText}`);
    }
  };

  const updatePage4 = async () => {
    const updatePayload4 = {
      from3: existingDocs.page3,
      from1: existingDocs.page1,
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
      alcohol: formData.alcohol,
      frequency_of_taking_alcohol: formData.frequency_of_taking_alcohol,
      smoking: formData.smoking,
      frequency_of_smoking: formData.frequency_of_smoking,
      beteinut: formData.beteinut,
      frequency_of_beteinut: formData.frequency_of_beteinut,
    };

    const response = await fetch(`/api/resource/Card Blo Me Page 4/${existingDocs.page4}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(updatePayload4),
    });

    if (!response.ok) {
      setCardBloMeError(`Failed to update Page4: ${response.statusText}`)
      throw new Error(`Failed to update Page4: ${response.statusText}`);
    }
  };

  const createNewDocuments = async () => {
    const localData = localStorage.getItem(`cardBloMeForm1`);
    const parsedData = JSON.parse(localData)
    console.warn("PArsed Data", parsedData)
    // Create Page1
    const erpNextPayload1 = {
      naming_series: formData.naming_series,
      status: formData.status,
      inactive_date: formData.inactive_date,
      inactive_reason: formData.inactive_reason,
      title: formData.title,
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      blood_group: formData.blood_group,
      resident_status: formData.resident_status,
      portion_nolot_no: formData.portion_nolot_no,
      village: formData.village,
      town: formData.town,
      district: formData.district,
      province: formData.province,
      country: formData.country,
      po_box: formData.po_box,
      postal_code: formData.postal_code,
      portion_lot_no: formData.portion_lot_no,
      village_street: formData.village_street,
      town1: formData.town1,
      district1: formData.district1,
      province1: formData.province1,
      country1: formData.country1,
      custom_id: parsedData?.custom_id,
      po_box1: formData.po_box1,
      postal_code1: formData.postal_code1,
      personal_contact_no_country_code: parseInt(formData.personal_country_code.replace('+', ''), 10),
      phone_no: formData.phone_no,
      personal_email_address: formData.personal_email_address,
      office_contact_no_country_code: parseInt(formData.office_country_code.replace('+', ''), 10),
      mobile_no: formData.mobile_no,
      office_email: formData.office_email,
      place_of_birth: formData.place_of_birth,
      hospital_name: formData.hospital_name,
      village1: formData.village1,
      district2: formData.district2,
      province2: formData.province2,
      country2: formData.country2,
      location: formData.location,
      location1: formData.location1,
    };

    const currentUser = Cookies.get('user_id');
    const response1 = await fetch('/api/resource/Card Blo Me Page1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(erpNextPayload1),
    });

    if (!response1.ok) {
      const errorText = await response1.text();
      setCardBloMeError(`Step 1 failed: ${response1.status} ${response1.statusText} - ${errorText}`)
      throw new Error(`Step 1 failed: ${response1.status} ${response1.statusText} - ${errorText}`);
    }

    const result1 = await response1.json();
    const page1Name = result1.data.name;
    console.log("Result from Step 1:", page1Name);

    // Create Page2
    const erpNextPayload2 = {
      from1: page1Name,
      check_the_box_if_you_willing_to_provide_your_family_details: formData.check_the_box_if_you_willing_to_provide_your_family_details ? 1 : 0,
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
      marital_status: formData.marital_status,
      ...(formData.marital_status === "Married" && {
        table_31: spouseData, 
        table_32: childrenData, 
      }),
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

    const response2 = await fetch('/api/resource/Card Blo Me Page2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(erpNextPayload2),
    });

    if (!response2.ok) {
      const errorText = await response2.text();
      setCardBloMeError(`Step 2 failed: ${response2.status} ${response2.statusText} - ${errorText}`)
      throw new Error(`Step 2 failed: ${response2.status} ${response2.statusText} - ${errorText}`);
    }

    const result2 = await response2.json();
    const page2Name = result2.data.name;

    // Create Page3
    const erpNextPayload3 = {
      from2: page2Name,
      from1: page1Name,
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
      bank_details: bankData,
      declaration_name: formData.declaration_name,
      signature: formData.signature,
    };

    const response3 = await fetch('/api/resource/Card Blo Me Page3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(erpNextPayload3),
    });

    if (!response3.ok) {
      const errorText = await response3.text();
      setCardBloMeError(`Step 3 failed: ${response3.status} ${response3.statusText} - ${errorText}`)
      throw new Error(`Step 3 failed: ${response3.status} ${response3.statusText} - ${errorText}`);
    }

    const result3 = await response3.json();
    const page3Name = result3.data.name;

    // Create Page4
    const erpNextPayload4 = {
      from3: page3Name,
      from1: page1Name,
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
      alcohol: formData.alcohol,
      frequency_of_taking_alcohol: formData.frequency_of_taking_alcohol,
      smoking: formData.smoking,
      frequency_of_smoking: formData.frequency_of_smoking,
      beteinut: formData.beteinut,
      frequency_of_beteinut: formData.frequency_of_beteinut,
    };

    const response4 = await fetch('/api/resource/Card Blo Me Page 4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(erpNextPayload4),
    });

    if (!response4.ok) {
      const errorText = await response4.text();
      setCardBloMeError(`Step 4 failed: ${response4.status} ${response4.statusText} - ${errorText}`)
      throw new Error(`Step 4 failed: ${response4.status} ${response4.statusText} - ${errorText}`);
    }

    const result4 = await response4.json();
    const page4Name = result4.data.name;

    dispatch(fetchCardBloMePage1(page1Name));

    console.log("All submissions completed successfully!");
    console.log("Document IDs created:", {
      page1: page1Name,
      page2: page2Name,
      page3: page3Name,
      page4: page4Name
    });

    const card_blome_payload = {
      card_blo_me_number: page1Name,
      card_blo_me_page_2: page2Name,
      card_blo_me_page_3: page3Name,
      card_blo_me_page_4: page4Name,
      is_submitted: 1
    }

    console.log("Updating User with Card Blo Me Number:", card_blome_payload);
    const update_user = await fetch(`/api/resource/User/${currentUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(card_blome_payload),
    });

    if (update_user.ok) {
      console.log("User updated with Card Blo Me Number:", result1.data.name);
    } else {
      const errorText = await update_user.text();
      setCardBloMeError(`Failed to update user: ${update_user.status} ${update_user.statusText} - ${errorText}`)
      console.error(`Failed to update user: ${update_user.status} ${update_user.statusText} - ${errorText}`);
      throw new Error(`Failed to update user: ${update_user.status} ${update_user.statusText} - ${errorText}`)
    }
  };

  const handelupdate = () => {
    setisupdating(true)
    setTimeout(() => {
      setisupdating(false)
      alert("Alpha testing is running")
    }, 2000);
  }

  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString();
    const printContent = GetPrintHtml(formData, spouseData, childrenData, bankData, currentDate, userImage);

    printWindow.document.write(printContent);
    printWindow.document.close();

    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  }, [formData]);


  const handleCardPrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString();
    const printContent = GetCardPrintHTML(formData, [], [], [], currentDate, userImage, currentUser?.card_blo_me_number );

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
    countries,
    formErrors,
    profilePicture,
    profileUrl,
    handleProfilePictureChange,
    uploadProfilePicture,
    spouseData,
    setSpouseData,
    childrenData,
    setChildrenData,
    bankData,
    setBankData,
  }), [formData, handleChange, countries, formErrors, profilePicture, profileUrl, spouseData, childrenData, bankData, setBankData]);

  const renderCurrentForm = useCallback(() => {
    console.log("Rendering form:", currentForm);
    switch (currentForm) {
      case 1: return <Form1 {...formProps} />;
      case 2: return <Form2 {...formProps} spouseData={spouseData} setSpouseData={setSpouseData} childrenData={childrenData} setChildrenData={setChildrenData} />;
      case 3: return <Form3 {...formProps} bankData={bankData} setBankData={setBankData} />;
      case 4: return <Form4 {...formProps} />;
      case 5: return <Form5 {...formProps} />;
      default: return <Form1 {...formProps} />;
    }
  }, [currentForm, formProps]);

  const getCardBloMe = async (card_blo_me_number) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token 508b6fa8bc5d7b1:2b6e1c5b9eedebe");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`/api/resource/Card Blo Me Page1/${card_blo_me_number}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCardData(result?.data);
          console.log('Fetched Card Blo Me data:', result?.data);
        })
        .catch((error) =>{ 
          setCardBloMeError(error)
          throw new Error(error)
          console.error(error)
        });
    } catch (error) {
      setCardBloMeError(`Error fetching Card Blo Me data: ${error}`)
      console.error('Error fetching Card Blo Me data:', error);
      throw new Error(`Error fetching Card Blo Me data: ${error}`)
    }
  }

  useEffect(() => {
    if (userData?.card_blo_me_number) {
      console.log("card number", userData.card_blo_me_number)
      getCardBloMe(userData.card_blo_me_number);
    }
  }, [userData]);


  useEffect(() => {
  if (page3Data?.bankdetails && !bankDataInitialized) {
    setBankData(page3Data.bankdetails);
    setBankDataInitialized(true);
  }
}, [page3Data, bankDataInitialized]);

console.log("bankData in parent:", bankData);

const handleUserSubmittedChange = async() => {
  try {
       const card_blome_payload = {
      
      is_submitted: 0
    }
    
    const user = Cookies.get('user_id')
    const update_user = await fetch(`/api/resource/User/${user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 1a5cfcab01776e5:63628feef82aa59',
      },
      credentials: "omit",
      body: JSON.stringify(card_blome_payload),
    });

    if(update_user) {
      setIsFormSubmitted(false)
    }
  } catch (error) {
    console.log(error)
    setCardBloMeError(error)
    throw new Error(error)
  }
}



  // Loading state
  const isLoading = page1Loading || page2Loading || page3Loading || page4Loading;

  return (
    <>
      <div className="main-container">
        <div className="form-navigation">
          {forms
            .filter(form => !isFormSubmitted ? true : form.id === 5)
            .map(form => (
              <button
                key={form.id}
                onClick={() => {
                  console.log("page id:", form.id);
                  // setCurrentForm(form.id);
                }}
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

        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-container" style={{ textAlign: 'center', padding: '20px' }}>
            <div>Loading form data...</div>
          </div>
        )}

        <form onSubmit={currentForm === 5 ? handleFinalSubmit : e => e.preventDefault()}>
          {!isLoading && renderCurrentForm()}

          <div className="navigation-buttons">
            {
              !isFormSubmitted && (
                <button
              type="button"
              onClick={() => setCurrentForm(f => Math.max(1, f - 1))}
              disabled={currentForm === 1}
              className="btn btn-previous"
            >
              ← Previous
            </button>
              )
            }

            {isFormSubmitted && (
              <button
                type="button"
                className="btn btn-edit"
                onClick={() => {
                  setIsFormSubmitted(false);
                  setCurrentForm(1);
                  handleUserSubmittedChange()
                }}
              >
                ✏️ Edit
              </button>
            )}

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
                {/* <button
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
                </button> */}
               {
                isFormSubmitted && (
                   <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-print"
                >
                  🖨️ Print Application
                </button>
                )
               }
               {
                isFormSubmitted && (
                   <button
                  type="button"
                  onClick={handleCardPrint}
                  className="btn btn-print"
                >
                  🖨️ Print Card
                </button>
                )
               }
                {!isFormSubmitted && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-submit"
                  >
                    {isSubmitting ? 'Submitting...' : '🚀 Submit Application'}
                  </button>
                )}
              </div>
            )}
          </div>

          {currentForm < 5 && !hasSaved[currentForm] && (
            <p style={{ color: 'red', marginTop: '1rem' }}>
              Please complete all required fields before saving.
            </p>
          )}
        </form>

        {/* Debug information - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', fontSize: '12px' }}>
            <h4>Debug Info:</h4>
            <p>Has Existing Documents: {hasExistingDocuments ? 'Yes' : 'No'}</p>
            <p>Page1 Data: {page1Data ? 'Loaded' : 'None'}</p>
            <p>Page2 Data: {page2Data ? 'Loaded' : 'None'}</p>
            <p>Page3 Data: {page3Data ? 'Loaded' : 'None'}</p>
            <p>Page4 Data: {page4Data ? 'Loaded' : 'None'}</p>
            <p>Spouse Data Length: {spouseData.length}</p>
            <p>Children Data Length: {childrenData.length}</p>
            <p>Bank Data Length: {bankData.length}</p>
          </div>
        )}
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