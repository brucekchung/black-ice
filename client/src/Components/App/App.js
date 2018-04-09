import React, { Component } from 'react'
import './App.css'
import Main from '../Main/Main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Black Ice</h1>
        </header>
        <Main />
      </div>
    )
  }
}

export default App