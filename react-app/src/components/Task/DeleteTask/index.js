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

  return (
    <div>
      <h4>Delete Tasks</h4>
      <div>
        <button onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  )

}


export default DeleteTaskModal
