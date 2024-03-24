import './App.css';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({config})

function App(props)  {
  return (
    <>   
    <ToastContainer autoClose={2000} hideProgressBar />
    <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
              <Routes >
                  <Route path="/" element={<LandingPage />} />
              </Routes>
            </BrowserRouter>
    </ChakraProvider>

   </>
  );
}

export default App;
