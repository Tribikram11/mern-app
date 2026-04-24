// src/utils/api.js
const BASE_URL = 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}, accessToken = null) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Attach token if available
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
};