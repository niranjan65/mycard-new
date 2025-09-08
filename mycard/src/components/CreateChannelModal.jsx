// import { useFrappeCreateDoc, useFrappeGetCall, useSWRConfig } from 'frappe-react-sdk';
// import { useCallback, useMemo, useState } from 'react';
// import { Controller, FormProvider, useForm } from 'react-hook-form';
// import { BiGlobe, BiHash, BiInfoCircle, BiLockAlt } from 'react-icons/bi';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ErrorBanner } from '@/components/layout/AlertBanner/ErrorBanner';
// import { Box, Button, Dialog, Flex, IconButton, RadioGroup, Text, TextArea, TextField } from '@radix-ui/themes';
// import { ErrorText, HelperText, Label } from '@/components/common/Form';
// import { Loader } from '@/components/common/Loader';
// import { toast } from 'sonner';
// import { FiPlus } from 'react-icons/fi';
// import { useIsDesktop } from '@/hooks/useMediaQuery';
// import { Drawer, DrawerContent, DrawerTrigger } from '@/components/layout/Drawer';
// import { __ } from '@/utils/translations';
// import { CustomCallout } from '@/components/common/Callouts/CustomCallout';

// export const CreateChannelButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const isDesktop = useIsDesktop();

//   if (isDesktop) {
//     return (
//       <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
//         <Dialog.Trigger>
//           <IconButton
//             variant="soft"
//             size="1"
//             radius="large"
//             color="gray"
//             aria-label="Create Channel"
//             title="Create Channel"
//             className="transition-all ease-ease text-gray-10 bg-transparent hover:bg-gray-3 hover:text-gray-12"
//           >
//             <FiPlus size="16" />
//           </IconButton>
//         </Dialog.Trigger>
//         <Dialog.Content className='dark:backdrop-blur-[20px] dark:bg-[#151518CC] dark:border dark:border-[#ffffff1a] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_3px_16px_rgba(0,0,0,0.6)]'>
//           <CreateChannelContent isOpen={isOpen} setIsOpen={setIsOpen} />
//         </Dialog.Content>
//       </Dialog.Root>
//     );
//   } else {
//     return (
//       <Drawer open={isOpen} onOpenChange={setIsOpen}>
//         <DrawerTrigger asChild>
//           <IconButton
//             variant="soft"
//             size="1"
//             radius="large"
//             color="gray"
//             aria-label="Create Channel"
//             title="Create Channel"
//             className="transition-all ease-ease text-gray-10 bg-transparent hover:bg-gray-3 hover:text-gray-12"
//           >
//             <FiPlus size="16" />
//           </IconButton>
//         </DrawerTrigger>
//         <DrawerContent>
//           <div className="pb-16 overflow-y-scroll min-h-96">
//             <CreateChannelContent isOpen={isOpen} setIsOpen={setIsOpen} />
//           </div>
//         </DrawerContent>
//       </Drawer>
//     );
//   }
// };

// const CreateChannelContent = ({ isOpen, setIsOpen }) => {
//   const { workspaceID } = useParams();
//   const { data: canCreateChannel } = useFrappeGetCall(
//     'raven.api.workspaces.can_create_channel',
//     { workspace: workspaceID },
//     workspaceID ? undefined : null
//   );

//   const { mutate } = useSWRConfig();
//   const navigate = useNavigate();

//   const methods = useForm({
//     defaultValues: {
//       type: 'Public',
//       channel_name: '',
//       channel_description: ''
//     }
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     control,
//     setValue,
//     reset: resetForm
//   } = methods;

//   const { createDoc, error: channelCreationError, loading: creatingChannel, reset: resetCreateHook } = useFrappeCreateDoc();

//   const onClose = (channel_name, workspace) => {
//     if (channel_name) {
//       navigate(`raven/${workspace}/${channel_name}`);
//       mutate(['channel_members', channel_name]);
//     }
//     setIsOpen(false);
//     reset();
//   };

//   const reset = () => {
//     resetCreateHook();
//     resetForm();
//   };

