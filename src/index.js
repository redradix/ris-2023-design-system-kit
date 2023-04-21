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
  // get local storage tokens
  const localStorageTokens = localStorage.getItem('radsFigmaTokens')
  if (localStorageTokens) {
    tokens = JSON.parse(localStorageTokens)
  } else {
    tokens = defaultTokens
  }
  // get figma tokens
  const figmaTokens = await figmaApi(data)
  if (figmaTokens?.isReadyForDeploy?.isReady) {
    localStorage.setItem('radsFigmaTokens', JSON.stringify(figmaTokens))
  }
}
