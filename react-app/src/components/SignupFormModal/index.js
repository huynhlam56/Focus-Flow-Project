import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

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
			<h1>Sign Up</h1>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors && errors.email && <p className='error-msg'>*{errors.email}</p>}
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						/>
				</label>
				{errors && errors.username && <p className='error-msg'>*{errors.username}</p>}
				<label>
					First Name
					<input
						type="text"
						name="first_name"
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value)
						}}
						required
					/>
				</label>
				{errors && errors.firstName && <p className="error-msg">*{errors.firstName}</p>}
				<label>
					Last Name
					<input
						type="text"
						name="last_name"
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value)
						}}
						required
					/>
				</label>
				{errors && errors.last_name && <p className="error-msg">*{errors.last_name}</p>}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
				</label>
				{errors && errors.password && <p className='error-msg'>*{errors.password}</p>}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors && errors.confirmPassword && <p className='error-msg'>*{errors.confirmPassword}</p>}
				<button className='signup-form-submit-btn' type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
