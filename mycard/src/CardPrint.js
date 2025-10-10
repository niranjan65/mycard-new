// export function GetCardPrintHTML(formData, spouseData, childrenData, spouseBankData, currentDate, userImage, card_blo_me_number) {
   

//     return `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8" />
//   <title>Card - ${formData.first_name || ''} ${formData.last_name || ''}</title>
//   <style>
//     @media print {
//       @page {
//         margin: 0.5in;
//         size: A4;
//       }
//       body {
//         font-family: 'Arial', sans-serif;
//         font-size: 12px;
//         color: #000;
//         margin: 0;
//         padding: 0;
//       }
//       .no-print {
//         display: none !important;
//       }
//     }

//     body {
//       font-family: 'Arial', sans-serif;
//       font-size: 12px;
//       line-height: 1.4;
//       color: #000;
//       margin: 0;
//       padding: 20px;
//       background: white;
//     }

//     .card-container {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       width: 532px;
//       height: 337px;
//       padding: 26px;
//       position: relative;
//       border: 1px solid #ccc;
//       border-radius: 10px;
//       background-image: url('/assets/erpnext/images/cardbg1.png');
//       background-size: 532px 337px;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       overflow: hidden;
//       margin: 40px auto 0 auto;
//       box-sizing: border-box;
//       display: flex;
//       flex-direction: column;
//       justify-content: flex-start;
//     }

//     .card-decoration {
//       position: absolute;
//       top: 0;
//       right: 0;
//       width: 200px;
//       height: 200px;
//       opacity: 0.7;
//       transform: rotate(180deg);
//       z-index: 2;
//       overflow: hidden;
//       box-sizing: border-box;
//     }

//     .card-decoration img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       display: block;
//     }

//     .logo-section {
//       position: absolute;
//       top: 26px;
//       left: 26px;
//       display: flex;
//       align-items: center;
//       z-index: 2;
//     }

//     .card-details {
//       position: absolute;
//       top: 36px;
//       left: 140px;
//       right: 26px;
//       z-index: 2;
//       width: 350px;
//     }

//     .detail-row {
//       display: flex;
//       margin-bottom: 4px;
//     }

//     .detail-label {
//       width: 128px;
//       font-weight: bold;
//       font-size: 13px;
//       text-align: left;
//     }

//     .detail-value {
//       font-size: 13px;
//       text-align: left;
//       flex: 1;
//       word-break: break-word;
//     }

//     .profile-section {
//       position: absolute;
//       top: 120px;
//       left: 26px;
//       display: flex;
//       gap: 20px;
//       z-index: 2;
//       right: 150px;
//     }

//     .profile-image {
//       width: 124px;
//       height: 150px;
//       border-radius: 10px;
//       object-fit: cover;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//     }

//     .profile-details {
//       width: 160px;
//       overflow: hidden;
//       word-break: break-word;
//     }

//     .profile-label {
//       font-weight: bold;
//       font-size: 12px;
//       margin-bottom: 1px;
//     }

//     .profile-value {
//       margin-top: 0;
//       margin-bottom: 8px;
//       font-size: 12px;
//       word-break: break-word;
//     }

//     .qr-code {
//       position: absolute;
//       bottom: 26px;
//       right: 26px;
//       width: 100px;
//       height: 100px;
//       z-index: 2;
//       background: #fff;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       overflow: hidden;
//     }

//     .qr-code img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       display: block;
//     }

//     .decorative-pattern img {
//       position: absolute;
//       top: 0;
//       right: 0;
//       height: 100%;
//       width: 430px;
//     }

//     .declaration-text {
//       position: absolute;
//       top: 154px;
//       left: 50%;
//       transform: translateX(-50%);
//       width: 80%;
//       text-align: center;
//       font-style: italic;
//       font-size: 10px;
//       line-height: 1.4;
//     }

//     .signature-section {
//       background-color: transparent;
//       position: absolute;
//       top: 316px;
//       left: 0;
//       right: 0;
//       text-align: center;
//     }

//     .signature-line {
//       width: 300px;
//       border-top: 1px dotted #000;
//       height: 1px;
//       margin: 0 auto 5px auto;
//     }

//     .signature-label {
//       font-weight: bold;
//       font-size: 14px;
//     }

