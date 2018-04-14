import React, { Component } from 'react';

class DataForm extends Component {
  renderInputs = () => {
    return this.props.data.map((item, index) => {
      return (
        <div key={ index } className={ index }>
          <h4>Data Point { index + 1 }</h4>
          <input type="text"  
                 name="name"
                 className="name"
                 placeholder="Name"
                 onChange={ this.props.handleChange }
                 value={ item.name } />
          <input type="text"
                 name="date_collected"
                 placeholder="Date collected"
                 onChange={ this.props.handleChange }
                 value={ item.date_collected } />
          <input type="text"
                 name="reflectance"
                 placeholder="Reflectance"
                 onChange={ this.props.handleChange }
                 value={ item.reflectance } />
          <input type="text"
                 name="wavelength"
                 placeholder="Wavelength"
                 onChange={ this.props.handleChange }
                 value={ item.wavelength } />
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
