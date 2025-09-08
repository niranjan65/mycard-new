// import React, { useState, useEffect } from 'react';
// import { useFrappeAuth, useFrappeGetDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
// import { Upload, Eye, EyeOff, Trash2 } from 'lucide-react';

// const EditProfile = () => {
//   const { currentUser } = useFrappeAuth();
//   const { data: userData, loading, error, mutate } = useFrappeGetDoc('User', currentUser);
//   const { updateDoc, loading: updateLoading } = useFrappeUpdateDoc();

//   // Profile states
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [gender, setGender] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [about, setAbout] = useState('');

//   // Password states
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);

//   // Profile picture
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [profileUrl, setProfileUrl] = useState('');

//   // Delete confirmation
//   const [deleteConfirmed, setDeleteConfirmed] = useState(false);

//   // Initialize form with user data when loaded
//   useEffect(() => {
//     if (userData) {
//       setFirstName(userData.first_name || '');
//       setLastName(userData.last_name || '');
//       setDateOfBirth(userData.birth_date || '');
//       setGender(userData.gender || '');
//       setContactNumber(userData.mobile_no || '');
//       setAbout(userData.bio || '');
//       setProfileUrl(userData.user_image || '');
//     }
//   }, [userData]);

//   const handleProfileSave = async () => {
//     try {
//       await updateDoc('User', currentUser, {
//         first_name: firstName,
//         last_name: lastName,
//         birth_date: dateOfBirth,
//         gender: gender,
//         mobile_no: contactNumber,
//         bio: about
//       });

