# app/database/initDB.py
import os
import re
import ssl
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

# Prepare SSL for asyncpg (Neon requires SSL)
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = True
ssl_context.verify_mode = ssl.CERT_REQUIRED

# Rewrite protocol for asyncpg
db_url = os.getenv('DATABASE_URL')
if db_url is None:
    raise ValueError("DATABASE_URL environment variable is not set")
DATABASE_URL = re.sub(r'^postgresql:', 'postgresql+asyncpg:', db_url)

engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"ssl": ssl_context}
)

SessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session
