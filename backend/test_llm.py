from services.llm_service import ask_llm

response = ask_llm(
    "What is PCOS? Explain in one sentence."
)

print(response)