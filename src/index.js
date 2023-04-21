import figmaApi from 'figma-tokens/src/cli'

import {
  createTheme,
  ThemeProvider,
  Button as MUIButton,
  Typography as MUITypography
} from '@mui/material'
import defaultTokens from './defaultTokens.json'
import { jsx as _jsx } from 'react/jsx-runtime'

let tokens

export function Button({ color, children }) {
  return /*#__PURE__*/ _jsx(MUIButton, {
    variant: 'contained',
    sx: {
      color
    },
    children: children
  })
}
export function Typography({ color, variant, children }) {
  return /*#__PURE__*/ _jsx(MUITypography, {
    variant: variant || 'body1',
    color,
    children: children
  })
}

export function System({ children }) {
  const {
    color: { primary }
  } = tokens

  const theme = createTheme({
    palette: {
      primary: {
        main: primary
      }
    },
    typography: {
      h1: {
        ...tokens.typography.heading,
        fontSize: parseInt(tokens.typography.heading.fontSize)
      },
      body1: {
        ...tokens.typography.body,
        fontSize: parseInt(tokens.typography.body.fontSize)
      }
      // body: tokens.typography.body
    }
  })
  return /*#__PURE__*/ _jsx(ThemeProvider, {
    theme: theme,
    children: children
  })
}

export async function config(configData) {
  const figmaTokens = await figmaApi(configData)

  if (figmaTokens?.isReadyForDeploy?.isReady) {
    tokens = figmaTokens
    localStorage.setItem('radsFigmaTokens', JSON.stringify(figmaTokens))
  } else {
    const localStorageTokens = localStorage.getItem('radsFigmaTokens')
    if (!localStorageTokens) {
      tokens = defaultTokens
    } else {
      tokens = JSON.parse(localStorageTokens)
    }
  }
}
