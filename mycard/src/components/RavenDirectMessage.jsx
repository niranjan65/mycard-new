// import React, { useState, useEffect, useRef } from 'react';
// import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';

// const RavenDirectMessage = ({ userId, currentUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);
  
//   // Get conversations list
//   const { data: conversationData, error: conversationError, isLoading: isLoadingConversation } = 
//     useFrappeGetCall('raven.api.direct_message.get_or_create_direct_message', {
//       user: userId,
//     });
  
//   // Get messages for a conversation
//   const fetchMessages = async (conversationName) => {
//     setLoading(true);
//     try {
//       const { data: messagesData } = await useFrappeGetCall('raven.api.direct_message.get_messages', {
//         direct_message: conversationName,
//         limit: 50
//       });
      
//       if (messagesData && messagesData.messages) {
//         setMessages(messagesData.messages);
//       }
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch messages");
//       console.error("Error fetching messages:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Send message API call
//   const { call: sendMessage, loading: sendingMessage } = useFrappePostCall('raven.api.direct_message.send_message');
  
//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);
  
//   // Fetch messages when conversation data is loaded
//   useEffect(() => {
//     if (conversationData && conversationData.direct_message) {
//       fetchMessages(conversationData.direct_message);
//     }
//   }, [conversationData]);
  
//   // Function to handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !conversationData?.direct_message) return;
    
//     try {
//       await sendMessage({
//         direct_message: conversationData.direct_message,
//         content: newMessage
//       });
      
//       // Optimistically add message to UI
//       const newMsg = {
//         content: newMessage,
//         owner: currentUser,
//         creation: new Date().toISOString(),
//         read_by: [currentUser]
//       };
      
//       setMessages(prev => [...prev, newMsg]);
//       setNewMessage('');
      
//       // Refetch messages to ensure consistency
//       fetchMessages(conversationData.direct_message);
//     } catch (err) {
//       console.error("Failed to send message:", err);
//       setError("Failed to send message");
//     }
//   };
  
//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
  
//   if (isLoadingConversation || loading) {
//     return <div className="flex justify-center items-center h-64">Loading conversation...</div>;
//   }
  
//   if (conversationError || error) {
//     return <div className="text-red-500 p-4">Error: {conversationError || error}</div>;
//   }

//   return (
//     <div className="flex flex-col h-full">
//       <div className="bg-gray-100 p-3 border-b">
//         <h2 className="font-medium">Conversation with {userId}</h2>
//       </div>
      
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</div>
//         ) : (
//           messages.map((message, index) => (
//             <div 
//               key={index} 
//               className={`mb-4 flex ${message.owner === currentUser ? 'justify-end' : 'justify-start'}`}
//             >
//               <div 
//                 className={`max-w-3/4 p-3 rounded-lg ${
//                   message.owner === currentUser 
//                     ? 'bg-blue-500 text-white rounded-br-none' 
//                     : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                 }`}
//               >
//                 <div>{message.content}</div>
//                 <div className={`text-xs mt-1 ${message.owner === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
//                   {formatTime(message.creation)}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       <form onSubmit={handleSendMessage} className="border-t p-3 flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//         <button 
//           type="submit"
//           disabled={sendingMessage || !newMessage.trim()} 
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RavenDirectMessage;




// import React, { useState, useEffect, useRef } from 'react';
// import { useFrappeAuth, useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';

// const RavenDirectMessage = ({ channelId, channelName }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);

//   const {currentUser} = useFrappeAuth();
  
//   // Get messages for a DM channel
//   const { data: messagesData, error: messagesError, isLoading: isLoadingMessages, mutate: refreshMessages } = 
//     useFrappeGetCall('raven.api.chat_stream.get_messages', {
//       channel_id: channelId,
//       limit: 50
//     });
  
//   // Send message API call
//   const { call: sendMessage, loading: sendingMessage } = 
//     useFrappePostCall('raven.api.raven_message.send_message');
  
//   // Mark channel as read
//   const { call: markAsRead } = 
//     useFrappePostCall('raven.api.raven_message.mark_channel_as_read');
  
//   // Initialize data
//   useEffect(() => {
//     if (messagesData && messagesData.message) {
//       setMessages(messagesData.message.messages);
//       setLoading(false);
      
//       // Mark channel as read when messages are loaded
//       // if (channelId) {
//       //   markAsRead({ channel: channelId });
//       // }
//     }
//   }, [messagesData, channelId]);
  
//   // Handle errors
//   useEffect(() => {
//     if (messagesError) {
//       setError("Failed to load messages");
//       setLoading(false);
//     }
//   }, [messagesError]);
  
//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);
  
