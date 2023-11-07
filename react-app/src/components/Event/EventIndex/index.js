import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventIndex.css'
import './react-big-calendar.css';
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { fetchAllEventsThunk, updateEventThunk } from "../../../store/event";
import * as dates from '../../../utils/dates'
import SingleEvent from "../SingleEvent";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import CreateEvent from "../CreateEvent";


function AllEvents() {
  const dispatch = useDispatch()
  // const [errors, setErrors] = useState({})
  const events = useSelector(state => state.events?.Events)
  const user = useSelector(state => state.session.user)
  // const [selectedEvent, setSelectedEvent] = useState(null)
  const { closeModal } = useModal()
  const {setModalContent} = useModal()

  useEffect(() => {
    dispatch(fetchAllEventsThunk())
  }, [dispatch])

  const eventData = events ? Object.values(events)?.map(event => {
    const dateTime = (`${event.date}, ${event.time}`)
    const dateTimeFormatted = new Date(dateTime)

    return {
      id: event.id,
      title: event.name,
      start: dateTimeFormatted,
      end: dateTimeFormatted,
      date: event.date,
      time: event.time,
      address: event.address,
      city: event.city,
      state: event.state,
      country: event.country,
      zipCode: event.zipCode,
      createdAt: new Date(event.createdAt),
      updatedAt: new Date(event.updatedAt),
      userId: event.userId,
    }
  }) : []

  const handleEditSubmit = async(e, event) => {
    e.preventDefault()
    try{
      await dispatch(updateEventThunk(event, event.id))
    }catch(errors) {
      throw await errors
    }
  }

  const handleSelectEvent = (event, e) => {

    setModalContent(<SingleEvent event={event} onEditCreateSubmit={handleEditSubmit} />)
  }

  const defaultDate = new Date()
  // const views = Object.keys(Views).map((k) => Views[k])
  const views = [
    "month",
    "agenda"
  ]

  //calling momentLocalizer(moment) to configure the localizer for the calendar component, specifying that it should use the moment library for date localizer
  const localizer = momentLocalizer(moment)

  return (
    <Fragment>
      <div className="add-event-btn-container">
        <OpenModalButton
        buttonText='Add Event'
        modalComponent={<CreateEvent />}
        styleClass='create-event-btn'
        />
      </div>
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={defaultDate}
          events={eventData}
          step={60}
          views={views}
          showMultiDayTimes
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          popup={true}
        />
      </div>
    </Fragment>
  )
}

export default AllEvents;
