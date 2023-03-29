import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function NoResults() {
  return (
    <div>
      <Box sx={{ my: 10 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          <b>No Items to the cart</b>
        </Typography>
      </Box>
    </div>
  );
}

export default NoResults;
