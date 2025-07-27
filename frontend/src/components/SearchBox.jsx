import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        label="جستجوی محصولات..."
        variant="outlined"
        size="small"
        sx={{ mr: 1, backgroundColor: 'white', borderRadius: 1 }}
      />
      <Button type="submit" variant="contained" color="secondary">
        جستجو
      </Button>
    </Box>
  );
};

export default SearchBox;