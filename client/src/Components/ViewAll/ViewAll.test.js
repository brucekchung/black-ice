import React from 'react'
import ViewAll from './ViewAll'
import { shallow } from 'enzyme'

describe('ViewAll', () => {
  let wrapper

  beforeEach(() => {
    const wrapper = shallow(<ViewAll />, { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})