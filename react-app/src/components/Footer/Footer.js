import React from 'react'
import './Footer.css'
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import ContactModal from './ContactModal';
import StackModal from './StackModal';
import AboutFocusFLowModal from './AboutFocusFlow';


function Footer() {

  return (
    <div id="footer-div">
      <div id="footer-top">
        {<OpenModalButton
          buttonText="About Focus Flow"
          styleClass='join-us-btn'
          modalComponent={<AboutFocusFLowModal />}
        />
        }


        {<OpenModalButton
          buttonText="Join Focus Flow"
          styleClass='join-us-btn'
          modalComponent={<SignupFormModal />}
        />
        }

        {<OpenModalButton
          buttonText="Contact The Developer"
          styleClass='join-us-btn'
          modalComponent={<ContactModal />}
        />
        }

        {<OpenModalButton
          buttonText="Stack"
          styleClass='join-us-btn'
          modalComponent={<StackModal />}
        />
        }

        <p className='trademark'>Focus Flow © 2023</p>
      </div>
    </div>
  )
}


export default Footer
