import React, { useState } from "react"
import './SingleEvent.css'
import OpenModalButton from "../../OpenModalButton"
import { useModal } from "../../../context/Modal"
import { TextField } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import { DatePicker } from "@mui/x-date-pickers"
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteEventModal from "../DeleteEvent"
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from "@mui/material";
import { TimeField } from '@mui/x-date-pickers/TimeField';

function SingleEvent({event, onEditCreateSubmit}) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(event.title)
  const [date, setDate] = useState(event.date)
  const [time, setTime] = useState(event.time)
  const [address, setAddress] = useState(event.address)
  const [city, setCity] = useState(event.city)
  const [state, setState] = useState(event.state)
  const [country, setCountry] = useState(event.country)
  const [zipCode, setZipCode] = useState(event.zipCode)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  const handleEditButton = () => {
    setIsEditing(true)
  }

  const handleCancelEditButton = (e) => {
    e.preventDefault()

    setName(event.name)
    setDate(date)
    setTime(time)
    setAddress(event.address)
    setCity(event.city)
    setState(event.state)
    setCountry(event.country)
    setZipCode(event.zipCode)
    setIsEditing(false)
  }

  const handleSubmitButton = async(e) => {
    e.preventDefault()
    try {
      const editedEvent = {
        id: event.id,
        name,
        date,
        time,
        address,
        city,
        state,
        country,
        zipCode
      }
      console.log(typeof date, typeof time, 'DATETIMEEEEE')
      await onEditCreateSubmit(e, editedEvent)
      e.preventDefault()
      setIsEditing(false)
      setErrors({})
      setName(editedEvent.name)
      setDate(editedEvent.date)
      setTime(editedEvent.time)
      setAddress(editedEvent.address)
      setCity(editedEvent.city)
      setState(editedEvent.state)
      setCountry(editedEvent.country)
      setZipCode(editedEvent.zipCode)
      console.log(zipCode, 'INSIDE OF HANDLE')
        // closeModal()
      }catch(errors) {
        setErrors(errors.errors)
        return
      }
    // closeModal()
  }
  console.log(zipCode, 'OUTSIDE OF HANDLE')


  if(!event || Object.keys(event) === 0) return null

  return (
    <div className="edit-event-container">
      {isEditing ? (
        <form className='event-form' onSubmit={handleSubmitButton}>
          <TextField style={{paddingTop:'15px'}} id="standard-basic" error={errors.name} helperText={errors.name} label="Event:" variant="standard" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField id="labels" placeholder='OPTIONAL' error={errors.address} helperText={errors.address} label="Address" variant="standard" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextField id="labels" placeholder='OPTIONAL' error={errors.city} helperText={errors.city} label="City" variant="standard" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField id="labels" placeholder='OPTIONAL' inputProps={{ maxLength: 2 }} error={errors.state} helperText={errors.state} label="State" variant="standard" type="text" value={state} onChange={(e) => setState(e.target.value)} />
          <TextField id="labels" placeholder='OPTIONAL' inputProps={{ maxLength: 2 }} error={errors.country} helperText={errors.components} label="Country" variant="standard" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          <TextField id="labels" placeholder='OPTIONAL' inputProps={{ maxLength: 5}} error={errors.zip_code} helperText={errors.zip_code} label="ZipCode" variant="standard" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label= 'Date'
                value={dayjs(date)}
                onChange={dayjsObj => setDate(dayjsObj?.format('MM-DD-YYYY'))}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.date && <p id='error-msg'>{errors.date}</p>}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimeField']}>
              <TimeField
                label='Time'
                value={dayjs(time, 'hh:mm A')}
                onChange={e => setTime(e?.format('hh:mm A'))}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.time && <p id='error-msg'>{errors.time}</p>}
          <div className="add-cancel-btn-container">
            <button className='save-cancel-task-btn' type='submit' onSubmit={handleSubmitButton}>Save</button>
            <button className='save-cancel-task-btn' type='button' onClick={handleCancelEditButton}>Cancel</button>
          </div>
        </form>
      ) : (
      <div>
        <div className="single-event-container">
          <h3 className="event-title">{name}</h3>
          <p className="event-fields"><b className="fields-label">Date:</b> {date}</p>
          <p className="event-fields"><b className="fields-label">Time:</b>{time}</p>
          {(address, city, state, country, zipCode) ?
            <p className="event-fields"><b className="fields-label">Address:</b> {address} {city}, {state} {zipCode} </p>
            : <p className="event-fields"><b className="fields-label">Address:</b> None Provided</p>
          }
        </div>
        <div className="edit-delete-btns">
        <IconButton style={{fontSize: '20px', color: 'gray', display:'flex', flexDirection:'row', alignItems: 'baseline'}}  onClick={handleEditButton} color="primary" aria-label="edit">
          <EditNoteIcon style={{fontSize: '40px', padding: '0px'}}/>
        </IconButton>
          <OpenModalButton
            buttonText={<DeleteIcon style={{fontSize: '30px', cursor: 'pointer'}}/>}
            modalComponent={<DeleteEventModal eventId={event.id}/>}
            styleClass='delete-btn'
          />
        </div>
      </div>
      )}
    </div>
  )
}


export default SingleEvent
