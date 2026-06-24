from fastapi import FastAPI
from api.routes import router

from fastapi.middleware.cors import CORSMiddleware

from services.vector_db_service import (
    create_collection,
    insert_documents
)

app = FastAPI(
    title="FemCare AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_collection()
insert_documents()

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "FemCare AI Backend Running"
    }