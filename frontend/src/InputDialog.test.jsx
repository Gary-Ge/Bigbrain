import InputDialog from './Components/InputDialog';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('InputDialog', () => {
  const onCloseMock = jest.fn();
  const onSuccessMock = jest.fn();

  beforeEach(() => {
    render(
      <InputDialog open={true} onClose={onCloseMock} onSuccess={onSuccessMock} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a TextField component', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('when typing, update textfield value', () => {
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: 'Test the Game' } });
    expect(textField.value).toBe('Test the Game');
  });

  it('When Clear button is clicked, clear textfield value', () => {
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: 'Test Game' } });
    fireEvent.click(screen.getByText('Clear'));
    expect(textField.value).toBe('');
  });

  it('When Cancel button is clicked,calls onClose prop ', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('When TextField has a value, enables the Create button', () => {
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: 'Test the Game' } });
    const createButton = screen.getByText('Create');
    expect(createButton).toBeEnabled();
  });
  it('When Create button is clicked with an empty TextFielddoes,it does not call onSuccess prop ', () => {
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: '' } });
    fireEvent.click(screen.getByText('Create'));
    expect(onSuccessMock).toHaveBeenCalledTimes(0);
  });
  it('When Create button is clicked with no inputdoes, it does not call onSuccess prop ', () => {
  fireEvent.click(screen.getByText('Create'));
  expect(onSuccessMock).not.toHaveBeenCalled();
});
it('When Create button is clicked with only whitespace inputdoes,it does not call onSuccess prop ', () => {
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Create'));
    expect(onSuccessMock).not.toHaveBeenCalled();
  });
  it('When Create button is clicked with only whitespace inputdoes,it does not call onSuccess prop', () => {
    const textField = screen.getByRole('textbox');
    fireEvent.change(textField, { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Create'));
    expect(onSuccessMock).not.toHaveBeenCalled();
  });    
});




  
  
  
  
  

