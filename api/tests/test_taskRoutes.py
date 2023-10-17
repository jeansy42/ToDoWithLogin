import unittest
from flask import json
from datetime import datetime
from models.task import Task
from models.user import User
from utils.db import db
from app import create_app


class TestTaskRoute(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app("test")
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.task_data = {
            "title": "first task of test",
            "description": "Some description of first task of test",
            "priority": "medium",
            "due_date": "2023-12-01",
        }

        self.user_data = {
            "fullname": "Johnys Doe",
            "username": "johndoe",
            "email": "johndoe@example.com",
            "phone": "1234567890",
        }
        self.user = User(self.user_data)
        self.user.set_password("password123")
        db.session.add(self.user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_add_tasks_without_authentication(self):
        res = self.client.post("/tasks/add", json=self.task_data)
        self.assertEqual(res.status_code, 401)

    def test_add_tasks_with_authentication(self):
        login_data = {
            "email": self.user_data["email"],
            "password": "password123",
        }
        # Login
        res1 = self.client.post("/user/login", json=login_data)
        self.assertEqual(res1.status_code, 200)

        # Add Task
        res2 = self.client.post("/tasks/add", json=self.task_data)
        self.assertEqual(res2.status_code, 201)

        # Set status of task OK
        self.client.get("/tasks/set_status/1")
        task = db.session.execute(
            db.select(Task).where(Task.id == 1)
        ).scalar_one_or_none()
        self.assertEqual(task.status, "completed")

        # Set status of task Wrong
        res3 = self.client.get("/tasks/set_status/hihowareyou")
        self.assertEqual(res3.status_code, 400)

        # get tasks
        task2 = {
            "title": "task of test 2",
            "description": "Some description task2 of test 2",
            "priority": "medium",
            "due_date": datetime.now().strftime("%Y-%m-%d"),
        }
        task3 = {
            "title": "task of test 3",
            "description": "Some description task3 of test 3",
            "priority": "low",
            "due_date": "2025-12-24",
        }
        task4 = {
            "title": "second task of test4",
            "description": "Some description second task of test4",
            "priority": "high",
            "due_date": "2023-09-30",
        }

        res411 = self.client.post("/tasks/add", json=task2)
        self.assertEqual(res411.status_code, 201)
        res412 = self.client.post("/tasks/add", json=task3)
        self.assertEqual(res412.status_code, 201)
        res413 = self.client.post("/tasks/add", json=task4)
        self.assertEqual(res413.status_code, 201)

        # __________without filters
        res4 = self.client.get("/tasks")
        res4_data = json.loads(res4.data.decode("utf-8"))
        self.assertEqual(len(res4_data), 4)

        # ___________with filters OK
        # ________________________status
        res5 = self.client.get("/tasks?status=completed")
        res5_data = json.loads(res5.data.decode("utf-8"))
        self.assertEqual(len(res5_data), 1)
        # ________________________status & priority
        res6 = self.client.get("/tasks?status=pending&priority=medium")
        res6_data = json.loads(res6.data.decode("utf-8"))
        self.assertEqual(len(res6_data), 1)
        # _________________________date
        # ______________________________today
        res7 = self.client.get("/tasks?date=today")
        res7_data = json.loads(res7.data.decode("utf-8"))
        self.assertEqual(len(res7_data), 1)
        # ______________________________this year
        res8 = self.client.get("/tasks?date=year")
        res8_data = json.loads(res8.data.decode("utf-8"))
        self.assertEqual(len(res8_data), 3)
        # ______________________________this month
        res9 = self.client.get("/tasks?date=month")
        res9_data = json.loads(res9.data.decode("utf-8"))
        self.assertEqual(len(res9_data), 2)
        # ___________with filters OK
        res10 = self.client.get("/tasks?date=daD&akndakn&kadakds")
        self.assertEqual(res10.status_code, 400)

        # get one task
        # ____________wrong value
        res11 = self.client.get("/tasks/hola")
        self.assertEqual(res11.status_code, 400)
        res111 = self.client.get("/tasks/20")
        self.assertEqual(res111.status_code, 404)
        # ____________rigth value
        # ________________________get
        res12 = self.client.get("/tasks/1")
        self.assertEqual(res12.status_code, 200)
        # ________________________update OK
        res13 = self.client.put("/tasks/1", json=self.task_data)
        self.assertEqual(res13.status_code, 200)
        # ________________________update Wrong
        res14 = self.client.put("/tasks/1", json={"title": ""})
        self.assertEqual(res14.status_code, 400)
        # ________________________delete
        res15 = self.client.delete("/tasks/1")
        self.assertEqual(res15.status_code, 204)


if __name__ == "__main__":
    unittest.main()
