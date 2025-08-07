from fastapi import APIRouter, HTTPException, Depends
from app.schemas import UserCreate, UserPublic, UserLogin, AccessToken
from app.database import addUser, getUserByEmail
from app.utils import hash_password, verify_password , create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=AccessToken)
def signup(data: UserCreate):
    try:
        hashed_pw = hash_password(data.password)
        success = addUser(data.name, data.email, hashed_pw)

        if isinstance(success, dict) and "error" in success:
            raise HTTPException(status_code=400, detail=success["error"])

        token = create_access_token({"sub": data.email})
        
        return {
            "access_token": token, 
            "token_type": "bearer", 
            "user": {
                "name": data.name, 
                "email": data.email
                }
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=AccessToken)
def login(data: UserLogin):
    try:
        user = getUserByEmail(data.email)

        if not user or not verify_password(data.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({"sub": user["email"]})
        
        return {
            "access_token": token, 
            "token_type": "bearer", 
            "user": {
                "name": user["name"], 
                "email": user["email"]
                }
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/me", response_model=UserPublic)
def get_me(user: dict = Depends(get_current_user)):
    return user