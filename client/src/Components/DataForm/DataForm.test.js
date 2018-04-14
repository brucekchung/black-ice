import React from 'react'
import DataForm from './DataForm'
import { shallow } from 'enzyme'
import { dataOnly } from '../../mockData'

describe('DataForm', () => {
  let wrapper;

  beforeEach(() => {
    const wrapper = shallow(<DataForm data={ dataOnly }/>, { disableLifecycleMethods: true })
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})