//   // Function to handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !channelId) return;
    
//     try {
//       await sendMessage({
//         channel_id: channelId,
//         text: newMessage,
//         message_type: "DM"
//       });
      
//       setNewMessage('');
//       refreshMessages();
//     } catch (err) {
//       console.error("Failed to send message:", err);
//       setError("Failed to send message");
//     }
//   };
  
//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
  
//   // Format date for message groups
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
    
//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
//     }
//   };
  
//   // Group messages by date
//   const groupMessagesByDate = () => {
//     const groups = [];
//     let currentDate = null;
//     let currentGroup = [];
    
//     messages.forEach(message => {
//       const messageDate = message.creation ? formatDate(message.creation) : '';
      
//       if (messageDate !== currentDate) {
//         if (currentGroup.length > 0) {
//           groups.push({
//             date: currentDate,
//             messages: currentGroup
//           });
//         }
//         currentDate = messageDate;
//         currentGroup = [message];
//       } else {
//         currentGroup.push(message);
//       }
//     });
    
//     if (currentGroup.length > 0) {
//       groups.push({
//         date: currentDate,
//         messages: currentGroup
//       });
//     }
    
//     return groups;
//   };
  
//   if (loading || isLoadingMessages) {
//     return <div className="flex justify-center items-center h-64">Loading messages...</div>;
//   }
  
//   if (error) {
//     return <div className="text-red-500 p-4">Error: {error}</div>;
//   }

//   const messageGroups = groupMessagesByDate();

//   return (
//     <div className="flex flex-col h-full">
//       <div className="bg-gray-100 p-3 border-b">
//         <h2 className="font-medium">Conversation with {channelName}</h2>
//       </div>
      
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</div>
//         ) : (
//           messageGroups.map((group, groupIndex) => (
//             <div key={groupIndex} className="mb-4">
//               <div className="text-center">
//                 <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
//                   {group.date}
//                 </span>
//               </div>
              
//               {group.messages.map((message, index) => (
//                 <div 
//                   key={message.name || index} 
//                   className={`mt-4 flex ${message.owner === currentUser ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-3/4 p-3 rounded-lg ${
//                       message.owner === currentUser 
//                         ? 'bg-blue-500 text-white rounded-br-none' 
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <div>{message.content}</div>
//                     <div className={`text-xs mt-1 ${message.owner === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {formatTime(message.creation)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       <form onSubmit={handleSendMessage} className="border-t p-3 flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//         <button 
//           type="submit"
//           disabled={sendingMessage || !newMessage.trim()} 
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RavenDirectMessage;






// import React, { useState, useEffect, useRef } from 'react';
// import { useFrappeAuth, useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';

// const RavenDirectMessage = ({ channelId, channelName }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);

//   const {currentUser} = useFrappeAuth();
  
//   // Get messages for a DM channel
//   const { data: messagesData, error: messagesError, isLoading: isLoadingMessages, mutate: refreshMessages } = 
//     useFrappeGetCall('raven.api.chat_stream.get_messages', {
//       channel_id: channelId,
//       limit: 50
//     });
  
//   // Send message API call
//   const { call: sendMessage, loading: sendingMessage } = 
//     useFrappePostCall('raven.api.raven_message.send_message');
  
//   // Mark channel as read
//   const { call: markAsRead } = 
//     useFrappePostCall('raven.api.raven_message.mark_channel_as_read');
  
//   // Initialize data
//   useEffect(() => {
//     if (messagesData && messagesData.message) {
//       // Sort messages to ensure oldest first (for proper chronological display)
//       const sortedMessages = [...messagesData.message.messages].sort((a, b) => {
//         return new Date(a.creation) - new Date(b.creation);
//       });
//       setMessages(sortedMessages);
//       setLoading(false);
      
//       // Mark channel as read when messages are loaded
//       if (channelId) {
//         // markAsRead({ channel: channelId });
//       }
//     }
//   }, [messagesData, channelId, markAsRead]);
  
//   // Handle errors
//   useEffect(() => {
//     if (messagesError) {
//       setError("Failed to load messages");
//       setLoading(false);
//     }
//   }, [messagesError]);
  
//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);
  
//   // Function to handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !channelId) return;
    
//     try {
//       await sendMessage({
//         channel_id: channelId,
//         text: newMessage,
//         message_type: "DM"
//       });
      
//       setNewMessage('');
//       refreshMessages();
//     } catch (err) {
//       console.error("Failed to send message:", err);
//       setError("Failed to send message");
//     }
//   };
  
//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
  
//   // Format date for message groups
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
    
//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
//     }
//   };
  
