import { createContext, useState, useEffect, useContext } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // restore refresh token
    useEffect(() => {
        const restoreSession = async () => {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('http://localhost:5000/api/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken })
                });

                if (!res.ok) {
                    localStorage.removeItem('refreshToken')
                    setLoading(false);
                    return;
                }

                const data = res.json();

                setAccessToken(data.refreshToken);

                localStorage.setItem('refreshToken', data.refreshToken)

                await fetchCurrentUser(data.refreshToken);

            } catch (error) {
                localStorage.removeItem('refreshToken')
            } finally {
                setLoading(false)
            }
        }
        restoreSession()
    }, [])

    const fetchCurrentUser = async (token) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })

            const data = res.json();
            if (data.success) setUser(data);
        } catch (error) {
            console.error('failed to fetch user', error)
        }
    }

    const register = async (name, email, password) => {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setAccessToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser(data.newUser);

        return data;
    }

    const login = async (email, password) => {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setAccessToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser(data.user);

        return data;
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });
        } catch (err) {
            // logout silently even if request fails
        }

        // Clear everything
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{
            user,accessToken,loading,
            register, login, logout,
            isAuthenticated: !!accessToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context;
}