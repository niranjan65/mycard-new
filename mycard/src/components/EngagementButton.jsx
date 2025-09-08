// import { de } from 'chrono-node';
// import { useFrappeAuth, useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeGetCall, useFrappeGetDoc } from 'frappe-react-sdk';
// import React, { useEffect } from 'react'

// const EngagementButton = ({announcementName, mutateAnnouncements}) => {
//     const {currentUser} = useFrappeAuth();
//     const { createDoc } = useFrappeCreateDoc();
//     const {deleteDoc} = useFrappeDeleteDoc();
//     console.log("Announcement Name:", announcementName);
//     const [showLike, setShowLike] = React.useState(false);

//     // const {data: announcementData, mutate: mutateAnnouncements} = useFrappeGetDoc('Announcements', announcementName, {
//     //     fields: ['*'],
//     //     filters: {
//     //         name: announcementName,
//     //     },
//     // });

//     const {data: likesData} = useFrappeGetCall('custom.mycard.doctype.announcements.fetch_likes.get_likes', {
//           announcement_name: announcementName,
//         });

//     const {data: documentData} = useFrappeGetCall('custom.mycard.doctype.announcements.fetch_document.get_document', {
//           announcement_name: announcementName,
//         });

//     console.log("Likes ka Data:", likesData);
//     console.log("Document Data:", documentData?.message?.likes?.some(like => like.user_name === currentUser));
//     console.log("Document filter Data:", documentData?.message?.likes?.filter(like => like.user_name === currentUser));

//     const childtableLikeName = likesData?.message?.filter(like => like.user_name === currentUser);
//     console.log("Child Table Like Name:", childtableLikeName);
//     console.log("Child Table Like Name:", childtableLikeName?.[0]?.name);


//      useEffect(() => {
//       setShowLike(likesData?.message?.some(like => like.user_name === currentUser) || false)
//      }, [likesData]);
//     // console.log("Show Like:", showLike);

//     const handleLike = async (announcementName) => {
//         try {
//             const currentUserId = currentUser;
//             console.log("Current User ID:", currentUserId);
            
//             await createDoc('Announcement Likes', {
//                 parent: announcementName, 
//                 parentfield: 'likes',
//                 parenttype: 'Announcements',
//                 user_name: currentUserId,
//             });
    
//             console.log(`Successfully liked announcement: ${announcementName}`);

//             setShowLike(true);
            
//             // You might want to refresh the announcements to update the like count 
//             mutateAnnouncements();
//         } catch (error) {
//             console.error("Error liking post:", error);
//         }
//       };

//       const handleUnlike = async (announcementName) => {
//         try {
//             await deleteDoc('Announcement Likes', childtableLikeName?.[0]?.name).then((response) => {
//                 console.log("Response:", response);
//                 if (response?.data === 'ok') {
//                     console.log("Successfully unliked announcement:", announcementName);
//                     setShowLike(false);
//                 } else {
//                     console.error("Error unliking announcement:", response);
//                 }
//             }
//             ); 
//             console.log(`Successfully unliked announcement: ${announcementName}`);
            
//             mutateAnnouncements();
//         } catch (error) {
            
//             console.error("Error unliking post:", error);
//         }
//       }   
   
//   return (
   
      
//        <>
//           {
//             showLike
//              ? (
//                 <button
//         onClick={() => handleUnlike(announcementName)}
//         className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
//          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
//          </svg>
//          <span className="ml-2">Unlike</span>
//        </button>
//              )
//              : (
//                 <button
//         onClick={() => handleLike(announcementName)}
//         className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
//          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
//          </svg>
//          <span className="ml-2">Like</span>
//        </button>
//              )
//         }
//        </>
      
    

//   )
// }

// export default EngagementButton




import React, { useEffect, useState, useCallback } from 'react';
import { useFrappeAuth, useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeGetCall } from 'frappe-react-sdk';
import { toast } from 'sonner';

const EngagementButton = ({ announcementName, mutateAnnouncements }) => {
  // For debugging
  // console.log(`Rendering EngagementButton for ${announcementName}`);
  const { currentUser } = useFrappeAuth();
  const { createDoc } = useFrappeCreateDoc();
  const { deleteDoc } = useFrappeDeleteDoc();
  const [showLike, setShowLike] = useState(false);
  const [likeDocName, setLikeDocName] = useState(null);

  // Fetch like data once for this announcement
  const { data: likesData, mutate: mutateLikes } = useFrappeGetCall(
    'custom.mycard.doctype.announcements.fetch_likes.get_likes', 
    { announcement_name: announcementName }
  );

  // Update the like state whenever the data changes
  useEffect(() => {
    if (likesData?.message) {
      const userLike = likesData.message.find(like => like.user_name === currentUser);
      
      setShowLike(!!userLike);
      setLikeDocName(userLike?.name || null);
    } else {
      // Reset state if no data is available
      setShowLike(false);
      setLikeDocName(null);
    }
  }, [likesData, currentUser]);

  // Memoize handlers to prevent recreating on each render
  const handleLike = useCallback(async () => {
    try {
      const response = await createDoc('Announcement Likes', {
        parent: announcementName,
        parentfield: 'likes',
        parenttype: 'Announcements',
        user_name: currentUser,
      });

      // If successful, update the likeDocName with the new doc name from response
      if (response?.name) {
        setLikeDocName(response.name);
        setShowLike(true);
        toast.success('You liked this post!');
      }
      
      // Update both the parent announcements and our likes data
      mutateAnnouncements();
      mutateLikes();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }, [announcementName, createDoc, currentUser, mutateAnnouncements, mutateLikes]);

  const handleUnlike = useCallback(async () => {
    if (!likeDocName) return;
    
    try {
      const response = await deleteDoc('Announcement Likes', likeDocName);
      
      if (response?.data === 'ok') {
        setShowLike(false);
        setLikeDocName(null); // Clear the doc name after successful deletion
        toast.success('You unliked this post!');
        // Update both announcements and likes data
        mutateAnnouncements();
        mutateLikes();
      }
    } catch (error) {
      console.error("Error unliking post:", error);
      
      // If we get a 404 or permission error, it likely means the doc is already deleted
      if (error.httpStatus === 403 || error.httpStatus === 404) {
        setShowLike(false);
        setLikeDocName(null);
        mutateAnnouncements();
      }
    }
  }, [likeDocName, deleteDoc, mutateAnnouncements, mutateLikes]);

  // Common SVG element to reduce duplication
  const ThumbIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
    </svg>
  );

  // Render appropriate button based on like state
  return (
    <button
      onClick={showLike ? handleUnlike : handleLike}
      className={`flex items-center ${showLike ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
      aria-label={showLike ? 'Unlike this post' : 'Like this post'}
    >
      <ThumbIcon />
      <span className="ml-2">{showLike ? 'Unlike' : 'Like'}</span>
    </button>
  );
};

export default EngagementButton;