import React, { Component } from 'react'
import './reset.css'
import './App.css'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Main />
      </div>
    )
  }
}

export default App
