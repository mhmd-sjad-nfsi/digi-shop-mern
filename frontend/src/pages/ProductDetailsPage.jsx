import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Container, Typography, Grid, Box, Button, Paper,Divider } from "@mui/material";
import productsData from "../products";
import ProductRating from "../components/ProductRating";

const ProductDetailsPage = () => {
  const { id } = useParams(); // دریافت id از URL
  const product = productsData.find((p) => p._id === id);

  // مدیریت حالتی که محصول یافت نشود
  if (!product) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h4" color="error">
          محصول مورد نظر یافت نشد!
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ mt: 2 }}
        >
          بازگشت به صفحه اصلی
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 3 }} maxWidth="lg">
      <Button component={RouterLink} to="/" sx={{ mb: 3 }}>
        ← بازگشت به لیست محصولات
      </Button>
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
            قیمت: {product.price.toLocaleString("fa-IR")} تومان
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
                  {product.price.toLocaleString("fa-IR")} تومان
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
              {/* در آینده بخش انتخاب تعداد هم اینجا اضافه میشه */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={product.countInStock === 0}
                >
                  افزودن به سبد خرید
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
