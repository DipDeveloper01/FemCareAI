from dotenv import load_dotenv
import os

load_dotenv()

MODEL_NAME = os.getenv(
    "MODEL_NAME",
    "llama3"
)

APP_NAME = os.getenv(
    "APP_NAME",
    "FemCare AI"
)

DEBUG = os.getenv(
    "DEBUG",
    "False"
)