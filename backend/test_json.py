from services.llm_service import ask_llm

prompt = """
Extract symptoms.

Return ONLY JSON.

{
    "symptoms":[]
}

Patient:

My cycle has become unpredictable lately and I am gaining weight.
"""

response = ask_llm(prompt)

print(response)