import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg fixed-top navbar-dark'>
        <div className='container'>
          <button
            className='navbar-toggler d-lg-none'
            type='button'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='navbar-nav d-none d-lg-flex'>
            <NavLink exact to='/' className='nav-item nav-link'>
              Home
            </NavLink>
            <Link to='/glamours/' className='nav-item nav-link'>
              Glamours
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
