def generate_recommendations(
    conditions,
    risk_level
):

    recommendations = []

    if "Endometriosis" in conditions:

        recommendations.extend([
            "Consult a gynecologist",
            "Track menstrual symptoms",
            "Record pain severity daily"
        ])

    if "PCOS" in conditions:

        recommendations.extend([
            "Consult a gynecologist",
            "Monitor weight changes",
            "Track menstrual cycles"
        ])

    if "Ovarian Cysts" in conditions:

        recommendations.extend([
            "Monitor pelvic pain symptoms",
            "Schedule a gynecological checkup",
            "Seek medical advice if pain worsens"
        ])

    if "Uterine Fibroids" in conditions:

        recommendations.extend([
            "Track menstrual bleeding",
            "Consult a gynecologist",
            "Monitor pelvic pressure symptoms"
        ])

    if risk_level == "High":

        recommendations.append(
            "Seek medical evaluation soon"
        )

    if len(recommendations) == 0:

        recommendations.append(
            "Consult a healthcare professional for further evaluation"
        )

    return list(set(recommendations))