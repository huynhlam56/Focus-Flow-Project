import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TaskIndex.css'
import { deleteTaskThunk, fetchAllTasksThunk, updateTaskThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import SingleTask from "../SingleTask";
import CreateTask from "../CreateTask";
import { useHistory } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

function AllTasks() {
  const dispatch = useDispatch()
  const history = useHistory()
  const tasks = useSelector(state => state.tasks.Tasks)
  const user = useSelector(state => state.session.user)
  const [checked, setChecked] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  const bodyElement = document.body
  useEffect(() => {
    bodyElement.style.backgroundColor = 'rgb(253 239 233)'
    dispatch(fetchAllTasksThunk())

  },[dispatch])


  if(!user || Object.keys(user).length === 0) return (
    <div>
      <h3>Please log in to view tasks</h3>
    </div>

  )

  const handleEditSubmit = async(e, task) => {
    e.preventDefault()
   dispatch(updateTaskThunk(task, task.id))
  }


  const handleChange = (event, task) => {
    console.log(task,' TASK')
    const isChecked = event.target.checked;
    // If the task is being marked as completed, set a timer to delete it in 4 seconds
    if (isChecked) {
      const timer = setTimeout(() => {
        dispatch(deleteTaskThunk(task.id))
        console.log('Task deleted!');
      }, 4000);

      //prevTimer = previous state of the timer bc deleteTimer is an obj that stores timer for tasks and setDeletetimer is a function that updates deleteTimer
      setDeleteTimer((prevTimer) => ({
        //shallow copy of the previous timer obj
        ...prevTimer,
        //key-value pair where the key is the id of the task and timer is the value
        [task.id]: timer,
      }));
    } else {
      // If the user unchecks the box within 4 seconds, clear the deletion timer
      //if there is a timer on the task and is not undefined
      if (deleteTimer[task.id]) {
        // then clear the timer for that task id
        clearTimeout(deleteTimer[task.id]);
        // update the state of deleteTimer to reflect the timer being removed
        setDeleteTimer((prevTimer) => {
          //shallow copy
          const newTimer = {...prevTimer}
          delete newTimer[task.id]
          return newTimer
        })
      }
    }
    // Update the checked state
    const updatedTasks = allTasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, checked: isChecked };
      }
      return t;
    });
    dispatch(fetchAllTasksThunk(updatedTasks))
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

  return (
    <div>
      <div>
        <h1 className="tasks-header">Your Goals For Today...</h1>
      </div>
      <div className="tasks-index">
        <h3 className="category-header">Personal</h3>
        {personalTasks && personalTasks.map((task) => (
          <li className='task-list' key={task.id}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
            <OpenModalButton
              buttonText = {task.name}
              modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit}/>}
              styleClass='task-btn'
            />
          </li>
        ))}
        <div>
          <h3 className="category-header">Work</h3>
          {workTasks && workTasks.map((task) => (
            <li className='task-list' key={task.id}>
              <OpenModalButton
                buttonText = {task.name}
                modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit} />}
                styleClass='task-btn'
              />
            </li>
          ))}
        </div>
        <div>
          <h3 className="category-header">School</h3>
          {schoolTasks && schoolTasks.map((task) => (
            <li className='task-list' key={task.id}>
              <OpenModalButton
                buttonText = {task.name}
                modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit}/>}
                styleClass='task-btn'
              />
            </li>
          ))}
        </div>
        <div className="add-task-btn-container">
          <OpenModalButton
            buttonText="Add Task"
            modalComponent={<CreateTask />}
            styleClass='create-task-btn'
          />
        </div>
      </div>
    </div>
  )
}

export default AllTasks;
