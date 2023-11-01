from ..models import db, Event, environment, SCHEMA
from datetime import datetime, time
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

current_date = datetime.now()

def seed_events():
  events = [
    Event(
      user_id=1,
      name='Company conference',
      address='123 Maple St',
      city=fake.city(),
      state=fake.state(),
      country='US',
      zip_code=fake.zipcode(),
      time='10:30 AM',
      date='November 4, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=1,
      name="Alex's birthday party",
      address='213 Balboa Dr',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='1234',
      time='5:00 PM',
      date='November 5, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=1,
      name='Company conference',
      address='123 Maple St',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='1234',
      time='10:30 AM',
      date='December 4, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=1,
      name='Family dinner',
      address='534 Restaurant Way',
      city='Los Angeles',
      state='CA',
      country='US',
      zip_code='5345',
      time='10:30 AM',
      date='November 7, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=1,
      name='Flight to New York',
      address='San Diego International Airport',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='1234',
      time='10:30 AM',
      date='November 10, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=2,
      name='Company conference',
      address='123 Maple St',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='1234',
      time='10:30 AM',
      date='November 4, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=2,
      name="Alex's birthday party",
      address='213 Balboa Dr',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='1234',
      time='5:00 PM',
      date='November 5, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=2,
      name="Disneyland",
      address='123 Disney Way',
      city='Los Angeles',
      state='CA',
      country='US',
      zip_code='92183',
      time='8:00 AM',
      date='November 7, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=2,
      name="Company party",
      address='Fancy Restaurant',
      city='Palm Springs',
      state='CA',
      country='US',
      zip_code='93104',
      time='5:00 PM',
      date='November 11, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=2,
      name="Book club meeting",
      address='583 Brookstone Dr',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='12345',
      time='6:00 PM',
      date='November 12, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=3,
      name="Alex's birthday party",
      address='213 Balboa Dr',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='1234',
      time='5:00 PM',
      date='November 5, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=3,
      name='Company conference',
      address='123 Maple St',
      city=fake.city(),
      state=fake.state(),
      country='US',
      zip_code=fake.zipcode(),
      time='10:30 AM',
      date='November 4, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=3,
      name="Book club meeting",
      address='583 Brookstone Dr',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='12345',
      time='6:00 PM',
      date='November 12, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=3,
      name="Soccer game",
      address='123 Some School',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='12345',
      time='6:00 PM',
      date='November 12, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
    Event(
      user_id=3,
      name="Doctor's Appointment",
      address='123 Some Clinic',
      city='San Diego',
      state='CA',
      country='US',
      zip_code='12345',
      time='1:00 PM',
      date='November 9, 2023',
      created_at=current_date,
      updated_at=current_date
    ),
  ]
  db.session.add_all(events)
  db.session.commit()
  return events

def undo_events():
  if environment == "production":
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM events"))
  db.session.commit()
