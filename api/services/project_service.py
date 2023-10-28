from sqlalchemy import and_, func
from utils.db import db
from models.projects import Project


def create_project_service(title: str, user_id: int):
    project = Project(title=title, user_id=user_id)
    db.session.add(project)
    db.session.commit()
    return {"message": "Project created successfully"}, 201


def get_project_by_id_service(id, user_id):
    found_project = db.session.execute(
        db.select(Project).where(and_(Project.id == id, Project.user_id == user_id))
    ).scalar_one_or_none()
    return found_project


def update_project_service(project: Project, title: str):
    project.title = title
    db.session.commit()
    return {"message": "Project updated successfully"}


def delete_project_service(project: Project):
    db.session.delete(project)
    db.session.commit()
    return "", 204


def get_projects_service(user_id: int):
    projects = db.session.execute(
        db.select(Project).where(Project.user_id == user_id)
    ).scalars()
    return [p.to_dict() for p in projects]


def verify_project_exists_service(title: str, user_id: int):
    found_project: Project = db.session.execute(
        db.select(Project).where(
            and_(
                Project.user_id == user_id,
                func.lower(Project.title) == func.lower(title),
            )
        )
    ).scalar_one_or_none()
    if found_project:
        return {
            "success": False,
            "message": f"The project '{title}' is already exists in your projects.",
        }
    return {
        "success": True,
        "message": f"The'{title}' project is available for creation.",
    }
