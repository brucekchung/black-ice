import React from 'react'
import Nav from './Nav'
import { shallow } from 'enzyme'

describe('Nav', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Nav />)
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})