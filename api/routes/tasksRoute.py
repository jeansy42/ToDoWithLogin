from flask import Blueprint, request
from flask_jwt_extended import jwt_required, current_user
from services.task_services import (
    add_task_service,
    get_task_by_id_service,
    update_task_service,
    delete_task_service,
    set_status_task_service,
    get_tasks_service,
)
from utils.validators import TaskValidator, TaskFilterValidator


tasks = Blueprint("tasks", __name__)


# Get tasks including filtered tasks by....
@tasks.route("/tasks")
@jwt_required()
def get_tasks():
    tasks_filter = {
        "date": request.args.get("date", None),
        "status": request.args.get("status", None),
        "priority": request.args.get("priority", None),
        "order": request.args.get("order", None),
    }

    TaskFilterValidator().load(tasks_filter)

    return get_tasks_service(filter=tasks_filter, user_id=current_user.id)


# Create task
@tasks.route("/tasks/add", methods=["POST"])
@jwt_required()
def add_task():
    task_to_create = {
        "title": request.json.get("title", None),
        "description": request.json.get("description", None),
        "priority": request.json.get("priority", None),
        "due_date": request.json.get("due_date", None),
        "labels": request.json.get("labels", None),
        "project": request.json.get("project", None),
    }

    TaskValidator().load(task_to_create)

    add_task_service(task=task_to_create, user_id=current_user.id)

    return {"message": "Task created succesfully"}, 201


# Get task, delete or update task by id.
@tasks.route("/tasks/<int:id>", methods=["PUT", "GET", "DELETE"])
@jwt_required()
def get_del_or_upd_task(id):
    task = get_task_by_id_service(id=id, user_id=current_user.id)

    if task:
        if request.method == "GET":
            return task.to_dict()

        elif request.method == "DELETE":
            delete_task_service(task=task)
            return {"message": "Task deleted successfully!"}, 204

        else:
            task_to_update = {
                "title": request.json.get("title", None),
                "description": request.json.get("description", None),
                "priority": request.json.get("priority", None),
                "due_date": request.json.get("due_date", None),
                "labels": request.json.get("labels", None),
                "project": request.json.get("project", None),
            }

            TaskValidator().load(task_to_update)

            update_task_service(found_task=task, task=task_to_update)

            return {"message": "Task updated successfully!"}

    else:
        return {"message": "Task not found."}, 404


# Set status task
@tasks.route("/tasks/set_status/<int:id>", methods=["PUT"])
@jwt_required()
def task_setStatus(id):
    task = get_task_by_id_service(id=id, user_id=current_user.id)
    if task:
        set_status_task_service(task=task)
        return {"message": "Task updated succesfullly"}
    else:
        return {"message": "Task not found."}, 404
