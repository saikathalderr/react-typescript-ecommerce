import products from "../data/products.json";
import { IProduct } from "../interface";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useCart } from "../context/cart/cartContext";

export default function ProductAutocomplete({
  handleProductSelect,
}: {
  handleProductSelect: Function;
}) {
  const { cartItems } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    setSelectedProduct(null);
  }, [cartItems]);

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
        value={selectedProduct}
        onChange={(event, newValue) => {
          if (!newValue) {
            handleProductSelect(null);
            setSelectedProduct(null);
          } else {
            handleProductSelect(newValue);
            setSelectedProduct(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Products" />}
      />
    </div>
  );
}
