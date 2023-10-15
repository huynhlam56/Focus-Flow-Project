import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../../context/Modal";
import { deleteTaskThunk, fetchAllTasksThunk } from "../../../store/task";
import './DeleteTask.css'

function DeleteTaskModal({taskId}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleDeleteTask = async e => {
    e.preventDefault()
    await dispatch(deleteTaskThunk(taskId))
    await dispatch(fetchAllTasksThunk())
    closeModal()
  }

  const handleCancelDelete = e => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div>
      <h4 className="delete-header">Have you completed this task?</h4>
      <div className="handle-delete-container">
        <button className='confirm-delete' onClick={handleDeleteTask}>Yes</button>
        <button className='confirm-delete' onClick={handleCancelDelete}>No</button>
      </div>
    </div>
  )

}


export default DeleteTaskModal
