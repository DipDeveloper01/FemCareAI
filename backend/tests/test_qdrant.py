from services.vector_db_service import model

vector = model.encode(
    "irregular periods"
)

print(
    f"Vector Size: {len(vector)}"
)