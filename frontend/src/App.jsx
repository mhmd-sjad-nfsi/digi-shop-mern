import Header from "./components/Header";
import { Typography } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <main>
        <Typography  variant="h4" sx={{ p: 3 ,color: 'primary.main', textAlign: 'center' }}>
          به فروشگاه دیجی شاپ خوش آمدید 
        </Typography>
      </main>
    </>
  )
}

export default App