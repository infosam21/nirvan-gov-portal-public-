from flask import Flask
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
