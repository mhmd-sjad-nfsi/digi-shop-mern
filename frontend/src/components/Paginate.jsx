// frontend/src/components/Paginate.jsx
import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const Paginate = ({ pages, page, isAdmin = false}) => {
  return (
    pages > 1 && (
      <Pagination
        count={pages}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            component={RouterLink}
            to={!isAdmin ? `/page/${item.page}` : `/admin/products/page/${item.page}`}
            {...item}
          />
        )}
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    )
  );
};

export default Paginate;