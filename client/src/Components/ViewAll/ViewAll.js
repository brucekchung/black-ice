import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import { apiCall } from '../../apiCall/apiCall'
import { shape, array } from 'prop-types'

class ViewAll extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      filteredData: [],
      editableContent: null,
      hasSearched: false
    }
  }

  componentDidMount = async () => {
    const samples = await apiCall('/api/v1/samples')
    const locations = await apiCall('/api/v1/locations')
    const data = samples.map(sample => {
      const sample_id = {sample_id: sample.id}
      const found = locations.find(location => location.id === sample.locations_id)
      return Object.assign(sample, sample_id, found )
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
    const match = this.state.data.find(dataPoint => dataPoint.id === parseInt(id, 10))

    editedRow.forEach(tableData => match[tableData.className] = tableData.innerText)
    return match
  }

  updateData = async data => {
    const updatedData = {
      reflectance: data.reflectance,
      wavelength: data.wavelength
    }

    const url = `/api/v1/samples/${ data.sample_id }`
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    }

    apiCall(url, init)
  }

  saveData = async button => {
    const data = this.getRowData(button)

    await this.updateData(data)
    button.innerText = 'Edit'
    this.setState({ editableContent: null })
  }

  handleEdit = e => {
    const button = e.target

    button.innerText === 'Edit' ? this.editData(button) : this.saveData(button)
  }

  deleteRow = async e => {
    const tableRow = e.target.parentNode.parentNode
    const id = parseInt(tableRow.id, 10)
    const remainingData = this.state.data.filter(dataPoint => dataPoint.sample_id !== id)
    const url = `/api/v1/samples/${ id }`
    const init = { method: 'DELETE' }

    await apiCall(url, init)

    this.setState({ data: remainingData })
  }

  renderData = () => {
    const data = this.state.hasSearched ? this.state.filteredData : this.state.data

    return data.map(dataPoint => {
      const editable = parseInt(this.state.editableContent, 10) === dataPoint.id

      return (
        <tr id={ dataPoint.sample_id } key={ dataPoint.sample_id }>
          <td className='name'>{ dataPoint.name }</td>
          <td className='date_collected'>{ dataPoint.date_collected }</td>
          <td className='alt'>{ dataPoint.alt }</td>
          <td className='lat'>{ dataPoint.lat }</td>
          <td className='lng'>{ dataPoint.lng }</td>
          <td className='region'>{ dataPoint.region}</td>
          <td className='country'>{ dataPoint.country }</td>
          <td className='reflectance' contentEditable={ editable }>{ dataPoint.reflectance }</td>
          <td className='wavelength' contentEditable={ editable }>{ dataPoint.wavelength }</td>
          <td className='sample_id'>{ dataPoint.sample_id }</td> 
          <td><button onClick={ this.handleEdit }>Edit</button></td>
          <td><button className='delete-btn' onClick={ this.deleteRow }>Delete</button></td>
        </tr>
      )
    })
  }

  filterData = searchValue => {
    return this.state.data.filter(dataPoint => {
      const values = Object.values(dataPoint)
      const match = values.find(value => {
        let stuff = value

        if(typeof value === 'number') {
          stuff = value.toString()
        }

        return stuff.includes(searchValue)
      }) 

      return match
    })
  }

  handleChange = e => {
    const searchValue = e.target.value
    const filteredData = this.filterData(searchValue)

    this.setState({ 
      filteredData,
      hasSearched: true 
    })
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
              <th>Altitude</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Region</th>
              <th>Country</th>
              <th>Reflectance</th>
              <th>Wavelength</th>
              <th>Sample ID</th>
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

ViewAll.propTypes = {
  state: shape({
    data: array.isRequired,
    filteredData: array.isRequired,
  })
}

export default ViewAll
