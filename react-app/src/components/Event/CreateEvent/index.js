import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateEvent.css'
import { createEventThunk, fetchAllEventsThunk } from "../../../store/event";
import { useModal } from "../../../context/Modal";
import { TextField } from "@mui/material"

function CreateEvent() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  console.log(typeof date, 'DATEEEE')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [errors, setErrors] = useState({})
  const { clsoeModal } = useModal()

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
    clsoeModal()
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField id="standard-basic" error={errors.name} helperText={errors.name} label="Event" variant="standard" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField id="" error={errors.address} helperText={errors.address} label="Address" variant="standard" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      <TextField id="" error={errors.city} helperText={errors.city} label="City" variant="standard" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <TextField id="" inputProps={{ maxLength: 2 }} error={errors.state} helperText={errors.state} label="State" variant="standard" type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <TextField id="" inputProps={{ maxLength: 2 }} error={errors.country} helperText={errors.components} label="Country" variant="standard" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      <TextField id="" inputProps={{ maxLength: 5}} error={errors.zip_code} helperText={errors.zip_code} label="ZipCode" variant="standard" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      {/* <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            value={date.format('YYYY-MM-DD')}
            onChange={e => setDate(dayjs(e))}
            label={date.format('MM-DD-YYYY')}
            onError={errors.date}
          />
        </DemoContainer>
      </LocalizationProvider> */}
      <div className="add-cancel-btn-container">
        <button className='add-event-btn' onSubmit={handleSubmit} type="submit">Add</button>
      </div>
    </form>
  )
}


export default CreateEvent
