import React from 'react'
import ViewAll from './ViewAll'
import { shallow } from 'enzyme'
import { allData } from '../../mockData.js'

describe('ViewAll', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ViewAll 
      updateData={jest.fn()}
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

  it('should setState of editableContent to the correct id when editData is called', () => {
    expect(wrapper.state('editableContent')).toEqual(null)

    const button = {parentNode: {parentNode: {id: 1}}}

    wrapper.instance().editData(button)
    expect(wrapper.state('editableContent')).toEqual(1)
  })

  it('should make an apiCall when updateData is run', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([])
    }))

    const data = {sample_id: 1}
    const updatedData = {
      reflectance: undefined,
      wavelength: undefined
    }
    const url = '/api/v1/samples/1'
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    }

    wrapper.instance().updateData(data)
    expect(window.fetch).toHaveBeenCalledWith(url, init)
  })

  it('should setState of editableContent to null when saveData is called', async () => {
    wrapper.instance().getRowData = jest.fn()
    wrapper.instance().updateData = jest.fn()
    wrapper.setState({ editableContent: 1 })

    const button = {parentNode: {parentNode: {id: 1}}}

    await wrapper.instance().saveData(button)

    expect(wrapper.state('editableContent')).toEqual(null)
  })

  it('should setState when deleteRow is called', async () => {
    wrapper.setState({ data: allData })    
    expect(wrapper.state('data').length).toEqual(2)

    const e = {target: {parentNode: {parentNode: {id: '1'}}}}

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
