import React, { createContext, useContext, useState } from 'react';

// @ts-ignore
const AuthContext = createContext();

// @ts-ignore
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export the context for use in components
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
