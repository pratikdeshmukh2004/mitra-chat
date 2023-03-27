import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Component={LoginPage} path="/login"/>
          <Route Component={RegisterPage} path="/register"/>
          <Route Component={HomePage} path="*"/>
        </Routes>
      </Router>
      {/* <LoginPage/> */}
      {/* <RegisterPage/> */}
    </div>
  );
}

export default App;
