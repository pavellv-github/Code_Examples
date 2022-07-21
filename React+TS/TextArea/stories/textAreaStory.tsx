import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { TextArea, TTextArea } from '..'

export default {
  component: TextArea,
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
  title: 'Project/TextArea',
} as Annotations<TTextArea.Props, React.ReactElement>

export const $TextArea: Story<TTextArea.Props> = (props) => <TextArea {...props} />

$TextArea.args = {
  height: 200,
  isValid: true,
  maxLength: 240,
  placeholder: 'Напишите наименование огранизации и номер отделения',
  resize: true,
  showCount: true,
  warning: false,
} as TTextArea.Props

$TextArea.argTypes = {
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
