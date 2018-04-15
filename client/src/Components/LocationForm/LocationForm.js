import React, { Component } from 'react'
import { func, arrayOf, string } from 'prop-types'

class DropDown extends Component {
  renderOptions = () => {
    if(this.props.options && this.props.options.length > 0) {
      return this.props.options.map((option, index) => (
        <option value={ option } 
                key={ option + index }>{ option }</option>
      ))
    }
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

DropDown.propTypes = {
  options: arrayOf(string.isRequired).isRequired,
  name: string.isRequired,
  handleChange: func.isRequired
}

export default DropDown