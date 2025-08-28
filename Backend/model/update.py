from typing import Optional, List
from pydantic import BaseModel

class UpdateStudent(BaseModel):
    roll:int
    name: Optional[str] = None
    subject: Optional[List[str]] = None
    phone: Optional[str] = None
    fees: Optional[int] = None
    batch: Optional[List[str]] = None