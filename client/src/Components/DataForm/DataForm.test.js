import React from 'react'
import DataForm from './DataForm'
import { shallow } from 'enzyme'

describe('DataForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DataForm sampleData={ [{ name: '', date_collected: '', reflectance: '', wavelength: '' }] }
                                handleClick={ jest.fn() }
                                handleChange={ jest.fn() } />, 
                                { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