//     .contact-info-text {
//       width: 401px;
//       position: absolute;
//       top: 345px;
//       left: 95px;
//       right: 50px;
//       text-align: center;
//       font-size: 10px;
//       line-height: 1.4;
//     }

//     .contact-details {
//       position: absolute;
//       bottom: 20px;
//       left: 0;
//       right: 0;
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       font-size: 9px;
//     }

//     .contact-item {
//       display: flex;
//       align-items: center;
//       gap: 5px;
//     }

//     .contact-icon {
//       width: 16px;
//       height: 16px;
//     }
//   </style>
// </head>

// <body>
//   <!-- Card front panel -->
//   <div class="card-container">
//     <div class="card-decoration">
//       <img src="/assets/erpnext/images/design1.png" alt="Decorative Pattern" />
//     </div>
//     <div class="logo-section">
//       <img style="height: 68px" src="/assets/erpnext/images/mycard-logo.png" />
//     </div>
//     <div class="card-details">
//       <div class="detail-row">
//         <div class="detail-label">CARD NUMBER</div>
//         <div class="detail-value">${card_blo_me_number}</div>
//       </div>
//       <div class="detail-row">
//         <div class="detail-label">DATE OF ISSUE</div>
//         <div class="detail-value">${currentDate || ''}</div>
//       </div>
//     </div>
//     <div class="profile-section">
//       <img class="profile-image" src="${userImage || ''}" alt="Profile Picture" />
//       <div class="profile-details">
//         <p class="profile-label">NAME</p>
//         <p class="profile-value">${formData.title || ''} ${formData.first_name || ''} ${formData.last_name || ''}</p>
//         <p class="profile-label">DATE OF BIRTH</p>
//         <p class="profile-value">${formData.date_of_birth || ''}</p>
//         <p class="profile-label">ORIGIN</p>
//         <p class="profile-value">${formData.country || 'Not provided'}</p>
//         <p class="profile-label">NATIONALITY</p>
//         <p class="profile-value">${formData.country || 'Not provided'}</p>
//       </div>
//     </div>
//     <div class="qr-code">
//       <img src="${formData.qr_code || ''}" alt="QR Code" />
//     </div>
//   </div>

//   <!-- Card back panel -->
//   <div class="card-container">
//     <div class="logo-section">
//       <img style="height: 68px" src="/assets/erpnext/images/mycard-logo.png" />
//     </div>
//     <div class="decorative-pattern">
//       <img style="transform: scaleX(-1);" src="/assets/erpnext/images/design2.png" alt="Decorative Pattern with Bird" />
//     </div>
//     <div class="declaration-text">
//       I, the undersigned, hereby declare that all information and biometric data provided by me through this personal identification card are true, accurate, and correct to the best of my knowledge. I acknowledge that such information has been duly verified by LOT ICT Solutions Limited.
//       <br /><br />
//       This card remains the exclusive property of LOT ICT Solutions Limited. In the event that this card is found please notify the below given contact details through email or message.
//     </div>
//     <div class="signature-section">
//       <div class="signature-line"></div>
//       <div class="signature-label">Declared owner's Signature</div>
//     </div>
//     <div class="contact-info-text">
//       To access or verify the details given in this Personal Identification Card please contact <a href="mailto:Info@mycardpng.com">Info@mycardpng.com</a> to release the information after obtaining approval from the declared owner of the Card.
//     </div>
//     <div class="contact-details">
//       <div class="contact-item">📞 +675 7190 2850</div>
//       <div class="contact-item">📞 +675 8223 4447</div>
//       <div class="contact-item">✉️ info@mycardpng.com</div>
//       <div class="contact-item">🌐 mycardpng.com</div>
//     </div>
//   </div>

// </body>
// </html>
//   `
// }








