from pydantic import BaseModel,EmailStr,Field

class login_class(BaseModel):
    email:EmailStr
    password:str= Field(min_length=4,max_length=8) 

