from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TimeField
from wtforms.validators import DataRequired, ValidationError, Length


class TaskForm(FlaskForm):

  name = StringField('name', validators=[DataRequired(), Length(max=50)])
  priority = BooleanField('priority')
  status = SelectField('status', choices=[('Not Started', 'Not started'), ('In Progress', 'In progress'), ('Incomplete', 'Incomplete')], default='Not Started')
  deadline = StringField('deadline', validators=[DataRequired()])
  category = SelectField('category', choices=[('Personal', 'Personal'), ('Work', 'Work'), ('School', 'School')])

  def validate_name(form, field):
    if not field.data:
      raise ValidationError('This field is required')
  def validate_priority(form, field):
    if field.data not in (True, False):
      raise ValidationError('Please select "yes" or "no"')
  def validate_deadline(form, field):
    if not field.data:
      raise ValidationError('Please choose a time you have to complete this task by')
