import React, { memo, useState } from 'react';

// Form 3 Component (Emergency Contact & Bank Details) - Memoized
const Form3 = memo(({ formData, handleChange, countries }) => {
  const [spouseData, setSpouseData] = useState([]);
  
    // Function to add spouse row
    const addSpouseRow = () => {
      const newRow = { name1: '', crm_no: '', age: '' };
      setSpouseData([...spouseData, newRow]);
    };
  
    // Function to update spouse row
    const updateSpouseRow = (index, field, value) => {
      const updatedData = [...spouseData];
      updatedData[index][field] = value;
      setSpouseData(updatedData);
    };
  
    // Function to remove spouse row
    const removeSpouseRow = (index) => {
      const updatedData = spouseData.filter((_, i) => i !== index);
      setSpouseData(updatedData);
    };

  return (
    <div>
    {/* Emergency Contact Person */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">🚨</div>
        <h3 className="section-title">Emergency Contact Person</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">First Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_first_name}
            onChange={(e) => handleChange("emergency_first_name", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Middle Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_middle_name}
            onChange={(e) => handleChange("emergency_middle_name", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Last Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_last_name}
            onChange={(e) => handleChange("emergency_last_name", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Gender</label>
          <select
            className="field-select"
            value={formData.emergency_gender}
            onChange={(e) => handleChange("emergency_gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Date of Birth</label>
          <input
            type="date"
            className="field-input"
            value={formData.emergency_date_of_birth}
            onChange={(e) => handleChange("emergency_date_of_birth", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Blood Group</label>
          <select
            className="field-select"
            value={formData.emergency_blood_group}
            onChange={(e) => handleChange("emergency_blood_group", e.target.value)}
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
          <label className="field-label">Number</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_number}
            onChange={(e) => handleChange("emergency_number", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Village</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_village}
            onChange={(e) => handleChange("emergency_village", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">District</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_district}
            onChange={(e) => handleChange("emergency_district", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Province</label>
          <input
            type="text"
            className="field-input"
            value={formData.emergency_province}
            onChange={(e) => handleChange("emergency_province", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Country</label>
          <select
            className="field-select"
            value={formData.emergency_country}
            onChange={(e) => handleChange("emergency_country", e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Personal Country Code</label>
          <select
            className="field-select"
            value={formData.emergency_personal_country_code}
            onChange={(e) => handleChange("emergency_personal_country_code", e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code} ({country.name})
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Personal Phone No</label>
          <input
            type="tel"
            className="field-input"
            value={formData.emergency_phone_no}
            onChange={(e) => handleChange("emergency_phone_no", e.target.value)}
            placeholder="Enter phone number without country code"
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Office Country Code</label>
          <select
            className="field-select"
            value={formData.emergency_office_country_code}
            onChange={(e) => handleChange("emergency_office_country_code", e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code} ({country.name})
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Office Phone No</label>
          <input
            type="tel"
            className="field-input"
            value={formData.emergency_phone_no1}
            onChange={(e) => handleChange("emergency_phone_no1", e.target.value)}
            placeholder="Enter phone number without country code"
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Personal Email</label>
          <input
            type="email"
            className="field-input"
            value={formData.emergency_personal_email}
            onChange={(e) => handleChange("emergency_personal_email", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Office Email</label>
          <input
            type="email"
            className="field-input"
            value={formData.emergency_office_email}
            onChange={(e) => handleChange("emergency_office_email", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Next of Kin */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">👨‍👩‍👧‍👦</div>
        <h3 className="section-title">Next of Kin</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">First Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_firstname}
            onChange={(e) => handleChange("kin_firstname", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Middle Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_middlename}
            onChange={(e) => handleChange("kin_middlename", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Last Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_lastname}
            onChange={(e) => handleChange("kin_lastname", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Gender</label>
          <select
            className="field-select"
            value={formData.kin_gender}
            onChange={(e) => handleChange("kin_gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Date of Birth</label>
          <input
            type="date"
            className="field-input"
            value={formData.kin_date_of_birth}
            onChange={(e) => handleChange("kin_date_of_birth", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Blood Group</label>
          <select
            className="field-select"
            value={formData.kin_blood_group}
            onChange={(e) => handleChange("kin_blood_group", e.target.value)}
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
          <label className="field-label">Number</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_number}
            onChange={(e) => handleChange("kin_number", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Village</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_village}
            onChange={(e) => handleChange("kin_village", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">District</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_district}
            onChange={(e) => handleChange("kin_district", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Province</label>
          <input
            type="text"
            className="field-input"
            value={formData.kin_province}
            onChange={(e) => handleChange("kin_province", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Country</label>
          <select
            className="field-select"
            value={formData.kin_country}
            onChange={(e) => handleChange("kin_country", e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Personal Country Code</label>
          <select
            className="field-select"
            value={formData.kin_personal_country_code}
            onChange={(e) => handleChange("kin_personal_country_code", e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code} ({country.name})
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Personal Phone No</label>
          <input
            type="tel"
            className="field-input"
            value={formData.kin_phone_no}
            onChange={(e) => handleChange("kin_phone_no", e.target.value)}
            placeholder="Enter phone number without country code"
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Office Country Code</label>
          <select
            className="field-select"
            value={formData.kin_office_country_code}
            onChange={(e) => handleChange("kin_office_country_code", e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code} ({country.name})
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Office Phone No</label>
          <input
            type="tel"
            className="field-input"
            value={formData.kin_office_phone_no}
            onChange={(e) => handleChange("kin_office_phone_no", e.target.value)}
            placeholder="Enter phone number without country code"
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Personal Email</label>
          <input
            type="email"
            className="field-input"
            value={formData.kin_personal_email}
            onChange={(e) => handleChange("kin_personal_email", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Office Email</label>
          <input
            type="email"
            className="field-input"
            value={formData.kin_office_email}
            onChange={(e) => handleChange("kin_office_email", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Bank Details */}
    
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">🏦</div>
        <h3 className="section-title">Bank Details</h3>
      </div>
      {/* <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Bank Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.bank_name}
            onChange={(e) => handleChange("bank_name", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Branch</label>
          <input
            type="text"
            className="field-input"
            value={formData.branch}
            onChange={(e) => handleChange("branch", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Account Number</label>
          <input
            type="text"
            className="field-input"
            value={formData.account_no}
            onChange={(e) => handleChange("account_no", e.target.value)}
          />
        </div>
      </div> */}



      
      {/* <div style={{ marginTop: '2rem' }}>
            
            <div className="table-section">
              <div className="table-header">
                <h4>Spouse Details</h4>
                <button
                  type="button"
                  onClick={addSpouseRow}
                  className="btn btn-add-row"
                  style={{
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Spouse
                </button>
              </div>

              {spouseData.length > 0 && (
                <div className="table-container" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Account Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Account Number</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Bank Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Branch name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spouseData.map((row, index) => (
                        <tr key={index}>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.name1}
                              onChange={(e) => updateSpouseRow(index, 'bank_account', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.crm_no}
                              onChange={(e) => updateSpouseRow(index, 'account_number', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.age}
                              onChange={(e) => updateSpouseRow(index, 'bank_name', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.age}
                              onChange={(e) => updateSpouseRow(index, 'branch_name', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => removeSpouseRow(index)}
                              style={{
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            
          </div> */}
    </div>

    {/* Declaration */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">📝</div>
        <h3 className="section-title">Declaration</h3>
      </div>
      <div className="fields-grid">

        <div className='field-wrapper' style={{border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9'}}>
          <label className='field-label'>
            I sincerely declare that the information provided in this Health Declaration Form is true and correct to the best of my knowledge. I hereby give permission to Western Medicare Ltd. to use the information provided by me to evaluate my health status and for research purposes as required. I further release Western Medicare Ltd. from any future litigation in relation to the information I have provided.
          </label>
        </div>
        {/* <div className="field-wrapper">
          <label className="field-label required">Full Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.declaration_name}
            onChange={(e) => handleChange("declaration_name", e.target.value)}
          />
        </div> */}

        <div className="field-wrapper">
          <label className="field-label required">Digital Signature</label>
          <input
            type="text"
            className="field-input"
            value={formData.signature}
            onChange={(e) => handleChange("signature", e.target.value)}
            placeholder="Type your full name as digital signature"
          />
        </div>
      </div>
    </div>
  </div>
  )
});
  
  
  

export default Form3;