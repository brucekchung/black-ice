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
      allLocations: locationsOnly,
      selectedLocation: {
        country: '',
        coordinates: '',
        region: '',
        latitude: '',
        longitude: ''
      },
      addLocation: false,
      data: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }
  }

  // componentDidMount = () => {
    // const url = '/api/v1/locations'
    // const allLocations = await apiCall(url);

    // this.setState({ 
    //   allLocations
    // })
  // }

  changeLocationForm = e => {
    const text = e.target.innerText

    e.target.innerText = text === 'Add a New Location' ? 'Choose an existing Location'
                                                       : 'Add a New Location'
    this.setState({ addLocation: !this.state.addLocation })
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

  handleChange = e => {
    const name = e.target.name
    const value = e.target.options ? e.target.options[e.target.selectedIndex].value : e.target.value
    const selectedLocation = Object.assign(this.state.selectedLocation, { [name]: value })

    this.setState({ selectedLocation })
  }

  handleClick = e => {
    e.preventDefault();
    e.target.innerText === 'Add Data' ? this.addDataSet() : this.removeDataSet()
  }

  updateData = e => {
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

  sendData = ({ type, payload }) => {
    const url = `/api/v1/${ type }`
    const init = { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    // apiCall(url, init)
  }

  getLocationId = () => {
    const latlng = this.state.location.coordinates.split(', ')
    const url = `/api/v1/locations?lat=${ latlng[0] }&lng=${ latlng[1] }`
    // const results = await apiCall(url)

    // return results.id
  }

  resetState = () => {
    this.setState({
      selectedLocation: {
        country: '',
        coordinates: '',
        region: '',
        latitude: '',
        longitude: ''
      },
      addLocation: false,
      data: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    })
  }

  submit = () => {
    const location_id = this.getLocationId();
    const data = this.state.data.map(data => Object.assign(data, { location_id }))

    this.submitData()    
  }

  submitWithLocation = () => {
    const { country, region, latitude, longitude } = this.state.selectedLocation
    const location = { 
      type: 'Location',
      payload: { country, region, latitude, longitude }
    }
    const data = {
      type: 'Data',
      payload: this.state.data
    }
    const createdLocation =  this.sendData(location)
    const createdData = this.sendData(data)

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
      <div>
        <Nav />
        <h2>Add Data</h2>
        <button>Import CSV</button>
        <form onSubmit={ this.handleSubmit }>
          <h3>Location</h3>
          {
            !this.state.addLocation &&
            <div className="choose-location">
              <h4>Choose an existing Location</h4>
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
              <h4>Add a New Location</h4>
              <input type="text"
                     name="country"
                     placeholder="Country"
                     value={ this.state.selectedLocation.country }
                     onChange={ this.handleChange }/>
              <input type="text"
                     name="region"
                     placeholder="Region"
                     value={ this.state.selectedLocation.region }
                     onChange={ this.handleChange }/>
              <input type="text"
                     name="latitude"
                     placeholder="Latitude"
                     value={ this.state.selectedLocation.latitude }
                     onChange={ this.handleChange }/>
              <input type="text"
                     name="longitude"
                     placeholder="Longitude"
                     value={ this.state.selectedLocation.longitude }
                     onChange={ this.handleChange }/>
            </div>
          }
          <button type="button" onClick={ this.changeLocationForm }>Add a New Location</button>
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
