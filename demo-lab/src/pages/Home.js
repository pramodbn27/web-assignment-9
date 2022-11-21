import React from 'react'
import Navbars from './Navbar';
import Content from './Content';


function Home(){
    return(
        <div>
        <Navbars/>
        <Content title="Home" content="This is the home Page"/>
        </div>
        )
}

export default Home