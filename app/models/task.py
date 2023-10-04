from .db import db, environment, SCHEMA
from datetime import datetime

class Task(db.Model):
  __tablename__ = 'tasks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  priority = db.Column(db.Boolean, nullable=False)
  status = db.Column(db.String, nullable=False)
  category = db.Column(db.String, nullable=True)
  deadline = db.Column(db.DateTime, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
