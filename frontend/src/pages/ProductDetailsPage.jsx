import React, { useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetProductDetailsQuery } from "../redux/slices/productsApiSlice"; // ✨ استفاده از RTK Query
import { addToCart } from "../redux/slices/cartSlice";
import ProductRating from "../components/ProductRating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  // ✨ دریافت جزئیات محصول با RTK Query
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <Container sx={{ py: 3 }} maxWidth="lg">
      <Button component={RouterLink} to="/" sx={{ mb: 3 }}>
        ← بازگشت به لیست محصولات
      </Button>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          {error?.data?.message || "خطایی در دریافت اطلاعات محصول رخ داده است"}
        </Message>
      ) : (
        <Grid container spacing={5}>
          {/* ستون اول: تصویر محصول */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
              src={product.image}
              alt={product.name}
            />
          </Grid>

          {/* ستون دوم: اطلاعات محصول */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <ProductRating
              value={product.rating}
              text={`(${product.numReviews} نظر)`}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" sx={{ my: 2 }}>
              قیمت: {product.price?.toLocaleString("fa-IR")} تومان
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              توضیحات: {product.description}
            </Typography>
          </Grid>

          {/* ستون سوم: بخش اقدامات */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>قیمت:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">
                    {product.price?.toLocaleString("fa-IR")} تومان
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>وضعیت:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">
                    {product.countInStock > 0 ? "موجود در انبار" : "ناموجود"}
                  </Typography>
                </Grid>

                {/* ✨ انتخاب تعداد در صورت موجود بودن محصول */}
                {product.countInStock > 0 && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>تعداد</InputLabel>
                      <Select
                        value={qty}
                        label="تعداد"
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    افزودن به سبد خرید
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductDetailsPage;
