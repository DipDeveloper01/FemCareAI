import re

KNOWN_SYMPTOMS = [
    "irregular periods",
    "missed period",
    "acne",
    "weight gain",
    "pelvic pain",
    "heavy bleeding",
    "fatigue",
    "hair loss"
]

def extract_symptoms(text: str):

    text = text.lower()

    found = []

    for symptom in KNOWN_SYMPTOMS:
        if symptom in text:
            found.append(symptom)

    return {
        "symptoms": found
    }