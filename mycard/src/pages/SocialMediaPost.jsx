

// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeAuth, useFrappeFileUpload, useFrappeGetDoc, useFrappeGetCall, FrappeContext } from 'frappe-react-sdk';
// import Cookies from 'js-cookie';
// import DocDataFetcher from '@/DocDataFetcher';
// import EngagementButton from '@/components/EngagementButton';
// import { toast } from 'sonner';
// import { Heart, MessageCircle, Share2, MoreHorizontal, Camera, Video, Send, X, Reply, ThumbsUp, Smile, Bookmark, TrendingUp } from 'lucide-react';

// const SocialMediaPost = () => {
//   const [newPost, setNewPost] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [previewMedia, setPreviewMedia] = useState(null);
//   const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
//   const [expandedComments, setExpandedComments] = useState({}); 
//   const [commentInputs, setCommentInputs] = useState({}); 
//   const [replyingTo, setReplyingTo] = useState({}); 
//   const { currentUser, isValidating, isLoading, error } = useFrappeAuth();
//   const fileInputRef = useRef(null);
//    const [sortBy, setSortBy] = useState('Top');
//    const [likedPosts, setLikedPosts] = useState(new Set());
//   const [savedPosts, setSavedPosts] = useState(new Set());
//   // const fileInputRef = useRef(null);

//   const userImage = Cookies.get('user_image') || '';
  

//   // Fetch all announcements
//   const { data: announcements, error: announcementsError, mutate: mutateAnnouncements } = useFrappeGetDocList('Announcements', {
//     fields: ['*'],
//     orderBy: {
//       field: 'creation',
//       order: 'desc',
//     },
//   });

//   // Fetch all comments
//   const { data: commentsData, error: commentsError, mutate: mutateComments } = useFrappeGetDocList('Comments', {
//     fields: ["*"],
//     orderBy: {
//       field: 'creation',
//       order: 'desc',
//     },
//   });

  


//   // Process comments to organize by post ID
//   const [commentsByPost, setCommentsByPost] = useState({});

//   // Process likes to organize by post ID and track user likes
//   const [likesByPost, setLikesByPost] = useState({});
  

//   useEffect(() => {
//     if (commentsData) {
//       const commentsByPostId = {};
      
//       // First, identify main comments and group by announcement ID
//       commentsData.forEach(comment => {
//         if (comment.a_id) {
//           if (!commentsByPostId[comment.a_id]) {
//             commentsByPostId[comment.a_id] = [];
//           }
           
//           // Convert to our local format with replies array
//           const formattedComment = {
//             ...comment,
//             replies: []
//           };
          
//           commentsByPostId[comment.a_id].push(formattedComment);
//         }
//       });
      
//       // Then process replies by adding them to their parent comments
//       Object.keys(commentsByPostId).forEach(postId => {
//         const postComments = commentsByPostId[postId];
        
//         // Split into main comments and replies
//         const mainComments = postComments.filter(c => !c.c_id);
//         const replies = postComments.filter(c => c.c_id);
        
//         // Add replies to parent comments
//         replies.forEach(reply => {
//           const parentComment = mainComments.find(c => c.name === reply.c_id);
//           if (parentComment) {
//             parentComment.replies.push(reply);
//           }
//         });
        
//         // Update the post's comments to only include main comments (with replies nested)
//         commentsByPostId[postId] = mainComments;
//       });
      
//       setCommentsByPost(commentsByPostId);
//     }
//   }, [commentsData]);

//   // Create new announcement
//   const { createDoc } = useFrappeCreateDoc();
//   const { upload, progress, isCompleted, reset } = useFrappeFileUpload();
  
//   // Handle media selection (image or video)
//   const handleMediaChange = async(e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check if file is image or video
//       const fileType = file.type.split('/')[0];
      
//       if (fileType === 'image' || fileType === 'video') {
//         setSelectedMedia(file);
//         setMediaType(fileType);
        
