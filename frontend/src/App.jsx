import Header from "./components/Header";
import Footer from "./components/Footer";
import { Typography, Box, Container } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container component="main" sx={{ mt: 2, mb: 2}}>
        <Typography
          variant="h4"
          sx={{ p: 3, color: "primary.main", textAlign: "center" }}
        >
          به فروشگاه دیجی شاپ خوش آمدید
        </Typography>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
