"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Check session on mount
    useEffect(() => {
        const checkAuth = async () => {
            const session = authService.getSession();
            if (session) {
                setUser(session.user);
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const result = await authService.login(username, password);
            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error", error);
            return false;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setIsEditMode(false);
    };

    const toggleEditMode = () => {
        if (isAuthenticated) {
            setIsEditMode(prev => !prev);
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            isEditMode,
            login,
            logout,
            toggleEditMode
        }}>
            {children}
        </AuthContext.Provider>
    );
};
