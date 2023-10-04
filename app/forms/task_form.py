from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, TimeField
from wtforms.validators import DataRequired, ValidationError

class TaskForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  priority = BooleanField(default=False, validators=[DataRequired()])
  status = SelectField('status', choices=[('not started', 'Not started'), ('in progress', 'In progress'), ('incompleted', 'Incompleted')], default='not started')
  deadline = TimeField('deadline', validators=[DataRequired()])
  category = SelectField('category', choices=[('personal', 'Personal'), ('work', 'Work'), ('school', 'School')])

  def validate_name(form, field):
    if not field.data:
      raise ValidationError('Task name is required')
  def validate_priority(form, field):
    if not field.data:
      raise ValidationError('Please select "yes" or "no"')
  def validate_deadline(form, field):
    if not field.data:
      raise ValidationError('Please choose a time you have to complete this task by')
