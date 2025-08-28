from pydantic import BaseModel,EmailStr,Field

class signup_class(BaseModel):
    name:str
    email:EmailStr
    password:str= Field(min_length=4,max_length=12)
    age:int   

