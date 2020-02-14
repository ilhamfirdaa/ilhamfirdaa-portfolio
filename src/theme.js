import { createMuiTheme, colors } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Open Sans',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
