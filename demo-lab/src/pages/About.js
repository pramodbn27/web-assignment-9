import React from 'react'
import Navbars from './Navbar'
import Content from './Content'




function About(){
    return(
      <div>
      <Navbars/>
      <Content title="About" content="This is the about Page"/>
      </div>

    )
}

export default About