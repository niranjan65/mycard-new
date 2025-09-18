// import React, { memo } from 'react';

// // Form 2 Component (Health Declaration) - Memoized
// const Form2 = memo(({ formData, handleChange, countries }) => (
//   <div>
//     {/* Health Declaration */}
//     <div className="section-card">
//       <div className="section-header">
//         <div className="section-icon">🏥</div>
//         <h3 className="section-title">Health Declaration</h3>
//       </div>

//       <div className="info-box">
//         <p className="info-text">To address your health condition better, we request you to provide your family tree details below.</p>
//       </div>

//       <div className="checkbox-wrapper">
//         <input
//           type="checkbox"
//           className="checkbox-input"
//           checked={formData.check_the_box_if_you_willing_to_provide_your_family_details}
//           onChange={(e) => handleChange("check_the_box_if_you_willing_to_provide_your_family_details", e.target.checked)}
//         />
//         <label className="checkbox-label">
//           Check the box if you are willing to provide your family details <span style={{color: '#ef4444'}}>*</span>
//         </label>
//       </div>

//       {/* Conditional Parents Details */}
//       {formData.check_the_box_if_you_willing_to_provide_your_family_details && (
//         <div className="parent-details">
//           <h4 className="parent-details-title">Details of Parents</h4>

//           <div className="parent-details-grid">
//             {/* Mother's Details */}
//             <div className="parent-section">
//               <h5 className="parent-section-title">Mother's Details</h5>

//               <div className="field-wrapper">
//                 <label className="field-label">Mother's Full Name</label>
//                 <input
//                   type="text"
//                   className="field-input"
//                   value={formData.mothers_full_name}
//                   onChange={(e) => handleChange("mothers_full_name", e.target.value)}
//                 />
//               </div>

//               <div className="field-wrapper">
//                 <label className="field-label">Middle Name</label>
//                 <input
//                   type="text"
//                   className="field-input"
//                   value={formData.mother_middle_name}
//                   onChange={(e) => handleChange("mother_middle_name", e.target.value)}
//                 />
//               </div>

//               <div className="field-wrapper">
//                 <label className="field-label">Last Name</label>
//                 <input
//                   type="text"
//                   className="field-input"
//                   value={formData.mother_last_name}
//                   onChange={(e) => handleChange("mother_last_name", e.target.value)}
//                 />
//               </div>

//               <div className="field-wrapper">
//                 <label className="field-label required">Mother Alive</label>
//                 <select
//                   className="field-select"
//                   value={formData.mother_alive}
//                   onChange={(e) => handleChange("mother_alive", e.target.value)}
//                 >
//                   <option>Yes</option>
//                   <option>No</option>
//                 </select>
//               </div>

//               {/* Conditional Mother's Contact */}
//               {formData.mother_alive === "Yes" ? (
//                 <>
//                   <div className="field-wrapper">
//                     <label className="field-label">Mother's Contact No</label>
//                     <input
//                       type="text"
//                       className="field-input"
//                       value={formData.mothers_contact_no}
//                       onChange={(e) => handleChange("mothers_contact_no", e.target.value)}
//                     />
//                   </div>
//                   <div className="field-wrapper">
//                     <label className="field-label">Mother's Email</label>
//                     <input
//                       type="email"
//                       className="field-input"
//                       value={formData.mothers_email}
//                       onChange={(e) => handleChange("mothers_email", e.target.value)}
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div className="field-wrapper">
//                   <label className="field-label">Cause of Death</label>
//                   <input
//                     type="text"
//                     className="field-input"
//                     value={formData.cause_of_death}
//                     onChange={(e) => handleChange("cause_of_death", e.target.value)}
//                   />
//                 </div>
//               )}

//               <div className="field-wrapper">
//                 <label className="field-label required">Country</label>
//                 <select
//                   className="field-select"
//                   value={formData.mother_country}
//                   onChange={(e) => handleChange("mother_country", e.target.value)}
//                 >
//                   {countries.map((country, index) => (
//                     <option key={index} value={country.name}>{country.name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Father's Details */}
//             <div className="parent-section">
//               <h5 className="parent-section-title">Father's Details</h5>

