import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; 

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={RouterLink} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary">
            {product.price.toLocaleString('fa-IR')} تومان
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/product/${product._id}`}>
          مشاهده جزئیات
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;