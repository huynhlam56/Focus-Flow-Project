import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory()

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email,  firstName, lastName, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/tasks')
			}
		} else {
			setErrors({
				confirmPassword: "Confirm Password field must be the same as the Password field",
			});
		}
	};

	return (
		<div className="signup-modal-div">
			<h1 className="sign-up-header">Sign Up</h1>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<TextField size="small" id="outlined-basic" helperText={errors.email} error ={ errors.email } label="Email" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
				<TextField size="small" id="outlined-basic" helperText={errors.username} error={errors.username} label="Username" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
				<TextField size="small" id="outlined-basic" helperText={errors.first_name} error ={ errors.first_name } label="First Name" variant="outlined" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
				<TextField size="small" id="outlined-basic" helperText={errors.last_name} error ={ errors.last_name } label="Last Name" variant="outlined" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
				<TextField size="small" id="outlined-basic" helperText={errors.password} error ={ errors.password } label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
				<TextField size="small" id="outlined-basic" helperText={errors.confirmPassword} error ={ errors.confirmPassword } label="Confirm Password" variant="outlined" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
				{/* <button className='signup-form-submit-btn' type="submit">Create Account</button> */}
				<Button type="submit" variant="outlined">Create Account</Button>
			</form>
		</div>
	);
}

export default SignupFormModal;
