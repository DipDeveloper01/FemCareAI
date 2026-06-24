from pathlib import Path


def retrieve_medical_context():

    kb_path = Path("data/knowledge_base.txt")

    with open(
        kb_path,
        "r",
        encoding="utf-8"
    ) as f:

        return f.read()