//   // Group messages by date
//   const groupMessagesByDate = () => {
//     const groups = [];
//     let currentDate = null;
//     let currentGroup = [];
    
//     messages.forEach(message => {
//       const messageDate = message.creation ? formatDate(message.creation) : '';
      
//       if (messageDate !== currentDate) {
//         if (currentGroup.length > 0) {
//           groups.push({
//             date: currentDate,
//             messages: currentGroup
//           });
//         }
//         currentDate = messageDate;
//         currentGroup = [message];
//       } else {
//         currentGroup.push(message);
//       }
//     });
    
//     if (currentGroup.length > 0) {
//       groups.push({
//         date: currentDate,
//         messages: currentGroup
//       });
//     }
    
//     return groups;
//   };
  
//   if (loading || isLoadingMessages) {
//     return <div className="flex justify-center items-center h-64">Loading messages...</div>;
//   }
  
//   if (error) {
//     return <div className="text-red-500 p-4">Error: {error}</div>;
//   }

//   const messageGroups = groupMessagesByDate();

//   return (
//     <div className="flex flex-col h-full">
//       <div className="bg-gray-100 p-3 border-b">
//         <h2 className="font-medium">Conversation with {channelName}</h2>
//       </div>
      
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</div>
//         ) : (
//           messageGroups.map((group, groupIndex) => (
//             <div key={groupIndex} className="mb-4">
//               <div className="text-center">
//                 <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
//                   {group.date}
//                 </span>
//               </div>
              
//               {group.messages.map((message, index) => (
//                 <div 
//                   key={message.name || index} 
//                   className={`mt-4 flex ${message.owner === currentUser ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-3/4 p-3 rounded-lg ${
//                       message.owner === currentUser 
//                         ? 'bg-blue-500 text-white rounded-br-none' 
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <div>{message.content}</div>
//                     <div className={`text-xs mt-1 ${message.owner === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {formatTime(message.creation)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       <form onSubmit={handleSendMessage} className="border-t p-3 flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//         <button 
//           type="submit"
//           disabled={sendingMessage || !newMessage.trim()} 
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RavenDirectMessage;




















// import React, { useState, useEffect, useRef } from 'react';
// import { useFrappeAuth, useFrappeGetCall, useFrappePostCall, useFrappeEventListener } from 'frappe-react-sdk';

// const RavenDirectMessage = ({ channelId, channelName }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);
//   const scrollContainerRef = useRef(null);
  
//   const {currentUser} = useFrappeAuth();
  
//   // Get messages for a DM channel
//   const { data: messagesData, error: messagesError, isLoading, mutate: refreshMessages } = 
//     useFrappeGetCall('raven.api.chat_stream.get_messages', {
//       channel_id: channelId,
//       limit: 50
//     }, { revalidateOnFocus: true });
  
//   // Send message API call
//   const { call: sendMessage, loading: sendingMessage } = 
//     useFrappePostCall('raven.api.raven_message.send_message');
  
//   // Mark channel as read
//   const { call: markAsRead } = 
//     useFrappePostCall('raven.api.raven_message.mark_channel_as_read');
  
//   // Initialize data and mark as read
//   // useEffect(() => {
//   //   if (messagesData && messagesData.message && channelId) {
//   //     markAsRead({ channel: channelId });
//   //   }
//   // }, [messagesData, channelId, markAsRead]);
  
//   // Handle errors
//   useEffect(() => {
//     if (messagesError) {
//       setError("Failed to load messages");
//     }
//   }, [messagesError]);
  
//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       scrollToBottom();
//     }
//   }, [messagesData]);

//   // Optimized scroll to bottom function with multiple attempts for reliability
//   const scrollToBottom = (behavior = 'auto') => {
//     if (!scrollContainerRef.current) return;

//     // First immediate scroll attempt
//     requestAnimationFrame(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTo({
//           top: scrollContainerRef.current.scrollHeight,
//           behavior
//         });
//       }
//     });

//     // Second attempt after a short delay
//     const shortDelayTimer = setTimeout(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTo({
//           top: scrollContainerRef.current.scrollHeight,
//           behavior
//         });
//       }
//     }, 100);

//     // Final backup attempt after longer delay
//     const backupTimer = setTimeout(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTo({
//           top: scrollContainerRef.current.scrollHeight,
//           behavior
//         });
//       }
//     }, 500);

//     return () => {
//       clearTimeout(shortDelayTimer);
//       clearTimeout(backupTimer);
//     };
//   };
  
//   // Listen for real-time message events
//   useFrappeEventListener('message_created', (event) => {
//     if (event.channel_id === channelId) {
//       mutateMessages(event.message_details);
//     }
//   });

