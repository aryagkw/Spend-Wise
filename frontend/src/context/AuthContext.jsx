import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Configure axios defaults
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);

            // Optionally fetch user profile here if not stored
            // For now, we'll assume we verify token validity by successfully fetching profile or handling 401
            fetchUserProfile();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/profile');
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {
                username,
                password,
            });
            if (response.data.token) {
                setToken(response.data.token);
                return true;
            }
        } catch (error) {
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            await axios.post('http://localhost:8080/api/auth/signup', {
                username,
                email,
                password,
            });
            return true;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
