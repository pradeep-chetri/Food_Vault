from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)

class UserPublic(UserBase):
    is_active: bool
    is_superuser: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes=True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class AccessToken(BaseModel):
    access_token: str
    token_type: str
    user: UserPublic