//   // Function to update messages state with new message
//   const mutateMessages = (newMessageData) => {
//     refreshMessages((current) => {
//       if (!current || !current.message) return current;
      
//       const existingMessages = current.message.messages || [];
//       const messageIndex = existingMessages.findIndex(msg => msg.name === newMessageData.name);
      
//       let updatedMessages;
//       if (messageIndex !== -1) {
//         // Update existing message
//         updatedMessages = [...existingMessages];
//         updatedMessages[messageIndex] = newMessageData;
//       } else {
//         // Add new message
//         updatedMessages = [...existingMessages, newMessageData];
//       }
      
//       // Sort messages by creation date
//       updatedMessages.sort((a, b) => new Date(a.creation) - new Date(b.creation));
      
//       return {
//         ...current,
//         message: {
//           ...current.message,
//           messages: updatedMessages
//         }
//       };
//     }, { revalidate: false }).then(() => {
//       // Check if we should scroll to bottom (if user sent message or was already at bottom)
//       if (scrollContainerRef.current) {
//         const isNearBottom = scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
//           scrollContainerRef.current.scrollHeight - 100;

//         if (isNearBottom || newMessageData.owner === currentUser) {
//           scrollToBottom('smooth'); // Smooth scroll for better UX
//         }
//       }
//     });
//   };
  
//   // Function to handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !channelId) return;
    
//     try {
//       // Create a temporary message object for immediate display
//       const tempMessage = {
//         content: newMessage,
//         owner: currentUser,
//         creation: new Date().toISOString(),
//         name: `temp-${Date.now()}`, // Temporary ID
//       };
      
//       // Add temporary message to the UI immediately
//       mutateMessages(tempMessage);
      
//       // Clear input field
//       setNewMessage('');
      
//       // Send message to server
//       await sendMessage({
//         channel_id: channelId,
//         text: newMessage,
//         message_type: "DM"
//       });
      
//       // No need to call refreshMessages since the WebSocket event will handle it
//     } catch (err) {
//       console.error("Failed to send message:", err);
//       setError("Failed to send message");
      
//       // Remove the temporary message if sending failed
//       refreshMessages((current) => {
//         if (!current || !current.message) return current;
        
//         return {
//           ...current,
//           message: {
//             ...current.message,
//             messages: current.message.messages.filter(msg => !msg.name.startsWith('temp-'))
//           }
//         };
//       }, { revalidate: false });
//     }
//   };
  
//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
  
//   // Format date for message groups
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
    
//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
//     }
//   };
  
//   // Group messages by date
//   const groupMessagesByDate = () => {
//     const messages = messagesData?.message?.messages || [];
//     const groups = [];
//     let currentDate = null;
//     let currentGroup = [];
    
//     messages.forEach(message => {
//       const messageDate = message.creation ? formatDate(message.creation) : '';
      
//       if (messageDate !== currentDate) {
//         if (currentGroup.length > 0) {
//           groups.push({
//             date: currentDate,
//             messages: currentGroup
//           });
//         }
//         currentDate = messageDate;
//         currentGroup = [message];
//       } else {
//         currentGroup.push(message);
//       }
//     });
    
//     if (currentGroup.length > 0) {
//       groups.push({
//         date: currentDate,
//         messages: currentGroup
//       });
//     }
    
//     return groups;
//   };
  
//   if (isLoading) {
//     return <div className="flex justify-center items-center h-64">Loading messages...</div>;
//   }
  
//   if (error) {
//     return <div className="text-red-500 p-4">Error: {error}</div>;
//   }

//   const messageGroups = groupMessagesByDate();

//   return (
//     <div className="flex flex-col h-full">
//       <div className="bg-gray-100 p-3 border-b">
//         <h2 className="font-medium">Conversation with {channelName}</h2>
//       </div>
      
//       <div 
//         ref={scrollContainerRef}
//         className="flex-1 overflow-y-auto p-4"
//       >
//         {!messagesData?.message?.messages || messagesData.message.messages.length === 0 ? (
//           <div className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</div>
//         ) : (
//           messageGroups.map((group, groupIndex) => (
//             <div key={groupIndex} className="mb-4">
//               <div className="text-center">
//                 <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
//                   {group.date}
//                 </span>
//               </div>
              
