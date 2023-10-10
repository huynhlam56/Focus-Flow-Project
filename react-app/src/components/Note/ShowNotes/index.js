import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { fetchNotesThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import DeleteNoteModal from "../DeleteNote";
import EditNoteModal from "../EditNote";
import NoteForm from "../NoteForm";


const ShowNote = ({task}) => {
  const dispatch = useDispatch()
  const note = useSelector((state) => state.tasks?.Tasks[task.id].Note || {})

  useEffect(() => {
    dispatch(fetchNotesThunk(task.id))
  }, [dispatch, task.id])

  if (!note || Object.keys(note).length === 0) return null;

  return (
    <div>
      <h4>NOTE:</h4>
      <p>{note.note}</p>
      <div>
      <OpenModalButton
        buttonText='Delete'
        modalComponent={<DeleteNoteModal />}
      />
      <OpenModalButton
        buttonText='Edit'
        modalComponent={<NoteForm task={task} note={note} formType="edit"/>}
      />
      <OpenModalButton
        buttonText='Add Note'
        modalComponent={<NoteForm note={note} formType='create' />}
      />
      </div>
    </div>
  )
}

export default ShowNote;
