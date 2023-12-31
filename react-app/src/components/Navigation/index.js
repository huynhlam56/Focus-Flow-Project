import React, {useEffect, useState} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import logo from '../images/logo.png'
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { useHistory, useLocation } from 'react-router-dom';
import AllEvents from '../Event/EventIndex';
import AllTasks from '../Task/TaskIndex';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const location = useLocation()
	const [buttonText, setButtonText] = useState('');

  const bodyElement = document.body
	if(sessionUser) {
		document.getElementById("bg").style.display = "none";
		bodyElement.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/016/902/306/original/abstract-hand-drawn-minimalist-background-vector.jpg')";
		bodyElement.style.backgroundRepeat='round'
		bodyElement.style.zIndex = "-1";
	}else if ( document.getElementById("bg") !== null ) {
		document.getElementById("bg").style.display = "";
	}

	function canUse(feature) {
		const element = document.createElement('div');
		const prefixes = ' Khtml Ms O Moz Webkit'.split(' ');
		const upper = feature.charAt(0).toUpperCase() + feature.substr(1);

		if (feature in element.style) return true;

		for (let i = 0; i < prefixes.length; i++) {
			if ((prefixes[i] + upper) in element.style) return true;
		}

		return false;
	}

		var	$body = document.querySelector('body');

	function customClassList(el) {
		this.el = el;
		const classes = el.className.replace(/^\s+|\s+$/g, "").split(/\s+/);

		for (let i = 0; i < classes.length; i++) {
			this.add(classes[i]);
				}
			}

			function defineProperty(obj, prop, getter) {
				if (Object.defineProperty) {
					Object.defineProperty(obj, prop, { get: getter });
				} else {
					obj.__defineGetter__(prop, getter);
				}
			}

			if (typeof window.Element === 'undefined' || !('classList' in document.documentElement)) {
				const proto = customClassList.prototype;
				const arrProto = Array.prototype;

				proto.add = function (className) {
					if (!this.contains(className)) {
						arrProto.push.call(this, className);
						this.el.className = this.toString();
					}
				};

				proto.contains = function (className) {
					return this.el.className.indexOf(className) !== -1;
				};

				proto.item = function (index) {
					return this[index] || null;
				};

				proto.remove = function (className) {
					if (this.contains(className)) {
						for (let i = 0; i < this.length; i++) {
							if (this[i] === className) {
								arrProto.splice.call(this, i, 1);
								this.el.className = this.toString();
								return;
							}
						}
					}
				};

				proto.toString = function () {
					return arrProto.join.call(this, ' ');
				};

				proto.toggle = function (className) {
					if (this.contains(className)) {
						this.remove(className);
					} else {
						this.add(className);
					}
					return this.contains(className);
				};

				defineProperty(Element.prototype, 'classList', function () {
					return new customClassList(this);
				});
			}


			// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
		(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

		// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

		useEffect(() => {
			const settings = {
				images: {
					'images/palmtrees.jpg': 'center',
					'images/bridge.jpg': 'center',
					'images/beach2.jpg': 'center',
					'images/boat.jpg': 'center',
					'images/unset.jpg': 'center',
					'images/pomp.jpg': 'top',
					'images/japan.jpg': 'center',
				},
				delay: 6000
			};

			// Vars.
			let pos = 0, lastPos = 0;
			let $wrapper, $bgs = [], $bg;
			let k;

			// Reference to the body element.
			const $body = document.body;

			// Create BG wrapper, BGs.
			$wrapper = document.createElement('div');
			$wrapper.id = 'bg';
			$body.appendChild($wrapper);

			for (k in settings.images) {
				// Create BG.
				$bg = document.createElement('div');
				$bg.style.backgroundImage = 'url("' + k + '")';
				$bg.style.backgroundPosition = settings.images[k];
				$wrapper.appendChild($bg);

				// Add it to array.
				$bgs.push($bg);
			}

			// Main loop.
			$bgs[pos].classList.add('visible');
			$bgs[pos].classList.add('top');

			// Check if there's only one BG or if the client doesn't support transitions.
			if ($bgs.length === 1 || !canUse('transition')) {
				return;
			}

			const intervalId = setInterval(function () {
				lastPos = pos;
				pos++;

				// Wrap to beginning if necessary.
				if (pos >= $bgs.length) {
					pos = 0;
				}

				// Swap top images.
				$bgs[lastPos].classList.remove('top');
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Hide the last image after a short delay.
				setTimeout(function () {
					$bgs[lastPos].classList.remove('visible');
				}, settings.delay / 2);
			}, settings.delay);

			// Clear the interval when the component unmounts.
			return () => clearInterval(intervalId);
		}, []);

		useEffect(() => {
			const currentPage = location.pathname
			if (currentPage === '/events') {
				setButtonText('View Tasks');
			} else if (currentPage === '/tasks') {
				setButtonText('View Events');
			}else{
				setButtonText("View Events")
			}
		},[location.pathname])

		const handleViewTasks = e => {
			e.preventDefault()
			if(buttonText === 'View Tasks'){
				history.push('/tasks')
			}else if(buttonText=== 'View Events') {
				history.push('/events')
			}
		}

		if (!sessionUser) {
			return (
				<div className='landing-page'>
					{/* <div className='empty-div'></div> */}
					<ul className='header-nouser'>
						<h1 className='title-section'>
							<NavLink className='title' exact to="/">Focus Flow</NavLink>
							{/* <img className='logo' src={logo}></img> */}
						</h1>
					<div>
						<h2 className='inner-text-header'>Get a clear overview of everything on your plate and never lose track of an important task.</h2>
					</div>
						<li className='signup-login-btns'>
							{/* <ProfileButton user={sessionUser} /> */}
							{/* <TextField size="small" id="outlined-basic" helperText={errors.email} error ={ errors.email } label="Email" variant="outlined" type="text" value={email} onClick={handleSubmit}  /> */}
							<OpenModalButton
								buttonText='Log In'
								modalComponent={<LoginFormModal />}
								styleClass='Sign-up-btn'
							/>
							<OpenModalButton
								buttonText='Start For Free'
								modalComponent={<SignupFormModal />}
								styleClass='Sign-up-btn'
							/>
						</li>
					</ul>
					<div className='text1'>
						<div className='center-text'>
							<span className='quote'>"The key to happiness is really progress and growth and constantly working on yourself and developing something..." -Lewis Howes</span>
							{/* <span className='author'> -Lewis Howes</span> */}
						</div>
					</div>
				</div>
			)
		}else {
				return (
					<div className='content'>
						<ul className='page-header'>
							<h1 className='title-section'>
								<h1 className='title-task-index'>Focus Flow</h1>
								<img className='logo' src={logo}></img>
							</h1>
							<div className='tasks-profile-btn'>
								<p>
									<button className='tasks-link' onClick={handleViewTasks}>{buttonText}</button>
								</p>
								{isLoaded && (
									<li>
										<ProfileButton user={sessionUser} />
									</li>
								)}
							</div>
						</ul>
						{buttonText === 'View Tasks' ? <AllEvents /> : <AllTasks />}
				</div>
			);
		}
}

export default Navigation;
