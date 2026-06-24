def calculate_risk(symptoms, conditions, emergency):

    score = 0

    if emergency:
        score += 80

    score += len(symptoms) * 10

    score += len(conditions) * 20

    if score >= 80:
        risk_level = "High"
    elif score >= 40:
        risk_level = "Moderate"
    else:
        risk_level = "Low"

    return {
        "risk_score": score,
        "risk_level": risk_level
    }