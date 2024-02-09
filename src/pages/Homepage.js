import React from 'react'
import './Homepage.css'
import MasterDiv from '../components/homepage/MasterDiv'
import AppCarousel from '../components/homepage/AppCarousel'

function Homepage() {
  return (
    <div className='homepage'>
      <section className='contentsection' >
        <AppCarousel />
        <MasterDiv />
      </section>
    </div>
  )
}

export default Homepage
