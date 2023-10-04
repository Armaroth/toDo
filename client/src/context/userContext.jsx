import { useContext, createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);


export function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));



    const r = { token, setToken }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>

}