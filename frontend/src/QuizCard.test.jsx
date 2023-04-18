import React from 'react';
import { mount } from 'enzyme'
import QuizCard from './Components/QuizCard'
import { CardMedia, Typography, Menu, IconButton } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

describe('QuizCard', () => {
  let wrapper

  const onDeleteSuccessMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Normal Case: Component should be rendered with indicated props', () => {
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
    const cardMedia = wrapper.find(CardMedia)
    expect(cardMedia.prop('image')).toEqual('/assets/default-thumbnail')

    const typography = wrapper.find(Typography).filterWhere((node) => node.prop('variant') === 'h5')
    expect(typography.text()).toEqual('Test Quiz')
  })

  it('Function Test: Click the ... button to expand a menu containing more buttons', () => {
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

  it('Function Test: Test if a request will be sent when the component is mounted and if another request will be sent if start button is clicked', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        error: null,
        active: null,
        questions: [
          {
            duration: 10
          },
          {
            duration: 15
          },
          {
            duration: 20
          }
        ],
      }),
    }))

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch)

    const quizId = '1'
    const props = {
      image: 'https://example.com/image.jpg',
      title: 'Test Quiz',
      quizId,
      onDeleteSuccess: jest.fn(),
    }

    wrapper = mount(
      <BrowserRouter>
        <QuizCard {...props} />
      </BrowserRouter>
    )

    await act(async () => {
      await Promise.resolve(wrapper)
      wrapper.update()
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: null,
      },
    })

    // Test if the state has been updated
    let typograph = wrapper.find(Typography).filterWhere((node) => node.text() === '3 Questions')
    expect(typograph).toHaveLength(1)

    typograph = wrapper.find(Typography).filterWhere((node) => node.text() === '45 Seconds')
    expect(typograph).toHaveLength(1)

    global.fetch.mockRestore()
  })
})