//   const channelType = watch('type');

//   const onSubmit = (data) => {
//     createDoc('Raven Channel', {
//       ...data,
//       workspace: "New admin office construction"  
//     }).then((result) => {
//       if (result) {
//         mutate(
//           'channel_list',
//           (data) => ({
//             message: {
//               ...data.message,
//               channels: [...data.message.channels, { ...result }]
//             }
//           }),
//           {
//             revalidate: false
//           }
//         );
//         toast.success(__('Channel created'));
//         onClose(result.name, workspaceID);
//       }
//     });
//   };

//   const handleNameChange = useCallback(
//     (event) => {
//       setValue('channel_name', event.target.value?.toLowerCase().replace(' ', '-'));
//     },
//     [setValue]
//   );

//   const { channelIcon, header, helperText } = useMemo(() => {
//     switch (channelType) {
//       case 'Private':
//         return {
//           channelIcon: <BiLockAlt />,
//           header: __('Create a private channel'),
//           helperText: __('When a channel is set to private, it can only be viewed or joined by invitation.')
//         };
//       case 'Open':
//         return {
//           channelIcon: <BiGlobe />,
//           header: __('Create an open channel'),
//           helperText: __('When a channel is set to open, everyone is a member.')
//         };
//       default:
//         return {
//           channelIcon: <BiHash />,
//           header: __('Create a public channel'),
//           helperText: __('When a channel is set to public, anyone can join the channel and read messages, but only members can post messages.')
//         };
//     }
//   }, [channelType]);

//   const isDesktop = useIsDesktop();

//   return (
//     <div>
//       <Dialog.Title>{header}</Dialog.Title>
//       <Dialog.Description size="2">
//         {__('Channels are where your team communicates. They are best when organized around a topic - #development, for example.')}
//       </Dialog.Description>
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Flex direction="column" gap="4" py="4">
//             {!canCreateChannel?.message && (
//               <CustomCallout
//                 iconChildren={<BiInfoCircle size="18" />}
//                 rootProps={{ color: 'yellow', variant: 'surface' }}
//                 textChildren={
//                   <Text>
//                     You cannot create a new channel since you are not an admin of this workspace. Ask an admin to create a channel or make you an admin.
//                   </Text>
//                 }
//               />
//             )}
//             <ErrorBanner error={channelCreationError} />
//             <Box>
//               <Label htmlFor="channel_name" isRequired>
//                 {__('Name')}
//               </Label>
//               <Controller
//                 name="channel_name"
//                 control={control}
//                 rules={{
//                   required: __('Please add a channel name'),
//                   maxLength: {
//                     value: 50,
//                     message: __('Channel name cannot be more than {0} characters.', ['50'])
//                   },
//                   minLength: {
//                     value: 3,
//                     message: __('Channel name cannot be less than {0} characters.', ['3'])
//                   },
//                   pattern: {
//                     value: /^[a-zA-Z0-9][a-zA-Z0-9-]*$/,
//                     message: __('Channel name can only contain letters, numbers and hyphens.')
//                   }
//                 }}
//                 render={({ field, fieldState: { error } }) => (
//                   <TextField.Root
//                     maxLength={50}
//                     required
//                     autoFocus={isDesktop}
//                     placeholder="e.g. red-wedding-planning, joffrey-memes"
//                     color={error ? 'red' : undefined}
//                     {...field}
//                     aria-invalid={error ? 'true' : 'false'}
//                     onChange={handleNameChange}
//                   >
//                     <TextField.Slot side="left">{channelIcon}</TextField.Slot>
//                     <TextField.Slot side="right">
//                       <Text size="2" weight="light" color="gray">
//                         {50 - field.value.length}
//                       </Text>
//                     </TextField.Slot>
//                   </TextField.Root>
//                 )}
//               />
//               {errors?.channel_name && <ErrorText>{errors.channel_name?.message}</ErrorText>}
//             </Box>

