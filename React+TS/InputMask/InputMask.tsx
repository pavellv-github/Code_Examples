import React, { forwardRef, useEffect } from 'react'

import { TInputMask } from './types/inputMaskTypes'
import { InputMaskView } from './view/InputMaskView'

/** Universal ___InputMask___ component */
const InputMask: TInputMask.FC = React.memo<TInputMask.Props>(
  forwardRef(({ onChange, value: inputValue, ...restProps }, ref) => {
    const [value, setValue] = React.useState(inputValue)

    useEffect(() => {
      setValue(inputValue)
    }, [inputValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    }

    return <InputMaskView onChange={handleChange} value={value} {...restProps} ref={ref} />
  }),
)
InputMask.displayName = 'InputMask'

export { InputMask }