//         // Create preview URL
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewMedia(reader.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         alert('Please select an image or video file.');
//       }
//     }
//   };
  
//   // Open file input when clicking on buttons
//   const handleMediaButtonClick = (type) => {
//     // Set accept attribute for file input based on type
//     if (fileInputRef.current) {
//       fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*';
//       fileInputRef.current.click();
//     }
//   };
  
//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!newPost.trim() && !selectedMedia) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Upload media if one is selected
//       let mediaUrl = null;
//       let mediaFieldName = null;
      
//       if (selectedMedia) {
//         try {
//           // Determine fieldname based on media type
//           mediaFieldName = mediaType === 'image' ? 'image' : 'video';
          
//           // Upload the file to Frappe
//           const fileDoc = await upload(selectedMedia, {
//             isPrivate: false,
//             doctype: "Announcements",
//             fieldname: mediaFieldName,
//           });
          
//           // Get the file URL
//           mediaUrl = fileDoc.file_url;
//           console.log(`${mediaType} uploaded:`, mediaUrl);
          
//           // Reset the upload state
//           reset();
//         } catch (uploadErr) {
//           console.error(`Error uploading ${mediaType}:`, uploadErr);
//           // Continue with post creation even if media upload fails
//         }
//       }
      
//       // Get user information from cookies
//       const userName = Cookies.get('full_name') || currentUser || 'Anonymous';
//       const userImage = Cookies.get('user_image') || '';
      
//       // Create announcement with appropriate media field
//       const announcementData = {
//         announcements: newPost,
//         user_name: userName,
//         image_url: userImage,
//         media_type: mediaType, 
//         user_details: [
//           {
//             user_name: userName,
//             image_url: userImage
//           }
//         ]
//       };
      
//       // Add the media URL to the appropriate field
//       if (mediaType === 'image') {
//         announcementData.image = mediaUrl;
//       } else if (mediaType === 'video') {
//         announcementData.video = mediaUrl;
//       }
      
//       // Create the announcement with user info
//       const result = await createDoc('Announcements', announcementData);
      
//       mutateAnnouncements();
      
//       // Reset form
//       setNewPost('');
//       setSelectedMedia(null);
//       setPreviewMedia(null);
//       setMediaType(null);
      
      
//     } catch (err) {
//       console.error('Error creating announcement:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Toggle comment section for a specific post
//   const toggleComments = (postId) => {
//     setExpandedComments(prev => ({
//       ...prev,
//       [postId]: !prev[postId]
//     }));
    
//     // Initialize comment input if not already
//     if (!commentInputs[postId]) {
//       setCommentInputs(prev => ({
//         ...prev,
//         [postId]: ''
//       }));
//     }
//   };

  
//   const updateCommentInput = (postId, text) => {
//     setCommentInputs(prev => ({
//       ...prev,
//       [postId]: text
//     }));
//   };

 
//   const handleCommentSubmit = async (postId) => {
//     const commentText = commentInputs[postId];
//     if (!commentText.trim()) return;
    
//     try {
//       // Determine if this is a reply or main comment
//       const parentCommentId = replyingTo[postId] || null;
      
//       // Get user information from cookies
//       const userName = Cookies.get('full_name') || currentUser || 'Anonymous';
//       const userImage = Cookies.get('user_image') || '';
      
//       await createDoc('Comments', {
//         comment: commentText,
//         a_id: postId,
//         c_id: parentCommentId,
//         user_name: userName,
//         user_image: userImage
//       });
      
//       // Clear form
//       updateCommentInput(postId, '');
      
//       // Clear reply state if this was a reply
//       if (parentCommentId) {
//         setReplyingTo(prev => ({
//           ...prev,
//           [postId]: null
//         }));
//       }
      
//       // Refresh comments
//       mutateComments();
//     } catch (err) {
//       console.error('Error posting comment:', err);
//     }
//   };

//   const handleLike = async (announcementName) => {
//     try {
//         const currentUserId = currentUser;
//         console.log("Current User ID:", currentUserId);
        
//         await createDoc('Announcement Likes', {
//             parent: announcementName, 
//             parentfield: 'likes',
//             parenttype: 'Announcements',
//             user_name: currentUserId,
//         });

//         console.log(`Successfully liked announcement: ${announcementName}`);
        
//         // You might want to refresh the announcements to update the like count 
//         mutateAnnouncements();
//     } catch (error) {
//         console.error("Error liking post:", error);
//     }
//   };


//   // Handle reply to a comment
//   const handleReply = (postId, commentId) => {
//     setReplyingTo(prev => ({
//       ...prev,
//       [postId]: commentId
//     }));
    
//     // Focus the comment input
//     setTimeout(() => {
//       const inputElement = document.getElementById(`comment-input-${postId}`);
//       if (inputElement) inputElement.focus();
//     }, 0);
//   };

//   // Cancel reply
//   const cancelReply = (postId) => {
//     setReplyingTo(prev => ({
//       ...prev,
//       [postId]: null
//     }));
//   };
  
//   return (
//     // <div className="w-full max-w-2xl mx-auto bg-white rounded-lg mt-5">
      
//     //   {/* Input area */}
//     //   <div className="p-4 border-b shadow-md">
//     //     <div className="rounded-lg overflow-hidden">
//     //       <textarea 
//     //         className="w-full p-3 bg-gray-100 rounded-t-lg resize-none outline-none"
//     //         placeholder="What's on your mind?"
//     //         value={newPost}
//     //         onChange={(e) => setNewPost(e.target.value)}
//     //         rows={3}
//     //       />
          
//     //       {/* Media preview (Image or Video) */}
//     //       {previewMedia && (
//     //         <div className="relative border-t border-gray-200 p-2 bg-gray-100">
//     //           <div className="relative w-48 h-48">
//     //             {mediaType === 'image' ? (
//     //               <img 
//     //                 src={previewMedia} 
//     //                 alt="Image Preview" 
//     //                 className="w-full h-full object-cover rounded"
//     //               />
//     //             ) : mediaType === 'video' ? (
//     //               <video 
//     //                 src={previewMedia} 
//     //                 controls
//     //                 className="w-full h-full object-cover rounded"
//     //               />
//     //             ) : null}
//     //             <button 
//     //               onClick={() => {
//     //                 setSelectedMedia(null);
//     //                 setPreviewMedia(null);
//     //                 setMediaType(null);
//     //               }}
//     //               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//     //             >
//     //               ×
//     //             </button>
//     //           </div>
//     //         </div>
//     //       )}
          
//     //       <div className="bg-gray-100 p-2 rounded-b-lg flex justify-between items-center">
//     //         <div className="flex space-x-4">
//     //           {/* Hidden file input used for both image and video */}
//     //           <input 
//     //             ref={fileInputRef}
//     //             type="file" 
//     //             className="hidden" 
//     //             onChange={handleMediaChange}
//     //           />
              
//     //           {/* Image upload button */}
//     //           <button 
//     //             type="button"
//     //             onClick={() => handleMediaButtonClick('image')}
//     //             className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
//     //           >
//     //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     //               <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
//     //             </svg>
//     //             <span className="ml-1">Photo</span>
//     //           </button>
              
//     //           {/* Video upload button */}
//     //           <button 
//     //             type="button"
//     //             onClick={() => handleMediaButtonClick('video')}
//     //             className="flex items-center text-purple-500 hover:text-purple-700 transition-colors"
//     //           >
//     //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     //               <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
//     //               <path d="M14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
//     //             </svg>
//     //             <span className="ml-1">Video</span>
//     //           </button>
//     //         </div>
            
//     //         {/* Post button */}
//     //         <button
//     //           className={`px-4 py-1 bg-blue-600 text-white rounded-full ${
//     //             isSubmitting || (!newPost.trim() && !selectedMedia) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//     //           }`}
//     //           disabled={isSubmitting || (!newPost.trim() && !selectedMedia)}
//     //           onClick={handleSubmit}
//     //         >
//     //           {isSubmitting ? 'Posting...' : 'Post'}
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {/* Sort options - Static */}
//     //   <div className="flex justify-center p-2 border-b bg-[#f2f9ff]">
//     //     <div className="flex items-center text-gray-600 text-sm">
//     //       <span>Sort by:</span>
//     //       <span className="ml-1 font-medium text-blue-600">Top</span>
//     //       <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//     //       </svg>
//     //     </div>
//     //   </div>

//     //   {/* Scrollable posts section */}
//     //   <div className=" shadow-md">
//     //     {announcements && announcements.length > 0 ? (
//     //       announcements.map((announcement) => (
//     //         <div key={announcement.name}  className="border-b last:border-b-0">
//     //           {/* Liked info */}
//     //           <DocDataFetcher
//     //             doctype="Announcements"
//     //             docname={announcement.name}
//     //             >
                 
//     //           {({ data: detailedData, error: detailedError }) => {
                
//     //             const displayData = detailedData ;

//     //             return (
//     //               <>
//     //                 <div className="p-4 text-sm text-gray-600 border-b">
//     //             <div className="flex justify-between">
//     //               <span>Michael Jack liked</span>
//     //               <button>
//     //                 <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     //                   <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
//     //                 </svg>
//     //               </button>
//     //             </div>
//     //           </div>

//     //           {/* Post content */}
//     //           <div className="p-4">
//     //             <div className="flex items-center mb-3">
//     //               <img 
//     //                 className="w-10 h-10 rounded-full object-cover" 
//     //                 src={
//     //                   // First check direct user_image field
//     //                   announcement.image_url ||
//     //                   // Then check child table (if available)
//     //                   (announcement.user_info && announcement.user_info.length > 0 ? 
//     //                     announcement.user_info[0].user_image : 
//     //                     "https://anantdv.com/construction/img1/transparent%20high%20resolution.png")
//     //                 } 
//     //                 alt="Profile" 
//     //               />
//     //               <div className="ml-3">
//     //                 <div className="font-medium">
//     //                   {announcement.user_name || "Anantdv"}
//     //                 </div>
//     //                 <div className="text-sm text-gray-500 flex items-center">
//     //                   <span>IT Company</span>
//     //                   <span className="mx-1">•</span>
//     //                   <span>{formatDate(announcement.creation)}</span>
//     //                 </div>
//     //               </div>
//     //             </div>
                
//     //             <div className="text-sm text-gray-700">
//     //               <p>{announcement.announcements}</p>
//     //               <button className="mt-2 text-blue-600 font-medium">READ MORE</button>
//     //             </div>

//     //             {/* Media content - Image or Video */}
//     //             {(announcement.image || announcement.video) && (
//     //               <div className="w-full h-64 mt-4 mb-4 overflow-hidden rounded-lg">
//     //                 {announcement.image && (!announcement.media_type || announcement.media_type === 'image') ? (
//     //                   <img 
//     //                     src={announcement.image} 
//     //                     alt="Post content" 
//     //                     className="w-full h-full object-cover"
//     //                   />
//     //                 ) : announcement.video && announcement.media_type === 'video' ? (
//     //                   <video 
//     //                     src={announcement.video} 
//     //                     controls
//     //                     className="w-full h-full object-cover" 
//     //                   />
//     //                 ) : null}
//     //               </div>
//     //             )}

//     //             {/* Engagement buttons */}
//     //             <div className="flex justify-between mt-4 pt-3 border-t">
               


//     //                <EngagementButton
//     //                  announcementName={announcement.name}
//     //                  userName={currentUser}
//     //                  mutateAnnouncements={mutateAnnouncements}
//     //                />

//     //               {/* Comment button - now toggles comments */}
//     //               <button 
//     //                 onClick={() => toggleComments(announcement.name)} 
//     //                 className={`flex items-center transition-colors ${
//     //                   expandedComments[announcement.name] 
//     //                     ? 'text-green-600' 
//     //                     : 'text-gray-600 hover:text-green-600'
//     //                 }`}
//     //               >
//     //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
//     //                 </svg>
//     //                 <span className="ml-2">Comment</span>
//     //               </button>

//     //               {/* Share button */}
//     //               <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
//     //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
//     //                 </svg>
//     //                 <span className="ml-2">Share</span>
//     //               </button>
//     //             </div>
//     //           </div>
//     //               </>
//     //             )
//     //           }}
//     //           </DocDataFetcher>

//     //           {/* Comments section - shows when expanded */}
//     //           {expandedComments[announcement.name] && (
//     //             <div className="bg-gray-50 p-4">
//     //               {/* Comment form */}
//     //               <div className="mb-4">
//     //                 {replyingTo[announcement.name] && (
//     //                   <div className="mb-2 flex items-center">
//     //                     <span className="text-sm text-gray-500">
//     //                       Replying to comment
//     //                     </span>
//     //                     <button 
//     //                       type="button" 
//     //                       onClick={() => cancelReply(announcement.name)}
//     //                       className="ml-2 text-xs text-red-500 hover:underline"
//     //                     >
//     //                       Cancel
//     //                     </button>
//     //                   </div>
//     //                 )}
                    
//     //                 <div className="flex">
//     //                   <textarea 
//     //                     id={`comment-input-${announcement.name}`}
//     //                     className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//     //                     placeholder="Write a comment..."
//     //                     value={commentInputs[announcement.name] || ''}
//     //                     onChange={(e) => updateCommentInput(announcement.name, e.target.value)}
//     //                     rows={1}
//     //                   />
//     //                   <button 
//     //                     className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
//     //                     onClick={() => handleCommentSubmit(announcement.name)}
//     //                   >
//     //                     Post
//     //                   </button>
//     //                 </div>
//     //               </div>
                  
//     //               {/* Comments list */}
//     //               <div className="space-y-4">
//     //                 {commentsByPost[announcement.name] && commentsByPost[announcement.name].length > 0 ? (
//     //                   commentsByPost[announcement.name].map((commentItem) =>
//     //                      (
//     //                     <div key={commentItem.name} className="border-b pb-3 last:border-b-0">
//     //                       {/* Main comment */}
//     //                       <div className="flex items-start">
//     //                         <img 
//     //                           className="w-8 h-8 rounded-full mr-2"
//     //                           src={commentItem.user_image || "https://flowbite.com/docs/images/people/profile-picture-2.jpg"}
//     //                           alt={commentItem.user_name || "User"}
//     //                         />
//     //                         <div>
//     //                           <div className="bg-white p-2 rounded-lg">
//     //                             <div className="font-medium text-sm">{commentItem.user_name || "Anonymous"}</div>
//     //                             <p className="text-sm text-gray-700">{commentItem.comment}</p>
//     //                           </div>
//     //                           <div className="flex items-center mt-1 text-xs text-gray-500">
//     //                             <span>{formatDate(commentItem.creation)}</span>
//     //                             <button 
//     //                               onClick={() => handleReply(announcement.name, commentItem.name)}
//     //                               className="ml-2 font-medium hover:underline"
//     //                             >
//     //                               Reply
//     //                             </button>
//     //                           </div>
//     //                         </div>
//     //                       </div>
                          
//     //                       {/* Replies */}
//     //                       {commentItem.replies && commentItem.replies.length > 0 && (
//     //                         <div className="ml-10 mt-2 space-y-3">
//     //                           {commentItem.replies.map(reply => (
//     //                             <div key={reply.name} className="flex items-start">
//     //                               <img 
//     //                                 className="w-7 h-7 rounded-full mr-2"
//     //                                 src={reply.user_image || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
//     //                                 alt={reply.user_name || "User"}
//     //                               />
//     //                               <div>
//     //                                 <div className="bg-white p-2 rounded-lg">
//     //                                   <div className="font-medium text-sm">{reply.owner || "Anonymous"}</div>
//     //                                   <p className="text-sm text-gray-700">{reply.comment}</p>
//     //                                 </div>
//     //                                 <div className="flex items-center mt-1 text-xs text-gray-500">
//     //                                   <span>{formatDate(reply.creation)}</span>
//     //                                   <button 
//     //                                     onClick={() => handleReply(announcement.name, commentItem.name)}
//     //                                     className="ml-2 font-medium hover:underline"
//     //                                   >
//     //                                     Reply
//     //                                   </button>
//     //                                 </div>
//     //                               </div>
//     //                             </div>
//     //                           ))}
//     //                         </div>
//     //                       )}
//     //                     </div>
//     //                   )
//     //                 )
//     //                 ) : (
//     //                   <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
//     //                 )}
//     //               </div>
//     //             </div>
//     //           )}
//     //         </div>
//     //       ))
//     //     ) : (
//     //       <div className="p-8 text-center text-gray-500">
//     //         {announcementsError ? 'Error loading announcements' : 'No announcements to display'}
//     //       </div>
//     //     )}
//     //   </div>
//     // </div>

//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <div className="w-full max-w-2xl mx-auto">
        
//         {/* Header */}
//         {/* <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 mb-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Social Feed
//             </h1>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                 <TrendingUp className="w-4 h-4 text-white" />
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* Create Post Card */}
//         <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 mb-8 overflow-hidden border border-gray-100 mx-4">
//           <div className="p-6">
//             <div className="flex items-start space-x-4">
              
