import { FormItem } from '@vtbl/form-item-comp'
import { InputMask } from '@vtbl/input-mask-comp'
import { getValidStatus, mergeRefs } from '@vtbl/utils-pkg'
import React, { forwardRef, memo } from 'react'
import { Controller } from 'react-hook-form'

import { TInputMaskHookForm } from './types/inputMaskHookFormTypes'

/** Universal ___InputMaskHookForm___ component */
const InputMaskHookForm: TInputMaskHookForm.FC = memo<TInputMaskHookForm.Props>(
  forwardRef(
    (
      {
        animateError,
        control,
        defaultValue,
        error,
        hint,
        label,
        message,
        name,
        onChange,
        rules,
        trigger,
        ...restProps
      },
      ref,
    ) => (
      <Controller
        control={control}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- not a bug
        defaultValue={defaultValue}
        name={name}
        render={({
          field: { onBlur, onChange: onFieldChange, ref: controllerRef, value },
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

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(e)
            }
            onFieldChange(e)
          }

          return (
            <FormItem error={error} label={label} message={message}>
              <InputMask
                ref={mergeRefs(ref, controllerRef)}
                animateError={animateError}
                isValid={getValidStatus({ invalid, isDirty, isTouched, submitCount })}
                name={name}
                onBlur={handleBlur}
                onChange={handleChange}
                value={value as string}
                {...restProps}
                hint={!error && hint}
              />
            </FormItem>
          )
        }}
        rules={rules}
      />
    ),
  ),
)

export { InputMaskHookForm }
