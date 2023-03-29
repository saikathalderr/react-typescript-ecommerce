import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/cart/cartContext";
import { Box, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <CartProvider>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Header />
          <Box sx={{ my: 5 }}>
            <ProductList />
          </Box>
        </Container>
      </CartProvider>
      <ToastContainer />
    </>
  );
}

export default App;
