import { Annotations } from '@storybook/addons'
import { Story } from '@storybook/react'
import { GlobalStyle, projectTheme } from '@vtbl/project-styles-pkg'
import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { OffsetPanel, TOffsetPanel } from '..'

export default {
  component: OffsetPanel,
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
  title: 'Project/OffsetPanel',
} as Annotations<TOffsetPanel.Props, React.ReactElement>

const Main = styled.div``

export const $OffsetPanel: Story<TOffsetPanel.Props> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  return (
    <Main>
      <button onClick={showDrawer} type="button">
        show
      </button>
      <OffsetPanel {...props} onClose={onClose} placement="right" visible={visible} />
    </Main>
  )
}

const Title = () => <div>Drawer Title</div>
const BodyContent = () => <div>Drawer Body</div>
const Footer = () => <div>Drawer Footer</div>

$OffsetPanel.args = {
  children: <BodyContent />,
  footer: <Footer />,
  title: <Title />,
} as TOffsetPanel.Props

$OffsetPanel.argTypes = {}
