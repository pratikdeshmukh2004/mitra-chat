import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/Signup';
import LoginPage from './pages/Login';
import ChatPage from './pages/Chat';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SocketProvider, { SocketContext } from './contexs/socketContext';
import UserProvider, { UserContext } from './contexs/authContext';
import { useContext } from 'react';


const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }

])

const openRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "*",
    element: <Navigate to="/login" />
  }
])

function App() {
  const {user} = useContext(UserContext)
  return (
      <SocketProvider>
        <RouterProvider router={Object.keys(user).length ? authRoutes : openRoutes} />
      </SocketProvider>
  );
}

export default App;
