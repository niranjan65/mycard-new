// import React, { useState, useEffect } from 'react';
// import { useFrappeGetCall } from 'frappe-react-sdk';

// const RavenConversationList = ({ onSelectUser, currentUser }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState([]);
  
//   // Get conversations list
//   const { data: conversationsData, error, isLoading, refetch } = 
//     useFrappeGetCall('raven.api.raven_users.get_list');
  
//   // Get users for potential new conversations
//   const { data: usersData, isLoading: isLoadingUsers } = 
//     useFrappeGetCall('raven.api.direct_message.get_users');
  
//   // Combine existing conversations with potential new ones
//   useEffect(() => {
//     if (conversationsData && usersData) {
//       const existingUserIds = new Set(
//         conversationsData.direct_messages.map(convo => 
//           convo.members.find(member => member !== currentUser)
//         )
//       );
      
//       // Filter users who aren't already in conversations and match search term
//       const availableUsers = usersData.users.filter(user => 
//         user !== currentUser && 
//         !existingUserIds.has(user) &&
//         user.toLowerCase().includes(searchTerm.toLowerCase())
//       );
      
//       // Add them as potential new conversations
//       setFilteredUsers(availableUsers);
//     }
//   }, [conversationsData, usersData, searchTerm, currentUser]);
  
//   // Format time for last message display
//   const formatLastActive = (timestamp) => {
//     if (!timestamp) return 'No messages';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (diffDays === 1) {
//       return 'Yesterday';
//     } else if (diffDays < 7) {
//       return date.toLocaleDateString([], { weekday: 'short' });
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//     }
//   };
  
//   const handleUserSelect = (userId) => {
//     if (onSelectUser) {
//       onSelectUser(userId);
//     }
//   };
  
//   const startNewConversation = async (userId) => {
//     try {
//       // This will either get an existing conversation or create a new one
//       handleUserSelect(userId);
//       // Refresh the conversation list
//       refetch();
//     } catch (err) {
//       console.error("Failed to start conversation:", err);
//     }
//   };
  
//   if (isLoading || isLoadingUsers) {
//     return <div className="p-4 text-center">Loading conversations...</div>;
//   }
  
//   if (error) {
//     return <div className="p-4 text-red-500">Error loading conversations</div>;
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-3">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       </div>
      
//       <div className="flex-1 overflow-y-auto">
//         <h3 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Recent Conversations
//         </h3>
        
//         {conversationsData && conversationsData.direct_messages.length > 0 ? (
//           conversationsData.direct_messages
//             .filter(convo => {
//               const otherUser = convo.members.find(member => member !== currentUser);
//               return otherUser.toLowerCase().includes(searchTerm.toLowerCase());
//             })
//             .map(conversation => {
//               const otherUser = conversation.members.find(member => member !== currentUser);
//               return (
//                 <div 
//                   key={conversation.name}
//                   onClick={() => handleUserSelect(otherUser)}
//                   className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between border-b"
//                 >
//                   <div>
//                     <div className="font-medium">{otherUser}</div>
//                     <div className="text-sm text-gray-500 truncate">
//                       {conversation.last_message ? conversation.last_message.substring(0, 30) : 'No messages'}
//                       {conversation.last_message && conversation.last_message.length > 30 ? '...' : ''}
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {formatLastActive(conversation.modified)}
//                   </div>
//                 </div>
//               );
//             })
//         ) : (
//           <div className="px-3 py-2 text-sm text-gray-500">No conversations yet</div>
//         )}
        
//         {filteredUsers.length > 0 && (
//           <>
//             <h3 className="px-3 py-2 mt-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Start New Conversation
//             </h3>
            
//             {filteredUsers.map(user => (
//               <div 
//                 key={user}
//                 onClick={() => startNewConversation(user)}
//                 className="p-3 hover:bg-gray-100 cursor-pointer flex items-center border-b"
//               >
//                 <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
//                   {user.substring(0, 1).toUpperCase()}
//                 </div>
//                 <div className="font-medium">{user}</div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RavenConversationList;














// import React, { useState, useEffect } from 'react';
// import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';

// const RavenConversationList = ({ onSelectChannel, currentUser }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState([]);


//   console.log("Filtered users", filteredUsers)
  
//   // Get all DM channels
//   const { data: channelsData, error: channelsError, isLoading: isLoadingChannels, mutate: refreshChannels } = 
//     useFrappeGetCall('raven.api.raven_channel.get_all_channels', {
//       hide_archived: true
//     });
  
