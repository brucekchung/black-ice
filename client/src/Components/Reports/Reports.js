import '../../../node_modules/britecharts/dist/css/britecharts.min.css'
import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import DropDown from '../LocationForm/LocationForm'
import { apiCall } from '../../apiCall/apiCall'
import { shape, array, string, bool } from 'prop-types'
import './Reports.css'
import BarChart from 'britecharts/dist/umd/bar.min'

const d3Selection = require('d3-selection');

class Reports extends Component {
  constructor() {
    super()
    this.state = {
      allLocations: [],
      allSamples: [],
      selectedLocation: {
        country: '',
        coordinates: '',
        region: '',
      },
      showGraph: false,
      startDate: '',
      endDate: ''
    }
  }

  componentDidMount = async () => {
    const allLocations = await apiCall('/api/v1/locations')
    const allSamples = await apiCall('/api/v1/samples')

    this.setState({ allLocations, allSamples })
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
    
    this.setState({ showGraph: true })
    this.displayBarGraph(data)
  }

  calculateAverage = () => {
    const avg = this.state.allSamples.length / this.state.allLocations.length
    const rounded = Number.parseFloat(avg).toPrecision(3)

    return rounded
  }

  calculateReflectance = () => {
    const reflectance = this.state.allSamples.reduce((acc, sample) => {
      if(sample.reflectance === '') {
        return acc
      } else {
        let num = parseInt(sample.reflectance)

        return acc + num
      }
    }, 0)
    const avg = reflectance / this.state.allSamples.length
    const rounded = Number.parseFloat(avg).toPrecision(3)

    return rounded
  }

  displayBarGraph = data => {
    const reformatted = data.map(dataPoint => ({
      value: dataPoint.reflectance,
      name: dataPoint.wavelength
    }))

    const container = d3Selection.select('.js-chart-container'),
      barChart = new BarChart();

    if (container.node()) {
      barChart
      .width(1000)
      .height(300)
      .isAnimated(true)
      // .exportChart('download_data', 'reflectance')
    }

    container.datum(reformatted).call(barChart);
  }

  render() {
    return (
      <div className="Reports">
        <h2>Reports</h2>
        <div className="dashboard">
          <div className="total-samples">
            <h4>TOTAL</h4>
            <h3>{ this.state.allSamples.length }</h3>
            <h4>SAMPLES</h4>
          </div>
          <div className="total-locations">
            <h4>TOTAL</h4>
            <h3>{ this.state.allLocations.length }</h3>
            <h4>LOCATIONS</h4>
          </div>
          <div className="avg-samples">
            <h4>AVERAGE</h4>
            <h3>{ this.calculateAverage() }</h3>
            <h4>SAMPLES/LOCATION</h4>
          </div>
          <div className="avg-reflectance">
            <h4>AVERAGE</h4>
            <h3>{ this.calculateReflectance() }</h3>
            <h4>REFLECTANCE</h4>
          </div>
        </div>
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
        {
          this.state.showGraph &&
          <div className="graph">
            <div className="y-label">Reflectance</div>
            <div className="js-chart-container"></div>
            <div className="x-label">Wavelength</div>
          </div>
        }
      </div>
    )
  }
}

Reports.propTypes = {
  state: shape({
    allLocations: array.isRequired,
    allSamples: array.isRequired,
    selectedLocation: shape({
      country: string.isRequired,
      coordinates: string.isRequired,
      region: string.isRequired,
    }),
    showGraph: bool.isRequired,
    startDate: string.isRequired,
    endDate: string.isRequired
  })
}

export default Reports
