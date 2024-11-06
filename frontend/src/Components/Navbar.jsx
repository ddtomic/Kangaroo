import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
          <a href="/" className="logo">Kangaroo</a>
          <nav className="navbar">
              <a className='sign-in' href="/">Sign In</a>
              <a className='log-in' href="/">Log In</a>
          </nav>


      </header>

  )
}

export default Navbar