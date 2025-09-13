import React, { memo, useEffect } from 'react';

// Form 1 Component (Personal Information) - Memoized
const Form1 = memo(({ formData, handleChange, countries }) => {
  useEffect(() => {
    console.log('formData:', formData);
  }, [formData]);
  return (
  <div>
    {/* Basic Information (hidden) */}
    <div className="section-card" style={{ display: 'none' }}>
      <div className="section-header">
        <div className="section-icon">✅</div>
        <h3 className="section-title">Basic Information</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Card Blo Me ID</label>
          <select
            required
            className="field-select"
            value={formData.naming_series}
            onChange={(e) => handleChange("naming_series", e.target.value)}
          >
            <option value="CBM-">CBM-</option>
          </select>
        </div>
        <div className="field-wrapper">
          <label className="field-label required">Status</label>
          <select
            className="field-select"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option>Drafted</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
            <option>Rejected</option>
          </select>
        </div>
        {formData.status === "Inactive" && (
          <>
            <div className="field-wrapper">
              <label className="field-label">Inactive Date</label>
              <input
                type="date"
                className="field-input"
                value={formData.inactive_date}
                onChange={(e) => handleChange("inactive_date", e.target.value)}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label">Inactive Reason</label>
              <textarea
                className="field-textarea"
                value={formData.inactive_reason}
                onChange={(e) => handleChange("inactive_reason", e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>

    {/* Personal Health Declaration */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">👤</div>
        <h3 className="section-title">Personal Health Declaration</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Title</label>
          <select
            className="field-select"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          >
            <option value="">Select</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
          </select>
        </div>
        <div className="field-wrapper" >
          <label className="field-label required">First Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label ">Middle Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.middle_name}
            onChange={(e) => handleChange("middle_name", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label required">Last Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label required">Gender</label>
          <select
            className="field-select required"
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
          <label className="field-label required">Date Of Birth</label>
          <input
            type="date"
            className="field-input"
            value={formData.date_of_birth}
            onChange={(e) => handleChange("date_of_birth", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label required">Blood Group</label>
          <select
            className="field-select"
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
            className="field-select required"
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

    {/* Current Address */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">📍</div>
        <h3 className="section-title">Current Address</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Number</label>
          <input
            type="text"
            className="field-input"
            value={formData.portion_nolot_no}
            onChange={(e) => handleChange("portion_nolot_no", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Village</label>
          <input
            type="text"
            className="field-input"
            value={formData.village}
            onChange={(e) => handleChange("village", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Town</label>
          <input
            type="text"
            className="field-input"
            value={formData.town}
            onChange={(e) => handleChange("town", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">District</label>
          <input
            type="text"
            className="field-input"
            value={formData.district}
            onChange={(e) => handleChange("district", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Province</label>
          <input
            type="text"
            className="field-input"
            value={formData.province}
            onChange={(e) => handleChange("province", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label required">Country</label>
          <select
            className="field-select"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
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
            type="text"
            className="field-input"
            value={formData.po_box}
            onChange={(e) => handleChange("po_box", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label required">Postal Code</label>
          <input
            type="text"
            className="field-input required"
            value={formData.postal_code}
            onChange={(e) => handleChange("postal_code", e.target.value)}
            required
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Location</label>
          <input
            type="text"
            className="field-input"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Physical Address */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">🏠</div>
        <h3 className="section-title">Physical Address</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Number</label>
          <input
            type="text"
            className="field-input"
            value={formData.portion_lot_no}
            onChange={(e) => handleChange("portion_lot_no", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Street/Village</label>
          <input
            type="text"
            className="field-input"
            value={formData.village_street}
            onChange={(e) => handleChange("village_street", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Town</label>
          <input
            type="text"
            className="field-input"
            value={formData.town1}
            onChange={(e) => handleChange("town1", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">District</label>
          <input
            type="text"
            className="field-input"
            value={formData.district1}
            onChange={(e) => handleChange("district1", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Province</label>
          <input
            type="text"
            className="field-input"
            value={formData.province1}
            onChange={(e) => handleChange("province1", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Country</label>
          <select
            className="field-select required"
            value={formData.country1}
            onChange={(e) => handleChange("country1", e.target.value)}
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
            type="text"
            className="field-input"
            value={formData.po_box1}
            onChange={(e) => handleChange("po_box1", e.target.value)}
          />
        </div>
        <div className="field-wrapper ">
          <label className="field-label required">Postal Code</label>
          <input
            type="text"
            className="field-input required"
            value={formData.postal_code1}
            onChange={(e) => handleChange("postal_code1", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Location</label>
          <input
            type="text"
            className="field-input"
            value={formData.location1}
            onChange={(e) => handleChange("location1", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Contact Details */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">📧</div>
        <h3 className="section-title">Contact Details</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Personal Country Code</label>
          <select
            className="field-select"
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
            type="tel"
            className="field-input"
            value={formData.phone_no}
            onChange={(e) => handleChange("phone_no", e.target.value)}
            placeholder="Enter phone number without country code"
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Personal Email Address</label>
          <input
            type="email"
            className="field-input"
            value={formData.personal_email_address}
            onChange={(e) => handleChange("personal_email_address", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Office Country Code</label>
          <select
            className="field-select"
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
            type="tel"
            className="field-input"
            value={formData.mobile_no}
            onChange={(e) => handleChange("mobile_no", e.target.value)}
            placeholder="Enter phone number without country code"
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Office Email Address</label>
          <input
            type="email"
            className="field-input"
            value={formData.office_email}
            onChange={(e) => handleChange("office_email", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Origin */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">🏠</div>
        <h3 className="section-title">Origin</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label required">Place of Birth</label>
          <select
            className="field-select"
            value={formData.place_of_birth}
            onChange={(e) => handleChange("place_of_birth", e.target.value)}
          >
            <option value="Hospital">Hospital</option>
            <option value="Home Delivery">Home Delivery</option>
          </select>
        </div>
        {formData.place_of_birth === "Hospital" && (
          <div className="field-wrapper">
            <label className="field-label">Hospital Name</label>
            <input
              type="text"
              className="field-input"
              value={formData.hospital_name}
              onChange={(e) => handleChange("hospital_name", e.target.value)}
            />
          </div>
        )}
        <div className="field-wrapper">
          <label className="field-label">Village</label>
          <input
            type="text"
            className="field-input"
            value={formData.village1}
            onChange={(e) => handleChange("village1", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">District</label>
          <input
            type="text"
            className="field-input"
            value={formData.district2}
            onChange={(e) => handleChange("district2", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Province</label>
          <input
            type="text"
            className="field-input"
            value={formData.province2}
            onChange={(e) => handleChange("province2", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Country</label>
          <select
            className="field-select"
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
  </div>
)
});

export default Form1;
