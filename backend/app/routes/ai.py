from flask import Blueprint, request, jsonify
from app.middleware import token_required

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/recommend", methods=["POST"])
@token_required()
def recommend():
    return jsonify({"plan": "1. Public Governance & Accountability\n2. Procurement & General Financial Rules\n3. Advanced Digital Office Operations"})

@ai_bp.route("/chat", methods=["POST"])
@token_required()
def chat():
    msg = (request.get_json() or {}).get("message", "")
    return jsonify({"reply": f"Karmayogi Assistant: Received '{msg}'. Ready to help with staff learning modules!"})
