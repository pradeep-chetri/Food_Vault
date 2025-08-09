from typing import cast
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserCreate, UserLogin, AccessToken, UserPublic
from app.database.auth import addUser, getUserByEmail
from app.utils import hash_password, verify_password, create_access_token, get_current_user
from app.database.initDB import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=AccessToken)
async def signup(data: UserCreate, db: AsyncSession = Depends(get_db)):
    hashed_pw = hash_password(data.password)
    result = await addUser(db, data.username, data.email, hashed_pw)

    token = create_access_token({"sub": result.email})


    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserPublic.model_validate(result)
    }



@router.post("/login", response_model=AccessToken)
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await getUserByEmail(db, data.email)

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserPublic.from_orm(user)
    }

@router.get("/me", response_model=UserPublic)
async def get_me(user: User = Depends(get_current_user)):
    return user
