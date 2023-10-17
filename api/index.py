from app import create_app
from utils.db import db
from models.user import User
from models.task import Task

app = create_app("development")

with app.app_context():
    db.create_all()
    User.tasks = db.relationship("Task", backref="user", cascade="all, delete-orphan")

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
