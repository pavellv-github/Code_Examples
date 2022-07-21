import { Material, TMaterial } from '@vtbl/material-comp'
import { projectPalette } from '@vtbl/project-styles-pkg'
import styled, { css } from 'styled-components'

export const Wrapper = styled(Material)<TMaterial.Props & { className?: string; variant: string }>`
  ${({ theme, variant }) => css`
    font-family: ${theme.commonTypography.fontFamily};
    display: flex;
  align-items: center;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span {
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: 700;
    color: ${projectPalette.black10};
    overflow-wrap: break-word;
    max-width: 100%;

    ${
      variant === 'h1' &&
      css`
        font-size: 50px;
        line-height: 56px;
        ${theme.down(theme.breakpoints.sm)} {
        }
      `
    };

    ${
      variant === 'h2' &&
      css`
        font-size: 40px;
        line-height: 48px;
        ${theme.down(theme.breakpoints.sm)} {
        }
      `
    };

    ${
      variant === 'h3' &&
      css`
        font-size: 32px;
        line-height: 40px;
        ${theme.down(theme.breakpoints.sm)} {
          font-size: 24px;
          line-height: 28px;
        }
      `
    };

    ${
      variant === 'h4' &&
      css`
        font-size: 24px;
        line-height: 28px;
        ${theme.down(theme.breakpoints.sm)} {
          font-size: 18px;
          line-height: 24px;
        }
      `
    };

    ${
      variant === 'h5' &&
      css`
        font-size: 20px;
        line-height: 24px;
        ${theme.down(theme.breakpoints.sm)} {
        }
      `
    };

    ${
      variant === 'h6' &&
      css`
        font-size: 18px;
        line-height: 24px;
        ${theme.down(theme.breakpoints.sm)} {
          font-size: 16px;
          line-height: 20px;
        }
      `
    };

    ${
      variant === 'h7' &&
      css`
        font-size: 16px;
        line-height: 20px;
        ${theme.down(theme.breakpoints.sm)} {
          font-size: 14px;
          line-height: 16px;
        }
      `
    };
  `}
  }
`
