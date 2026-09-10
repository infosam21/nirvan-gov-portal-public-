import os
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret")
    JWT_SECRET = os.getenv("JWT_SECRET", "default-jwt")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    IGOT_BASE_URL = os.getenv("IGOT_BASE_URL", "https://igotkarmayogi.gov.in/api")
    IGOT_API_KEY = os.getenv("IGOT_API_KEY", "")
