/* eslint-disable */
import React from 'react'
import DataEntry from './DataEntry'
import { shallow } from 'enzyme'
import { locationsOnly } from '../../mockData'

describe('DataEntry', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DataEntry />, { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with locations', () => {
    wrapper.setState({ allLocations: locationsOnly })

    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const expected = {
      allLocations: [],
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      },
      addLocation: false,
      sampleData: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should update the state of addLocation when a user wants to add a new location', () => {
    const e = {
      target: {
        innerText: 'Add a New Location'
      }
    }

    wrapper.instance().changeLocationForm(e);
    expect(wrapper.state('addLocation')).toEqual(true)
  })

  it('should not render duplicate countries and regions in the drop down', () => {
    const locations = locationsOnly
    const expected = ['Argentina', 'Peru']
    const options = wrapper.instance().sortOptionsInfo(locations, 'country')

    expect(options).toEqual(expected)
  })

  it('should format the coordinates correctly', () => {
    const locations = [{ lat: '1', lng: '-1'}]
    const expected = ['1, -1']
    const coords = wrapper.instance().sortLatLng(locations)

    expect(coords).toEqual(expected)

  })

  it('should update the state of selectedLocation when an input is changed', () => {
    const e = {
      target: {
        name: 'country',
        options: [{ value: 'Peru'}],
        selectedIndex: 0
      }
    }
    const expected = {
      country: 'Peru',
      alt: '',
      lat: '',
      lng: '',
      name: '',
      coordinates: '',
      region: ''
    }

    wrapper.instance().handleChange(e)
    expect(wrapper.state('selectedLocation')).toEqual(expected)
  })

  it('should add a data form when the add data button is clicked', () => {
    const e = {
      target: {
        innerText: 'Add Data'
      },
      preventDefault: jest.fn()
    }

    expect(wrapper.state('sampleData').length).toEqual(1)
    wrapper.instance().handleClick(e)
    expect(wrapper.state('sampleData').length).toEqual(2)
  })

  it.skip('should update each data object in state when the associated input is changed', () => {
    const e = {
      target: {
        name: 'name',
        value: 'TEST',
        parentNode: {
          className: 0
        }
      }
    }
    const expected = [{
      name: 'TEST',
      date_collected: '',
      reflectance: '',
      wavelength: ''
    }]

    wrapper.instance().updateData(e)
    expect(wrapper.state('sampleData')).toEqual(expected)
  })

  it('should add another data object to state', () => {
    expect(wrapper.state('sampleData').length).toEqual(1)
    wrapper.instance().addDataSet()
    expect(wrapper.state('sampleData').length).toEqual(2)
  })

  it('should remove the last data form when the remove button is clicked', () => {
    wrapper.instance().addDataSet()
    expect(wrapper.state('sampleData').length).toEqual(2)

    wrapper.instance().removeDataSet()
    expect(wrapper.state('sampleData').length).toEqual(1)
  })

  it('should call fetch with the correct parameters when POSTing data', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }))
    const locations = {
      type: 'locations',
      payload: locationsOnly
    }
    const url = '/api/v1/locations'
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationsOnly)
    }

    wrapper.instance().sendData(locations)
    expect(window.fetch).toHaveBeenCalledWith(url, init)

  })

  it('should call fetch with the correct parameters when GETting location id', () => {
    wrapper.setState({
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '1, -1',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      }
    })
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([{ id: 1 }])
    }))

    const id = wrapper.instance().getLocationId()
    const url = '/api/v1/locations?lat=1&lng=-1'
    const init = null
    
    expect(window.fetch).toHaveBeenCalledWith(url, init)
    // expect(id).toEqual(1)
  })

  it('should reset the state', () => {
    wrapper.setState({
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '1, -1',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      }
    })

    const expected = {
      allLocations: [],
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      },
      addLocation: false,
      sampleData: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }

    wrapper.instance().resetState()
    expect(wrapper.state()).toEqual(expected)
  })

  it('should call fetch and reset state', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([{ id: 1 }])
    }))
    const expected = {
      allLocations: [],
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      },
      addLocation: false,
      sampleData: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }

    wrapper.instance().submit()
    expect(window.fetch).toHaveBeenCalled()
    expect(wrapper.state()).toEqual(expected)
  })

  it('should POST a new location', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }))

    const payload = {
      country: '',
      region: '',
      lat: '',
      lng: '',
      name: '',
      alt: ''
    }
    const url = '/api/v1/locations'
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    wrapper.instance().submitLocation()
    expect(window.fetch).toHaveBeenCalledWith(url, init)
  })

  it('should POST a location and data, then reset state', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }))
    const expected = {
      allLocations: [],
      selectedLocation: {
        name: '',
        country: '',
        coordinates: '',
        region: '',
        lat: '',
        lng: '',
        alt: ''
      },
      addLocation: false,
      sampleData: [{
          name: '',
          date_collected: '',
          reflectance: '',
          wavelength: ''
      }]
    }

    wrapper.instance().submitWithLocation()
    expect(window.fetch).toHaveBeenCalled()
    expect(wrapper.state()).toEqual(expected)
  })

  it('should call the correct function based on the what location form is chosen', () => {
    wrapper.instance().submit = jest.fn()
    wrapper.instance().submitWithLocation = jest.fn()
    const e = {
      preventDefault: jest.fn()
    }

    wrapper.instance().handleSubmit(e)
    expect(wrapper.instance().submit).toHaveBeenCalled()

    wrapper.setState({ addLocation: true })
    wrapper.instance().handleSubmit(e)
    expect(wrapper.instance().submitWithLocation).toHaveBeenCalled()
  })

  it('should render the correct options for the remaining location drop downs', () => {
    wrapper.instance().sortOptionsInfo = jest.fn()
    wrapper.instance().sortLatLng = jest.fn()

    wrapper.instance().availableOptions('region')
    expect(wrapper.instance().sortOptionsInfo).toHaveBeenCalled()

    wrapper.instance().availableOptions('coordinates')
    expect(wrapper.instance().sortLatLng).toHaveBeenCalled()
  })
})
