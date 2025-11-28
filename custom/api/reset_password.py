import frappe
from frappe.utils.data import now_datetime, sha256_hash

@frappe.whitelist(allow_guest=True)
def custom_reset_password(email):
    # verify user exists
    if not frappe.db.exists("User", email):
        frappe.throw("User not found")

    user = frappe.get_doc("User", email)

    if user.name == "Administrator":
        return "not allowed"

    if not user.enabled:
        return "disabled"

    # generate reset key
    key = frappe.generate_hash()
    hashed_key = sha256_hash(key)

    # save key
    user.db_set("reset_password_key", hashed_key)
    user.db_set("last_reset_password_key_generated_on", now_datetime())

    # custom frontend URL
    reset_link = f"https://trpc-vl6z.vercel.app/reset-password?key={key}"

    # send email
    frappe.sendmail(
        recipients=email,
        subject="Reset Your Password",
        template="custom_password_reset",
        args={"link": reset_link},
    )

    return {"status": "success", "message": "Reset instructions sent", "link": reset_link}
