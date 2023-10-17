from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager,
    get_jwt_identity,
    create_access_token,
    set_access_cookies,
    get_jwt,
)
from marshmallow.exceptions import ValidationError
from datetime import timedelta, datetime, timezone
from config import TestConfig, DevelopmentConfig
from models.user import User
from utils.db import db
from routes.usersRoute import users
from routes.tasksRoute import tasks
from routes.projectsRoute import projects
from routes.labelsRoute import labels


def create_app(config_name):
    app = Flask(__name__)

    CORS(app, origins="http://127.0.0.1:3000", supports_credentials=True)

    if config_name == "development":
        app.config.from_object(DevelopmentConfig)
    elif config_name == "test":
        app.config.from_object(TestConfig)

    # Json Web Token
    jwt = JWTManager(app)

    @jwt.user_identity_loader
    def user_identity_lookup(id):
        return id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.filter_by(id=identity).one_or_none()

    # Flask Migrate
    migrate = Migrate(app, db)

    db.init_app(app)

    # Registering blueprints
    app.register_blueprint(users)
    app.register_blueprint(tasks)
    app.register_blueprint(projects)
    app.register_blueprint(labels)

    # After each request
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            return response

    # Handle errors
    @app.errorhandler(Exception)
    def handle_exception(e):
        if isinstance(e, ValidationError):
            return {"errors": e.messages}, 400
        elif isinstance(e, HTTPException):
            if e.code == 404:
                return {"error": "Invalid parameter"}, 400
            else:
                return e
        else:
            return {"errors": str(e)}, 500

    return app
