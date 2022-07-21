import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from 'styled-components'

import { InputHookForm, TInputHookForm } from '..'

export default {
  component: InputHookForm,
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
  title: 'Project/InputHookForm',
} as Annotations<TInputHookForm.Props, React.ReactElement>

export const $InputHookForm: Story<TInputHookForm.Props> = (props) => {
  const { control } = useForm()
  return <InputHookForm control={control} {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
$InputHookForm.args = {
  animateError: false,
  isValid: true,
  label: 'Тест',
  name: 'test',
  placeholder: 'Введите значение...',
  rules: { required: true },
  warning: false,
} as TInputHookForm.Props

$InputHookForm.argTypes = {}
