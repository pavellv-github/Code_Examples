import { TFormItem } from '@vtbl/form-item-comp'
import { TInputMask } from '@vtbl/input-mask-comp'
import { TMarginProps } from '@vtbl/material-comp'
import { UseControllerProps, UseFormTrigger } from 'react-hook-form'

type TInputMaskHookFormProps = UseControllerProps<any> & { trigger?: UseFormTrigger<any> }

export declare namespace TInputMaskHookForm {
  /** _[type]_ Props for ___InputHookForm___ */
  type Props = TMarginProps & TInputMaskHookFormProps & TFormItem.Props & TInputMask.Props

  type FC = React.FC<Props>
}
