import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Text, TText } from '..'

export default {
  component: Text,
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
  title: 'Project/Text',
} as Annotations<TText.Props, React.ReactElement>

export const $Text: Story<TText.Props> = (props) => (
  <Text {...props}>
    Страховку необходимо ежегодно продлевать.
    <br />
    Тарификация ОСАГО регулируется Банком России
  </Text>
)

$Text.args = {} as TText.Props

$Text.argTypes = {}
