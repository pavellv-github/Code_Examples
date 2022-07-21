import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { Input } from '@vtbl/input-comp'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { FormItem, TFormItem } from '..'

export default {
  component: FormItem,
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
    layout: 'none',
    options: {
      showPanel: true,
    },
  },
  title: 'Project/FormItem',
} as Annotations<TFormItem.Props, React.ReactElement>

export const $FormItem: Story<TFormItem.Props> = (props) => <FormItem {...props} />

$FormItem.args = {
  children: <Input placeholder="Сокращенное наименование" />,
  error: 'Поле является обязательным',
  label: 'Населенный пункт',
}

$FormItem.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  error: {
    control: 'text',
    defaultValue: 'Поле является обязательным',
    type: { name: 'string', required: false },
  },
  label: {
    control: 'text',
    defaultValue: 'Населенный пункт',
    type: { name: 'string', required: false },
  },
}
