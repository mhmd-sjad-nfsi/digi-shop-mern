import {Outlet} from "react-router-dom";
import {Box ,Container} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Container component="main" sx={{flexGrow: 1, mt: 2, mb: 2}}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}
export default Layout;
            