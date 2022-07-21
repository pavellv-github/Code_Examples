import { StyledCancel } from '@vtbl/input-comp'
import { CancelM } from '@vtbl/project-icons-pkg'
import { Input } from 'antd'
import React, { useState } from 'react'

import { Count, StyledTextAreaWrapper } from './themes/textAreaThemes'
import { TTextArea } from './types/textAreaTypes'

const { TextArea: AntTextArea } = Input

const TextArea: TTextArea.FC = React.memo(
  ({
    allowClear,
    animateError = false,
    disabled,
    height,
    isValid = true,
    margin,
    maxLength,
    onChange,
    padding,
    resize = true,
    showCount,
    size,
    value,
    warning,
    ...restProps
  }) => {
    const [currentValue, setCurrentValue] = useState(value)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    }
    const showClearIcon = Boolean(currentValue && allowClear && !disabled)
    const symbolsLeft = (maxLength || 0) - (currentValue?.length || 0)

    return (
      <StyledTextAreaWrapper
        animateError={animateError && !isValid}
        height={height}
        isValid={isValid}
        margin={margin}
        padding={padding}
        size={size}
        warning={warning}
      >
        <AntTextArea
          allowClear={allowClear}
          disabled={disabled}
          maxLength={maxLength}
          // prevent default counter render
          onChange={handleChange}
          showCount={false}
          size={size}
          status={!isValid ? 'error' : ''}
          style={{ resize: `${!resize ? 'none' : 'horizontal'}` }}
          value={value}
          {...restProps}
        />
        {showClearIcon && (
          <StyledCancel size={size}>
            <CancelM />
          </StyledCancel>
        )}
        {showCount && <Count size={size}>{symbolsLeft}</Count>}
      </StyledTextAreaWrapper>
    )
  },
)

TextArea.displayName = 'TextArea'

export { TextArea }
