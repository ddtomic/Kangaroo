import React, { useState } from 'react'
import './Navbar.css'
import AuthPage from '../Pages/AuthPage.jsx'
import Dropdown from './Dropdown.jsx'
import usericonwhite from '../assets/images/usericonwhite.png'
import bell from '../assets/images/bell.png'
import logout from '../assets/images/logout.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [ DropDown, setDropDown ] = useState(false); 

  return (
    <header className="header">
          <a href="/home" className="logo">Kangaroo</a>
          <nav className="navbar">
            <Link to='/Profile'><img src={usericonwhite} alt='user-icon-white'></img></Link>
            
              <a className='notification' onClick={() => setDropDown((prev) => !prev)}><img src={ bell } alt='notification-bell'></img></a>
              <a className='log-out' href="/"><img src={ logout } alt='logout-image'></img></a>
          </nav>
          {
        DropDown && <Dropdown/>
         }

      </header>
  )
}

export default Navbar