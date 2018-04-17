import React, { Component } from 'react'
import { arrayOf, object, func } from 'prop-types'
import './DataForm.css'

class DataForm extends Component {
  renderInputs = () => {
    return this.props.sampleData.map((item, index) => {
      return (
        <div key={ index } className={`data-form-set ${index}`} >
          <h4>Data Point { index + 1 }</h4>
          <input type="text"  
                 name="name"
                 className="name"
                 placeholder="Name"
                 autocomplete="off"
                 onChange={ this.props.handleChange }
                 value={ item.name } />
          <input type="text"
                 name="date_collected"
                 placeholder="Date collected (mm/dd/yy)"
                 autocomplete="off"
                 onChange={ this.props.handleChange }
                 value={ item.date_collected } />
          <input type="text"
                 name="reflectance"
                 placeholder="Reflectance"
                 autocomplete="off"
                 onChange={ this.props.handleChange }
                 value={ item.reflectance } />
          <input type="text"
                 name="wavelength"
                 placeholder="Wavelength"
                 autocomplete="off"
                 onChange={ this.props.handleChange }
                 value={ item.wavelength } />
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
