import { TMarginProps } from '@vtbl/material-comp'
import { Input } from 'antd'
import { SizeContextProps } from 'antd/lib/config-provider/SizeContext'
import { InputProps } from 'antd/lib/input'

export declare namespace TInput {
  type Props = TMarginProps &
    InputProps & {
      animateError?: boolean
      animatePlaceholder?: boolean
      className?: string
      error?: string
      highlight?: boolean
      hint?: string | React.ReactNode
      isValid?: boolean
      ref?: React.ForwardedRef<Input>
      showValidSuffix?: boolean
      warning?: boolean
    }

  type Component = Input

  type FC = React.FC<Props>

  type Placeholder = SizeContextProps & { isFloatedPlaceholder?: boolean; withPrefix?: boolean; withSuffix?: boolean }

  type Wrapper = TMarginProps &
    SizeContextProps & {
      animateError: boolean
      disabled?: boolean
      highlight?: boolean
      isValid?: boolean
      showClearIcon?: boolean
      warning?: boolean
    }
}
