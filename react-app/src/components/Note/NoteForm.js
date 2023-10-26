import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { useState } from "react";
import { createNoteThunk, editNoteThunk } from "../../store/task";

const NoteForm = ({onEditCreateSubmit, task, note, formType}) => {
  const dispatch = useDispatch()
  const [editNote, setEditNote] = useState(note.note)
  const [errors, setErrors] = useState({})

  const handleSubmitNote = async(e) => {
    e.preventDefault()
    setErrors({})

    if (formType === "edit") {
      try {
        await dispatch(editNoteThunk(editNote, note.id))
        onEditCreateSubmit()
      } catch (error) {
        setErrors(error.errors)
        return
      }
    } else if (formType === 'create') {
      try {
        await dispatch(createNoteThunk(editNote, task.id))
        onEditCreateSubmit()
      } catch (error) {
        setErrors(error.errors)
        return
      }
    }
  }
  return (
    <div>
      <form className='create-note-form' onSubmit={handleSubmitNote}>
        <textarea
          style={{width: '300px', height: '100px', border: 'solid 1px black', resize: "none"}}
          className="note-textarea"
          type='text'
          value={editNote}
          onChange={(e) => setEditNote(e.target.value)}
        />
        {errors && errors.note && <p className="error-msg">{errors.note}</p>}
        <button className='save-cancel-task-btn' type='submit'>Save</button>
      </form>
    </div>
  )
}



export default NoteForm;
