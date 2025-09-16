import React, { memo } from 'react';

// Form 4 Component (Employment & Lifestyle) - Memoized
const Form4 = memo(({ formData, handleChange }) => (
  <div>
    {/* Company Information */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">🏢</div>
        <h3 className="section-title">Company Information</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label required">Company</label>
          <input
            type="text"
            className="field-input"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label required">Department</label>
          <input
            type="text"
            className="field-input"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Company Physical Address</label>
          <input
            type="text"
            className="field-input"
            value={formData.company_physical_address}
            onChange={(e) => handleChange("company_physical_address", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">PO Box Address</label>
          <input
            type="text"
            className="field-input"
            value={formData.po_box_address}
            onChange={(e) => handleChange("po_box_address", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Employee Type (Casual/Permanent)</label>
          <select
            className="field-select"
            value={formData.employee_type_emailwebsite}
            onChange={(e) => handleChange("employee_type_emailwebsite", e.target.value)}
          >
            <option value="">Select</option>
            {/* <option>Email</option>
            <option>Website</option> */}
             <option>Casual</option>
            <option>Permanent
              permanent
            </option>
          </select>
        </div>
      </div>
    </div>

    {/* Supervisor Information */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">👨‍💼</div>
        <h3 className="section-title">Supervisor Information</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Supervisor Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.supervisor_name}
            onChange={(e) => handleChange("supervisor_name", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Supervisor Position</label>
          <input
            type="text"
            className="field-input"
            value={formData.supervisor_position}
            onChange={(e) => handleChange("supervisor_position", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Supervisor Contact</label>
          <input
            type="text"
            className="field-input"
            value={formData.supervisor_contact}
            onChange={(e) => handleChange("supervisor_contact", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Supervisor Email</label>
          <input
            type="email"
            className="field-input"
            value={formData.supervisor_email}
            onChange={(e) => handleChange("supervisor_email", e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">HR Manager Name</label>
          <input
            type="text"
            className="field-input"
            value={formData.hr_manager_name}
            onChange={(e) => handleChange("hr_manager_name", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">HR Manager Contact</label>
          <input
            type="text"
            className="field-input"
            value={formData.hr_manager_contact}
            onChange={(e) => handleChange("hr_manager_contact", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">HR Manager Email Address</label>
          <input
            type="email"
            className="field-input"
            value={formData.hr_manager_email_address}
            onChange={(e) => handleChange("hr_manager_email_address", e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* Work Information */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">⚙️</div>
        <h3 className="section-title">Work Information</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label">Nature of Work</label>
          <input
            type="text"
            className="field-input"
            value={formData.nature_of_work}
            onChange={(e) => handleChange("nature_of_work", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Workplace Hazards</label>
          <input
            type="text"
            className="field-input"
            value={formData.workplace_hazards}
            onChange={(e) => handleChange("workplace_hazards", e.target.value)}
          />
        </div>

        <div className="field-wrapper">
          <label className="field-label">Work Risk Type</label>
          <select
            className="field-select"
            value={formData.work_risk_type}
            onChange={(e) => handleChange("work_risk_type", e.target.value)}
          >
            <option value="">Select</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
    </div>

    {/* Lifestyle Information */}
    <div className="section-card">
      <div className="section-header">
        <div className="section-icon">🚭</div>
        <h3 className="section-title">Lifestyle Information</h3>
      </div>
      <div className="fields-grid">
        <div className="field-wrapper">
          <label className="field-label required">Alcohol</label>
          <select
            className="field-select"
            value={formData.alcohol}
            onChange={(e) => handleChange("alcohol", e.target.value)}
            required
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label required">Frequency of Taking Alcohol</label>
          <select
            className="field-select"
            value={formData.frequency_of_taking_alcohol}
            onChange={(e) => handleChange("frequency_of_taking_alcohol", e.target.value)}
            required
          >
            <option>Never</option>
            <option>Less than Monthly</option>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>almost daily</option>
            <option>Daily</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label required">Smoking</label>
          <select
            className="field-select"
            value={formData.smoking}
            onChange={(e) => handleChange("smoking", e.target.value)}
            required
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label required">Frequency of Smoking</label>
          <select
            className="field-select"
            value={formData.frequency_of_smoking}
            onChange={(e) => handleChange("frequency_of_smoking", e.target.value)}
            required
          >
            <option>Never</option>
            <option>Less than Monthly</option>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>almost daily</option>
            <option>Daily</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Betel nut</label>
          <select
            className="field-select"
            value={formData.beteinut}
            onChange={(e) => handleChange("beteinut", e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label">Frequency of Betel nut</label>
          <select
            className="field-select"
            value={formData.frequency_of_beteinut}
            onChange={(e) => handleChange("frequency_of_beteinut", e.target.value)}
          >
            <option>Never</option>
            <option>Less than Monthly</option>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>almost daily</option>
            <option>Daily</option>
          </select>
        </div>
      </div>
    </div>
  </div>
));

export default Form4;