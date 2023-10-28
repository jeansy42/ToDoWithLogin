from sqlalchemy import and_, func
from models.task import Label
from utils.db import db


def get_label_by_id_service(id: int, user_id: int):
    found_label: Label = db.session.execute(
        db.select(Label).where(and_(Label.id == id, Label.user_id == user_id))
    ).scalar_one_or_none()
    return found_label


def update_label_service(label: Label, title: str):
    label.title = title
    db.session.commit()
    return {"message": "Label updated successfully"}


def delete_label_service(label: Label):
    db.session.delete(label)
    db.session.commit()
    return "", 204


def get_labels_service(user_id: int):
    labels: Label = db.session.execute(
        db.select(Label).where(Label.user_id == user_id)
    ).scalars()
    return [l.to_dict() for l in labels]


def add_label_service(title: str, user_id: int):
    label = Label(title=title, user_id=user_id)
    db.session.add(label)
    db.session.commit()
    return {"message": "Label created successfully"}, 201


def verify_label_exists_service(title: str, user_id: int):
    found_label: Label = db.session.execute(
        db.select(Label).where(
            and_(
                Label.user_id == user_id,
                func.lower(Label.title) == func.lower(title),
            )
        )
    ).scalar_one_or_none()
    if found_label:
        return {
            "success": False,
            "message": f" The '{title}' is already exists in your labels.",
        }
    return {
        "success": True,
        "message": f"The'{title}' label is available for creation.",
    }
