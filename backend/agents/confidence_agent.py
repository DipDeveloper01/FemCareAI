def calculate_confidence(
    symptoms,
    conditions
):


    confidence_scores = {}

    symptom_count = len(symptoms)

    for condition in conditions:

        if isinstance(condition, dict):

            condition = condition.get(
                "name",
                "Unknown"
            )

        if condition == "Endometriosis":

            confidence_scores[
                condition
            ] = min(
                50 + symptom_count * 15,
                95
            )

        elif condition == "PCOS":

            confidence_scores[
                condition
            ] = min(
                50 + symptom_count * 15,
                95
            )

        elif condition == "Ovarian Cysts":

            confidence_scores[
                condition
            ] = min(
                40 + symptom_count * 10,
                85
            )

        elif condition == "Uterine Fibroids":

            confidence_scores[
                condition
            ] = min(
                40 + symptom_count * 10,
                85
            )

        else:

            confidence_scores[
                condition
            ] = 50

    return confidence_scores