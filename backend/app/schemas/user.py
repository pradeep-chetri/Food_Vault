from pydantic import BaseModel, EmailStr, Field

# Shared base
class UserBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=32)
    email: EmailStr

# Input model for signup
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Output model (public view)
class UserPublic(UserBase):
    pass


