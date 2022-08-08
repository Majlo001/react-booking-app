import React from 'react'
import './navbar.scss'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar--container">
            <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
              <span className="logo">ReactBookingApp</span>
            </Link>
            <div className="navbar--login">
                <button className="navbar--btn btn--login">Login</button>
                <button className="navbar--btn btn--register">Register</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar