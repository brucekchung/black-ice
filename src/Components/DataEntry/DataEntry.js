import React, { Component } from 'react'
import './DataEntry.css'
import Nav from '../Nav/Nav'
import DropDown from '../LocationForm/LocationForm'
import DataForm from '../DataForm/DataForm'

class DataEntry extends Component {
  constructor() {
    super()
    this.state = {
      options: {
        countries: ['Peru', 'Argentina'],
        coordinates: ['1, -1'],
      },
      location: {
        country: null,
        coordinates: null
      },
      data: null
    }
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.options[e.target.selectedIndex].value

    this.setState({ 
      location: { [name]: value }
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>Add Data</h2>
        <button>Import CSV</button>
        <form>
          <h3>Location</h3>
          <DropDown name='country'
                    options={ this.state.options.countries }
                    handleChange={ this.handleChange } />
          <DropDown name='coordinates'
                    options={ this.state.options.coordinates }
                    handleChange={ this.handleChange } />
          <h3>Data</h3>
          <DataForm />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default DataEntry
