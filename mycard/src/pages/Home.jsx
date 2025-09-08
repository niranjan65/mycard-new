
import React, { useState } from 'react'
import backgroundimage from '@/assets/background.jpeg'
import SocialMediaPost from './SocialMediaPost'
import { MoveRight } from 'lucide-react'
import FeedUser from '@/components/FeedUser'
import { useFrappeGetCall, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import GroupList from '@/components/GroupList'


const Home = () => {
    
    const [userChange, setUserChange] = useState(false);
    const navigate = useNavigate()
    const value = Cookies.get('user_id')
    const user_image = Cookies.get('user_image')
    const user_name = Cookies.get('full_name');

    // const { data: userList, mutate } = useFrappeGetDocList('User', {
    //     fields: ["*"]
    // })

    const {data: userDetails} = useFrappeGetDoc('User', value, {
        fields: ["*"]
    });

    const { data:  userList } = useFrappeGetCall('raven.api.raven_users.get_list');

   
    
    // if(value === 'Guest' || !value) {
    //     window.location.href = '/mycard/login'
    // }

    return (
        <div className='flex mx-12  flex-col md:flex-row justify-between h-screen overflow-hidden'>
            
            {/* Left Side */}
            <div className="hidden md:block md:sticky md:top-5 h-screen overflow-y-auto left-side mt-5">
                {/* <div className='w-60 bg-yellow-200 shadow-sm rounded-[20px] '>
                    <div className='w-full h-24 rounded-[20px]'>
                        <img src={backgroundimage} className='h-full w-full object-fill rounded-t-[20px]' alt="background-image" />
                    </div>

                    <div className='h-full w-full bg-white flex flex-col gap-2 items-center '>
                        <div className='h-20 w-20 bg-white rounded-full p-1'>
                            <img src={user_image} className='w-full h-full object-cover rounded-full' alt="user" />
                        </div>

                        <h1 className='text-blue-600 font-medium'>{user_name}</h1>
                        <h1 className='text-xs'>Full Stack Developer</h1>
                        <p className='text-gray-500 w-full text-xs text-center'>Junior Full Stack Developer | Proficient in PHP, jQuery, and MySQL .... see more</p>

                        <div className='w-full p-3 flex justify-between text-xs border-t-2 border-b-2 border-y-gray-200'>
                            <p>Connections</p>
                            <p className='text-blue-500'>{userDetails?.followers?.length}</p>
                        </div>
                        <div className='w-full p-3 flex justify-between text-xs border-b-2 border-y-gray-200'>
                            <p>Profile Views</p>
                            <p className='text-blue-500'>624</p>
                        </div>
                        <div className='w-full p-3 flex justify-between text-xs border-y-gray-200'>
                            <p>My Items</p>
                            <p className='text-blue-500'>36</p>
                        </div>
                    </div>
                </div> */}

                  
                    
            </div>

            {/* Middle Section */}
            <div className="middle flex-grow overflow-y-auto">
               <SocialMediaPost />
            </div>

            {/* Right Side */}
            <div className="right-side mt-5 md:top-5 h-66  no-scrollbar">
                <div className='md:w-76 bg-white shadow-sm rounded-[20px] flex flex-col justify-center items-center text-xs'>
                    <div className='w-full flex justify-between p-3'>
                        <h1>Add to your feed</h1>
                        <MoveRight />
                    </div>

                    <div className='h-[1px] w-full bg-gray-200'></div>

                    <div className='h-66 overflow-y-auto no-scrollbar'>
                        {userList && userList.message.map((user, index) => (
                        <div key={index} className='w-full  px-5'>
                            <FeedUser  setUserChange={setUserChange} user={user} />
                            {index !== userList.length - 1 && <div className='h-[1px] w-full bg-gray-200'></div>}
                        </div>
                    ))}
                    </div>
                </div>
                <GroupList />
            </div>
        </div>
    )
}

export default Home





// import React, { useState } from 'react'
// import backgroundimage from '@/assets/background.jpeg'
// import SocialMediaPost from './SocialMediaPost'
// import { MoveRight } from 'lucide-react'
// import FeedUser from '@/components/FeedUser'
// import { useFrappeGetCall, useFrappeGetDoc } from 'frappe-react-sdk'
// import Cookies from 'js-cookie'
// import { useNavigate } from 'react-router-dom'
// import GroupList from '@/components/GroupList'

// const Home = () => {
//     const [userChange, setUserChange] = useState(false)
//     const navigate = useNavigate()
//     const value = Cookies.get('user_id')
//     const user_image = Cookies.get('user_image')
//     const user_name = Cookies.get('full_name')
//     const { data: userDetails } = useFrappeGetDoc('User', value, {
//         fields: ["*"]
//     })
//     const { data: userList } = useFrappeGetCall('raven.api.raven_users.get_list')

//     if (value === 'Guest' || !value) {
//         window.location.href = '/mycard/login'
//     }

//     return (
//         <div className="flex w-full min-h-screen bg-gray-50 px-2 md:px-8 py-4 gap-4">
//             {/* Left Side */}
//             <div className="hidden md:flex flex-col w-72 max-w-xs">
//                 {/* <div className='bg-yellow-200 shadow-sm rounded-2xl mb-4 overflow-hidden'>
//                     <img src={backgroundimage} className="w-full h-24 object-cover" alt="background" />
//                     <div className='bg-white flex flex-col items-center p-4 gap-2'>
//                         <div className='h-20 w-20 rounded-full overflow-hidden border-2 border-yellow-300'>
//                             <img src={user_image} className='w-full h-full object-cover' alt="user" />
//                         </div>
//                         <h1 className='text-blue-600 font-medium'>{user_name}</h1>
//                         <span className='text-xs'>Full Stack Developer</span>
//                         <p className='text-gray-500 text-xs text-center'>Junior Full Stack Developer | Proficient in PHP, jQuery, and MySQL .... see more</p>
//                         <div className='w-full p-2 flex justify-between text-xs border-t border-b border-gray-200 mt-2'>
//                             <span>Connections</span>
//                             <span className='text-blue-500'>{userDetails?.followers?.length}</span>
//                         </div>
//                         <div className='w-full p-2 flex justify-between text-xs border-b border-gray-200'>
//                             <span>Profile Views</span>
//                             <span className='text-blue-500'>624</span>
//                         </div>
//                         <div className='w-full p-2 flex justify-between text-xs'>
//                             <span>My Items</span>
//                             <span className='text-blue-500'>36</span>
//                         </div>
//                     </div>
//                 </div> */}
//                 <GroupList />
//             </div>

//             {/* Middle Section */}
//             <div className="flex-grow flex flex-col mx-2 overflow-y-auto min-w-0 max-w-[780px]">
//                 <SocialMediaPost />
//             </div>

//             {/* Right Side */}
//             <div className="hidden md:flex flex-col w-80 max-w-xs">
//                 <div className='bg-white shadow-sm rounded-2xl flex flex-col items-center text-xs divide-y divide-gray-100 overflow-hidden'>
//                     <div className='w-full flex justify-between items-center px-4 py-3'>
//                         <span>Add to your feed</span>
//                         <MoveRight />
//                     </div>

//                     <div className='w-full flex-col py-2 px-3 overflow-auto' style={{maxHeight: 540}}>
//                         {userList && userList.message.map((user, idx) => (
//                             <FeedUser
//                                 key={idx}
//                                 setUserChange={setUserChange}
//                                 user={user}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Home
