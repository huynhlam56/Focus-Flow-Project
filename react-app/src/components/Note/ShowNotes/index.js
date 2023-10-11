import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { fetchNotesThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import DeleteNoteModal from "../DeleteNote";
import EditNoteModal from "../EditNote";
import NoteForm from "../NoteForm";
import CreateNote from "../CreateNote";


const ShowNote = ({task}) => {
  const dispatch = useDispatch()
  const note = useSelector((state) => state.tasks?.Tasks[task.id].Note || {})
  const [isEditing, setIsEditing] = useState(false)

  const handleEditButton = () => {
    setIsEditing(true)
  }

  const handleEditSubmit = () => {
    setIsEditing(false)
  }

  useEffect(() => {
    dispatch(fetchNotesThunk(task.id))
  }, [dispatch, task.id])

  const handleCreateButton = () => {
    setIsEditing(true)
  }

  const handleCreateSubmit = () => {
    setIsEditing(false)
  }

  if (!note || Object.keys(note).length === 0) {
    return (
      <div>
        <h4>Note: </h4>
        <div>
          {isEditing ?
          <NoteForm onEditCreateSubmit={handleCreateSubmit} task={task} note={note} formType='create' />
          :
          <button type="button" onClick={handleCreateButton}>Add Note</button>
          }
        </div>
      </div>
    )
  };

  return (
    <div>
      <h4>NOTE:</h4>
      {isEditing ? <NoteForm onEditCreateSubmit={handleEditSubmit} task={task} note={note} formType="edit"/> :
        <div>
          <p>{note.note}</p>
          <div>
            <button type="button" onClick={handleEditButton}>Edit</button>
            <OpenModalButton
              buttonText='Delete'
              modalComponent={<DeleteNoteModal noteId={note.id} taskId={task.id}/>}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default ShowNote;