//               {group.messages.map((message, index) => (
//                 <div 
//                   key={message.name || `temp-${index}`} 
//                   id={`message-${message.name}`}
//                   className={`mt-4 flex ${message.owner === currentUser ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-3/4 p-3 rounded-lg ${
//                       message.owner === currentUser 
//                         ? `bg-blue-500 text-white rounded-br-none ${message.name?.startsWith('temp-') ? 'opacity-70' : ''}` 
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <div>{message.content}</div>
//                     <div className={`text-xs mt-1 ${message.owner === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {formatTime(message.creation)}
//                       {message.name?.startsWith('temp-') && ' (sending...)'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       <form onSubmit={handleSendMessage} className="border-t p-3 flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//         <button 
//           type="submit"
//           disabled={sendingMessage || !newMessage.trim()} 
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RavenDirectMessage;













// import React, { useState, useEffect, useRef } from 'react';
// import { useFrappeAuth, useFrappeGetCall, useFrappePostCall, useFrappeEventListener } from 'frappe-react-sdk';

// const RavenDirectMessage = ({ channelId, channelName }) => {
//   const [newMessage, setNewMessage] = useState('');
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);
//   const scrollContainerRef = useRef(null);
  
//   const { currentUser } = useFrappeAuth();
  
//   // Get messages for a DM channel
//   const { data: messagesData, error: messagesError, isLoading, mutate: refreshMessages } = 
//     useFrappeGetCall('raven.api.chat_stream.get_messages', {
//       channel_id: channelId,
//       limit: 50
//     }, 
//     { key: `get_messages_for_channel_${channelId}` }, // Add a unique key for this query
//     { revalidateOnFocus: true });
  
//   // Send message API call
//   const { call: sendMessage, loading: sendingMessage } = 
//     useFrappePostCall('raven.api.raven_message.send_message');
  
//   // Mark channel as read
//   const { call: markAsRead } = 
//     useFrappePostCall('raven.api.raven_message.mark_channel_as_read');
  
//   // Initialize data and mark as read
//   useEffect(() => {
//     if (messagesData && messagesData.message && channelId) {
//       markAsRead({ channel: channelId });
//     }
//   }, [messagesData, channelId, markAsRead]);
  
//   // Handle errors
//   useEffect(() => {
//     if (messagesError) {
//       setError("Failed to load messages");
//     }
//   }, [messagesError]);
  
//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       scrollToBottom();
//     }
//   }, [messagesData]);

//   // Optimized scroll to bottom function with multiple attempts for reliability
//   const scrollToBottom = (behavior = 'auto') => {
//     if (!scrollContainerRef.current) return;

//     // First immediate scroll attempt
//     requestAnimationFrame(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTo({
//           top: scrollContainerRef.current.scrollHeight,
//           behavior
//         });
//       }
//     });

//     // Second attempt after a short delay
//     const shortDelayTimer = setTimeout(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTo({
//           top: scrollContainerRef.current.scrollHeight,
//           behavior
//         });
//       }
//     }, 100);

