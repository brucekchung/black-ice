import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import { string, shape } from 'prop-types'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      user: 'Ulyana'
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>Welcome, { this.state.user }!</h2>
        <a href="/DataEntry">Add Data</a>
        <a href="/Reports">Reports</a>
        <a href="/ViewAll">Edit Data</a>
      </div>
    )
  }
}

Landing.propTypes = {
  state: shape({
    user: string.isRequired
  })
}

export default Landing
