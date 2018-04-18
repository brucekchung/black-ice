import React, { Component } from 'react'
import { apiCall } from '../../apiCall/apiCall'
import './ViewAll.css'
import { shape, array } from 'prop-types'

class ViewAll extends Component {
  constructor() {
    super()
    this.state = {
      allData: [],
      filteredData: [],
      editableContent: null,
      hasSearched: false
    }
  }

  componentDidMount = async () => {
    const samples = await apiCall('/api/v1/samples')
    const locations = await apiCall('/api/v1/locations')
    const allData = samples.map(sample => {
      const sample_id = {sample_id: sample.id}
      const found = locations.find(location => location.id === sample.locations_id)
      return Object.assign(sample, sample_id, found )
    })

    this.setState({ allData })
  }

  editData = button => {
    const id = button.parentNode.parentNode.id

    button.innerText = 'Save'
    this.setState({ editableContent: id })
  }

  getRowData = button => {
    const tableRow = button.parentNode.parentNode
    const id = tableRow.id
    const editedRow = [...tableRow.childNodes].splice(0, 10)
    const match = this.state.allData.find(dataPoint => dataPoint.sample_id === parseInt(id, 10))

    editedRow.forEach(tableData => {
      let className;
      const tdClass = tableData.className

      if(tdClass.includes('editable-true')) {
        className = tdClass.replace(' editable-true', '')
      } else if(tdClass.includes('editable-false')) {
        className = tdClass.replace(' editable-false', '')
      }
      
      return match[className] = tableData.innerText
    })
    return match
  }

  updateData = async newData => {
    const updatedData = {
      reflectance: newData.reflectance,
      wavelength: newData.wavelength
    }

    const url = `/api/v1/samples/${ newData.sample_id }`
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
    const rowData = this.getRowData(button)

    await this.updateData(rowData)
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
    const remainingData = this.state.allData.filter(dataPoint => dataPoint.sample_id !== id)
    const url = `/api/v1/samples/${ id }`
    const init = { method: 'DELETE' }

    await apiCall(url, init)

    this.setState({ allData: remainingData })
  }

  renderData = () => {
    const dataToRender = this.state.hasSearched ? this.state.filteredData : this.state.allData

    return dataToRender.map(dataPoint => {
      const editable = parseInt(this.state.editableContent, 10) === dataPoint.sample_id

      return (
        <tr id={ dataPoint.sample_id } key={ dataPoint.sample_id }>
          <td className='name'>{ dataPoint.name }</td>
          <td className='date_collected'>{ dataPoint.date_collected }</td>
          <td className='alt'>{ dataPoint.alt }</td>
          <td className='lat'>{ dataPoint.lat }</td>
          <td className='lng'>{ dataPoint.lng }</td>
          <td className='region'>{ dataPoint.region}</td>
          <td className='country'>{ dataPoint.country }</td>
          <td className={`reflectance editable-${ editable }`} contentEditable={ editable }>{ dataPoint.reflectance }</td>
          <td className={`wavelength editable-${ editable }`} contentEditable={ editable }>{ dataPoint.wavelength }</td>
          <td className='sample_id'>{ dataPoint.sample_id }</td> 
          <td><button onClick={ this.handleEdit }>Edit</button></td>
          <td><button className='delete-btn' onClick={ this.deleteRow }>Delete</button></td>
        </tr>
      )
    })
  }

  filterData = searchValue => {
    return this.state.allData.filter(dataPoint => {
      const values = Object.values(dataPoint)
      const match = values.find(value => {
        let stuff = value

        if (typeof value === 'number') {
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
      <div className="ViewAll">
        <input className="search-bar" placeholder="search" type="text" name="search" onChange={ this.handleChange } /> 
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
    allData: array.isRequired,
    filteredData: array.isRequired
  })
}

export default ViewAll
