import frappe




# @frappe.whitelist()
# def get_likes(announcement_name):
# 		likes = frappe.get_all(
# 			'Announcement Likes',
# 			filters={'parent': announcement_name},
# 			fields=['user_name', 'parent']
# 		)
# 		return likes


# @frappe.whitelist()
# def get_likes(announcement_name):
#     likes = frappe.get_all(
#         'Announcement Likes',
#         filters={'parent': announcement_name},
#         fields=['name', 'user_name', 'parent', 'parenttype', 'parentfield']
#     )
    
#     for like in likes:
       
#         if 'parent' not in like or not like['parent']:
#             like['parent'] = announcement_name
    
#     # Log what we're returning for debugging
#     frappe.log_error(f"Returning likes for {announcement_name}: {likes}", "get_likes debug")
    
#     return likes




@frappe.whitelist()
def get_likes(announcement_name):
    # Instead of loading the entire document with get_doc, use get_all to fetch only what we need
    likes = frappe.get_all(
        'Announcement Likes',
        filters={
            'parent': announcement_name,
            'parenttype': 'Announcements',
            'parentfield': 'likes'
        },
        fields=['name', 'user_name', 'parent']
    )
    
    return likes




