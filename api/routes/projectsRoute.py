from flask import Blueprint, request
from flask_jwt_extended import current_user, jwt_required
from sqlalchemy import and_
from models.projects import Project
from utils.db import db
from utils.validators import ProjectValidator


projects = Blueprint("projects", __name__)


# Create project
@projects.route("/projects/add", methods=["POST"])
@jwt_required()
def add_project():
    title = request.json.get("title", None)
    user_id = current_user.id
    ProjectValidator().load({"title": title})
    project = Project(title=title, user_id=user_id)
    db.session.add(project)
    db.session.commit()
    return {"message": "Project created successfully"}, 201


# Get,update or delete a project by id
@projects.route("/projects/<int:id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def get_del_or_upd_project(id):
    found_project = db.session.execute(
        db.select(Project).where(
            and_(Project.id == id, Project.user_id == current_user.id)
        )
    ).scalar_one_or_none()
    if found_project:
        if request.method == "GET":
            return found_project.to_dict()
        elif request.method == "PUT":
            title = request.json.get("title", None)
            ProjectValidator().load({"title": title})
            found_project.title = title
            db.session.commit()
            return {"message": "Project updated successfully"}
        elif request.method == "DELETE":
            db.session.delete(found_project)
            db.session.commit()
            return {"message": "Project deleted successfully"}, 204
    else:
        return {"message": "Project not found"}, 404


# Get all projects of user
@projects.route("/projects")
@jwt_required()
def get_projects():
    projects = db.session.execute(
        db.select(Project).where(Project.user_id == current_user.id)
    ).scalars()
    return [p.to_dict() for p in projects]
