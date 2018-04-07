import React, { Component } from 'react';

class DataForm extends Component {
  renderInputs = () => {
    return this.props.data.map((item, index) => {
      const state = this.props.data[index]
      return (
        <div key={ index } className={ index }>
          <h4>Data Point { index + 1 }</h4>
          <input type="text"  
                 name="name"
                 placeholder="Name"
                 onChange={ this.props.handleChange }
                 value={ state.name } />
          <input type="text"
                 name="date_collected"
                 placeholder="Date collected"
                 value={ state.date_collected } />
          <input type="text"
                 name="reflectance"
                 placeholder="Reflectance"
                 value={ state.reflectance } />
          <input type="text"
                 name="wavelength"
                 placeholder="Wavelength"
                 value={ state.wavelength } />
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        { this.renderInputs() }
        <button onClick={ this.props.handleClick }>Add Data</button>
        <button onClick={ this.props.handleClick }>Remove</button>
      </div>
    )
  }
}

export default DataForm