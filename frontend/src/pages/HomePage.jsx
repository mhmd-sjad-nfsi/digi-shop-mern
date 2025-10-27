import {Typography , List , ListItem} from '@mui/material';
import products from '../productsData';

const HomePage = () => {
    return (
        <>
            <Typography variant="h4" sx={{mb:2}}>
                محصولات موجود
            </Typography>

            <List> 
                {products.map((product) => (
                    <ListItem key={product._id}>
                        <Typography variant="body1">{product.name} </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
export default HomePage;