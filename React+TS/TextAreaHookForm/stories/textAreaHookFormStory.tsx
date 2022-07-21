import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from 'styled-components'

import { TextAreaHookForm, TTextAreaHookForm } from '..'

export default {
  component: TextAreaHookForm,
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
  title: 'Project/TextAreaHookForm',
} as Annotations<TTextAreaHookForm.Props, React.ReactElement>

export const $TextAreaHookForm: Story<TTextAreaHookForm.Props> = (props) => {
  const { control } = useForm()
  return <TextAreaHookForm control={control} {...props} />
}

$TextAreaHookForm.args = {
  animateError: false,
  height: 160,
  isValid: true,
  label: 'Тестовый заголовок',
  maxLength: 240,
  name: 'textarea',
  placeholder: 'Введите значение...',
  resize: false,
  rules: { required: true },
  showCount: true,
  warning: false,
} as TTextAreaHookForm.Props

$TextAreaHookForm.argTypes = {
  allowClear: {
    control: 'boolean',
    defaultValue: false,
  },
  disabled: {
    control: 'boolean',
    defaultValue: false,
  },
  size: {
    control: 'inline-radio',
    defaultValue: 'middle',
    options: ['large', 'middle', 'small'],
  },
}
