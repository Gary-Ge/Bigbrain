import React from 'react';
import { mount } from 'enzyme';
import ImageDisplay from './Components/ImageDisplay';
import { Box, Paper } from '@mui/material';

describe('ImageDisplay', () => {
  const defaultProps = {
    minWidth: 200,
    maxWidth: 400,
    src: 'https://example.com/image.jpg',
    alt: 'example image',
    onClick: jest.fn(),
    // Add some invalid values for props
    srcInvalid: '',
    altInvalid: 123,
  };
  
  it('should render correctly with props', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />);
    const box = wrapper.find(Box).filter('[data-testid="image-display-box"]');
    expect(box).toHaveLength(1);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toEqual(defaultProps.src);
    expect(wrapper.find('img').prop('alt')).toEqual(defaultProps.alt);
  });
  
  it('When clicked,it should call onClick', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />);
    wrapper.find(Box).at(1).simulate('click'); // select the second Box element
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should have minWidth and maxWidth props applied to container Box', () => {
    const wrapper = mount(<ImageDisplay {...defaultProps} />);
    const box = wrapper.find(Box).filter('[data-testid="image-display-box"]');
    expect(box.prop('minWidth')).toEqual(defaultProps.minWidth);
    expect(box.prop('maxWidth')).toEqual(defaultProps.maxWidth);
  });
  
  it('When image is clickedshould,it should call onClick prop', () => {
  const wrapper = mount(<ImageDisplay {...defaultProps} />);
  const box = wrapper.find(Box).filter('[data-testid="image-display-box"]');
  box.simulate('click');
  expect(defaultProps.onClick).toHaveBeenCalled();
});

it('should have correct elevation', () => {
  const wrapper = mount(<ImageDisplay {...defaultProps} />);
  const paper = wrapper.find(Paper);
  expect(paper.prop('elevation')).toEqual(3);
});

it('When clicked if onClick prop,it should not passedshould not call onClick', () => {
  const wrapper = mount(<ImageDisplay {...defaultProps} onClick={undefined} />);
  wrapper.find(Box).filter('[data-testid="image-display-box"]').simulate('click');
  expect(defaultProps.onClick).not.toHaveBeenCalled();
});

});