//               <div className="field-wrapper">
//                 <label className="field-label">Father's Full Name</label>
//                 <input
//                   type="text"
//                   className="field-input"
//                   value={formData.fathers_full_name}
//                   onChange={(e) => handleChange("fathers_full_name", e.target.value)}
//                 />
//               </div>

//               <div className="field-wrapper">
//                 <label className="field-label required">Father Alive</label>
//                 <select
//                   className="field-select"
//                   value={formData.father_alive}
//                   onChange={(e) => handleChange("father_alive", e.target.value)}
//                 >
//                   <option>Yes</option>
//                   <option>No</option>
//                 </select>
//               </div>

//               {/* Conditional Father's Contact */}
//               {formData.father_alive === "Yes" ? (
//                 <>
//                   <div className="field-wrapper">
//                     <label className="field-label">Father's Contact No</label>
//                     <input
//                       type="text"
//                       className="field-input"
//                       value={formData.fathers_contact_no}
//                       onChange={(e) => handleChange("fathers_contact_no", e.target.value)}
//                     />
//                   </div>
//                   <div className="field-wrapper">
//                     <label className="field-label">Father's Email</label>
//                     <input
//                       type="email"
//                       className="field-input"
//                       value={formData.fathers_email}
//                       onChange={(e) => handleChange("fathers_email", e.target.value)}
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div className="field-wrapper">
//                   <label className="field-label">Cause of Death</label>
//                   <input
//                     type="text"
//                     className="field-input"
//                     value={formData.father_cause_of_death}
//                     onChange={(e) => handleChange("father_cause_of_death", e.target.value)}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Marital Status */}
//       <div style={{marginTop: '2rem'}}>
//         <div className="field-wrapper">
//           <label className="field-label required">Marital Status</label>
//           <select
//             className="field-select"
//             style={{maxWidth: '300px'}}
//             value={formData.marital_status}
//             onChange={(e) => handleChange("marital_status", e.target.value)}
//           >
//             <option>Married</option>
//             <option>Single</option>
//           </select>
//         </div>
//       </div>
//     </div>

//     {/* Basic Health Information */}
//     <div className="section-card">
//       <div className="section-header">
//         <div className="section-icon">❤️</div>
//         <h3 className="section-title">Basic Health Information</h3>
//       </div>

//       <div className="fields-grid">
//         <div className="field-wrapper">
//           <label className="field-label">Age</label>
//           <input
//             type="number"
//             className="field-input"
//             value={formData.age}
//             onChange={(e) => handleChange("age", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">Height</label>
//           <input
//             type="text"
//             placeholder="e.g., 175 cm"
//             className="field-input"
//             value={formData.height}
//             onChange={(e) => handleChange("height", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">Weight</label>
//           <input
//             type="text"
//             placeholder="e.g., 70 kg"
//             className="field-input"
//             value={formData.weight}
//             onChange={(e) => handleChange("weight", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">BMI</label>
//           <input
//             type="text"
//             className="field-input"
//             value={formData.bmi}
//             onChange={(e) => handleChange("bmi", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">Blood Sugar</label>
//           <input
//             type="text"
//             className="field-input"
//             value={formData.blood_sugar}
//             onChange={(e) => handleChange("blood_sugar", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">BP-Systolic</label>
//           <input
//             type="text"
//             className="field-input"
//             value={formData.bp_systolic}
//             onChange={(e) => handleChange("bp_systolic", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">Diastolic</label>
//           <input
//             type="text"
//             className="field-input"
//             value={formData.diastolic}
//             onChange={(e) => handleChange("diastolic", e.target.value)}
//           />
//         </div>

//         <div className="field-wrapper">
//           <label className="field-label">Pulse Rate</label>
//           <input
//             type="text"
//             className="field-input"
//             value={formData.pulse_rate}
//             onChange={(e) => handleChange("pulse_rate", e.target.value)}
//           />
//         </div>
//       </div>

//       <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem'}}>
//         <div className="field-wrapper">
//           <label className="field-label">Prevailing Medical Conditions/Diseases</label>
//           <textarea
//             rows={4}
//             className="field-textarea"
//             value={formData.prevailing_medical_conditions}
//             onChange={(e) => handleChange("prevailing_medical_conditions", e.target.value)}
//           />
//         </div>

