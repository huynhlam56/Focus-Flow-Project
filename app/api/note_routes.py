from flask import Blueprint, request
from app.models import Note, db, Task
from flask_login import login_required, current_user
from app.forms import NoteForm
from app.api.auth_routes import validation_errors_to_error_messages

note_routes = Blueprint("notes", __name__)

@note_routes.route("/<int:noteId>", methods=['PUT'])
@login_required
def edit_note(noteId):
  """
  Update a note on a task
  """
  note = Note.query.get(noteId)
  task = Task.query.get(note.task_id)

  if not note:
    return {'error': 'Note not found'}, 404

  if task.user_id != current_user.id:
    return {'error': 'This is not your note'}, 403

  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    note.note = form.data['note']

    db.session.commit()
    return note.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@note_routes.route("/<int:noteId>", methods=['DELETE'])
@login_required
def delete_note(noteId):
  """
  Delete a note
  """
  note = Note.query.get(noteId)

  if not note:
    return {'error': 'Note not found'}, 404

  task = Task.query.get(note.task_id)
  if task.user_id != current_user.id:
    return {'error': 'This is not your note'}, 403

  db.session.delete(note)
  db.session.commit()

  return {'message': 'Note successfully deleted'}
