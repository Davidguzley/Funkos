import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import ContactUs from './components/ContactUs';
import HomeAdmin from './pages/HomeAdmin';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import { useAuthContext } from './hooks/useAuthContext';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect } from 'react';

function App() {
  const { user } = useAuthContext();

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return user != null;
  };

  //Add cookie session
  useEffect(() => {
    const cookies = new Cookies();
    const token_id = cookies.get('token_id');

    if (!token_id) {
      const generatedNumber = uuidv4();
      cookies.set('token_id', generatedNumber, { path: '/' });
    }
  }, []);

  return (
    <div className="App">
      <Topbar></Topbar>
      <BrowserRouter>
        <Routes>
          {isAuthenticated() ? (
            <>
              <Route path="/" element={<HomeAdmin />} />

              <Route path="/users" element={<Users />} />

              <Route path="/reports" element={<Reports />} />
            </>
          ) : null}

          {!isAuthenticated() ? (
            <>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />

              <Route path="/product/:id" element={<Product />} />
            </>
          ) : null}
        </Routes>
      </BrowserRouter>
      <ContactUs></ContactUs>
    </div>
  );
}

export default App;