export const LOAD_TASKS = 'tasks/LOAD_TASKS'
export const LOAD_SINGLETASK = 'tasks/LOAD_SINGLETASK'
export const CREATE_TASK = 'tasks/CREATE_TASK'
export const UPDATE_TASK = 'task/UPDATE_TASK'
export const DELETE_TASK = 'task/DELETE_TASK'


/* ACTION CREATORS */

export const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  tasks
})

export const loadSingleTask = (taskId) => ({
  type: LOAD_SINGLETASK,
  taskId
})

export const createTask = (task) => ({
  type: CREATE_TASK,
  task
})

export const updateTask = (task, taskId) => ({
  type: UPDATE_TASK,
  payload: {task, taskId}
})

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId
})

/* Thunks */

//GET TASKS//

export const fetchAllTasksThunk = () => async dispatch => {
  const response = await fetch('/api/tasks/')
  if(response.ok) {
    const data = await response.json()
    dispatch(loadTasks(data))
    return data
  }else {
    const errors = await response.json()
    return errors
  }
}

//GET SINGLE TASK//
export const fetchSingleTaskThunk = (taskId) => async dispatch => {
  const response = await fetch(`/api/tasks/${taskId}`)
  if(response.ok) {
    const singleTask = await response.json()
    dispatch(loadSingleTask(singleTask))
    return singleTask
  }else {
    const errors = await response.json()
    return errors
  }
}

//EDIT TASK//

export const updateTaskThunk = (editedTask, taskId) => async dispatch => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedTask)
  })
  console.log(taskId)
  if(response.ok) {
    const data = await response.json()
    dispatch(updateTask(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

// CREATE TASK

export const createTaskThunk =(task) => async dispatch => {
  const response = await fetch('/api/tasks/new', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })
  if (response.ok) {
    const newTask = await response.json()
    dispatch(fetchSingleTaskThunk(newTask))
    return newTask
  }else {
    const errors = await response.json()
    return errors
  }
}

//DELETE TASK

export const deleteTaskThunk = (taskId) => async dispatch => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(deleteTask(taskId))
  }else {
    const errors = await response.json()
    return errors
  }
}

const initialState = {}
const taskReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_TASKS:
      newState = {...state, ...action.tasks}
      return newState
    case LOAD_SINGLETASK:
      newState = {...state, SingleTask: {...state.SingleTask, ...action.task}}
      return newState
    case UPDATE_TASK:
      const updatedTask = action.payload.task
      newState = {...state, SingleTask: {...state.SingleTask, [updateTask.id]: {...updatedTask}}}
    case DELETE_TASK:
      newState = {...state}
      delete newState[action.taskId]
      return newState
    default:
      return state
  }
}

export default taskReducer