//         <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
//           <div className="field-wrapper">
//             <label className="field-label">Are Surgical Operations Done in the Past</label>
//             <select
//               className="field-select"
//               value={formData.are_surgical_operation_done_in_the_past}
//               onChange={(e) => handleChange("are_surgical_operation_done_in_the_past", e.target.value)}
//             >
//               <option>No</option>
//               <option>Yes</option>
//             </select>
//           </div>

//           {/* Conditional Surgery Details */}
//           {formData.are_surgical_operation_done_in_the_past === "Yes" && (
//             <>
//               <div className="field-wrapper">
//                 <label className="field-label">Type of Operation</label>
//                 <input
//                   type="text"
//                   className="field-input"
//                   value={formData.type_of_operation}
//                   onChange={(e) => handleChange("type_of_operation", e.target.value)}
//                 />
//               </div>
//               <div className="field-wrapper">
//                 <label className="field-label">Date</label>
//                 <input
//                   type="date"
//                   className="field-input"
//                   value={formData.operation_date}
//                   onChange={(e) => handleChange("operation_date", e.target.value)}
//                 />
//               </div>
//             </>
//           )}

//           <div className="field-wrapper">
//             <label className="field-label">Are You Taking any Medications</label>
//             <select
//               className="field-select"
//               value={formData.are_you_taking_medications}
//               onChange={(e) => handleChange("are_you_taking_medications", e.target.value)}
//             >
//               <option>No</option>
//               <option>Yes</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// ));

// export default Form2;




import React, { memo, useState } from 'react';

