import React, { Component } from 'react'
import DropDown from '../LocationForm/LocationForm'
import DataForm from '../DataForm/DataForm'
import { apiCall } from '../../apiCall/apiCall'
import './DataEntry.css'
import { array, arrayOf, object, bool, string, shape } from 'prop-types'

class DataEntry extends Component {
  constructor() {
    super()
    this.state = {
      allLocations: [],
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      },
      addLocation: false,
      sampleData: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }
  }

  componentDidMount = async () => {
    const url = '/api/v1/locations'
    const allLocations = await apiCall(url)

    this.setState({ allLocations })
  }

  changeLocationForm = e => {
    const text = e.target.innerText

    e.target.innerText = text === 'Add a New Location' ? 'Choose an existing Location'
                                                       : 'Add a New Location'
    this.setState({ addLocation: !this.state.addLocation })
  }

  sortOptionsInfo = (locations, type) => {
    return locations.reduce((acc, location) => {
      if (acc.includes(location[type])) {
        return acc
      }

      return [...acc, location[type]]
    }, [])
  }

  sortLatLng = locations => {
    return locations.map(location => `${ location.lat }, ${ location.lng }`)
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.options ? e.target.options[e.target.selectedIndex].value : e.target.value
    const selectedLocation = Object.assign(this.state.selectedLocation, { [name]: value })

    this.setState({ selectedLocation })
  }

  handleClick = e => {
    e.preventDefault()
    e.target.innerText === 'Add Data' ? this.addDataSet() : this.removeDataSet()
  }

  updateData = e => {
    const name = e.target.name
    const value = e.target.value
    const index = parseInt(e.target.parentNode.className.replace('data-form-set ', ''), 10)
    const sampleData = [...this.state.sampleData]

    console.log('parentNode: ', e.target.parentNode)
    console.log('index: ', index)

    sampleData[index][name] = value
    this.setState({ sampleData })
  }

  addDataSet = () => {
    const newSet = {
      name: '',
      date_collected: '',
      reflectance: '',
      wavelength: ''
    }
    const newDataArray = [...this.state.sampleData, newSet]

    this.setState({ sampleData: newDataArray })
  }

  removeDataSet = () => {
    if (this.state.sampleData.length > 1) {
      const allItems = [...this.state.sampleData]

      allItems.pop()
      this.setState({ sampleData: allItems })
    }
  }

  sendData = async ({ type, payload }) => {
    const url = `/api/v1/${ type }`
    const init = { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    return await apiCall(url, init)
  }

  getLocationId = async () => {
    const latlng = this.state.selectedLocation.coordinates.split(', ')
    const url = `/api/v1/locations?lat=${ latlng[0] }&lng=${ latlng[1] }`
    const { id } = await apiCall(url)

    return id
  }

  resetState = () => {
    this.setState({
      allLocations: [],
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      },
      addLocation: false,
      sampleData: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    })
  }

  submit = async () => {
    const locations_id = await this.getLocationId()
    const sampleData = {
      type: 'samples',
      payload: this.state.sampleData.map(sample => Object.assign(sample, { locations_id }))
    }

    this.sendData(sampleData)  
    this.resetState()  
  }

  submitLocation = async () => {
    const { country, region, lat, lng, name, alt } = this.state.selectedLocation
    const location = { 
      type: 'locations',
      payload: { country, region, lat, lng, name, alt }
    }
    const { id } = await this.sendData(location)
    
    return id
  }

  submitWithLocation = async () => {
    const locations_id = await this.submitLocation()
    const sampleData = {
      type: 'samples',
      payload: this.state.sampleData.map(sample => Object.assign(sample, { locations_id }))
    }

    await this.sendData(sampleData)
    this.resetState()
  }

  handleSubmit = e => {
    e.preventDefault()

    return this.state.addLocation === false ? this.submit() : this.submitWithLocation()    
  }

  availableOptions = type => {
    const sort = type === 'region' ? 'country' : 'region' 
    const remaining = this.state.allLocations.filter(location => {
      return location[sort] === this.state.selectedLocation[sort]
    })
    
    return type === 'region' ? this.sortOptionsInfo(remaining, 'region')
                             : this.sortLatLng(remaining)
  }

  render() {
    return (
      <div className="DataEntry">
        <button className="import-button">Import CSV</button>
        <form onSubmit={ this.handleSubmit }>
          <h3>Location</h3>
          {
            !this.state.addLocation &&
            <div className="choose-location">
              <h4>Choose an existing location:</h4>
              <DropDown name='country'
                        options={ this.sortOptionsInfo(this.state.allLocations, 'country') }
                        handleChange={ this.handleChange } />
              <DropDown name='region'
                        options={ this.availableOptions('region') }
                        handleChange={ this.handleChange } />
              <DropDown name='coordinates'
                        options={ this.availableOptions('coordinates') }
                        handleChange={ this.handleChange } />
            </div>
          }
          {
            this.state.addLocation &&
            <div className="add-location">
              <h4>Add a new location:</h4>
              <input type="text"
                     name="name"
                     placeholder="Location Name"
                     value={ this.state.selectedLocation.name }
                     onChange={ this.handleChange } />
              <input type="text"
                     name="country"
                     placeholder="Country"
                     value={ this.state.selectedLocation.country }
                     onChange={ this.handleChange } />
              <input type="text"
                     name="region"
                     placeholder="Region"
                     value={ this.state.selectedLocation.region }
                     onChange={ this.handleChange } />
              <input type="number"
                     name="alt"
                     placeholder="Altitude"
                     value={ this.state.selectedLocation.alt }
                     onChange={ this.handleChange } />
              <input type="text"
                     name="lat"
                     placeholder="Latitude"
                     value={ this.state.selectedLocation.lat }
                     onChange={ this.handleChange } />
              <input type="text"
                     name="lng"
                     placeholder="Longitude"
                     value={ this.state.selectedLocation.lng }
                     onChange={ this.handleChange } />
            </div>
          }
          <h5>OR</h5>
          <button type="button"
                  className="add-new-location-button"
                  onClick={ this.changeLocationForm }>Add a New Location</button>
          <h3>Data</h3>
          <DataForm sampleData={ this.state.sampleData }
                    handleChange={ this.updateData }
                    handleClick={ this.handleClick } />
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    )
  }
}

DataEntry.propTypes = {
  state: shape({
    allLocations: array.isRequired,
    selectedLocation: shape({
      name: string.isRequired,
      country: string.isRequired,
      coordinates: string.isRequired,
      region: string.isRequired,
      lat: string.isRequired,
      lng: string.isRequired,
      alt: string.isRequired
    }),
    addLocation: bool.isRequired,
    sampleData: arrayOf(object.isRequired).isRequired
  })
}

export default DataEntry
