import { StyledInputWrapper } from '@vtbl/input-comp'
import { MarginMixin } from '@vtbl/material-comp'
import { animateErrors, projectPalette } from '@vtbl/project-styles-pkg'
import { SizeContextProps } from 'antd/lib/config-provider/SizeContext'
import styled from 'styled-components'

export const StyledTextAreaWrapper = styled(StyledInputWrapper)<{ isValid: boolean; warning: boolean }>`
  height: ${({ height }) => (height ? `${height}px` : 'auto')};

  .ant-input-textarea:hover {
    .ant-input {
      border: 1px solid
        ${({ isValid, warning }) => (isValid && warning ? projectPalette.yellow50 : projectPalette.primary50)};
    }
  }

  .ant-input {
    padding: 12px 46px 12px 16px;
    border: 1px solid
      ${({ isValid, warning }) => (isValid && warning ? projectPalette.yellow50 : projectPalette.black85)};
    border-radius: 4px;

    height: ${({ height }) => (height ? `${height}px` : 'auto')};

    &:focus {
      box-shadow: 0 0 0 4px
        ${({ isValid, warning }) => (isValid && warning ? projectPalette.yellow90 : projectPalette.primary95)};
    }

    &::placeholder {
      opacity: 1;
    }

    &.ant-input-lg {
      font-size: 18px;
      line-height: 24px;
      padding: 16px 60px 16px 20px;
      border-radius: 8px;
    }

    &.ant-input-sm {
      font-size: 14px;
      padding: 8px 34px 8px 10px;
    }
  }

  ${animateErrors}
  ${MarginMixin}
`
export const Count = styled.div<SizeContextProps>`
  position: absolute;
  right: 10px;
  bottom: 8px;
  z-index: 1;
  font-size: 12px;
  line-height: 16px;
  color: ${projectPalette.black65};
  ${({ size }) =>
    size === 'large' &&
    `font-size: 14px;
     line-height: 20px;
     bottom: 8px;
       `};
`
