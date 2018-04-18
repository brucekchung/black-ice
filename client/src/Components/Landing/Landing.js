import React, { Component } from 'react'
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
            <a href="/DataEntry">
              <div>
                Add Data
                <img src={folderIcon} alt="logo" />
              </div>
            </a>
          </div>
          <div className="selection">
            <a href="/Reports">
              <div>
                Reports
                <img src={lineChartIcon} alt="logo" />
              </div>
            </a>
          </div>
          <div className="selection">
            <a href="/ViewAll">
              <div>
                Edit Data
                <img src={editDataIcon} alt="logo" />
              </div>
            </a>
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
