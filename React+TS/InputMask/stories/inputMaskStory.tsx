import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { InputMask, TInputMask } from '..'

export default {
  component: InputMask,
  decorators: [
    (StoryComponent) => (
      <>
        <ThemeProvider theme={projectTheme}>
          <GlobalStyle />
          <StoryComponent />
        </ThemeProvider>
      </>
    ),
  ],
  includeStories: /^\$/,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: true,
    },
  },
  title: 'Project/InputMask',
} as Annotations<TInputMask.Props, React.ReactElement>

export const $InputMaskPhone: Story<TInputMask.Props> = (props) => <InputMask {...props} />

$InputMaskPhone.args = {
  alwaysShowMask: false,
  animateError: false,
  isValid: true,
  mask: '+7 999 999 99 99',
  value: '9101111111',
} as TInputMask.Props

$InputMaskPhone.argTypes = {}