//       mutate(); // Refresh user data
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile');
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     if (!currentPassword || !newPassword) {
//       alert('Please fill both password fields');
//       return;
//     }

//     try {
//       // You would need to implement this endpoint in your Frappe backend
//       await updateDoc('User', currentUser, {
//         current_password: currentPassword,
//         new_password: newPassword
//       });

//       setCurrentPassword('');
//       setNewPassword('');
//       alert('Password updated successfully');
//     } catch (error) {
//       console.error('Error updating password:', error);
//       alert('Failed to update password');
//     }
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicture(file);
//       // In a real implementation, you would upload this file to your server
//       // and set the URL to the uploaded image
//       setProfileUrl(URL.createObjectURL(file));
//     }
//   };

//   const uploadProfilePicture = async () => {
//     if (!profilePicture) return;

//     // In a real implementation, you would upload the file to your server
//     // and then update the user's profile with the new image URL
//     alert('Profile picture would be uploaded in a real implementation');
//   };

//   const handleDeleteAccount = async () => {
//     if (!deleteConfirmed) {
//       setDeleteConfirmed(true);
//       return;
//     }

//     try {
//       // In a real implementation, you would call an API to delete the user account
//       alert('Account deletion would happen in a real implementation');
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert('Failed to delete account');
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading user data...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen">Error loading user data</div>;
//   }

//   const getInitials = () => {
//     if (firstName && lastName) {
//       return (firstName[0] + lastName[0]).toUpperCase();
//     } else if (firstName) {
//       return firstName[0].toUpperCase();
//     } else if (currentUser) {
//       return currentUser[0].toUpperCase();
//     }
//     return 'U';
//   };

//   return (
//     <div className="min-h-screen text-black p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

//       {/* Profile Picture Section */}
//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <div className="flex items-center">
//           {profileUrl ? (
//             <img 
//               src={profileUrl} 
//               alt="Profile" 
//               className="w-16 h-16 rounded-full mr-4" 
//             />
//           ) : (
//             <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
//               {getInitials()}
//             </div>
//           )}

//           <div>
//             <p className="mb-2">Change Profile Picture</p>
//             <div className="flex gap-2">
//               <label className="bg-gray-700 text-white px-4 py-1 rounded cursor-pointer">
//                 Select
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   className="hidden" 
//                   onChange={handleProfilePictureChange}
//                 />
//               </label>
//               <button 
//                 onClick={uploadProfilePicture}
//                 className="bg-yellow-500 text-black px-4 py-1 rounded flex items-center"
//               >
//                 Upload <Upload size={16} className="ml-1" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Profile Information Section */}
//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-bold mb-4">Profile Information</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1">First Name</label>
//             <input 
//               type="text" 
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full bg-gray-700 text-white rounded p-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Last Name</label>
//             <input 
//               type="text" 
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full bg-gray-700 text-white rounded p-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Date of Birth</label>
//             <input 
//               type="date" 
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               className="w-full bg-gray-700 text-white rounded p-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Gender</label>
//             <select 
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-full bg-gray-700 text-white rounded p-2 appearance-none"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//               <option value="Prefer not to say">Prefer not to say</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Contact Number</label>
//             <input 
//               type="tel" 
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//               className="w-full bg-gray-700 text-white rounded p-2"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block mb-1">About</label>
//             <textarea 
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               className="w-full bg-gray-700 text-white rounded p-2 h-24"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mt-4 gap-2">
//           <button className="bg-gray-600 text-white px-6 py-2 rounded">
//             Cancel
//           </button>
//           <button 
//             onClick={handleProfileSave}
//             disabled={updateLoading}
//             className="bg-yellow-500 text-black px-6 py-2 rounded"
//           >
//             {updateLoading ? 'Saving...' : 'Save'}
//           </button>
//         </div>
//       </div>

//       {/* Password Section */}
//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-bold mb-4">Password</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1">Current Password</label>
//             <div className="relative">
//               <input 
//                 type={showCurrentPassword ? "text" : "password"} 
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 placeholder="Enter Current Password"
//                 className="w-full bg-gray-700 text-white rounded p-2 pr-10"
//               />
//               <button 
//                 type="button"
//                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1">New Password</label>
//             <div className="relative">
//               <input 
//                 type={showNewPassword ? "text" : "password"} 
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter New Password"
//                 className="w-full bg-gray-700 text-white rounded p-2 pr-10"
//               />
//               <button 
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end mt-4 gap-2">
//           <button className="bg-gray-600 text-white px-6 py-2 rounded">
//             Cancel
//           </button>
//           <button 
//             onClick={handlePasswordUpdate}
//             className="bg-yellow-500 text-black px-6 py-2 rounded"
//           >
//             Update
//           </button>
//         </div>
//       </div>

//       {/* Delete Account Section */}
//       <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-6">
//         <div className="flex items-start">
//           <div className="bg-red-900 p-3 rounded-full mr-4">
//             <Trash2 size={24} className="text-red-500" />
//           </div>

//           <div className="flex-1">
//             <h2 className="text-xl font-bold mb-2">Delete Account</h2>
//             <p className="mb-1">Would you like to delete account?</p>
//             <p className="text-sm text-gray-400 mb-2">
//               This account may contain Paid Courses. Deleting your account is
//               permanent and will remove all the content associated with it.
//             </p>

//             {deleteConfirmed && (
//               <p className="text-red-500 cursor-pointer mb-2" onClick={handleDeleteAccount}>
//                 I want to delete my account.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;













import React, { useState, useEffect } from 'react';
import { useFrappeAuth, useFrappeFileUpload, useFrappeGetDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { Upload, Eye, EyeOff, Trash2, User, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import LinkField from '@/components/common/FormFields/LinkField';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const form = useForm();
  const { currentUser, login, logout } = useFrappeAuth();
  const { data: userData, loading, error, mutate } = useFrappeGetDoc('User', currentUser);
  const { updateDoc, loading: updateLoading } = useFrappeUpdateDoc();

  const [errorMessage, setErrorMessage] = useState('');

  // Profile states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [about, setAbout] = useState('');
  
  // Manage selected rows for each table separately
  const [selectedIdentificationRows, setSelectedIdentificationRows] = useState([]);
  const [selectedBiometricDetails, setSelectedBiometricDetails] = useState([]);
  const [selectedBankAccountDetails, setSelectedBankAccountDetails] = useState([]);
  const [selectedDetailsOfSpouse, setSelectedDetailsOfSpouse] = useState([]);
  const [selectedDetailsOfChildren, setSelectedDetailsOfChildren] = useState([]);
  const [selectedEducationRows, setSelectedEducationRows] = useState([]);
  const [selectedEmploymentRows, setSelectedEmploymentRows] = useState([]);

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileUrl, setProfileUrl] = useState('');

  // Delete confirmation
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const { upload, progress, isCompleted, reset } = useFrappeFileUpload();

  const { register, handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const {data: user_details} = useFrappeGetDoc('User', currentUser);

  console.log("User details", user_details)


  // useEffect(() => {
  //   if(!currentUser) {
  //     navigate('/login')
  //   }
  // }, [])

  // Initialize form with user data when loaded
  useEffect(() => {
    if (userData) {
      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');
      setDateOfBirth(userData.birth_date || '');
      setGender(userData.gender || '');
      setContactNumber(userData.mobile_no || '');
      setAbout(userData.bio || '');
      setProfileUrl(userData.user_image || '');
    }
  }, [userData]);

  const handleProfileSave = async () => {
    try {
      // await updateDoc('User', currentUser, {
      //   first_name: firstName,
      //   last_name: lastName,
      //   birth_date: dateOfBirth,
      //   gender: gender,
      //   mobile_no: contactNumber,
      //   bio: about,
      //   user_image: profilePicture
      // });

     

      mutate(); // Refresh user data
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword) {
      toast.warning('Please fill both password fields');
      return;
    }

    if(newPassword !== confirmPassword) {
      toast.error('New password and Confirm password are not matching');
      return;
    }

    console.log("Current password", currentPassword)

    try {
      // let login_verify = await login({currentUser, currentPassword});
      // console.log("login verify", login_verify)

      let username = currentUser;
      let password = currentPassword

      await login({username, password}).then(async(res) => {
        if (res.message === "Logged In" && newPassword === confirmPassword) {
             await updateDoc('User', currentUser, {
                new_password: newPassword
      });

      setCurrentPassword('');
      setNewPassword('');
      toast.success('Password updated successfully')
        }
      });

      // logout();
    } catch (error) {
      console.log("login error",error)
      toast.error(error.message)
      
    }


    // try {
    //   await updateDoc('User', currentUser, {
    //     current_password: currentPassword,
    //     new_password: newPassword
    //   });

    //   setCurrentPassword('');
    //   setNewPassword('');
    //   alert('Password updated successfully');
    // } catch (error) {
    //   console.error('Error updating password:', error);
    //   alert('Failed to update password');
    // }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfileUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
    setProfileUrl('');
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) return;
    // alert('Profile picture would be uploaded in a real implementation');

    if(profilePicture) {
      const fileDoc = await upload(profilePicture, {
        isPrivate: true,
        doctype: 'User',
        fieldname: 'user_image',
      });

      if (fileDoc) {
        setProfilePicture(fileDoc.file_url);
        await updateDoc('User', currentUser, {
          user_image: fileDoc.file_url
        });
        mutate();
        alert('Profile picture uploaded successfully');
      }

    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirmed) {
      setDeleteConfirmed(true);
      return;
    }

    try {
      alert('Account deletion ');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading user data...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error loading user data</div>;
  }

  const getInitials = () => {
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    } else if (firstName) {
      return firstName[0].toUpperCase();
    } else if (currentUser) {
      return currentUser[0].toUpperCase();
    }
    return 'U';
  };

   // Use fieldArray to handle dynamic rows
   const Indentification = useFieldArray({
    control,
    name: "identifications"
  });

  const IdentificationType = useFieldArray({
    control,
    name: "identification_type"
  });

  const BiometricDetails = useFieldArray({
    control,
    name: "biometric_details"
  });

  const BankAccountDetails = useFieldArray({
    control,
    name: "bank_account_details"
  });

  const DetailsOfSpouse = useFieldArray({
    control,
    name: "details_of_spouse"
  });


  const DetailsOfChildren = useFieldArray({
    control,
    name: "details_of_children"
  });


  // const handleSubmitForm = async(form) => {
  //   console.log('Form submitted:', form);

  //    let prospectData = {
  //       title: form.title,
  //       first_name: form.first_name,
  //       middle_name: form.middle_name,
  //       last_name: form.last_name,
  //       // date_of_birth: form
  //       gender: form.gender,
  //       nationility: form.nationality,
  //       resident_status: form.resident_status,
  //       marital_status: form.marital_status,
  //       origin: form.origin,
  //       portion_nolot_no: form.portion_nolot_no,
  //       villagestreet: form.villagestreet,
  //       town: form.town,
  //       district: form.district,
  //       province: form.province,
  //       country: form.country,
  //       po_box: form.po_box, 
  //       postal_code: form.postal_code,
  //       portion_lot_no: form.portion_lot_no,
  //       village_street: form.village_street,
  //       town1: form.town1,
  //       district1: form.district1,
  //       province1: form.province1,
  //       country1: form.country1,
  //       po_box1: form.po_box1,
  //       postal_code1: form.postal_code1,
  //       office_no: form.office_no,
  //       home: form.home,
  //       mobile_no: form.mobile_no,
  //       office_email: form.office_email,
  //       personal_email: form.personal_email,
  //       phone_no: form.phone_no,
  //       email_id: form.email_id,
  //       dd: form.identifications,
  //       identification_type: form.identification_type,
  //       table_64: form.bank_account_details,
  //       // table_66: form.details_of_spouse,
  //       details_of_spose: form.details_of_spouse,
  //       details_of_children: form.details_of_children,
  //       name1: form.name1,
  //       relationship: form.relationship,
  //       crm_no: form.crm_no
  //     }

  //       try {
  //     await updateDoc('Prospect Details', "CRM-0000010", prospectData);

  //     setCurrentPassword('');
  //     setNewPassword('');
  //     alert('Password updated successfully');
  //   } catch (error) {
  //     console.error('Error updating password:', error);
  //     alert('Failed to update password');
  //   }
  // }

  const handleSubmitForm = async (form) => {
  console.log('Form submitted:', form);

  // Filter out undefined or null values
  const prospectData = Object.fromEntries(
    Object.entries({
      title: form.title,
      first_name: form.first_name,
      middle_name: form.middle_name,
      last_name: form.last_name,
      gender: form.gender,
      nationality: form.nationality,
      resident_status: form.resident_status,
      marital_status: form.marital_status,
      origin: form.origin,
      portion_nolot_no: form.portion_nolot_no,
      villagestreet: form.villagestreet,
      town: form.town,
      district: form.district,
      province: form.province,
      country: form.country,
      po_box: form.po_box,
      postal_code: form.postal_code,
      portion_lot_no: form.portion_lot_no,
      village_street: form.village_street,
      town1: form.town1,
      district1: form.district1,
      province1: form.province1,
      country1: form.country1,
      po_box1: form.po_box1,
      postal_code1: form.postal_code1,
      office_no: form.office_no,
      home: form.home,
      mobile_no: form.mobile_no,
      office_email: form.office_email,
      personal_email: form.personal_email,
      phone_no: form.phone_no,
      email_id: form.email_id,
      dd: form.identifications,
      identification_type: form.biometric_details,
      table_64: form.bank_account_details,
      details_of_spose: form.details_of_spouse,
      details_of_children: form.details_of_children,
      name1: form.name1,
      relationship: form.relationship,
      crm_no: form.crm_no,
    }).filter(([_, value]) => value !== undefined && value !== null) 
  );

  try {
    await updateDoc('Prospect Details', "CRM-0000010", prospectData);

    setCurrentPassword('');
    setNewPassword('');
    toast.success('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
    toast.error('Failed to update data');
  }
};

  const onSubmit = (formd) => {
    console.log("On submit data", formd)
  } 

  // Centralized function to add a new row to a specified table
  const addNewRow = (tableType) => {
    switch (tableType) {
      case 'identifications':
        Indentification.append({ identification_type: '', number: '' });
        break;
      case 'identification_type':
        IdentificationType.append({ identification_type: '', status: '' });
        break;
      case 'education':
        educationArray.append({ institution: '', degree: '', year: '' });
        break;
      case 'employment':
        employmentArray.append({ company: '', position: '', duration: '' });
        break;
      case 'biometric_details':
        BiometricDetails.append({ identification_type: '', status: ''});
        break;

      case 'bank_account_details':
        BankAccountDetails.append({ bank_account: '', account_number: '', branch_name: ''});
        break;

      case 'details_of_spouse':
        DetailsOfSpouse.append({ name1: '', crm_no: '', age: ''});
        break;

      case 'details_of_children':
        DetailsOfChildren.append({ children_name: '', spouse_name: '', crm_no: '', age: ''});
        break;

      default:
        console.error('Unknown table type:', tableType);
    }
  };

  // Function to handle checkbox selection for a specific table
  const handleSelectRow = (tableType, index) => {
    switch (tableType) {
      case 'identifications':
        setSelectedIdentificationRows(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          } else {
            return [...prev, index];
          }
        });
        break;
      case 'identification_type':
        setSelectedEducationRows(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          } else {
            return [...prev, index];
          }
        });
        break;
      case 'employment':
        setSelectedEmploymentRows(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          } else {
            return [...prev, index];
          }
        });
        break;
      default:
        console.error('Unknown table type:', tableType);
    }
  };

  // Function to handle "Select All" checkbox for a specific table
  const handleSelectAll = (tableType) => {
    switch (tableType) {
      case 'identifications':
        if (selectedIdentificationRows.length === identificationArray.fields.length) {
          setSelectedIdentificationRows([]);
        } else {
          setSelectedIdentificationRows(identificationArray.fields.map((_, index) => index));
        }
        break;
      case 'identification_type':
        if (selectedEducationRows.length === IdentificationType.fields.length) {
          setSelectedEducationRows([]);
        } else {
          setSelectedEducationRows(IdentificationType.fields.map((_, index) => index));
        }
        break;
      case 'employment':
        if (selectedEmploymentRows.length === employmentArray.fields.length) {
          setSelectedEmploymentRows([]);
        } else {
          setSelectedEmploymentRows(employmentArray.fields.map((_, index) => index));
        }
        break;
      default:
        console.error('Unknown table type:', tableType);
    }
  };

  // Centralized function to remove selected rows from a specified table
  const removeSelectedRows = (tableType) => {
    // Determine which selection array and field array to use
    let selectedRows, fieldArray, setSelectedRowsFunction;
    
    switch (tableType) {
      case 'identifications':
        selectedRows = selectedIdentificationRows;
        fieldArray = Indentification;
        setSelectedRowsFunction = setSelectedIdentificationRows;
        break;
      case 'identification_type':
        selectedRows = selectedEducationRows;
        fieldArray = IdentificationType;
        setSelectedRowsFunction = setSelectedEducationRows;
        break;
      case 'employment':
        selectedRows = selectedEmploymentRows;
        fieldArray = employmentArray;
        setSelectedRowsFunction = setSelectedEmploymentRows;
        break;
      default:
        console.error('Unknown table type:', tableType);
        return;
    }
    
    // Sort indices in descending order to avoid index shifting issues when removing
    const sortedIndices = [...selectedRows].sort((a, b) => b - a);
    sortedIndices.forEach(index => {
      fieldArray.remove(index);
    });
    
    // Clear the selected rows array
    setSelectedRowsFunction([]);
  };

  // return (
  //   <div>
  //     <div className="min-h-screen bg-[#f2f9ff] text-gray-700 py-8 px-4">

  //       <div className="max-w-3xl mx-auto">
  //         <h1 className="text-3xl font-bold mb-8 text-blue-800">Edit Profile</h1>

  //         {/* Profile Picture Section */}
  //         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
  //           <div className="flex flex-col sm:flex-row items-center">
  //             <div className="mb-4 sm:mb-0 sm:mr-6">
  //               {profileUrl ? (
  //                 <div className="relative w-24 h-24">
  //                   <img
  //                     src={profileUrl}
  //                     alt="Profile"
  //                     className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
  //                   />
  //                   <button onClick={handleRemoveProfilePicture} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
  //                     <X size={16} />
  //                   </button>
  //                 </div>
  //               ) : (
  //                 <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
  //                   {getInitials()}
  //                 </div>
  //               )}
  //             </div>

  //             <div className="flex-1 text-center sm:text-left">
  //               <p className="text-lg font-medium mb-3">Profile Picture</p>
  //               <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
  //                 <label className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 cursor-pointer flex items-center transition">
  //                   <User size={18} className="mr-2" />
  //                   Select Image
  //                   <input
  //                     type="file"
  //                     accept="image/*"
  //                     className="hidden"
  //                     onChange={handleProfilePictureChange}
  //                   />
  //                 </label>
  //                 <button
  //                   onClick={uploadProfilePicture}
  //                   disabled={!profilePicture}
  //                   className={`px-4 py-2 rounded-lg flex items-center transition ${profilePicture
  //                     ? "bg-blue-600 text-white hover:bg-blue-700"
  //                     : "bg-gray-200 text-gray-400 cursor-not-allowed"
  //                     }`}
  //                 >
  //                   <Upload size={18} className="mr-2" />
  //                   Upload
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Profile Information Section */}
  //             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
  //               <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
  //                 Personal Information
  //               </h2>

  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 <div>
  //                   <label className="block mb-2 font-medium text-gray-600">First Name</label>
  //                   <input
  //                     type="text"
  //                     value={firstName}
  //                     onChange={(e) => setFirstName(e.target.value)}
  //                     className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block mb-2 font-medium text-gray-600">Last Name</label>
  //                   <input
  //                     type="text"
  //                     value={lastName}
  //                     onChange={(e) => setLastName(e.target.value)}
  //                     className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block mb-2 font-medium text-gray-600">Date of Birth</label>
  //                   <input
  //                     type="date"
  //                     value={dateOfBirth}
  //                     onChange={(e) => setDateOfBirth(e.target.value)}
  //                     className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block mb-2 font-medium text-gray-600">Gender</label>
  //                   <select
  //                     value={gender}
  //                     onChange={(e) => setGender(e.target.value)}
  //                     className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
  //                     style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
  //                   >
  //                     <option value="">Select Gender</option>
  //                     <option value="Male">Male</option>
  //                     <option value="Female">Female</option>
  //                     <option value="Other">Other</option>
  //                     <option value="Prefer not to say">Prefer not to say</option>
  //                   </select>
  //                 </div>

  //                 <div>
  //                   <label className="block mb-2 font-medium text-gray-600">Contact Number</label>
  //                   <input
  //                     type="tel"
  //                     value={contactNumber}
  //                     onChange={(e) => setContactNumber(e.target.value)}
  //                     className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                   />
  //                 </div>

  //                 <div className="md:col-span-2">
  //                   <label className="block mb-2 font-medium text-gray-600">About</label>
  //                   <textarea
  //                     value={about}
  //                     onChange={(e) => setAbout(e.target.value)}
  //                     className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                     placeholder="Tell us a bit about yourself..."
  //                   />
  //                 </div>
  //               </div>

  //               <div className="flex justify-end mt-6 gap-3">
  //                 <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
  //                   Cancel
  //                 </button>
  //                 <button
  //                   onClick={handleProfileSave}
  //                   disabled={updateLoading}
  //                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  //                 >
  //                   {updateLoading ? 'Saving...' : 'Save Changes'}
  //                 </button>
  //               </div> 
  //             </div>

  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //   </div>
  // )


  return (
    <div className="min-h-screen bg-[#f2f9ff] text-gray-700 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Edit Profile</h1>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mb-0 sm:mr-6">
              {profileUrl ? (
                <div className="relative w-24 h-24">
                  <img 
                    src={profileUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100" 
                  />
                  <button onClick={handleRemoveProfilePicture} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {getInitials()}
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg font-medium mb-3">Profile Picture</p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <label className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 cursor-pointer flex items-center transition">
                  <User size={18} className="mr-2" />
                  Select Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfilePictureChange}
                  />
                </label>
                <button 
                  onClick={uploadProfilePicture}
                  disabled={!profilePicture}
                  className={`px-4 py-2 rounded-lg flex items-center transition ${
                    profilePicture 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Upload size={18} className="mr-2" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {/* Profile Information Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
            Basic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div>
              <label className="block mb-2 font-medium text-gray-600">First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div> */}

            <div>
              <label className="block mb-2 font-medium text-gray-600">Title</label>
              <select 
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}
                {...register("title")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="">Select Title</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss.">Miss.</option>
                
              </select>
            </div>

            {/* <div>
              <label className="block mb-2 font-medium text-gray-600">Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div> */}

            <div>
              <label className="block mb-2 font-medium text-gray-600">Gender</label>
              <select 
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}
                {...register("gender")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            

            {/* <div>
              <label className="block mb-2 font-medium text-gray-600">Date of Birth</label>
              <input 
                type="date" 
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div> */}

<div>
              <label className="block mb-2 font-medium text-gray-600">First Name</label>
              <input 
                type="text" 
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                {...register("first_name")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* <div>
              <label className="block mb-2 font-medium text-gray-600">Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div> */}

<div>
              <label className="block mb-2 font-medium text-gray-600">Nationality</label>
              <input 
                type="text" 
                // value={contactNumber}
                // onChange={(e) => setContactNumber(e.target.value)}
                {...register("nationality")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>


            <div>
              <label className="block mb-2 font-medium text-gray-600">Middle Name</label>
              <input 
                type="text" 
                // value={contactNumber}
                // onChange={(e) => setContactNumber(e.target.value)}
                {...register("middle_name")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* <div>
              <label className="block mb-2 font-medium text-gray-600">Contact Number</label>
              <input 
                type="tel" 
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div> */}


            <div>
              <label className="block mb-2 font-medium text-gray-600">Resident Status</label>
              <select 
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}
                {...register("resident_status")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="">Select Status</option>
                <option value="Resident">Resident</option>
                <option value="Non-Resident">Non-Resident</option>
                
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-600">Last Name</label>
              <input 
                type="text" 
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}

                {...register("last_name")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div> 


            <div>
              <label className="block mb-2 font-medium text-gray-600">Marital Status</label>
              <select 
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}

                {...register("marital_status")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="">Select Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                
              </select>
            </div>

            {/* <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-600">About</label>
              <textarea 
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Tell us a bit about yourself..."
              />
            </div> */}


            <div>
              <label className="block mb-2 font-medium text-gray-600">Date of Birth</label>
              <input 
                type="date" 
                // value={dateOfBirth}
                // onChange={(e) => setDateOfBirth(e.target.value)}
                {...register("date_of_birth")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-600">Origin</label>
              <input 
                type="text" 
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
                {...register("origin")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div> 


          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

            <input type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" />
              {/* onClick={handleProfileSave}
              disabled={updateLoading}
              className=""
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button> */}
            {/* <button 
              onClick={handleProfileSave}
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button> */}
          </div>
        </div>
        </form>

         {/* Permanent Address Section */}

         <form onSubmit={handleSubmit(handleSubmitForm)}>
          
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
            Permanent Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium text-gray-600">Portion No/Lot No</label>
                <input
                  type="text"
                  {...register("portion_lot_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Province</label>
                <input
                  type="text"
                  {...register("province")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Village/Street</label>
                <input
                  type="text"
                  {...register("villagestreet")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-gray-600">Country</label>
                <input
                  type="text"
                  {...register("country")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Town</label>
                <input
                  type="text"
                  {...register("town")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">PO Box</label>
                <input
                  type="text"
                  {...register("po_box")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">District</label>
                <input
                  type="text"
                  {...register("district")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Postal Code</label>
                <input
                  type="text"
                  {...register("postal_code")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
        </form>

         {/* Current Location / Correspondence Address Section */}

         <form onSubmit={handleSubmit(handleSubmitForm)}>
          
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
          Current Location / Correspondence Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium text-gray-600">Portion No/Lot No</label>
                <input
                  type="text"
                  {...register("portion_nolot_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Province</label>
                <input
                  type="text"
                  {...register("province1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Village/Street</label>
                <input
                  type="text"
                  {...register("village_street")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-gray-600">Country</label>
                <input
                  type="text"
                  {...register("country1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Town</label>
                <input
                  type="text"
                  {...register("town1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">PO Box</label>
                <input
                  type="text"
                  {...register("po_box1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">District</label>
                <input
                  type="text"
                  {...register("district1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Postal Code</label>
                <input
                  type="text"
                  {...register("postal_code1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
        </form>

        {/* Contact Number */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
              Contact Number
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label className="block mb-2 font-medium text-gray-600">Office No</label>
                <input
                  type="text"
                  {...register("office_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Mobile No</label>
                <input
                  type="number"
                  {...register("mobile_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Home</label>
                <input
                  type="text"
                  {...register("home")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>


            </div>

            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>


        {/* Email Id */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
              Email Id
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label className="block mb-2 font-medium text-gray-600">Office Email</label>
                <input
                  type="text"
                  {...register("office_email")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Personal Email</label>
                <input
                  type="email"
                  {...register("personal_email")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              


            </div>

            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>

        {/* Preferred Secured Communication */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
               Preferred Secured Communication
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label className="block mb-2 font-medium text-gray-600">Phone No</label>
                <input
                  type="number"
                  {...register("phone_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Email Id</label>
                <input
                  type="email"
                  {...register("email_id")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              


            </div>

            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>


        {/* Identification Details */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
               Identification Details
            </h2>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label className="block mb-2 font-medium text-gray-600">Phone No</label>
                <input
                  type="number"
                  {...register("phone_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">Email Id</label>
                <input
                  type="email"
                  {...register("email_id")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              


            </div> */}


{/* <FormField
   control={form.control}
   name="User"
   render={({ field}) => {
    <FormItem className="flex flex-col">
      <FormLabel>User</FormLabel>
      <LinkField value={field.value} doctype="User" onChange={field.onChange} />
      <FormMessage/>
    </FormItem>
   }}
/> */}

<Table className="w-full bg-blue-50 text-gray-700 rounded-lg p-3 ">
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">No.</TableHead>
      <TableHead>Identification Type</TableHead>
      <TableHead>Number</TableHead>
      <TableHead>Attached</TableHead>
      {/* <TableHead className="text-right">Amount</TableHead> */}
    </TableRow>
  </TableHeader>
  <TableBody className="bg-white border border-blue-100">
    
    {
      Indentification?.fields?.map((field, index) => (
        <TableRow key={field.id}>
      {/* <TableCell className="font-medium">INV001</TableCell> */}
      <TableCell className="font-medium flex items-center justify-center gap-2 md:h-[56px]">
      <input
                      type="checkbox"
                      checked={selectedIdentificationRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="h-4 w-4"
                    />
        {index + 1}
        </TableCell>
      {/* <TableCell>
      <input
                  type="text"
                  placeholder='Identification Type'
                  {...register(`identifications.${index}.identification_type`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell> */}

<TableCell>
  <LinkField
    doctype="indentify" 
    placeholder="Select Identification Type"
    value={Indentification.fields[index]?.identification_type}
    onChange={(value) => {
      Indentification.update(index, { ...Indentification.fields[index], identification_type: value }); 
    }}
    className="w-full p-3 bg-[#f4f5f7] text-black transition"
  />
</TableCell>
      
      
      <TableCell>
      <input
                  type="number"
                  placeholder='Number'
                  {...register(`identifications.${index}.number`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>
      <TableCell>
      <button 

                  className={`px-4 py-2 rounded-lg flex items-center transition  bg-gray-200 text-gray-400`}
                >
                  <Upload size={18} className="mr-2" />
                  Upload
                </button>
      </TableCell>
      
    </TableRow>
      ))
    }

{Indentification.fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No identification records added. Click "Add Row" to add one.
                  </td>
                </tr>
              )}
  </TableBody>

</Table>


<div className='flex gap-5'>
<button 
          type="button" 
          // onClick={addNewRow}
          onClick={() => addNewRow('identifications')}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Row
        </button>

        <button 
            type="button"
            // onClick={removeSelectedRows}
            onClick={() => removeSelectedRows('identifications')}
            disabled={selectedIdentificationRows.length === 0}
            className={` mt-5 px-4 py-2 rounded-lg flex items-center transition ${
              selectedIdentificationRows.length > 0 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Selected ({selectedIdentificationRows.length})
          </button>
</div>


            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>


        {/* Biometric Details */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
               Biometric Details
            </h2>

<Table className="w-full bg-blue-50 text-gray-700 rounded-lg p-3 ">
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">No.</TableHead>
      <TableHead>Identification Type</TableHead>
      <TableHead>Status</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody className="bg-white border border-blue-100">
    
    {
      BiometricDetails?.fields?.map((field, index) => (
        <TableRow key={field.id}>
      {/* <TableCell className="font-medium">INV001</TableCell> */}
      <TableCell className="font-medium flex items-center justify-center gap-2 md:h-[56px]">
      <input
                      type="checkbox"
                      checked={selectedEducationRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="h-4 w-4"
                    />
        {index + 1}
        </TableCell>
    

<TableCell>
  <LinkField
    doctype="Biometric" 
    placeholder="Select Biometric"
    value={BiometricDetails?.fields[index]?.identification_type}
    onChange={(value) => {
      BiometricDetails.update(index, { ...BiometricDetails?.fields[index], identification_type: value }); 
    }}
    className="w-full p-3 bg-[#f4f5f7] text-black transition"
  />
</TableCell>
      
      
      <TableCell>
      <input
                  type="checkbox"
                  {...register(`biometric_details.${index}.identification_type`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>
      
      
    </TableRow>
      ))
    }

{BiometricDetails?.fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No identification records added. Click "Add Row" to add one.
                  </td>
                </tr>
              )}
  </TableBody>

</Table>


<div className='flex gap-5'>
<button 
          type="button" 
          // onClick={addNewRow}
          onClick={() => addNewRow('biometric_details')}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Row
        </button>

        <button 
            type="button"
            onClick={() => removeSelectedRows('biometric_details')}
            disabled={selectedEducationRows.length === 0}
            className={` mt-5 px-4 py-2 rounded-lg flex items-center transition ${
              selectedEducationRows.length > 0 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Selected ({selectedEducationRows.length})
          </button>
</div>


            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>

         {/* Bank Account Details */}

         <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
               Bank Account Details
            </h2>

<Table className="w-full bg-blue-50 text-gray-700 rounded-lg p-3 ">
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">No.</TableHead>
      <TableHead>Account Name</TableHead>
      <TableHead>Account Number</TableHead>
      <TableHead>Branch Name</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody className="bg-white border border-blue-100">
    
    {
      BankAccountDetails?.fields?.map((field, index) => (
        <TableRow key={index}>
      {/* <TableCell className="font-medium">INV001</TableCell> */}
      <TableCell className="font-medium flex items-center justify-center gap-2 md:h-[56px]">
      <input
                      type="checkbox"
                      checked={selectedIdentificationRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="h-4 w-4"
                    />
        {index + 1}
        </TableCell>
    

<TableCell>
  <LinkField
    doctype="Bank Account Summary" 
    placeholder="Select Bank Account Summary"
    value={BankAccountDetails?.fields[index]?.bank_account}
    onChange={(value) => {
      BankAccountDetails.update(index, { ...BankAccountDetails.fields[index], bank_account: value }); 
    }}
    className="w-full p-3 bg-[#f4f5f7] text-black transition"
  />
</TableCell>
      
      
<TableCell>
      <input
                  type="number"
                  placeholder='Account Number'
                  {...register(`bank_account_details.${index}.account_number`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>

      <TableCell>
      <input
                  type="text"
                  placeholder='Branch Name'
                  {...register(`bank_account_details.${index}.branch_name`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>
      
      
    </TableRow>
      ))
    }

{BankAccountDetails?.fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No identification records added. Click "Add Row" to add one.
                  </td>
                </tr>
              )}
  </TableBody>

</Table>


<div className='flex gap-5'>
<button 
          type="button" 
          // onClick={addNewRow}
          onClick={() => addNewRow('bank_account_details')}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Row
        </button>

        <button 
            type="button"
            // onClick={removeSelectedRows}
            onClick={() => removeSelectedRows('bank_account_details')}
            disabled={selectedIdentificationRows.length === 0}
            className={` mt-5 px-4 py-2 rounded-lg flex items-center transition ${
              selectedIdentificationRows.length > 0 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Selected ({selectedIdentificationRows.length})
          </button>
</div>


            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>

        {/* Employement Details */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
              Employement Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                {/* <label className="block mb-2 font-medium text-gray-600">Office Email</label> */}
                <input
                  type="text"
                  {...register("employement_details")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              

            </div>

            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>


        {/* Healthcare Information */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
               Healthcare Information
            </h2>

{/* Details of spouse table */}
<Table className="w-full bg-blue-50 text-gray-700 rounded-lg p-3 ">
  <TableCaption>Deatils of spouse</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">No.</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>CRM ID</TableHead>
      <TableHead>Age</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody className="bg-white border border-blue-100">
    
    {
      DetailsOfSpouse?.fields?.map((field, index) => (
        <TableRow key={field.id}>
      {/* <TableCell className="font-medium">INV001</TableCell> */}
      <TableCell className="font-medium flex items-center justify-center gap-2 md:h-[56px]">
      <input
                      type="checkbox"
                      checked={selectedIdentificationRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="h-4 w-4"
                    />
        {index + 1}
        </TableCell>
    


      
      
<TableCell>
      <input
                  type="text"
                  placeholder='Name'
                  {...register(`details_of_spouse.${index}.name1`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>


      <TableCell>
  <LinkField
    doctype="Prospect Details" 
    placeholder="Select CRM ID"
    value={DetailsOfSpouse?.fields[index]?.crm_no}
    onChange={(value) => {
      DetailsOfSpouse.update(index, { ...DetailsOfSpouse.fields[index], crm_no: value }); 
    }}
    className="w-full p-3 bg-[#f4f5f7] text-black transition"
  />
</TableCell>

      <TableCell>
      <input
                  type="number"
                  placeholder='Age'
                  {...register(`details_of_spouse.${index}.age`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>
      
      
    </TableRow>
      ))
    }

{DetailsOfSpouse.fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No identification records added. Click "Add Row" to add one.
                  </td>
                </tr>
              )}
  </TableBody>

</Table>

<div className='flex gap-5'>
<button 
          type="button" 
          // onClick={addNewRow}
          onClick={() => addNewRow('details_of_spouse')}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Row
        </button>

        <button 
            type="button"
            // onClick={removeSelectedRows}
            onClick={() => removeSelectedRows('details_of_spouse')}
            disabled={selectedIdentificationRows.length === 0}
            className={` mt-5 px-4 py-2 rounded-lg flex items-center transition ${
              selectedIdentificationRows.length > 0 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Selected ({selectedIdentificationRows.length})
          </button>
</div>


            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

{/* Details of children */}

<Table className="w-full mt-10 bg-blue-50 text-gray-700 rounded-lg p-3 ">
  <TableCaption>Deatils of children</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">No.</TableHead>
      <TableHead>Children Name</TableHead>
      <TableHead>Father's/Mother's Name</TableHead>
      <TableHead>CRM ID</TableHead>
      <TableHead>Age</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody className="bg-white border border-blue-100">
    
    {
      DetailsOfChildren?.fields?.map((field, index) => (
        <TableRow key={field.id}>
      <TableCell className="font-medium flex items-center justify-center gap-2 md:h-[56px]">
      <input
                      type="checkbox"
                      checked={selectedIdentificationRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="h-4 w-4"
                    />
        {index + 1}
        </TableCell>
    


      
      
<TableCell>
      <input
                  type="text"
                  placeholder='Children Name'
                  {...register(`details_of_children.${index}.children_name`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>

      <TableCell>
      <input
                  type="text"
                  placeholder="Father's/Mother's Name"
                  {...register(`details_of_children.${index}.spouse_name`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>

      {/* <TableCell>
      <input
                  type="number"
                  placeholder='CRM ID'
                  {...register(`details_of_children.${index}.crm_no`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell> */}

      <TableCell>
  <LinkField
    doctype="Prospect Details" 
    placeholder="Select CRM ID"
    value={DetailsOfChildren?.fields[index]?.crm_no}
    onChange={(value) => {
      DetailsOfChildren.update(index, { ...DetailsOfChildren.fields[index], crm_no: value }); 
    }}
    className="w-full p-3 bg-[#f4f5f7] text-black transition"
  />
</TableCell>

      <TableCell>
      <input
                  type="number"
                  placeholder='Age'
                  {...register(`details_of_children.${index}.age`)}
                  className=" w-full p-3 bg-[#f4f5f7] text-black transition"
                />
      </TableCell>
      
      
    </TableRow>
      ))
    }

{DetailsOfChildren?.fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No identification records added. Click "Add Row" to add one.
                  </td>
                </tr>
              )}
  </TableBody>

</Table>


<div className='flex gap-5'>
<button 
          type="button" 
          // onClick={addNewRow}
          onClick={() => addNewRow('details_of_children')}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Row
        </button>

        <button 
            type="button"
            // onClick={removeSelectedRows}
            onClick={() => removeSelectedRows('details_of_children')}
            disabled={selectedIdentificationRows.length === 0}
            className={` mt-5 px-4 py-2 rounded-lg flex items-center transition ${
              selectedIdentificationRows.length > 0 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Selected ({selectedIdentificationRows.length})
          </button>
</div>


            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>

        {/* Next Of Kin */}

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
            Next Of Kin
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label className="block mb-2 font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  {...register("name1")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-600">CRM Id</label>
                <input
                  type="text"
                  {...register("crm_no")}
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
              <label className="block mb-2 font-medium text-gray-600">Relationship</label>
              <select 
                // value={gender}
                // onChange={(e) => setGender(e.target.value)}
                {...register("relationship")}
                className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23666\" stroke-width=\"1.5\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="">Select relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Daughter">Daughter</option>
                <option value="Son">Son</option>
                <option value="Sister">Sister</option>
                <option value="Brother">Brother</option>
                
              </select>
            </div>


            </div>

            <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>

          
            <button 
              type='submit'
              disabled={updateLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </div>
        </form>


        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-2">
            Update Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-600">Current Password</label>
              <div className="relative">
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter Current Password"
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-600">New Password</label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-600">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full bg-blue-50 border border-blue-100 text-gray-700 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
            <button 
              onClick={handlePasswordUpdate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex flex-col sm:flex-row items-start">
            <div className="bg-red-100 p-3 rounded-full mb-4 sm:mb-0 sm:mr-4">
              <Trash2 size={24} className="text-red-500" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-red-600">Delete Account</h2>
              <p className="mb-2 text-gray-700">Would you like to delete your account?</p>
              <p className="text-sm text-gray-500 mb-4">
                This account may contain important information. Deleting your account is
                permanent and will remove all the content associated with it.
              </p>

              <div className="flex items-center">
                <button 
                  onClick={() => setDeleteConfirmed(!deleteConfirmed)}
                  className="px-5 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  {deleteConfirmed ? "Cancel" : "Delete Account"}
                </button>

                {deleteConfirmed && (
                  <button 
                    onClick={handleDeleteAccount}
                    className="ml-3 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Confirm Deletion
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;