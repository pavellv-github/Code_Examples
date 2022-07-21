import { MarginMixin } from '@vtbl/material-comp'
import { CancelM, CheckMark } from '@vtbl/project-icons-pkg'
import { animateErrors, projectPalette } from '@vtbl/project-styles-pkg'
import { SizeContextProps } from 'antd/lib/config-provider/SizeContext'
import styled from 'styled-components'

import { TInput } from '../types/inputTypes'

const DEFAULT_SIZE = 'middle'

const defaultSizeConfig = {
  floatTransformTop: 36,
  floatedFontSize: 14,
  floatedLineHeight: 20,
  fontSize: 16,
  horizontalPadding: 16,
  iconMargin: 6,
  iconSize: 24,
  iconTop: 8,
  inputHeight: 40,
  lineHeight: 20,
  placeholderTop: 10,
}

const smallSizeConfig = {
  floatTransformTop: 32,
  floatedFontSize: 14,
  floatedLineHeight: 20,
  fontSize: 14,
  horizontalPadding: 16,
  iconMargin: 6,
  iconSize: 16,
  iconTop: 10,
  inputHeight: 32,
  lineHeight: 20,
  placeholderTop: 6,
}

const largeSizeConfig = {
  floatTransformTop: 40,
  floatedFontSize: 16,
  floatedLineHeight: 20,
  fontSize: 20,
  horizontalPadding: 20,
  iconMargin: 6,
  iconSize: 32,
  iconTop: 12,
  inputHeight: 56,
  lineHeight: 32,
  placeholderTop: 12,
}

const sizeDependableConfigMap = new Map([
  ['small', smallSizeConfig],
  ['middle', defaultSizeConfig],
  ['large', largeSizeConfig],
])

const getSizeDependableConfig = (size: string = DEFAULT_SIZE) => sizeDependableConfigMap.get(size) || defaultSizeConfig

export const getIconConfig = ({ size }: SizeContextProps) => {
  const { iconSize, iconTop } = getSizeDependableConfig(size)
  return `
width: ${iconSize}px;
height:${iconSize}px;
top: ${iconTop}px;
`
}

const getInputHeight = ({ size }: SizeContextProps) => {
  const { inputHeight } = getSizeDependableConfig(size)
  return `height:${inputHeight}px;`
}

const getFontConfig = ({ size }: SizeContextProps) => {
  const { fontSize, lineHeight } = getSizeDependableConfig(size)
  return `
  font-size: ${fontSize}px;
  line-height: ${lineHeight}px;
`
}

const getFloatedConfig = (size?: string) => {
  const { floatTransformTop, floatedFontSize, floatedLineHeight } = getSizeDependableConfig(size)
  return `
  font-size: ${floatedFontSize}px;
  line-height: ${floatedLineHeight}px;
  transform: translate(0, -${floatTransformTop}px);
`
}

const getPlaceHolderConfig = ({ size, withPrefix, withSuffix }: TInput.Placeholder) => {
  const { horizontalPadding, iconMargin, iconSize, placeholderTop } = getSizeDependableConfig(size)

  const withPrefixStyles = `left: ${horizontalPadding + (withPrefix ? iconSize + iconMargin : 0)}px;`
  const placeholderWidth = `width: calc(100% - ${
    horizontalPadding * 2 + (withPrefix ? iconSize + iconMargin : 0) + (withSuffix ? iconSize + iconMargin : 0)
  }px);`

  return `top: ${placeholderTop}px; ${withPrefixStyles} ${placeholderWidth}`
}

