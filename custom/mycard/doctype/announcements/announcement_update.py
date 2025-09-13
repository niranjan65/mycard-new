import frappe

@frappe.whitelist()
import frappe

@frappe.whitelist()
def update_announcement(announcement_name):
    """
    Update the announcement doctype for the current user.
    Set the profile image to announcement doctype's profile_url field.
    """
    user = frappe.session.user
    if user == "Guest":
        return

    
    user_image = frappe.db.get_value("User", user, "user_image")
    if not user_image:
        return

    # Update the Announcement doctype
    frappe.db.set_value("Announcements", announcement_name, "image_url", user_image)
    frappe.db.commit()