import {AppBar, Toolbar, Typography,Container} from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="a" href='/' sx={{ color: 'inherit', textDecoration: 'none' }}>
                    دیجی شاپ 
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;