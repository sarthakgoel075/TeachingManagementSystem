from fastapi import APIRouter
from dbconnect import collection as coll
from model.login import login_class as logindata
from datetime import datetime, timedelta 
from util import create_access_token,make_response

router=APIRouter()

@router.post('/api/v1/login')
def loginfun(data: logindata):
    db_data = coll.find_one({'email': data.email})
    if not db_data:
        return make_response(status_code=400, error="No email found")
    
    db_pass = db_data['password']
    if db_pass == data.password:
        token_expires = timedelta(minutes=1440)
        access_token = create_access_token(
            data={"sub": str(db_data["_id"])},
            expires_delta=token_expires
        )
        return make_response(status_code=200, data={"access_token": access_token})
    else:
        return make_response(status_code=401, error="Wrong Password")




