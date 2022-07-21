import { FormItem } from '@vtbl/form-item-comp'
import { Input } from '@vtbl/input-comp'
import { getValidStatus } from '@vtbl/utils-pkg'
import React, { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { TInputHookForm } from './types/inputHookFormTypes'

const InputHookForm: TInputHookForm.FC = memo(
  ({ control, defaultValue, error, hint, label, message, name, rules, showValidSuffix, trigger, ...restProps }) => {
    const [triggeredOnce, setTriggeredOnce] = useState(false)

    return (
      <Controller
        control={control}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- not a bug
        defaultValue={defaultValue}
        name={name}
        render={({
          field: { onBlur, value, ...restFieldProps },
          fieldState: { invalid, isDirty, isTouched },
          formState: { submitCount },
        }) => {
          const handleBlur = () => {
            if (trigger) {
              void trigger(name).then(() => !triggeredOnce && setTriggeredOnce(true))
            }
            if (onBlur) {
              onBlur()
            }
          }

          return (
            <FormItem error={error} label={label} message={message}>
              <Input
                hint={error ? null : hint}
                isValid={getValidStatus({ invalid, isDirty, isTouched, submitCount })}
                onBlur={handleBlur}
                showValidSuffix={triggeredOnce && !invalid && showValidSuffix}
                {...restFieldProps}
                {...restProps}
                value={value}
              />
            </FormItem>
          )
        }}
        rules={rules}
      />
    )
  },
)

export { InputHookForm }
