import React from 'react'
import './Navbar.css'
import AuthPage from '../Pages/AuthPage.jsx'

const Navbar = () => {
  return (
    <header className="header">
          <a href="/" className="logo">Kangaroo</a>
          <nav className="navbar">
              <a className='sign-in' href={<AuthPage/>}>Sign In</a>
              <a className='log-in' href="/">Log In</a>
          </nav>


      </header>

  )
}

export default Navbar