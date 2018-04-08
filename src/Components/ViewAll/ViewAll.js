import React, { Component } from 'react'
import Nav from '../Nav/Nav'

class ViewAll extends Component {
  constructor() {
    super()
    this.state = {
      data: [{
        id: 1,
        name: 'Col',
        date_collected: '08/19/18',
        reflectance: '89%',
        wavelength: 'something',
        altitude: '4000m',
        latlng: '1, -1',
        country: 'test'
      }]
    }
  }

  // componentDidMount = async () => {
  //   const url = '/api/v1/data'
  //   const data = await apiCall(url)

  //   this.setState({ data })
  // }

  renderData = () => {
    return this.state.data.map(dataPoint => {
      return (
        <tr id={ dataPoint.id }>
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


  render() {
    return (
      <div>
        <Nav />
        <h2>All Data</h2>
        <table>
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
          { this.renderData() }
        </table>
      </div>
    )
  }
}

export default ViewAll
