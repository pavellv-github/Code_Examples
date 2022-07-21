import { TMaterial } from '@vtbl/material-comp'
import { TextAreaProps } from 'antd/lib/input/TextArea'
import React from 'react'

export declare namespace TTextArea {
  type Props = TMaterial.Props &
    TextAreaProps & {
      animateError?: boolean
      height?: number
      isValid?: boolean
      resize?: boolean
      value?: string
      warning?: boolean
    }
  type FC = React.FC<Props>
}
