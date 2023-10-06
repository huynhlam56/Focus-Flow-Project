export const LOAD_TASKS = 'tasks/LOAD_TASKS'
export const CREATE_TASK = 'tasks/CREATE_TASK'
export const UPDATE_TASK = 'task/UPDATE_TASK'
export const DELETE_TASK = 'task/DELETE_TASK'


/* ACTION CREATORS */

export const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  tasks
})

export const createTask = (task) => ({
  type: CREATE_TASK,
  task
})

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  task
})

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId
})

/* Thunks */

export const fetchAllTasksThunk = () => async dispatch => {
  const response = await fetch('/api/tasks')
  console.log('response in thunk', response)
  if(response.ok) {
    const data = await response.json()
    console.log('DATA', data)
    dispatch(loadTasks(data))
    return data
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
      newState = {...state, Task: {...action.payload}}
      console.log('new state after action', newState)
      return newState
    default:
      return state
  }
}


export default taskReducer
