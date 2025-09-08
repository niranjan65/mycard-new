// import React, { useState, useEffect } from 'react';
// import { useFrappeAuth } from 'frappe-react-sdk';
// import RavenConversationList from './RavenConversationList';
// import RavenDirectMessage from './RavenDirectMessage';

// const RavenChatApp = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { currentUser } = useFrappeAuth();
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
//   const [showConversations, setShowConversations] = useState(true);
  
//   // Handle window resize for responsive layout
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobileView(mobile);
      
//       // On desktop, always show both panels
//       if (!mobile) {
//         setShowConversations(true);
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
  
//   // When selecting a user in mobile view, hide the conversation list
//   const handleSelectUser = (userId) => {
//     setSelectedUser(userId);
//     if (isMobileView) {
//       setShowConversations(false);
//     }
//   };
  
//   // Return to conversation list in mobile view
//   const handleBackToList = () => {
//     setShowConversations(true);
//   };
  
//   if (!currentUser) {
//     return <div className="p-4 text-center">Please log in to use the chat.</div>;
//   }

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="bg-white shadow-sm border-b p-3 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Raven Chat</h1>
//         <div className="text-sm text-gray-600">Logged in as: {currentUser}</div>
//       </div>
      
//       <div className="flex-1 flex overflow-hidden">
//         {/* Conversation List Panel */}
//         {(!isMobileView || showConversations) && (
//           <div className={`${isMobileView ? 'w-full' : 'w-1/3 border-r'} bg-white`}>
//             <RavenConversationList 
//               onSelectUser={handleSelectUser} 
//               currentUser={currentUser}
//             />
//           </div>
//         )}
        
//         {/* Messages Panel */}
//         {(!isMobileView || !showConversations) && (
//           <div className={`${isMobileView ? 'w-full' : 'w-2/3'} bg-white flex flex-col`}>
//             {selectedUser ? (
//               <>
//                 {isMobileView && (
//                   <button 
//                     onClick={handleBackToList}
//                     className="p-2 m-2 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
//                   >
//                     ←
//                   </button>
//                 )}
//                 <div className="flex-1 overflow-hidden">
//                   <RavenDirectMessage 
//                     userId={selectedUser} 
//                     currentUser={currentUser}
//                   />
//                 </div>
//               </>
//             ) : (
//               <div className="flex-1 flex items-center justify-center text-gray-500">
//                 Select a conversation to start chatting
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RavenChatApp;




import React, { useState, useEffect } from 'react';
import { useFrappeGetCall } from 'frappe-react-sdk';
import RavenConversationList from './RavenConversationList';
import RavenDirectMessage from './RavenDirectMessage';

const RavenChatApp = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedChannelName, setSelectedChannelName] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showConversations, setShowConversations] = useState(true);
  
  // Get current user
  const { data: userData } = useFrappeGetCall('raven.api.raven_users.get_current_raven_user');
  console.log("User data", userData)
  const currentUser = userData?.message?.user;
  
  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      
      // On desktop, always show both panels
      if (!mobile) {
        setShowConversations(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set up socket for real-time updates
//   useEffect(() => {
//     if (!frappe?.provide_socket) return;
    
//     const socket = frappe.provide_socket();
//     socket.on('raven_message', (data) => {
//       // Handle new message notifications
//       if (data.channel === selectedChannel) {
//         // If the user is viewing this channel, we can trigger a refresh
//         // This will be handled by the message component's own socket handling
//       }
//     });
    
//     return () => {
//       // Cleanup socket event listeners when unmounting
//       if (socket && socket.off) {
//         socket.off('raven_message');
//       }
//     };
//   }, [selectedChannel]);
  
  // When selecting a channel in mobile view, hide the conversation list
  const handleSelectChannel = (channelId, channelName) => {
    setSelectedChannel(channelId);
    setSelectedChannelName(channelName);
    
    if (isMobileView) {
      setShowConversations(false);
    }
  };
  
  // Return to conversation list in mobile view
  const handleBackToList = () => {
    setShowConversations(true);
  };
  
  if (!currentUser) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm border-b p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Raven Chat</h1>
        <div className="text-sm text-gray-600">Logged in as: {currentUser}</div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List Panel */}
        {(!isMobileView || showConversations) && (
          <div className={`${isMobileView ? 'w-full' : 'w-1/3 border-r'} bg-white`}>
            <RavenConversationList 
              onSelectChannel={handleSelectChannel} 
              currentUser={currentUser}
            />
          </div>
        )}
        
        {/* Messages Panel */}
        {(!isMobileView || !showConversations) && (
          <div className={`${isMobileView ? 'w-full' : 'w-2/3'} bg-white flex flex-col`}>
            {selectedChannel ? (
              <>
                {isMobileView && (
                  <button 
                    onClick={handleBackToList}
                    className="p-2 m-2 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ←
                  </button>
                )}
                <div className="flex-1 overflow-hidden">
                  <RavenDirectMessage 
                    channelId={selectedChannel} 
                    channelName={selectedChannelName}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RavenChatApp;