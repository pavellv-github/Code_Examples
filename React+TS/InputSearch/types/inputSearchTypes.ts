import { TInput } from '@vtbl/input-comp'

export declare namespace TInputSearch {
  type Props = TInput.Props & {
    className?: string
    onCancel?: () => void
    onSearch?:
      | ((
          value: string,
          event?:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLElement, MouseEvent>
            | undefined,
        ) => void)
      | undefined
    title?: string
  }
  type FC = React.FC<Props>
}
