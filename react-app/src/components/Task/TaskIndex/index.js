import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TaskIndex.css'
import { fetchAllTasksThunk, fetchSingleTaskThunk, updateTaskThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import SingleTask from "../SingleTask";
import { useModal } from "../../../context/Modal";
import CreateTask from "../CreateTask";

function AllTasks() {

  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.Tasks)

  useEffect(() => {
    dispatch(fetchAllTasksThunk())

  },[dispatch])

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
              modalComponent={<SingleTask task={task} onEditSubmit={handleEditSubmit}/>}
            />
            {/* {task.priority === true ? <p>Priority: yes </p> : null} */}
          </div>
        ))}
        <div>
          <h3>Work</h3>
          {workTasks && workTasks.map((task) => (
            <div key={task.id}>
              <OpenModalButton
                buttonText = {"Task: " + task.name}
                modalComponent={<SingleTask task={task} onEditSubmit={handleEditSubmit} />}
              />
              {task.priority === true ? <p>Priority: yes </p> : null}
            </div>
          ))}
        </div>
        <div>
          <h3>School</h3>
          {schoolTasks && schoolTasks.map((task) => (
            <div key={task.id}>
              <OpenModalButton
                buttonText = {"Task: " + task.name}
                modalComponent={<SingleTask task={task} onEditSubmit={handleEditSubmit}/>}
              />
              {/* {task.priority === true ? <p>Priority: yes </p> : null} */}
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

export default AllTasks;
