import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Status, TStatus } from '..'

export default {
  component: Status,
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
  title: 'Project/Status',
} as Annotations<TStatus.Props, React.ReactElement>

export const $Status: Story<TStatus.Props> = (props) => <Status {...props} />

const variantList: string[] = ['primary', 'default']
const stateList: string[] = ['new', 'progress', 'success', 'check', 'error', 'pending']

$Status.args = {
  isUpperCase: true,
  label: 'Label',
  state: 'new',
  variant: 'primary',
} as TStatus.Props

$Status.argTypes = {
  state: { control: 'inline-radio', options: stateList.map((el) => el) },
  variant: { control: 'inline-radio', options: variantList.map((el) => el) },
}
