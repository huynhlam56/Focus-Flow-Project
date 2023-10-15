import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../../context/Modal";
import { deleteNoteThunk, fetchAllTasksThunk } from "../../../store/task";

function DeleteNoteModal({noteId, taskId}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleDeleteNote = async(e) => {
    await dispatch(deleteNoteThunk(noteId))
    dispatch(fetchAllTasksThunk(taskId))
    closeModal()
  }

  const handleCancel = async(e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div>
      <h4 className="delete-header">Remove Note?</h4>
      <div className="handle-delete-container">
        <button className='confirm-delete' onClick={handleDeleteNote}>Yes</button>
        <button className='confirm-delete' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteNoteModal;
