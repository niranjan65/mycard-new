// import { Plus } from 'lucide-react'
// import React from 'react'


// const FeedUser = ({user}) => {
//     console.log("User ka data mil raha hai....", user)
//     return (
//         <div className="flex items-center mb-3 mt-3 ">
//             {/* <img className="w-10 h-10 rounded-full" src={user} alt="Steven Smith profile" /> */}
//             {/* <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4C_4SdhCeYFSZttXUY-ScXX08wz0dhuurg&s" alt="Steven Smith profile" /> */}
//             <img className="w-10 h-10 rounded-full" src={user.user_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4C_4SdhCeYFSZttXUY-ScXX08wz0dhuurg&s"} alt="Steven Smith profile" />
//             <div className="ml-3 mr-6">
//                 <div className="font-medium">{user.first_name}</div>
//                 <div className="text-sm text-gray-500 flex items-center">
//                     <span>UI Designer</span>
//                     <span className="mx-1">•</span>
//                     <span>2h</span>
//                 </div>
//             </div>
//             <Plus />
//         </div>
//     )
// }

// export default FeedUser





// import { MessageSquare, Phone, Plus, UserCheck, Video } from 'lucide-react'
// import React, { useContext, useMemo, useState } from 'react'
// import { FrappeContext, useFrappeAuth, useFrappeCreateDoc, useFrappeGetDoc, useFrappeGetDocList, useFrappePostCall } from 'frappe-react-sdk'
// import Cookies from 'js-cookie';

// const FeedUser = ({ user, setUserChange }) => {
//     // const [isFollowing, setIsFollowing] = useState(false)
//     const { currentUser, isValidating, isLoading, error } = useFrappeAuth();
//     const { createDoc, loading } = useFrappeCreateDoc();
//     const userImage = Cookies.get('user_image')
    

//     const { data } = useFrappeGetDoc('User', currentUser);
//     const { data: userData } = useFrappeGetDoc('User', user.name);

//     const { call } = useContext(FrappeContext)

//     const { data: channelData } = useFrappeGetDocList('Raven Channel', {
//         filters: {
//             channel_name: currentUser + " _ " + user.name
//         },
//         fields: ['*']
//     });

//     const { call: createDMChannel } = 
//         useFrappePostCall('raven.api.raven_channel.create_direct_message_channel');

//     // console.log("User data fetched successfully:", channelData?.[0]?.name);


        


//     const isUserFollowed = data?.followers?.some(follower => follower.user === user.name);
//     // console.log("Is user followed:", user.name, isUserFollowed);
//     const [isFollowing, setIsFollowing] = useState(isUserFollowed);

//     const handleChat = async () => {
       

//         if(channelData?.[0]?.name) {
//             console.log("Channel already exists:", channelData[0].name);
//             window.location.href =  `raven/New%20admin%20office%20construction/${channelData[0].name}`;
//         }
//     }

//     const handleFollow = async () => {
//         try {
            
//             const currentUserId = currentUser;

//             // console.log("Current User ID:", currentUserId);

//             const result = await createDMChannel({
//         user_id: user.name
//       });

//       console.log("Result aa gaya hai", result);
//       setUserChange(true)
            
//             await createDoc('Followers', {
//                 parent: currentUserId, 
//                 parentfield: 'followers',
//                 parenttype: 'User',
//                 user: user.name, 
               
//             })
            
//             setIsFollowing(true)
//             console.log(`Successfully followed user: ${user.first_name}`)
//         } catch (error) {
//             console.error("Error following user:", error)
//         }
//     }

//     return (
//         <div className="flex items-center justify-between mb-3 mt-3 w-[21rem] md:w-[16rem]">
//             <div className='flex items-center'>
//             <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
//             <img 
//                 className="w-full h-full object-cover" 
//                 src={user.user_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4C_4SdhCeYFSZttXUY-ScXX08wz0dhuurg&s"} 
//                 alt={`${user.first_name} profile`}
//             />
//             </div>
//             <div className="ml-3 mr-6">
//                 <div className="font-medium">{user.first_name}</div>
//                 <div className="text-xs text-gray-500 flex items-center">
//                     <span>UI Designer</span>
//                     <span className="mx-1">•</span>
//                     <span>2h</span>
//                 </div>

                
//             </div>
//             </div>
            
//                 {isUserFollowed|| isFollowing ? (


//                     <div className='flex items-center gap-2 mt-2'>
//                         <UserCheck size={16} className="text-green-600" />
//                         <Phone size={16} className="text-green-600" />
//                         <Video size={16} className="text-green-600" />
//                         <MessageSquare size={16} onClick={handleChat} className="text-green-600" />
//                     </div>
                  
                
                    
//                 ) : (
//                     <button 
//                 onClick={handleFollow} 
//                 disabled={loading || isUserFollowed}
//                 // className={`p-1 rounded-full ${isUserFollowed ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
//             >
//                     <Plus className={loading ? 'opacity-50' : ''} />
//                     </button>
//                 )}
            
//         </div>
//     )
// }

// export default FeedUser