export const StyledInputWrapper = styled.div<TInput.Wrapper>`
  position: relative;

  ${getInputHeight}

  .ant-input {
    height: inherit;
    ${getFontConfig}
    padding: ${({ showClearIcon }) =>
      showClearIcon
        ? `9px 40px 9px ${defaultSizeConfig.horizontalPadding}px`
        : `9px ${defaultSizeConfig.horizontalPadding}px`};
    border-color: ${({ isValid, warning }) =>
      isValid === false ? projectPalette.red50 : warning ? projectPalette.yellow50 : projectPalette.black85};
    border-radius: 6px;
    height: inherit;

    & input {
      border-radius: 0;
    }

    &:-webkit-autofill {
      transition: background-color 1000s 0s, color 1000s 0s;
    }

    &::placeholder {
      opacity: 0;
    }

    &-disabled {
      color: ${projectPalette.black65};
    }

    &:not(.ant-input-disabled) {
      &:focus {
        box-shadow: 0 0 0 3px
          ${({ isValid, warning }) =>
            isValid === false ? projectPalette.red95 : warning ? projectPalette.yellow90 : projectPalette.primary95};
      }

      &:hover {
        border-color: ${({ isValid, warning }) =>
          isValid === false ? projectPalette.red50 : warning ? projectPalette.yellow50 : projectPalette.primary50};
      }
    }

    &-lg {
      ${getFontConfig}

      padding: ${({ showClearIcon }) =>
        showClearIcon
          ? `11px 50px 11px ${largeSizeConfig.horizontalPadding}px`
          : `11px ${largeSizeConfig.horizontalPadding}`}px;

      &:not(.ant-input-disabled) {
        &:focus {
          box-shadow: 0 0 0 4px
            ${({ isValid, warning }) =>
              isValid === false ? projectPalette.red95 : warning ? projectPalette.yellow90 : projectPalette.primary95};
        }
      }
    }

    &-sm {
      padding: ${({ showClearIcon }) =>
        showClearIcon
          ? `5px 30px 5px ${smallSizeConfig.horizontalPadding}px`
          : `5px ${smallSizeConfig.horizontalPadding}px`};
      ${getFontConfig}
    }

    &-prefix {
      margin-right: ${defaultSizeConfig.iconMargin}px;
      ${getIconConfig};
    }

    &-clear-icon {
      position: absolute;
      ${getIconConfig};
      right: 10px;
      opacity: 0;

      &.ant-input-clear-icon-has-suffix {
        margin: 0;
      }
    }

    &-affix-wrapper {
      padding: ${({ showClearIcon }) =>
        showClearIcon
          ? `7px 40px 7px ${defaultSizeConfig.horizontalPadding}px`
          : `7px ${defaultSizeConfig.horizontalPadding}px`};
      align-items: center;
      border-color: ${({ isValid, warning }) =>
        isValid === false ? projectPalette.red50 : warning ? projectPalette.yellow50 : projectPalette.black85};
      border-radius: 6px;
      height: inherit;

      &.ant-input-affix-wrapper-focused {
        border-color: ${({ isValid, warning }) =>
          isValid === false ? projectPalette.red50 : warning ? projectPalette.yellow50 : projectPalette.primary50};
        box-shadow: 0 0 0 4px
          ${({ isValid, warning }) =>
            isValid === false ? projectPalette.red95 : warning ? projectPalette.yellow90 : projectPalette.primary95};
      }

      &-lg {
        padding: ${({ showClearIcon }) =>
          showClearIcon
            ? `11px 50px 11px ${largeSizeConfig.horizontalPadding}px`
            : `11px  ${largeSizeConfig.horizontalPadding}px`};
      }

      &-sm {
        padding: ${({ showClearIcon }) =>
          showClearIcon
            ? `6px 30px 6px ${smallSizeConfig.horizontalPadding}px`
            : `6px ${smallSizeConfig.horizontalPadding}px`};
      }

      &-disabled {
        background-color: ${projectPalette.black95};

        .ant-input-suffix {
          cursor: not-allowed;
        }
      }

      &-focused {
        box-shadow: 0 0 0 3px
          ${({ isValid, warning }) =>
            isValid === false ? projectPalette.red95 : warning ? projectPalette.yellow90 : projectPalette.primary95};
      }

      &:not(.ant-input-affix-wrapper-disabled) {
        &:hover {
          border-color: ${({ isValid, warning }) =>
            isValid === false ? projectPalette.red50 : warning ? projectPalette.yellow50 : projectPalette.primary50};
        }
      }

      & > .ant-input {
        background: transparent;
      }
    }

    &-password-icon {
      color: ${projectPalette.black65};

      &:hover {
        color: ${({ disabled }) => (disabled ? projectPalette.black65 : projectPalette.primary50)};
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
      }
    }
  }

  ${({ highlight }) =>
    highlight &&
    `
    & .ant-input {
      background-color: ${projectPalette.primary95};
      border-color: ${projectPalette.primary75};
    }
    `}

  ${MarginMixin}
  ${animateErrors}
`

export const StyledCancel = styled(CancelM)<SizeContextProps>`
  ${getIconConfig};
  position: absolute;
  right: 10px;
  z-index: 1;
  pointer-events: none;
`

export const ValidMark = styled(CheckMark)<SizeContextProps>`
  ${getIconConfig};
  color: ${projectPalette.green50};
`

export const Placeholder = styled.span<TInput.Placeholder>`
  ${getFontConfig}
  ${getPlaceHolderConfig}
  position: absolute;
  z-index: 2;
  pointer-events: none;
  color: #bfbfbf;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  transition: all 0.2s ease-in-out;
  ${({ isFloatedPlaceholder, size }) =>
    isFloatedPlaceholder &&
    `
    overflow: visible;
    left: 0;
    ${getFloatedConfig(size)}
`};
`

export const Hint = styled.div`
  position: absolute;
  font-size: 12px;
  line-height: 16px;
  color: ${projectPalette.black65};
  bottom: -20px;
  left: 20px;
  right: 0;
`
