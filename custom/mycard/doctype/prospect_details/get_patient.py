import requests

@frappe.whitelist(allow_guest=True)
def fetch_patient(card_number):
    url = f"https://lblerp.anantdv.com/api/resource/Patient/?filters=[[\"card_blo_me_number\",\"=\",\"{card_number}\"]]&fields=[\"*\"]"
    
    headers = {
        "Authorization": "token e0723ce34466cea:79dca2f515d4e2c",
        "Cookie": "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image="
    }
    
    response = requests.get(url, headers=headers)

    return response.json()
    
    if response.ok:
        print("API Response:")
        print(response.text)
    else:
        print(f"Error: HTTP {response.status_code}")
        print(response.text)

