import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TaskIndex.css'
import { fetchAllTasksThunk } from "../../../store/task";

function AllTasks() {
  console.log('INSIDE COMPONENT')
  const dispatch = useDispatch()
  const task = useSelector(state => state.tasks)
  console.log('TASK IN COMPONENT', task)
  useEffect(() => {
    dispatch (fetchAllTasksThunk())
  },[dispatch])

  if (!task || Object.keys(task) === 0) return null
  const allTasks = Object.values(task)

  return (
    <div>
      <div>
        <h1>Your Goals For Today</h1>
      </div>
      <div key={task.id}>
        {allTasks.map((task) => (
          <div>
            <p>{task.name}</p>
            <p>{task.priority}</p>
            <p>{task.status}</p>
            <p>{task.category}</p>
            <p>{task.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTasks;
