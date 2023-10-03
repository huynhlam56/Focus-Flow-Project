from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    users =[]

    usernames = ["DemoUser", "MochiMochi", "JuniBug", "ZoeBear", 'PacoTaco', "EmmaLand", "LucySpace", "JohnsBook" ]
    emails = ["demouser@appacademy.io", "mochimochi@appacademy.io", "junibug@appacademy.io", "zoebear@appacademy.io", "pacotaco@appacademy.io", "emmaland@appacademy.io", "lucyspace@appacademy.io", "johnsbook@appacademy.io" ]
    for i in range(8):
        random_date_time = fake.date_time_between(start_date='-1y', end_date='now')

        user = User(
        username = usernames[i],
        password = "password",
        first_name = fake.first_name(),
        last_name = fake.last_name(),
        email = emails[i],
        created_at = random_date_time,
        updated_at = random_date_time
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()
    return users

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
