import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateEvent.css'
import { createEventThunk, fetchAllEventsThunk } from "../../../store/event";
import { useModal } from "../../../context/Modal";
import { TextField } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import { DatePicker } from "@mui/x-date-pickers"
import { TimeField } from '@mui/x-date-pickers/TimeField';
import '../SingleEvent/SingleEvent.css'

function CreateEvent() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setErrors({})
    const event = {
      name,
      date,
      time,
      address,
      city,
      state,
      country,
      zipCode,
    }
    try{
      const newEvent = await dispatch(createEventThunk(event))
      newEvent.id = event.id
      if(newEvent) {
        dispatch(fetchAllEventsThunk(newEvent.id))
      }
    }catch(errors) {
      setErrors(errors.errors)
      return
    }
    closeModal()
  }
  return (
    <div className="create-event-container">
      <form className='event-form' onSubmit={handleSubmit}>
        <TextField id="standard-basic" error={errors.name} helperText={errors.name} label="Event" variant="standard" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField id="labels" placeholder='OPTIONAL' error={errors.address} helperText={errors.address} label="Address" variant="standard" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField id="labels" placeholder='OPTIONAL' error={errors.city} helperText={errors.city} label="City" variant="standard" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <TextField id="labels" placeholder='OPTIONAL' inputProps={{ maxLength: 2 }} error={errors.state} helperText={errors.state} label="State" variant="standard" type="text" value={state} onChange={(e) => setState(e.target.value)} />
        <TextField id="labels" placeholder='OPTIONAL' inputProps={{ maxLength: 2 }} error={errors.country} helperText={errors.components} label="Country" variant="standard" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        <TextField id="labels" placeholder='OPTIONAL' inputProps={{ maxLength: 5}} error={errors.zip_code} helperText={errors.zip_code} label="ZipCode" variant="standard" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DatePicker']}>
              <DatePicker
                label="Date"
                value={dayjs(date)}
                onChange={dayjsObj => setDate(dayjsObj?.format('MM-DD-YYYY'))}
              />
            </DemoContainer>
            {errors.date && <p id='error-msg'>{errors.date}</p>}
          </LocalizationProvider>
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
          <button className='add-event-btn' onSubmit={handleSubmit} type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}


export default CreateEvent
