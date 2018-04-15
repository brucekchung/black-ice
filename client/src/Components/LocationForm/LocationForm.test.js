import React from 'react'
import DropDown from './LocationForm'
import { shallow } from 'enzyme'

describe('DropDown', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DropDown options={['Argentina', 'Peru']}
                                name='Countries'
                                handleChange={ jest.fn() }/>)
  })

  it('should match snapshot upon load', () => {
    expect(wrapper).toMatchSnapshot()
  })

})