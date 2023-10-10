import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useDebugValue, useEffect, useState } from "react";
import { createNoteThunk, editNoteThunk } from "../../store/task";
import SingleTask from "../Task/SingleTask";

const NoteForm = ({task, note, formType}) => {
  const dispatch = useDispatch()
  const [editNote, setEditNote] = useState(note.note)
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const { closeModal } = useModal()

  const handleSubmitNote = async(e) => {
    e.preventDefault()
    setErrors({})

    if (formType === "edit") {
      try {
        setIsEditing(true)
        await dispatch(editNoteThunk(note, note.id, editNote))
      } catch (error) {
        setErrors(error.errors)
        return
      }
      setIsEditing(false)
    } else if (formType === 'create') {
      try {
        await dispatch(createNoteThunk(note, task.id))
      } catch (error) {
        setErrors(error.errors)
        return
      }
      closeModal()
    }
  }
  return (
    <div>
      <h4>{task.category}</h4>
      <p>{task.name}</p>
      <p>Priority: {task.priority}</p>
      <p>status: {task.status}</p>
      <p>Deadline: {task.deadline}</p>
      <h4>Note:</h4>
      <form onSubmit={handleSubmitNote}>
        <textarea
          type='text'
          value={editNote}
          onChange={(e) => setEditNote(e.target.value)}
        />
        <button type='submit' onSubmit={handleSubmitNote}>Save</button>
      </form>
    </div>
  )
}



export default NoteForm;
