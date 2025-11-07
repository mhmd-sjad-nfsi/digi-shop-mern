import { Route ,Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
       </Route>
    </Routes>
  );
}
export default App;