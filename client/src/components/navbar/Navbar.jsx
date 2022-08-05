import React from 'react'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar--container">
            <span className="logo">ReactBookingApp</span>
            <div className="navbar--login">
                <button className="navbar--btn btn--login">Login</button>
                <button className="navbar--btn btn--register">Register</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar