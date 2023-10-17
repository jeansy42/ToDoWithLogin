from flask import Blueprint, request
from flask_jwt_extended import jwt_required, current_user
from sqlalchemy import and_
from utils.db import db
from utils.validators import LabelValidator
from models.task import Label
from services.label_services import (
    get_label_by_id_service,
    update_label_service,
    delete_label_service,
    get_labels_service,
    add_label_service,
)


labels = Blueprint("labels", __name__)


# Create label
@labels.route("/labels/add", methods=["POST"])
@jwt_required()
def add_label():
    title = request.json.get("title", None)
    LabelValidator().load({"title": title})
    return add_label_service(title=title, user_id=current_user.id)


# Get labels of user
@labels.route("/labels")
@jwt_required()
def get_labels():
    return get_labels_service(user_id=current_user.id)


# Get,update or delete label by id
@labels.route("/labels/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def get_upt_or_del_label(id):
    found_label: Label = get_label_by_id_service(id=id, user_id=current_user.id)
    if found_label:
        if request.method == "GET":
            return found_label.to_dict()

        elif request.method == "PUT":
            title = request.json.get("title", None)
            LabelValidator().load({"title": title})
            return update_label_service(label=found_label, title=title)

        elif request.method == "DELETE":
            return delete_label_service(label=found_label)

    else:
        return {"message": "Label not found"}, 404
