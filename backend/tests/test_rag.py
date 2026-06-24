from services.rag_service import retrieve_medical_context

context = retrieve_medical_context()

print(context)