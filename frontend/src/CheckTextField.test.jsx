import React from 'react';
import { shallow } from 'enzyme';
import CheckTextField from './Components/CheckTextField'
import { TextField, InputAdornment } from '@mui/material';

// CheckTextField is used to editing the choice of a question, which has a checkbox inside a text field.
describe('CheckTextField', () => {
  let wrapper;
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const onCheckBoxChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CheckTextField
        label="Test Label"
        required={true}
        value="Test Value"
        onChange={onChange}
        onBlur={onBlur}
        name="Test Name"
        onCheckBoxChange={onCheckBoxChange}
        checked={false}
        checkBoxDisabled={false}
      />
    )
  })

  it('The amount of component and its sub-component should be correct', () => {
    expect(wrapper.find(TextField)).toHaveLength(1)
    expect(wrapper.find(InputAdornment)).toHaveLength(1)
  })

  it('Component should be rendered with indicated props', () => {
    const textField = wrapper.find(TextField)
    expect(textField.prop('label')).toEqual('Test Label')
    expect(textField.prop('required')).toEqual(true)
    expect(textField.prop('value')).toEqual('Test Value')
    expect(textField.prop('onChange')).toEqual(onChange)
    expect(textField.prop('onBlur')).toEqual(onBlur)

    // const checkbox = wrapper.find(Checkbox)
    // expect(checkbox.prop('name')).toEqual('Test Name')
    // expect(checkbox.prop('checked')).toEqual(false)
    // expect(checkbox.prop('disabled')).toEqual(false)
  })
});