//   // Get active users for potential new conversations
//   const { data: usersData, isLoading: isLoadingUsers } = 
//     useFrappeGetCall('raven.api.user_availability.get_active_users');
  
//   // Get unread count for channels
//   const { data: unreadData } = 
//     useFrappeGetCall('raven.api.raven_message.get_unread_count_for_channels');
  
//   // API to create a new DM channel
//   const { call: createDMChannel } = 
//     useFrappePostCall('raven.api.raven_channel.create_direct_message_channel');
  
//   // Filter DM channels and potential new users based on search
//   // useEffect(() => {
//   //   if (usersData && usersData.message) {
//   //     let existingDmUsers = new Set();
      
//   //     // Extract users from existing DM channels
//   //     if (channelsData && channelsData?.message?.dm_channels) {
//   //       channelsData?.message.dm_channels.forEach(channel => {
//   //         const otherUser = extractUserFromChannelName(channel.channel_name, currentUser);
//   //         existingDmUsers.add(otherUser);
//   //       });
//   //     }
      
//   //     // Filter users who aren't already in conversations and match search term
//   //     const availableUsers = usersData.message.filter(user => 
//   //       user !== currentUser && 
//   //       !existingDmUsers.has(user) &&
//   //       user.toLowerCase().includes(searchTerm.toLowerCase())
//   //     );
      
//   //     setFilteredUsers(availableUsers);
//   //   }
//   // }, [channelsData, usersData, searchTerm, currentUser]);

// //   useEffect(() => {
// //   if (usersData && usersData.message) {
// //     console.log("Users Data:", usersData.message);
// //     console.log("Channels Data:", channelsData?.message?.dm_channels);

// //     let existingDmUsers = new Set();

// //     if (channelsData && channelsData?.message?.dm_channels) {
// //       channelsData?.message.dm_channels.forEach(channel => {
// //         const otherUser = extractUserFromChannelName(channel.channel_name, currentUser);
// //         existingDmUsers.add(otherUser);
// //       });
// //     }

// //     const availableUsers = usersData.message
// //       .filter(user => user !== currentUser)
// //       .filter(user => !existingDmUsers.has(user))
// //       .filter(user => user.toLowerCase().includes(searchTerm.toLowerCase()));

// //     console.log("Filtered Users:", availableUsers);
// //     // setFilteredUsers(availableUsers);
// //     setFilteredUsers(channelsData?.message?.dm_channels)
// //   }
// // }, [channelsData, usersData, searchTerm, currentUser]);

// useEffect(() => {
//   if (usersData && usersData.message) {
//     let existingDmUsers = new Set();

//     // Extract users from existing DM channels
//     if (channelsData && channelsData?.message?.dm_channels) {
//       channelsData?.message.dm_channels.forEach(channel => {
//         const otherUser = extractUserFromChannelName(channel, currentUser);
//         if (otherUser) {
//           existingDmUsers.add(otherUser);
//         }
//       });
//     }

//     // Filter users who aren't already in conversations and match the search term
//     const availableUsers = usersData.message
//       .filter(user => user !== currentUser) // Exclude the current user

//       console.log("Filter wala user", usersData)
//       // .filter(user => !existingDmUsers.has(user)) // Exclude users already in conversations
//       // .filter(user => user.toLowerCase().includes(searchTerm.toLowerCase())); // Match the search term

//     // setFilteredUsers(availableUsers);
//     setFilteredUsers(channelsData?.message?.dm_channels);
//   }
// }, [channelsData, usersData, searchTerm, currentUser]);
  
//   // Helper to extract the other user's email from a DM channel name
//   // const extractUserFromChannelName = (channelName, currentUser) => {
//   //   if (!channelName) return '';
//   //   // Assume channel_name format is "user1@example.com,user2@example.com"
//   //   const users = channelName.split(',');
//   //   return users.find(user => user !== currentUser) || '';
//   // };

//   const extractUserFromChannelName = (channel, currentUser) => {
//   if (!channel) return '';
//   // Use the peer_user_id field to get the other user
//   return channel.peer_user_id !== currentUser ? channel.peer_user_id : '';
// };
  
