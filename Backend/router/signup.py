from fastapi import APIRouter,HTTPException
from model.signup import signup_class
from dbconnect import collection as coll
from util import make_response

router=APIRouter()

@router.post("/api/v1/signup")
def signup(data:signup_class):
    email=list(coll.find({"email":data.email}))
    if len(email)>0:
        return make_response(status_code=403,error="email already exist")
    coll.insert_one(data.model_dump())
    return make_response(status_code=200,message=f"Successfully added {data.name}")