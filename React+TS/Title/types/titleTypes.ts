import { TMaterial } from '@vtbl/material-comp'
import React from 'react'

interface ITitleViewProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  className?: string
  'data-testid'?: string
  onClick?: () => void
  suffix?: string | React.ReactNode
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'
}

interface ITitleProps extends ITitleViewProps {
  text?: string
}

export declare namespace TTitle {
  type Props = React.PropsWithChildren<TMaterial.Props & ITitleProps>
  type FC = React.FC<Props>
}

export declare namespace TTitleView {
  type Props = ITitleViewProps
  type FC = React.FC<TTitle.Props>
}
