import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateTask.css'
import { createTaskThunk, fetchAllTasksThunk } from "../../../store/task";
import { useModal } from "../../../context/Modal";
import { TextField, Checkbox } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import ScheduleIcon from '@mui/icons-material/Schedule';


function CreateTask() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Personal')
  const [priority, setPriority] = useState(true)
  const [status, setStatus] = useState('Not Started')
  const [deadline, setDeadline] = useState('12:00')
  const [timePeriod, setTimePeriod] = useState('AM')
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    const task = {
      name,
      priority,
      status,
      deadline: deadline + ' ' + timePeriod,
      category
    }
    try{
      const newTask = await dispatch(createTaskThunk(task))
      newTask.id = task.id
      if(newTask) {
        dispatch(fetchAllTasksThunk(newTask.id))
      }
    }catch(errors) {
      setErrors(errors.errors)
      return
    }
    closeModal()
  }

  return (
    <div className="task-form-container">
      <form className='task-form' onSubmit={handleSubmit}>
        <TextField id="standard-basic" error={errors.name} helperText={errors.name} label="Task" variant="standard" type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
        <FormControl id='time-select-div' variant="standard" sx={{ m: 1, minWidth: 12, color: '#fa8c74' }}>
          <InputLabel id="time-select-label"></InputLabel>
        </FormControl>
        <div className="add-btn">
          <button className='add-task-btn' onSubmit={handleSubmit} type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}


export default CreateTask;
