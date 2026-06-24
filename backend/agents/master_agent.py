from services.memory_service import (
    save_conversation,
    get_conversation
)

from agents.emergency_agent import detect_emergency
from agents.symptom_agent import extract_symptoms
from agents.disease_agent import predict_conditions
from agents.risk_agent import calculate_risk

from agents.recommendation_agent import (
    generate_recommendations
)

from agents.explanation_agent import (
    explain_conditions
)

from agents.followup_agent import (
    generate_followup_questions
)

from agents.confidence_agent import (
    calculate_confidence
)

from services.logger_service import logger


def analyze_patient(
        session_id: str,
        message: str):

    logger.info(
        f"Received query: {message}"
    )
    save_conversation(
        session_id,
        message
    )

    history = get_conversation(
        session_id
    )
    full_context = " ".join(
        history
    )

    
    

    # Step 1: Emergency Detection
    emergency_result = detect_emergency(
        message
    )

    if emergency_result["emergency"]:

        return {
            "emergency": True,
            "symptoms": [],
            "conditions": [],
            "explanations": {},
            "recommendations": [
                "Seek urgent medical attention immediately."
            ],
            "risk": {},
            "message": "Seek urgent medical attention immediately.",
            "triggers": emergency_result["triggers"]
        }

    # Step 2: Symptom Extraction
    symptom_result = extract_symptoms(
        full_context
    )
    symptoms = symptom_result[
        "symptoms"
    ]

    # Step 3: Disease Prediction
    disease_result = predict_conditions(
        symptoms
    )

    conditions = disease_result.get(
        "possible_conditions",
        []
    )

    confidence_scores = (
        calculate_confidence(
            symptoms,
            conditions
        )
    )

    # Step 4: Risk Assessment
    risk_result = calculate_risk(
        symptoms,
        conditions,
        False
    )

    # Step 5: Condition Explanations
    explanations = explain_conditions(
        conditions
    )

    # Step 6: Recommendations
    recommendations = generate_recommendations(
        conditions,
        risk_result["risk_level"]
    )

    
    recommendation_text = ""

    if recommendations:

        recommendation_text = (
            "It is recommended to "
                + ", ".join(
            recommendations[:3]
            ).lower()
            + "."
        )
    #step 7: Followup Questions
    followup_questions = (
        generate_followup_questions(
            conditions
        )
    )

    # Final Response
    return {
    "emergency": False,
    "symptoms": symptoms,
    "conditions": conditions,
    "explanations": explanations,
    "recommendation_text": recommendation_text,
    "followup_questions": followup_questions,
    "confidence_scores": confidence_scores,
    "risk": risk_result,
    "conversation_history": history
}