import React from 'react'
import Main from './Main'
import { shallow } from 'enzyme'

describe('Main', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Main />)
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})