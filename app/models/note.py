from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Note(db.Model):
  __tablename__ = 'notes'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")), unique=True)
  note = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  task = db.relationship("Task", back_populates="note")

  def to_dict(self):
    return {
      'id': self.id,
      'taskId': self.task_id,
      'note': self.note,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at
    }