//               <div className="flex-1">
//                 <textarea 
//                   className="w-full p-4 bg-gray-50 rounded-2xl resize-none outline-none border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-400"
//                   placeholder="What's inspiring you today?"
//                   value={newPost}
//                   onChange={(e) => setNewPost(e.target.value)}
//                   rows={3}
//                 />
                
//                 {previewMedia && (
//                   <div className="relative mt-4 rounded-2xl overflow-hidden">
//                     <div className="relative">
//                       {mediaType === 'image' ? (
//                         <img 
//                           src={previewMedia} 
//                           alt="Preview" 
//                           className="w-full h-64 object-cover"
//                         />
//                       ) : (
//                         <video 
//                           src={previewMedia} 
//                           controls
//                           className="w-full h-64 object-cover"
//                         />
//                       )}
//                       <button 
//                         onClick={() => {
//                           setSelectedMedia(null);
//                           setPreviewMedia(null);
//                           setMediaType(null);
//                         }}
//                         className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
//               <input 
//                 ref={fileInputRef}
//                 type="file" 
//                 className="hidden" 
//                 onChange={handleMediaChange}
//               />
              
//               <div className="flex space-x-1">
//                 <button 
//                   onClick={() => handleMediaButtonClick('image')}
//                   className="flex items-center space-x-2 px-4 py-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
//                 >
//                   <Camera className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
//                   <span className="font-medium">Photo</span>
//                 </button>
                
