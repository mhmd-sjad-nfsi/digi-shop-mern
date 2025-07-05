import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary">
          {product.price.toLocaleString('fa-IR')} تومان
        </Typography>
        {/* در جلسات آینده، امتیاز محصول رو هم اینجا اضافه می‌کنیم */}
      </CardContent>
      <CardActions>
        <Button size="small">مشاهده جزئیات</Button>
        <Button size="small">افزودن به سبد</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;