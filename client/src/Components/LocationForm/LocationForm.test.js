/* eslint-disable */
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

  it('should render the options that are passed down', () => {
    const options = ['Argentina']
    const rendered = wrapper.instance().renderOptions()
    const expected = [
      <option value='Argentina' key='Argentina0'>Argentina</option>,
      <option value='Peru' key='Peru1'>Peru</option>
    ]

    expect(rendered).toEqual(expected)
  })

})
