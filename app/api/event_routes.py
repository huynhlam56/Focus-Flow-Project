from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Task, Note, User, Event, db
from app.forms import TaskForm, NoteForm, EventForm
from app.api.auth_routes import validation_errors_to_error_messages

event_routes = Blueprint('events', __name__)

@event_routes.route("/")
@login_required
def get_events():
  """
  Get all events of current user
  """

  if not current_user:
    return {'error': 'Must log in to view events'}, 404

  ## grab all the events where user_id matches the id of the current user
  user_events = Event.query.filter_by(user_id=current_user.id).all()

  event_dict = {}
  total_events = len(user_events)
  for event in user_events:
    ##grab all data from to_dict func and save it to data variable
    data = event.to_dict()
    event_dict[event.id] = data

  return {"Events": event_dict, "numEvents": total_events}

@event_routes.route("/<int:eventId>")
@login_required
def get_event_detail(eventId):
  """
  Returns a dictionary containing details of an event by its id
  """

  event = Event.query.get(eventId)
  print(event.user_id, 'eventttttttt')
  if(event.user_id != current_user.id):
    return {'error': 'Unauthorized'}, 401

  if not event:
    return {'error': 'Event is not found'}, 404

  data = event.to_dict()

  return {data["id"]: data}

@event_routes.route('/new', methods=['POST'])
@login_required
def create_event():
  """
  Create new event
  """
  form = EventForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    event = Event(
      user_id = current_user.id,
      name = form.data["name"],
      address = form.data["address"],
      city = form.data["city"],
      state = form.data["state"],
      country = form.data["country"],
      zip_code = form.data["zip_code"],
      time = form.data["time"],
      date = form.data["date"]
    )
    db.session.add(event)
    db.session.commit()
    return event.to_dict(), 201
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@event_routes.route("/<int:eventId>", methods=["PUT"])
@login_required
def edit_event(eventId):
  """
  Edit an event
  """
  event = Event.query.filter_by(id=eventId).first()


  if event.user_id != current_user.id:
    return {'error': 'Unauthorized'}, 401

  form = EventForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    event.name = form.data["name"]
    event.address = form.data["address"]
    event.city = form.data["city"]
    event.state = form.data["state"]
    event.coutry = form.data["country"]
    event.zip_code = form.data["zip_code"]
    event.time = form.data["time"]
    event.date = form.data["date"]

    db.session.commit()
    return event.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@event_routes.route("/<int:eventId>", methods=["DELETE"])
@login_required
def delete_event(eventId):
  """
  Delete an event
  """

  event = Event.query.get(eventId)
  if not event:
    return {'errors': 'Task not found'}, 404

  if event.user_id != current_user.id:
    return {'error': 'Unauthorized'}, 401

  db.session.delete(event)
  db.session.commit()

  return {'message': "Successfully deleted event"}
