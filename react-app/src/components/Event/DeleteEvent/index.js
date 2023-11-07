import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../../context/Modal";
import { deleteEventThunk, fetchAllEventsThunk } from "../../../store/event";
import './DeleteEvent.css'
import Delete from "@mui/icons-material/Delete";

function DeleteEventModal({eventId}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleDeleteEvent = async e => {
    e.preventDefault()
    await dispatch(deleteEventThunk(eventId))
    await dispatch(fetchAllEventsThunk())
    closeModal()
  }

  const handleCancelDelete = e => {
    e.preventDefault()
    closeModal()
  }
  return (
    <div>
      <h4 className="delete-header">Delete Event?</h4>
      <div className="handle-delete-container">
        <button className='confirm-delete' onClick={handleDeleteEvent}>Yes</button>
        <button className='confirm-delete' onClick={handleCancelDelete}>No</button>
      </div>
    </div>
  )
}

export default DeleteEventModal;
