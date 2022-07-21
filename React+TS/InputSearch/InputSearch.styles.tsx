import { Icon } from '@vtbl/icon-comp'
import { Material } from '@vtbl/material-comp'
import { projectPalette } from '@vtbl/project-styles-pkg'
import { Input as AntInput } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import styled from 'styled-components'

export { Icon } from '@vtbl/icon-comp'
export { Material } from '@vtbl/material-comp'

export const FakeButton = styled.button<{
  filled: boolean
  opened: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${projectPalette.black95};

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${projectPalette.primary95};
  }

  ${({ filled, opened }) =>
    (filled || opened) &&
    `
    background-color: ${projectPalette.primary50};
    color: ${projectPalette.black100};
    fill: ${projectPalette.black100};

    &:hover {
      background-color: ${projectPalette.primary35};
    }
  `}
`

export const CancelIcon = styled(Icon)`
  fill: ${projectPalette.primary75};
  transition: fill 0.3s;
  cursor: pointer;

  &:hover {
    fill: ${projectPalette.black100};
  }
`

export const ClearIcon = styled(Icon)<{
  visible: boolean
}>`
  fill: ${projectPalette.black65};
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
  transition: fill 0.3s, opacity 0.3s;

  ${({ visible }) =>
    visible &&
    `
    opacity: 1;
    pointer-events: all;
  `}

  &:hover {
    fill: ${projectPalette.black50};
  }
`

export const Popover = styled(Material)`
  display: flex;
  position: absolute;
  z-index: 100;
  bottom: -48px;
`

export const IconContainer = styled.div`
  fill: ${projectPalette.black100};
`

export const StyledSearch = styled(AntInput.Search)<{
  focused: boolean
}>`
  width: 260px;

  &.ant-input-search .ant-input-group .ant-input-affix-wrapper:not(:last-child) {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right-color: transparent;
  }

  &.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child {
    left: 0;
  }

  &.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    padding-top: 8px;
    border-radius: 0 4px 4px 0;

    background-color: ${projectPalette.primary50};

    &:hover {
      background-color: ${projectPalette.primary35};
    }
  }

  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    box-shadow: none;
  }

  ${({ focused }) =>
    focused &&
    `
    &.ant-input-search .ant-input-wrapper {
      box-shadow: 0 0 0 4px rgb(24 144 255 / 20%);
      border-radius: 4px;
    }
  `}
`

const SizeParams = {
  large: {
    fontSize: '16px',
    height: '40px',
    lineHeight: '20px',
  },
  middle: {
    fontSize: '16px',
    height: '32px',
    lineHeight: '20px',
  },
  small: {
    fontSize: '14px',
    height: '24px',
    lineHeight: '16px',
  },
}

export const Container = styled(Material)<{
  size?: SizeType
}>`
  position: relative;

  ${FakeButton} {
    ${({ size = 'middle' }) => `
      height: ${SizeParams[size].height};
      font-size: ${SizeParams[size].fontSize};
      line-height: ${SizeParams[size].lineHeight};
    `}
  }
`
