import React, { useState } from "react"
import './SingleTask.css'
import { useModal } from "../../../context/Modal";
import { fetchSingleTaskThunk } from "../../../store/task";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import DeleteTaskModal from "../DeleteTask";
import ShowNote from "../../Note/ShowNotes";



function SingleTask({task, onEditSubmit}) {
  // useEffect(() => {
  //   dispatch(fetchSingleTaskThunk(taskId))
  // }, [dispatch, taskId])
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(task.name)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [deadline, setDeadline] = useState(task.deadline)
  const [timePeriod, setTimePeriod] = useState(task.timePeriod)
  const [category, setCategory] = useState(task.category)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal


  const handleEditButton = () => {
    setIsEditing(true)
  }

  const handleCancelEditButton = () => {
    setIsEditing(false)
    setName(task.name)
    setPriority(task.priority)
    setDeadline(task.deadline)
    setCategory(task.category)
  }

  const handleSubmitButton = e => {
    e.preventDefault()
    setErrors({})
    const editedTasks = {
      id: task.id,
      name,
      priority,
      status,
      deadline,
      category
    }
    onEditSubmit(e, editedTasks)
    setIsEditing(false)
  }


  if(!task || Object.keys(task) === 0) return null

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmitButton}>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value='Personal'>Personal</option>
              <option value='Work'>Work</option>
              <option value='School'>School</option>
            </select>
          </label>
          <label>
            Task:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </label>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='Not Started'>Not Started</option>
              <option value='In Progress'>In Progress</option>
              <option value='Incomplete'>Incomplete</option>
            </select>
          </label>
          <label>
            Deadline:
            <select value={deadline} onChange={(e) => setDeadline(e.target.value)}>
              <option value='12:00'>12:00</option>
              <option value='01:00'>01:00</option>
              <option value='02:00'>02:00</option>
              <option value='03:00'>03:00</option>
              <option value='04:00'>04:00</option>
              <option value='05:00'>05:00</option>
              <option value='06:00'>06:00</option>
              <option value='07:00'>07:00</option>
              <option value='08:00'>08:00</option>
              <option value='09:00'>09:00</option>
              <option value='10:00'>10:00</option>
              <option value='11:00'>11:00</option>
            </select>
            <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          </label>
          <button onSubmit={handleSubmitButton}>Save</button>
          <button onSubmit={handleCancelEditButton}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Category: {task.category}</p>
          <p>Task: {task.name}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>Deadline: {task.deadline}</p>
          <button onClick={handleEditButton}>Edit Task</button>
          <OpenModalButton
            buttonText = "Delete"
            modalComponent={<DeleteTaskModal taskId={task.id}/>}
          />
        </div>
      )}
    <div>
      <ShowNote task={task} />
    </div>
    </div>
  )
}


export default SingleTask;
