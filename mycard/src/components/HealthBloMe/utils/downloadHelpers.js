// downloadHelpers.js - Helper functions for downloading documents from ERPNext
// Updated with Authorization token for authenticated API calls

const API_BASE_URL = 'http://202.165.197.58:8002';
const API_TOKEN = '5312bae822ce9d8:a2f1543d757a43a';

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
  
  // First check if we can access with auth, then open
  fetch(fullUrl, {
    headers: {
      'Authorization': `token ${API_TOKEN}`
    }
  }).then(response => {
    if (response.ok) {
      window.open(fullUrl, '_blank');
    } else {
      console.error('Failed to authenticate for download');
      alert('Failed to download report. Please ensure you are logged in.');
    }
  }).catch(error => {
    console.error('Error checking download access:', error);
    // Try opening anyway
    window.open(fullUrl, '_blank');
  });
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
  
  // First check if we can access with auth, then open
  fetch(fullUrl, {
    headers: {
      'Authorization': `token ${API_TOKEN}`
    }
  }).then(response => {
    if (response.ok) {
      window.open(fullUrl, '_blank');
    } else {
      console.error('Failed to authenticate for download');
      alert('Failed to download document. Please ensure you are logged in.');
    }
  }).catch(error => {
    console.error('Error checking download access:', error);
    // Try opening anyway
    window.open(fullUrl, '_blank');
  });
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
  
  // First check if we can access with auth, then open
  fetch(fullUrl, {
    headers: {
      'Authorization': `token ${API_TOKEN}`
    }
  }).then(response => {
    if (response.ok) {
      window.open(fullUrl, '_blank');
    } else {
      console.error('Failed to authenticate for download');
      alert('Failed to download encounter document. Please ensure you are logged in.');
    }
  }).catch(error => {
    console.error('Error checking download access:', error);
    // Try opening anyway
    window.open(fullUrl, '_blank');
  });
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
  
  // First check if we can access with auth, then open
  fetch(fullUrl, {
    headers: {
      'Authorization': `token ${API_TOKEN}`
    }
  }).then(response => {
    if (response.ok) {
      window.open(fullUrl, '_blank');
    } else {
      console.error('Failed to authenticate for download');
      alert('Failed to download document. Please ensure you are logged in.');
    }
  }).catch(error => {
    console.error('Error checking download access:', error);
    // Try opening anyway
    window.open(fullUrl, '_blank');
  });
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
  
  window.open(deskUrl, '_blank');
};

/**
 * Alternative download method using fetch to get the actual PDF blob
 * This method downloads the file directly instead of opening in a new tab
 */
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
      headers: {
        'Authorization': `token ${API_TOKEN}`
      },
      credentials: 'include' // Include cookies if needed
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

/**
 * Download with authentication and better error handling
 * @param {string} doctype - The DocType name
 * @param {string} docname - The document name/ID  
 * @param {boolean} directDownload - If true, downloads file directly. If false, opens in new tab
 */
export const downloadWithAuth = async (doctype, docname, directDownload = false) => {
  if (!doctype || !docname) {
    console.error('DocType and DocName are required');
    return;
  }

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

  if (directDownload) {
    // Direct download using fetch
    await downloadWithFetch(doctype, docname);
  } else {
    // Open in new tab with auth check
    try {
      const response = await fetch(fullUrl, {
        method: 'HEAD', // Just check if we can access
        headers: {
          'Authorization': `token ${API_TOKEN}`
        }
      });
      
      if (response.ok) {
        // Create a form with auth header to open in new tab
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = fullUrl;
        form.target = '_blank';
        
        // Add authorization as a hidden field (if the server accepts it)
        const authInput = document.createElement('input');
        authInput.type = 'hidden';
        authInput.name = 'Authorization';
        authInput.value = `token ${API_TOKEN}`;
        form.appendChild(authInput);
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Error with authenticated download:', error);
      // Fallback: try direct download
      await downloadWithFetch(doctype, docname);
    }
  }
};

export default {
  handleDownloadLabReport,
  handleDownloadPrescription,
  handleDownloadEncounter,
  handleDownloadDocument,
  handleViewInDesk,
  downloadWithFetch,
  downloadWithAuth
};