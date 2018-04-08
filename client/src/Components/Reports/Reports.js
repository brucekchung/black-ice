import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import DropDown from '../LocationForm/LocationForm'

class Reports extends Component {
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
      startDate: null,
      endDate: null
    }
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.options[e.target.selectedIndex].value

    this.setState({ 
      location: { [name]: value }
    })
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
          <h3>Location</h3> 
          <DropDown name='country'
                    options={ this.state.options.countries }
                    handleChange={ this.handleChange } />
          <DropDown name='coordinates'
                    options={ this.state.options.coordinates }
                    handleChange={ this.handleChange } />
          <button type='submit'>Save</button>
        </form>
      {/*<Graph Object />*/}
      </div>
    )
  }
}

export default Reports
