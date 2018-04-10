import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import DropDown from '../LocationForm/LocationForm'
import { locationsOnly } from '../../mockData'

class Reports extends Component {
  constructor() {
    super()
    this.state = {
      allLocations: locationsOnly,
      selectedLocation: {
        country: '',
        coordinates: '',
        region: '',
      },
      startDate: null,
      endDate: null
    }
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.options[e.target.selectedIndex].value

    this.setState({ 
      location: { [name]: value }
    })
  }

  availableOptions = type => {
    const sort = type === 'region' ? 'country' : 'region' 
    const remaining = this.state.allLocations.filter(location => {
      return location[sort] === this.state.selectedLocation[sort]
    })
    
    return type === 'region' ? this.sortOptionsInfo(remaining, 'region')
                             : this.sortLatLng(remaining)
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

  handleSubmit = async (e) => {
    e.preventDefault();

    // const dates = {
    //   startDate: this.state.startDate,
    //   endDate: this.state.endDate
    // }
    // const url = `/api/v1/locations/${ location_id }`
    // const init = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(dates)
    // }
    // const data = await apiCall(url, init)
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
                    options={ this.sortOptionsInfo(this.state.allLocations, 'country') }
                    handleChange={ this.handleChange } />
          <DropDown name='region'
                    options={ this.availableOptions('region') }
                    handleChange={ this.handleChange } />
          <DropDown name='coordinates'
                    options={ this.availableOptions('coordinates') }
                    handleChange={ this.handleChange } />
          <label htmlFor="startDate">Start</label>
          <input id="startDate" type="date" name="startDate" />
          <label htmlFor="endDate">End</label>
          <input id="endDate" type="date" name="endDate"/>
          <button type='submit'>Generate Report</button>
        </form>
      {/*<Graph Object />*/}
      </div>
    )
  }
}

export default Reports
