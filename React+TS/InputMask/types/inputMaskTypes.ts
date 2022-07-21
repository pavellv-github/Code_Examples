import { TInput } from '@vtbl/input-comp'
import { TMarginProps } from '@vtbl/material-comp'
import React from 'react'
import { Props as DefaultInputMaskProps } from 'react-input-mask'

interface IInputMaskProps extends Omit<DefaultInputMaskProps, 'size'> {
  maskChar?: string | null
}

export declare namespace TInputMask {
  type Props = TMarginProps & TInput.Props & IInputMaskProps

  type FC = React.FC<Props>
}

export declare namespace TInputMaskView {
  type FC = React.FC<TInputMask.Props>
}
