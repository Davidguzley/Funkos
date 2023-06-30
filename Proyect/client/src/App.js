import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Admin pages
import HomeAdmin from './pages/HomeAdmin';
import Users from './pages/Users';
import Reports from './pages/Reports';
// Anonymous user
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';

function App() {
  const isAdmin = true;
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {isAdmin ? (
          <>
            <Route
              path='/'
              element={<HomeAdmin/>}
            />

            <Route
              path='/users'
              element={<Users/>}
            />
            
            <Route
              path='/reports'
              element={<Reports/>}
            />
          </>
          ) : null}

          {!isAdmin ? (
          <>
            <Route
              path='/'
              element={<Home/>}
            />

            <Route
              path='/login'
              element={<Login/>}
            />

            <Route
              path='/product/:sku'
              element={<Product/>}
            />
          </>
          ) : null}

        </Routes>
      </BrowserRouter>
    </div>
  )	
  }

export default App;
