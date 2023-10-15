import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateTask.css'
import { createTaskThunk, fetchAllTasksThunk } from "../../../store/task";
import { useModal } from "../../../context/Modal";

function CreateTask() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Personal')
  const [priority, setPriority] = useState(true)
  const [status, setStatus] = useState('Not Started')
  const [deadline, setDeadline] = useState('12:00')
  const [timePeriod, setTimePeriod] = useState('AM')
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    const task = {
      name,
      priority,
      status,
      deadline: deadline + ' ' + timePeriod,
      category
    }
    try{
      const newTask = await dispatch(createTaskThunk(task))
      newTask.id = task.id
      if(newTask) {
        dispatch(fetchAllTasksThunk(newTask.id))
      }
    }catch(errors) {
      setErrors(errors.errors)
      return
    }
    closeModal()
  }

  return (
    <div className="task-form-container">
      <form className='task-form' onSubmit={handleSubmit}>
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
            <option value={true}>Yes</option>
            <option value={false}>No</option>
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
        <div className="add-btn">
          <button className='add-task-btn' onSubmit={handleSubmit} type="submit">Add</button>
        </div>
       </form>
       {/* <div>
        {}
       </div> */}
    </div>
  )
}


export default CreateTask;
