import React, { useState, useSelector } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { fetchAllTasksThunk } from "../../store/task";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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
    }
  };

  const handleDemoUserLogin = e => {
    e.preventDefault()
    setErrors([])
    return dispatch(login('demouser@appacademy.io', 'password'))
      .then(closeModal())
  }

  return (
    <div className="login-modal-div">
      <h1>Log In</h1>
      <form className='login-modal-form' onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* {errors && errors.email && <p className="login-input-error">{errors.email} </p>} */}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors && errors.password && <p className="login-input-error">*{errors.password} </p>}
        </label>
        <button className="demo-submit-button" onClick={handleDemoUserLogin}>Log In As DemoUser</button>
        <button className='login-form-submit-button' type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
