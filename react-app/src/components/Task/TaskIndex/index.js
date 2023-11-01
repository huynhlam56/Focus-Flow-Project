import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TaskIndex.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { deleteTaskThunk, fetchAllTasksThunk, updateTaskThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import SingleTask from "../SingleTask";
import CreateTask from "../CreateTask";
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import StarIcon from '@mui/icons-material/Star';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


function AllTasks() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.Tasks)
  const user = useSelector(state => state.session.user)
  const [checked, setChecked] = useState({});
  const [deleteTimer, setDeleteTimer] = useState({});

  const history = useHistory()

  // const bodyElement = document.body
  useEffect(() => {
    // bodyElement.style.backgroundColor = '#e6ddde'
    // bodyElement.style.backgroundImage = "url('https://www.desktopbackground.org/p/2013/12/05/680681_flower-backgrounds-for-powerpoint_1600x1200_h.jpg')";
    dispatch(fetchAllTasksThunk())

  },[dispatch])



  const handleEditSubmit = async(e, task) => {
    e.preventDefault()
    dispatch(updateTaskThunk(task, task.id))
  }


  const handleChange = (event) => {
    const isChecked = event.target.checked;

    const taskId = event.target.id
    // If the task is being marked as completed, set a timer to delete it in 4 seconds
    if (isChecked) {
      setChecked((prevChecked) => ({
        ...prevChecked
        [taskId] = true
      }))
      const timer = setTimeout(async() => {
        await dispatch(deleteTaskThunk(taskId))
        dispatch(fetchAllTasksThunk())
      }, 4000);

      //prevTimer = previous state of the timer bc deleteTimer is an obj that stores timer for tasks and setDeletetimer is a function that updates deleteTimer
      setDeleteTimer((prevTimer) => ({
        //shallow copy of the previous timer obj
        ...prevTimer,
        //key-value pair where the key is the id of the task and timer is the value
        [taskId]: timer,
      }));
    } else {
      setChecked((prevChecked) => ({
        ...prevChecked
        [taskId] = false
      }))
      // If the user unchecks the box within 4 seconds, clear the deletion timer
      //if there is a timer on the task and is not undefined
      if (deleteTimer[taskId]) {
        // then clear the timer for that task id
        clearTimeout(deleteTimer[taskId]);
        // update the state of deleteTimer to reflect the timer being removed
        setDeleteTimer((prevTimer) => {
          //shallow copy
          const newTimer = {...prevTimer}
          delete newTimer[taskId]
          return newTimer
        })
      }
    }
  };

  if (!tasks || Object.keys(tasks).length === 0) return (
    <div className="body">
      <h3>You Don't Have Any Tasks Yet For Today</h3>
      <OpenModalButton
        buttonText="Add Task"
        modalComponent={<CreateTask />}
        styleClass='create-task-btn'
        />
    </div>
  )
  const allTasks = Object.values(tasks)

  const personalTasks = allTasks.filter((task) => task.category === 'Personal')
  const schoolTasks = allTasks.filter((task) => task.category === 'School')
  const workTasks = allTasks.filter((task) => task.category === 'Work')

  const localizer = momentLocalizer(moment)

  if(!user || Object.keys(user).length === 0) {
    history.push('/')
    window.alert('Please log in to view tasks')
  }
  return (
    <div className="tasks-page">
      <div>
        <div>
          <Calendar
            startAccessor="start"
            endAccessor="end"
            localizer={localizer}
          />
        </div>
        <h1 className="tasks-header">Your Goals For Today...
          <div className="add-task-btn-container">
            <OpenModalButton
              buttonText='Add Task'
              modalComponent={<CreateTask />}
              styleClass='create-task-btn'
            />
          </div>
        </h1>
      </div>
      <div className="tasks-index">
        <h3 className="category-header-personal">Personal</h3>
        {personalTasks && personalTasks.sort((a, b) => (b.priority ? 1 : -1)).map((task) => (
          <li className='task-list' key={task.id}>
            <Checkbox
              id={task.id}
              checked={checked[task.id]}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <OpenModalButton
              buttonText = {task.name}
              modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit}/>}
              styleClass='task-btn'
            />
            {task.priority && <StarIcon style={{color: 'red', fontSize: '30px'}}/>}
          </li>
        ))}
        <div>
          <h3 className="category-header-work">Work</h3>
          {workTasks && workTasks.sort((a, b) => (b.priority ? 1 : -1)).map((task) => (
            <li className='task-list' key={task.id}>
              <Checkbox
                id={task.id}
                checked={checked[task.id]}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <OpenModalButton
                buttonText = {task.name}
                modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit} />}
                styleClass='task-btn'
              />
              {task.priority && <StarIcon style={{color: 'red', fontSize: '30px'}}/>}
            </li>
          ))}
        </div>
        <div>
          <h3 className="category-header-school">School</h3>
          {schoolTasks && schoolTasks.sort((a, b) => (b.priority ? 1 : -1)).map((task) => (
            <li className='task-list' key={task.id}>

              <Checkbox
                id={task.id}
                checked={checked[task.id]}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <OpenModalButton
                buttonText = {task.name}
                modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit}/>}
                styleClass='task-btn'
              />
              {task.priority && <StarIcon style={{color: 'red', fontSize: '30px'}}/>}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllTasks;
