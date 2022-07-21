import { TFormItem } from '@vtbl/form-item-comp/src/types/formItemTypes'
import { TTextArea } from '@vtbl/textarea-comp'
import { UseControllerProps, UseFormTrigger } from 'react-hook-form'

type TTextAreaHookFormProps = UseControllerProps<any> & { trigger?: UseFormTrigger<any> }

export declare namespace TTextAreaHookForm {
  type Props = TTextAreaHookFormProps & TTextArea.Props & TFormItem.Props

  type FC = React.FC<Props>
}
