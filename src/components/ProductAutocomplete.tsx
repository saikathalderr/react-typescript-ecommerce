import products from "../data/products.json";
import { IProduct } from "../interface";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function ProductAutocomplete({
  handleProductSelect,
}: {
  handleProductSelect: Function;
}) {
  return (
    <div>
      <Autocomplete
        size={"small"}
        options={products}
        getOptionLabel={(option: IProduct) => option.productName}
        renderOption={(props: any, option: IProduct) => {
          return (
            <Box {...props} key={option.id} sx={{ display: "flex" }}>
              <Box>{option.productName}</Box>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box>${option.price}</Box>
            </Box>
          );
        }}
        onChange={(event, newValue) => {
          return handleProductSelect(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Products" />}
      />
    </div>
  );
}
