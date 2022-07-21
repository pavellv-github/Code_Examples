import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from 'styled-components'

import { InputMaskHookForm, TInputMaskHookForm } from '..'

export default {
  component: InputMaskHookForm,
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
  title: 'Project/InputMaskHookForm',
} as Annotations<TInputMaskHookForm.Props, React.ReactElement>

export const $InputMaskHookForm: Story<TInputMaskHookForm.Props> = (props) => {
  const { control } = useForm()
  return <InputMaskHookForm control={control} {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
$InputMaskHookForm.args = {
  animateError: false,
  isValid: true,
  label: 'Тест',
  mask: '+7(999) 999 99 99',
  name: 'test',
  placeholder: 'Введите значение...',
  rules: { required: true },
} as TInputMaskHookForm.Props

$InputMaskHookForm.argTypes = {}
