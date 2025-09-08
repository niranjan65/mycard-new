// src/PrintComponent.jsx
import React, { useCallback } from 'react';

const PrintComponent = ({ formData }) => {
  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString();
    const applicationId = `${formData.naming_series}${Math
      .floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')}`;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Registration – ${formData.first_name} ${formData.last_name}</title>
          <style>
            @page { margin: 0.5in; size: A4; }
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 12px; color: #000; }
            .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { color: #2563eb; margin: 0; }
            .meta { text-align: right; font-size: 11px; color: #6b7280; margin-bottom: 20px; }
            .section { margin-bottom: 20px; page-break-inside: avoid; }
            .title { background: #f3f4f6; padding: 6px 10px; font-weight: bold; border-left: 4px solid #2563eb; margin-bottom: 8px; }
            .group { display: flex; flex-wrap: wrap; gap: 12px; }
            .field { flex: 1; min-width: 180px; }
            .label { font-weight: 600; color: #374151; font-size: 11px; text-transform: uppercase; }
            .value { padding: 4px 6px; border: 1px solid #d1d5db; background: #f9fafb; border-radius: 3px; font-size: 12px; }
            .empty { color: #9ca3af; font-style: italic; }
            .signature { display: flex; justify-content: space-between; margin-top: 30px; }
            .sig-box { width: 45%; text-align: center; }
            .sig-line { border-bottom: 1px solid #000; height: 40px; margin-bottom: 4px; }
            .footer { text-align: center; font-size: 10px; color: #6b7280; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
            @media print { .no-print { display: none !important; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Card Blo Me Registration</h1>
          </div>
          <div class="meta">
            <div><strong>App ID:</strong> ${applicationId}</div>
            <div><strong>Status:</strong> ${formData.status}</div>
            <div><strong>Date:</strong> ${currentDate}</div>
          </div>

          <div class="section">
            <div class="title">👤 Personal Information</div>
            <div class="group">
              ${[
                ["First Name", formData.first_name],
                ["Last Name", formData.last_name],
                ["Gender", formData.gender],
                ["DOB", formData.date_of_birth],
              ]
                .map(
                  ([label, val]) => `
                <div class="field">
                  <div class="label">${label}</div>
                  <div class="value${!val ? " empty" : ""}">${
                    val || "Not provided"
                  }</div>
                </div>`
                )
                .join("")}
            </div>
          </div>

          <!-- Repeat similar blocks for Address, Contact, Health, Family, Emergency, Employment, Lifestyle, Bank -->

          <div class="signature">
            <div class="sig-box">
              <div class="sig-line"></div>
              <div>Applicant Signature</div>
            </div>
            <div class="sig-box">
              <div class="sig-line"></div>
              <div>Authorized Signature</div>
            </div>
          </div>

          <div class="footer">
            Generated automatically on ${currentDate}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }, [formData]);

  return (
    <button
      type="button"
      className="btn btn-print no-print"
      onClick={handlePrint}
      style={{
        background: '#059669',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      🖨️ Print Application
    </button>
  );
};

export default PrintComponent;
