import React from 'react';
import { Link } from "react-router-dom"; 
import './Navbar.css'



function Navbars ( ) {
    return (
    <div className = "navbar">
      <div className="rightside">
    <Link to="/home"> Home </Link>
    <Link to="/jobs"> Jobs </Link>
    <Link to="/about"> About </Link>
    <Link to="/contact"> Contact </Link> 
    </div>
    </div>
   
    
    )
}
    export default Navbars;