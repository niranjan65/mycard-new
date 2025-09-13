# import frappe


# @frappe.whitelist()
# def get_document(announcement_name):
#     document = frappe.get_doc('Announcements', announcement_name)

#     return {
#         "likes": document.likes
#     }



# import frappe

# @frappe.whitelist()
# def get_document(announcement_name):
#     document = frappe.get_doc('Announcements', announcement_name)
    
    
#     simplified_likes = []
#     if document.likes:
#         for like in document.likes:
#             simplified_likes.append({
#                 "name": like.name,
#                 "user_name": like.user_name
#             })
    
#     return simplified_likes



import frappe

@frappe.whitelist()
def get_document(announcement_name):
    # Instead of loading the entire document with get_doc, use get_all to fetch only what we need
    likes = frappe.get_all(
        'Announcement Likes',
        filters={
            'parent': announcement_name,
            'parenttype': 'Announcements',
            'parentfield': 'likes'
        },
        fields=['name', 'user_name']
    )
    
    return likes