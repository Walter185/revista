import './App.css';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Foot } from './Components/Footer';
import Navbar from './Components/Navbar';
import Loginpage from './Components/Login';
import { CartProvider } from './Context/context';
import Show from './Components/Admin/Show';
import Edit from './Components/Admin/Edit';
import Create from './Components/Admin/Create';
import RequireAuth from './Components/Login/RequireAuth';


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
                  <Route path="/show" element={<RequireAuth><Show /></RequireAuth>} />
                  <Route path="/create" element={<RequireAuth><Create /></RequireAuth>} />
                  <Route path="/edit/:id" element={<RequireAuth><Edit /></RequireAuth>} />

              </Routes>
            </BrowserRouter>
    </ChakraProvider>
    </CartProvider>

    <Foot />

   </>
  );
}

export default App;
