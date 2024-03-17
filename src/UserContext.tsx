import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext({
    user: {ID: ""},
    setUser: () => {},
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ID: ""}); // Initial state

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for explicit access
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
};