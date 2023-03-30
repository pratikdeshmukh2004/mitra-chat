import { createContext, useEffect, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

const API_URL = process.env.REACT_APP_API_URL // your API URL here
export const UserContext = createContext(null);



const UserProvider = ({ children }) => {

  const [user, setUser] = useState({});


    useEffect(() => {
        let user_data = reactLocalStorage.getObject("token")
        if (!user_data){
            user_data = {}
        }
        setUser(user_data)
    }, []);


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

