import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, FileText, DollarSign, TestTube } from 'lucide-react';

const LabTestPortal = () => {
  const [labTests, setLabTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    doctorName: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  

  useEffect(() => {
    // const labTestData = [
    //   { name: "113357", lab_test_name: "Troponin I", lab_test_code: "113357", department: "Serology", disabled: 0, lab_test_template_type: "Single", lab_test_rate: 150.0, lab_test_description: "Troponin" },
    //   { name: "113338", lab_test_name: "Creatinine", lab_test_code: "113338", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0 },
    //   { name: "113049", lab_test_name: "UREA", lab_test_code: "113049", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0, lab_test_description: "UREA", lab_test_uom: "mmol/L", lab_test_normal_range: "2.2 - 2.55 mmol/L" },
    //   { name: "113324", lab_test_name: "Chloride", lab_test_code: "113324", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0 },
    //   { name: "113323", lab_test_name: "Potassium", lab_test_code: "113323", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0, lab_test_description: "Potassium" },
    //   { name: "113322", lab_test_name: "Sodium", lab_test_code: "113322", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0 },
    //   { name: "113575", lab_test_name: "T4", lab_test_code: "113575", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 150.0, lab_test_description: "T4 Test" },
    //   { name: "113574", lab_test_name: "T3", lab_test_code: "113574", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 150.0, lab_test_description: "T3 Test" },
    //   { name: "113290", lab_test_name: "Vitamin D", lab_test_code: "113290", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 330.0 },
    //   { name: "113362", lab_test_name: "TSH", lab_test_code: "113362", department: "Serology", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 150.0, lab_test_description: "TSH" },
    //   { name: "113276", lab_test_name: "C Reactive Protein (CRP)", lab_test_code: "113276", department: "Biochemistry", disabled: 0, lab_test_template_type: "Single", lab_test_rate: 40.0, lab_test_normal_range: "0 - 6 mg/dl" },
    //   { name: "113270", lab_test_name: "Inorganic Phosphorus", lab_test_code: "113270", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0 },
    //   { name: "113272", lab_test_name: "Magnesium", lab_test_code: "113272", department: "Biochemistry", disabled: 0, lab_test_template_type: "Compound", lab_test_rate: 40.0 }
    // ];

    async function getLabTestData() {
      try {
        const myHeaders = new Headers();
myHeaders.append("Authorization", "token 73fb1eefb9d16d3:5b665ea071ecae4");
myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

   const response = await fetch("https://lblerp.anantdv.com/api/resource/Lab Test Template?fields=[\"*\"]", requestOptions);
   const result = await response.json();

   setLabTests(result?.data);
    setFilteredTests(result?.data);

   
   
 
      } catch (error) {
        console.log("Error in fetching Lab Test Template")
      }
    }

    // setLabTests(labTestData);
    // setFilteredTests(labTestData);

    getLabTestData()
  }, []);

  useEffect(() => {
    const filtered = labTests.filter(test =>
      test.lab_test_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.lab_test_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTests(filtered);
  }, [searchQuery, labTests]);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setShowRequestForm(false);
  };

  const handleBackToList = () => {
    setSelectedTest(null);
    setShowRequestForm(false);
  };

  const handleRequestTest = () => {
    setShowRequestForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = () => {
    if (!formData.patientName || !formData.age || !formData.gender || !formData.contactNumber || !formData.address || !formData.preferredDate || !formData.preferredTime) {
      alert('Please fill all required fields');
      return;
    }
    alert(`Lab test request submitted successfully!\n\nTest: ${selectedTest.lab_test_name}\nPatient: ${formData.patientName}\nDate: ${formData.preferredDate}\nTime: ${formData.preferredTime}`);
    setFormData({
      patientName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      address: '',
      doctorName: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
    setShowRequestForm(false);
  };

  if (!selectedTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Lab Test Portal</h1>
            <p className="text-gray-600">Browse and request laboratory tests</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by test name, code, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.name}
                onClick={() => handleTestSelect(test)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <TestTube className="text-blue-600" size={24} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {test.lab_test_template_type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{test.lab_test_name}</h3>
                <p className="text-sm text-gray-600 mb-3">Code: {test.lab_test_code}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{test.department}</span>
                  <span className="text-lg font-bold text-green-600">PGK{test.lab_test_rate}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No lab tests found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showRequestForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={() => setShowRequestForm(false)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Details
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">Request Lab Test</h2>
            <p className="text-gray-600 mb-6">Requesting: <span className="font-semibold">{selectedTest.lab_test_name}</span></p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleFormSubmit}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={handleBackToList}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Tests
          </button>

          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedTest.lab_test_name}</h2>
                <p className="text-gray-600">Test Code: {selectedTest.lab_test_code}</p>
              </div>
              <span className="text-xs font-semibold px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
                {selectedTest.lab_test_template_type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                {/* <DollarSign className="text-blue-600 mr-2" size={20} /> */}
                PGK
                <h3 className="font-semibold text-gray-700">Test Rate</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">PGK{selectedTest.lab_test_rate}</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <FileText className="text-green-600 mr-2" size={20} />
                <h3 className="font-semibold text-gray-700">Department</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{selectedTest.department}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {selectedTest.lab_test_description && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{selectedTest.lab_test_description.replace(/<[^>]*>/g, '')}</p>
              </div>
            )}

            {selectedTest.lab_test_uom && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-700 mb-2">Unit of Measurement</h3>
                <p className="text-gray-600">{selectedTest.lab_test_uom}</p>
              </div>
            )}

            {selectedTest.lab_test_normal_range && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-700 mb-2">Normal Range</h3>
                <p className="text-gray-600">{selectedTest.lab_test_normal_range}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleRequestTest}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Request Lab Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabTestPortal;