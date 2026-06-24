import json
import re

from services.llm_service import ask_llm
from services.vector_db_service import (
    insert_documents,
    search_documents
)

def predict_conditions(symptoms):


    query = " ".join(symptoms)

    documents = search_documents(
        query
    )

    context = "\n\n".join(
        documents
    )

    prompt = f"""
You are a women's health specialist.

Knowledge Base:

{context}

Patient Symptoms:

{symptoms}

Using ONLY the knowledge base provided above,
identify possible conditions.

Return ONLY JSON.

Format:

{{
    "possible_conditions": [
        "PCOS"
    ]
}}
"""

    response = ask_llm(prompt)


    try:
        return json.loads(response)

    except Exception:

        try:
            match = re.search(
                r'\{.*\}',
                response,
                re.DOTALL
            )

            if match:
                return json.loads(
                    match.group()
                )

        except Exception:
            pass

    return {
        "possible_conditions": []
    }