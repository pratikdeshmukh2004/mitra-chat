import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SOCKET_URL

export const SocketContext = React.createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket only once
    if (!socket) {
        console.log('initiliazing...');
      const newSocket = io(ENDPOINT);
      setSocket(newSocket);
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
