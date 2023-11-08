import React from "react"
import logo from '../images/logo.png'

function AboutFocusFLowModal() {
  return (
    <div className="about-div">
      <h1 className="about-title">About Focus Flow</h1>
      <p id='about-p'>
        Welcome to Focus Flow, your ultimate task management and organization solution.
        With Focus Flow, you can effortlessly keep track of your daily responsibilities and schedule
        events using our calendar. Helping you stay focused and organized is our goal, so say goodbye to
        chaos and hello to productivity with Focus Flow!
      </p>
      <p>We hope you enjoy you visit!</p>
      <div className="logo-div">
        <img className='about-logo' src={logo}></img>
        <img className='about-logo' src={logo}></img>
        <img className='about-logo' src={logo}></img>
      </div>
    </div>
  )
}

export default AboutFocusFLowModal;
