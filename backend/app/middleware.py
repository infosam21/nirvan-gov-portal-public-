from functools import wraps
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
        return decorated
    return decorator
