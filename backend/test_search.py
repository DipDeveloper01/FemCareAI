from services.vector_db_service import (
    insert_documents,
    search_documents
)

insert_documents()

results = search_documents(
    "pelvic pain painful periods"
)

for doc in results:

    print()
    print("=" * 50)
    print(doc)