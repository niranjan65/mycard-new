import React, { useEffect, useState } from 'react';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { useParams } from 'react-router-dom';
import { User, Calendar, MapPin, FileText, X } from 'lucide-react';
import BeautifulLoader from './BeautifulLoader';

const ProspectDetailsDisplay = () => {
  const [sessionId, setSessionId] = useState(null);
  const [prospect, setProspect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();


//   const raw = JSON.stringify({
//   "fullUrl": "test"
// });

//   const requestOptions = {
//   method: "GET",
//   body: raw,
//   redirect: "follow"
// };



// fetch("https://lblerp.anantdv.com/api/method/erpnext.allow_login.login", requestOptions)
//   .then((response) => response.json())
//   .then((result) => setSessionId(result?.message?.sid))
//   .catch((error) => console.error(error));



// new code ###############################################################

// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");


// const raw = JSON.stringify({
//   "fullUrl": "test"
// });

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   // body: raw,
//   redirect: "follow"
// };

// fetch("https://lblerp.anantdv.com/api/method/erpnext.allow_login.login", requestOptions)
//   .then((response) => response.json())
//   .then((result) => setSessionId(result?.message?.sid))
//   .catch((error) => console.error(error));

//   useEffect(() => {
//     const myHeaders = new Headers();

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };

// fetch(`https://lblerp.anantdv.com/api/resource/Prospect Details/${id}?sid=${sessionId}`, requestOptions)
//   .then((response) => response.json())
//   .then((result) => {
//     if (result.data) {
//       setProspect(result.data);
//     }
//   })
//   .catch((error) => console.error(error));
//   }, [sessionId])


// ###############################################################################################################



useEffect(() => {
  const fetchSessionAndProspect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get sessionId
      const sessionRes = await fetch(
        "https://lblerp.anantdv.com/api/method/erpnext.allow_login.login",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
        }
      );
      const sessionData = await sessionRes.json();
      const sid = sessionData?.message?.sid;
      setSessionId(sid);

      if (sid) {
        // Get prospect details
        const prospectRes = await fetch(
          `https://lblerp.anantdv.com/api/resource/Prospect Details/${id}?sid=${sid}`,
          {
            method: "GET",
            headers: new Headers(),
            redirect: "follow",
          }
        );
        const prospectData = await prospectRes.json();
        if (prospectData.data) {
          setProspect(prospectData.data);
        } else {
          setError(new Error("No prospect data found"));
        }
      } else {
        setError(new Error("Session ID not found"));
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchSessionAndProspect();
}, [id]);


  if(prospect) {
    console.log(prospect);
    console.log(`https://lblerp.anantdv.com${prospect.profile_image}`)
  }
  
  
  // Fetch prospect data using frappe-react-sdk
  // const { data: prospect, error, isLoading } = useFrappeGetDoc('Prospect Details', id);

  if (isLoading) {
    return (
      // <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      //   <div className="text-center">
      //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      //     <p className="mt-4 text-gray-600">Loading prospect details...</p>
      //   </div>
      // </div>
      <BeautifulLoader />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-600">Error loading prospect details</p>
          <p className="text-gray-500 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!prospect) {
    return (
      // <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      //   <div className="text-center">
      //     <p className="text-gray-600">No prospect found with ID: {id}</p>
      //   </div>
      // </div>
      <BeautifulLoader />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center">Prospect Profile</h1>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {prospect.profile_image ? (
                  <img 
                    src={`https://lblerp.anantdv.com${prospect.profile_image}?sid=${sessionId}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">{prospect?.title} {prospect?.first_name} {prospect?.last_name}</h3>
              {/* <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md border border-blue-200 hover:bg-blue-100 transition-colors">
                  <User className="w-4 h-4 inline mr-2" />
                  Select Image
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                  Upload
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Basic Details Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Basic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.title || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.gender || 'Not specified'}
              </div>
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.first_name || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Nationality</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.nationality || 'Not specified'}
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Middle Name</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.middle_name || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Resident Status</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.resident_status || 'Not specified'}
              </div>
            </div>

            {/* Row 4 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.last_name || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Marital Status</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.marital_status || 'Not specified'}
              </div>
            </div>

            {/* Row 5 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                {prospect.date_of_birth ? 
                  new Date(prospect.date_of_birth).toLocaleDateString() : 
                  'Not provided'
                }
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Origin</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.origin || 'Not specified'}
              </div>
            </div>
          </div>
        </div>

         {/* Permanent Address */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Permanent Address
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Portion No/Lot No</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.portion_nolot_no || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Province</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.province || 'Not provided'}
              </div>
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Village/Street</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.villagestreet || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.country || 'Not provided'}
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Town</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.town || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">PO Box</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.po_box || 'Not provided'}
              </div>
            </div>

            {/* Row 4 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">District</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.district || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Postal Code</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.postal_code || 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        {/* Current Location / Correspondence Address */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Current Location / Correspondence Address
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Portion No/Lot No</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.portion_lot_no || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Province</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.province1 || 'Not provided'}
              </div>
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Village/Street</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.village_street || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.country1 || 'Not provided'}
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Town</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.town1 || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">PO Box</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.po_box1 || 'Not provided'}
              </div>
            </div>

            {/* Row 4 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">District</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.district1 || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Postal Code</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.postal_code1 || 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Number Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Contact Number</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Office No</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.office_no || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Mobile No</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.mobile_no || 'Not specified'}
              </div>
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Home</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.home || 'Not provided'}
              </div>
            </div>
           

          </div>
        </div>

         {/* Email Id Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Email Id</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Office Email</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.office_email || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Personal Email</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.personal_email || 'Not specified'}
              </div>
            </div>

          </div>
        </div>

        {/* Preferred Secured Communication Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Preferred Secured Communication</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phone No</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.phone_no || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email Id</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {prospect.email_id || 'Not specified'}
              </div>
            </div>

          </div>
        </div>

        {/* Identification Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Identification Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">No.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Identification Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Attached</th>
                </tr>
              </thead>
              <tbody>
                {prospect.dd && prospect.dd.length > 0 ? (
                  prospect.dd.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.identification_type || 'Not specified'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.number || 'Not provided'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.attached ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      No identification records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Biometric Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Biometric Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">No.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Identification Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {prospect.identification_type && prospect.identification_type.length > 0 ? (
                  prospect.identification_type.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.identification_type || 'Not specified'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.status == 1 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      No identification records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProspectDetailsDisplay;