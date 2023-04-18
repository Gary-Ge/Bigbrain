import React from 'react';
import { mount } from 'enzyme';
import ImageDisplay from './Components/ImageDisplay';
import { Box, Paper } from '@mui/material';

describe('ImageDisplay', () => {
  const defaultProps = {
    minWidth: 200,
    maxWidth: 400,
    src: '/assets/test.img',
    alt: 'test image',
    onClick: jest.fn(),
    // Add some invalid values for props
    srcInvalid: '',
    altInvalid: 123,
  }

  it('Normal Test: The component can be rendered properly', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />)
    const box = wrapper.find(Box).filter('[data-testid="image-display-box"]')
    expect(box).toHaveLength(1)
    expect(wrapper.find(Paper)).toHaveLength(1)
    expect(wrapper.find('img')).toHaveLength(1)
    expect(wrapper.find('img').prop('src')).toEqual(defaultProps.src)
    expect(wrapper.find('img').prop('alt')).toEqual(defaultProps.alt)
  })

  it('Function Test: onClick() should be triggered when click', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />)
    wrapper.find(Box).at(1).simulate('click') // select the second Box element
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('Normal Test: Props should be same as indicated', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />)
    const box = wrapper.find(Box).filter('[data-testid="image-display-box"]')
    expect(box.prop('minWidth')).toEqual(defaultProps.minWidth)
    expect(box.prop('maxWidth')).toEqual(defaultProps.maxWidth)
  })

  it('Normal Test: elevation should be same as indicated', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />)
    const paper = wrapper.find(Paper)
    expect(paper.prop('elevation')).toEqual(3)
  })
})
