// downloadHelpers.js - Helper functions for downloading documents from ERPNext

const API_BASE_URL = 'http://202.165.197.58:8002'; // Your ERPNext server URL

/**
 * Download Lab Test Report
 * @param {string} labTestId - The Lab Test document ID
 */
export const handleDownloadLabReport = (labTestId) => {
  if (!labTestId) {
    console.error('No Lab Test ID provided');
    return;
  }

  console.log('Downloading lab report:', labTestId);
  
  // Construct the URL properly
  const baseUrl = API_BASE_URL + '/api/method/frappe.utils.print_format.download_pdf';
  const params = new URLSearchParams({
    doctype: 'Lab Test',
    name: labTestId,
    format: 'Standard',
    no_letterhead: 0,
    letterhead: 'Standard',
    settings: '{}'
  });
  
  const fullUrl = baseUrl + '?' + params.toString();
  console.log('Opening URL:', fullUrl);
  
  // Open the URL in a new tab
  const newWindow = window.open(fullUrl, '_blank');
  
  if (!newWindow) {
    alert('Please allow popups for this site to download the report.');
  }
};

/**
 * Download Patient Appointment Prescription/Invoice
 * @param {string} appointmentId - The Patient Appointment document ID
 * @param {string} invoiceId - The Sales Invoice ID if available
 */
export const handleDownloadPrescription = (appointmentId, invoiceId) => {
  console.log('Downloading prescription for appointment:', appointmentId);
  console.log('Invoice ID:', invoiceId);

  let doctype = 'Patient Appointment';
  let docname = appointmentId;

  // If invoice ID is available, download the invoice instead
  if (invoiceId && invoiceId !== null && invoiceId !== undefined) {
    doctype = 'Sales Invoice';
    docname = invoiceId;
    console.log('Downloading invoice instead:', invoiceId);
  }

  if (!docname) {
    console.error('No document ID provided');
    return;
  }

  // Construct the URL properly
  const baseUrl = API_BASE_URL + '/api/method/frappe.utils.print_format.download_pdf';
  const params = new URLSearchParams({
    doctype: doctype,
    name: docname,
    format: 'Standard',
    no_letterhead: 0,
    letterhead: 'Standard',
    settings: '{}'
  });
  
  const fullUrl = baseUrl + '?' + params.toString();
  console.log('Opening URL:', fullUrl);
  
  // Open the URL in a new tab
  const newWindow = window.open(fullUrl, '_blank');
  
  if (!newWindow) {
    alert('Please allow popups for this site to download the document.');
  }
};

/**
 * Download Patient Encounter Document
 * @param {string} encounterId - The Patient Encounter document ID
 */
export const handleDownloadEncounter = (encounterId) => {
  if (!encounterId) {
    console.error('No Encounter ID provided');
    return;
  }

  console.log('Downloading patient encounter:', encounterId);
  
  // Construct the URL properly
  const baseUrl = API_BASE_URL + '/api/method/frappe.utils.print_format.download_pdf';
  const params = new URLSearchParams({
    doctype: 'Patient Encounter',
    name: encounterId,
    format: 'Standard',
    no_letterhead: 0,
    letterhead: 'Standard',
    settings: '{}'
  });
  
  const fullUrl = baseUrl + '?' + params.toString();
  console.log('Opening URL:', fullUrl);
  
  // Open the URL in a new tab
  const newWindow = window.open(fullUrl, '_blank');
  
  if (!newWindow) {
    alert('Please allow popups for this site to download the encounter document.');
  }
};

/**
 * Download any ERPNext document as PDF
 * @param {string} doctype - The DocType name
 * @param {string} docname - The document name/ID
 * @param {string} format - Print format to use (default: 'Standard')
 */
export const handleDownloadDocument = (doctype, docname, format = 'Standard') => {
  if (!doctype || !docname) {
    console.error('DocType and DocName are required');
    return;
  }

  console.log('Downloading document:', doctype, docname);
  
  // Construct the URL properly
  const baseUrl = API_BASE_URL + '/api/method/frappe.utils.print_format.download_pdf';
  const params = new URLSearchParams({
    doctype: doctype,
    name: docname,
    format: format,
    no_letterhead: 0,
    letterhead: 'Standard',
    settings: '{}'
  });
  
  const fullUrl = baseUrl + '?' + params.toString();
  console.log('Opening URL:', fullUrl);
  
  // Open the URL in a new tab
  const newWindow = window.open(fullUrl, '_blank');
  
  if (!newWindow) {
    alert('Please allow popups for this site to download the document.');
  }
};

/**
 * View document in ERPNext Desk
 * @param {string} doctype - The DocType name
 * @param {string} docname - The document name/ID
 */
export const handleViewInDesk = (doctype, docname) => {
  if (!doctype || !docname) {
    console.error('DocType and DocName are required');
    return;
  }

  const deskUrl = API_BASE_URL + '/app/' + doctype.toLowerCase().replace(/ /g, '-') + '/' + docname;
  console.log('Opening desk URL:', deskUrl);
  
  const newWindow = window.open(deskUrl, '_blank');
  
  if (!newWindow) {
    alert('Please allow popups for this site to view the document.');
  }
};

// Alternative download method using fetch if window.open is blocked
export const downloadWithFetch = async (doctype, docname) => {
  try {
    const baseUrl = API_BASE_URL + '/api/method/frappe.utils.print_format.download_pdf';
    const params = new URLSearchParams({
      doctype: doctype,
      name: docname,
      format: 'Standard',
      no_letterhead: 0,
      letterhead: 'Standard',
      settings: '{}'
    });
    
    const fullUrl = baseUrl + '?' + params.toString();
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docname}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error('Failed to download:', response.statusText);
      alert('Failed to download the document. Please ensure you are logged in to ERPNext.');
    }
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download. Please check your connection and login status.');
  }
};

export default {
  handleDownloadLabReport,
  handleDownloadPrescription,
  handleDownloadEncounter,
  handleDownloadDocument,
  handleViewInDesk,
  downloadWithFetch
};
