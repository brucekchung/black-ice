import React, { Component } from 'react'
import './App.css'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">Black Ice</h1>
        <Nav />
        <Main />
      </div>
    )
  }
}

export default App
