import { Material } from '@vtbl/material-comp'
import { projectPalette } from '@vtbl/project-styles-pkg'
import styled from 'styled-components'

export const Text = styled(Material)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${projectPalette.black10};
`
