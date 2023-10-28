from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey
from typing import List
from utils.db import db
from models.task import Task


class Project(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(40), nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    tasks: Mapped[List["Task"]] = relationship("Task", cascade="all,delete-orphan")

    def __init__(self, title, user_id) -> None:
        self.title = title
        self.user_id = user_id

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "tasks": [f.to_dict() for f in self.tasks],
        }
