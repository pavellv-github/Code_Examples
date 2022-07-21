import React from 'react'
import styled, { css } from 'styled-components'

import { TFormTemplateWrapperView } from '../types/formTemplateWrapperTypes'

declare module 'styled-components' {
  export interface DefaultTheme extends TProject.Theme { }
}

const Main = styled.div`
  ${({ theme }) => css``}
`

const FormTemplateWrapperView: TFormTemplateWrapperView.FC = () => <Main>FormTemplateWrapper</Main>

FormTemplateWrapperView.displayName = 'FormTemplateWrapperView'
Main.displayName = 'FormTemplateWrapperView.Main'

export { FormTemplateWrapperView }
