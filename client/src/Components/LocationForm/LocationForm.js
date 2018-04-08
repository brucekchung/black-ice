import React, { Component } from 'react'

class DropDown extends Component {
  renderOptions = () => {
    return this.props.options.map((option, index) => (
      <option value={ option } 
              key={ option + index }>{ option }</option>
    ))
  }

  render() {
    return (
      <select name={ this.props.name } 
              defaultValue=''
              onChange={ this.props.handleChange }>
        <option value=''>Choose { this.props.name }</option>
        { this.renderOptions() }
      </select>
    )
  }
}

export default DropDown