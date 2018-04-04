import React, { Component } from 'react'
import './Login.css'
import Nav from '../Nav/Nav'

class Login extends Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {
    return (
      <div>
        <Nav />
        Login Component
      </div>
    )
  }
}

export default Login
