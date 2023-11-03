import React, { useEffect, useState, useMemo, Fragment } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import './EventIndex.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment'
import OpenModalButton from "../../OpenModalButton";
import { fetchAllEventsThunk } from "../../../store/event";
import * as dates from '../../../utils/dates'


function AllEvents() {
  const dispatch = useDispatch()
  const events = useSelector(state => state.events?.Events)
  console.log(events, 'EVENTS')
  const user = useSelector(state => state.session.user)


  const eventData = events ? Object.values(events)?.map(event => {
    const time = moment(event.time, 'hh:mm A').toDate()
    return {
      id: event.id,
      title: event.name,
      start: new Date(event.date),
      end:new Date(event.date),
      time: time,
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

  useEffect(() => {
    console.log('RUNNING')
    dispatch(fetchAllEventsThunk())
  }, [dispatch])



  const defaultDate = new Date(2023, 10, 1)
  const views = Object.keys(Views).map((k) => Views[k])

  //calling momentLocalizer(moment) to configure the localizer for the calendar component, specifying that it should use the moment library for date localizer
  const localizer = momentLocalizer(moment)

  return (
    <Fragment>
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={defaultDate}
          events={eventData}
          step={60}
          views={views}
          showMultiDayTimes
          style={{ height: 600 }}
        />
      </div>
    </Fragment>
  )
}
AllEvents.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer)
}

export default AllEvents;