//                 <button 
//                   onClick={() => handleMediaButtonClick('video')}
//                   className="flex items-center space-x-2 px-4 py-2 rounded-xl text-purple-600 hover:bg-purple-50 transition-all duration-200 group"
//                 >
//                   <Video className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
//                   <span className="font-medium">Video</span>
//                 </button>

//                 <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-yellow-600 hover:bg-yellow-50 transition-all duration-200 group">
//                   <Smile className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
//                   <span className="font-medium">Emoji</span>
//                 </button>
//               </div>
              
//               <button
//                 className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
//                   isSubmitting || (!newPost.trim() && !selectedMedia)
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
//                 }`}
//                 disabled={isSubmitting || (!newPost.trim() && !selectedMedia)}
//                 onClick={handleSubmit}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     <span>Posting...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <Send className="w-4 h-4" />
//                     <span>Share</span>
//                   </div>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Sort Options */}
//         <div className="flex items-center justify-center mb-6 mx-4">
//           <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
//             {['Top', 'Latest', 'Trending'].map((option) => (
//               <button
//                 key={option}
//                 onClick={() => setSortBy(option)}
//                 className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
//                   sortBy === option
//                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
//                     : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Posts */}
//         <div className="space-y-6 mx-4 pb-8">
//           {announcements?.length >0 && announcements?.map((post) => (
//             <div key={post.name} className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              
//               {/* Post Header */}
//               <div className="p-6 pb-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="relative">
//                       <img 
//                         className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100" 
//                         src={post.image_url}
//                         alt="Profile" 
//                       />
//                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900 text-lg">{post.user_name}</div>
//                       <div className="flex items-center text-sm text-gray-500 space-x-2">
//                         <span>Tech Innovator</span>
//                         <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
//                         <span>{formatDate(post.creation)}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <button className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all duration-200 group-hover:bg-gray-50">
//                     <MoreHorizontal className="w-5 h-5 text-gray-500" />
//                   </button>
//                 </div>
                
