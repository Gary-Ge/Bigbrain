import React from 'react';
import { mount } from 'enzyme';
import { TextField, Checkbox } from '@mui/material';
import { act } from 'react-dom/test-utils';
import CheckTextField from './Components/CheckTextField'

describe('CheckTextField', () => {
  let wrapper;
  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();
  const onCheckBoxChangeMock = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <CheckTextField
        label="Test Label"
        required
        value="Test value"
        onChange={onChangeMock}
        onBlur={onBlurMock}
        name="testName"
        onCheckBoxChange={onCheckBoxChangeMock}
        checked
        checkBoxDisabled
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TextField component', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('renders the Checkbox component', () => {
    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });

  it('passes the correct props to the TextField component', () => {
    const textFieldProps = wrapper.find(TextField).props();
    expect(textFieldProps.label).toBe('Test Label');
    expect(textFieldProps.required).toBe(true);
    expect(textFieldProps.value).toBe('Test value');
    expect(textFieldProps.onChange).toEqual(expect.any(Function));
    expect(textFieldProps.onBlur).toEqual(expect.any(Function));
  });

  it('passes the correct props to the Checkbox component', () => {
    const checkboxProps = wrapper.find(Checkbox).props();
    expect(checkboxProps.color).toBe('primary');
    expect(checkboxProps.onChange).toEqual(expect.any(Function));
    expect(checkboxProps.name).toBe('testName');
    expect(checkboxProps.checked).toBe(true);
    expect(checkboxProps.disabled).toBe(true);
  });

  it('calls the onChange callback when the TextField value changes', () => {
    const textField = wrapper.find(TextField);
    act(() => {
      textField.props().onChange({ target: { value: 'New value' } });
    });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('calls the onBlur callback when the TextField loses focus', () => {
    const textField = wrapper.find(TextField);
    act(() => {
      textField.props().onBlur();
    });
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('calls the onCheckBoxChange callback when the Checkbox is clicked', () => {
    const checkbox = wrapper.find(Checkbox);
    act(() => {
      checkbox.props().onChange({ target: { checked: false } });
    });
    expect(onCheckBoxChangeMock).toHaveBeenCalled();
  });
});
