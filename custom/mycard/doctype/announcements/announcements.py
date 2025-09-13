# Copyright (c) 2025, harpreet and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Announcements(Document):
	def validate(self):
		# Set the profile image to announcement doctype's profile_url field
		user = frappe.session.user
		if user == "Guest":
			return

		user_image = frappe.db.get_value("User", user, "user_image")
		if not user_image:
			return

		self.image_url = user_image
		self.user = user
		frappe.db.set_value("Announcements", self.name, "image_url", user_image)
		frappe.db.set_value("Announcements", self.name, "user", user)
		frappe.db.commit()
