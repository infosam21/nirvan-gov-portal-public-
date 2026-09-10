from flask import Blueprint, request, jsonify
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
