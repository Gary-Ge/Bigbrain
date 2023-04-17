import React from 'react';
import { mount } from 'enzyme'
import QuizCard from './Components/QuizCard'
import { CardMedia, Typography, Menu, IconButton } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

describe('QuizCard', () => {
  let wrapper

  const onDeleteSuccessMock = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <QuizCard
          image={'/assets/default-thumbnail'}
          title={'Test Quiz'}
          quizId={999}
          onDeleteSuccess={onDeleteSuccessMock}
        />
      </BrowserRouter>
    )
  })

  it('Normal Case: Component should be rendered with indicated props', () => {
    const cardMedia = wrapper.find(CardMedia)
    expect(cardMedia.prop('image')).toEqual('/assets/default-thumbnail')

    const typography = wrapper.find(Typography).filterWhere((node) => node.prop('variant') === 'h5')
    expect(typography.text()).toEqual('Test Quiz')
  })

  it('Function Test: Click the ... button to expand a menu containing more buttons', () => {
    // The initial state of menu is closed
    let menu = wrapper.find(Menu)
    expect(menu.prop('open')).toEqual(false)

    // Click the button will expand the menu
    const iconButton = wrapper.find(IconButton)
    iconButton.find('button').simulate('click')
    wrapper.update()
    menu = wrapper.find(Menu)
    expect(menu.prop('open')).toEqual(true)
  })
})
