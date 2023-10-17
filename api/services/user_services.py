from typing import Dict
from utils.db import db
from models.user import User
from flask import jsonify
from flask_jwt_extended import (
    create_access_token,
    unset_access_cookies,
    set_access_cookies,
)


def sign_in_service(user: Dict):
    user_created = User(user=user)
    user_created.set_password(user["password"])
    db.session.add(user_created)
    db.session.commit()
    return {
        "message": "User created successfully",
    }, 201


def login_service(email: str, password: str):
    user = db.session.execute(
        db.select(User).where(User.email == email)
    ).scalar_one_or_none()
    if user and user.check_password(password):
        message = jsonify(
            {"message": f"Welcome {user.username} to the glory", "user": user.to_dict()}
        )
        access_token = create_access_token(identity=user.id)
        set_access_cookies(message, access_token)
        return message
    else:
        return {"message": "Email or password invalid!"}, 401


def logout_service():
    message = jsonify({"message": "Logout successfully"})
    unset_access_cookies(message)
    return message


def verify_email_service(email: str):
    if email:
        found_email = db.session.execute(
            db.select(User).where(User.email == email)
        ).scalar_one_or_none()
        if found_email:
            return {"success": False, "message": "This email already exists."}
        else:
            return {"success": True, "message": "No matches result."}

    else:
        return {"error": "Not email to verificate, please send someone!"}, 400
