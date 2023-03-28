import Cart from "./components/Cart";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/cart/cartContext";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <CartProvider>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Header />
        <Box sx={{ my: 5 }}>
          <ProductList />
        </Box>
      </Container>
    </CartProvider>
  );
}

export default App;
