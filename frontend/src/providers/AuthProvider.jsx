import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    // Axios header set on app load
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            getMe();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // Get logged in user
    const getMe = async () => {
        try {
            const res = await axios.get(`${API_URL}/user/profile`);
            setUser(res.data);
        } catch (error) {
            console.error(error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (formData) => {
        const res = await axios.post(`${API_URL}/auth/register`, formData);
        Swal.fire("Success", "Registered successfully", "success");
        return res.data;
    };

    // Login 
    const login = async ({ phoneNumber, password }) => {
        const res = await axios.post(`${API_URL}/auth/login`, { phoneNumber, password });

        const accessToken = res.data.token;

        localStorage.setItem("token", accessToken);
        setToken(accessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        await getMe(); // user load
        return res.data; //MUST RETURN
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};