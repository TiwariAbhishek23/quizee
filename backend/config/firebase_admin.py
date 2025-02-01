import firebase_admin
from firebase_admin import auth, credentials

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def verify_firebase_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        return None

def create_firebase_token(uid: str):
    return auth.create_custom_token(uid)

def set_user_role(uid: str, role: str):
    auth.set_custom_user_claims(uid, {"role": role})