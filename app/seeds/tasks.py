from ..models import db, Task, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_tasks():
  tasks = [
    Task(
      name='Pick up bananas at the market',
      user_id=1,
      priortiy=False,
      status='not started',
      deadline='5:00 PM',
      category='personal'
    ),
    Task(
      name='Get flowers for mom',
      user_id=1,
      priortiy=True,
      status='not started',
      deadline='5:00 PM',
      category='personal'
    ),
    Task(
      name='Finish 2 leetcode problems',
      user_id=1,
      priortiy=True,
      status='in progress',
      deadline='6:00 PM',
      category='school'
    ),
    Task(
      name='Tidy up the kitchen and do dishes',
      user_id=2,
      priortiy=True,
      status='in progress',
      deadline='6:00 PM',
      category='personal'
    ),
    Task(
      name='Start on project for work',
      user_id=2,
      priortiy=True,
      status='in progress',
      deadline='3:00 PM',
      category='work'
    ),
    Task(
      name='Do 30mins yoga session',
      user_id=2,
      priortiy=False,
      status='not started',
      deadline='9:00 AM',
      category='personal'
    ),
    Task(
      name='Finish employee report',
      user_id=3,
      priortiy=True,
      status='in progress',
      deadline='3:00 PM',
      category='work'
    ),
    Task(
      name='Pick up dry cleaning',
      user_id=3,
      priortiy=True,
      status='not started',
      deadline='5:00 PM',
      category='personal'
    ),
    Task(
      name='Pick up birthday gift for John',
      user_id=3,
      priortiy=False,
      status='not started',
      deadline='4:00 PM',
      category='personal'
    ),
    Task(
      name='Finish coding assignment',
      user_id=4,
      priortiy=True,
      status='in progress',
      deadline='1:00 PM',
      category='school'
    ),
    Task(
      name='Watch lecture video on AWS',
      user_id=4,
      priortiy=True,
      status='not started',
      deadline='3:00 PM',
      category='school'
    ),
    Task(
      name='Prepare lunch for tomorrow',
      user_id=4,
      priortiy=True,
      status='not started',
      deadline='8:00 PM',
      category='personal'
    ),
    Task(
      name="Email boss about tomorrow's meeting",
      user_id=5,
      priortiy=True,
      status='not started',
      deadline='10:00 AM',
      category='work'
    ),
    Task(
      name='Finish employee report',
      user_id=5,
      priortiy=True,
      status='in progress',
      deadline='3:00 PM',
      category='work'
    ),
    Task(
      name='Go to DMV',
      user_id=5,
      priortiy=True,
      status='in progress',
      deadline='12:00 PM',
      category='personal'
    ),
    Task(
      name='Call mom',
      user_id=6,
      priortiy=False,
      status='not started',
      deadline='3:00 PM',
      category='personal'
    ),
    Task(
      name='Check assignment board for homework',
      user_id=6,
      priortiy=True,
      status='in progress',
      deadline='4:00 PM',
      category='school'
    ),
    Task(
      name='Ask Emma to switch shifts for next week',
      user_id=6,
      priortiy=True,
      status='not started',
      deadline='3:00 PM',
      category='work'
    ),
    Task(
      name='Finish employee report',
      user_id=7,
      priortiy=True,
      status='in progress',
      deadline='2:00 PM',
      category='work'
    ),
    Task(
      name='Pick up milk',
      user_id=7,
      priortiy=False,
      status='not started',
      deadline='3:00 PM',
      category='personal'
    ),
    Task(
      name='Take Zoe to the vet',
      user_id=7,
      priortiy=True,
      status='not started',
      deadline='5:00 PM',
      category='personal'
    ),
    Task(
      name='Finish setting up KanBan board for work',
      user_id=8,
      priortiy=True,
      status='in progress',
      deadline='3:00 PM',
      category='work'
    ),
    Task(
      name='Return packages at UPS',
      user_id=8,
      priortiy=True,
      status='not started',
      deadline='1:00 PM',
      category='personal'
    ),
    Task(
      name='Pick up dinner',
      user_id=8,
      priortiy=True,
      status='not started',
      deadline='6:00 PM',
      category='personal'
    ),
  ]
  db.session.add_all(tasks)
  db.session.commit()
  return tasks

def undo_tasks():
  if environment == "production":
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM tasks"))
  db.session.commit()
