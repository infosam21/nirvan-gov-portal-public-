import os

files = {
    "backend/requirements.txt": """flask==3.0.3
flask-cors==4.0.1
pyjwt==2.8.0
python-dotenv==1.0.1
requests==2.32.3
werkzeug==3.0.3
""",
    "backend/.env": """FLASK_ENV=development
PORT=5000
SECRET_KEY=nirvan_gov_secret
JWT_SECRET=nirvan_jwt_secret
GEMINI_API_KEY=
IGOT_BASE_URL=https://igotkarmayogi.gov.in/api
IGOT_API_KEY=
FRONTEND_ORIGIN=*
""",
    "backend/app/__init__.py": """from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    from app.routes.auth import auth_bp
    from app.routes.ai import ai_bp
    from app.routes.igot import igot_bp
    from app.routes.skills import skills_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(ai_bp, url_prefix="/api/ai")
    app.register_blueprint(igot_bp, url_prefix="/api/igot")
    app.register_blueprint(skills_bp, url_prefix="/api/skills")

    @app.route("/api/health")
    def health():
        return {"status": "healthy"}

    return app
""",
    "backend/app/config.py": """import os
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret")
    JWT_SECRET = os.getenv("JWT_SECRET", "default-jwt")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    IGOT_BASE_URL = os.getenv("IGOT_BASE_URL", "https://igotkarmayogi.gov.in/api")
    IGOT_API_KEY = os.getenv("IGOT_API_KEY", "")
""",
    "backend/app/middleware.py": """from functools import wraps
import jwt
from flask import request, jsonify
from app.config import Config

def token_required(allowed_roles=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            if not token:
                return jsonify({"error": "Token missing"}), 401
            try:
                payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
                request.user = payload
                if allowed_roles and payload.get("role") not in allowed_roles:
                    return jsonify({"error": "Forbidden"}), 403
            except Exception as e:
                return jsonify({"error": str(e)}), 401
            return f(*args, **kwargs)
        return decorator
    return decorator
""",
    "backend/app/services/__init__.py": "",
    "backend/app/routes/__init__.py": "",
    "backend/app/routes/auth.py": """from flask import Blueprint, request, jsonify
import jwt, datetime
from app.config import Config

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    d = request.get_json() or {}
    email = d.get("email", "")
    password = d.get("password", "")
    if email in ["staff@gov.in", "admin@gov.in"] and password in ["password123", "admin123"]:
        role = "admin" if "admin" in email else "staff"
        token = jwt.encode(
            {"sub": email, "name": "Staff Officer", "role": role, "department": "Public Administration", "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=8)},
            Config.JWT_SECRET,
            algorithm="HS256"
        )
        return jsonify({"token": token, "user": {"email": email, "name": "Staff Officer", "role": role, "department": "Public Administration"}})
    return jsonify({"error": "Invalid credentials. Use staff@gov.in / password123"}), 401
""",
    "backend/app/routes/skills.py": """from flask import Blueprint, jsonify
from app.middleware import token_required

skills_bp = Blueprint("skills", __name__)

@skills_bp.route("/progress")
@token_required()
def progress():
    return jsonify({"skills": [
        {"skill": "Public Finance & Auditing", "level": 75, "status": "In Progress"},
        {"skill": "E-Governance & Compliance", "level": 90, "status": "Certified"},
        {"skill": "DPDP Data Protection", "level": 50, "status": "In Progress"}
    ]})
""",
    "backend/app/routes/igot.py": """from flask import Blueprint, request, jsonify
from app.middleware import token_required

igot_bp = Blueprint("igot", __name__)

@igot_bp.route("/courses")
@token_required()
def get_courses():
    return jsonify({"courses": [
        {"id": "c1", "name": "Ethics & Public Accountability", "category": "Governance", "duration": "4 Hours", "rating": 4.8},
        {"id": "c2", "name": "Procurement Rules & GeM", "category": "Administration", "duration": "6 Hours", "rating": 4.7},
        {"id": "c3", "name": "Digital Transformation in Govt", "category": "Technology", "duration": "5 Hours", "rating": 4.9}
    ]})
""",
    "backend/app/routes/ai.py": """from flask import Blueprint, request, jsonify
from app.middleware import token_required

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/recommend", methods=["POST"])
@token_required()
def recommend():
    return jsonify({"plan": "1. Public Governance & Accountability\\n2. Procurement & General Financial Rules\\n3. Advanced Digital Office Operations"})

@ai_bp.route("/chat", methods=["POST"])
@token_required()
def chat():
    msg = (request.get_json() or {}).get("message", "")
    return jsonify({"reply": f"Karmayogi Assistant: Received '{msg}'. Ready to help with staff learning modules!"})
""",
    "backend/run.py": """import os
from app import create_app

app = create_app()

if __name__ == "__main__":
    print("Starting Flask server on http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
"""
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("SUCCESS: Backend files and folders have been created!")