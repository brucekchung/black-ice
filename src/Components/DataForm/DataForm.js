import React, { Component } from 'react';

class DataForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      repeatedItems: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }
  }

  renderInputs = () => {
    return this.state.repeatedItems.map((item, index) => {
      const state = this.state.repeatedItems[index]
      return (
        <div key={ index }>
          <h4>Data Point { index + 1 }</h4>
          <input type="text"  
                 name="name"
                 placeholder="Name"
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

  addData = () => {
    const newSet = {
      name: '',
      date_collected: '',
      reflectance: '',
      wavelength: ''
    }
    const newItemsArray = [...this.state.repeatedItems, newSet]

    this.setState({ repeatedItems: newItemsArray })
  }

  removeData = () => {
    if (this.state.repeatedItems.length > 1) {
      const allItems = [...this.state.repeatedItems]

      allItems.pop();
      this.setState({ repeatedItems: allItems })
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    e.target.innerText === 'Add Data' ? this.addData() : this.removeData()
  }

  render() {
    return (
      <div>
        { this.renderInputs() }
        <button onClick={ this.handleClick }>Add Data</button>
        <button onClick={ this.handleClick }>Remove</button>
      </div>
    )
  }
}

export default DataForm