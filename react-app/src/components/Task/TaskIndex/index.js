import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TaskIndex.css'
import { fetchAllTasksThunk, updateTaskThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import SingleTask from "../SingleTask";
import CreateTask from "../CreateTask";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../../LoginFormModal";

function AllTasks() {
  const dispatch = useDispatch()
  const history = useHistory()
  const tasks = useSelector(state => state.tasks.Tasks)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchAllTasksThunk())

  },[dispatch,user])


  if(!user || Object.keys(user).length === 0) return (
    <div>
      <h3>Please log in to view tasks</h3>
    </div>

  )

  const handleEditSubmit = async(e, task) => {
    e.preventDefault()
   dispatch(updateTaskThunk(task, task.id))
  }

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
