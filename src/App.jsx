import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginRegister />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