//   // Format time for last message display
//   const formatLastActive = (timestamp) => {
//     if (!timestamp) return '';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (diffDays === 1) {
//       return 'Yesterday';
//     } else if (diffDays < 7) {
//       return date.toLocaleDateString([], { weekday: 'short' });
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//     }
//   };
  
//   // Get unread count for a specific channel
//   const getUnreadCount = (channelId) => {
//     if (!unreadData || !unreadData.unread_count) return 0;
//     return unreadData.unread_count[channelId] || 0;
//   };
  
//   // Handle selecting an existing DM channel
//   const handleSelectChannel = (channelId, channelName) => {
//     if (onSelectChannel) {
//       onSelectChannel(channelId, extractUserFromChannelName(channelName, currentUser));
//     }
//   };
  
//   // Start a new conversation with a user
//   const startNewConversation = async (userId) => {
//     try {
//       const result = await createDMChannel({
//         user_id: userId
//       });
      
//       if (result && result.message) {
//         // Refresh the channel list
//         refreshChannels();
//         // Select the newly created channel
//         handleSelectChannel(result.message, result.message);
//       }
//     } catch (err) {
//       console.error("Failed to create conversation:", err);
//     }
//   };
  
//   if (isLoadingChannels || isLoadingUsers) {
//     return <div className="p-4 text-center">Loading conversations...</div>;
//   }
  
//   if (channelsError) {
//     return <div className="p-4 text-red-500">Error loading conversations</div>;
//   }

//   // Filter DM channels based on search term
//   const filteredDmChannels = channelsData && channelsData.dm_channels ? 
//     channelsData.dm_channels.filter(channel => {
//       const otherUser = extractUserFromChannelName(channel.channel_name, currentUser);
//       console.log("Other users.....", otherUser)
//       return otherUser.toLowerCase().includes(searchTerm.toLowerCase());
//     }) : [];

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-3">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       </div>
      
//       <div className="flex-1 overflow-y-auto">
//         <h3 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Direct Messages
//         </h3>
        
//         {filteredDmChannels.length > 0 ? (
//           filteredDmChannels.map(channel => {
//             const otherUser = extractUserFromChannelName(channel.channel_name, currentUser);
//             const unreadCount = getUnreadCount(channel.name);
            
//             return (
//               <div 
//                 key={channel.name}
//                 onClick={() => handleSelectChannel(channel.name, channel.channel_name)}
//                 className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between border-b"
//               >
//                 <div className="flex-1">
//                   <div className="font-medium">{otherUser}</div>
//                   <div className="text-sm text-gray-500 truncate">
//                     {channel.last_message ? channel.last_message.substring(0, 30) : 'No messages'}
//                     {channel.last_message && channel.last_message.length > 30 ? '...' : ''}
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <div className="text-xs text-gray-500">
//                     {formatLastActive(channel.modified)}
//                   </div>
//                   {unreadCount > 0 && (
//                     <div className="mt-1 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
//                       {unreadCount}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="px-3 py-2 text-sm text-gray-500">No conversations yet</div>
//         )}
        
//         {filteredUsers?.length > 0 && (
//           <>
//             <h3 className="px-3 py-2 mt-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Start New Conversation
//             </h3>
            
//             {filteredUsers.map(user => (
//               <div 
//                 key={user.name}
//                 onClick={() => startNewConversation(user.peer_user_id)}
//                 className="p-3 hover:bg-gray-100 cursor-pointer flex items-center border-b"
//               >
//                 <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
//                   {user.peer_user_id.substring(0, 1).toUpperCase()}
//                 </div>
//                 <div>
//                   <div className="font-medium">{user.peer_user_id}</div>
//                   {/* <div className="text-xs text-gray-500">
//                     {user?.status === "Online" ? (
//                       <span className="flex items-center">
//                         <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
//                         Online
//                       </span>
//                     ) : (
//                       <span className="flex items-center">
//                         <span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span>
//                         Offline
//                       </span>
//                     )}
//                   </div> */}
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RavenConversationList;





import React, { useState, useEffect } from 'react';
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';

