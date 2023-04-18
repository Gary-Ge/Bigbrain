import React from 'react';
import { mount } from 'enzyme'
import Navbar from './Components/Navbar'
import { MemoryRouter } from 'react-router-dom';
import { Link, Button, Menu, IconButton } from '@mui/material';

describe('Navbar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );
  });

  it('Normal Test: The amount of links should be correct', () => {
    // The navbar has 2 states and each state has 4 links to be clicked
    const link = wrapper.find(Link)
    expect(link).toHaveLength(8)

    expect(wrapper.find(Button).filterWhere((node) => node.text() === 'Dashboard')).toHaveLength(1)
    expect(wrapper.find(Button).filterWhere((node) => node.text() === 'Join')).toHaveLength(1)
    expect(wrapper.find(Button).filterWhere((node) => node.text() === 'Register')).toHaveLength(1)
    expect(wrapper.find(Button).filterWhere((node) => node.text() === 'Login')).toHaveLength(1)
  })

  it('Function Test: The menu should be expanded when the menu button is clicked', () => {
    // At first the menu should be folded
    expect(wrapper.find(Menu).prop('open')).toEqual(false)

    // Simulate the clicking on menu button and the menu should be expanded
    wrapper.find(IconButton).find('button').simulate('click')
    wrapper.update()
    expect(wrapper.find(Menu).prop('open')).toEqual(true)
  })

  it('Function Test: Click the link will route you to the correspond page', () => {
    const navLinks = wrapper.find(Link);

    navLinks.forEach((link, index) => {
      link.find('a').simulate('click')
    })
  })
})
