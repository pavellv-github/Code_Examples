import { TMarginProps } from '@vtbl/material-comp'

export type TState = 'check' | 'error' | 'new' | 'pending' | 'progress' | 'success'
export type TVariant = 'primary' | 'default'

export declare namespace TStatus {
  /** _[type]_ Props for ___Status___ */
  type Props = {
    isUpperCase?: boolean
    label: string
    state: TState
    variant: TVariant
  } & TMarginProps

  type FC = React.FC<Props>
}

export declare namespace TStatusView {
  type FC = React.FC<TStatus.Props>
}
