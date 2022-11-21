import './App.css';
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Home from  "./pages/Home";
import Jobs from  "./pages/Jobs"; 
import About from "./pages/About";
import Contact from "./pages/Contact";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return ( 
  <div className= "App">
  <Router>
  {/* <Login/> */}
  <Routes>
    
  <Route path = "/" element = {<Login/>}></Route>
  <Route path = "/Home" element = {<Home/>}></Route>
  <Route path = "/Jobs" element = {<Jobs/>}></Route>
  <Route path = "/about" element = {<About/>}></Route>
  <Route path = "/contact" element = {<Contact/>}></Route>
  </Routes>
  </Router>
  </div>

  );
  }
  export default App;