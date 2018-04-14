import React from 'react'
import DataEntry from './DataEntry'
import { shallow } from 'enzyme'

describe('DataEntry', () => {
  let wrapper;

  beforeEach(() => {
    const wrapper = shallow(<DataEntry />, { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})