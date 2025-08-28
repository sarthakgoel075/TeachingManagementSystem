
from fastapi import FastAPI,Query,Path
from fastapi.middleware.cors import CORSMiddleware
from router.signup import router as signuprouter
from router.login import router as loginrouter
from router.student import router as studentrouter

app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],    
)

@app.get("/")
def home():
    return "welcome to teaching management system"
app.include_router(signuprouter,tags=['teacher'])
app.include_router(loginrouter,tags=['teacher'])
app.include_router(studentrouter,tags=['student'])