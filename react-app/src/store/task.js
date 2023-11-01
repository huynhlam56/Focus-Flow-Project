export const LOAD_TASKS = 'tasks/LOAD_TASKS'
export const LOAD_SINGLETASK = 'tasks/LOAD_SINGLETASK'
export const CREATE_TASK = 'tasks/CREATE_TASK'
export const UPDATE_TASK = 'task/UPDATE_TASK'
export const DELETE_TASK = 'task/DELETE_TASK'

export const LOAD_NOTES = 'notes/LOAD_NOTES'
export const UPDATE_NOTE = 'notes/UPDATE_NOTE'
export const CREATE_NOTE = 'notes/CREATE_NOTE'
export const DELETE_NOTE = 'notes/DELETE_NOTE'


/* TASK ACTION CREATORS */

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

/* NOTE ACTION CREATORS */

export const loadNotes = (note) => ({
  type: LOAD_NOTES,
  note
})

export const createNote = (note, taskId) => ({
  type: CREATE_NOTE,
  payload: {note, taskId}
})

export const updateNote = (note, taskId) => ({
  type: UPDATE_NOTE,
  payload: {note, taskId}
})

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId
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
    dispatch(createTask(newTask))
    return newTask
  }else {
    // const errors = await response.json()
    // console.log('NOT OK', errors)
    // throw new Error(errors)
    throw await response.json()
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

// GET NOTES

export const fetchNotesThunk = (taskId) => async dispatch => {
  const response = await fetch (`/api/tasks/${taskId}/notes`)
  if (response.ok) {
    const data = await response.json()
    dispatch(loadNotes(data))
    return data
  }else {
    const errors = await response.json()
    return errors
  }
}

export const createNoteThunk = (note, taskId) => async dispatch => {
  const response = await fetch (`/api/tasks/${taskId}/notes`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({note})
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(createNote(data, taskId))
    return data
  }else {
    // const errors = await response.json()
    // return errors
    throw await response.json()
  }
}

export const editNoteThunk = (note, noteId) => async dispatch => {

  const response = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({note})
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(updateNote(data, data.taskId))
    return data
  }else {
    // const errors = await response.json()
    // return errors
    throw await response.json()
  }
}

export const deleteNoteThunk = noteId => async dispatch => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE"
  })
  if (response.ok){
    const data = await response.json()
    dispatch(deleteNote(data))
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
      newState = {...state, ...action.tasks}
      return newState
    // case LOAD_SINGLETASK:
    //   newState = {...state, SingleTask: {...state.SingleTask, ...action.task}}
    //   return newState
    case UPDATE_TASK:
      const updatedTask = action.payload.task
      newState = {...state, Tasks: { ...state.Tasks, [updatedTask.id]: {...updatedTask}}}
      return newState
    case DELETE_TASK:
      newState = {...state}
      delete newState[action.taskId]
      return newState
    case LOAD_NOTES:
      newState = {...state, Tasks: {...state.Tasks, [action.note.taskId]: {...state.Tasks[action.note.taskId], Note: action.note}}}
      return newState
    case UPDATE_NOTE:
      const updatedNote = action.payload.note
      newState = {...state, Tasks: {...state.Tasks, [action.payload.taskId]: {...state.Tasks[action.payload.taskId], Note: updatedNote}}}
      return newState
    case CREATE_NOTE:
      const newNote = action.payload.note
      newState = {...state, Tasks: {...state.Tasks, [action.payload.taskId]: {...state.Tasks[action.payload.taskId], Note: newNote}}}
      return newState
    case DELETE_NOTE:
      newState = {...state}
      delete newState[action.noteId]
      return newState
    default:
      return state
  }
}

export default taskReducer
