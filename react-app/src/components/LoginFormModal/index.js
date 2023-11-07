import React, { useState, useSelector } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push('/events')
      document.getElementById("bg").style.display = "none";
    }
  };

  const handleDemoUserLogin = async e => {
    setErrors([])
    await dispatch(login('demouser@appacademy.io', 'password'))
    document.getElementById("bg").style.display = "none";
    history.push('/events')
    closeModal()
  }


  return (
    <div className="login-modal-div">
      <h1 className="login-header">Log In</h1>
      <form className='login-modal-form' onSubmit={handleSubmit}>
        <ul>
        </ul>
        <TextField size="small" id="outlined-basic" helperText={errors.email} error ={ errors.email } label="Email" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)}  />
        <TextField size="small" id="outlined-basic" helperText={errors.password} error ={ errors.password } label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
        {/* <button className='login-form-submit-button'>Log In</button> */}
        <Button style={{color: 'hsl(0deg 100% 98.91%)', border: '1px solid rgb(244 237 237)', backgroundColor:'rgb(144 65 0 / 92%)'}} type="submit" variant="outlined">Log In</Button>
      </form>
      {/* <button className="demo-submit-button" onClick={handleDemoUserLogin}>Log In As DemoUser</button> */}
      <div className="demo-user-div">
        <Button id='log-in-demo' style={{color: 'hsl(0deg 100% 98.91%)', width: '225px', border: '1px solid rgb(244 237 237)', backgroundColor:'rgb(144 65 0 / 92%)'}} type="submit" variant="outlined" onClick={handleDemoUserLogin}>Log In As Demo User</Button>
      </div>
      <div className="no-acc-div">
        <p className="no-acc">Don't have an account?</p>
        <OpenModalButton
          modalComponent={<SignupFormModal />}
          buttonText='Create Account'
          styleClass='create-acc-btn'
        />
      </div>
    </div>
  );
}

export default LoginFormModal;
