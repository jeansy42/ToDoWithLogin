from flask import json
import unittest
from models.user import User
from utils.db import db
from app import create_app


class TestUserRoute(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app("test")
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.user_data = {
            "fullname": "Johnys Doe",
            "username": "johndoe",
            "password": "mypassword",
            "email": "johndoe@example.com",
            "phone": "1234567890",
        }

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_creation(self):
        res = self.client.post("/user/sing_in", json=self.user_data)
        self.assertEqual(res.status_code, 201)
        res2 = self.client.post("/user/sing_in", json=self.user_data)
        self.assertEqual(res2.status_code, 400)

        # verify if email already exists
        # _________Wrong
        res3 = self.client.get(f"/verify_email?email={self.user_data['email']}")
        res3_data = json.loads(res3.data.decode("utf-8"))
        self.assertFalse(res3_data["success"])
        # _________Ok
        res4 = self.client.get("/verify_email?email=jean@gmail.com")
        res4_data = json.loads(res4.data.decode("utf-8"))
        self.assertTrue(res4_data["success"])
        # _________Bad request
        res5 = self.client.get("/verify_email")
        self.assertEqual(res5.status_code, 400)

    def test_login(self):
        user = User(
            {
                "fullname": "Johnys Doe",
                "username": "johndoe",
                "email": "johndoe@example.com",
                "phone": "1234567890",
            }
        )
        user.set_password(self.user_data["password"])
        db.session.add(user)
        db.session.commit()
        data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        data2 = {
            "email": "lavalalola@gmail.com",
            "password": self.user_data["password"],
        }
        res = self.client.post("/user/login", json=data)
        self.assertEqual(res.status_code, 200)

        res2 = self.client.post("/user/login", json=data2)
        self.assertEqual(res2.status_code, 401)


if __name__ == "__main__":
    unittest.main()
