from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, Enum, Date, ForeignKey, and_
from flask_jwt_extended import current_user
from datetime import datetime, date
from typing import List
from utils.db import db
from models.label_task_association import label_task_association


class Task(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(40), nullable=False)
    description: Mapped[str] = mapped_column(String(200), nullable=True)
    priority: Mapped[str] = mapped_column(Enum("low", "medium", "high"), nullable=False)
    status: Mapped[str] = mapped_column(
        Enum("pending", "completed"), default="pending", nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow()
    )
    due_date: Mapped[date] = mapped_column(Date, nullable=False)

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))

    project_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("project.id"), nullable=True
    )

    labels: Mapped[List["Label"]] = relationship(
        secondary=label_task_association, back_populates="tasks"
    )

    def __init__(
        self,
        title,
        description,
        priority,
        due_date,
        user_id,
        project_id=None,
        labels=None,
    ):
        self.title = title
        self.description = description
        self.priority = priority
        self.due_date = due_date
        self.user_id = user_id
        self.project_id = project_id
        if labels is not None:
            self.labels = labels

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "priority": self.priority,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "due_date": self.due_date,
            "labels": [l.title for l in self.labels],
        }

    def add_edit_label(self, labels: List["Label"], user_id: int):
        for l in labels:
            label_found = db.session.execute(
                db.select(Label).where(and_(Label.title == l, Label.user_id == user_id))
            ).scalar_one_or_none()
            if label_found:
                self.labels.append(label_found)
            else:
                new_label = Label(title=l, user_id=user_id)
                db.session.add(new_label)
                self.labels.append(new_label)

    def add_edit_project(self, project: str):
        from models.projects import Project

        found_project = db.session.execute(
            db.select(Project).where(
                and_(Project.title == project, Project.user_id == current_user.id)
            )
        ).scalar_one_or_none()
        if found_project:
            self.project_id = found_project.id
        else:
            new_project = Project(title=project, user_id=current_user.id)
            db.session.add(new_project)
            db.session.commit()
            self.project_id = new_project.id


class Label(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(20), nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    tasks: Mapped[List["Task"]] = relationship(
        secondary=label_task_association, back_populates="labels"
    )

    def __init__(self, title, user_id) -> None:
        self.title = title
        self.user_id = user_id

    def to_dict(self):
        tasks = [t.to_dict() for t in self.tasks]
        return {"id": self.id, "title": self.title, "tasks": tasks}
