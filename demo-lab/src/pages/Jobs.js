import React from 'react'
import Navbars from '../pages/Navbar'
import Content from './Content'

function Jobs(){
    return(
      <div>
      <Navbars/>
      <Content title="Jobs" content="This is the job Page"/>
      </div>
    )
}

export default Jobs