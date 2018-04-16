import React from 'react'
import ViewAll from './ViewAll'
import { shallow } from 'enzyme'
import { allData } from '../../mockData.js'

describe('ViewAll', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ViewAll 
      udateData={jest.fn()}
      getRowData={jest.fn()}
      />, { disableLifecycleMethods: true })
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

  it('should make a GET request to samples with the correct parameters on componentDidMount', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([])
    }))
    wrapper.instance().componentDidMount()

    const url = '/api/v1/samples'
    const init = null
    
    expect(window.fetch).toHaveBeenCalledWith(url, init)
  })

  it.skip('should setState when editData button is clicked', () => {
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

  it.skip('should make an apiCall when updateData is run', () => {

  })

  it.skip('should setState when saveData is called', () => {
    wrapper.setState({ editableContent: 1 })
    // wrapper.instance().saveData('a')

    expect(wrapper.state('editableContent')).toEqual(null)
  })

  it.skip('should setState when deleteRow is called', async () => {
    wrapper.setState({ data: allData })    
    expect(wrapper.state('data').length).toEqual(2)
    // wrapper.find('.delete-btn').first().simulate('click')
    const e = {target: {parentNode: {parentNode: {id: 1}}}}

    await wrapper.instance().deleteRow(e)
    expect(wrapper.state('data').length).toEqual(1)
  })

  it('should setState of filteredData to the search input when handleChange is called', () => {
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
