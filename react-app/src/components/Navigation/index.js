import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	// if (sessionUser) return <Redirect to="/" />;

	if (!sessionUser) return <ProfileButton user={sessionUser} />

	return (
		<ul className='page-header'>
			<h1 className='title-section'>
				<NavLink className='title' exact to="/">Focus Flow</NavLink>
			</h1>
			<div className='tasks-profile-btn'>
				<p>
					<NavLink className='tasks-link' exact to='/tasks'>
						<FontAwesomeIcon icon={faListCheck} style={{ color: '#403234' }} />
					</NavLink>
				</p>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
