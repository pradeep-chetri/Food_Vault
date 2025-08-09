from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Optional
import os
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.auth import getUserByEmail
from app.schemas import UserPublic
from app.database.initDB import get_db

SECRET_KEY = os.getenv("SECRET_KEY", "unsafe-dev-key")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")  # used for token extraction


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):

    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> UserPublic:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None or not isinstance(email, str):
            raise credentials_exception
        user = await getUserByEmail(db, email)  # <-- await here
        if user is None:
            raise credentials_exception
        return UserPublic.from_orm(user)  # better conversion
    except JWTError:
        raise credentials_exception