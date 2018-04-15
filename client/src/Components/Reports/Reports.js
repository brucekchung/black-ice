import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import DropDown from '../LocationForm/LocationForm'
import { apiCall } from '../../apiCall/apiCall'
import { shape, array, string } from 'prop-types'

class Reports extends Component {
  constructor() {
    super()
    this.state = {
      allLocations: [],
      selectedLocation: {
        country: '',
        coordinates: '',
        region: '',
      },
      startDate: '',
      endDate: ''
    }
  }

  componentDidMount = async () => {
    const url = '/api/v1/locations'
    const allLocations = await apiCall(url)

    this.setState({ allLocations })
  }

  availableOptions = type => {
    const sort = type === 'region' ? 'country' : 'region' 
    const remaining = this.state.allLocations.filter(location => {
      return location[sort] === this.state.selectedLocation[sort]
    })
    
    return type === 'region' ? this.removeRepeatOptions(remaining, 'region')
                             : this.formatLatLng(remaining)
  }

  removeRepeatOptions = (locations, type) => {
    return locations.reduce((acc, location) => {
      if(acc.includes(location[type])) {
        return acc
      }

      return [...acc, location[type]]
    }, [])
  }

  formatLatLng = locations => {
    return locations.map(location => {
      return `${ location.lat }, ${ location.lng }`
    })
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.options ? e.target.options[e.target.selectedIndex].value : e.target.value
    const selectedLocation = Object.assign(this.state.selectedLocation, { [name]: value })

    this.setState({ selectedLocation })
  }

  setDates = e => {
    const name = e.target.name
    const value = e.target.value

    this.setState({ [name]: value })
  }

  getLocationId = async () => {
    const latlng = this.state.selectedLocation.coordinates.split(', ')
    const url = `/api/v1/locations?lat=${ latlng[0] }&lng=${ latlng[1] }`
    const results = await apiCall(url)

    return results[0].id
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate } = this.state
    const id = await this.getLocationId()
    const url = `/api/v1/samples?locations_id=${ id }&startDate=${ startDate }&endDate=${ endDate }`
    const data = await apiCall(url)
    
    // displayGraphs(results);
  }

  displayGraphs = data => {
    // return data.map(dataPoint => add point to graph)
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>Reports</h2>
        <form onSubmit={ this.handleSubmit }>
          <DropDown name='country'
                    options={ this.removeRepeatOptions(this.state.allLocations, 'country') }
                    handleChange={ this.handleChange } />
          <DropDown name='region'
                    options={ this.availableOptions('region') }
                    handleChange={ this.handleChange } />
          <DropDown name='coordinates'
                    options={ this.availableOptions('coordinates') }
                    handleChange={ this.handleChange } />
          <input id="startDate" type="text" name="startDate" placeholder="Start Date" value={ this.state.startDate } onChange={ this.setDates }/>
          <input id="endDate" type="text" name="endDate" placeholder="End Date" value={ this.state.endDate } onChange={ this.setDates }/>
          <button type='submit'>Generate Report</button>
        </form>
      {/*<Graph Object />*/}
      </div>
    )
  }
}

Reports.propTypes = {
  state: shape({
    allLocations: array.isRequired,
    selectedLocation: shape({
      country: string.isRequired,
      coordinates: string.isRequired,
      region: string.isRequired,
    }),
    startDate: string.isRequired,
    endDate: string.isRequired
  })
}

export default Reports
