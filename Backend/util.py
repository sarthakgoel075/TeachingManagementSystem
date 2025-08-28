from jose import JWTError, jwt 
from passlib.context import CryptContext 
from datetime import datetime, timedelta 
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from fastapi.responses import JSONResponse
from bson import ObjectId
SECRET_KEY = "sarthak"  
ALGORITHM = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES = 30
def create_access_token(data: dict, expires_delta: timedelta = None): 
    to_encode = data.copy() 
    if expires_delta: 
        expire = datetime.utcnow() + expires_delta
    else: 
        expire =  datetime.utcnow() + timedelta(minutes={ACCESS_TOKEN_EXPIRE_MINUTES}) 
    to_encode.update({"exp": expire}) 
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM) 
    return encoded_jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return ObjectId(user_id)  
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
def make_response(data=None, status_code=200, error=None,message=None):
    return JSONResponse(
        status_code=status_code,
        content={
            "status": "success" if status_code < 400 else "error",
            "status_code": status_code,
            "message":message,
            "data": data,
            "error": error
        }
    )

# currtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYXJ0aGFrZ29lbDIwMTEyMDA0QGdtYWlsLmNvbSIsImV4cCI6MTc1MTczMTM5Nn0.s7r_6KrqiP5soMUx3PishEVvfdaxOTtdhoc2AUUNYcY"
# res=verify_token(currtoken)
# print(res)
# token_expires = timedelta(minutes=30)

# access_token = create_access_token(data={"sub": 'sarthak'}, expires_delta=token_expires)
# print(access_token)