import json
import re

from services.llm_service import ask_llm


def extract_symptoms(text: str):

    prompt = f"""
You are a women's health symptom extraction AI.

Extract symptoms from the patient message.

Use standardized symptom names.

Examples:
- unpredictable cycle -> irregular periods
- gaining weight -> weight gain
- late period -> missed period

Return ONLY valid JSON.

Format:

{{
    "symptoms": [
        "irregular periods",
        "weight gain"
    ]
}}

Patient message:

{text}
"""

    response = ask_llm(prompt)


    try:
        # Direct JSON parsing
        data = json.loads(response)

        symptoms = []

        for item in data.get("symptoms", []):

            if isinstance(item, str):
                symptoms.append(item.lower())

            elif isinstance(item, dict):
                symptoms.append(
                    item.get("name", "").lower()
                )

        return {
            "symptoms": symptoms
        }

    except Exception:

        try:
            # Extract JSON block if model adds extra text
            match = re.search(
                r'\{.*\}',
                response,
                re.DOTALL
            )

            if match:

                data = json.loads(
                    match.group()
                )

                symptoms = []

                for item in data.get("symptoms", []):

                    if isinstance(item, str):
                        symptoms.append(
                            item.lower()
                        )

                    elif isinstance(item, dict):
                        symptoms.append(
                            item.get("name", "").lower()
                        )

                return {
                    "symptoms": symptoms
                }

        except Exception:
            pass

    return {
        "symptoms": []
    }