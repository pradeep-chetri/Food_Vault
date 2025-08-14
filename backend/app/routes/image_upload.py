import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from imagekitio import ImageKit

from app.schemas.utlis import UploadAuthToken

load_dotenv()

router = APIRouter(prefix="/image", tags=["Images"])

public_key = os.getenv('IK_PUBLIC_KEY')
private_key = os.getenv('IK_PRIVATE_KEY')
url_endpoint = os.getenv('IK_URL_ENDPOINT')

imagekit = ImageKit(
    public_key=public_key,
    private_key=private_key,
    url_endpoint=url_endpoint
)

@router.get("/upload", status_code=200, response_model=UploadAuthToken)
async def get_upload_auth():
    try:
        auth_params = imagekit.get_authentication_parameters()
        if auth_params is None:
            raise HTTPException(status_code=500, detail="Failed to get authentication parameters from ImageKit")
        
        return UploadAuthToken(
            token=auth_params['token'],
            expire=auth_params['expire'],
            signature=auth_params['signature']
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))