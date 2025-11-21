import {Link as RouterLink , useParams} from 'react-router-dom';
import {Typography,Box ,Container ,Button , Divider ,Paper} from '@mui/material';
import products from '../productsData';
import ProductRating from '../components/ProductRating';



const ProductDetailsPage = () => {
    const { id } = useParams();
    const product = products.find((p) => p._id === id);
    if (!product) {
        return (
            <Container sx={{ py: 5 , textAlign: 'center' }}>
                <Typography variant="h4" color='error' gutterBottom>
                    محصول موزد نظر یافت  نشد !
                </Typography>
                <Button component={RouterLink} to="/" variant="contained" sx={{mt:2}}>
                    بازگشت به فوشگاه 
                </Button>
            </Container>
        );
    }
    return (
        <Container sx={{ py: 3 }} maxWidth= "lg">
            <Button component={RouterLink} to="/"  sx={{mb:3 ,color :'text.secondary'}} >
             <Typography variant="button">بازگشت به فوشگاه</Typography>
            </Button>
            <Box  
            sx={{
                display:'flex',
                flexDirection:{ xs:'column' , md:'row'},
                gap:4,
            }}>
                <Box sx={{ flex:2 }}>
                    <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%' , borderRadius:2 , boxShadow:3 ,objectFit:'contain' ,bgcolor: 'white'}}
                    />
                </Box>
                <Box sx={{flex:1}}>
                <Typography variant="h5" component="h1" gutterBottom fontWeight= "bold">
                    {product.name}
                </Typography>
                <Divider sx={{my:2}}/>
                <ProductRating value={product.rating} text={`(${product.numReviews}نظر)`}/>
                <Divider sx={{my:2}}/>
                <Typography variant='body1' paragraph  sx={{color:'text.secondary' ,lineHeight:1.8}}>
                    {product.description}
                </Typography>
                </Box>

                <Box sx={{ flex:1 }}>
                    <Paper elevation={3} sx={{p:3 ,borderRadius:2}}>
                        <Box
                        sx={{
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center',
                            mb:2,
                        }}>
                            <Typography variant="body1">قیمت :</Typography>
                            <Typography variant="h6" fontWeight="bold" color='primary'>
                                {product.price.toLocaleString('fa-IR')} تومان
                            </Typography>
                        </Box>  
                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size='large'
                        disabled={product.countInStock === 0}
                        sx={{borderRadius:2 , py:1.5}}
                        >
                            {product.countInStock === 0 ? 'ناموجود' : 'افزودن به سبد خرید'} 
                        </Button>
                    </Paper>
                </Box>            
                </Box>
        </Container>
    );
    
}

export default ProductDetailsPage;