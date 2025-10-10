import {Box,Container,Typography} from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3,px:2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    {'کپی رایت © '}
                    دیجی شاپ {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;  
                