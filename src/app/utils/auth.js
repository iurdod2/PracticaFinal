// src/utils/auth.js
const JWT_KEY = 'jwt';

export const saveToken = (token) => {
    localStorage.setItem(JWT_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(JWT_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(JWT_KEY);
};
