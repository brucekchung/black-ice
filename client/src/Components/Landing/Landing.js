import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import './Landing.css'
import { shape, string } from 'prop-types'
import editDataIcon from '../../assets/archive.svg'
import folderIcon from '../../assets/folder.svg'
import lineChartIcon from '../../assets/line-chart.svg'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      user: 'Ulyana'
    }
  }

  render() {
    return (
      <div className="Landing">
        <h2>Welcome, { this.state.user }!</h2>
        <div className="center-links">
          <div className="selection">
            <a href="/DataEntry">Add Data</a>
            <img src={folderIcon} alt="logo" />
          </div>
          <div className="selection">
            <a href="/Reports">Reports</a>
            <img src={lineChartIcon} alt="logo" />
          </div>
          <div className="selection">
            <a href="/ViewAll">Edit Data</a>
            <img src={editDataIcon} alt="logo" />
          </div>
        </div>
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
