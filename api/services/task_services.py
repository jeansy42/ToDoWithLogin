from typing import Dict
from datetime import timedelta, datetime, date
from sqlalchemy import and_, extract
from utils.db import db
from models.task import Task


def add_task_service(task: Dict, user_id: int):
    task_created = Task(
        user_id=user_id,
        title=task["title"],
        description=task["description"],
        priority=task["priority"],
        due_date=task["due_date"],
    )
    db.session.add(task_created)

    # Adding labels
    if task["labels"]:
        task_created.add_edit_label(labels=task["labels"], user_id=user_id)
    # Adding project
    if task["project"]:
        task_created.add_edit_project(project=task["project"])

    db.session.commit()


def get_task_by_id_service(id: int, user_id: int):
    task: Task = db.session.execute(
        db.select(Task).where(and_(Task.id == id, Task.user_id == user_id))
    ).scalar_one_or_none()
    return task


def delete_task_service(task: Task):
    db.session.delete(task)
    db.session.commit()


def update_task_service(found_task: Task, task: Dict):
    found_task.title = task["title"]
    found_task.description = task["description"]
    found_task.priority = task["priority"]
    found_task.due_date = task["due_date"]

    # Edit labels
    if task["labels"]:
        found_task.add_edit_label(labels=task["labels"])
    else:
        found_task.labels = []

    # Edit project
    if task["project"]:
        found_task.add_edit_project(project=task["project"])
    else:
        found_task.project_id = None

    db.session.commit()


def set_status_task_service(task: Task):
    if task.status == "pending":
        task.status = "completed"
    else:
        task.status = "pending"
    db.session.commit()


def get_tasks_service(filter: Dict, user_id: int):
    stmt = db.select(Task).where(Task.user_id == user_id)

    date_, status, priority, order = filter.values()

    if date_:
        if date_ == "today":
            stmt = stmt.filter(Task.due_date == date.today())
        elif date_ == "tomorrow":
            stmt = stmt.filter(Task.due_date == date.today() + timedelta(days=1))
        elif date_ == "week":
            today = date.today()
            start_week = today - timedelta(days=today.weekday())
            end_week = start_week + timedelta(days=6)
            stmt = stmt.where(
                and_(Task.due_date >= start_week, Task.due_date <= end_week)
            )
        elif date_ == "month":
            stmt = stmt.filter(extract("month", Task.due_date) == datetime.now().month)
        elif date_ == "year":
            stmt = stmt.filter(extract("year", Task.due_date) == datetime.now().year)
        elif date_ == "beyond_this_year":
            stmt = stmt.filter(extract("year", Task.due_date) > datetime.now().year)

    if status:
        stmt = stmt.filter(Task.status == status)

    if priority:
        stmt = stmt.filter(Task.priority == priority)

    if order:
        # A=order ascending D=order descending
        if order == "titleA":
            stmt = stmt.order_by(Task.title)
        elif order == "titleD":
            stmt = stmt.order_by(Task.title.desc())
        elif order == "due_dateA":
            stmt = stmt.order_by(Task.due_date, Task.title)
        elif order == "due_dateD":
            stmt = stmt.order_by(Task.due_date.desc(), Task.title)

    tasks = db.session.execute(stmt).scalars()
    tasks_filtered = [t.to_dict() for t in tasks]
    return tasks_filtered
