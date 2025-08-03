from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserPublic, UserLogin
from app.database.auth import addUser, getUserByEmail
from app.utils.security import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=UserPublic)
def signup(data: UserCreate):
    try:
        hashed_pw = hash_password(data.password)
        success = addUser(data.name, data.email, hashed_pw)

        if isinstance(success, dict) and "error" in success:
            raise HTTPException(status_code=400, detail=success["error"])

        return UserPublic(name=data.name, email=data.email)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=UserPublic)
def login(data: UserLogin):
    try:
        user = getUserByEmail(data.email)

        if not user or not verify_password(data.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return UserPublic(name=user["name"], email=user["email"])
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
