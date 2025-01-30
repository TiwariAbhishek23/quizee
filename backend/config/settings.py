import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_TITLE: str = os.getenv("PROJECT_TITLE")
    PROJECT_VERSION: str = os.getenv("PROJECT_VERSION")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    MAX_PDF_FILE_SIZE: int = os.getenv("MAX_PDF_FILE_SIZE")
    MAX_PDF_PAGES: int = os.getenv("MAX_PDF_PAGES")

Settings = Settings()