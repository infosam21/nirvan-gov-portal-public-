from flask import Blueprint, request, jsonify
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
