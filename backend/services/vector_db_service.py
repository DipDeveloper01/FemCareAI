from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct
)

from pathlib import Path


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

client = QdrantClient(":memory:")


def create_collection():

    collections = client.get_collections()

    existing = [
        c.name
        for c in collections.collections
    ]

    if "women_health_kb" not in existing:

        client.create_collection(
            collection_name="women_health_kb",
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )

        print("Collection Created")

    else:

        print("Collection Already Exists")


def load_knowledge_base():

    kb_path = Path("data/knowledge_base.txt")

    with open(
        kb_path,
        "r",
        encoding="utf-8"
    ) as f:

        text = f.read()

    documents = []

    chunks = text.split(
        "--------------------------------------------------"
    )

    for chunk in chunks:

        chunk = chunk.strip()

        if chunk:

            documents.append(chunk)

    return documents


def insert_documents():

    create_collection()

    docs = load_knowledge_base()

    points = []

    for idx, doc in enumerate(docs):

        vector = model.encode(
            doc
        ).tolist()

        points.append(
            PointStruct(
                id=idx,
                vector=vector,
                payload={
                    "text": doc
                }
            )
        )

    client.upsert(
        collection_name="women_health_kb",
        points=points
    )

    print(
        f"Inserted {len(points)} documents"
    )


def search_documents(query):

    query_vector = model.encode(
        query
    ).tolist()

    results = client.query_points(
        collection_name="women_health_kb",
        query=query_vector,
        limit=3
    )

    documents = []

    for point in results.points:

        documents.append(
            point.payload["text"]
        )

    return documents