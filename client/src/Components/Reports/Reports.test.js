import React from 'react'
import Reports from './Reports'
import { shallow } from 'enzyme'

describe('Reports', () => {
  let wrapper

  beforeEach(() => {
    const wrapper = shallow(<Reports />, { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})