import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TaskIndex.css'
import { fetchAllTasksThunk, updateTaskThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import SingleTask from "../SingleTask";
import CreateTask from "../CreateTask";
import { withRouter, useHistory } from "react-router-dom";

function AllTasks() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.Tasks)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchAllTasksThunk())

  },[dispatch])

  // if(!user || Object.keys(user).length === 0) return (
  //   <div>Please log in to view tasks</div>
  // )
  
  const handleEditSubmit = async(e, task) => {
    e.preventDefault()
   dispatch(updateTaskThunk(task, task.id))
  }

  if (!tasks || Object.keys(tasks).length === 0) return null
  const allTasks = Object.values(tasks)

  const personalTasks = allTasks.filter((task) => task.category === 'Personal')
  const schoolTasks = allTasks.filter((task) => task.category === 'School')
  const workTasks = allTasks.filter((task) => task.category === 'Work')

  return (
    <div>
      <div>
        <h1>Your Goals For Today</h1>
      </div>
      <div>
        <h3>Personal</h3>
        {personalTasks && personalTasks.map((task) => (
          <div key={task.id}>
            <OpenModalButton
              buttonText = {"Task: " + task.name}
              modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit}/>}
            />
          </div>
        ))}
        <div>
          <h3>Work</h3>
          {workTasks && workTasks.map((task) => (
            <div key={task.id}>
              <OpenModalButton
                buttonText = {"Task: " + task.name}
                modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit} />}
              />
            </div>
          ))}
        </div>
        <div>
          <h3>School</h3>
          {schoolTasks && schoolTasks.map((task) => (
            <div key={task.id}>
              <OpenModalButton
                buttonText = {"Task: " + task.name}
                modalComponent={<SingleTask task={task} onEditCreateSubmit={handleEditSubmit}/>}
              />
            </div>
          ))}
        </div>
        <div>
          <OpenModalButton
            buttonText="Add Task"
            modalComponent={<CreateTask />}
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(AllTasks);
