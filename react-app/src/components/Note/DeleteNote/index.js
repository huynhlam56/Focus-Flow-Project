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
      <h5>Remove Note</h5>
      <div>
        <button onClick={handleDeleteNote}>Remove</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteNoteModal;
