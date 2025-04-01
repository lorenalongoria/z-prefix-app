import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './site-pages/home';
import Register from './site-pages/register';
import Login from './site-pages/login';
import Inventory from './site-pages/inventory';
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
