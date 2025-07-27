// frontend/src/pages/ProductDetailsPage.jsx
import React, { useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  List,
  ListItem,
  ListItemText,
  Rating,
  TextField,
} from "@mui/material";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../redux/slices/productsApiSlice";
import { addToCart } from "../redux/slices/cartSlice";
import ProductRating from "../components/ProductRating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch, // We need refetch here
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('نظر شما با موفقیت ثبت شد');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
        // ✨ The entire content, including reviews, now goes inside this block
        <>
          <Grid container spacing={5}>
            {/* Column 1: Product Image */}
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

            {/* Column 2: Product Details */}
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

            {/* Column 3: Actions Box */}
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}><Typography>قیمت:</Typography></Grid>
                  <Grid item xs={6}><Typography fontWeight="bold">{product.price?.toLocaleString("fa-IR")} تومان</Typography></Grid>
                  <Grid item xs={6}><Typography>وضعیت:</Typography></Grid>
                  <Grid item xs={6}><Typography fontWeight="bold">{product.countInStock > 0 ? "موجود در انبار" : "ناموجود"}</Typography></Grid>
                  {product.countInStock > 0 && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>تعداد</InputLabel>
                        <Select value={qty} label="تعداد" onChange={(e) => setQty(Number(e.target.value))}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth disabled={product.countInStock === 0} onClick={addToCartHandler}>
                      افزودن به سبد خرید
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          
          {/* ✨ Reviews section is now moved INSIDE the main conditional block */}
          <Grid container spacing={4} sx={{ mt: 3 }}>
            <Grid item md={6}>
              <Typography variant="h5">نظرات</Typography>
              {product.reviews.length === 0 && <Message>هیچ نظری ثبت نشده است</Message>}
              <List>
                {product.reviews.map((review) => (
                  <ListItem key={review._id} alignItems="flex-start">
                    <ListItemText
                      primary={<strong>{review.name}</strong>}
                      secondary={
                        <>
                          <Rating value={review.rating} readOnly size="small" />
                          <Typography variant="body2">{review.comment}</Typography>
                          <Typography variant="caption" display="block">{new Date(review.createdAt).toLocaleDateString('fa-IR')}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h5">نظر خود را بنویسید</Typography>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <FormControl fullWidth sx={{ my: 2 }}>
                    <Typography component="legend">امتیاز</Typography>
                    <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
                  </FormControl>
                  <TextField label="نظر" multiline rows={4} fullWidth required value={comment} onChange={(e) => setComment(e.target.value)} />
                  <Button type="submit" variant="contained" disabled={loadingReview} sx={{ mt: 2 }}>
                    ثبت نظر
                  </Button>
                </form>
              ) : (
                <Message>
                  لطفاً برای ثبت نظر <RouterLink to="/login">وارد شوید</RouterLink>.
                </Message>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductDetailsPage;