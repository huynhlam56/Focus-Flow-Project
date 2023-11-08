import React from "react"

function ContactModal() {
  const handleToGithub = e => {
    e.preventDefault()
    window.open('https://github.com/huynhlam56')
  }

  const handleToLinkedin = e => {
    e.preventDefault()
    window.open('https://www.linkedin.com/in/huynh-lam/')
  }

  const handleToPortfolio = e => {
    e.preventDefault()
    window.open('https://huynhlam56.github.io/')
  }

  return (
    <div id='contact-div'>
      <h1>Developer Info</h1>
      <div id='developer-github'>
        <p className="developer-portfolio" onClick={handleToPortfolio}> Huynh Lam </p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToLinkedin}></i>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
