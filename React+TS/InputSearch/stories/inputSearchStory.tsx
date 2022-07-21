import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { Material } from '@vtbl/material-comp'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { InputSearch, TInputSearch } from '..'

export default {
  component: InputSearch,
  decorators: [
    (StoryComponent) => (
      <Material margin="p-50">
        <ThemeProvider theme={projectTheme}>
          <GlobalStyle />
          <StoryComponent />
        </ThemeProvider>
      </Material>
    ),
  ],
  includeStories: /^\$/,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: true,
    },
  },
  title: 'UI Kit/Input Search',
} as Annotations<TInputSearch.Props, React.ReactElement>

export const $InputSearch: Story<TInputSearch.Props> = (props) => {
  const [value, setValue] = useState<string>()
  return <InputSearch {...props} onCancel={() => setValue(undefined)} onSearch={setValue} value={value} />
}

$InputSearch.args = {
  title: 'Поиск',
} as TInputSearch.Props

$InputSearch.argTypes = {
  size: {
    control: 'inline-radio',
    defaultValue: 'small',
    options: ['small', 'middle', 'large'],
  },
}
