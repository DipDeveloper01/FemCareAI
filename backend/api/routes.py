from fastapi import APIRouter

from models.schemas import AnalyzeRequest

from agents.master_agent import analyze_patient

router = APIRouter()


@router.post("/analyze")
def analyze(data: AnalyzeRequest):

    return analyze_patient(
        data.session_id,
        data.message
    )