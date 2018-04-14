import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import { apiCall } from '../../apiCall/apiCall'

class ViewAll extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      filteredData: [],
      editableContent: null
    }
  }

  componentDidMount = async () => {
    const samples = await apiCall('/api/v1/samples')
    const locations = await apiCall('/api/v1/locations')
    const data = samples.map(sample => {
      const found = locations.find(location => location.id === sample.locations_id)
      return Object.assign(sample, found);
    })

    this.setState({ data })
  }

  editData = button => {
    const id = button.parentNode.parentNode.id

    button.innerText = 'Save'
    this.setState({ editableContent: id })
  }

  getRowData = button => {
    const tableRow = button.parentNode.parentNode
    const id = tableRow.id
    const editedRow = [...tableRow.childNodes].splice(0,10)
    const match = this.state.data.find(dataPoint => dataPoint.id === parseInt(id))

    editedRow.forEach(tableData => match[tableData.className] = tableData.innerText)
    return match
  }

  // updateData = async data => {
  //   const url = `/api/v1/data-with-locations/${ data.id }`
  //   const init = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }

  //   apiCall(url, init)
  // }

  saveData = async button => {
    const data = this.getRowData(button)
    console.log(data);
    
    // await updateData(data)
    button.innerText = 'Edit'
    this.setState({ editableContent: null })
  }

  handleEdit = e => {
    const button = e.target

    button.innerText === 'Edit' ? this.editData(button) : this.saveData(button)
  }

  deleteRow = async e => {
    const tableRow = e.target.parentNode.parentNode
    const id = tableRow.id
    const remainingData = this.state.data.filter(dataPoint => dataPoint.id !== id)
    // const url = `/api/v1/data/${ id }`
    // const init = { method: 'DELETE' }

    // await apiCall(url, init)
    this.setState({ data: remainingData })
  }

  renderData = () => {
    const data = this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data

    return data.map(dataPoint => {
      const editable = parseInt(this.state.editableContent) === dataPoint.id

      return (
        <tr id={ dataPoint.id } key={ dataPoint.id } contentEditable={ editable }>
          <td className='name'>{ dataPoint.name }</td>
          <td className='date_collected'>{ dataPoint.date_collected }</td>
          <td className='reflectance'>{ dataPoint.reflectance }</td>
          <td className='wavelength'>{ dataPoint.wavelength }</td>
          <td className='locations_id'>{ dataPoint.locations_id }</td> 
          <td className='alt'>{ dataPoint.alt }</td>
          <td className='lat'>{ dataPoint.lat }</td>
          <td className='lng'>{ dataPoint.lng }</td>
          <td className='region'>{ dataPoint.region}</td>
          <td className='country'>{ dataPoint.country }</td>
          <td><button onClick={ this.handleEdit }>Edit</button></td>
          <td><button onClick={ this.deleteRow }>Delete</button></td>
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
              <th>Location ID</th>
              <th>Altitude</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Region</th>
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
