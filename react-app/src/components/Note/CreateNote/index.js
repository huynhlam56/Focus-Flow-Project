import NoteForm from "../NoteForm";

const CreateNote = () => {
  const note = {
    note: ''
  }

  return (
    <NoteForm
      note = {note}
      formType='create'
    />
  )
}

export default CreateNote;
