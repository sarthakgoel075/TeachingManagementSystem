from fastapi import APIRouter,Depends
from model.student import student_class
from model.update import UpdateStudent
from dbconnect import collection as coll
from dbconnect import coll_stu
from util import verify_token,make_response
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
router=APIRouter()

@router.get("/api/v1/students")
def get_all_students(curr_id: ObjectId = Depends(verify_token)):
    students = list(coll_stu.find({"teacher_id":(curr_id)}))
    for stu in students:
        stu["_id"] = str(stu["_id"])
        stu["teacher_id"] = str(stu["teacher_id"])
    return make_response(status_code=200, data=jsonable_encoder(students))
@router.post('/api/v1/students')
def addstudent(data:student_class,curr_id: str=Depends(verify_token)):
    data=data.model_dump()
    print(curr_id)

    data['teacher_id']=curr_id
    print(data)
    coll_stu.insert_one(data)
    return make_response(status_code=200,message="student added successfully")

@router.delete('/api/v1/students')
def deletestudent(rollno:int,curr_id:str=Depends(verify_token)):
    if len(coll_stu.find_one({"teacher_id":curr_id,"roll":rollno})):
         coll_stu.delete_one({"teacher_id":curr_id,"roll":rollno})
         return make_response(status_code=200,message=f"successfully delete student with roll no {rollno}")
    return make_response(status_code=404,error="student not found")


@router.patch('/api/v1/students')
def updatestudent(updates: UpdateStudent,curr_id:str=Depends(verify_token)):
    update_data = {}
    for key,value in updates.model_dump().items():
         if value is not None:
             update_data[key]=value
    result = coll_stu.update_one(
        {"roll": updates.roll, "teacher_id": curr_id},
        {"$set": update_data}
    )
    return make_response(status_code=200,message="successfully updated") 