import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { FormTemplateWrapper, TFormTemplateWrapper } from '..'

export default {
  component: FormTemplateWrapper,
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
  title: 'Project/FormTemplateWrapper',
} as Annotations<TFormTemplateWrapper.Props, React.ReactElement>

export const $FormTemplateWrapper: Story<TFormTemplateWrapper.Props> = (props) => <FormTemplateWrapper {...props} />

$FormTemplateWrapper.args = {} as TFormTemplateWrapper.Props

$FormTemplateWrapper.argTypes = {}
