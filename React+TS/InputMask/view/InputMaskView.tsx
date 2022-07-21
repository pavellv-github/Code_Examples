import { Input } from '@vtbl/input-comp'
import React, { forwardRef } from 'react'
import MaskedInput from 'react-input-mask'

import { TInputMaskView } from '../types/inputMaskTypes'

const InputMaskView: TInputMaskView.FC = forwardRef(
  ({ alwaysShowMask, disabled, mask, maskChar = null, maskPlaceholder, ...props }, ref) => {
    const { onBlur, onChange, value } = props

    return (
      <MaskedInput
        alwaysShowMask={alwaysShowMask}
        disabled={disabled}
        mask={mask}
        maskChar={maskChar}
        maskPlaceholder={maskPlaceholder}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {() => <Input {...props} ref={ref} disabled={disabled} />}
      </MaskedInput>
    )
  },
)

InputMaskView.displayName = 'InputMaskView'

export { InputMaskView }