//                 <div className="text-gray-800 leading-relaxed mb-4">
//                   <p>{post.announcements}</p>
//                 </div>
//               </div>

//               {/* Media Content */}
//               {(post.image || post.video) && (
//                 <div className="relative overflow-hidden">
//                   {post.image && post.media_type === 'image' ? (
//                     <img 
//                       src={post.image} 
//                       alt="Post content" 
//                       className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
//                     />
//                   ) : post.video && post.media_type === 'video' ? (
//                     <video 
//                       src={post.video} 
//                       controls
//                       className="w-full h-80 object-cover"
//                     />
//                   ) : null}
//                 </div>
//               )}

//               {/* Engagement Stats */}
//               <div className="px-6 py-4 border-b border-gray-100">
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-1">
//                       <div className="flex -space-x-1">
//                         <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                           <Heart className="w-3 h-3 text-white fill-current" />
//                         </div>
//                         <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                           <ThumbsUp className="w-3 h-3 text-white fill-current" />
//                         </div>
//                       </div>
//                       <span>{post.likes_count} reactions</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <span>{post.comments_count} comments</span>
//                     <span>{post.shares_count} shares</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <button 
//                     onClick={() => handleLike(post.name)}
//                     className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 group/btn ${
//                       likedPosts.has(post.name)
//                         ? 'text-red-600 bg-red-50'
//                         : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
//                     }`}
//                   >
//                     <Heart className={`w-5 h-5 transition-all duration-200 group-hover/btn:scale-110 ${
//                       likedPosts.has(post.name) ? 'fill-current' : ''
//                     }`} />
//                     <span>Like</span>
//                   </button>

//                   <button 
//                     onClick={() => toggleComments(post.name)}
//                     className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 group/btn ${
//                       expandedComments[post.name]
//                         ? 'text-blue-600 bg-blue-50'
//                         : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
//                     }`}
//                   >
//                     <MessageCircle className="w-5 h-5 transition-all duration-200 group-hover/btn:scale-110" />
//                     <span>Comment</span>
//                   </button>

//                   <button className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-all duration-200 group/btn">
//                     <Share2 className="w-5 h-5 transition-all duration-200 group-hover/btn:scale-110" />
//                     <span>Share</span>
//                   </button>

//                   <button 
//                     onClick={() => handleSave(post.name)}
//                     className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 group/btn ${
//                       savedPosts.has(post.name)
//                         ? 'text-yellow-600 bg-yellow-50'
//                         : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
//                     }`}
//                   >
//                     <Bookmark className={`w-5 h-5 transition-all duration-200 group-hover/btn:scale-110 ${
//                       savedPosts.has(post.name) ? 'fill-current' : ''
//                     }`} />
//                     <span>Save</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Comments Section */}
//               {expandedComments[post.name] && (
//                 <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
//                   <div className="p-6">
//                     {/* Comment Input */}
//                     <div className="flex items-start space-x-3 mb-6">
//                       <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
//                         U
//                       </div>
//                       <div className="flex-1 flex space-x-3">
//                         <input 
//                           type="text"
//                           className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
//                           placeholder="Write a thoughtful comment..."
//                           value={commentInputs[post.name] || ''}
//                           onChange={(e) => setCommentInputs(prev => ({...prev, [post.name]: e.target.value}))}
//                         />
//                         <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
//                           <Send className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     {/* Comments List */}
//                     <div className="space-y-4">
//                       {commentsByPost[post.name]?.map((comment) => (
//                         <div key={comment.name} className="group/comment">
//                           <div className="flex items-start space-x-3">
//                             <img 
//                               className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-100"
//                               src={comment.user_image}
//                               alt={comment.user_name}
//                             />
//                             <div className="flex-1">
//                               <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
//                                 <div className="font-semibold text-gray-900 text-sm">{comment.user_name}</div>
//                                 <p className="text-gray-700 mt-1">{comment.comment}</p>
//                               </div>
//                               <div className="flex items-center mt-2 text-xs text-gray-500 space-x-4">
//                                 <span>{formatDate(comment.creation)}</span>
//                                 <button className="font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
//                                   <Reply className="w-3 h-3" />
//                                   <span>Reply</span>
//                                 </button>
//                                 <button className="font-medium hover:text-red-600 transition-colors duration-200 flex items-center space-x-1">
//                                   <Heart className="w-3 h-3" />
//                                   <span>Like</span>
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Format date to display in a friendly format
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInSeconds = Math.floor((now - date) / 1000);
  
