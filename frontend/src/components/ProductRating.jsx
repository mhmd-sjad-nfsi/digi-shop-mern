import {Box, Typography,Rating} from '@mui/material';

const ProductRating = ({value,text}) => {
    return (
        <Box display="flex" alignItems="center">
            <Rating value={Number(value)} precision={0.5} readOnly  size='small' />
            {text && (
                <Typography variant="caption" sx={{
                    ml:0.5 ,color :'text.secondry'
                }}>
                    {text}
                </Typography>
            )}
        </Box>
    );
}

export default ProductRating;