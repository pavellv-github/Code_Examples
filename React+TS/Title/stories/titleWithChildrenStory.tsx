import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import { Status } from '@vtbl/status-comp'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

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
  title: 'Project/Title/TitleWithChildren',
} as Annotations<TTitle.Props, React.ReactElement>

const StyledTitle = styled(Title)`
  margin: 12px 0;
`

const StyledStatus = styled(Status)`
  margin: 0 0 0 16px;
`

export const $Title: Story<TTitle.Props> = (props) => (
  <div>
    <StyledTitle {...props}>
      <StyledStatus isUpperCase label="обязательно" state="check" variant="default" />
    </StyledTitle>
  </div>
)

$Title.args = {
  text: 'Страховка',
  variant: 'h4',
} as TTitle.Props

$Title.argTypes = {
  ...argTypes,
}
