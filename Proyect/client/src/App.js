import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import ContactUs from './components/ContactUs';
import HomeAdmin from './pages/HomeAdmin';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return user != null;
  };

  // Function to redirect to the home page when trying to access an unauthorized path
  const redirectToHome = () => {
    return <Navigate to="/" replace />;
  };

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

              <Route path="/product/:sku" element={<Product />} />
            </>
          ) : null}

          {/* Default route to redirect */}
          <Route
            path="/*"
            element={redirectToHome()}
          />
        </Routes>
      </BrowserRouter>
      <ContactUs></ContactUs>
    </div>
  );
}

export default App;