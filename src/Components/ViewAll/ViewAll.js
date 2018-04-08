import React, { Component } from 'react'
import Nav from '../Nav/Nav'

class ViewAll extends Component {
  constructor() {
    super()
    this.state = {
      data: [{
        id: '1',
        name: 'Col',
        date_collected: '08/19/18',
        reflectance: '89%',
        wavelength: '20um',
        altitude: '4000m',
        latlng: '1, -1',
        country: 'test'
      }, {
        id: '2',
        name: 'Base',
        date_collected: '08/18/18',
        reflectance: '70%',
        wavelength: '110um',
        altitude: '5000m',
        latlng: '2, -2',
        country: 'test2'       
      }],
      search: '',
      filteredData: []
    }
  }

  // componentDidMount = async () => {
  //   const url = '/api/v1/data'
  //   const data = await apiCall(url)

  //   this.setState({ data })
  // }

  renderData = () => {
    const data = this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data

    return data.map(dataPoint => {
      return (
        <tr id={ dataPoint.id } key={ dataPoint.id }>
          <td>{ dataPoint.name }</td>
          <td>{ dataPoint.date_collected }</td>
          <td>{ dataPoint.reflectance }</td>
          <td>{ dataPoint.wavelength }</td>
          <td>{ dataPoint.altitude }</td>
          <td>{ dataPoint.latlng }</td>
          <td>{ dataPoint.country }</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      )
    })
  }

  filterData = searchValue => {
    return this.state.data.filter(dataPoint => {
      const values = Object.values(dataPoint)

      return values.find(value => value.includes(searchValue))
    })
  }

  handleChange = e => {
    const searchValue = e.target.value
    const filteredData = this.filterData(searchValue)

    this.setState({ filteredData })
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>All Data</h2>
        <input type="text" name="search" onChange={ this.handleChange } /> 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Collected</th>
              <th>Reflectance</th>
              <th>Wavelength</th>
              <th>Altitude</th>
              <th>Lat/Lng</th>
              <th>Country</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderData() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ViewAll
