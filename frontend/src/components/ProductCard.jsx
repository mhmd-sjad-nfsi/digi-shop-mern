import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const ProductCard = ({product}) => {
    return (
        <Card sx={{ height: '100%',borderRadius: 2, boxShadow: 3 ,display:'flex', flexDirection:'column' }}> 
            <CardMedia
                component="img"
                sx={{
                    height:180,
                    objectFit:'contain',
                }}
                image={product.image}
                alt={product.name}
            />
            <CardContent  sx={{flexGrow:1}}>
                <Typography
                 gutterBottom
                 variant="h6"
                  component="div" 
                  sx={{
                    fontWeight: 600,
                    minHeight:70,
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