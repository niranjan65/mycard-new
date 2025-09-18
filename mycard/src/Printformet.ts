export function GetPrintHtml(formData, spouseData, childrenData, spouseBankData, currentDate, userImage) {
    // Build dynamic tables for spouse, children, spouse banks
    const spouseTableHtml = spouseData && spouseData.length > 0
        ? `<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>CRM No</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          ${spouseData.map(spouse => `
            <tr>
              <td>${spouse.name1 || ''}</td>
              <td>${spouse.crm_no || ''}</td>
              <td>${spouse.age || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`
        : '<div class="field-value empty">No spouse details provided.</div>';

    const childrenTableHtml = childrenData && childrenData.length > 0
        ? `<table>
        <thead>
          <tr>
            <th>Children Name</th>
            <th>Parent Name</th>
            <th>CRM No</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          ${childrenData.map(child => `
            <tr>
              <td>${child.children_name || ''}</td>
              <td>${child.spouse_name || ''}</td>
              <td>${child.crm_no || ''}</td>
              <td>${child.age || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`
        : '<div class="field-value empty">No children details provided.</div>';

    const spouseBankTableHtml = spouseBankData && spouseBankData.length > 0
        ? `<table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Bank Name</th>
            <th>Branch Name</th>
          </tr>
        </thead>
        <tbody>
          ${spouseBankData.map(bank => `
            <tr>
              <td>${bank.bank_account || ''}</td>
              <td>${bank.account_number || ''}</td>
              <td>${bank.bank_name || ''}</td>
              <td>${bank.branch_name || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`
        : '<div class="field-value empty">No spouse bank details provided.</div>';

    // Generate random 4-digit number for card
    const randomFourDigit = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // Helper function to check parent alive status
    const showMotherContact = formData.mother_alive === 'Yes';
    const showFatherContact = formData.father_alive === 'Yes';

    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Card Blo Me Registration - ${formData.first_name || ''} ${formData.last_name || ''}</title>
  <style>
    @media print {
      @page {
        margin: 0.5in;
        size: A4;
      }
      body {
        font-family: 'Arial', sans-serif;
        font-size: 12px;
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
      word-break: break-word;
    }

    .field-value.empty {
      color: #9ca3af;
      font-style: italic;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
      word-break: break-word;
    }

    th {
      background-color: #f5f5f5;
      text-align: left;
    }

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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
      width: 80%;
      text-align: center;
      font-style: italic;
      font-size: 10px;
      line-height: 1.4;
    }

    .signature-section {
      background-color: transparent;
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
        <div class="field-value">${formData.first_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Middle Name</div>
        <div class="field-value">${formData.middle_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Last Name</div>
        <div class="field-value">${formData.last_name || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Title</div>
        <div class="field-value">${formData.title || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Gender</div>
        <div class="field-value">${formData.gender || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Date of Birth</div>
        <div class="field-value">${formData.date_of_birth || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Blood Group</div>
        <div class="field-value">${formData.blood_group || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Resident Status</div>
        <div class="field-value">${formData.resident_status || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Current Address -->
  <div class="section">
    <div class="section-title">🏠 Current Address</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Number</div>
        <div class="field-value">${formData.portion_nolot_no || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Village</div>
        <div class="field-value">${formData.village || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Town</div>
        <div class="field-value">${formData.town || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">District</div>
        <div class="field-value">${formData.district || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Province</div>
        <div class="field-value">${formData.province || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Country</div>
        <div class="field-value">${formData.country || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">PO Box</div>
        <div class="field-value">${formData.po_box || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Postal Code</div>
        <div class="field-value">${formData.postal_code || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Location</div>
        <div class="field-value">${formData.location || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Physical Address -->
  <div class="section">
    <div class="section-title">🏠 Physical Address</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Number</div>
        <div class="field-value">${formData.portion_lot_no || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Street/Village</div>
        <div class="field-value">${formData.village_street || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Town</div>
        <div class="field-value">${formData.town1 || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">District</div>
        <div class="field-value">${formData.district1 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Province</div>
        <div class="field-value">${formData.province1 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Country</div>
        <div class="field-value">${formData.country1 || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">PO Box</div>
        <div class="field-value">${formData.po_box1 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Postal Code</div>
        <div class="field-value">${formData.postal_code1 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Location</div>
        <div class="field-value">${formData.location1 || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Contact Details -->
  <div class="section">
    <div class="section-title">📞 Contact Details</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Personal Phone</div>
        <div class="field-value">${formData.personal_country_code || ''} ${formData.phone_no || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Office Phone</div>
        <div class="field-value">${formData.office_country_code || ''} ${formData.mobile_no || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Personal Email</div>
        <div class="field-value">${formData.personal_email_address || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Office Email</div>
        <div class="field-value">${formData.office_email || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Origin Information -->
  <div class="section">
    <div class="section-title">👨‍👩‍👧‍👦 Origin</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Place of Birth</div>
        <div class="field-value">${formData.place_of_birth || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Hospital Name</div>
        <div class="field-value">${formData.hospital_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Village</div>
        <div class="field-value">${formData.village1 || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">District</div>
        <div class="field-value">${formData.district2 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Province</div>
        <div class="field-value">${formData.province2 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Country</div>
        <div class="field-value">${formData.country2 || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Parents Details -->
  <div class="section">
    <div class="section-title">👨‍👩‍👧‍👦 Parents Details</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Mother's First Name</div>
        <div class="field-value">${formData.mothers_full_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Mother's Middle Name</div>
        <div class="field-value">${formData.mother_middle_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Mother's Last Name</div>
        <div class="field-value">${formData.mother_last_name || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Mother's Origin Village</div>
        <div class="field-value">${formData.mother_origin_village || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">District</div>
        <div class="field-value">${formData.mother_district || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Province</div>
        <div class="field-value">${formData.mother_province || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Country</div>
        <div class="field-value">${formData.mother_country || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Mother Alive</div>
        <div class="field-value">${formData.mother_alive || 'Not provided'}</div>
      </div>
      ${showMotherContact ? `
      <div class="field">
        <div class="field-label">Mother Contact No</div>
        <div class="field-value">${formData.mothers_contact_no || 'Not provided'}</div>
      </div>
      ` : ''}
    </div>
    ${showMotherContact ? `
    <div class="field-group">
      <div class="field">
        <div class="field-label">Mother Email</div>
        <div class="field-value">${formData.mothers_email || 'Not provided'}</div>
      </div>
    </div>
    ` : `
    <div class="field-group">
      <div class="field">
        <div class="field-label">Cause of Death</div>
        <div class="field-value">${formData.cause_of_death || 'Not provided'}</div>
      </div>
    </div>
    `}

    <div class="field-group">
      <div class="field">
        <div class="field-label">Father's First Name</div>
        <div class="field-value">${formData.fathers_full_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Father's Middle Name</div>
        <div class="field-value">${formData.father_middle_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Father's Last Name</div>
        <div class="field-value">${formData.father_last_name || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Father's Origin Village</div>
        <div class="field-value">${formData.father_origin_village || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">District</div>
        <div class="field-value">${formData.father_district || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Province</div>
        <div class="field-value">${formData.father_province || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Country</div>
        <div class="field-value">${formData.father_country || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Father Alive</div>
        <div class="field-value">${formData.father_alive || 'Not provided'}</div>
      </div>
      ${showFatherContact ? `
      <div class="field">
        <div class="field-label">Father Contact No</div>
        <div class="field-value">${formData.fathers_contact_no || 'Not provided'}</div>
      </div>
      ` : ''}
    </div>
    ${showFatherContact ? `
    <div class="field-group">
      <div class="field">
        <div class="field-label">Father Email</div>
        <div class="field-value">${formData.fathers_email || 'Not provided'}</div>
      </div>
    </div>
    ` : `
    <div class="field-group">
      <div class="field">
        <div class="field-label">Cause of Death</div>
        <div class="field-value">${formData.father_cause_of_death || 'Not provided'}</div>
      </div>
    </div>
    `}
  </div>

  <!-- Marital Status -->
  <div class="section">
    <div class="section-title">💍 Marital Status</div>
    <div class="field-value">${formData.marital_status || 'Not provided'}</div>
  </div>

  <!-- Spouse Details -->
  <div class="section">
    <div class="section-title">👫 Spouse Details</div>
    ${spouseTableHtml}
  </div>

  <!-- Children Details -->
  <div class="section">
    <div class="section-title">👶 Children Details</div>
    ${childrenTableHtml}
  </div>

  <!-- Basic Health Information -->
  <div class="section">
    <div class="section-title">🏥 Basic Health Information</div>
    <div class="field-group">
      <div class="field"><div class="field-label">Date</div><div class="field-value">${formData.BH_date || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Blome No.</div><div class="field-value">${formData.blome_no || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Age</div><div class="field-value">${formData.age || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Height</div><div class="field-value">${formData.height || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Weight</div><div class="field-value">${formData.weight || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">BMI</div><div class="field-value">${formData.bmi || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Abdominal Circumference</div><div class="field-value">${formData.abdominal_circumference || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Hip Circumference</div><div class="field-value">${formData.hip_circumference || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Blood Sugar</div><div class="field-value">${formData.blood_sugar || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">BP-Systolic</div><div class="field-value">${formData.bp_systolic || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Diastolic</div><div class="field-value">${formData.diastolic || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Pulse Rate</div><div class="field-value">${formData.pulse_rate || 'Not provided'}</div></div>
    </div>
    <div class="field-group">
      <div class="field"><div class="field-label">Prevailing Medical Conditions/Diseases</div><div class="field-value">${formData.prevailing_medical_conditions || 'Not provided'}</div></div>
    </div>
    <div class="field-group">
      <div class="field"><div class="field-label">Are Surgical Operations Done in the Past</div><div class="field-value">${formData.are_surgical_operation_done_in_the_past || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Type of Operation</div><div class="field-value">${formData.type_of_operation || 'Not provided'}</div></div>
      <div class="field"><div class="field-label">Date</div><div class="field-value">${formData.operation_date || 'Not provided'}</div></div>
    </div>
    <div class="field-group">
      <div class="field"><div class="field-label">Are You Taking any Medications</div><div class="field-value">${formData.are_you_taking_medications || 'Not provided'}</div></div>
    </div>
  </div>

  <!-- Emergency Contact Person -->
  <div class="section">
    <div class="section-title">🚨 Emergency Contact Person</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">First Name</div>
        <div class="field-value">${formData.emergency_first_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Middle Name</div>
        <div class="field-value">${formData.emergency_middle_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Last Name</div>
        <div class="field-value">${formData.emergency_last_name || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Gender</div>
        <div class="field-value">${formData.emergency_gender || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Date of Birth</div>
        <div class="field-value">${formData.emergency_date_of_birth || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Blood Group</div>
        <div class="field-value">${formData.emergency_blood_group || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">${formData.emergency_personal_country_code || ''} ${formData.emergency_phone_no || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">${formData.emergency_personal_email || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Office Phone</div>
        <div class="field-value">${formData.emergency_office_country_code || ''} ${formData.emergency_phone_no1 || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Office Email</div>
        <div class="field-value">${formData.emergency_office_email || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Next of Kin -->
  <div class="section">
    <div class="section-title">👨‍👩‍👧‍👦 Next of Kin</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">First Name</div>
        <div class="field-value">${formData.kin_firstname || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Middle Name</div>
        <div class="field-value">${formData.kin_middlename || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Last Name</div>
        <div class="field-value">${formData.kin_lastname || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Gender</div>
        <div class="field-value">${formData.kin_gender || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Date of Birth</div>
        <div class="field-value">${formData.kin_date_of_birth || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Blood Group</div>
        <div class="field-value">${formData.kin_blood_group || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Phone No</div>
        <div class="field-value">${formData.kin_personal_country_code || ''} ${formData.kin_phone_no || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Office Phone</div>
        <div class="field-value">${formData.kin_office_country_code || ''} ${formData.kin_office_phone_no || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Personal Email</div>
        <div class="field-value">${formData.kin_personal_email || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Office Email</div>
        <div class="field-value">${formData.kin_office_email || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Employment Information -->
  <div class="section">
    <div class="section-title">💼 Employment Information</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Company</div>
        <div class="field-value">${formData.company || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Department</div>
        <div class="field-value">${formData.department || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Supervisor Name</div>
        <div class="field-value">${formData.supervisor_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Supervisor Position</div>
        <div class="field-value">${formData.supervisor_position || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Supervisor Contact</div>
        <div class="field-value">${formData.supervisor_contact || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Supervisor Email</div>
        <div class="field-value">${formData.supervisor_email || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">HR Manager Name</div>
        <div class="field-value">${formData.hr_manager_name || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">HR Manager Contact</div>
        <div class="field-value">${formData.hr_manager_contact || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">HR Manager Email</div>
        <div class="field-value">${formData.hr_manager_email_address || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Nature of Work</div>
        <div class="field-value">${formData.nature_of_work || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Workplace Hazards</div>
        <div class="field-value">${formData.workplace_hazards || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Work Risk Type</div>
        <div class="field-value">${formData.work_risk_type || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Lifestyle Information -->
  <div class="section">
    <div class="section-title">🚭 Lifestyle Information</div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Alcohol</div>
        <div class="field-value">${formData.alcohol || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Frequency of Taking Alcohol</div>
        <div class="field-value">${formData.frequency_of_taking_alcohol || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Smoking</div>
        <div class="field-value">${formData.smoking || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Frequency of Smoking</div>
        <div class="field-value">${formData.frequency_of_smoking || 'Not provided'}</div>
      </div>
    </div>
    <div class="field-group">
      <div class="field">
        <div class="field-label">Betel Nut</div>
        <div class="field-value">${formData.beteinut || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Frequency of Betel Nut</div>
        <div class="field-value">${formData.frequency_of_beteinut || 'Not provided'}</div>
      </div>
    </div>
  </div>

  <!-- Spouse Bank Details -->
  <div class="section">
    <div class="section-title">🏦 Spouse Bank Details</div>
    ${spouseBankTableHtml}
  </div>

  <!-- Card front panel -->
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
        <div class="detail-value">${formData.naming_series || 'CBM-'}${randomFourDigit}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">DATE OF ISSUE</div>
        <div class="detail-value">${currentDate || ''}</div>
      </div>
    </div>
    <div class="profile-section">
      <img class="profile-image" src="${userImage || ''}" alt="Profile Picture" />
      <div class="profile-details">
        <p class="profile-label">NAME</p>
        <p class="profile-value">${formData.title || ''} ${formData.first_name || ''} ${formData.last_name || ''}</p>
        <p class="profile-label">DATE OF BIRTH</p>
        <p class="profile-value">${formData.date_of_birth || ''}</p>
        <p class="profile-label">ORIGIN</p>
        <p class="profile-value">${formData.country || 'Not provided'}</p>
        <p class="profile-label">NATIONALITY</p>
        <p class="profile-value">${formData.country || 'Not provided'}</p>
      </div>
    </div>
    <div class="qr-code">
      <img src="${formData.qr_code || ''}" alt="QR Code" />
    </div>
  </div>

  <!-- Card back panel -->
  <div class="card-container">
    <div class="logo-section">
      <img style="height: 68px" src="/assets/erpnext/images/mycard-logo.png" />
    </div>
    <div class="decorative-pattern">
      <img style="transform: scaleX(-1);" src="/assets/erpnext/images/design2.png" alt="Decorative Pattern with Bird" />
    </div>
    <div class="declaration-text">
      I, the undersigned, hereby declare that all information and biometric data provided by me through this personal identification card are true, accurate, and correct to the best of my knowledge. I acknowledge that such information has been duly verified by LOT ICT Solutions Limited.
      <br /><br />
      This card remains the exclusive property of LOT ICT Solutions Limited. In the event that this card is found please notify the below given contact details through email or message.
    </div>
    <div class="signature-section">
      <div class="signature-line"></div>
      <div class="signature-label">Declared owner's Signature</div>
    </div>
    <div class="contact-info-text">
      To access or verify the details given in this Personal Identification Card please contact <a href="mailto:Info@mycardpng.com">Info@mycardpng.com</a> to release the information after obtaining approval from the declared owner of the Card.
    </div>
    <div class="contact-details">
      <div class="contact-item">📞 +675 7190 2850</div>
      <div class="contact-item">📞 +675 8223 4447</div>
      <div class="contact-item">✉️ info@mycardpng.com</div>
      <div class="contact-item">🌐 mycardpng.com</div>
    </div>
  </div>

</body>
</html>
  `
}
