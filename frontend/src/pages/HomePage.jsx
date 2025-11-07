import { Typography, Box } from "@mui/material";
import products from "../productsData";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        محصولات موجود
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          },
          gap: 3,
          width: "100%",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>
    </>
  );
};
export default HomePage;
