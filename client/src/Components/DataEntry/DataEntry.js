import React, { Component } from 'react'
import './DataEntry.css'
import Nav from '../Nav/Nav'
import DropDown from '../LocationForm/LocationForm'
import DataForm from '../DataForm/DataForm'
import { locationsOnly } from '../../mockData'

class DataEntry extends Component {
  constructor() {
    super()
    this.state = {
      options: {
        countries: [],
        coordinates: [],
        regions: []
      },
      location: {
        country: null,
        coordinates: null,
        region: null
      },
      data: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }
  }

  componentDidMount = async () => {
    const url = '/api/v1/locations'
    // const locations = await apiCall(url);
    const countries = this.sortOptionsInfo(locationsOnly, 'country')
    const regions = this.sortOptionsInfo(locationsOnly, 'region')
    const coordinates = this.sortLatLng(locationsOnly);

    this.setState({ 
      options: {
        countries,
        regions,
        coordinates
      }
    })
  }

  sortOptionsInfo = (locations, type) => {
    return locations.reduce((acc, location) => {
      if(acc.includes(location[type])) {
        return acc
      }

      return [...acc, location[type]]
    }, [])
  }

  sortLatLng = locations => {
    return locations.reduce((acc, location) => {
      const latlng = `${location.lat}, ${location.lng}`

      if(acc.includes(latlng)) {
        return acc
      }

      return [...acc, latlng]
    }, [])
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

      allItems.pop()
      this.setState({ data: allItems })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    // const dataToSend = {
    //   location_id,
    //   data: this.state.data,
    // }
    // const url = ''
    // const init = { 
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(dataToSend)
    // }

    // apiCall(url, init)    
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>Add Data</h2>
        <button>Import CSV</button>
        <form onSubmit={ this.handleSubmit }>
          <h3>Location</h3>
          <DropDown name='country'
                    options={ this.state.options.countries }
                    handleChange={ this.handleChange } />
          <DropDown name='region'
                    options={ this.state.options.regions }
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
