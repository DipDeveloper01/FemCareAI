EMERGENCY_KEYWORDS = [
    "heavy bleeding",
    "severe bleeding",
    "fainting",
    "unconscious",
    "chest pain",
    "difficulty breathing",
    "suicidal",
    "severe abdominal pain"
]

def detect_emergency(text: str):

    text = text.lower()

    found = []

    for keyword in EMERGENCY_KEYWORDS:
        if keyword in text:
            found.append(keyword)

    return {
        "emergency": len(found) > 0,
        "triggers": found
    }