import { Drawer } from 'antd'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`
  & .ant-drawer-header-title .ant-drawer-close {
    margin-right: 0;
    order: 2;
    position: relative;
    top: -10px;
    right: -5px;
  }
`

export { StyledDrawer }
