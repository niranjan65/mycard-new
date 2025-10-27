import React, { useState, useEffect } from "react";
import "./App.css";

const ERPForm = () => {
  // Countries data with codes
  const countries = [
    {"name": "Afghanistan", "code": "+93"},
    {"name": "Albania", "code": "+355"},
    {"name": "Algeria", "code": "+213"},
    {"name": "Argentina", "code": "+54"},
    {"name": "Australia", "code": "+61"},
    {"name": "Austria", "code": "+43"},
    {"name": "Bangladesh", "code": "+880"},
    {"name": "Belgium", "code": "+32"},
    {"name": "Brazil", "code": "+55"},
    {"name": "Canada", "code": "+1"},
    {"name": "China", "code": "+86"},
    {"name": "Denmark", "code": "+45"},
    {"name": "Egypt", "code": "+20"},
    {"name": "France", "code": "+33"},
    {"name": "Germany", "code": "+49"},
    {"name": "India", "code": "+91"},
    {"name": "Indonesia", "code": "+62"},
    {"name": "Italy", "code": "+39"},
    {"name": "Japan", "code": "+81"},
    {"name": "Malaysia", "code": "+60"},
    {"name": "Netherlands", "code": "+31"},
    {"name": "New Zealand", "code": "+64"},
    {"name": "Nigeria", "code": "+234"},
    {"name": "Norway", "code": "+47"},
    {"name": "Pakistan", "code": "+92"},
    {"name": "Papua New Guinea", "code": "+675"},
    {"name": "Philippines", "code": "+63"},
    {"name": "Singapore", "code": "+65"},
    {"name": "South Africa", "code": "+27"},
    {"name": "South Korea", "code": "+82"},
    {"name": "Spain", "code": "+34"},
    {"name": "Sweden", "code": "+46"},
    {"name": "Switzerland", "code": "+41"},
    {"name": "Thailand", "code": "+66"},
    {"name": "Turkey", "code": "+90"},
    {"name": "United Arab Emirates", "code": "+971"},
    {"name": "United Kingdom", "code": "+44"},
    {"name": "United States", "code": "+1"},
    {"name": "Vietnam", "code": "+84"}
  ];

  // Complete state for ALL fields with defaults
  const [formData, setFormData] = useState({
    naming_series: "CBM-",
    status: "Drafted",
    inactive_date: "",
    inactive_reason: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    village: "",
    town: "",
    district: "",
    title: "",
    resident_status: "",
    province: "",
    country: "Papua New Guinea", // Default & mandatory
    po_box: "",
    postal_code: "",
    portion_lot_no: "",
    portion_nolot_no: "",
    village_street: "",
    town1: "",
    district1: "",
    province1: "",
    country1: "Papua New Guinea", // Default & mandatory
    po_box1: "",
    postal_code1: "",
    location: "",
    location1: "",
    personal_country_code: "+675", // Default PNG code
    personal_contact_no_country_code: "",
    phone_no: "",
    personal_email_address: "",
    office_country_code: "+675", // Default PNG code
    office_contact_no_country_code: "",
    mobile_no: "",
    office_email: "",
    place_of_birth: "Hospital", // Default as requested
    hospital_name: "",
    village1: "",
    district2: "",
    province2: "",
    country2: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // API submission function
  const submitToAPI = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Replace with your actual ERPNext API endpoint
      const response = await fetch('/api/resource/Card Blo Me Page1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token your_api_key:your_api_secret', // Replace with actual auth
        },
        body: JSON.stringify({
          data: data
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        alert("Form submitted successfully!");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for mandatory fields
    const requiredFields = [
      { field: 'country', label: 'Country' },
      { field: 'country1', label: 'Physical Address Country' },
      { field: 'postal_code', label: 'Postal Code' },
      { field: 'postal_code1', label: 'Physical Address Postal Code' },
      { field: 'place_of_birth', label: 'Place of Birth' }
    ];

    const missingFields = requiredFields.filter(
      ({field}) => !formData[field] || formData[field].trim() === ""
    );

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.label).join(", ")}`);
      return;
    }

    console.log("Form Data to Submit:", formData);
    submitToAPI(formData);
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="brand-logo">C</div>
        </div>
        <div className="nav-actions">
          <div className="user-menu">
            <div className="user-avatar">A</div>
            <span>Admin</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-container">
        <div className="page-header">
          <h1 className="page-title">Card Blo Me Registration</h1>
        </div>

        <form className="form-wrapper" onSubmit={handleSubmit}>
          {/* BASIC INFORMATION */}
          <div className="section-card">
            <div className="section-header">
              <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="section-title">Basic Information</h3>
            </div>
            <div className="fields-grid">
              <div className="field-wrapper">
                <label className="field-label">Card Blo Me ID</label>
                <select
                  className="field-input"
                  value={formData.naming_series}
                  onChange={(e) => handleChange("naming_series", e.target.value)}
                >
                  <option value="CBM-">CBM-</option>
                </select>
              </div>
              
              <div className="field-wrapper">
                <label className="field-label required">Status</label>
                <select
                  className="field-input"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                  <option>Rejected</option>
                  {/* <option>Drafted</option> */}
                </select>
              </div>

              {/* CONDITIONAL: Show only if status = Inactive */}
              {formData.status === "Inactive" && (
                <>
                  <div className="field-wrapper">
                    <label className="field-label">Inactive Date</label>
                    <input
                      className="field-input"
                      type="date"
                      value={formData.inactive_date}
                      onChange={(e) => handleChange("inactive_date", e.target.value)}
                    />
                  </div>
                  <div className="field-wrapper">
                    <label className="field-label">Inactive Reason</label>
                    <textarea
                      className="field-input"
                      value={formData.inactive_reason}
                      onChange={(e) => handleChange("inactive_reason", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* PERSONAL HEALTH DECLARATION FORM */}
          <div className="section-card">
            <div className="section-header">
              <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <h3 className="section-title">Personal Health Declaration Form</h3>
            </div>
            <div className="fields-grid">
              <div className="field-wrapper">
                <label className="field-label">Title</label>
                <select
                  className="field-input"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Miss</option>
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">First Name</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Middle Name</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.middle_name}
                  onChange={(e) => handleChange("middle_name", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Last Name</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Gender</label>
                <select
                  className="field-input"
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">Date Of Birth</label>
                <input
                  className="field-input"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleChange("date_of_birth", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Blood Group</label>
                <select
                  className="field-input"
                  value={formData.blood_group}
                  onChange={(e) => handleChange("blood_group", e.target.value)}
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">Resident Status</label>
                <select
                  className="field-input"
                  value={formData.resident_status}
                  onChange={(e) => handleChange("resident_status", e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Resident</option>
                  <option>Non-Resident</option>
                </select>
              </div>
            </div>
          </div>

          {/* CURRENT ADDRESS */}
          <div className="section-card">
            <div className="section-header">
              <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <h3 className="section-title">Current Address</h3>
            </div>
            <div className="fields-grid">
              <div className="field-wrapper">
                <label className="field-label">Number</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.portion_nolot_no}
                  onChange={(e) => handleChange("portion_nolot_no", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Village</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleChange("village", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Town</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.town}
                  onChange={(e) => handleChange("town", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">District</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Province</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label required">Country</label>
                <select
                  className="field-input"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  required
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">PO Box</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.po_box}
                  onChange={(e) => handleChange("po_box", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label required">Postal Code</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.postal_code}
                  onChange={(e) => handleChange("postal_code", e.target.value)}
                  required
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Location</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* PHYSICAL ADDRESS */}
          <div className="section-card">
            <div className="section-header">
              <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <h3 className="section-title">Physical Address</h3>
            </div>
            <div className="fields-grid">
              <div className="field-wrapper">
                <label className="field-label">Number</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.portion_lot_no}
                  onChange={(e) => handleChange("portion_lot_no", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Village</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.village_street}
                  onChange={(e) => handleChange("village_street", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Town</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.town1}
                  onChange={(e) => handleChange("town1", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">District</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.district1}
                  onChange={(e) => handleChange("district1", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Province</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.province1}
                  onChange={(e) => handleChange("province1", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label required">Country</label>
                <select
                  className="field-input"
                  value={formData.country1}
                  onChange={(e) => handleChange("country1", e.target.value)}
                  required
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">PO Box</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.po_box1}
                  onChange={(e) => handleChange("po_box1", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label required">Postal Code</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.postal_code1}
                  onChange={(e) => handleChange("postal_code1", e.target.value)}
                  required
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Location</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.location1}
                  onChange={(e) => handleChange("location1", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div className="section-card">
            <div className="section-header">
              <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <h3 className="section-title">Contact Details</h3>
            </div>
            <div className="fields-grid">
              {/* Personal Contact with Country Code */}
              <div className="field-wrapper">
                <label className="field-label">Personal Contact Country Code</label>
                <select
                  className="field-input"
                  value={formData.personal_country_code}
                  onChange={(e) => handleChange("personal_country_code", e.target.value)}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">Personal Phone Number</label>
                <input
                  className="field-input"
                  type="tel"
                  value={formData.phone_no}
                  onChange={(e) => handleChange("phone_no", e.target.value)}
                  placeholder="Enter phone number without country code"
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Personal Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  value={formData.personal_email_address}
                  onChange={(e) => handleChange("personal_email_address", e.target.value)}
                />
              </div>

              {/* Office Contact with Country Code */}
              <div className="field-wrapper">
                <label className="field-label">Office Contact Country Code</label>
                <select
                  className="field-input"
                  value={formData.office_country_code}
                  onChange={(e) => handleChange("office_country_code", e.target.value)}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-wrapper">
                <label className="field-label">Office Phone Number</label>
                <input
                  className="field-input"
                  type="tel"
                  value={formData.mobile_no}
                  onChange={(e) => handleChange("mobile_no", e.target.value)}
                  placeholder="Enter phone number without country code"
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Office Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  value={formData.office_email}
                  onChange={(e) => handleChange("office_email", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ORIGIN */}
          <div className="section-card">
            <div className="section-header">
              <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" />
              </svg>
              <h3 className="section-title">Origin</h3>
            </div>
            <div className="fields-grid">
              <div className="field-wrapper">
                <label className="field-label required">Place of Birth</label>
                <select
                  className="field-input"
                  value={formData.place_of_birth}
                  onChange={(e) => handleChange("place_of_birth", e.target.value)}
                  required
                >
                  <option value="Hospital">Hospital</option>
                  <option value="Home Delivery">Home Delivery</option>
                </select>
              </div>

              {/* CONDITIONAL: Show only if place_of_birth = Hospital */}
              {formData.place_of_birth === "Hospital" && (
                <div className="field-wrapper">
                  <label className="field-label">Hospital Name</label>
                  <input
                    className="field-input"
                    type="text"
                    value={formData.hospital_name}
                    onChange={(e) => handleChange("hospital_name", e.target.value)}
                  />
                </div>
              )}

              <div className="field-wrapper">
                <label className="field-label">Village</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.village1}
                  onChange={(e) => handleChange("village1", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">District</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.district2}
                  onChange={(e) => handleChange("district2", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Province</label>
                <input
                  className="field-input"
                  type="text"
                  value={formData.province2}
                  onChange={(e) => handleChange("province2", e.target.value)}
                />
              </div>

              <div className="field-wrapper">
                <label className="field-label">Country</label>
                <select
                  className="field-input"
                  value={formData.country2}
                  onChange={(e) => handleChange("country2", e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ERPForm;
