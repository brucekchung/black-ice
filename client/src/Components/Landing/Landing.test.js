import React from 'react'
import Landing from './Landing'
import { shallow } from 'enzyme'

describe('Landing', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Landing />)
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should change the greeting when the user is changed', () => {
    wrapper.setState({ user: 'Bruce' })
  
    expect(wrapper).toMatchSnapshot()
  })
})
