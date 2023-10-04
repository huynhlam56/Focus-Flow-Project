from .db import db, environment, SCHEMA
from datetime import datetime
from .db import add_prefix_for_prod

class Task(db.Model):
  __tablename__ = 'tasks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  name = db.Column(db.String(255), nullable=False)
  priority = db.Column(db.Boolean, nullable=False)
  status = db.Column(db.String, nullable=False)
  category = db.Column(db.String, nullable=True)
  deadline = db.Column(db.Time, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  note = db.relationship("Note", back_populates='task')

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.user_id,
      "name": self.name,
      "priority": self.priority,
      "status": self.status,
      "category": self.category,
      "dealine": self.deadline.strftime('%I:%M %p'),
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }
