import './App.css';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Foot } from './Components/Footer';
import Navbar from './Components/Navbar';
import Loginpage from './Components/Login';
import { CartProvider } from './Context/context';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({config})

function App(props)  {
  return (
    <>   
    <ToastContainer autoClose={2000} hideProgressBar />
    <CartProvider>
    <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
            <Navbar />

              <Routes >
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Loginpage />} />

              </Routes>
            </BrowserRouter>
    </ChakraProvider>
    </CartProvider>

    <Foot />

   </>
  );
}

export default App;
