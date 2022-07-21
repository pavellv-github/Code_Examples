import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { Envelope } from '@vtbl/project-icons-pkg'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { Input, TInput } from '..'

const InputWrapper = styled.div`
  margin: 30px;
  width: 400px;
`

export default {
  component: Input,
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
    layout: 'centered',
    options: {
      showPanel: true,
    },
  },
  title: 'Project/Input',
} as Annotations<TInput.Props, React.ReactElement>

export const $Input: Story<TInput.Props> = (props) => (
  <>
    <InputWrapper>
      <Input {...props} />
    </InputWrapper>
    <InputWrapper>
      <Input {...props} prefix={<Envelope />} />
    </InputWrapper>
  </>
)

$Input.args = {
  allowClear: false,
  animateError: true,
  animatePlaceholder: false,
  disabled: false,
  isValid: true,
  placeholder: 'Напишите наименование организации',
  warning: false,
}

$Input.argTypes = {
  size: {
    control: 'inline-radio',
    defaultValue: 'middle',
    options: ['large', 'middle', 'small'],
  },
}
