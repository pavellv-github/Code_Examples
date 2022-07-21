import { EyeHide, EyeShow } from '@vtbl/project-icons-pkg'
import { Input as AntInput } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'

import { Hint, Placeholder, StyledCancel, StyledInputWrapper, ValidMark } from './themes/inputThemes'
import { TInput } from './types/inputTypes'

const Input: TInput.FC = React.memo(
  forwardRef<TInput.Component, TInput.Props>(
    (
      {
        allowClear,
        animateError = false,
        animatePlaceholder = false,
        className,
        disabled,
        highlight,
        hint,
        isValid,
        margin,
        onBlur,
        onChange,
        onFocus,
        padding,
        placeholder,
        prefix,
        showValidSuffix = false,
        size,
        suffix,
        type = 'text',
        value,
        warning = false,
        ...restProps
      },
      ref,
    ) => {
      const [currentValue, setCurrentValue] = useState(value)
      const [isFloatedPlaceholder, setIsFloatedPlaceholder] = useState(animatePlaceholder && Boolean(value))

      useEffect(() => {
        if (value !== currentValue) {
          setCurrentValue(value)
        }
      }, [value, currentValue])

      useEffect(() => {
        setIsFloatedPlaceholder(animatePlaceholder && Boolean(value))
      }, [animatePlaceholder, value])

      const showPlaceholder = !currentValue || (currentValue && animatePlaceholder)
      const showClearIcon = Boolean(currentValue && allowClear && !disabled)
      const inputSuffix = showValidSuffix && isValid ? <ValidMark size={size} /> : suffix || <span />

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value)
        if (animatePlaceholder && Boolean(e.target.value) !== isFloatedPlaceholder) {
          setIsFloatedPlaceholder(!isFloatedPlaceholder)
        }
        if (onChange) {
          onChange(e)
        }
      }

      const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
        if (animatePlaceholder && !e.target.value && !isFloatedPlaceholder) {
          setIsFloatedPlaceholder(true)
        }
        if (onFocus) {
          onFocus(e)
        }
      }

      const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        if (animatePlaceholder && !e.target.value && isFloatedPlaceholder) {
          setIsFloatedPlaceholder(false)
        }
        if (onBlur) {
          onBlur(e)
        }
      }

      const commonInputProps = {
        allowClear,
        disabled,
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        placeholder,
        prefix,
        ref,
        size,
        type,
        value,
      }

      return (
        <StyledInputWrapper
          animateError={animateError && !isValid}
          className={className}
          disabled={disabled}
          highlight={!!highlight && !!currentValue}
          isValid={isValid}
          margin={margin}
          padding={padding}
          showClearIcon={showClearIcon}
          size={size}
          warning={warning}
        >
          {type === 'password' ? (
            <AntInput.Password
              iconRender={(visible: boolean) => (visible ? <EyeShow /> : <EyeHide />)}
              {...commonInputProps}
              {...restProps}
            />
          ) : (
            <AntInput suffix={inputSuffix} {...commonInputProps} {...restProps} />
          )}
          {showPlaceholder && (
            <Placeholder
              isFloatedPlaceholder={isFloatedPlaceholder}
              size={size}
              withPrefix={Boolean(prefix)}
              withSuffix={Boolean(inputSuffix)}
            >
              {placeholder}
            </Placeholder>
          )}
          {showClearIcon && <StyledCancel size={size} />}
          {hint && <Hint>{hint}</Hint>}
        </StyledInputWrapper>
      )
    },
  ),
)
Input.displayName = 'VTBInput'

export { Input }
