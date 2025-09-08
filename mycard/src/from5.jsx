import React, { memo } from 'react';

// Form 5 Component (Final Review) - Memoized
const Form5 = memo(({ formData }) => (
  <div>
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">✅</div>
        <h3 className="section-title">Application Summary</h3>
      </div>
      
      <div className="review-summary">
        <h4 className="review-section-title">Personal Information</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Full Name:</span>
            <span className="review-value">{`${formData.first_name} ${formData.middle_name} ${formData.last_name}`.trim() || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Gender:</span>
            <span className="review-value">{formData.gender || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Date of Birth:</span>
            <span className="review-value">{formData.date_of_birth || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Blood Group:</span>
            <span className="review-value">{formData.blood_group || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Country:</span>
            <span className="review-value">{formData.country || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Email:</span>
            <span className="review-value">{formData.personal_email_address || "Not provided"}</span>
          </div>
        </div>

        <h4 className="review-section-title">Health Information</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Age:</span>
            <span className="review-value">{formData.age || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Height:</span>
            <span className="review-value">{formData.height || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Weight:</span>
            <span className="review-value">{formData.weight || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">BMI:</span>
            <span className="review-value">{formData.bmi || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Blood Pressure:</span>
            <span className="review-value">{`${formData.bp_systolic}/${formData.diastolic}`.replace('/', '') ? `${formData.bp_systolic}/${formData.diastolic}` : "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Blood Sugar:</span>
            <span className="review-value">{formData.blood_sugar || "Not provided"}</span>
          </div>
        </div>

        <h4 className="review-section-title">Emergency Contact</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Emergency Contact:</span>
            <span className="review-value">{`${formData.emergency_first_name} ${formData.emergency_middle_name} ${formData.emergency_last_name}`.trim() || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Emergency Phone:</span>
            <span className="review-value">{formData.emergency_phone_no ? `${formData.emergency_personal_country_code} ${formData.emergency_phone_no}` : "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Next of Kin:</span>
            <span className="review-value">{`${formData.kin_firstname} ${formData.kin_middlename} ${formData.kin_lastname}`.trim() || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Kin Phone:</span>
            <span className="review-value">{formData.kin_phone_no ? `${formData.kin_personal_country_code} ${formData.kin_phone_no}` : "Not provided"}</span>
          </div>
        </div>

        <h4 className="review-section-title">Employment Information</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Company:</span>
            <span className="review-value">{formData.company || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Department:</span>
            <span className="review-value">{formData.department || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Supervisor:</span>
            <span className="review-value">{formData.supervisor_name || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Work Risk Type:</span>
            <span className="review-value">{formData.work_risk_type || "Not provided"}</span>
          </div>
        </div>

        <h4 className="review-section-title">Lifestyle Information</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Alcohol:</span>
            <span className="review-value">{formData.alcohol} - {formData.frequency_of_taking_alcohol}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Smoking:</span>
            <span className="review-value">{formData.smoking} - {formData.frequency_of_smoking}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Beteinut:</span>
            <span className="review-value">{formData.beteinut} - {formData.frequency_of_beteinut}</span>
          </div>
        </div>

        <h4 className="review-section-title">Bank Information</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Bank Name:</span>
            <span className="review-value">{formData.bank_name || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Branch:</span>
            <span className="review-value">{formData.branch || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Account Number:</span>
            <span className="review-value">{formData.account_no || "Not provided"}</span>
          </div>
        </div>

        <div className="review-declaration">
          <h4 className="review-section-title">Declaration</h4>
          <div className="declaration-box">
            <p>I sincerely declare that the information provided in this Health Declaration Form is true and correct to the best of my knowledge. I hereby give permission to Western Medicare Ltd. to use the information provided by me to evaluate my health status and for research purposes as required. I further release Western Medicare Ltd. from any future litigation in relation to the information I have provided.</p>
            <div className="signature-section">
              {/* <div className="signature-line">
                <span>Digital Signature: <strong>{formData.signature || "Not signed"}</strong></span>
              </div> */}
              <div className="signature-line">
                <span>Name: <strong>{formData.declaration_name || "Not provided"}</strong></span>
              </div>
              <div className="signature-line">
                <span>Date: <strong>{new Date().toLocaleDateString()}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default Form5;