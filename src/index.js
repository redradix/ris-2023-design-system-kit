import figmaApi from 'figma-tokens/src/cli'

import { createTheme, ThemeProvider, Button as MUIButton } from '@mui/material'
import defaultTokens from './defaultTokens.json'
import { jsx as _jsx } from 'react/jsx-runtime'

let tokens

export function Button({ color, children }) {
  return /*#__PURE__*/ _jsx(MUIButton, {
    sx: {
      bgColor: color
    },
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
    }
  })
  return /*#__PURE__*/ _jsx(ThemeProvider, {
    theme: theme,
    children: children
  })
}
export async function config(data) {
  const figmaTokens = await figmaApi(data)
  if (figmaTokens?.isReadyForDeploy?.isReady) {
    tokens = figmaTokens
    localStorage.setItem('figmaTokens', JSON.stringify(figmaTokens))
  } else {
    const localStorageTokens = localStorage.getItem('figmaTokens')
    if (!localStorageTokens) {
      tokens = defaultTokens
    } else {
      tokens = JSON.parse()
    }
  }
}
