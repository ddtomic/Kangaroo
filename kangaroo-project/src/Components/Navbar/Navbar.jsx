// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Navbar.css'
import searchIcon from '../../assets/search-b.png'

const Navbar = () => {
  const isAdmin = false; 

  if(isAdmin){
    return (
      <header className="header">
          <a href="" className="logo">Kangaroo</a>
          
          <div className="search-Box">
          <input type='text' placeholder='Search Roo'/>
          <img src={searchIcon}/>
          
          </div>
  
          <nav className="navbar">
              <a href="/">Create</a>
              <a href="/">Notifications</a>
              <a href="/">Admin</a>
              <a href="/">Log In</a>
          </nav>
      </header>
    )}else{
      return (
        <header className="header">
            <a href="" className="logo">Kangaroo</a>
            
            <div className="search-Box">
            <input type='text' placeholder='Search Roo'/>
            <img src={searchIcon}/>
            
            </div>
    
            <nav className="navbar">
                <a href="/">Create</a>
                <a href="/">Notifications</a>
                <a href="/">Log In</a>
            </nav>
        </header>
      )
    }
  
}

export default Navbar