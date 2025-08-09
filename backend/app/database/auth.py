from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas.user import UserPublic
from pydantic import EmailStr

async def addUser(db: AsyncSession, username: str, email: str, hashed_password: str) -> User:
    new_user = User(username=username, email=email, hashed_password=hashed_password)
    db.add(new_user)
    try:
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Username or Email already exists.")


async def getUserByEmail(db: AsyncSession, email: EmailStr):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalars().first()
    if user:
        return user
    return None
