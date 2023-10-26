import React, { useState } from "react"
import './SingleTask.css'
import OpenModalButton from "../../OpenModalButton";
import DeleteTaskModal from "../DeleteTask";
import ShowNote from "../../Note/ShowNotes";
import { useModal } from "../../../context/Modal";


function SingleTask({task, onEditCreateSubmit}) {

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

    const editedTask = {
      id: task.id,
      name,
      priority,
      status,
      deadline: deadline + ' ' + timePeriod,
      category
    }
    await onEditCreateSubmit(e, editedTask)
    e.preventDefault()
    setIsEditing(false)
    setErrors({})
    setName(editedTask.name)
    setPriority(editedTask.priority)
    setStatus(editedTask.status)
    setDeadline(editedTask.deadline.split(' ')[0])
    setTimePeriod(editedTask.deadline.split(' ')[1])
    setCategory(editedTask.category)

    closeModal()
  }

  if(!task || Object.keys(task) === 0) return null

  return (
    <div className="task-form-container">
      {isEditing ? (
        <form className='task-form' onSubmit={handleSubmitButton}>
          <label className="labels">
            Task:
            <input
              className="task-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          {errors && errors.name && <p id='error-msg'>*{errors.name}</p>}
          </label>
          <label className="labels">
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value='Personal'>Personal</option>
              <option value='Work'>Work</option>
              <option value='School'>School</option>
            </select>
            {errors && errors.category && <p id='error-msg'>*{errors.category}</p>}
          </label>
          <label className="labels">
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
            {errors && errors.priority && <p id='error-msg'>*{errors.priority}</p>}
          </label>
          <label className="labels">
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value='Not Started'>Not Started</option>
              <option value='In Progress'>In Progress</option>
              <option value='Incomplete'>Incomplete</option>
            </select>
          {errors && errors.status && <p id='error-msg'>*{errors.status}</p>}
          </label>
          <label className="label-deadline">
            Deadline:
            <select className='time' value={deadline} onChange={(e) => setDeadline(e.target.value)} required>
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
          {errors && errors.deadline && <p id='error-msg'>*{errors.deadline}</p>}
            <select className='time' value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} required>
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          {errors && errors.timePeriod && <p id='error-msg'>*{errors.timePeriod}</p>}
          </label>
          <div className="add-cancel-btn-container">
            <button className='save-cancel-task-btn' type='submit' onSubmit={handleSubmitButton}>Save</button>
            <button className='save-cancel-task-btn' type='button' onClick={handleCancelEditButton}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="single-task-container">
          <h3 className="task-fields"><span className="span-properties">Task:</span> {name}</h3>
          <p className="task-fields"><span className="span-properties">Category:</span> {category}</p>
          <p className="task-fields">{priority === true ? <p><span className="span-properties">Priority:</span> Yes </p> : <p><span>Priority:</span> No</p>}</p>
          <p className="task-fields"><span className="span-properties">Status:</span> {status}</p>
          <p className="task-fields"><span className="span-properties">Deadline:</span> {deadline + ' ' + timePeriod}</p>
          <div className="edit-delete-btn-container">
            <button className="edit-delete-btn" onClick={handleEditButton}>Edit Task</button>
            <OpenModalButton
              buttonText = "Delete"
              modalComponent={<DeleteTaskModal taskId={task.id}/>}
              styleClass='edit-delete-btn'
            />
          </div>
        </div>
      )}
      <div>
        <ShowNote task={task} />
      </div>
    </div>
  )
}

export default SingleTask;
