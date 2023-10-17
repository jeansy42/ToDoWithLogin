from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String
from bcrypt import gensalt, hashpw, checkpw
from typing import Dict, Optional, List
from utils.db import db
from models.projects import Project
from models.task import Label


class User(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    fullname: Mapped[str] = mapped_column(String(60), nullable=False)
    username: Mapped[str] = mapped_column(String(20))
    password_hash: Mapped[str] = mapped_column(String(70))
    email: Mapped[str] = mapped_column(String(60), unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    projects: Mapped[List["Project"]] = relationship(
        "Project", cascade="all, delete-orphan"
    )
    labels: Mapped[List["Label"]] = relationship("Label", cascade="all, delete-orphan")

    def __init__(self, user: Dict[str, Optional[str]]) -> None:
        self.fullname = user.get("fullname", None)
        self.username = user.get("username", None)
        self.email = user.get("email", None)
        self.phone = user.get("phone", None)

    def to_dict(self):
        return {
            "fullname": self.fullname,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
        }

    def set_password(self, password):
        salt = gensalt()
        self.password_hash = hashpw(password.encode("utf-8"), salt)

    def check_password(self, password):
        return checkpw(password.encode("utf-8"), self.password_hash.encode("utf-8"))
