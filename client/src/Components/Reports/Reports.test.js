import React from 'react'
import Reports from './Reports'
import { shallow } from 'enzyme'
import { locationsOnly } from '../../mockData'

describe('Reports', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Reports />, 
                      { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      allLocations: [],
      selectedLocation: {
        country: '',
        coordinates: '',
        region: ''
      },
      startDate: null,
      endDate: null
    })
  })

  it('should match the snapshot when it has locations', () => {
    wrapper.setState({ allLocations: locationsOnly })
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should narrow down the options available in region drop down', () => {
    wrapper.setState({ 
      allLocations: locationsOnly,
      selectedLocation: {
        country: 'Argentina',
        coordinates: '',
        region: ''
      }
    })
    const regions = wrapper.instance().availableOptions('region')
    
    expect(regions).toEqual(['Ishinca'])
  })

  it('should narrow down the options available in coordinates drop down', () => {
    wrapper.setState({
      allLocations: locationsOnly,
      selectedLocation: {
        country: 'Argentina',
        coordinates: '',
        region: 'Ishinca'
      }
    })
    const coords = wrapper.instance().availableOptions('coordinates')

    expect(coords).toEqual(['1, -1', '1, -2'])
  })

  it('should sort the available options without creating duplicates', () => {
    wrapper.setState({
      allLocations: locationsOnly,
      selectedLocation: {
        country: 'Argentina',
        coordinates: '',
        region: ''
      }
    })
    const remaining = [
      {
        id: '1',
        name: 'Base Camp',
        lat: '1',
        lng: '-1',
        alt: '4000m',
        region: 'Ishinca',
        country: 'Argentina'    
      }, {
        id: '3',
        name: 'Camp 2',
        lat: '1',
        lng: '-2',
        alt: '6000m',
        region: 'Ishinca',
        country: 'Argentina'
      }
    ]
    const regions = wrapper.instance().removeRepeatOptions(remaining, 'region')

    expect(regions).toEqual(['Ishinca'])
  })

  it('should format the lat and lng options', () => {
    wrapper.setState({
      allLocations: locationsOnly,
      selectedLocation: {
        country: 'Argentina',
        coordinates: '',
        region: 'Ishinca'
      }
    })
    const remaining = [
      {
        id: '1',
        name: 'Base Camp',
        lat: '1',
        lng: '-1',
        alt: '4000m',
        region: 'Ishinca',
        country: 'Argentina'    
      }, {
        id: '3',
        name: 'Camp 2',
        lat: '1',
        lng: '-2',
        alt: '6000m',
        region: 'Ishinca',
        country: 'Argentina'
      }
    ]
    const coords = wrapper.instance().formatLatLng(remaining)

    expect(coords).toEqual(['1, -1', '1, -2'])
  })

  it('should call fetch with the correct params', () => {
    wrapper.setState({
      allLocations: locationsOnly,
      selectedLocation: {
        country: 'Argentina',
        coordinates: '1, -1',
        region: 'Ishinca'
      }
    })
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([{ id: '1' }])
    }))
    wrapper.instance().getLocationId()
    
    expect(window.fetch).toHaveBeenCalledWith('/api/v1/locations?lat=1&lng=-1', null)
  })

  it('should change the state when an option is selected', () => {
    const e = {
      target: {
        name: 'country',
        selectedIndex: 0,
        options: [{ value: 'Argentina' }],
        value: undefined
      }
    }

    wrapper.instance().handleChange(e)

    expect(wrapper.state('selectedLocation')).toEqual({ 
      country: 'Argentina',
      coordinates: '',
      region: ''
    })
  })

  it('should change the state when a date input is changed', () => {
    const e = {
      target: {
        name: 'endDate',
        value: '10/10/10'
      }
    }

    wrapper.instance().setDates(e)

    expect(wrapper.state('endDate')).toEqual('10/10/10')
  })
})