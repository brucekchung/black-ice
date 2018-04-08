import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <div className='Nav-bar'>
    <NavLink className="Nav" exact to='/'>Login</NavLink>
    <NavLink className="Nav" to='/Landing'>Landing</NavLink>
    <NavLink className="Nav" to='/DataEntry'>DataEntry</NavLink>
    <NavLink className="Nav" to='/Reports'>Reports</NavLink>
    <NavLink className="Nav" to='/ViewAll'>EditData</NavLink>
  </div>
)

export default Nav
