import React from "react";
import { Box, Rating, Typography } from "@mui/material";

const ProductRating = ({ value, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="read-only"
        value={Number(value)}
        precision={0.5}
        readOnly
        size="small"
        sx={{
          direction: "ltr",
        }}
      />
      {text && (
        <Typography variant="caption" sx={{ ml: 0.5, color: "text.secondary" }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default ProductRating;
