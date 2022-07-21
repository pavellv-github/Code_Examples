import { Material, TMaterial } from '@vtbl/material-comp'
import { projectPalette } from '@vtbl/project-styles-pkg'
import React from 'react'
import styled, { css } from 'styled-components'

import { TState, TStatusView, TVariant } from '../types/statusTypes'

const PrimaryColors: { [K in TState]: string } = {
  check: projectPalette.yellow50,
  error: projectPalette.red45,
  new: projectPalette.black10,
  pending: projectPalette.purple40,
  progress: projectPalette.primary35,
  success: projectPalette.green35,
}

const PrimaryTextColors: { [K in TState]: string } = {
  check: projectPalette.brown40,
  error: projectPalette.black100,
  new: projectPalette.black100,
  pending: projectPalette.black100,
  progress: projectPalette.black100,
  success: projectPalette.black100,
}

const DefaultColors: { [K in TState]: string } = {
  check: projectPalette.yellow80,
  error: projectPalette.red95,
  new: projectPalette.black95,
  pending: projectPalette.purple90,
  progress: projectPalette.primary95,
  success: projectPalette.green90,
}

const DefaultTextColors: { [K in TState]: string } = {
  check: projectPalette.yellow10,
  error: projectPalette.red45,
  new: projectPalette.black10,
  pending: projectPalette.purple40,
  progress: projectPalette.primary35,
  success: projectPalette.green35,
}

const Main = styled<TMaterial.ChildFC<{ isUpperCase?: boolean }>>(Material)`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: ${({ isUpperCase }: { isUpperCase?: boolean }) => (isUpperCase ? 'uppercase' : 'none')};
  ${({ state, variant }: { state: TState; variant: TVariant }) =>
    variant === 'primary' &&
    css`
      background: ${PrimaryColors[state]};
      color: ${PrimaryTextColors[state]};
    `};
  ${({ state, variant }: { state: TState; variant: TVariant }) =>
    variant === 'default' &&
    css`
      background: ${DefaultColors[state]};
      color: ${DefaultTextColors[state]};
    `};
`

const StatusView: TStatusView.FC = ({ label, ...props }) => <Main {...props}>{label}</Main>

StatusView.displayName = 'StatusView'
Main.displayName = 'StatusView.Main'

export { StatusView }
