from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField, TimeField
from wtforms.validators import DataRequired, ValidationError


class NoteForm(FlaskForm):
  note = StringField('note', validators=[DataRequired()])

  def validate_note(form, field):
    if not field.data:
      raise ValidationError('Please enter a note')
