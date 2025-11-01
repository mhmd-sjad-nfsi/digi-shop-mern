import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const ProductCard = ({product}) => {
    return (
        <Card sx={{ height: '100%',borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                sx={{
                    height:180,
                    objectFit:'cover',
                }}
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography
                 gutterBottom
                 variant="h6"
                  component="div" 
                  sx={{
                    fontWeight: 600,
                    minHeight:56,
                  }}
                >
                    {product.name}
                </Typography>

                <Typography variant="h5" color="primary" sx={{fontWeight: 700}}>
                    {product.price.toLocaleString('fa-IR')} تومان
                </Typography>
            </CardContent>
        </Card>
    );
}
export default ProductCard;