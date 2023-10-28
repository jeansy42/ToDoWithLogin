from flask import Blueprint, request
from flask_jwt_extended import current_user, jwt_required
from sqlalchemy import and_
from models.projects import Project
from utils.db import db
from utils.validators import ProjectValidator
from services.project_service import (
    create_project_service,
    get_project_by_id_service,
    update_project_service,
    delete_project_service,
    get_projects_service,
    verify_project_exists_service,
)


projects = Blueprint("projects", __name__)


# Create project
@projects.route("/projects/add", methods=["POST"])
@jwt_required()
def add_project():
    title = request.json.get("title", None)
    ProjectValidator().load({"title": title})

    return create_project_service(title=title, user_id=current_user.id)


# Get,update or delete a project by id
@projects.route("/projects/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def get_del_or_upd_project(id):
    found_project = get_project_by_id_service(id=id, user_id=current_user.id)

    if found_project:
        if request.method == "GET":
            return found_project.to_dict()

        elif request.method == "PUT":
            title = request.json.get("title", None)
            ProjectValidator().load({"title": title})
            return update_project_service(project=found_project, title=title)

        elif request.method == "DELETE":
            return delete_project_service(project=found_project)
    else:
        return {"message": "Project not found"}, 404


# Get all projects of user
@projects.route("/projects")
@jwt_required()
def get_projects():
    return get_projects_service(user_id=current_user.id)


@projects.route("/projects/verify_creation", methods=["POST"])
@jwt_required()
def verify_creation_label():
    title = request.json.get("title", None)
    if title:
        return verify_project_exists_service(title=title, user_id=current_user.id)
    return {"message": "Title is required!"}, 400
