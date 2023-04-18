import InputDialog from './Components/InputDialog';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('InputDialog', () => {
  const onCloseMock = jest.fn()
  const onSuccessMock = jest.fn()

  beforeEach(() => {
    render(
      <InputDialog open={true} onClose={onCloseMock} onSuccess={onSuccessMock} />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Normal Test: Component in the document', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('Function Test: TextField can be updated when typing', () => {
    const textField = screen.getByRole('textbox')
    fireEvent.change(textField, { target: { value: 'Test the Game' } })
    expect(textField.value).toBe('Test the Game')
  })

  it('Function Test: TextField should be cleared when clear button is clicked', () => {
    const textField = screen.getByRole('textbox')
    fireEvent.change(textField, { target: { value: 'Test Game' } })
    fireEvent.click(screen.getByText('Clear'))
    expect(textField.value).toBe('')
  })

  it('Function Test: onClose should be triggered when close button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('Edge Case: When Create button is clicked with empty input, it does not call onSuccess prop ', () => {
    const textField = screen.getByRole('textbox')
    fireEvent.change(textField, { target: { value: '' } })
    fireEvent.click(screen.getByText('Create'))
    expect(onSuccessMock).toHaveBeenCalledTimes(0)
  })

  it('Edge Case: When Create button is clicked with no input, it does not call onSuccess prop ', () => {
    fireEvent.click(screen.getByText('Create'))
    expect(onSuccessMock).not.toHaveBeenCalled()
  })

  it('Edge Case: When Create button is clicked with only whitespace input,it does not call onSuccess prop ', () => {
    const textField = screen.getByRole('textbox')
    fireEvent.change(textField, { target: { value: '   ' } })
    fireEvent.click(screen.getByText('Create'))
    expect(onSuccessMock).not.toHaveBeenCalled()
  })
})
