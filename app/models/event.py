from .db import db, environment, SCHEMA
from datetime import datetime
from .db import add_prefix_for_prod

class Event(db.Model):
  __tablename__ = 'events'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  name = db.Column(db.String(255), nullable=False)
  address = db.Column(db.String(255), nullable=True)
  city = db.Column(db.String(255), nullable=True)
  state = db.Column(db.String(255), nullable=True)
  country = db.Column(db.String(255), nullable=True)
  zip_code = db.Column(db.String(255), nullable=True)
  time = db.Column(db.String, nullable=False)
  date = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())



  def to_dict(self):
    event_date = datetime.strptime(self.date, "%m-%d-%Y")
    event_time = datetime.strptime(self.time, "%I:%M %p")
    formatted_date = event_date.strftime("%m-%d-%Y")
    formatted_time = event_time.strftime("%I:%M %p")
    return {
      "id": self.id,
      "userId": self.user_id,
      "name": self.name,
      "address": self.address,
      "city": self.city,
      "state": self.state,
      "country": self.country,
      "zipCode": self.zip_code,
      "time": formatted_time,
      "date": formatted_date,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }
