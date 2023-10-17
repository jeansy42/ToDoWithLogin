from marshmallow import Schema, fields, validate, validates, ValidationError
from flask_jwt_extended import current_user
from sqlalchemy import and_, func
from .db import db
from models.user import User
from datetime import datetime, date
import re


class UserValidator(Schema):
    fullname = fields.String(required=True, validate=validate.Length(min=10, max=60))
    username = fields.String(required=True, validate=validate.Length(min=2, max=20))
    email = fields.Email()
    password = fields.String(required=True, validate=validate.Length(min=8, max=30))
    phone = fields.String(required=False, allow_none=True)

    @validates("email")
    def check_if_email_exists(self, value):
        check_email = db.session.execute(
            db.select(User.email).where(User.email == value)
        ).scalar_one_or_none()
        if check_email:
            raise ValidationError("This email already exists!")

    @validates("phone")
    def check_valid_phone(self, value):
        phone_pattern = re.compile(
            r"^(\+\d{1,3}\s?)?(\d{1,4}[\s-]?)?(\(\d{1,4}\))?[0-9\s-]{7,}$"
        )
        if value:
            if not phone_pattern.match(value):
                raise ValidationError("Invalid phone number!")


class TaskValidator(Schema):
    title = fields.String(required=True, validate=validate.Length(min=5, max=40))
    description = fields.String(
        required=False, allow_none=True, validate=validate.Length(max=200)
    )
    priority = fields.String(
        required=True, validate=validate.OneOf(["low", "medium", "high"])
    )
    labels = fields.List(
        fields.String(
            required=False, allow_none=True, validate=validate.Length(min=3, max=20)
        ),
        required=False,
        allow_none=True,
        validate=validate.Length(min=1),
    )
    project = fields.String(
        required=False, allow_none=True, validate=validate.Length(min=10, max=40)
    )
    due_date = fields.String(required=True)

    @validates("due_date")
    def check_duedate(self, value):
        try:
            date_to_check = datetime.strptime(value, "%Y-%m-%d").date()
            if date_to_check < date.today():
                raise ValidationError("Due date must by in the future!")
        except ValueError:
            raise ValidationError("Wrong date format, must by YYYY-MM-DD!")


class TaskFilterValidator(Schema):
    priority = fields.String(
        required=False,
        allow_none=True,
    )
    status = fields.String(
        required=False,
        allow_none=True,
    )
    date = fields.String(
        required=False,
        allow_none=True,
    )
    order = fields.String(
        required=False,
        allow_none=True,
    )

    @validates("priority")
    def check_priority(self, value):
        if value != None and value != "":
            if value not in ["low", "medium", "high"]:
                raise ValidationError("Must be one of: low, medium, high.")

    @validates("status")
    def check_status(self, value):
        if value != None and value != "":
            if value not in ["completed", "pending"]:
                raise ValidationError("Must be one of: completed, pending.")

    @validates("date")
    def check_date(self, value):
        if value != None and value != "":
            if value not in [
                "today",
                "tomorrow",
                "week",
                "month",
                "year",
                "beyond_this_year",
            ]:
                raise ValidationError(
                    "Must be one of: today,tomorrow,week, month, year,beyond_this_year."
                )

    @validates("order")
    def check_order(self, value):
        if value != None and value != "":
            if value not in ["titleA", "due_dateA", "titleD", "due_dateD"]:
                raise ValidationError(
                    "Must be one of: titleA, due_dateA, titleD, due_dateD."
                )


class LabelValidator(Schema):
    title = fields.String(required=True, validate=validate.Length(min=3, max=20))

    @validates("title")
    def check_title(self, value):
        from models.task import Label

        found_label: Label = db.session.execute(
            db.select(Label).where(
                and_(
                    Label.user_id == current_user.id,
                    func.lower(Label.title) == func.lower(value),
                )
            )
        )
        if found_label:
            raise ValidationError(
                f"'{value}' is already exists in current user's labels."
            )


class ProjectValidator(Schema):
    title = fields.String(required=True, validate=validate.Length(min=10, max=40))

    @validates("title")
    def check_title(self, value):
        from models.projects import Project

        found_project: Project = db.session.execute(
            db.select(Project).where(
                and_(
                    Project.user_id == current_user.id,
                    func.lower(Project.title) == func.lower(value),
                )
            )
        )
        if found_project:
            raise ValidationError(
                f"'{value}' is already exists in current user's projects."
            )
