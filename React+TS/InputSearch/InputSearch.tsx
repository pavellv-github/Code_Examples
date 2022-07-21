import React, { memo, useRef, useState } from 'react'

import {
  CancelIcon,
  ClearIcon,
  Container,
  FakeButton,
  Icon,
  IconContainer,
  Material,
  Popover,
  StyledSearch,
} from './InputSearch.styles'
import { TInputSearch } from './types/inputSearchTypes'

const InputSearch: TInputSearch.FC = memo<TInputSearch.Props>(({ className, margin, padding, ...restProps }) => {
  const { onSearch = () => { }, onCancel = () => { }, size, title, value } = restProps
  const [innerValue, setInnerValue] = useState<TInputSearch.Props['value']>(value)
  const [opened, setOpened] = useState<boolean>(false)
  const [focused, setFocused] = useState<boolean>(false)
  const hasValue = !!value && value.toString().length > 0

  const componentRef = useRef(null)

  const onFocus = React.useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = React.useCallback((e) => {
    setFocused(false)
    setOpened(false)
  }, [])

  const onBlurContainer = React.useCallback(
    (e) => {
      if (opened && componentRef.current.contains(e.target) && !componentRef.current.contains(e.relatedTarget)) {
        setOpened(false)
        setFocused(false)
      }
    },
    [opened],
  )

  const onOpen = React.useCallback(
    (flag: boolean) => {
      setOpened(flag)
      if (flag) {
        setInnerValue(value)
      } else {
        setInnerValue(undefined)
      }
    },
    [value],
  )

  const onChange = React.useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e?.target.value)
  }, [])

  const onInnerSearch = React.useCallback(
    (val: string) => {
      onSearch(val)
      onOpen(false)
    },
    [onOpen, onSearch],
  )

  const onInnerCancel = React.useCallback(
    (e?: React.MouseEvent<HTMLDivElement>) => {
      if (e) e.stopPropagation()
      onCancel()
      setInnerValue(undefined)
    },
    [onCancel],
  )

  const onClear = React.useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) e.stopPropagation()
    setInnerValue(undefined)
  }, [])

  return (
    <Container ref={componentRef} className={className} margin={margin} padding={padding} size={size}>
      <FakeButton filled={hasValue} onBlur={onBlurContainer} onClick={() => onOpen(!opened)} opened={opened}>
        <Icon name="search" small={size === 'small'} />
        <Material margin="ml-4" tag="span">
          {value || title}
        </Material>
        {hasValue && <CancelIcon margin="ml-4" name="cancel" onClick={onInnerCancel} small={size === 'small'} />}
      </FakeButton>
      {opened && (
        <Popover>
          <StyledSearch
            {...restProps}
            enterButton={
              <IconContainer>
                <Icon name="search" />
              </IconContainer>
            }
            focused={focused}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onSearch={onInnerSearch}
            size="large"
            suffix={<ClearIcon name="cancel" onClick={onClear} small visible={!!innerValue} />}
            value={innerValue}
          />
        </Popover>
      )}
    </Container>
  )
})

InputSearch.displayName = 'InputSearch'

export { InputSearch }
