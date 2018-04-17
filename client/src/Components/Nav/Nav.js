import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const Nav = () => (
  <div className='Nav-bar'>
    <NavLink className="Nav" activeClassName='selected' exact to='/'>Home</NavLink>
    <NavLink className="Nav" activeClassName='selected' to='/DataEntry'>Add Data</NavLink>
    <NavLink className="Nav" activeClassName='selected' to='/ViewAll'>Edit Data</NavLink>
    <NavLink className="Nav" activeClassName='selected' to='/Reports'>Reports</NavLink>
  </div>
)

export default Nav
