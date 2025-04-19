import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Todos from './components/Todos';
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <div className="button-container">
          <Link to="/login">
            <button className="toggle-button">Login</button>
          </Link>
        </div>
        <div className="button-container">
          <Link to="/register">
            <button className="toggle-button">Register</button>
          </Link>
        </div>
      </div>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<Todos />}/>
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
    </>
  );
}

export default App;