import React, { useState, useCallback, useMemo } from 'react';
import './App.css';

// Import all form components
import Form1 from './from1.jsx';
import Form2 from './from2.jsx';
import Form3 from './from3.jsx';
import Form4 from './from4.jsx';
import Form5 from './from5.jsx';

const App3 = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comprehensive Countries data with codes - Memoized to prevent re-creation
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

  // Form data state
  const [formData, setFormData] = useState({
    // Form 1 defaults
    naming_series: "CBM-",
    status: "Drafted",
    inactive_date: "",
    inactive_reason: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    title: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    resident_status: "",
    village: "",
    town: "",
    district: "",
    province: "",
    country: "Papua New Guinea",
    po_box: "",
    postal_code: "",
    portion_lot_no: "",
    portion_nolot_no: "",
    village_street: "",
    town1: "",
    district1: "",
    province1: "",
    country1: "Papua New Guinea",
    po_box1: "",
    postal_code1: "",
    location: "",
    location1: "",
    personal_country_code: "+675",
    phone_no: "",
    personal_email_address: "",
    office_country_code: "+675",
    mobile_no: "",
    office_email: "",
    place_of_birth: "Hospital",
    hospital_name: "",
    village1: "",
    district2: "",
    province2: "",
    country2: "",

    // Form 2 defaults
    check_the_box_if_you_willing_to_provide_your_family_details: false,
    mothers_full_name: "",
    mother_middle_name: "",
    mother_last_name: "",
    mother_origin_village: "",
    mother_district: "",
    mother_province: "",
    mother_country: "Papua New Guinea",
    mother_alive: "Yes",
    mothers_contact_no: "",
    mothers_email: "",
    cause_of_death: "",
    fathers_full_name: "",
    father_middle_name: "",
    father_last_name: "",
    father_origin_village: "",
    father_district: "",
    father_province: "",
    father_country: "Papua New Guinea",
    father_alive: "Yes",
    fathers_contact_no: "",
    fathers_email: "",
    father_cause_of_death: "",
    marital_status: "Married",
    date: new Date().toISOString().split('T')[0],
    age: "",
    height: "",
    weight: "",
    bmi: "",
    abdominal_circumference: "",
    hip_circumference: "",
    bp_systolic: "",
    diastolic: "",
    pulse_rate: "",
    blood_sugar: "",
    prevailing_medical_conditions: "",
    are_surgical_operation_done_in_the_past: "No",
    type_of_operation: "",
    operation_date: "",
    are_you_taking_medications: "No",
    blo_me_no: "",

    // Form 3 defaults
    emergency_first_name: "",
    emergency_middle_name: "",
    emergency_last_name: "",
    emergency_gender: "",
    emergency_date_of_birth: "",
    emergency_blood_group: "",
    emergency_number: "",
    emergency_village: "",
    emergency_district: "",
    emergency_province: "",
    emergency_country: "Papua New Guinea",
    emergency_personal_country_code: "+675",
    emergency_phone_no: "",
    emergency_office_country_code: "+675",
    emergency_phone_no1: "",
    emergency_personal_email: "",
    emergency_office_email: "",

    kin_firstname: "",
    kin_middlename: "",
    kin_lastname: "",
    kin_gender: "",
    kin_date_of_birth: "",
    kin_blood_group: "",
    kin_number: "",
    kin_village: "",
    kin_district: "",
    kin_province: "",
    kin_country: "Papua New Guinea",
    kin_personal_country_code: "+675",
    kin_phone_no: "",
    kin_office_country_code: "+675",
    kin_office_phone_no: "",
    kin_personal_email: "",
    kin_office_email: "",

    bank_name: "",
    branch: "",
    account_no: "",

    declaration_name: "",
    signature: "",

    // Form 4 defaults
    company: "",
    department: "",
    company_physical_address: "",
    po_box_address: "",
    employee_type_emailwebsite: "",
    supervisor_name: "",
    supervisor_position: "",
    supervisor_contact: "",
    supervisor_email: "",
    hr_manager_contact: "",
    hr_manager_email_address: "",
    nature_of_work: "",
    workplace_hazards: "",
    work_risk_type: "",
    alcohol: "No",
    frequency_of_taking_alcohol: "Never",
    smoking: "No",
    frequency_of_smoking: "Never",
    beteinut: "No",
    frequency_of_beteinut: "Never"
  });

  const handleSave = () => {
    console.warn(formData);
  };

  // Fixed handleChange function - Stable reference
  const handleChange = useCallback((field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  }, []);

  const forms = useMemo(() => [
    { id: 1, name: "Personal Info", icon: "👤" },
    { id: 2, name: "Health Declaration", icon: "🏥" },
    { id: 3, name: "Emergency & Bank", icon: "📋" },
    { id: 4, name: "Employment & Lifestyle", icon: "💼" },
    { id: 5, name: "Final Review", icon: "✅" }
  ], []);

  // Save function for individual forms
  const handleSaveForm = useCallback(async () => {
    try {
      setIsSaving(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert(`Form ${currentForm} saved successfully!`);
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving form. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [currentForm]);

  // Final submission function
  const handleFinalSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert("Application submitted successfully!");

    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Memoize form props to prevent re-renders
  const formProps = useMemo(() => ({
    formData,
    handleChange,
    countries
  }), [formData, handleChange, countries]);

  // Render current form - NOW PROPERLY OPTIMIZED
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

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="brand-logo">C</div>
          <h1 className="brand-text">Card Blo Me Registration</h1>
        </div>

        <div className="nav-actions">
          <div className="user-avatar">A</div>
          <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151' }}>Admin</span>
        </div>
      </nav>

      {/* Form Navigation */}
      <div className="main-container">
        <div className="form-navigation">
          {forms.map((form) => (
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

        {/* Progress Bar */}
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

        {/* Form Content */}
        <form onSubmit={currentForm === 5 ? handleFinalSubmit : (e) => e.preventDefault()}>
          {renderCurrentForm()}

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentForm(Math.max(1, currentForm - 1));
                handleSave();
              }}
              disabled={currentForm === 1}
              className="btn btn-previous"
            >
              ← Previous
            </button>

            {/* Action Buttons */}
            <div className="action-buttons">
              {/* Forms 1, 2, 3, 4: Save and Next buttons */}
              {currentForm < 5 ? (
                <>
                  {/* Save Button */}
                  <button
                    type="button"
                    onClick={handleSaveForm}
                    disabled={isSaving}
                    className="btn btn-save"
                  >
                    {isSaving ? (
                      <>
                        <div className="spinner"></div>
                        Saving...
                      </>
                    ) : (
                      <>💾 Save Progress</>
                    )}
                  </button>

                  {/* Save as Draft Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedData = { ...formData, status: 'Drafted' };
                      setFormData(updatedData);
                      handleSaveForm();
                    }}
                    className="btn btn-draft"
                  >
                    📝 Save as Draft
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentForm(Math.min(5, currentForm + 1))}
                    className="btn btn-next"
                  >
                    Next →
                  </button>
                </>
              ) : (
                /* Form 5: Final submission buttons */
                <>
                  {/* Save Final Draft */}
                  <button
                    type="button"
                    onClick={handleSaveForm}
                    disabled={isSaving}
                    className="btn btn-draft"
                  >
                    {isSaving ? 'Saving...' : '💾 Save Final Draft'}
                  </button>

                  {/* Clear Form Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
                        window.location.reload();
                      }
                    }}
                    className="btn btn-clear"
                  >
                    🗑️ Clear Form
                  </button>

                  <button
                    type="submit"
                    onClick={()=>print()}
                    disabled={isSubmitting}
                    className="btn btn-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Submitting...
                      </>
                    ) : (
                      <>🚀 Submit Application</>
                    )}
                  </button>
                  {/* Submit Application Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Submitting...
                      </>
                    ) : (
                      <>🚀 Submit Application</>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>

        {/* Status Messages */}
        <div className="status-message">
          <div className="status-box">
            <svg className="status-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="status-text">
              {currentForm < 5
                ? `Complete Form ${currentForm} and save your progress before moving to the next step.`
                : 'Review all information carefully before submitting your final application.'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App3;