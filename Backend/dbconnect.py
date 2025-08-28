from pymongo import MongoClient
client=MongoClient("mongodb+srv://sarthakgoel20112004_db_user:5EemRPaXXKS6Zsq2@teacingcluster.pgolzw5.mongodb.net/teachingdb")
db=client["Teaching_management"]
collection=db["teacher"]
coll_stu=db["student"]