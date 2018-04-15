import React from 'react'
import ViewAll from './ViewAll'
import { shallow } from 'enzyme'
import { allData } from '../../mockData.js'

describe('ViewAll', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ViewAll />, { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const expected = {
      data: [],
      filteredData: [],
      editableContent: null
    }
    const actual = wrapper.state()

    expect(actual).toEqual(expected)
  })

  it('should make an apiCall on componentDidMount', () => {

  })

  it('should setState on componentDidMount', () => {

  })

  it('should setState when editData button is clicked', () => {
    // const e = {
    //   target: {
    //     innerText: 'Add Data'
    //   },
    //   preventDefault: jest.fn()
    // }

    expect(wrapper.state('editableContent')).toEqual(null)
    // console.log(wrapper.debug())
    // wrapper.instance().handleClick(e)
    // expect(wrapper.state('data').length).toEqual(2)

  })

  it('should make an apiCall when updateData is run', () => {

  })

  it('should setState when saveData is called', () => {

  })

  it('should setState when deleteRow is called', () => {

  })

  it('should setState with the filtered data on handleChange', () => {
    wrapper.setState({ data: allData })    

    const e = {
      target: {
        value: 'Pisco'
      }
    }
     
    wrapper.instance().handleChange(e)
    expect(wrapper.state('filteredData').length).toEqual(1) 
  })
})
