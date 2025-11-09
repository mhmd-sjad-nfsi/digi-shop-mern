import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ProductRating from "./ProductRating";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component={RouterLink}
        to ={`/product/${product._id}`}
        sx={{
            display:'flex',
            flexDirection:'column',
            flexGrow:1,
        }}>
        <CardMedia
          component="img"
          sx={{
            height: 180,
            objectFit: "contain",
          }}
          image={product.image}
          alt={product.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              minHeight: 70,
            }}
          >
            {product.name}
          </Typography>

          <ProductRating
          value={product.rating}
          text={`(${product.numReviews}نظر)`}
          />

          <Typography variant="h5" color="primary" sx={{ fontWeight: 700,mt:1 }}>
            {product.price.toLocaleString("fa-IR")} تومان
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;
