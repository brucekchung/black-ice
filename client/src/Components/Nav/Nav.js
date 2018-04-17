import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const Nav = () => (
  <div className='Nav-bar'>
    <NavLink className="Nav" activeClassName='selected' exact to='/'>Home</NavLink>
    <NavLink className="Nav" activeClassName='selected' to='/DataEntry'>DataEntry</NavLink>
    <NavLink className="Nav" activeClassName='selected' to='/Reports'>Reports</NavLink>
    <NavLink className="Nav" activeClassName='selected' to='/ViewAll'>EditData</NavLink>
  </div>
)

export default Nav
