def generate_followup_questions(
    conditions
):

    questions = []

    if "Endometriosis" in conditions:

        questions.extend([
            "How long have you been experiencing pelvic pain?",
            "Does the pain become worse during menstruation?",
            "Do you experience pain during intercourse?"
        ])

    if "PCOS" in conditions:

        questions.extend([
            "Have your periods become irregular recently?",
            "Have you noticed weight gain in the last few months?",
            "Do you have acne or excess facial hair growth?"
        ])

    if "Ovarian Cysts" in conditions:

        questions.extend([
            "Do you experience abdominal bloating?",
            "Is the pain concentrated on one side of the pelvis?",
            "Have you noticed changes in urination frequency?"
        ])

    if "Uterine Fibroids" in conditions:

        questions.extend([
            "Are your periods heavier than usual?",
            "Do you feel pressure in the lower abdomen?",
            "Do you need to urinate more frequently?"
        ])

    return questions[:2]