import React, { useState } from 'react'
import './Navbar.css'
import AuthPage from '../Pages/AuthPage.jsx'
import Dropdown from './Dropdown.jsx'

const Navbar = () => {
  const [ DropDown, setDropDown ] = useState(false); 

  return (
    <header className="header">
          <a href="/home" className="logo">Kangaroo</a>
          <nav className="navbar">
              <a className='notification' onClick={() => setDropDown((prev) => !prev)}>Notficiation</a>
              <a className='log-out' href="/">Log out</a>
          </nav>
          {
        DropDown && <Dropdown/>
         }

      </header>
  )
}

export default Navbar