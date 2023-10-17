import unittest
from datetime import date
from unittest.mock import patch, Mock
from flask_jwt_extended import create_access_token
from models.task import Label, Task
from models.user import User
from utils.db import db
from services.task_services import get_tasks_service
from app import create_app


class TestUnitTask(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app("test")
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.user = User(
            {
                "fullname": "Johnys Doe",
                "username": "johndoe",
                "email": "johndoe@example.com",
                "phone": "1234567890",
            }
        )
        self.user.set_password("password123")
        self.task = {
            "title": "some title",
            "description": "Descripción de prueba",
            "priority": "medium",
            "due_date": "2023-12-31",
        }
        self.task_object = Task(
            description="some description",
            due_date="2024-05-08",
            priority="medium",
            project_id=None,
            title="Some title",
            user_id=1,
        )
        db.session.add(self.user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def authenticated_user(self):
        with patch("flask_jwt_extended.get_jwt_identity", return_value=self.user.id):
            access_token = create_access_token(identity=self.user.id)
            headers = {"Authorization": f"Bearer {access_token}"}
            return headers

    def test_verify(self):
        headers = self.authenticated_user()
        res = self.client.get("/verify", headers=headers)
        self.assertEqual(res.status_code, 200)

    def test_task_creation_success(self):
        headers = self.authenticated_user()
        response = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(response.status_code, 201)

    def test_task_creation_no_authentication(self):
        response = self.client.post("/tasks/add", json=self.task)
        self.assertEqual(response.status_code, 401)

    def test_task_creation_without_required_data(self):
        headers = self.authenticated_user()
        del self.task["title"]
        response = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(response.status_code, 400)

    def test_task_creation_with_labels(self):
        headers = self.authenticated_user()
        self.task["labels"] = "hola que tal"
        res = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res.status_code, 400)

        self.task["labels"] = []
        res2 = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res2.status_code, 400)

        self.task["labels"] = ["ap", "work"]
        res3 = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res3.status_code, 400)

        self.task["labels"] = ["appp", "work"]
        res4 = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res4.status_code, 201)

    def test_task_creation_with_project(self):
        headers = self.authenticated_user()

        self.task["project"] = "hi how are you"
        res = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res.status_code, 201)

        self.task["project"] = 45
        res = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res.status_code, 400)

        self.task[
            "project"
        ] = "hi how are you im fine thank you, see you later my friend"
        res = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res.status_code, 400)

        self.task["project"] = "hi"
        res = self.client.post("/tasks/add", json=self.task, headers=headers)
        self.assertEqual(res.status_code, 400)

    @patch("models.task.db.session")
    def test_add_edit_label_existing(self, mock_db):
        label = Label(title="appp", user_id=1)
        mock_db.execute.return_value.scalar_one_or_none.return_value = label

        self.task_object.add_edit_label(labels=["appp"], user_id=1)

        self.assertEqual(self.task_object.labels, [label])
        mock_db.add.assert_not_called()

    @patch("models.task.db.session")
    def test_add_edit_label_no_existing(self, mock_db):
        mock_db.execute.return_value.scalar_one_or_none.return_value = None

        self.task_object.add_edit_label(labels=["appp"], user_id=1)

        mock_db.add.assert_called()

    @patch("services.task_services.db")
    def test_get_tasks_service(self, mock_db):
        filter_params = {
            "date": "today",
            "status": "completed",
            "priority": "high",
            "order": "titleA",
        }
        user_id = 1
        task1 = Task(
            user_id=user_id,
            title="Tarea 1",
            description="Descripcion 1",
            due_date="2023-12-31",
            priority="high",
        )

        task2 = Task(
            user_id=user_id,
            title="Tarea 2",
            description="Descripcion 2",
            due_date="2023-11-15",
            priority="low",
        )
        task_dict1 = {
            "id": None,
            "title": "Tarea 1",
            "description": "Descripcion 1",
            "priority": "high",
            "status": None,
            "created_at": None,
            "updated_at": None,
            "due_date": "2023-12-31",
            "labels": [],
        }
        task_dict2 = {
            "id": None,
            "title": "Tarea 2",
            "description": "Descripcion 2",
            "priority": "low",
            "status": None,
            "created_at": None,
            "updated_at": None,
            "due_date": "2023-11-15",
            "labels": [],
        }
        expected_tasks = [task_dict1, task_dict2]
        mocked_task_objects = [task1, task2]

        mock_query = Mock()
        mock_query.filter.return_value = mock_query
        mock_query.order_by.return_value = mock_query

        mock_db.select.return_value.where.return_value = mock_query
        mock_db.session.execute.return_value.scalars.return_value = mocked_task_objects

        res = get_tasks_service(filter=filter_params, user_id=user_id)

        self.assertEqual(res, expected_tasks)
        mock_db.session.execute.assert_called_once_with(mock_query)


if __name__ == "__main__":
    unittest.main()
