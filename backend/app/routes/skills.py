from flask import Blueprint, jsonify
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
