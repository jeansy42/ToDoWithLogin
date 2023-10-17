from sqlalchemy import Column, ForeignKey
from utils.db import db

label_task_association = db.Table(
    "label_task_association",
    Column("label_id", ForeignKey("label.id"), primary_key=True),
    Column("task_id", ForeignKey("task.id"), primary_key=True),
)
