import React, { Component } from 'react'
import './DataEntry.css'
import Nav from '../Nav/Nav'

class DataEntry extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <Nav />
        DataEntry Component
      </div>
    )
  }
}

export default DataEntry