//   if (diffInSeconds < 60) {
//     return 'Just now';
//   } else if (diffInSeconds < 3600) {
//     const minutes = Math.floor(diffInSeconds / 60);
//     return `${minutes}m`;
//   } else if (diffInSeconds < 86400) {
//     const hours = Math.floor(diffInSeconds / 3600);
//     return `${hours}h`;
//   } else {
//     const days = Math.floor(diffInSeconds / 86400);
//     return `${days}d`;
//   }
// };

// export default SocialMediaPost;











import React, { useState, useEffect, useRef } from 'react';
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeAuth, useFrappeFileUpload } from 'frappe-react-sdk';
import Cookies from 'js-cookie';
import DocDataFetcher from '@/DocDataFetcher';
import EngagementButton from '@/components/EngagementButton';
import { toast } from 'sonner';
import { Heart, MessageCircle, Share2, MoreHorizontal, Camera, Video, Send, X, Reply, ThumbsUp, Smile, Bookmark, TrendingUp } from 'lucide-react';

const SocialMediaPost = () => {
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [replyingTo, setReplyingTo] = useState({});
  const [sortBy, setSortBy] = useState('Top');
  const [savedPosts, setSavedPosts] = useState(new Set());
  const { currentUser, isValidating, isLoading, error } = useFrappeAuth();
  const fileInputRef = useRef(null);
  const [seeMore, setSeeMore] = useState(false)

  // Fetch all announcements
  const { data: announcements, error: announcementsError, mutate: mutateAnnouncements } = useFrappeGetDocList('Announcements', {
    fields: ['*'],
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  });

  // Fetch all comments
  const { data: commentsData, error: commentsError, mutate: mutateComments } = useFrappeGetDocList('Comments', {
    fields: ["*"],
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  });

  // Process comments to organize by post ID
  const [commentsByPost, setCommentsByPost] = useState({});

  useEffect(() => {
    if (commentsData) {
      const commentsByPostId = {};
      
      // First, identify main comments and group by announcement ID
      commentsData.forEach(comment => {
        if (comment.a_id) {
          if (!commentsByPostId[comment.a_id]) {
            commentsByPostId[comment.a_id] = [];
          }
           
          // Convert to our local format with replies array
          const formattedComment = {
            ...comment,
            replies: []
          };
          
          commentsByPostId[comment.a_id].push(formattedComment);
        }
      });
      
      // Then process replies by adding them to their parent comments
      Object.keys(commentsByPostId).forEach(postId => {
        const postComments = commentsByPostId[postId];
        
        // Split into main comments and replies
        const mainComments = postComments.filter(c => !c.c_id);
        const replies = postComments.filter(c => c.c_id);
        
        // Add replies to parent comments
        replies.forEach(reply => {
          const parentComment = mainComments.find(c => c.name === reply.c_id);
          if (parentComment) {
            parentComment.replies.push(reply);
          }
        });
        
        // Update the post's comments to only include main comments (with replies nested)
        commentsByPostId[postId] = mainComments;
      });
      
      setCommentsByPost(commentsByPostId);
    }
  }, [commentsData]);

  // Create new announcement
  const { createDoc } = useFrappeCreateDoc();
  const { upload, progress, isCompleted, reset } = useFrappeFileUpload();
  
  // Handle media selection (image or video)
  const handleMediaChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is image or video
      const fileType = file.type.split('/')[0];
      
      if (fileType === 'image' || fileType === 'video') {
        setSelectedMedia(file);
        setMediaType(fileType);
        
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewMedia(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select an image or video file.');
      }
    }
  };
  
  // Open file input when clicking on buttons
  const handleMediaButtonClick = (type) => {
    // Set accept attribute for file input based on type
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*';
      fileInputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!newPost.trim() && !selectedMedia) return;
    
    setIsSubmitting(true);
    
    try {
      // Upload media if one is selected
      let mediaUrl = null;
      let mediaFieldName = null;
      
      if (selectedMedia) {
        try {
          // Determine fieldname based on media type
          mediaFieldName = mediaType === 'image' ? 'image' : 'video';
          
          // Upload the file to Frappe
          const fileDoc = await upload(selectedMedia, {
            isPrivate: false,
            doctype: "Announcements",
            fieldname: mediaFieldName,
          });
          
          // Get the file URL
          mediaUrl = fileDoc.file_url;
          console.log(`${mediaType} uploaded:`, mediaUrl);
          
          // Reset the upload state
          reset();
        } catch (uploadErr) {
          console.error(`Error uploading ${mediaType}:`, uploadErr);
          toast.error(`Error uploading ${mediaType}`);
        }
      }
      
      // Get user information from cookies
      const userName = Cookies.get('full_name') || currentUser || 'Anonymous';
      const userImage = Cookies.get('user_image') || '';
      
      // Create announcement with appropriate media field
      const announcementData = {
        announcements: newPost,
        user_name: userName,
        image_url: userImage,
        media_type: mediaType, 
        user_details: [
          {
            user_name: userName,
            image_url: userImage
          }
        ]
      };
      
      // Add the media URL to the appropriate field
      if (mediaType === 'image') {
        announcementData.image = mediaUrl;
      } else if (mediaType === 'video') {
        announcementData.video = mediaUrl;
      }
      
      // Create the announcement with user info
      await createDoc('Announcements', announcementData);
      
      mutateAnnouncements();
      toast.success('Post shared successfully!');
      
      // Reset form
      setNewPost('');
      setSelectedMedia(null);
      setPreviewMedia(null);
      setMediaType(null);
      
    } catch (err) {
      console.error('Error creating announcement:', err);
      toast.error('Error creating post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle comment section for a specific post
  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    // Initialize comment input if not already
    if (!commentInputs[postId]) {
      setCommentInputs(prev => ({
        ...prev,
        [postId]: ''
      }));
    }
  };

  const updateCommentInput = (postId, text) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: text
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText.trim()) return;
    
    try {
      // Determine if this is a reply or main comment
      const parentCommentId = replyingTo[postId] || null;
      
      // Get user information from cookies
      const userName = Cookies.get('full_name') || currentUser || 'Anonymous';
      const userImage = Cookies.get('user_image') || '';
      
      await createDoc('Comments', {
        comment: commentText,
        a_id: postId,
        c_id: parentCommentId,
        user_name: userName,
        user_image: userImage
      });
      
      // Clear form
      updateCommentInput(postId, '');
      
      // Clear reply state if this was a reply
      if (parentCommentId) {
        setReplyingTo(prev => ({
          ...prev,
          [postId]: null
        }));
      }
      
      // Refresh comments
      mutateComments();
      toast.success('Comment posted!');
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error('Error posting comment');
    }
  };

  // Handle reply to a comment
  const handleReply = (postId, commentId) => {
    setReplyingTo(prev => ({
      ...prev,
      [postId]: commentId
    }));
    
    // Focus the comment input
    setTimeout(() => {
      const inputElement = document.getElementById(`comment-input-${postId}`);
      if (inputElement) inputElement.focus();
    }, 0);
  };

  // Cancel reply
  const cancelReply = (postId) => {
    setReplyingTo(prev => ({
      ...prev,
      [postId]: null
    }));
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.success('Post removed from saved');
      } else {
        newSet.add(postId);
        toast.success('Post saved!');
      }
      return newSet;
    });
  };

  // Format date to display in a friendly format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    }
  };

  return (
    

    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-2 sm:px-0">
      <div className="w-full lg:max-w-2xl mx-auto">

        {/* Create Post Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 mb-8 overflow-hidden border border-gray-100 mx-2 sm:mx-4">
          <div className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="relative mb-3 sm:mb-0">
                <img 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover ring-2 ring-gray-100" 
                  src={Cookies.get('user_image') || "https://anantdv.com/construction/img1/transparent%20high%20resolution.png"}
                  alt="Profile" 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 w-full">
                <textarea 
                  className="w-full p-2 sm:p-4 bg-gray-50 rounded-2xl resize-none outline-none border-2 border-transparent focus:border-blue-200 focus:bg-white duration-200 text-gray-700 placeholder-gray-400 text-base sm:text-md"
                  placeholder="What's inspiring you today?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                {previewMedia && (
                  <div className="relative mt-4 w-full rounded-2xl overflow-hidden">
                    <div className="relative">
                      {mediaType === 'image' ? (
                        <img 
                          src={previewMedia} 
                          alt="Preview" 
                          className="w-full h-auto max-h-56 sm:max-h-64 object-cover"
                        />
                      ) : (
                        <video 
                          src={previewMedia} 
                          controls
                          className="w-full h-auto max-h-56 sm:max-h-64 object-cover"
                        />
                      )}
                      <button 
                        onClick={() => {
                          setSelectedMedia(null);
                          setPreviewMedia(null);
                          setMediaType(null);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100 space-y-2 sm:space-y-0">
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                onChange={handleMediaChange}
              />
              <div className="flex flex-row flex-wrap gap-1 sm:gap-2">
                <button 
                  onClick={() => handleMediaButtonClick('image')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <Camera className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-xs sm:text-sm">Photo</span>
                </button>
                <button 
                  onClick={() => handleMediaButtonClick('video')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-purple-600 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <Video className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-xs sm:text-sm">Video</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-xl text-yellow-600 hover:bg-yellow-50 transition-all duration-200 group">
                  <Smile className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-xs sm:text-sm">Emoji</span>
                </button>
              </div>
              <button
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                  isSubmitting || (!newPost.trim() && !selectedMedia)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                }`}
                disabled={isSubmitting || (!newPost.trim() && !selectedMedia)}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 mx-2 sm:mx-4">
          <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex-wrap gap-2">
            {['Top', 'Latest', 'Trending'].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-1 sm:px-6 sm:py-2 rounded-xl font-medium transition-all duration-200 ${
                  sortBy === option
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-5 sm:space-y-6 mx-2 sm:mx-4 pb-8">
          {announcements && announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement.name} className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                <DocDataFetcher doctype="Announcements" docname={announcement.name}>
                  {({ data: detailedData, error: detailedError }) => {
                    const displayData = detailedData || announcement;
                    return (
                      <>
                        {/* Post Header */}
                        <div className="p-4 sm:p-6 pb-2 sm:pb-4">
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="relative">
                                <img 
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover ring-2 ring-gray-100" 
                                  src={announcement.image_url ||
                                    (announcement.user_info && announcement.user_info.length > 0 ? 
                                      announcement.user_info.user_image : 
                                      "https://anantdv.com/construction/img1/transparent%20high%20resolution.png")}
                                  alt="Profile" 
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 text-base sm:text-lg">
                                  {announcement.user_name || "Anonymous"}
                                </div>
                                <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-2">
                                  <span>IT Company</span>
                                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                  <span>{formatDate(announcement.creation)}</span>
                                </div>
                              </div>
                            </div>
                            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all duration-200 group-hover:bg-gray-50">
                              <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </button>
                          </div>
                          <div className="text-gray-800 leading-relaxed mb-3 sm:mb-4">

                            {
                              seeMore
                                ? <p>{
                                  announcement.announcements} <span onClick={() => setSeeMore(false)

                                  } className='text-blue-700'>see less</span></p>
                                : <p>{
                                  announcement.announcements.slice(0, 250)}.... <span onClick={() => setSeeMore(true)

                                  } className='text-blue-700'>see more</span></p>
                            }

                          </div>
                        </div>

                        {/* Media Content */}
                        {(announcement.image || announcement.video) && (
                          <div className="relative overflow-hidden">
                            {announcement.image && (!announcement.media_type || announcement.media_type === 'image') ? (
                              <img 
                                src={announcement.image} 
                                alt="Post content" 
                                className="w-full h-auto max-h-64 sm:max-h-80 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                              />
                            ) : announcement.video && announcement.media_type === 'video' ? (
                              <video 
                                src={announcement.video} 
                                controls
                                className="w-full h-auto max-h-64 sm:max-h-80 object-cover"
                              />
                            ) : null}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-between">
                            <EngagementButton
                              announcementName={announcement.name}
                              userName={currentUser}
                              mutateAnnouncements={mutateAnnouncements}
                            />
                            <button 
                              onClick={() => toggleComments(announcement.name)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 group/btn ${
                                expandedComments[announcement.name]
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                              }`}
                            >
                              <MessageCircle className="w-5 h-5 transition-all duration-200 group-hover/btn:scale-110" />
                              <span className="text-xs sm:text-sm">Comment</span>
                            </button>
                            <button className="flex items-center space-x-2 px-3 py-2 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-all duration-200 group/btn">
                              <Share2 className="w-5 h-5 transition-all duration-200 group-hover/btn:scale-110" />
                              <span className="text-xs sm:text-sm">Share</span>
                            </button>
                            {/* <button 
                              onClick={() => handleSave(announcement.name)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 group/btn ${
                                savedPosts.has(announcement.name)
                                  ? 'text-yellow-600 bg-yellow-50'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
                              }`}
                            >
                              <Bookmark className={`w-5 h-5 transition-all duration-200 group-hover/btn:scale-110 ${
                                savedPosts.has(announcement.name) ? 'fill-current' : ''
                              }`} />
                              <span className="text-xs sm:text-sm">Save</span>
                            </button> */}
                          </div>
                        </div>

                        {/* Comments Section */}
                        {expandedComments[announcement.name] && (
                          <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                            <div className="p-4 sm:p-6">
                              {replyingTo[announcement.name] && (
                                <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-between bg-blue-50 px-4 py-2 rounded-xl">
                                  <span className="text-sm text-blue-600">
                                    Replying to comment
                                  </span>
                                  <button 
                                    onClick={() => cancelReply(announcement.name)}
                                    className="text-sm text-red-500 hover:underline"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}

                              {/* Comment Input */}
                              <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-3 space-y-3 sm:space-y-0 mb-6">
                                <img 
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover ring-2 ring-gray-100"
                                  src={Cookies.get('user_image') || "https://anantdv.com/construction/img1/transparent%20high%20resolution.png"}
                                  alt="Your profile"
                                />
                                <div className="flex-1 flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0">
                                  <input 
                                    id={`comment-input-${announcement.name}`}
                                    type="text"
                                    className="flex-1 px-2 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Write a thoughtful comment..."
                                    value={commentInputs[announcement.name] || ''}
                                    onChange={(e) => updateCommentInput(announcement.name, e.target.value)}
                                  />
                                  <button 
                                    onClick={() => handleCommentSubmit(announcement.name)}
                                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                  >
                                    <Send className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Comments List */}
                              <div className="space-y-3 sm:space-y-4">
                                {commentsByPost[announcement.name] && commentsByPost[announcement.name].length > 0 ? (
                                  commentsByPost[announcement.name].map((commentItem) => (
                                    <div key={commentItem.name} className="group/comment">
                                      {/* Main comment */}
                                      <div className="flex items-start space-x-2 sm:space-x-3">
                                        <img 
                                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-2 ring-gray-100"
                                          src={commentItem.user_image || "https://flowbite.com/docs/images/people/profile-picture-2.jpg"}
                                          alt={commentItem.user_name || "User"}
                                        />
                                        <div className="flex-1">
                                          <div className="bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm border border-gray-100">
                                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">{commentItem.user_name || "Anonymous"}</div>
                                            <p className="text-gray-700 mt-1">{commentItem.comment}</p>
                                          </div>
                                          <div className="flex items-center mt-1 sm:mt-2 text-xs text-gray-500 space-x-2 sm:space-x-4">
                                            <span>{formatDate(commentItem.creation)}</span>
                                            <button 
                                              onClick={() => handleReply(announcement.name, commentItem.name)}
                                              className="font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
                                            >
                                              <Reply className="w-3 h-3" />
                                              <span>Reply</span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Replies */}
                                      {commentItem.replies && commentItem.replies.length > 0 && (
                                        <div className="ml-6 sm:ml-12 mt-2 sm:mt-3 space-y-2 sm:space-y-3">
                                          {commentItem.replies.map(reply => (
                                            <div key={reply.name} className="flex items-start space-x-2 sm:space-x-3">
                                              <img 
                                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover ring-2 ring-gray-100"
                                                src={reply.user_image || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                                                alt={reply.user_name || "User"}
                                              />
                                              <div className="flex-1">
                                                <div className="bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm border border-gray-100">
                                                  <div className="font-semibold text-gray-900 text-xs sm:text-sm">{reply.user_name || "Anonymous"}</div>
                                                  <p className="text-gray-700 mt-1">{reply.comment}</p>
                                                </div>
                                                <div className="flex items-center mt-1 sm:mt-2 text-xs text-gray-500 space-x-2 sm:space-x-4">
                                                  <span>{formatDate(reply.creation)}</span>
                                                  <button 
                                                    onClick={() => handleReply(announcement.name, commentItem.name)}
                                                    className="font-medium hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
                                                  >
                                                    <Reply className="w-3 h-3" />
                                                    <span>Reply</span>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-center py-8">
                                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">No comments yet</p>
                                    <p className="text-gray-400 text-xs sm:text-sm">Be the first to share your thoughts!</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  }}
                </DocDataFetcher>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No posts yet</p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Start the conversation by sharing your first post!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPost;
