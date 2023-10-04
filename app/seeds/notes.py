from ..models import db, Note, environment, SCHEMA
from datetime import datetime, time
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_notes():
  notes = [
    Note(
      note="Tip: pick the green ones so it doesn't go bad quickly",
      task_id=1
    ),
    Note(
      note="Mom likes tulips and peonies",
      task_id=2
    ),
    Note(
      note="Try to do one easy and one medium. DON'T look at the answers!!",
      task_id=3
    ),
    Note(
      note="Don't forget to unload the dishes from the dishwasher!!",
      task_id=4
    ),
    Note(
      note="Your team is counting on you to start! Think about what you want to have done for tomorrow",
      task_id=5
    ),
    Note(
      note="Create healthy habits! You'll thank yourself for this later",
      task_id=6
    ),
    Note(
      note="Jane's report still needs to be completed. She's been doing great on her project so far!",
      task_id=7
    ),
    Note(
      note="Gift ideas: new shoes, art pieces, a jacket. He's been asking for some new shoes, so maybe that.",
      task_id=9
    ),
    Note(
      note="Go over your notes and try not to look up solutions unless you're really stuck",
      task_id=10
    ),
    Note(
      note="Video can be found under the resources folder in week 20",
      task_id=11
    ),
    Note(
      note="Let's make a salmon bowl. Pack some fruits as well, they're going bad",
      task_id=12
    ),
    Note(
      note="Ask him about project deadline",
      task_id=13
    ),
    Note(
      note="Mark didn't much for innovation Friday this week, ask him if everything is ok before writing his report.",
      task_id=14
    ),
    Note(
      note="Don't procratinate, your license is expiring soon!",
      task_id=15
    ),
    Note(
      note="Check for missing assignments as well",
      task_id=17
    ),
    Note(
      note="Bribe her if you can",
      task_id=18
    ),
    Note(
      note="Just get it done, you've put it off long enough",
      task_id=19
    ),
    Note(
      note="Ask about the spot on her face",
      task_id=21
    ),
    Note(
      note="This will help you organize your project",
      task_id=22
    ),
    Note(
      note="Isaia mentioned he wanted sushi tonight",
      task_id=24
    )
  ]
  db.session.add_all(notes)
  db.session.commit()
  return notes

def undo_notes():
  if environment == "production":
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM notes"))
  db.session.commit()
