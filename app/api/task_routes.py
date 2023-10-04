from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Task, Note, User, db
from app.forms import TaskForm, NoteForm
from app.api.auth_routes import validation_errors_to_error_messages

task_routes = Blueprint("tasks", __name__)

@task_routes.route("/")
@login_required
def get_tasks():
  """
  Get all tasks of current user
  """

  if not current_user:
    return {'error': 'Must log in to view tasks'}, 404

## grab all the tasks where user_id matches the id of the current user
  users_tasks = Task.query.filter_by(user_id=current_user.id).all()

  task_dict = {}
  total_tasks = len(users_tasks)
  for task in users_tasks:

    ## grab all data from to_dict func and save it to data variable
    data = task.to_dict()
    task_dict[task.id] = data

  return {"Tasks": task_dict, "numTasks": total_tasks}

@task_routes.route("/<int:taskId>", methods=['GET'])
@login_required
def get_task_detail(taskId):
  """
  Returns a dictionary containing details of a task by its id
  """

  task = Task.query.get(taskId)

  if not task:
    return {'error': 'Task is not found'}, 404

  data = task.to_dict()

  return {data["id"]: data}

@task_routes.route("/new", methods=["POST"])
@login_required
def create_task():
  """
  Create a new task
  """
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    task = Task(
      user_id = current_user.id,
      name = form.data["name"],
      priority = form.data["priority"],
      status = form.data["status"],
      category = form.data["category"],
      deadline = form.data["deadline"]
    )
    db.session.add(task)
    db.session.commit()
    return task.to_dict(), 201
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@task_routes.route("/<int:taskId>", methods=["PUT"])
@login_required
def edit_task(taskId):
  """
  Edit a task
  """

  task = Task.query.filter_by(id=taskId).first()
  if task.user_id != current_user.id:
    return {'error': 'Unauthorized'}, 401

  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    task.name = form.data["name"]
    task.priority = form.data["priority"]
    task.status = form.data["status"]
    task.category = form.data["category"]
    task.deadline = form.data["deadline"]

    db.session.commit()
    return task.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@task_routes.route("/<int:taskId>", methods=["DELETE"])
@login_required
def delete_task(taskId):
  """
  Delete a task
  """

  task = Task.query.get(taskId)
  if not task:
    return {'errors': 'Task not found'}, 404

  if task.user_id != current_user.id:
    return {'error': 'Unauthorized'}, 401

  db.session.delete(task)
  db.session.commit()

  return {'message': "Successfully deleted task"}
