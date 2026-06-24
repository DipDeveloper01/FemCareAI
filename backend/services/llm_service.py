import subprocess

from config import MODEL_NAME
from services.logger_service import logger


def ask_llm(prompt):

    try:

        result = subprocess.run(
            ["ollama", "run", MODEL_NAME],
            input=prompt,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )

        return result.stdout.strip()

    except Exception as e:

        logger.error(
        f"LLM Error: {str(e)}"
    )

        return f"ERROR: {str(e)}"