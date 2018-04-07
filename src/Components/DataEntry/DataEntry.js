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
      data: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.options[e.target.selectedIndex].value

    this.setState({ 
      location: { [name]: value }
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    e.target.innerText === 'Add Data' ? this.addDataSet() : this.removeDataSet()
  }

  updateData = (e) => {
    const name = e.target.name
    const value = e.target.value
    const index = e.target.parentNode.className
    const data = [...this.state.data]
    
    data[index][name] = value
    this.setState({ data })
  }

  addDataSet = () => {
    const newSet = {
      name: '',
      date_collected: '',
      reflectance: '',
      wavelength: ''
    }
    const newDataArray = [...this.state.data, newSet]

    this.setState({ data: newDataArray })
  }

  removeDataSet = () => {
    if (this.state.data.length > 1) {
      const allItems = [...this.state.data]

      allItems.pop();
      this.setState({ data: allItems })
    }
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
          <DataForm data={ this.state.data }
                    handleChange={ this.updateData }
                    handleClick={ this.handleClick } />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default DataEntry
