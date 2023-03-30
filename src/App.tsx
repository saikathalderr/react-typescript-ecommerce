import Header from './components/Header';
import ProductList from './components/ProductList';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <>
      <Container maxWidth='lg' sx={{ py: 10 }}>
        <Header />
        <Box sx={{ my: 5 }}>
          <ProductList />
        </Box>
      </Container>
    </>
  );
}

export default App;
