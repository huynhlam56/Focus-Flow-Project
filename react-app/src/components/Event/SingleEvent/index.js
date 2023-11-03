import React, { useState } from "react"
import './SingleEvent.css'
import OpenModalButton from "../../OpenModalButton"
import { useModal } from "../../../context/Modal"

function SingleEvent({event, onEditCreateSubmit}) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(event.name)
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
    setDate(event.date)
    // setTime(event.time)
    setAddress(event.address)
    setCity(event.city)
    setState(event.state)
    setCountry(event.country)
    setZipCode(event.zipCode)

    setIsEditing(false)
  }

  const handleSubmitButton = async(e) => {
    e.preventDefault()

    const editedEvent = {
      id: event.id,
      name,
      date,
      // time,
      address,
      city,
      state,
      country,
      zipCode
    }
    await onEditCreateSubmit(e, editedEvent)
    e.preventDefault()
    setIsEditing(false)
    setErrors({})
    setName(editedEvent.name)
    setDate(editedEvent.date)
    // setTime(editedEvent.time)
    setAddress(editedEvent.address)
    setCity(editedEvent.city)
    setState(editedEvent.state)
    setCountry(editedEvent.country)
    setZipCode(editedEvent.zipCode)

    closeModal()
  }

  if(!event || Object.keys(event) === 0) return null

  return (
    <div>
      {/* {isEditing ? (
        <form onSubmit={handleSubmitButton}>
          <TextField id="standard-basic" error={errors.name} helperText={errors.name} label="Task" variant="standard" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </form>
      )} */}
      <div>
        <h3>{event.title}</h3>
        {/* <p>{event.date}</p> */}
        {/* <p>{event.time}</p> */}
        <p><b>Address:</b> {event.address} {event.city}, {event.state} {event.zipCode} </p>
      </div>
    </div>
  )
}


export default SingleEvent
