import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E',
    },
    secondary: {
      main: '#FF9100',
    },
    background: {
      default: '#f4f6f8',
    }
  },
  typography: {
    fontFamily: [
      'Vazirmatn', 
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','), 
  },
});

export default theme;