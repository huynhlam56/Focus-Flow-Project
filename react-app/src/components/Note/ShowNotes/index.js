import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { fetchNotesThunk } from "../../../store/task";
import OpenModalButton from "../../OpenModalButton";
import DeleteNoteModal from "../DeleteNote";
import EditNoteModal from "../EditNote";


const ShowNote = ({task}) => {
  const dispatch = useDispatch()
  console.log(task)
  const note = useSelector((state) => state.tasks?.Tasks[task.id].Note || {})
  console.log(note, "note")

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
      {/* <OpenModalButton
        buttonText='Edit'
        modalComponent={<NoteForm note={note} formType="edit"/>}
      /> */}
      </div>
    </div>
  )
}

export default ShowNote;
