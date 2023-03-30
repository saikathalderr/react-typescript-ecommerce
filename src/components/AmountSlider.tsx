import { IProduct } from "../interface";
import { Grid, Slider, TextField } from "@mui/material";
import { MAX_CART_ITEM } from "../constant";

function AmountSlider({
  handleQuantity,
  disabled,
  quantity,
  totalPrice,
  product,
}: {
  handleQuantity: Function;
  disabled: boolean;
  quantity: number;
  totalPrice: number;
  product?: IProduct;
}) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    handleQuantity(newValue);
  };

  return (
    <>
      <Grid container justifyItems="center" alignItems="center">
        <Grid item xs={2} sx={{ mr: 2 }}>
          <Slider
            min={1}
            max={MAX_CART_ITEM}
            defaultValue={1}
            value={quantity}
            aria-label="Amount"
            valueLabelDisplay="auto"
            onChange={handleChange}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={"auto"}>
          <TextField
            size="small"
            id="outlined-number"
            type="number"
            value={quantity}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 60 }}
          />
        </Grid>
        <Grid item xs={"auto"} sx={{ mx: 2 }}>
          x
        </Grid>
        <Grid item xs={"auto"}>
          $ {product?.price || 0.0}
        </Grid>
        <Grid item xs={"auto"} sx={{ mx: 2 }}>
          <small> + {product?.taxRate || 0}% Tax</small>
        </Grid>
        <Grid item xs={"auto"} sx={{ mx: 2 }}>
          =
        </Grid>
        <Grid item xs={"auto"}>
          $ {totalPrice}
        </Grid>
      </Grid>
    </>
  );
}

export default AmountSlider;
