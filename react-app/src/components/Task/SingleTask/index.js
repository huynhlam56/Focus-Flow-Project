import React, { useState } from "react"
import './SingleTask.css'
import { useModal } from "../../../context/Modal";
import { fetchSingleTaskThunk } from "../../../store/task";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import DeleteTaskModal from "../DeleteTask";
import ShowNote from "../../Note/ShowNotes";


//task: "10:00 AM"
function SingleTask({task, onEditSubmit}) {
  // useEffect(() => {
  //   dispatch(fetchSingleTaskThunk(taskId))
  // }, [dispatch, taskId])
  // const task = useSelector((state) => state.tasks.SingleTask)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(task.name)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [deadline, setDeadline] = useState(task.deadline.split(' ')[0])
  const [timePeriod, setTimePeriod] = useState(task.deadline.split(' ')[1])
  const [category, setCategory] = useState(task.category)
  const [errors, setErrors] = useState({})

  const { closeModal } = useModal()


  const handleEditButton = () => {
    setIsEditing(true)
  }

  const handleCancelEditButton = (e) => {
    e.preventDefault()

    setName(name)
    setStatus(task.status)
    setPriority(task.priority)
    setDeadline(task.deadline.split(' ')[0])
    setTimePeriod(task.deadline.split(' ')[1])
    setCategory(task.category)
    setIsEditing(false)
  }

  const handleSubmitButton = async(e) => {
    e.preventDefault()

    console.log(deadline + ' ' + timePeriod)

    const editedTask = {
      id: task.id,
      name,
      priority,
      status,
      deadline: deadline + ' ' + timePeriod,
      category
    }
    await onEditSubmit(e, editedTask)
    setIsEditing(false)
    setErrors({})
    setName(editedTask.name)
    setPriority(editedTask.priority)
    setStatus(editedTask.status)
    setDeadline(editedTask.deadline.split(' ')[0])
    setTimePeriod(editedTask.deadline.split(' ')[1])
    setCategory(editedTask.category)
    // closeModal()
  }

  console.log(deadline, 'deadline')
  console.log(timePeriod, 'timePeriod')
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
          <button type='submit' onSubmit={handleSubmitButton}>Save</button>
          <button type='button' onClick={handleCancelEditButton}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Category: {category}</p>
          <p>Task: {name}</p>
          <p>Priority: {priority}</p>
          <p>Status: {status}</p>
          <p>Deadline: {deadline + ' ' + timePeriod}</p>
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
