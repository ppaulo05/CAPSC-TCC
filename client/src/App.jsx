import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from './features/pages/Home/Home';
import Register from './features/pages/Register/Register';
import AnswerKey from './features/pages/AnswerKey/AnswerKey';
import NewAnswerKey from './features/pages/NewAnswerKey/NewAnswerKey';
import GeneratedAnswerKey from './features/pages/GeneratedAnswerKey/GeneratedAnswerKey';
import QRScanner from './features/pages/QRScanner/QRScanner';
import ErrorComponent from './features/pages/ErrorComponent/ErrorComponent';
import { useEffect } from 'react';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const unprotectedRoutes = ['/', '/register'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isProtectedRoute = !unprotectedRoutes.includes(location.pathname);

    if (isProtectedRoute && !token) {
      navigate('/error');
    }
  }, [location.pathname, navigate]);

  return children;
};


function App() {
  return (
    <Router>
      <AuthWrapper>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/answer-key" element={<AnswerKey />} />
            <Route path="/new-answer-key" element={<NewAnswerKey />} />
            <Route path="/generated-answer-key" element={<GeneratedAnswerKey />} />
            <Route path="/qr-scanner" element={<QRScanner />} />
            <Route path="/error" element={<ErrorComponent />} />
          </Routes>
        </div>
      </AuthWrapper>
    </Router>
  );
}

export default App;
