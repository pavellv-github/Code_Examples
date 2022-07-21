import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Title, TTitle } from '..'
import { argTypes } from './constants'

export default {
  component: Title,
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
  title: 'Project/Title/Title',
} as Annotations<TTitle.Props, React.ReactElement>

export const $Title: Story<TTitle.Props> = (props) => <Title {...props} />

$Title.args = {
  text: 'Станьте клиентом, чтобы получить больше',
  variant: 'h4',
} as TTitle.Props

$Title.argTypes = {
  ...argTypes,
}
