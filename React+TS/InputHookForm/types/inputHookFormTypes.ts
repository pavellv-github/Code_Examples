import { TFormItem } from '@vtbl/form-item-comp/src/types/formItemTypes'
import { TInput } from '@vtbl/input-comp'
import { UseControllerProps, UseFormTrigger } from 'react-hook-form'

type TInputHookFormProps = UseControllerProps<any> & { trigger?: UseFormTrigger<any> }

export declare namespace TInputHookForm {
  /** _[type]_ Props for ___InputHookForm___ */
  type Props = TInputHookFormProps & TFormItem.Props & TInput.Props

  type FC = React.FC<Props>
}