const RavenConversationList = ({ onSelectChannel, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  
  // Get all DM channels
  const { data: channelsData, error: channelsError, isLoading: isLoadingChannels, mutate: refreshChannels } = 
    useFrappeGetCall('raven.api.raven_channel.get_all_channels', {
      hide_archived: true
    });
  
  // Get users using the correct API endpoint
  const { data: usersData, isLoading: isLoadingUsers } = 
    useFrappeGetCall('raven.api.raven_users.get_list');
  
  // Get unread count for channels
  const { data: unreadData } = 
    useFrappeGetCall('raven.api.raven_message.get_unread_count_for_channels');
  
  // API to create a new DM channel
  const { call: createDMChannel } = 
    useFrappePostCall('raven.api.raven_channel.create_direct_message_channel');
  
  // Process user data and filter out existing conversations
  useEffect(() => {
    if (usersData && usersData.message && channelsData && channelsData.message) {
      const existingDmUsers = new Set();
      
      // Extract users from existing DM channels
      if (channelsData.message.dm_channels) {
        channelsData.message.dm_channels.forEach(channel => {
          const otherUser = channel.peer_user_id;
          if (otherUser) {
            existingDmUsers.add(otherUser);
          }
        });
      }
      
      // Filter users who aren't already in conversations and match search term
      const filteredUsers = usersData.message
        .filter(user => user.name !== currentUser) // Exclude the current user
        .filter(user => !existingDmUsers.has(user.name)) // Exclude users already in conversations
        .filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
        ); // Match the search term
      
      setAvailableUsers(filteredUsers);
      console.log("Available users", filteredUsers)
    }
  }, [channelsData, usersData, searchTerm, currentUser]);
  
  // Helper to format display name
  const formatUserDisplayName = (user) => {
    if (user.full_name) {
      return `${user.full_name} (${user.name})`;
    }
    return user.name;
  };
  
  // Format time for last message display
  const formatLastActive = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Get unread count for a specific channel
  const getUnreadCount = (channelId) => {
    if (!unreadData || !unreadData.unread_count) return 0;
    return unreadData.unread_count[channelId] || 0;
  };
  
  // Handle selecting an existing DM channel
  const handleSelectChannel = (channelId, peerUserId) => {
    if (onSelectChannel) {
      onSelectChannel(channelId, peerUserId);
    }
  };
  
  // Start a new conversation with a user
  const startNewConversation = async (userId) => {
    try {
      const result = await createDMChannel({
        user_id: userId
      });
      
      if (result && result.message) {
        // Refresh the channel list
        refreshChannels();
        // Select the newly created channel
        handleSelectChannel(result.message, userId);
      }
    } catch (err) {
      console.error("Failed to create conversation:", err);
    }
  };
  
  if (isLoadingChannels || isLoadingUsers) {
    return <div className="p-4 text-center">Loading conversations...</div>;
  }
  
  if (channelsError) {
    return <div className="p-4 text-red-500">Error loading conversations</div>;
  }

  // Filter DM channels based on search term
  const filteredDmChannels = channelsData && channelsData.message && channelsData.message.dm_channels ? 
    channelsData.message.dm_channels.filter(channel => {
      return channel.peer_user_id && 
        channel.peer_user_id.toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <h3 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Direct Messages
        </h3>
        
        {filteredDmChannels.length > 0 ? (
          filteredDmChannels.map(channel => {
            const unreadCount = getUnreadCount(channel.name);
            
            return (
              <div 
                key={channel.name}
                onClick={() => handleSelectChannel(channel.name, channel.peer_user_id)}
                className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between border-b"
              >
                <div className="flex-1">
                  <div className="font-medium">{channel.peer_user_id}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {channel.last_message ? channel.last_message.substring(0, 30) : 'No messages'}
                    {channel.last_message && channel.last_message.length > 30 ? '...' : ''}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xs text-gray-500">
                    {formatLastActive(channel.modified)}
                  </div>
                  {unreadCount > 0 && (
                    <div className="mt-1 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                      {unreadCount}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-3 py-2 text-sm text-gray-500">No conversations yet</div>
        )}
        
        {availableUsers.length > 0 && (
          <>
            <h3 className="px-3 py-2 mt-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start New Conversation
            </h3>
            
            {availableUsers.map(user => (
              <div 
                key={user.name}
                onClick={() => startNewConversation(user.name)}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center border-b"
              >
                <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                  {user.name.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium">{formatUserDisplayName(user)}</div>
                  {user.user_status && (
                    <div className="text-xs text-gray-500">
                      <span className="flex items-center">
                        <span className={`w-2 h-2 ${user.user_status === "Online" ? "bg-green-500" : "bg-gray-300"} rounded-full mr-1`}></span>
                        {user.user_status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RavenConversationList;