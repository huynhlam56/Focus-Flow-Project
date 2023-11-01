from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange


def validate_zip_code(form, field):
  if not (field.data.isDigit() and len(field.data) == 5):
    raise ValidationError('ZIP code must be 5 digits')

class EventForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  address = StringField('address')
  city = StringField('city')
  state = StringField('state')
  country = StringField('country')
  zip_code = StringField('zip code', validators=[validate_zip_code])
  time = StringField('time', validators=[DataRequired()])
  date = StringField('date', validators=[DataRequired()])
  
