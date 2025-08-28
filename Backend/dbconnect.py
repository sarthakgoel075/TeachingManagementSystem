from pymongo import MongoClient
client=MongoClient("mongodb://localhost:27017")
db=client["Teaching_management"]
collection=db["teacher"]
coll_stu=db["student"]