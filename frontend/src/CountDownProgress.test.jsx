import React, { useEffect, useState } from 'react';
import { mount } from 'enzyme'
import CountDownProgress from './Components/CountDownProgress'
import { Paper, LinearProgress, Box, Typography } from '@mui/material';

function TestCountDownProgress () {
  const [countdown, setCountDown] = useState(30)
  const [progress, setProgress] = useState(100)

  // Use useeffect to reset the countdown and progress, as we used a timer to reset these two values in out project
  useEffect(() => {
    setCountDown(50)
    setProgress(70)
  }, [])

  return (
    <CountDownProgress countdown={countdown} progress={progress}/>
  )
}

describe('CountDownProgress', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <CountDownProgress
        countdown={30}
        progress={100}
        display-={true}
      />
    )
  })

  it('The amount of component and its sub-component should be correct', () => {
    expect(wrapper.find(Paper)).toHaveLength(1)
    expect(wrapper.find(LinearProgress)).toHaveLength(1)
    expect(wrapper.find(Box)).toHaveLength(1)
    expect(wrapper.find(Typography)).toHaveLength(1)
  })

  it('Normal Case: Component should be rendered with indicated props', () => {
    const linearProgress = wrapper.find(LinearProgress)
    expect(linearProgress.prop('value')).toEqual(100)

    const typography = wrapper.find(Typography)
    expect(typography.text()).toEqual('30')
  })

  it('Edge Case: props should be their default value if they are not indicated', () => {
    wrapper = mount(<CountDownProgress />);
    const linearProgress = wrapper.find(LinearProgress)
    expect(linearProgress.prop('value')).toEqual(100)

    const typography = wrapper.find(Typography)
    expect(typography.text()).toEqual('100')
  })

  it('Function Test: The componeng should be able to handle the change of countdown and progress, in order to display an accurate countdown and a progress bar', () => {
    wrapper = mount(<TestCountDownProgress />)
    const linearProgress = wrapper.find(LinearProgress)
    expect(linearProgress.prop('value')).toEqual(70)
    const typography = wrapper.find(Typography)
    expect(typography.text()).toEqual('50')
  })
})
