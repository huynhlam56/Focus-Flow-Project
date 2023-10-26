import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const bodyElement = document.body
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    history.push('/')
    await dispatch(logout());
    bodyElement.style.backgroundImage ='none'
    bodyElement.style.backgroundColor = 'rgb(88, 88, 88)'
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="nav-bar">
			{/* <h1 className='title-section'>
				<NavLink className='title' exact to="/">Focus Flow</NavLink>
			</h1> */}
      <button className='profile-btn' onClick={openMenu}>
        <FontAwesomeIcon icon={faUser} style={{ color: '#403234' }} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <p className="profile-dropdown-username"><strong>Hi, {user.firstName}!</strong></p>
            <p>{user.email}</p>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className="signup-login-btn-container">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              styleClass='signup-login-btn'
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              styleClass='signup-login-btn'
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
