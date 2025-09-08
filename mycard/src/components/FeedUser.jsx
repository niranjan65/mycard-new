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





import { MessageSquare, Phone, Plus, UserCheck, Video } from 'lucide-react'
import React, { useContext, useMemo, useState } from 'react'
import { FrappeContext, useFrappeAuth, useFrappeCreateDoc, useFrappeGetDoc, useFrappeGetDocList, useFrappePostCall } from 'frappe-react-sdk'
import Cookies from 'js-cookie';

const FeedUser = ({ user, setUserChange }) => {
    // const [isFollowing, setIsFollowing] = useState(false)
    const { currentUser, isValidating, isLoading, error } = useFrappeAuth();
    const { createDoc, loading } = useFrappeCreateDoc();
    const userImage = Cookies.get('user_image')
    

    const { data } = useFrappeGetDoc('User', currentUser);
    const { data: userData } = useFrappeGetDoc('User', user.name);

    const { call } = useContext(FrappeContext)

    const { data: channelData } = useFrappeGetDocList('Raven Channel', {
        filters: {
            channel_name: currentUser + " _ " + user.name
        },
        fields: ['*']
    });

    const { call: createDMChannel } = 
        useFrappePostCall('raven.api.raven_channel.create_direct_message_channel');

    // console.log("User data fetched successfully:", channelData?.[0]?.name);


        


    const isUserFollowed = data?.followers?.some(follower => follower.user === user.name);
    // console.log("Is user followed:", user.name, isUserFollowed);
    const [isFollowing, setIsFollowing] = useState(isUserFollowed);

    const handleChat = async () => {
        // try {
        //     const currentUserId = currentUser;
        //     console.log("Current User ID:", currentUserId);
        //     const result = await createDMChannel({
        //         user_id: currentUserId,
        //         // channel_name: currentUserId + " _ " + user.name
        //     });
        //     console.log("Result aa gaya hai", result);
        //     if (result) {
        //         console.log("Channel created successfully:", result);
        //         // window.location.href = `raven/New%20admin%20office%20construction/${result.name}`;
        //     } else {
        //         console.error("Failed to create channel");
        //     }
        // } catch (error) {
        //     console.error("Error creating DM channel:", error);
        // }

        if(channelData?.[0]?.name) {
            console.log("Channel already exists:", channelData[0].name);
            window.location.href =  `raven/New%20admin%20office%20construction/${channelData[0].name}`;
        }
    }

    const handleFollow = async () => {
        try {
            
            const currentUserId = currentUser;

            // console.log("Current User ID:", currentUserId);

            const result = await createDMChannel({
        user_id: user.name
      });

      console.log("Result aa gaya hai", result);
      setUserChange(true)
            
            await createDoc('Followers', {
                parent: currentUserId, 
                parentfield: 'followers',
                parenttype: 'User',
                user: user.name, 
               
            })
            
            setIsFollowing(true)
            console.log(`Successfully followed user: ${user.first_name}`)
        } catch (error) {
            console.error("Error following user:", error)
        }
    }

    return (
        <div className="flex items-center justify-between mb-3 mt-3 w-[21rem] md:w-[16rem]">
            <div className='flex items-center'>
            <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
            <img 
                className="w-full h-full object-cover" 
                src={user.user_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4C_4SdhCeYFSZttXUY-ScXX08wz0dhuurg&s"} 
                alt={`${user.first_name} profile`}
            />
            </div>
            <div className="ml-3 mr-6">
                <div className="font-medium">{user.first_name}</div>
                <div className="text-xs text-gray-500 flex items-center">
                    <span>UI Designer</span>
                    <span className="mx-1">•</span>
                    <span>2h</span>
                </div>

                
            </div>
            </div>
            
                {isUserFollowed|| isFollowing ? (


                    <div className='flex items-center gap-2 mt-2'>
                        <UserCheck size={16} className="text-green-600" />
                        <Phone size={16} className="text-green-600" />
                        <Video size={16} className="text-green-600" />
                        <MessageSquare size={16} onClick={handleChat} className="text-green-600" />
                    </div>
                  
                
                    
                ) : (
                    <button 
                onClick={handleFollow} 
                disabled={loading || isUserFollowed}
                // className={`p-1 rounded-full ${isUserFollowed ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
            >
                    <Plus className={loading ? 'opacity-50' : ''} />
                    </button>
                )}
            
        </div>
    )
}

export default FeedUser