import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      dark: '#0b3c85',
      main: '#2775EC',
      light: '#F0F6FF',
    },
    secondary: {
      dark: '#bfd8ff',
      main: '#F0F6FF',
      light: '#dfebff'
    },
    error: {
      dark: '#c91010',
      main: '#F15858',
      light: '#f37878'
    }
  },
  typography: {
    fontFamily: 'Montserrat Variable',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: colors.black.main,
        padding: 0,
        margin: 0
      }
    },
    MuiPaper: {
      defaultProps: {
        style: {
          borderRadius: '16px',
          padding: '24px 24px'
        }
      }
    }
  }
});