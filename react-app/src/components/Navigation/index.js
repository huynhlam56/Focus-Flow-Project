import React, {useState} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginFormModal from '../LoginFormModal';
import logo from '../images/logo.png'
import img from '../images/flowers.jpg'
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	// if (sessionUser) return <Redirect to="/" />;

	if (!sessionUser) return (
		<div className='landing-page'>
			<ul className='header-nouser'>
				<h1 className='title-section'>
					<NavLink className='title' exact to="/">Focus Flow</NavLink>
					<img className='logo' src={logo}></img>
				</h1>
				<li>
					{/* <ProfileButton user={sessionUser} /> */}
					<OpenModalButton
						buttonText='Start For Free'
						modalComponent={<SignupFormModal />}
						styleClass='Sign-up-btn'
					/>
					<OpenModalButton
						buttonText='Log In'
						modalComponent={<LoginFormModal />}
						styleClass='Sign-up-btn'
					/>
				</li>
			</ul>
			<div>
				<h2 className='inner-text-header'>Get a clear overview of everything on your plate and never lose track of an important task.</h2>
			</div>
			<div className='text1'>
				<div className='center-text'>
					<span className='quote'>"The key to happiness is really progress and growth and constantly working on yourself and developing something..."</span>
					<span className='author'> -Lewis Howes</span>
				</div>
			</div>
		</div>
	)

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
