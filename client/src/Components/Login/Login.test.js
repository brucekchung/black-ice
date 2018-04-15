import React from 'react'
import Login from './Login'
import { shallow } from 'enzyme'

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />)
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})