//             <Box>
//               <Label htmlFor="channel_description">
//                 {__('Description')} <Text as="span" weight="light">({__('optional')})</Text>
//               </Label>
//               <TextArea
//                 maxLength={140}
//                 id="channel_description"
//                 placeholder="Great wine and food. What could go wrong?"
//                 {...register('channel_description', {
//                   maxLength: {
//                     value: 140,
//                     message: __('Channel description cannot be more than {0} characters.', ['140'])
//                   }
//                 })}
//                 aria-invalid={errors.channel_description ? 'true' : 'false'}
//               />
//               <HelperText>What is this channel about?</HelperText>
//               {errors?.channel_description && <ErrorText>{errors.channel_description?.message}</ErrorText>}
//             </Box>

//             <Flex gap="2" direction="column">
//               <Label htmlFor="channel_type">Channel Type</Label>
//               <Controller
//                 name="type"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup.Root
//                     defaultValue="1"
//                     variant="soft"
//                     id="channel_type"
//                     value={field.value}
//                     onValueChange={field.onChange}
//                   >
//                     <Flex gap="4">
//                       <Text as="label" size="2">
//                         <Flex gap="2">
//                           <RadioGroup.Item value="Public" /> {__('Public')}
//                         </Flex>
//                       </Text>
//                       <Text as="label" size="2">
//                         <Flex gap="2">
//                           <RadioGroup.Item value="Private" /> {__('Private')}
//                         </Flex>
//                       </Text>
//                       <Text as="label" size="2">
//                         <Flex gap="2">
//                           <RadioGroup.Item value="Open" /> {__('Open')}
//                         </Flex>
//                       </Text>
//                     </Flex>
//                   </RadioGroup.Root>
//                 )}
//               />
//               <HelperText className="min-h-[3rem]">{helperText}</HelperText>
//             </Flex>
//           </Flex>
//           <Flex gap="3" mt="4" justify="end">
//             <Dialog.Close disabled={creatingChannel}>
//               <Button variant="soft" color="gray">
//                 {__('Cancel')}
//               </Button>
//             </Dialog.Close>
//             <Button type="submit" >
//               {creatingChannel && <Loader className="text-white" />}
//               {creatingChannel ? __('Saving') : __('Save')}
//             </Button>
//           </Flex>
//         </form>
//       </FormProvider>
//     </div>
//   );
// };























// import { useState } from 'react';
// import { Hash, LockKeyhole, Globe, Info, Plus, X } from 'lucide-react';

// // Mock implementation of the Frappe React SDK hooks since we don't have the actual library
// // In a real implementation, you would import these from 'frappe-react-sdk'
// const useFrappeCreateDoc = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const createDoc = async (doctype, data) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // In a real implementation, this would be an API call
//       console.log(`Creating ${doctype} with data:`, data);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Simulate successful response
//       const result = {
//         name: data.channel_name,
//         ...data
//       };
      
//       setLoading(false);
//       return result;
//     } catch (err) {
//       setError(err.message || 'An error occurred while creating the channel');
//       setLoading(false);
//       return null;
//     }
//   };
  
//   const reset = () => {
//     setError(null);
//   };
  
//   return { createDoc, loading, error, reset };
// };

// // Mock implementation of useSWRConfig
// const useSWRConfig = () => {
//   const mutate = (key, updateFn, options) => {
//     console.log('Mutating cache for:', key);
//     if (typeof updateFn === 'function') {
//       console.log('With update function');
//     } else {
//       console.log('With data:', updateFn);
//     }
//     console.log('Options:', options);
//   };
  
//   return { mutate };
// };

// export const CreateChannelButton =() => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     type: 'Public',
//     channel_name: '',
//     channel_description: ''
//   });
//   const [errors, setErrors] = useState({});
  
//   const { mutate } = useSWRConfig();
//   const { createDoc, loading: creatingChannel, error: channelCreationError, reset: resetCreateHook } = useFrappeCreateDoc();
  
//   const handleNameChange = (e) => {
//     const value = e.target.value?.toLowerCase().replace(/ /g, '-');
//     setFormData(prev => ({ ...prev, channel_name: value }));
    
