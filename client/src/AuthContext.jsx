import { createContext, useState, useEffect } from "react";
import { getUser, logout } from "./api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getUser().then((response) => {
            setUser(response.data.user);
            setIsLoading(false);
        })
        .catch(() => {
            setUser(null);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}