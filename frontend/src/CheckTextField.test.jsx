import React, { useState } from 'react';
import { mount } from 'enzyme';
import CheckTextField from './Components/CheckTextField'
import { act } from 'react-dom/test-utils';
import { TextField, InputAdornment, IconButton, Checkbox } from '@mui/material';

function TestCheckTextField () {
  const [disabled, setDisabled] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleTextChange = (event) => {
    if (event.target.value === null || event.target.value === '') {
      setDisabled(true)
      setChecked(false)
    } else {
      setDisabled(false)
    }
  }

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <CheckTextField
      label="Test Label"
      required={true}
      value="Test Value"
      onChange={handleTextChange}
      onBlur={() => {}}
      name="Test Name"
      onCheckBoxChange={handleCheckedChange}
      checked={checked}
      checkBoxDisabled={disabled}
    >
    </CheckTextField>
  )
}

// CheckTextField is used to editing the choice of a question, which has a checkbox inside a text field.
describe('CheckTextField', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();
  const onCheckBoxChangeMock = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <CheckTextField
        label="Test Label"
        required={true}
        value="Test Value"
        onChange={onChangeMock}
        onBlur={onBlurMock}
        name="Test Name"
        onCheckBoxChange={onCheckBoxChangeMock}
        checked={false}
        checkBoxDisabled={false}
      />
    )
  })

  it('The amount of component and its sub-component should be correct', () => {
    expect(wrapper.find(TextField)).toHaveLength(1)
    expect(wrapper.find(InputAdornment)).toHaveLength(1)
    expect(wrapper.find(IconButton)).toHaveLength(1)
    expect(wrapper.find(Checkbox)).toHaveLength(1)
  })

  it('Normal Case: Component should be rendered with indicated props', () => {
    const textField = wrapper.find(TextField)
    expect(textField.prop('label')).toEqual('Test Label')
    expect(textField.prop('required')).toEqual(true)
    expect(textField.prop('value')).toEqual('Test Value')
    expect(textField.prop('onChange')).toEqual(onChangeMock)
    expect(textField.prop('onBlur')).toEqual(onBlurMock)

    const checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('name')).toEqual('Test Name')
    expect(checkbox.prop('checked')).toEqual(false)
    expect(checkbox.prop('disabled')).toEqual(false)
    expect(checkbox.prop('onChange')).toEqual(onCheckBoxChangeMock)
  })

  it('Edge Case: props should be their default value if they are not indicated', () => {
    wrapper = mount(<CheckTextField />);
    expect(wrapper.find(TextField).prop('required')).toEqual(false)
    expect(wrapper.find(Checkbox).prop('checked')).toEqual(false)
    expect(wrapper.find(Checkbox).prop('disabled')).toEqual(false)
  })

  it('Normal Case: Correspond function should be called when the text field has been changed, unblurred and the checkbox has been changed', () => {
    const textField = wrapper.find(TextField)
    act(() => {
      textField.props().onChange({ target: { value: 'value' } })
    })
    expect(onChangeMock).toHaveBeenCalled()

    act(() => {
      textField.props().onBlur()
    })
    expect(onBlurMock).toHaveBeenCalled()

    const checkbox = wrapper.find(Checkbox)
    act(() => {
      checkbox.props().onChange({ target: { checked: true } })
    })
    expect(onCheckBoxChangeMock).toHaveBeenCalled()
  })

  it('Function Test: The checkbox should be disabled if the textfield has no value, and vice versa', () => {
    wrapper = mount(
      <TestCheckTextField />
    )
    let checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('checked')).toEqual(false)
    expect(checkbox.prop('disabled')).toEqual(false)

    const textField = wrapper.find(TextField)
    act(() => {
      textField.props().onChange({ target: { value: '' } })
    })
    wrapper.update()

    checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('checked')).toEqual(false)
    expect(checkbox.prop('disabled')).toEqual(true)

    act(() => {
      textField.props().onChange({ target: { value: 'value' } })
    })
    wrapper.update()

    checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('checked')).toEqual(false)
    expect(checkbox.prop('disabled')).toEqual(false)
  })

  it('Function Test: Check and uncheck checkbox when checkbox is not disabled', () => {
    wrapper = mount(
      <TestCheckTextField />
    )
    let checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('checked')).toEqual(false)
    expect(checkbox.prop('disabled')).toEqual(false)

    act(() => {
      checkbox.props().onChange({ target: { checked: true } })
    })
    wrapper.update()

    checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('checked')).toEqual(true)
    expect(checkbox.prop('disabled')).toEqual(false)

    act(() => {
      checkbox.props().onChange({ target: { checked: false } })
    })
    wrapper.update()

    checkbox = wrapper.find(Checkbox)
    expect(checkbox.prop('checked')).toEqual(false)
    expect(checkbox.prop('disabled')).toEqual(false)
  })
})