// Form 2 Component (Health Declaration) - Memoized
const Form2 = memo(({ formData, handleChange, countries, spouseData, setSpouseData, childrenData, setChildrenData }) => {
  

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

  // Function to add children row
  const addChildrenRow = () => {
    const newRow = { children_name: '', spouse_name: '', crm_no: '', age: '' };
    setChildrenData([...childrenData, newRow]);
  };

  // Function to update children row
  const updateChildrenRow = (index, field, value) => {
    const updatedData = [...childrenData];
    updatedData[index][field] = value;
    setChildrenData(updatedData);
  };

  // Function to remove children row
  const removeChildrenRow = (index) => {
    const updatedData = childrenData.filter((_, i) => i !== index);
    setChildrenData(updatedData);
  };

  return (
    <div>
      {/* Health Declaration */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-icon">🏥</div>
          <h3 className="section-title">Health Declaration</h3>
        </div>

        <div className="info-box">
          <p className="info-text">To address your health condition better, we request you to provide your family tree details below.</p>
        </div>

        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={formData.check_the_box_if_you_willing_to_provide_your_family_details}
            onChange={(e) => handleChange("check_the_box_if_you_willing_to_provide_your_family_details", e.target.checked)}
          />
          <label className="checkbox-label">
            Check the box if you are willing to provide your family details <span style={{ color: '#ef4444' }}>*</span>
          </label>
        </div>

        {/* Conditional Parents Details */}
        {formData.check_the_box_if_you_willing_to_provide_your_family_details && (
          <div className="parent-details">
            <h4 className="parent-details-title">Details of Parents</h4>

            <div className="parent-details-grid">
              {/* Mother's Details */}
              <div className="parent-section">
                <h5 className="parent-section-title">Mother's Details</h5>

                <div className="field-wrapper">
                  <label className="field-label">Mother's First Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.mothers_full_name}
                    onChange={(e) => handleChange("mothers_full_name", e.target.value)}
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label">Middle Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.mother_middle_name}
                    onChange={(e) => handleChange("mother_middle_name", e.target.value)}
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label">Last Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.mother_last_name}
                    onChange={(e) => handleChange("mother_last_name", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">Mother's origin village</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.mother_origin_village}
                    onChange={(e) => handleChange("mother_origin_village", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">District</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.mother_district}
                    onChange={(e) => handleChange("mother_district", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">Province</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.mother_province}
                    onChange={(e) => handleChange("mother_province", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label required">Country</label>
                  <select
                    className="field-select required"
                    value={formData.mother_country}
                    onChange={(e) => handleChange("mother_country", e.target.value)}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field-wrapper">
                  <label className="field-label required">Mother Alive</label>
                  <select
                    className="field-select required"
                    value={formData.mother_alive}
                    onChange={(e) => handleChange("mother_alive", e.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

                {/* Conditional Mother's Contact */}
                {formData.mother_alive === "Yes" ? (
                  <>
                    <div className="field-wrapper">
                      <label className="field-label">Mother's Contact No</label>
                      <input
                        type="text"
                        className="field-input"
                        value={formData.mothers_contact_no}
                        onChange={(e) => handleChange("mothers_contact_no", e.target.value)}
                      />
                    </div>
                    <div className="field-wrapper">
                      <label className="field-label">Mother's Email</label>
                      <input
                        type="email"
                        className="field-input"
                        value={formData.mothers_email}
                        onChange={(e) => handleChange("mothers_email", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="field-wrapper">
                    <label className="field-label">Cause of Death</label>
                    <input
                      type="text"
                      className="field-input"
                      value={formData.cause_of_death}
                      onChange={(e) => handleChange("cause_of_death", e.target.value)}
                    />
                  </div>
                )}


              </div>

              {/* Father's Details */}
              <div className="parent-section">
                <h5 className="parent-section-title">Father's Details</h5>

                <div className="field-wrapper">
                  <label className="field-label">Father's First Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.fathers_full_name}
                    onChange={(e) => handleChange("fathers_full_name", e.target.value)}
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label">Middle Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.father_middle_name}
                    onChange={(e) => handleChange("father_middle_name", e.target.value)}
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label">Last Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.father_last_name}
                    onChange={(e) => handleChange("father_last_name", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">Father's origin village</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.father_origin_village}
                    onChange={(e) => handleChange("father_origin_village", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">District</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.father_district}
                    onChange={(e) => handleChange("father_district", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">Province</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.father_province}
                    onChange={(e) => handleChange("father_province", e.target.value)}
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label required">Country</label>
                  <select
                    className="field-select required"
                    value={formData.father_country}
                    onChange={(e) => handleChange("father_country", e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field-wrapper">
                  <label className="field-label required">Father Alive</label>
                  <select
                    className="field-select required"
                    value={formData.father_alive}
                    onChange={(e) => handleChange("father_alive", e.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

                {/* Conditional Father's Contact */}
                {formData.father_alive === "Yes" ? (
                  <>
                    <div className="field-wrapper">
                      <label className="field-label">Father's Contact No</label>
                      <input
                        type="text"
                        className="field-input"
                        value={formData.fathers_contact_no}
                        onChange={(e) => handleChange("fathers_contact_no", e.target.value)}
                      />
                    </div>
                    <div className="field-wrapper">
                      <label className="field-label">Father's Email</label>
                      <input
                        type="email"
                        className="field-input"
                        value={formData.fathers_email}
                        onChange={(e) => handleChange("fathers_email", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="field-wrapper">
                    <label className="field-label">Cause of Death</label>
                    <input
                      type="text"
                      className="field-input"
                      value={formData.father_cause_of_death}
                      onChange={(e) => handleChange("father_cause_of_death", e.target.value)}
                    />
                  </div>
                )}


              </div>
            </div>
          </div>
        )}

        {/* Marital Status */}
        <div style={{ marginTop: '2rem' }}>
          <div className="field-wrapper">
            <label className="field-label required">Marital Status</label>
            <select
              className="field-select"
              style={{ maxWidth: '300px' }}
              value={formData.marital_status}
              onChange={(e) => handleChange("marital_status", e.target.value)}
            >
              <option value="">Select</option>
              <option>Married</option>
              <option>Single</option>
            </select>
          </div>
        </div>

        {/* Spouse and Children Tables - Show only if Married */}
        {formData.marital_status === "Married" && (
          <div style={{ marginTop: '2rem' }}>
            {/* Spouse Table */}
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
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>CRM ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Age</th>
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
                              onChange={(e) => updateSpouseRow(index, 'name1', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.crm_no}
                              onChange={(e) => updateSpouseRow(index, 'crm_no', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.age}
                              onChange={(e) => updateSpouseRow(index, 'age', e.target.value)}
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

            {/* Children Table */}
            <div className="table-section" style={{ marginTop: '2rem' }}>
              <div className="table-header">
                <h4>Children Details</h4>
                <button
                  type="button"
                  onClick={addChildrenRow}
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
                  + Add Child
                </button>
              </div>

              {childrenData.length > 0 && (
                <div className="table-container" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Children Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Father's/Mother's Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>CRM ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Age</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childrenData.map((row, index) => (
                        <tr key={index}>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.children_name}
                              onChange={(e) => updateChildrenRow(index, 'children_name', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.spouse_name}
                              onChange={(e) => updateChildrenRow(index, 'spouse_name', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.crm_no}
                              onChange={(e) => updateChildrenRow(index, 'crm_no', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <input
                              type="text"
                              value={row.age}
                              onChange={(e) => updateChildrenRow(index, 'age', e.target.value)}
                              className="field-input"
                              style={{ width: '100%', margin: 0 }}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => removeChildrenRow(index)}
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
          </div>
        )}
      </div>

      {/* Basic Health Information */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-icon">❤️</div>
          <h3 className="section-title">Basic Health Information</h3>
        </div>


        <div className="fields-grid">
          <div className="field-wrapper">
            <label className="field-label">Date</label>
            <input
              type="date"
              className="field-input"
              value={formData.BH_date}
              onChange={(e) => handleChange("BH_date", e.target.value)}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label">Blome No.</label>
            <input
              type="text"
              className="field-input"
              value={formData.blome_no}
              onChange={(e) => handleChange("blome_no", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Age</label>
            <input
              type="number"
              className="field-input"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Height</label>
            <input
              type="text"
              placeholder="e.g., 175 cm"
              className="field-input"
              value={formData.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Weight</label>
            <input
              type="text"
              placeholder="e.g., 70 kg"
              className="field-input"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">BMI</label>
            <input
              type="text"
              className="field-input"
              value={formData.bmi}
              onChange={(e) => handleChange("bmi", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Abdominal Circumference</label>
            <input
              type="text"
              className="field-input"
              value={formData.abdominal_circumference}
              onChange={(e) => handleChange("abdominal_circumference", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Hip Circumference</label>
            <input
              type="text"
              className="field-input"
              value={formData.hip_circumference}
              onChange={(e) => handleChange("hip_circumference", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Blood Sugar</label>
            <input
              type="text"
              className="field-input"
              value={formData.blood_sugar}
              onChange={(e) => handleChange("blood_sugar", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">BP-Systolic</label>
            <input
              type="text"
              className="field-input"
              value={formData.bp_systolic}
              onChange={(e) => handleChange("bp_systolic", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Diastolic</label>
            <input
              type="text"
              className="field-input"
              value={formData.diastolic}
              onChange={(e) => handleChange("diastolic", e.target.value)}
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Pulse Rate</label>
            <input
              type="text"
              className="field-input"
              value={formData.pulse_rate}
              onChange={(e) => handleChange("pulse_rate", e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="field-wrapper">
            <label className="field-label">Prevailing Medical Conditions/Diseases</label>
            <textarea
              rows={4}
              className="field-textarea"
              value={formData.prevailing_medical_conditions}
              onChange={(e) => handleChange("prevailing_medical_conditions", e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="field-wrapper">
              <label className="field-label">Are Surgical Operations Done in the Past</label>
              <select
                className="field-select"
                value={formData.are_surgical_operation_done_in_the_past}
                onChange={(e) => handleChange("are_surgical_operation_done_in_the_past", e.target.value)}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            {/* Conditional Surgery Details */}
            {formData.are_surgical_operation_done_in_the_past === "Yes" && (
              <>
                <div className="field-wrapper">
                  <label className="field-label">Type of Operation</label>
                  <input
                    type="text"
                    className="field-input"
                    value={formData.type_of_operation}
                    onChange={(e) => handleChange("type_of_operation", e.target.value)}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label">Date</label>
                  <input
                    type="date"
                    className="field-input"
                    value={formData.operation_date}
                    onChange={(e) => handleChange("operation_date", e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="field-wrapper">
              <label className="field-label">Are You Taking any Medications</label>
              <select
                className="field-select"
                value={formData.are_you_taking_medications}
                onChange={(e) => handleChange("are_you_taking_medications", e.target.value)}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden fields to pass table data to parent */}
      <input
        type="hidden"
        value={JSON.stringify(spouseData)}
        onChange={() => { }}
        data-spouse-data="true"
      />
      <input
        type="hidden"
        value={JSON.stringify(childrenData)}
        onChange={() => { }}
        data-children-data="true"
      />
    </div>
  );
});

export default Form2;
