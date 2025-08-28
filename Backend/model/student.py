from pydantic import BaseModel,EmailStr,Field
from pydantic_extra_types.phone_numbers import PhoneNumber
from typing import List,Optional

class student_class(BaseModel):
    name:str
    subject:List[str]
    phone:str
    roll:int
    teacher_id:Optional[str]=None
    fees:int
    batch:List[str]