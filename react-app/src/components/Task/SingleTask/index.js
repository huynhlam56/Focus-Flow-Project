import React, { useState } from "react"
import './SingleTask.css'
import OpenModalButton from "../../OpenModalButton";
import DeleteTaskModal from "../DeleteTask";
import ShowNote from "../../Note/ShowNotes";
import { useModal } from "../../../context/Modal";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Checkbox } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import ScheduleIcon from '@mui/icons-material/Schedule';

function SingleTask({task, onEditCreateSubmit}) {

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(task.name)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [deadline, setDeadline] = useState(task.deadline.split(' ')[0])
  const [timePeriod, setTimePeriod] = useState(task.deadline.split(' ')[1])
  const [category, setCategory] = useState(task.category)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()


  const handleEditButton = () => {
    setIsEditing(true)
  }

  const handleCancelEditButton = (e) => {
    e.preventDefault()

    setName(name)
    setStatus(task.status)
    setPriority(task.priority)
    setDeadline(task.deadline.split(' ')[0])
    setTimePeriod(task.deadline.split(' ')[1])
    setCategory(task.category)
    setIsEditing(false)
  }

  const handleSubmitButton = async(e) => {
    e.preventDefault()
    try{
      const editedTask = {
        id: task.id,
        name,
        priority,
        status,
        deadline: deadline + ' ' + timePeriod,
        category
      }
      await onEditCreateSubmit(e, editedTask)
      e.preventDefault()
      setIsEditing(false)
      setErrors({})
      setName(editedTask.name)
      setPriority(editedTask.priority)
      setStatus(editedTask.status)
      setDeadline(editedTask.deadline.split(' ')[0])
      setTimePeriod(editedTask.deadline.split(' ')[1])
      setCategory(editedTask.category)
    }catch(errors) {
      setErrors(errors.errors)
      return
    }
    closeModal()
  }

  if(!task || Object.keys(task) === 0) return null

  return (
    <div className="task-form-container">
      {isEditing ? (
        <form className='task-form' onSubmit={handleSubmitButton}>
          <TextField style={{paddingTop: '15px'}} id="standard-basic" error={errors.name} helperText={errors.name} label="Task:" variant="standard" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={errors.category}
            helperText={errors.category}
            >
            <FormControlLabel value="Personal" control={<Radio />} label="Personal" />
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
            <FormControlLabel value="School" control={<Radio />} label="School" />
          </RadioGroup>
          <FormControlLabel
            value={priority}
            control={<Checkbox style={{color: '#fa8c74'}} checked={priority} />}
            label="Priority"
            onChange={(e) => setPriority(e.target.checked)}
            error={errors.priority}
            helperText={errors.priority}
          />
          <FormControl id='demo-select-div' variant="standard" sx={{ m: 1, minWidth: 120, color: '#fa8c74' }}>
            <InputLabel id="demo-simple-select-label">Status:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{color:'gray'}}
              error={errors.status}
              helperText={errors.status}
            >
              <MenuItem value='Not Started'>Not Started</MenuItem>
              <MenuItem value='In Progress'>In Progress</MenuItem>
              <MenuItem value='Incomplete'>Incomplete</MenuItem>
          </Select>
          </FormControl>
          <FormControl id='time-select-div' variant="standard" style={{color:'gray', width:'fit-content', display: 'inline-flex', flexDirection:'row', gap: '10px'}} >
            <InputLabel id="time-select-label"></InputLabel>
            <ScheduleIcon style={{fontSize: '32px', color: '#fa8c74'}} />
            <Select
              labelId="time-select-label"
              id="time-select"
              value={deadline}
              label="Deadline"
              onChange={(e) => setDeadline(e.target.value)}
              error={errors.deadline}
              helperText={errors.deadline}
            >
              <MenuItem value='12:00'>12:00</MenuItem>
              <MenuItem value='01:00'>01:00</MenuItem>
              <MenuItem value='03:00'>03:00</MenuItem>
              <MenuItem value='04:00'>04:00</MenuItem>
              <MenuItem value='05:00'>05:00</MenuItem>
              <MenuItem value='06:00'>06:00</MenuItem>
              <MenuItem value='07:00'>07:00</MenuItem>
              <MenuItem value='08:00'>08:00</MenuItem>
              <MenuItem value='09:00'>09:00</MenuItem>
              <MenuItem value='10:00'>10:00</MenuItem>
              <MenuItem value='11:00'>11:00</MenuItem>
            </Select>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={timePeriod}
              label="TimePeriod"
              onChange={(e) => setTimePeriod(e.target.value)}
              // sx={{color:'gray', width:'fit-content'}}
              error={errors.timePeriod}
              helperText={errors.timePeriod}
            >
              <MenuItem value='AM'>AM</MenuItem>
              <MenuItem value='PM'>PM</MenuItem>
            </Select>
          </FormControl>
            <div className="add-cancel-btn-container">
              <button className='save-cancel-task-btn' type='submit' onSubmit={handleSubmitButton}>Save</button>
              <button className='save-cancel-task-btn' type='button' onClick={handleCancelEditButton}>Cancel</button>
            </div>
        </form>
        ) : (
          <div className="single-task-container">
            <h3 className="task-fields"><span className="span-properties">Task:</span> {name}</h3>
            <p className="task-fields"><span className="span-properties">Category:</span> {category}</p>
            <p className="task-fields">{priority === true ? <p><span className="span-properties">Priority:</span> Yes </p> : <p><span>Priority:</span> No</p>}</p>
            <p className="task-fields"><span className="span-properties">Status:</span> {status}</p>
            <p className="task-fields"><span className="span-properties">Deadline:</span> {deadline + ' ' + timePeriod}</p>
            <div className="edit-delete-btn-container">
            {/* <button className="edit-delete-btn" onClick={handleEditButton}>Edit Task</button>
            <OpenModalButton
              buttonText = "Delete"
              modalComponent={<DeleteTaskModal taskId={task.id}/>}
              styleClass='edit-delete-btn'
            /> */}
            <div className="task-edit-delete-btns">
              <IconButton style={{fontSize: '20px', color: 'gray', display:'flex', flexDirection:'row', alignItems: 'baseline'}}  onClick={handleEditButton} color="primary" aria-label="edit">
                <EditNoteIcon style={{fontSize: '25px', padding: '0px'}}/>
              </IconButton>
              <OpenModalButton
                buttonText={<DeleteIcon style={{fontSize: '20px', cursor: 'pointer'}}/>}
                modalComponent={<DeleteTaskModal taskId={task.id}/>}
                styleClass='delete-btn'
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <ShowNote task={task} />
      </div>
    </div>
  )
}

export default SingleTask;
