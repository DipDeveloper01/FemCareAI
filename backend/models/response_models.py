from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    emergency: bool
    symptoms: list
    conditions: list
    risk: dict