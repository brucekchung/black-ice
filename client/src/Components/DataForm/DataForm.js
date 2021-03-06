import React, { Component } from 'react'
import { arrayOf, object, func } from 'prop-types'
import './DataForm.css'

class DataForm extends Component {
  renderInputs = () => {
    return this.props.sampleData.map((item, index) => {
      return (
        <div key={ index }>
          <h4 >Data Point { index + 1 }</h4>
          <div className={`data-form-set ${index}`} >
            <input type="text"  
                   name="name"
                   className="name"
                   placeholder="Name"
                   autoComplete="off"
                   onChange={ this.props.handleChange }
                   value={ item.name } />
            <input type="text"
                   name="date_collected"
                   placeholder="Date collected (mm/dd/yy)"
                   autoComplete="off"
                   onChange={ this.props.handleChange }
                   value={ item.date_collected } />
            <input type="text"
                   name="reflectance"
                   placeholder="Reflectance"
                   autoComplete="off"
                   onChange={ this.props.handleChange }
                   value={ item.reflectance } />
            <input type="text"
                   name="wavelength"
                   placeholder="Wavelength"
                   autoComplete="off"
                   onChange={ this.props.handleChange }
                   value={ item.wavelength } />
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="DataForm">
        { this.renderInputs() }
        <div className="add-remove-buttons">
          <button onClick={ this.props.handleClick }>Add Data</button>
          <button onClick={ this.props.handleClick }>Remove</button>
        </div>
      </div>
    )
  }
}

DataForm.propTypes = {
  sampleData: arrayOf(object.isRequired).isRequired,
  handleChange: func.isRequired,
  handleClick: func.isRequired
}

export default DataForm
