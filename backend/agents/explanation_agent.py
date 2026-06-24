def explain_conditions(conditions):

    explanations = {}

    if "Endometriosis" in conditions:
        explanations["Endometriosis"] = (
            "Pelvic pain and painful periods are common symptoms of Endometriosis."
        )

    if "PCOS" in conditions:
        explanations["PCOS"] = (
            "Irregular periods and weight gain are commonly associated with PCOS."
        )

    if "Ovarian Cysts" in conditions:
        explanations["Ovarian Cysts"] = (
            "Pelvic pain, bloating and abdominal discomfort may indicate ovarian cysts."
        )

    if "Uterine Fibroids" in conditions:
        explanations["Uterine Fibroids"] = (
            "Heavy bleeding and pelvic pressure are commonly associated with uterine fibroids."
        )

    return explanations