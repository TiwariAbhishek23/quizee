from fastapi import FastAPI, Depends, HTTPException, APIRouter
from firebase_admin import verify_firebase_token

login_router = APIRouter()

def get_current_user(id_token: str):
    user_data = verify_firebase_token(id_token)
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user_data

@login_router.get("/protected-route")
def protected_route(user: dict = Depends(get_current_user)):
    return {"message": "You are authenticated!", "user": user}
