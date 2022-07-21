import { FormItem } from '@vtbl/form-item-comp'
import { TextArea } from '@vtbl/textarea-comp'
import { getValidStatus } from '@vtbl/utils-pkg'
import React, { memo } from 'react'
import { Controller } from 'react-hook-form'

import { TTextAreaHookForm } from './types/textAreaHookFormTypes'

/** Universal ___TextAreaHookForm___ component */
const TextAreaHookForm: TTextAreaHookForm.FC = memo(
  ({ control, defaultValue, error, label, message, name, rules, trigger, ...restProps }) => (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({
        field: { onBlur, ...restFieldProps },
        fieldState: { invalid, isDirty, isTouched },
        formState: { submitCount },
      }) => {
        const handleBlur = () => {
          if (trigger) {
            void trigger(name)
          }
          if (onBlur) {
            onBlur()
          }
        }
        return (
          <FormItem error={error} label={label} message={message}>
            <TextArea
              isValid={getValidStatus({ invalid, isDirty, isTouched, submitCount })}
              onBlur={handleBlur}
              {...restFieldProps}
              {...restProps}
            />
          </FormItem>
        )
      }}
      rules={rules}
    />
  ),
)

TextAreaHookForm.displayName = 'TextAreaHookForm'

export { TextAreaHookForm }
