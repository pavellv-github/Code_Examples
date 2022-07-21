import { DrawerProps } from 'antd'

export declare namespace TOffsetPanel {
  /** _[type]_ Props for ___OffsetPanel___ */
  type ConfirmModalContentType = {
    cancelText: string
    okText: string
    text: string
    title: string
  }

  type Props = DrawerProps &
    React.PropsWithChildren<{
      children?: React.ReactNode
      confirmContent?: ConfirmModalContentType
      showConfirmModal?: boolean
    }>

  type FC = React.FC<Props>
}