//     // Final backup attempt after longer delay
//     const backupTimer = setTimeout(() => {
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTo({
//           top: scrollContainerRef.current.scrollHeight,
//           behavior
//         });
//       }
//     }, 500);

//     return () => {
//       clearTimeout(shortDelayTimer);
//       clearTimeout(backupTimer);
//     };
//   };
  
//   // Listen for real-time message events - this is crucial for real-time updates
//   useFrappeEventListener('message_created', (event) => {
//     // Only process events for this channel
//     if (event.channel_id === channelId) {
//       console.log("New message received via WebSocket:", event);
      
//       refreshMessages((current) => {
//         if (!current || !current.message) return current;
        
//         const existingMessages = current.message.messages || [];
        
//         // Check if the message is already in our list
//         const messageIndex = existingMessages.findIndex(msg => 
//           msg.name === event.message_details.name);
        
//         // If the message is not in our list or it's a temporary message being replaced
//         if (messageIndex === -1) {
//           // Add the new message to our list
//           const updatedMessages = [...existingMessages, event.message_details];
          
//           // Sort messages by creation time - oldest first for chat display
//           updatedMessages.sort((a, b) => 
//             new Date(a.creation).getTime() - new Date(b.creation).getTime()
//           );
          
//           return {
//             ...current,
//             message: {
//               ...current.message,
//               messages: updatedMessages,
//               has_new_messages: false,
//               has_old_messages: current.message.has_old_messages
//             }
//           };
//         }
        
//         // If message already exists (maybe from our optimistic update), update it
//         const updatedMessages = [...existingMessages];
//         updatedMessages[messageIndex] = event.message_details;
        
//         return {
//           ...current,
//           message: {
//             ...current.message,
//             messages: updatedMessages,
//             has_new_messages: false,
//             has_old_messages: current.message.has_old_messages
//           }
//         };
//       }, { 
//         revalidate: false 
//       }).then(() => {
//         // Check if we should scroll to bottom
//         if (scrollContainerRef.current) {
//           const isNearBottom = scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
//             scrollContainerRef.current.scrollHeight - 100;

//           if (isNearBottom || event.message_details.owner === currentUser) {
//             scrollToBottom('smooth');
//           }
//         }
//       });
//     }
//   });

//   // Function to handle sending a new message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !channelId) return;
    
//     try {
//       // Create a temporary message object for immediate display (optimistic UI)
//       const tempMessage = {
//         content: newMessage,
//         owner: currentUser,
//         creation: new Date().toISOString(),
//         name: `temp-${Date.now()}`, // Temporary ID
//         message_type: "Text",       // Important to match expected type
//       };
      
//       // Optimistically add message to UI
//       refreshMessages((current) => {
//         if (!current || !current.message) return current;
        
//         const existingMessages = current.message.messages || [];
//         const updatedMessages = [...existingMessages, tempMessage];
        
//         // Sort messages by creation time - oldest first
//         updatedMessages.sort((a, b) => 
//           new Date(a.creation).getTime() - new Date(b.creation).getTime()
//         );
        
//         return {
//           ...current,
//           message: {
//             ...current.message,
//             messages: updatedMessages
//           }
//         };
//       }, { revalidate: false });
      
//       // Clear input field
//       setNewMessage('');
      
//       // Send message to server
//       await sendMessage({
//         channel_id: channelId,
//         text: newMessage,
//         message_type: "DM"
//       });
      
//       // The WebSocket event will handle updating with the real message
      
//     } catch (err) {
//       console.error("Failed to send message:", err);
//       setError("Failed to send message");
      
//       // Remove the temporary message if sending failed
//       refreshMessages((current) => {
//         if (!current || !current.message) return current;
        
//         return {
//           ...current,
//           message: {
//             ...current.message,
//             messages: current.message.messages.filter(msg => !msg.name.startsWith('temp-'))
//           }
//         };
//       }, { revalidate: false });
//     }
//   };
  
//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
  
//   // Format date for message groups
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
    
//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
//     }
//   };
  
//   // Group messages by date
//   const groupMessagesByDate = () => {
//     const messages = messagesData?.message?.messages || [];
//     const groups = [];
//     let currentDate = null;
//     let currentGroup = [];
    
//     messages.forEach(message => {
//       const messageDate = message.creation ? formatDate(message.creation) : '';
      
//       if (messageDate !== currentDate) {
//         if (currentGroup.length > 0) {
//           groups.push({
//             date: currentDate,
//             messages: currentGroup
//           });
//         }
//         currentDate = messageDate;
//         currentGroup = [message];
//       } else {
//         currentGroup.push(message);
//       }
//     });
    
//     if (currentGroup.length > 0) {
//       groups.push({
//         date: currentDate,
//         messages: currentGroup
//       });
//     }
    
//     return groups;
//   };
  
//   if (isLoading) {
//     return <div className="flex justify-center items-center h-64">Loading messages...</div>;
//   }
  
//   if (error) {
//     return <div className="text-red-500 p-4">Error: {error}</div>;
//   }

//   const messageGroups = groupMessagesByDate();

//   return (
//     <div className="flex flex-col h-full">
//       <div className="bg-gray-100 p-3 border-b">
//         <h2 className="font-medium">Conversation with {channelName}</h2>
//       </div>
      
//       <div 
//         ref={scrollContainerRef}
//         className="flex-1 overflow-y-auto p-4"
//       >
//         {!messagesData?.message?.messages || messagesData.message.messages.length === 0 ? (
//           <div className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</div>
//         ) : (
//           messageGroups.map((group, groupIndex) => (
//             <div key={groupIndex} className="mb-4">
//               <div className="text-center">
//                 <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
//                   {group.date}
//                 </span>
//               </div>
              
//               {group.messages.map((message, index) => (
//                 <div 
//                   key={message.name || `temp-${index}`} 
//                   id={`message-${message.name}`}
//                   className={`mt-4 flex ${message.owner === currentUser ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-3/4 p-3 rounded-lg ${
//                       message.owner === currentUser 
//                         ? `bg-blue-500 text-white rounded-br-none ${message.name?.startsWith('temp-') ? 'opacity-70' : ''}` 
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <div>{message.content}</div>
//                     <div className={`text-xs mt-1 ${message.owner === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {formatTime(message.creation)}
//                       {message.name?.startsWith('temp-') && ' (sending...)'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       <form onSubmit={handleSendMessage} className="border-t p-3 flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//         <button 
//           type="submit"
//           disabled={sendingMessage || !newMessage.trim()} 
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RavenDirectMessage;











import React, { useState, useEffect, useRef } from 'react';
import { useFrappeAuth, useFrappeGetCall, useFrappePostCall, useFrappeEventListener } from 'frappe-react-sdk';

const RavenDirectMessage = ({ channelId, channelName }) => {
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  const { currentUser } = useFrappeAuth();
  
  // Debug information
  const [debugInfo, setDebugInfo] = useState({
    lastEventTime: null,
    eventsReceived: 0,
    socketConnected: false
  });
  
  // Get messages for a DM channel
  const { data: messagesData, error: messagesError, isLoading, mutate: refreshMessages } = 
    useFrappeGetCall('raven.api.chat_stream.get_messages', {
      channel_id: channelId,
      limit: 50
    }, 
    { key: `get_messages_for_channel_${channelId}` },
    { revalidateOnFocus: true });
  
  // Send message API call
  const { call: sendMessage, loading: sendingMessage } = 
    useFrappePostCall('raven.api.raven_message.send_message');
  
  // Mark channel as read
  const { call: markAsRead } = 
    useFrappePostCall('raven.api.raven_message.mark_channel_as_read');
  
  // Initialize data and mark as read
  useEffect(() => {
    if (messagesData && messagesData.message && channelId) {
      markAsRead({ channel: channelId });
    }
  }, [messagesData, channelId, markAsRead]);

  // Log component initialization
  useEffect(() => {
    console.log(`RavenDirectMessage component initialized for channel: ${channelId}`);
    
    // Create a connection status check
    const checkSocketStatus = () => {
      // This is just a proxy check - ideally you'd check the actual socket status
      // from frappe-react-sdk if they expose that information
      setDebugInfo(prev => ({
        ...prev,
        socketConnected: window.socket && window.socket.readyState === 1
      }));
    };
    
    checkSocketStatus();
    const intervalId = setInterval(checkSocketStatus, 5000);
    
    return () => {
      clearInterval(intervalId);
      console.log(`RavenDirectMessage component unmounted for channel: ${channelId}`);
    };
  }, [channelId]);
  
  // Handle errors
  useEffect(() => {
    if (messagesError) {
      console.error("Error loading messages:", messagesError);
      setError("Failed to load messages");
    }
  }, [messagesError]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messagesData]);

  // Optimized scroll to bottom function with multiple attempts for reliability
  const scrollToBottom = (behavior = 'auto') => {
    if (!scrollContainerRef.current) return;

    // First immediate scroll attempt
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior
        });
      }
    });

    // Second attempt after a short delay
    const shortDelayTimer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior
        });
      }
    }, 100);

    // Final backup attempt after longer delay
    const backupTimer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior
        });
      }
    }, 500);

    return () => {
      clearTimeout(shortDelayTimer);
      clearTimeout(backupTimer);
    };
  };
  
  // Listen for websocket connection events if frappe exposes them
  useEffect(() => {
    // This is an example - adjust based on what events frappe-react-sdk actually exposes
    const handleSocketOpen = () => {
      console.log("WebSocket connection established");
      setDebugInfo(prev => ({ ...prev, socketConnected: true }));
    };
    
    const handleSocketClose = () => {
      console.log("WebSocket connection closed");
      setDebugInfo(prev => ({ ...prev, socketConnected: false }));
    };
    
    // Add event listeners if these are exposed in your frappe-react-sdk
    // window.socket.addEventListener('open', handleSocketOpen);
    // window.socket.addEventListener('close', handleSocketClose);
    
    return () => {
      // window.socket.removeEventListener('open', handleSocketOpen);
      // window.socket.removeEventListener('close', handleSocketClose);
    };
  }, []);
  
  // Listen for ALL events to debug what's coming through
  useFrappeEventListener('*', (event) => {
    console.log("WebSocket event received:", event);
    setDebugInfo(prev => ({
      ...prev,
      eventsReceived: prev.eventsReceived + 1,
      lastEventTime: new Date().toISOString()
    }));
  });
  
  // Listen for real-time message events - this is crucial for real-time updates
  useFrappeEventListener('message_created', (event) => {
    console.log("Raw message_created event received:", event);
    console.log(`Current channelId: ${channelId}, Event channelId: ${event.channel_id}`);
    
    // Only process events for this channel
    if (event.channel_id === channelId) {
      console.log("New message received via WebSocket for this channel:", event);
      
      refreshMessages((current) => {
        if (!current || !current.message) return current;
        
        const existingMessages = current.message.messages || [];
        
        // Check if the message is already in our list
        const messageIndex = existingMessages.findIndex(msg => 
          msg.name === event.message_details.name);
        
        // If the message is not in our list or it's a temporary message being replaced
        if (messageIndex === -1) {
          // Add the new message to our list
          const updatedMessages = [...existingMessages, event.message_details];
          
          // Sort messages by creation time - oldest first for chat display
          updatedMessages.sort((a, b) => 
            new Date(a.creation).getTime() - new Date(b.creation).getTime()
          );
          
          return {
            ...current,
            message: {
              ...current.message,
              messages: updatedMessages,
              has_new_messages: false,
              has_old_messages: current.message.has_old_messages
            }
          };
        }
        
        // If message already exists (maybe from our optimistic update), update it
        const updatedMessages = [...existingMessages];
        updatedMessages[messageIndex] = event.message_details;
        
        return {
          ...current,
          message: {
            ...current.message,
            messages: updatedMessages,
            has_new_messages: false,
            has_old_messages: current.message.has_old_messages
          }
        };
      }, { 
        revalidate: false 
      }).then(() => {
        // Check if we should scroll to bottom
        if (scrollContainerRef.current) {
          const isNearBottom = scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
            scrollContainerRef.current.scrollHeight - 100;

          if (isNearBottom || event.message_details.owner === currentUser) {
            scrollToBottom('smooth');
          }
        }
      });
    } else {
      console.log("Message received for different channel - ignoring");
    }
  });

  // Function to handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !channelId) return;
    
    console.log(`Attempting to send message to channel: ${channelId}`);
    
    try {
      // Create a temporary message object for immediate display (optimistic UI)
      const tempMessage = {
        content: newMessage,
        owner: currentUser,
        creation: new Date().toISOString(),
        name: `temp-${Date.now()}`, // Temporary ID
        message_type: "Text",       // Important to match expected type
      };
      
      // Optimistically add message to UI
      refreshMessages((current) => {
        if (!current || !current.message) return current;
        
        const existingMessages = current.message.messages || [];
        const updatedMessages = [...existingMessages, tempMessage];
        
        // Sort messages by creation time - oldest first
        updatedMessages.sort((a, b) => 
          new Date(a.creation).getTime() - new Date(b.creation).getTime()
        );
        
        return {
          ...current,
          message: {
            ...current.message,
            messages: updatedMessages
          }
        };
      }, { revalidate: false });
      
      // Clear input field
      setNewMessage('');
      
      // Send message to server
      console.log("Sending message to server...");
      const response = await sendMessage({
        channel_id: channelId,
        text: newMessage,
        message_type: "DM"
      });
      
      console.log("Server response:", response);
      // The WebSocket event will handle updating with the real message
      
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message");
      
      // Remove the temporary message if sending failed
      refreshMessages((current) => {
        if (!current || !current.message) return current;
        
        return {
          ...current,
          message: {
            ...current.message,
            messages: current.message.messages.filter(msg => !msg.name.startsWith('temp-'))
          }
        };
      }, { revalidate: false });
    }
  };
  
  // Format timestamp to readable format
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for message groups
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const messages = messagesData?.message?.messages || [];
    const groups = [];
    let currentDate = null;
    let currentGroup = [];
    
    messages.forEach(message => {
      const messageDate = message.creation ? formatDate(message.creation) : '';
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup
          });
        }
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentGroup
      });
    }
    
    return groups;
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading messages...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-3 border-b">
        <h2 className="font-medium">Conversation with {channelName}</h2>
        
        {/* Debug info - Remove in production */}
        <div className="text-xs text-gray-500 mt-1">
          <span>WebSocket: {debugInfo.socketConnected ? '✅ Connected' : '❌ Disconnected'}</span> | 
          <span> Events: {debugInfo.eventsReceived}</span>
          {debugInfo.lastEventTime && <span> | Last event: {new Date(debugInfo.lastEventTime).toLocaleTimeString()}</span>}
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {!messagesData?.message?.messages || messagesData.message.messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</div>
        ) : (
          messageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <div className="text-center">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  {group.date}
                </span>
              </div>
              
              {group.messages.map((message, index) => (
                <div 
                  key={message.name || `temp-${index}`} 
                  id={`message-${message.name}`}
                  className={`mt-4 flex ${message.owner === currentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 p-3 rounded-lg ${
                      message.owner === currentUser 
                        ? `bg-blue-500 text-white rounded-br-none ${message.name?.startsWith('temp-') ? 'opacity-70' : ''}` 
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div>{message.content}</div>
                    <div className={`text-xs mt-1 ${message.owner === currentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      {formatTime(message.creation)}
                      {message.name?.startsWith('temp-') && ' (sending...)'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-3 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button 
          type="submit"
          disabled={sendingMessage || !newMessage.trim()} 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RavenDirectMessage;