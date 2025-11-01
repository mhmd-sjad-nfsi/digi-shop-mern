import {Typography , List , ListItem} from '@mui/material';
import products from '../productsData';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    return (
        <>
            <Typography variant="h4" sx={{mb:2}}>
                محصولات موجود
            </Typography>

            <ProductCard  product={products[0]}/>
        </>
    );
}
export default HomePage;