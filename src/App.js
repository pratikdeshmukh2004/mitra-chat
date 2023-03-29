import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/> 
  },
  {
    path: "/register",
    element: <RegisterPage/> 
  },
  {
    path: "*",
    element: <HomePage/> 
  },
])


function App() {
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
