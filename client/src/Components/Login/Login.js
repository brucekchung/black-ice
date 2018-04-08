import React, { Component } from 'react'
import './Login.css'
import Nav from '../Nav/Nav'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange=(e)=> {
    const { name, value } = e.target;
    this.setState({[name]:value});
  }

  render() {
    return (
      <div className='Login'>
        <Nav />
        <input 
          className='email' 
          name='email' 
          onChange={this.handleChange} 
          placeholder='email' 
          value={this.state.email} />
        <input 
          className='password' 
          name='password' 
          onChange={this.handleChange} 
          placeholder='password' 
          value={this.state.password} />
        <button className='submit'>Enter</button>
      </div>
    )
  }
}

export default Login