export function GetCardPrintHTML(formData, spouseData, childrenData, spouseBankData, currentDate, userImage, card_blo_me_number) {
   

    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Card - ${formData.first_name || ''} ${formData.last_name || ''}</title>
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

    .cards-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      min-height: 100vh;
      flex-wrap: wrap;
    }

    .card-container {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      width: 338px;
      height: 213px;
      padding: 10px;
      position: relative;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-image: url('/assets/erpnext/images/cardbg1.png');
      background-size: 338px 213px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .card-decoration {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 120px;
      height: 120px;
      opacity: 0.3;
      transform: rotate(180deg);
      z-index: 1;
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
      top: 15px;
      left: 15px;
      display: flex;
      align-items: center;
      z-index: 2;
    }

    .card-details {
      position: absolute;
      top: 15px;
      left: 120px;
      z-index: 2;
      width: 180px;
    }

    .detail-row {
      display: flex;
      gap: 5px;
      margin-bottom: 2px;
      align-items: baseline;
    }

    .detail-label {
      font-weight: bold;
      font-size: 8px;
      color: #000;
      text-transform: uppercase;
    }

    .detail-value {
      font-size: 8px;
      font-weight: 600;
      color: #000;
    }

    .profile-section {
      position: absolute;
      top: 60px;
      left: 15px;
      right: 80px;
      display: flex;
      gap: 15px;
      z-index: 2;
      align-items: flex-start;
    }

    .profile-image {
      width: 80px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      border: 2px solid #fff;
      flex-shrink: 0;
    }

    .profile-details {
      flex: 1;
      padding-top: 3px;
    }

    .profile-item {
      margin-bottom: 8px;
    }

    .profile-label {
      font-weight: bold;
      font-size: 8px;
      margin-bottom: 2px;
      color: #000;
      text-transform: uppercase;
      line-height: 1;
    }

    .profile-value {
      margin: 0;
      font-size: 9px;
      color: #000;
      font-weight: 500;
      line-height: 1.2;
    }

    .qr-code {
      position: absolute;
      bottom: 25px;
      right: 25px;
      width: 65px;
      height: 65px;
      z-index: 2;
      background: #fff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      width: 200px;
    }

    .declaration-text {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      width: 85%;
      text-align: center;
      font-style: italic;
      font-size: 6px;
      line-height: 1.2;
    }

    .signature-section {
      background-color: transparent;
      position: absolute;
      top: 160px;
      left: 0;
      right: 0;
      text-align: center;
    }

    .signature-line {
      width: 150px;
      border-top: 1px dotted #000;
      height: 1px;
      margin: 0 auto 3px auto;
    }

    .signature-label {
      font-weight: bold;
      font-size: 7px;
    }

    .contact-info-text {
      width: 280px;
      position: absolute;
      top: 180px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 5px;
      line-height: 1.2;
    }

    .contact-details {
      position: absolute;
      bottom: 8px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      font-size: 5px;
      flex-wrap: wrap;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .contact-icon {
      width: 8px;
      height: 8px;
    }

    /* Responsive design for smaller screens */
    @media (max-width: 1200px) {
      .cards-wrapper {
        flex-direction: column;
        gap: 20px;
      }
    }
  </style>
</head>

<body>
  <div class="cards-wrapper">
    <!-- Card front panel -->
    <div class="card-container">
      <div class="card-decoration">
        <img src="/assets/erpnext/images/design1.png" alt="Decorative Pattern" />
      </div>
      <div class="logo-section">
        <img style="height: 30px" src="/assets/erpnext/images/mycard-logo.png" />
      </div>
      <div class="card-details">
        <div class="detail-row">
          <div class="detail-label">CARD NUMBER: </div>
          <div class="detail-value">${card_blo_me_number}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">DATE OF ISSUE: </div>
          <div class="detail-value">${currentDate || ''}</div>
        </div>
      </div>
      <div class="profile-section">
        <img class="profile-image" src="${userImage || ''}" alt="Profile Picture" />
        <div class="profile-details">
          <div class="profile-item">
            <p class="profile-label">NAME</p>
            <p class="profile-value">${formData.title || ''} ${formData.first_name || ''} ${formData.last_name || ''}</p>
          </div>
          <div class="profile-item">
            <p class="profile-label">DATE OF BIRTH</p>
            <p class="profile-value">${formData.date_of_birth || ''}</p>
          </div>
          <div class="profile-item">
            <p class="profile-label">ORIGIN</p>
            <p class="profile-value">${formData.country || 'Not provided'}</p>
          </div>
          <div class="profile-item">
            <p class="profile-label">NATIONALITY</p>
            <p class="profile-value">${formData.country || 'Not provided'}</p>
          </div>
        </div>
      </div>
      <div class="qr-code">
        <img src="${formData.qr_code || ''}" alt="QR Code" />
      </div>
    </div>

    <!-- Card back panel -->
    <div class="card-container">
      <div class="logo-section">
        <img style="height: 25px" src="/assets/erpnext/images/mycard-logo.png" />
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
  </div>

</body>
</html>
  `
}