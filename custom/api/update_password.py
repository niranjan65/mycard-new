import frappe
from frappe.utils.data import sha256_hash, today
from frappe.utils.password import update_password as _update_password

@frappe.whitelist(allow_guest=True, methods=["POST"])
def custom_update_password(key, new_password):

    hashed_key = sha256_hash(key)

    user = frappe.db.get_value(
        "User",
        {"reset_password_key": hashed_key},
        "name"
    )

    if not user:
        frappe.throw("Invalid / expired reset password key")

    # update the password
    _update_password(user, new_password, logout_all_sessions=True)

    # clear the key
    frappe.db.set_value("User", user, "reset_password_key", "")
    frappe.db.set_value("User", user, "last_password_reset_date", today())

    return {
        "status": "success",
        "message": "Password updated successfully"
    }
