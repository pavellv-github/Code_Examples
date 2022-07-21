import { projectPalette } from '@vtbl/project-styles-pkg'
import styled from 'styled-components'

export const Container = styled.div`
  margin: 0;
`

export const Label = styled.label`
  cursor: inherit;
  font-size: 14px;
  line-height: 16px;
  display: block;
  color: ${projectPalette.black40};
  margin: 0 0 8px 0;
`

export const Error = styled.div`
  margin: 4px 0 0 20px;
  font-size: 14px;
  line-height: 16px;
  color: ${projectPalette.red50};
`
export const Message = styled.div`
  margin: 4px 0 0 20px;
  font-size: 14px;
  line-height: 16px;
  color: ${projectPalette.black65};
`
