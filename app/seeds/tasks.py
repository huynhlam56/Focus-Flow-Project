from ..models import db, Task, environment, SCHEMA
from datetime import datetime, time
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_tasks():
  tasks = [
    Task(
      name='Pick up bananas at the market',
      user_id=1,
      priority=False,
      status='not started',
      deadline=time(10, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Get flowers for mom',
      user_id=1,
      priority=True,
      status='not started',
      deadline=time(14, 30),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Finish 2 leetcode problems',
      user_id=1,
      priority=True,
      status='in progress',
      deadline=time(20, 0),
      category='school',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Tidy up the kitchen and do dishes',
      user_id=2,
      priority=True,
      status='in progress',
      deadline=time(20, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Start on project for work',
      user_id=2,
      priority=True,
      status='in progress',
      deadline=time(16, 20),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Do 30mins yoga session',
      user_id=2,
      priority=False,
      status='not started',
      deadline=time(9, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Finish employee report',
      user_id=3,
      priority=True,
      status='in progress',
      deadline=time(11, 30),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Pick up dry cleaning',
      user_id=3,
      priority=True,
      status='not started',
      deadline=time(16, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Pick up birthday gift for John',
      user_id=3,
      priority=False,
      status='not started',
      deadline=time(14, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Finish coding assignment',
      user_id=4,
      priority=True,
      status='in progress',
      deadline=time(14, 20),
      category='school',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Watch lecture video on AWS',
      user_id=4,
      priority=True,
      status='not started',
      deadline=time(17, 0),
      category='school',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Prepare lunch for tomorrow',
      user_id=4,
      priority=True,
      status='not started',
      deadline=time(19, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name="Email boss about tomorrow's meeting",
      user_id=5,
      priority=True,
      status='not started',
      deadline=time(10, 0),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Finish employee report',
      user_id=5,
      priority=True,
      status='in progress',
      deadline=time(15, 0),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Go to DMV',
      user_id=5,
      priority=True,
      status='in progress',
      deadline=time(12, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Call mom',
      user_id=6,
      priority=False,
      status='not started',
      deadline=time(16, 0),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Check assignment board for homework',
      user_id=6,
      priority=True,
      status='in progress',
      deadline=time(16, 0),
      category='school',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Ask Emma to switch shifts for next week',
      user_id=6,
      priority=True,
      status='not started',
      deadline=time(15, 0),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Finish employee report',
      user_id=7,
      priority=True,
      status='in progress',
      deadline=time(14, 40),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Pick up milk',
      user_id=7,
      priority=False,
      status='not started',
      deadline=time(17, 20),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Take Zoe to the vet',
      user_id=7,
      priority=True,
      status='not started',
      deadline=time(13, 40),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Finish setting up KanBan board for work',
      user_id=8,
      priority=True,
      status='in progress',
      deadline=time(19, 0),
      category='work',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Return packages at UPS',
      user_id=8,
      priority=True,
      status='not started',
      deadline=time(17, 10),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    ),
    Task(
      name='Pick up dinner',
      user_id=8,
      priority=True,
      status='not started',
      deadline=time(18, 10),
      category='personal',
      created_at=current_date,
      updated_at=current_date
    )
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