//     // Validate on change
//     if (value.length > 0) {
//       const newErrors = {...errors};
      
//       if (value.length < 3) {
//         newErrors.channel_name = 'Channel name cannot be less than 3 characters.';
//       } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(value)) {
//         newErrors.channel_name = 'Channel name can only contain letters, numbers and hyphens.';
//       } else {
//         delete newErrors.channel_name;
//       }
      
//       setErrors(newErrors);
//     }
//   };
  
//   const handleDescriptionChange = (e) => {
//     setFormData(prev => ({ ...prev, channel_description: e.target.value }));
//   };
  
//   const handleTypeChange = (value) => {
//     setFormData(prev => ({ ...prev, type: value }));
//   };
  
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.channel_name) {
//       newErrors.channel_name = 'Please add a channel name';
//     } else if (formData.channel_name.length < 3) {
//       newErrors.channel_name = 'Channel name cannot be less than 3 characters.';
//     } else if (formData.channel_name.length > 50) {
//       newErrors.channel_name = 'Channel name cannot be more than 50 characters.';
//     } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(formData.channel_name)) {
//       newErrors.channel_name = 'Channel name can only contain letters, numbers and hyphens.';
//     }
    
//     if (formData.channel_description.length > 140) {
//       newErrors.channel_description = 'Channel description cannot be more than 140 characters.';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     // Add workspace to the form data
//     const data = {
//       ...formData,
//       workspace: "New admin office construction"
//     };
    
//     const result = await createDoc('Raven Channel', data);
    
//     if (result) {
//       // Update the channel list cache
//       mutate(
//         'channel_list',
//         (data) => ({
//           message: {
//             ...data.message,
//             channels: [...data.message.channels, { ...result }]
//           }
//         }),
//         {
//           revalidate: false
//         }
//       );
      
//       // Show success message
//       console.log('Channel created successfully');
      
//       // Close the dialog
//       handleClose(result.name);
//     }
//   };
  
//   const handleClose = (channelName = null) => {
//     setIsOpen(false);
//     resetForm();
    
//     if (channelName) {
//       console.log(`Navigating to channel: ${channelName}`);
//       // In a real app, you would navigate to the channel
//       // navigate(`raven/New admin office construction/${channelName}`);
//     }
//   };
  
//   const resetForm = () => {
//     resetCreateHook();
//     setFormData({
//       type: 'Public',
//       channel_name: '',
//       channel_description: ''
//     });
//     setErrors({});
//   };
  
//   const getChannelTypeInfo = () => {
//     switch (formData.type) {
//       case 'Private':
//         return {
//           icon: <LockKeyhole className="h-5 w-5 text-gray-500" />,
//           header: 'Create a private channel',
//           helperText: 'When a channel is set to private, it can only be viewed or joined by invitation.'
//         };
//       case 'Open':
//         return {
//           icon: <Globe className="h-5 w-5 text-gray-500" />,
//           header: 'Create an open channel',
//           helperText: 'When a channel is set to open, everyone is a member.'
//         };
//       default:
//         return {
//           icon: <Hash className="h-5 w-5 text-gray-500" />,
//           header: 'Create a public channel',
//           helperText: 'When a channel is set to public, anyone can join the channel and read messages, but only members can post messages.'
//         };
//     }
//   };
  
//   const { icon, header, helperText } = getChannelTypeInfo();
  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
//       {isOpen ? (
//         <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{header}</h2>
//               <button 
//                 onClick={() => handleClose()} 
//                 className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                 aria-label="Close dialog"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//               Channels are where your team communicates. They're best when organized around a topic - #development, for example.
//             </p>
            
//             <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-3 mb-6 flex items-start gap-3">
//               <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
//               <p className="text-sm text-amber-800 dark:text-amber-300">
//                 You cannot create a new channel since you are not an admin of this workspace. Ask an admin to create a channel or make you an admin.
//               </p>
//             </div>
            
//             {channelCreationError && (
//               <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3 mb-6 flex items-start gap-3">
//                 <Info className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-red-800 dark:text-red-300">
//                   {channelCreationError}
//                 </p>
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="channel_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       {icon}
//                     </div>
//                     <input
//                       type="text"
//                       id="channel_name"
//                       value={formData.channel_name}
//                       onChange={handleNameChange}
//                       placeholder="e.g. red-wedding-planning, joffrey-memes"
//                       className={`pl-10 pr-16 py-2.5 bg-gray-50 dark:bg-gray-700 border ${
//                         errors.channel_name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       } text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 w-full`}
//                       required
//                       maxLength={50}
//                       autoFocus
//                     />
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <span className="text-xs text-gray-400">{50 - formData.channel_name.length}</span>
//                     </div>
//                   </div>
//                   {errors.channel_name && (
//                     <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.channel_name}</p>
//                   )}
//                 </div>
                
//                 <div>
//                   <label htmlFor="channel_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Description <span className="text-gray-400 font-normal">(optional)</span>
//                   </label>
//                   <textarea
//                     id="channel_description"
//                     value={formData.channel_description}
//                     onChange={handleDescriptionChange}
//                     placeholder="Great wine and food. What could go wrong?"
//                     rows={3}
//                     className={`py-2.5 px-3 bg-gray-50 dark:bg-gray-700 border ${
//                       errors.channel_description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     } text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 w-full`}
//                     maxLength={140}
//                   />
//                   <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">What is this channel about?</p>
//                   {errors.channel_description && (
//                     <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.channel_description}</p>
//                   )}
//                 </div>
                
//                 <div>
//                   <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Channel Type</span>
//                   <div className="flex flex-wrap gap-4">
//                     <label className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         name="channelType"
//                         value="Public"
//                         checked={formData.type === 'Public'}
//                         onChange={() => handleTypeChange('Public')}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Public</span>
//                     </label>
                    
//                     <label className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         name="channelType"
//                         value="Private"
//                         checked={formData.type === 'Private'}
//                         onChange={() => handleTypeChange('Private')}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Private</span>
//                     </label>
                    
//                     <label className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         name="channelType"
//                         value="Open"
//                         checked={formData.type === 'Open'}
//                         onChange={() => handleTypeChange('Open')}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                       />
//                       <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Open</span>
//                     </label>
//                   </div>
//                   <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 min-h-[3rem]">{helperText}</p>
//                 </div>
//               </div>
              
//               <div className="mt-8 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => handleClose()}
//                   disabled={creatingChannel}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={creatingChannel}
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg transition-colors disabled:opacity-75 flex items-center gap-2"
//                 >
//                   {creatingChannel && (
//                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   )}
//                   {creatingChannel ? 'Saving' : 'Save'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
//           aria-label="Create Channel"
//         >
//           <Plus className="h-5 w-5" />
//         </button>
//       )}
//     </div>
//   );
// }



























import { useFrappeCreateDoc, useFrappeGetCall, useSWRConfig } from 'frappe-react-sdk';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BiGlobe, BiHash, BiInfoCircle, BiLockAlt } from 'react-icons/bi';
import { Loader } from '@/components/common/Loader';
import { ErrorBanner } from '@/components/layout/AlertBanner/ErrorBanner';
import { CustomCallout } from '@/components/common/Callouts/CustomCallout';
import { __ } from '@/utils/translations';

