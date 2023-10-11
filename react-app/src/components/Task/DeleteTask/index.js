import React from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../../context/Modal";
import { deleteTaskThunk, fetchAllTasksThunk } from "../../../store/task";


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
      <h4>Are you sure you want to delete this task?</h4>
      <div>
        <button onClick={handleDeleteTask}>Yes</button>
        <button onClick={handleCancelDelete}>No</button>
      </div>
    </div>
  )

}


export default DeleteTaskModal
