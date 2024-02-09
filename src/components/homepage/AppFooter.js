import React from 'react'

function AppFooter() {
  return (
    <div className='AppFooter d-flex flex-column' style={{gap:'20px'}}>
      <h2>Visit to my <a className='portfolio' href="https://17h4ck3r11-portfolio.netlify.app/" target='_blank'>PORTFOLIO</a> for more such Projects!  </h2>
      <div className='d-flex justify-content-evenly align-items-center' style={{width:'55%', fontSize: '2vw'}}>
        <a href='https://linkedin.com/in/17h4ck3r11' target='_blank'><i className="bi bi-linkedin"></i></a>
        <a href='https://github.com/17h4ck3r11' target='_blank'><i className="bi bi-github"></i></a>
        <a href='https://twitter.com/17h4ck3r11' target='_blank'><i className="bi bi-twitter-x"></i></a>
        <a href='https://instagram.com/17h4ck3r11' target='_blank'><i className="bi bi-instagram"></i></a>
        <a href='https://facebook.com/17h4ck3r11' target='_blank'><i className="bi bi-facebook"></i></a>
      </div>
    </div>
  )
}

export default AppFooter
