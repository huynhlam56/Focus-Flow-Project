from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange


def validate_zip_code(form, field):

  if not (field.data is None or field.data.isdigit() or len(field.data) != 5):
    print(type(field.data))
    raise ValidationError('ZIP code must be 5 digits')

def validate_country_state(form, field):
  if len(field.data) > 2:
    raise ValidationError("Please enter abbreviated name(e.g. 'CA', 'US')")

class EventForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  address = StringField('address')
  city = StringField('city')
  state = StringField('state', validators=[validate_country_state])
  country = StringField('country', validators=[validate_country_state])
  zip_code = StringField('zip_code', validators=[validate_zip_code])
  time = StringField('time', validators=[DataRequired()])
  date = StringField('date', validators=[DataRequired()])
