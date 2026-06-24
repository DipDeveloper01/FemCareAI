from agents.disease_agent import predict_conditions

# result = predict_conditions(
#     [
#         "irregular periods",
#         "weight gain"
#     ]
# )



result = predict_conditions(
    [
        "pelvic pain",
        "dysmenorrhea"
    ]
)

print(result)