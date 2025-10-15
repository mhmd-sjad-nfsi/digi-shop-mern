import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#00296b',
        },
        secondary: {
            main: '#fdc500',
        },
        background: {
            default: '#eaeaeaff',
        },
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