import { MessageSquare, Phone, Plus, UserCheck, Video } from 'lucide-react'
import React, { useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { FrappeContext, useFrappeAuth, useFrappeCreateDoc, useFrappeGetDoc, useFrappeGetDocList, useFrappePostCall } from 'frappe-react-sdk'
import Cookies from 'js-cookie';

const FeedUser = ({ user, setUserChange }) => {
    const { currentUser, isValidating, isLoading, error } = useFrappeAuth();
    const { createDoc, loading } = useFrappeCreateDoc();
    const userImage = Cookies.get('user_image');
    
    const { data } = useFrappeGetDoc('User', currentUser);
    const { data: userData } = useFrappeGetDoc('User', user.name);
    const { call } = useContext(FrappeContext);

    // Memoize channel filter to prevent unnecessary re-renders
    const channelFilter = useMemo(() => ({
        filters: {
            channel_name: `${currentUser} _ ${user.name}`
        },
        fields: ['*']
    }), [currentUser, user.name]);

    const { data: channelData } = useFrappeGetDocList('Raven Channel', channelFilter);

    const { call: createDMChannel } = 
        useFrappePostCall('raven.api.raven_channel.create_direct_message_channel');

    // Enhanced follow state management
    const isUserFollowed = useMemo(() => 
        data?.followers?.some(follower => follower.user === user.name) ?? false, 
        [data?.followers, user.name]
    );
    
    const [isFollowing, setIsFollowing] = useState(false);
    const [isCreatingChannel, setIsCreatingChannel] = useState(false);

    // Update following state when data changes
    useEffect(() => {
        setIsFollowing(isUserFollowed);
    }, [isUserFollowed]);

    // Enhanced chat handler with better error handling and new tab opening
    const handleChat = useCallback(async () => {
        try {
            if (channelData?.[0]?.name) {
                console.log("Channel already exists:", channelData[0].name);
                
                // Construct the URL properly
                const channelUrl = `/raven/New%20admin%20office%20construction/${channelData[0].name}`;
                
                // Open in new tab/window
                window.open(channelUrl, '_blank', 'noopener,noreferrer');
                
                return;
            }

            // If no channel exists, create one first
            setIsCreatingChannel(true);
            
            const result = await createDMChannel({
                user_id: user.name
            });

            if (result?.message?.name) {
                const newChannelUrl = `/raven/New%20admin%20office%20construction/${result.message.name}`;
                window.open(newChannelUrl, '_blank', 'noopener,noreferrer');
                
                // Trigger refresh of user data
                if (setUserChange) {
                    setUserChange(true);
                }
            } else {
                throw new Error('Failed to create channel');
            }
            
        } catch (error) {
            console.error("Error handling chat:", error);
            // You might want to show a toast notification here
            alert('Failed to open chat. Please try again.');
        } finally {
            setIsCreatingChannel(false);
        }
    }, [channelData, createDMChannel, user.name, setUserChange]);

    // Enhanced follow handler with better error handling
    const handleFollow = useCallback(async () => {
        if (loading || isUserFollowed || isFollowing) return;
        
        try {
            setIsFollowing(true); // Optimistic update
            
            // Create DM channel and follow user in parallel
            const [channelResult] = await Promise.all([
                createDMChannel({ user_id: user.name }),
                createDoc('Followers', {
                    parent: currentUser, 
                    parentfield: 'followers',
                    parenttype: 'User',
                    user: user.name, 
                })
            ]);

            console.log("Successfully followed user and created channel:", channelResult);
            
            if (setUserChange) {
                setUserChange(true);
            }
            
        } catch (error) {
            console.error("Error following user:", error);
            setIsFollowing(false); // Revert optimistic update
            // You might want to show a toast notification here
            alert('Failed to follow user. Please try again.');
        }
    }, [loading, isUserFollowed, isFollowing, createDMChannel, user.name, createDoc, currentUser, setUserChange]);

    // Enhanced loading states
    const isActionLoading = loading || isCreatingChannel;
    const showFollowedState = isUserFollowed || isFollowing;

    return (
        <div className="flex items-center justify-between mb-3 mt-3 w-[21rem] md:w-[16rem]">
            <div className='flex items-center'>
                <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img 
                        className="w-full h-full object-cover" 
                        src={user.user_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4C_4SdhCeYFSZttXUY-ScXX08wz0dhuurg&s"} 
                        alt={`${user.first_name} profile`}
                        onError={(e) => {
                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4C_4SdhCeYFSZttXUY-ScXX08wz0dhuurg&s";
                        }}
                    />
                </div>
                <div className="ml-3 mr-6">
                    <div className="font-medium">{user.first_name}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                        <span>{userData?.designation || 'UI Designer'}</span>
                        <span className="mx-1">•</span>
                        <span>2h</span>
                    </div>
                </div>
            </div>
            
            {showFollowedState ? (
                <div className='flex items-center gap-2 mt-2'>
                    <UserCheck size={16} className="text-green-600" />
                    <Phone size={16} className="text-green-600 cursor-pointer hover:text-green-700" />
                    <Video size={16} className="text-green-600 cursor-pointer hover:text-green-700" />
                    <MessageSquare 
                        size={16} 
                        onClick={handleChat} 
                        className={`text-green-600 cursor-pointer hover:text-green-700 ${
                            isCreatingChannel ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title={isCreatingChannel ? 'Creating channel...' : 'Open chat in new tab'}
                    />
                </div>
            ) : (
                <button 
                    onClick={handleFollow} 
                    disabled={isActionLoading}
                    className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                        isActionLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    title={isActionLoading ? 'Processing...' : 'Follow user'}
                >
                    <Plus className={isActionLoading ? 'animate-spin' : ''} />
                </button>
            )}
        </div>
    )
}

export default FeedUser