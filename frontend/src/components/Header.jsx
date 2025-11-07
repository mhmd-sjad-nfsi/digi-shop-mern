import {AppBar, Toolbar, Typography,Container} from '@mui/material';
import {Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h6" component={RouterLink} to='/' sx={{ color: 'inherit', textDecoration: 'none' }}>
                    دیجی شاپ 
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;