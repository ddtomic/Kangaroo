import React from 'react'
import './Navbar.css'
import AuthPage from '../Pages/AuthPage.jsx'

const Navbar = () => {
  return (
    <header className="header">
          <a href="/home" className="logo">Kangaroo</a>
          <nav className="navbar">
              <a className='notification' href="/">Notficiation</a>
              <a className='log-out' href="/">Log out</a>
          </nav>


      </header>

  )
}

export default Navbar