export const CreateChannelModal = ({ isOpen, setIsOpen, refreshChannels }) => {
  // const { workspaceID } = useParams();
  const workspaceID = "New admin office construction"
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const { data: canCreateChannel } = useFrappeGetCall(
    'raven.api.workspaces.can_create_channel',
    { workspace: workspaceID },
    workspaceID ? undefined : null
  );

  const methods = useForm({
    defaultValues: {
      type: 'Public',
      channel_name: '',
      channel_description: ''
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset: resetForm,
    formState: { errors }
  } = methods;

  const {
    createDoc,
    error: channelCreationError,
    loading: creatingChannel,
    reset: resetCreateHook
  } = useFrappeCreateDoc();

  const onClose = (channel_name, workspace) => {
    if (channel_name) {
      // navigate(`raven/${workspace}/${channel_name}`);
      window.location.href = `https://mycardpng.com/raven/${workspace}/${channel_name}`
      mutate(['channel_members', channel_name]);
    }
    setIsOpen(false);
    reset();
  };

  const reset = () => {
    resetCreateHook();
    resetForm();
  };

  const onSubmit = (data) => {
    createDoc('Raven Channel', {
      ...data,
      workspace: workspaceID
    }).then((result) => {
      if (result) {
        mutate(
          'channel_list',
          (data) => ({
            message: {
              ...data.message,
              channels: [...data.message.channels, { ...result }]
            }
          }),
          { revalidate: false }
        );
        toast.success(__('Channel created'));
        refreshChannels();
        onClose(result.name, workspaceID);
      }
    });
  };

  const handleNameChange = useCallback(
    (event) => {
      setValue('channel_name', event.target.value?.toLowerCase().replace(' ', '-'));
    },
    [setValue]
  );

  const channelType = watch('type');

  const { channelIcon, header, helperText } = useMemo(() => {
    switch (channelType) {
      case 'Private':
        return {
          channelIcon: <BiLockAlt />,
          header: __('Create a private channel'),
          helperText: __('Only invited users can view or join.')
        };
      case 'Open':
        return {
          channelIcon: <BiGlobe />,
          header: __('Create an open channel'),
          helperText: __('Everyone in the workspace is a member.')
        };
      default:
        return {
          channelIcon: <BiHash />,
          header: __('Create a public channel'),
          helperText: __('Anyone can read messages. Members can post.')
        };
    }
  }, [channelType]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{header}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {__('Channels are best when organized around a topic.')}
          </p>
        </div>

        {!canCreateChannel?.message && (
          <CustomCallout
            iconChildren={<BiInfoCircle size="18" />}
            rootProps={{ color: 'yellow', variant: 'surface' }}
            textChildren={
              <p className="text-yellow-800">
                You cannot create a new channel since you're not an admin. Ask an admin to create one or make you an admin.
              </p>
            }
          />
        )}

        <ErrorBanner error={channelCreationError} />

        <div>
          <label htmlFor="channel_name" className="block font-medium mb-1">
            {__('Name')} <span className="text-red-500">*</span>
          </label>
          <Controller
            name="channel_name"
            control={control}
            rules={{
              required: __('Please add a channel name'),
              minLength: {
                value: 3,
                message: __('Minimum 3 characters.')
              },
              maxLength: {
                value: 50,
                message: __('Maximum 50 characters.')
              },
              pattern: {
                value: /^[a-zA-Z0-9][a-zA-Z0-9-]*$/,
                message: __('Only letters, numbers, and hyphens allowed.')
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <input
                type="text"
                {...field}
                onChange={handleNameChange}
                maxLength={50}
                className={`w-full px-4 py-2 border rounded-md ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. project-x-team"
              />
            )}
          />
          {errors.channel_name && (
            <p className="text-red-500 text-sm mt-1">{errors.channel_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="channel_description" className="block font-medium mb-1">
            {__('Description')} <span className="text-sm text-gray-400">({__('optional')})</span>
          </label>
          <textarea
            id="channel_description"
            {...register('channel_description', {
              maxLength: {
                value: 140,
                message: __('Max 140 characters.')
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
            maxLength={140}
            placeholder="Describe the channel’s purpose..."
          />
          {errors.channel_description && (
            <p className="text-red-500 text-sm mt-1">{errors.channel_description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">Channel Type</label>
          <div className="flex space-x-4">
            {['Public', 'Private', 'Open'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={type}
                  checked={channelType === type}
                  onChange={() => setValue('type', type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
            disabled={creatingChannel}
          >
            {__('Cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            disabled={creatingChannel}
          >
            {creatingChannel ? (
              <>
                <Loader className="inline mr-2" />
                {__('Saving')}
              </>
            ) : (
              __('Save')
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
