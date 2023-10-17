from flask import Blueprint, request
from flask_jwt_extended import (
    jwt_required,
    current_user,
)
from utils.validators import UserValidator
from services.user_services import (
    login_service,
    sign_in_service,
    logout_service,
    verify_email_service,
)

users = Blueprint("users", __name__)


@users.route("/user/sing_in", methods=["POST"])
def sign_in():
    user_to_create = {
        "fullname": request.json.get("fullname", None),
        "username": request.json.get("username", None),
        "password": request.json.get("password", None),
        "email": request.json.get("email", None),
        "phone": request.json.get("phone", None),
    }

    UserValidator().load(user_to_create)

    return sign_in_service(user=user_to_create)


@users.route("/user/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    return login_service(email=email, password=password)


@users.route("/user/logout")
def logout():
    return logout_service()


@users.route("/verify")
@jwt_required()
def verify_is_authenticated():
    return {"user": current_user.to_dict()}, 200


@users.route("/verify_email")
def verify_email():
    email = request.args.get("email", None)
    return verify_email_service(email=email)
