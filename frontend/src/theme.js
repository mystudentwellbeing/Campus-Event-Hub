import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00b3ff',
      dark: '#02057b',
    },
    secondary: {
      main: '#01ab0d',
    },
    warning: {
      main: '#f73378',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          color: 'var(--blue)',
        },
      },
    },
  },
});
