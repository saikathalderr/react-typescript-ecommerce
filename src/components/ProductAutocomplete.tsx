import products from "../data/products.json";
import { IProduct } from "../interface";
import { Autocomplete, TextField } from "@mui/material";

export default function ProductAutocomplete({
  handleProductSelect
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
            <li {...props} key={option.id}>
              {option.productName}
            </li>
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
