import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { fetchNotesThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import DeleteNoteModal from "../DeleteNote";
import NoteForm from "../NoteForm";
import './ShowNotes.css'
import '../CreateNote/CreateNote.css'
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



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
      <div className="note-container">
        <h4 className="note-header">NOTE </h4>
        <div>
          {isEditing ?
          <NoteForm style={{color: 'gray', display:'flex', flexDirection:'row', alignItems: 'baseline'}} onEditCreateSubmit={handleCreateSubmit} task={task} note={note} formType='create' />
          :
          // <button className='add-note-btn' type="button" onClick={handleCreateButton}>Add Note</button>
          <IconButton  style={{fontSize: '15px', color: 'gray', display:'flex', flexDirection:'row', alignItems: 'baseline'}}  onClick={handleCreateButton} color="primary" aria-label="edit">
             <CreateIcon /> Add Note
          </IconButton>
          }
        </div>
      </div>
    )
  };

  return (
    <div className="note-container">
      <h4 className="note-header">NOTE: </h4>
      {isEditing ? <NoteForm onEditCreateSubmit={handleEditSubmit} task={task} note={note} formType="edit"/> :
        <div>
          <div className="edit-delete-btn-container">
          <p className="note">{note.note}</p>
            {/* <button className='edit-delete-btn'type="button" onClick={handleEditButton}>Edit</button> */}
            <div className="edit-delete">
              <IconButton style={{fontSize: '30px', color: 'gray', display:'flex', flexDirection:'row', alignItems: 'baseline'}}  onClick={handleEditButton} color="primary" aria-label="edit">
                <EditNoteIcon style={{fontSize: '30px', padding: '0px'}}/>
              </IconButton>
              <OpenModalButton
                buttonText={<DeleteIcon />}
                modalComponent={<DeleteNoteModal noteId={note.id} taskId={task.id}/>}
                styleClass='delete-btn'
              />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ShowNote;
