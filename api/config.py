from datetime import timedelta
import secrets

secret_key = secrets.token_hex(32)


class TestConfig:
    SQLALCHEMY_DATABASE_URI = "mysql://root:root@localhost/test"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "your_secret_key_for_tests"
    JWT_COOKIE_CSRF_PROTECT = False
    TESTING = True


class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = "mysql://root:root@localhost/todoapidb"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_COOKIE_SECURE = True
    JWT_TOKEN_LOCATION = ["cookies", "headers"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_COOKIE_SAMESITE = "None"
    JWT_SECRET_KEY = secret_key
