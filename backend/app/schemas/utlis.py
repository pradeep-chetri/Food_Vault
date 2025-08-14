from pydantic import BaseModel

class UploadAuthToken(BaseModel):
    token: str
    expire: int
    signature: str