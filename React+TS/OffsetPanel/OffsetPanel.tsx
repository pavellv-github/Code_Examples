import React, { memo } from 'react'

import { StyledDrawer } from './theme/OffsetPanel.styled'
import { TOffsetPanel } from './types/offsetPanelTypes'

/** Universal ___OffsetPanel___ component */
const OffsetPanel: TOffsetPanel.FC = memo<TOffsetPanel.Props>((props) => {
  const { children, footer, title } = props

  return (
    <StyledDrawer {...props} footer={footer} title={title}>
      {children}
    </StyledDrawer>
  )
})

OffsetPanel.displayName = 'OffsetPanel'

export { OffsetPanel }
