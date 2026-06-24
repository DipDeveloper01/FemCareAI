from qdrant_client import QdrantClient

client = QdrantClient(":memory:")

methods = [m for m in dir(client) if not m.startswith("_")]

for m in methods:
    print(m)